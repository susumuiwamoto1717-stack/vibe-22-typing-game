// RUNTEQ Ruby学習モード ロジック

(function () {
  'use strict';

  const RUNTEQ_PASSWORD = 'runteq';

  // ===== 状態管理 =====
  const rlState = {
    authenticated: false,
    currentChapterId: null,
    currentStepIndex: 0,
    currentCharIndex: 0,
    currentLine: 0,
    totalCorrect: 0,
    totalMiss: 0,
    totalChars: 0,
    missChars: {},
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    codeLines: [],       // split code into lines
    flatCode: '',        // code with \n for typing
    isComposing: false,  // IME変換中フラグ
  };

  // ===== DOM要素 =====
  function getEls() {
    return {
      // Password
      passwordScreen: document.getElementById('screen-ruby-password'),
      passwordInput: document.getElementById('ruby-password-input'),
      passwordSubmit: document.getElementById('ruby-password-submit'),
      passwordError: document.getElementById('ruby-password-error'),
      passwordBack: document.getElementById('ruby-password-back'),
      // Chapter select
      chapterScreen: document.getElementById('screen-ruby-chapters'),
      chapterList: document.getElementById('ruby-chapter-list'),
      chapterBack: document.getElementById('ruby-chapter-back'),
      // Step select
      stepScreen: document.getElementById('screen-ruby-steps'),
      stepTitle: document.getElementById('ruby-step-title'),
      stepList: document.getElementById('ruby-step-list'),
      stepBack: document.getElementById('ruby-step-back'),
      // Typing
      typingScreen: document.getElementById('screen-ruby-typing'),
      rlTimer: document.getElementById('rl-timer'),
      rlStepInfo: document.getElementById('rl-step-info'),
      rlWpm: document.getElementById('rl-wpm'),
      rlAccuracy: document.getElementById('rl-accuracy'),
      rlExplanation: document.getElementById('rl-explanation'),
      rlCodeArea: document.getElementById('rl-code-area'),
      rlLineNumbers: document.getElementById('rl-line-numbers'),
      rlCodeText: document.getElementById('rl-code-text'),
      rlImeInput: document.getElementById('rl-ime-input'),
      // Keyboard & Hand
      rlFingerGuide: document.getElementById('rl-finger-guide'),
      rlFingerHand: document.getElementById('rl-finger-hand'),
      rlFingerName: document.getElementById('rl-finger-name'),
      // Complete
      completeScreen: document.getElementById('screen-ruby-complete'),
      rlResultWpm: document.getElementById('rl-result-wpm'),
      rlResultAccuracy: document.getElementById('rl-result-accuracy'),
      rlResultTime: document.getElementById('rl-result-time'),
      rlResultMiss: document.getElementById('rl-result-miss'),
      rlCompleteExplanation: document.getElementById('rl-complete-explanation'),
      rlCopyFileCmd: document.getElementById('rl-copy-file-cmd'),
      rlCopyRunCmd: document.getElementById('rl-copy-run-cmd'),
      rlFileCmdText: document.getElementById('rl-file-cmd-text'),
      rlRunCmdText: document.getElementById('rl-run-cmd-text'),
      rlNextStep: document.getElementById('rl-next-step'),
      rlBackToSteps: document.getElementById('rl-back-to-steps'),
      rlBackToChapters: document.getElementById('rl-back-to-chapters'),
    };
  }

  let els = null;
  let rlKeyboard = null;
  let rlHandGuide = null;

  // ===== キーボード・手ガイド更新 =====
  function updateRLFingerGuide(char) {
    if (!rlKeyboard) return;
    // Highlight the key for the next character
    if (char === '\n') {
      // Enter key
      rlKeyboard.highlightChar('Enter');
    } else {
      rlKeyboard.highlightChar(char);
    }

    const info = rlKeyboard.getFingerInfo(char === '\n' ? 'Enter' : char);
    if (info && info.hand) {
      els.rlFingerGuide.classList.remove('hidden');
      els.rlFingerHand.textContent = info.hand;
      els.rlFingerName.textContent = info.name;
    } else if (info) {
      els.rlFingerGuide.classList.remove('hidden');
      els.rlFingerHand.textContent = '';
      els.rlFingerName.textContent = info.name;
    } else {
      els.rlFingerGuide.classList.add('hidden');
      els.rlFingerHand.textContent = '';
      els.rlFingerName.textContent = '';
    }

    if (rlHandGuide && info) {
      rlHandGuide.highlightFinger(info.finger);
    } else if (rlHandGuide) {
      rlHandGuide.clearHighlight();
    }
  }

  // ===== 画面管理 =====
  const RL_SCREENS = [
    'screen-ruby-password',
    'screen-ruby-chapters',
    'screen-ruby-steps',
    'screen-ruby-typing',
    'screen-ruby-complete'
  ];

  function showRLScreen(id) {
    // Hide all main screens
    document.querySelectorAll('#main > .screen').forEach(s => s.classList.remove('active'));
    // Show target
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
  }

  // ===== パスワード画面 =====
  function showPasswordScreen() {
    if (!els) els = getEls();
    if (rlState.authenticated) {
      showChapterScreen();
      return;
    }
    showRLScreen('screen-ruby-password');
    els.passwordInput.value = '';
    els.passwordError.textContent = '';
    setTimeout(() => els.passwordInput.focus(), 100);
  }

  function checkPassword() {
    const pw = els.passwordInput.value;
    if (pw === RUNTEQ_PASSWORD) {
      rlState.authenticated = true;
      showChapterScreen();
    } else {
      els.passwordError.textContent = 'パスワードが違います';
      els.passwordInput.value = '';
      els.passwordInput.focus();
    }
  }

  // ===== 章選択画面 =====
  function showChapterScreen() {
    showRLScreen('screen-ruby-chapters');
    els.chapterList.innerHTML = '';

    RUBY_LEARNING_CHAPTERS.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'rl-chapter-btn';
      const stepCount = RUBY_LEARNING_DATA[ch.id] ? RUBY_LEARNING_DATA[ch.id].steps.length : 0;
      btn.innerHTML = `
        <span class="rl-chapter-id">Chapter ${ch.id}</span>
        <span class="rl-chapter-title">${ch.title.replace(/^Chapter \d+: /, '')}</span>
        <span class="rl-chapter-count">${stepCount}ステップ</span>
      `;
      btn.addEventListener('click', () => {
        rlState.currentChapterId = ch.id;
        showStepScreen();
      });
      els.chapterList.appendChild(btn);
    });
  }

  // ===== ステップ選択画面 =====
  function showStepScreen() {
    showRLScreen('screen-ruby-steps');
    const chapter = RUBY_LEARNING_DATA[rlState.currentChapterId];
    if (!chapter) return;

    els.stepTitle.textContent = `Chapter ${rlState.currentChapterId}: ${chapter.subtitle}`;
    els.stepList.innerHTML = '';

    chapter.steps.forEach((step, index) => {
      const btn = document.createElement('button');
      btn.className = 'rl-step-btn';
      const hasCode = step.code && step.code.trim().length > 0;
      btn.innerHTML = `
        <span class="rl-step-number">${step.number}</span>
        <span class="rl-step-title">${step.title}</span>
        ${!hasCode ? '<span class="rl-step-nocode">解説のみ</span>' : ''}
      `;
      btn.addEventListener('click', () => {
        rlState.currentStepIndex = index;
        if (hasCode) {
          startRLTyping();
        } else {
          // コードがないステップは直接完了画面へ
          showRLComplete(true);
        }
      });
      els.stepList.appendChild(btn);
    });
  }

  // ===== タイピング開始 =====
  function startRLTyping() {
    const chapter = RUBY_LEARNING_DATA[rlState.currentChapterId];
    const step = chapter.steps[rlState.currentStepIndex];

    // Reset state
    rlState.currentCharIndex = 0;
    rlState.totalCorrect = 0;
    rlState.totalMiss = 0;
    rlState.totalChars = 0;
    rlState.missChars = {};
    rlState.startTime = null;
    rlState.elapsedSeconds = 0;

    // Parse code
    rlState.flatCode = step.code;
    rlState.codeLines = step.code.split('\n');

    showRLScreen('screen-ruby-typing');

    // Update info
    els.rlStepInfo.textContent = `Chapter ${rlState.currentChapterId} - Step ${step.number}: ${step.title}`;
    els.rlExplanation.textContent = step.explanation;
    els.rlTimer.textContent = '00:00';
    els.rlWpm.textContent = '0';
    els.rlAccuracy.textContent = '100%';

    // Render code
    renderRLCode();

    // Highlight first character on keyboard
    const fullText = rlState.codeLines.join('\n');
    if (fullText.length > 0) {
      updateRLFingerGuide(fullText[0]);
    }

    // IME入力フィールドにフォーカス
    rlState.isComposing = false;
    els.rlImeInput.value = '';
    els.rlImeInput.focus();
    attachRLInputHandlers();
  }

  // ===== コード描画 =====
  function renderRLCode() {
    els.rlLineNumbers.innerHTML = '';
    els.rlCodeText.innerHTML = '';

    // Line numbers
    rlState.codeLines.forEach((_, i) => {
      const lineNum = document.createElement('div');
      lineNum.className = 'rl-line-num';
      lineNum.textContent = i + 1;
      els.rlLineNumbers.appendChild(lineNum);
    });

    // Code characters
    let charIndex = 0;
    rlState.codeLines.forEach((line, lineIdx) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'rl-code-line';
      lineDiv.dataset.line = lineIdx;

      for (let i = 0; i < line.length; i++) {
        const span = document.createElement('span');
        span.className = 'rl-char pending';
        span.textContent = line[i];
        span.dataset.index = charIndex;
        if (charIndex === 0) {
          span.classList.remove('pending');
          span.classList.add('current');
        }
        lineDiv.appendChild(span);
        charIndex++;
      }

      // Add newline marker (except last line)
      if (lineIdx < rlState.codeLines.length - 1) {
        const nlSpan = document.createElement('span');
        nlSpan.className = 'rl-char rl-newline pending';
        nlSpan.textContent = '↵';
        nlSpan.dataset.index = charIndex;
        lineDiv.appendChild(nlSpan);
        charIndex++;
      }

      els.rlCodeText.appendChild(lineDiv);
    });
  }

  // ===== キー入力処理（IME対応） =====

  // 入力ハンドラーの登録・解除
  function attachRLInputHandlers() {
    els.rlImeInput.addEventListener('keydown', handleRLKeyDown);
    els.rlImeInput.addEventListener('compositionstart', handleRLCompositionStart);
    els.rlImeInput.addEventListener('compositionend', handleRLCompositionEnd);
    els.rlImeInput.addEventListener('input', handleRLInput);
    // テキストエリアからフォーカスが外れたら戻す
    els.rlImeInput._blurHandler = () => {
      if (document.getElementById('screen-ruby-typing').classList.contains('active')) {
        setTimeout(() => els.rlImeInput.focus(), 10);
      }
    };
    els.rlImeInput.addEventListener('blur', els.rlImeInput._blurHandler);
  }

  function detachRLInputHandlers() {
    els.rlImeInput.removeEventListener('keydown', handleRLKeyDown);
    els.rlImeInput.removeEventListener('compositionstart', handleRLCompositionStart);
    els.rlImeInput.removeEventListener('compositionend', handleRLCompositionEnd);
    els.rlImeInput.removeEventListener('input', handleRLInput);
    if (els.rlImeInput._blurHandler) {
      els.rlImeInput.removeEventListener('blur', els.rlImeInput._blurHandler);
    }
  }

  // IME変換開始
  function handleRLCompositionStart() {
    rlState.isComposing = true;
  }

  // IME変換確定
  function handleRLCompositionEnd(e) {
    rlState.isComposing = false;
    const composedText = e.data || '';
    if (composedText) {
      processRLChars(composedText);
    }
    // テキストエリアをクリア
    els.rlImeInput.value = '';
  }

  // 通常のinputイベント（IME以外の入力を拾う）
  function handleRLInput(e) {
    if (rlState.isComposing) return; // IME中は無視
    // keydownで処理済みのASCII文字はここでは処理しない
    // ただし、IME確定後のクリアが間に合わない場合のフォールバック
    els.rlImeInput.value = '';
  }

  // keydownハンドラー（ASCII文字・Enter・Escape用）
  function handleRLKeyDown(e) {
    // IME変換中はkeydownを無視
    if (e.isComposing || e.key === 'Process') return;

    // Escape で中断
    if (e.key === 'Escape') {
      e.preventDefault();
      stopRLTimer();
      detachRLInputHandlers();
      showStepScreen();
      return;
    }

    // 制御キーは無視
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' ||
        e.key === 'CapsLock' || e.key === 'Tab' || e.key === 'Backspace' ||
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
        e.key === 'Delete' || e.key === 'Home' || e.key === 'End' ||
        e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Insert' ||
        e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    e.preventDefault();

    let typedChar = e.key;
    if (typedChar === 'Enter') typedChar = '\n';

    // 1文字ずつ処理
    processRLChars(typedChar);

    // テキストエリアをクリア
    els.rlImeInput.value = '';
  }

  // 文字列を1文字ずつ処理する共通関数（ASCII・日本語両対応）
  function processRLChars(text) {
    const fullText = rlState.codeLines.join('\n');
    const allChars = els.rlCodeText.querySelectorAll('.rl-char');

    for (let i = 0; i < text.length; i++) {
      if (rlState.currentCharIndex >= fullText.length) break;

      const expectedChar = fullText[rlState.currentCharIndex];
      const typedChar = text[i];

      // Start timer on first input
      if (!rlState.startTime) {
        startRLTimer();
      }

      rlState.totalChars++;
      const currentEl = allChars[rlState.currentCharIndex];

      if (typedChar === expectedChar) {
        // Correct
        rlState.totalCorrect++;
        if (currentEl) {
          currentEl.classList.remove('current', 'miss');
          currentEl.classList.add('typed');
        }

        rlState.currentCharIndex++;

        if (rlState.currentCharIndex >= fullText.length) {
          // Done!
          stopRLTimer();
          detachRLInputHandlers();
          showRLComplete(false);
          return;
        } else {
          // Next char
          const nextEl = allChars[rlState.currentCharIndex];
          if (nextEl) {
            nextEl.classList.remove('pending');
            nextEl.classList.add('current');
            scrollToCurrentLine(nextEl);
          }
          updateRLFingerGuide(fullText[rlState.currentCharIndex]);
        }
      } else {
        // Miss
        rlState.totalMiss++;
        if (currentEl) {
          currentEl.classList.add('miss');
        }
        if (!rlState.missChars[expectedChar]) {
          rlState.missChars[expectedChar] = 0;
        }
        rlState.missChars[expectedChar]++;
      }
    }

    updateRLStats();
  }

  function scrollToCurrentLine(el) {
    const lineDiv = el.closest('.rl-code-line');
    if (lineDiv) {
      lineDiv.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  // ===== タイマー =====
  function startRLTimer() {
    rlState.startTime = Date.now();
    rlState.timerInterval = setInterval(() => {
      rlState.elapsedSeconds = Math.floor((Date.now() - rlState.startTime) / 1000);
      const min = String(Math.floor(rlState.elapsedSeconds / 60)).padStart(2, '0');
      const sec = String(rlState.elapsedSeconds % 60).padStart(2, '0');
      els.rlTimer.textContent = `${min}:${sec}`;
    }, 200);
  }

  function stopRLTimer() {
    if (rlState.timerInterval) {
      clearInterval(rlState.timerInterval);
      rlState.timerInterval = null;
    }
  }

  // ===== 統計更新 =====
  function updateRLStats() {
    // WPM
    if (rlState.startTime && rlState.totalCorrect > 0) {
      const elapsedMin = (Date.now() - rlState.startTime) / 60000;
      if (elapsedMin > 0.01) {
        const wpm = Math.round(rlState.totalCorrect / 5 / elapsedMin);
        els.rlWpm.textContent = String(wpm);
      }
    }
    // Accuracy
    if (rlState.totalChars > 0) {
      const acc = Math.floor((rlState.totalCorrect / rlState.totalChars) * 100);
      els.rlAccuracy.textContent = `${acc}%`;
    }
  }

  // ===== 完了画面 =====
  function showRLComplete(noCode) {
    showRLScreen('screen-ruby-complete');
    const chapter = RUBY_LEARNING_DATA[rlState.currentChapterId];
    const step = chapter.steps[rlState.currentStepIndex];

    if (noCode) {
      // 解説のみステップ
      document.getElementById('rl-result-stats').style.display = 'none';
    } else {
      document.getElementById('rl-result-stats').style.display = '';
      const elapsedMin = rlState.startTime ? (Date.now() - rlState.startTime) / 60000 : 0;
      const wpm = elapsedMin > 0.01 ? Math.round(rlState.totalCorrect / 5 / elapsedMin) : 0;
      const accuracy = rlState.totalChars > 0 ? Math.floor((rlState.totalCorrect / rlState.totalChars) * 100) : 100;
      const totalSec = rlState.startTime ? Math.floor((Date.now() - rlState.startTime) / 1000) : 0;
      const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
      const sec = String(totalSec % 60).padStart(2, '0');

      els.rlResultWpm.textContent = String(wpm);
      els.rlResultAccuracy.textContent = `${accuracy}%`;
      els.rlResultTime.textContent = `${min}:${sec}`;
      els.rlResultMiss.textContent = String(rlState.totalMiss);
    }

    // Explanation
    els.rlCompleteExplanation.textContent = step.explanation;

    // Copy commands
    const copySection = document.getElementById('rl-copy-section');
    if (step.code && step.file) {
      copySection.style.display = '';
      // File creation command
      const escapedCode = step.code.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const fileCmd = `ruby -e 'File.write("${step.file}", %q[${step.code}])'`;
      els.rlFileCmdText.textContent = `ruby -e 'File.write("${step.file}", ...)'`;

      // Run command
      const runCmd = step.terminal;
      els.rlRunCmdText.textContent = runCmd;

      // Copy handlers
      els.rlCopyFileCmd.onclick = () => {
        // Use a more reliable file creation approach
        const createCmd = `ruby -e 'require "fileutils"; FileUtils.mkdir_p(File.dirname("${step.file}")); File.write("${step.file}", <<~RUBY)\n${step.code}\nRUBY'`;
        // Simple approach: write code directly
        const simpleCmd = `ruby -e 'require "fileutils"; FileUtils.mkdir_p(File.dirname("${step.file}")); File.write("${step.file}", ${JSON.stringify(step.code)})'`;
        navigator.clipboard.writeText(simpleCmd).then(() => {
          showCopyFeedback(els.rlCopyFileCmd);
        });
      };

      els.rlCopyRunCmd.onclick = () => {
        navigator.clipboard.writeText(runCmd).then(() => {
          showCopyFeedback(els.rlCopyRunCmd);
        });
      };
    } else if (step.terminal) {
      copySection.style.display = '';
      els.rlFileCmdText.parentElement.style.display = 'none';
      els.rlRunCmdText.textContent = step.terminal;
      els.rlCopyRunCmd.onclick = () => {
        navigator.clipboard.writeText(step.terminal).then(() => {
          showCopyFeedback(els.rlCopyRunCmd);
        });
      };
    } else {
      copySection.style.display = 'none';
    }

    // Expected output
    const outputSection = document.getElementById('rl-output-section');
    if (step.output) {
      outputSection.style.display = '';
      document.getElementById('rl-expected-output').textContent = step.output;
    } else {
      outputSection.style.display = 'none';
    }

    // Next step button
    const hasNextStep = rlState.currentStepIndex < chapter.steps.length - 1;
    els.rlNextStep.style.display = hasNextStep ? '' : 'none';
  }

  function showCopyFeedback(btn) {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  }

  // ===== 初期化 =====
  function initRubyLearning() {
    els = getEls();

    // Initialize keyboard and hand guide
    const layoutSelect = document.getElementById('keyboard-select');
    const layout = layoutSelect ? layoutSelect.value : 'US';
    rlKeyboard = new KeyboardRenderer('rl-keyboard', layout);
    rlHandGuide = new HandGuide('rl-hand-guide');

    // Update layout when changed
    if (layoutSelect) {
      layoutSelect.addEventListener('change', () => {
        if (rlKeyboard) {
          rlKeyboard = new KeyboardRenderer('rl-keyboard', layoutSelect.value);
        }
      });
    }

    // Password screen
    els.passwordSubmit.addEventListener('click', checkPassword);
    els.passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkPassword();
      }
    });
    els.passwordBack.addEventListener('click', () => {
      document.getElementById('screen-select').classList.add('active');
      document.getElementById('screen-ruby-password').classList.remove('active');
    });

    // Chapter screen
    els.chapterBack.addEventListener('click', () => {
      document.getElementById('screen-select').classList.add('active');
      document.getElementById('screen-ruby-chapters').classList.remove('active');
    });

    // Step screen
    els.stepBack.addEventListener('click', showChapterScreen);

    // Complete screen
    els.rlNextStep.addEventListener('click', () => {
      rlState.currentStepIndex++;
      const chapter = RUBY_LEARNING_DATA[rlState.currentChapterId];
      const step = chapter.steps[rlState.currentStepIndex];
      if (step.code && step.code.trim().length > 0) {
        startRLTyping();
      } else {
        showRLComplete(true);
      }
    });
    els.rlBackToSteps.addEventListener('click', showStepScreen);
    els.rlBackToChapters.addEventListener('click', showChapterScreen);
  }

  // ===== 公開API =====
  window.RubyLearning = {
    show: showPasswordScreen,
    init: initRubyLearning
  };
})();
