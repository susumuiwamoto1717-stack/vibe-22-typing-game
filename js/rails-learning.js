// RUNTEQ Rails入門 学習モード ロジック

(function () {
  'use strict';

  // ===== 状態管理 =====
  const railsState = {
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
    codeLines: [],
    flatCode: '',
    isComposing: false,
  };

  // ===== DOM要素 =====
  function getEls() {
    return {
      // Chapter select
      chapterScreen: document.getElementById('screen-rails-chapters'),
      chapterList: document.getElementById('rails-chapter-list'),
      chapterBack: document.getElementById('rails-chapter-back'),
      // Step select
      stepScreen: document.getElementById('screen-rails-steps'),
      stepTitle: document.getElementById('rails-step-title'),
      stepList: document.getElementById('rails-step-list'),
      stepBack: document.getElementById('rails-step-back'),
      // Typing
      typingScreen: document.getElementById('screen-rails-typing'),
      railsTimer: document.getElementById('ra-timer'),
      railsStepInfo: document.getElementById('ra-step-info'),
      railsWpm: document.getElementById('ra-wpm'),
      railsAccuracy: document.getElementById('ra-accuracy'),
      railsExplanation: document.getElementById('ra-explanation'),
      railsCodeArea: document.getElementById('ra-code-area'),
      railsLineNumbers: document.getElementById('ra-line-numbers'),
      railsCodeText: document.getElementById('ra-code-text'),
      railsImeInput: document.getElementById('ra-ime-input'),
      // Keyboard & Hand
      railsFingerGuide: document.getElementById('ra-finger-guide'),
      railsFingerHand: document.getElementById('ra-finger-hand'),
      railsFingerName: document.getElementById('ra-finger-name'),
      // Complete
      completeScreen: document.getElementById('screen-rails-complete'),
      railsResultWpm: document.getElementById('ra-result-wpm'),
      railsResultAccuracy: document.getElementById('ra-result-accuracy'),
      railsResultTime: document.getElementById('ra-result-time'),
      railsResultMiss: document.getElementById('ra-result-miss'),
      railsCompleteExplanation: document.getElementById('ra-complete-explanation'),
      railsNextStep: document.getElementById('ra-next-step'),
      railsBackToSteps: document.getElementById('ra-back-to-steps'),
      railsBackToChapters: document.getElementById('ra-back-to-chapters'),
    };
  }

  let els = null;
  let railsKeyboard = null;
  let railsHandGuide = null;

  // ===== キーボード・手ガイド更新 =====
  function updateFingerGuide(char) {
    if (!railsKeyboard) return;
    if (char === '\n') {
      railsKeyboard.highlightChar('Enter');
    } else {
      railsKeyboard.highlightChar(char);
    }

    const info = railsKeyboard.getFingerInfo(char === '\n' ? 'Enter' : char);
    if (info && info.hand) {
      els.railsFingerGuide.classList.remove('hidden');
      els.railsFingerHand.textContent = info.hand;
      els.railsFingerName.textContent = info.name;
    } else if (info) {
      els.railsFingerGuide.classList.remove('hidden');
      els.railsFingerHand.textContent = '';
      els.railsFingerName.textContent = info.name;
    } else {
      els.railsFingerGuide.classList.add('hidden');
      els.railsFingerHand.textContent = '';
      els.railsFingerName.textContent = '';
    }

    if (railsHandGuide && info) {
      railsHandGuide.highlightFinger(info.finger);
    } else if (railsHandGuide) {
      railsHandGuide.clearHighlight();
    }
  }

  // ===== 画面管理 =====
  function showScreen(id) {
    document.querySelectorAll('#main > .screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
  }

  // ===== 章選択画面 =====
  function showChaptersPublic() {
    if (!els) els = getEls();
    showChapterScreen();
  }

  function showChapterScreen() {
    showScreen('screen-rails-chapters');
    els.chapterList.innerHTML = '';

    let lastPart = 0;
    RAILS_LEARNING_CHAPTERS.forEach(ch => {
      // パート区切りラベル
      if (ch.part !== lastPart) {
        lastPart = ch.part;
        const label = ch.part === 1
          ? 'Rails入門① 〜基本フローの理解〜'
          : 'Rails入門② 〜データモデリングと認証〜';
        const badge = document.createElement('div');
        badge.className = 'rails-part-badge ' + (ch.part === 1 ? 'rp1' : 'rp2');
        badge.textContent = label;
        els.chapterList.appendChild(badge);
      }

      const btn = document.createElement('button');
      btn.className = 'rl-chapter-btn';
      const stepCount = RAILS_LEARNING_DATA[ch.id] ? RAILS_LEARNING_DATA[ch.id].steps.length : 0;
      btn.innerHTML = `
        <span class="rl-chapter-id" style="color:#CC0000">Ch ${ch.id}</span>
        <span class="rl-chapter-title">${ch.title.replace(/^Chapter \d+: /, '')}</span>
        <span class="rl-chapter-count">${stepCount}ステップ</span>
      `;
      btn.addEventListener('click', () => {
        railsState.currentChapterId = ch.id;
        showStepScreen();
      });
      els.chapterList.appendChild(btn);
    });
  }

  // ===== ステップ選択画面 =====
  function showStepScreen() {
    showScreen('screen-rails-steps');
    const chapter = RAILS_LEARNING_DATA[railsState.currentChapterId];
    if (!chapter) return;

    els.stepTitle.textContent = `Chapter ${railsState.currentChapterId}: ${chapter.subtitle}`;
    els.stepList.innerHTML = '';

    chapter.steps.forEach((step, index) => {
      const btn = document.createElement('button');
      btn.className = 'rl-step-btn';
      btn.innerHTML = `
        <span class="rl-step-number">${step.number}</span>
        <span class="rl-step-title">${step.title}</span>
      `;
      btn.addEventListener('click', () => {
        railsState.currentStepIndex = index;
        startTyping();
      });
      els.stepList.appendChild(btn);
    });
  }

  // ===== タイピング開始 =====
  function startTyping() {
    const chapter = RAILS_LEARNING_DATA[railsState.currentChapterId];
    const step = chapter.steps[railsState.currentStepIndex];

    // セッション保存
    if (window.Dashboard && window.Dashboard.saveLastSession) {
      window.Dashboard.saveLastSession({
        type: 'rails-learning',
        chapterId: railsState.currentChapterId,
        stepIndex: railsState.currentStepIndex
      });
    }

    // Reset state
    railsState.currentCharIndex = 0;
    railsState.totalCorrect = 0;
    railsState.totalMiss = 0;
    railsState.totalChars = 0;
    railsState.missChars = {};
    railsState.startTime = null;
    railsState.elapsedSeconds = 0;

    // Parse code
    railsState.flatCode = step.code;
    railsState.codeLines = step.code.split('\n');

    showScreen('screen-rails-typing');

    // Update info
    els.railsStepInfo.textContent = `Chapter ${railsState.currentChapterId} - Step ${step.number}: ${step.title}`;
    els.railsExplanation.textContent = step.explanation;
    els.railsTimer.textContent = '00:00';
    els.railsWpm.textContent = '0';
    els.railsAccuracy.textContent = '100%';

    // Render code
    renderCode();

    // Highlight first character
    const fullText = railsState.codeLines.join('\n');
    if (fullText.length > 0) {
      updateFingerGuide(fullText[0]);
    }

    // Focus
    railsState.isComposing = false;
    els.railsImeInput.value = '';
    els.railsImeInput.focus();
    attachInputHandlers();
  }

  // ===== コード描画 =====
  function renderCode() {
    els.railsLineNumbers.innerHTML = '';
    els.railsCodeText.innerHTML = '';

    railsState.codeLines.forEach((_, i) => {
      const lineNum = document.createElement('div');
      lineNum.className = 'rl-line-num';
      lineNum.textContent = i + 1;
      els.railsLineNumbers.appendChild(lineNum);
    });

    let charIndex = 0;
    railsState.codeLines.forEach((line, lineIdx) => {
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

      if (lineIdx < railsState.codeLines.length - 1) {
        const nlSpan = document.createElement('span');
        nlSpan.className = 'rl-char rl-newline pending';
        nlSpan.textContent = '↵';
        nlSpan.dataset.index = charIndex;
        lineDiv.appendChild(nlSpan);
        charIndex++;
      }

      els.railsCodeText.appendChild(lineDiv);
    });
  }

  // ===== キー入力処理 =====
  function attachInputHandlers() {
    els.railsImeInput.addEventListener('keydown', handleKeyDown);
    els.railsImeInput.addEventListener('compositionstart', handleCompositionStart);
    els.railsImeInput.addEventListener('compositionend', handleCompositionEnd);
    els.railsImeInput.addEventListener('input', handleInput);
    els.railsImeInput._blurHandler = () => {
      if (document.getElementById('screen-rails-typing').classList.contains('active')) {
        setTimeout(() => els.railsImeInput.focus(), 10);
      }
    };
    els.railsImeInput.addEventListener('blur', els.railsImeInput._blurHandler);
  }

  function detachInputHandlers() {
    els.railsImeInput.removeEventListener('keydown', handleKeyDown);
    els.railsImeInput.removeEventListener('compositionstart', handleCompositionStart);
    els.railsImeInput.removeEventListener('compositionend', handleCompositionEnd);
    els.railsImeInput.removeEventListener('input', handleInput);
    if (els.railsImeInput._blurHandler) {
      els.railsImeInput.removeEventListener('blur', els.railsImeInput._blurHandler);
    }
  }

  function handleCompositionStart() {
    railsState.isComposing = true;
  }

  function handleCompositionEnd(e) {
    railsState.isComposing = false;
    const composedText = e.data || '';
    if (composedText) {
      processChars(composedText);
    }
    els.railsImeInput.value = '';
  }

  function handleInput(e) {
    if (railsState.isComposing) return;
    els.railsImeInput.value = '';
  }

  function handleKeyDown(e) {
    if (e.isComposing || e.key === 'Process') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      stopTimer();
      detachInputHandlers();
      showStepScreen();
      return;
    }

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

    processChars(typedChar);
    els.railsImeInput.value = '';
  }

  function processChars(text) {
    const fullText = railsState.codeLines.join('\n');
    const allChars = els.railsCodeText.querySelectorAll('.rl-char');

    for (let i = 0; i < text.length; i++) {
      if (railsState.currentCharIndex >= fullText.length) break;

      const expectedChar = fullText[railsState.currentCharIndex];
      const typedChar = text[i];

      if (!railsState.startTime) {
        startTimer();
      }

      railsState.totalChars++;
      const currentEl = allChars[railsState.currentCharIndex];

      if (typedChar === expectedChar) {
        railsState.totalCorrect++;
        if (currentEl) {
          currentEl.classList.remove('current', 'miss');
          currentEl.classList.add('typed');
        }

        railsState.currentCharIndex++;

        if (railsState.currentCharIndex >= fullText.length) {
          stopTimer();
          detachInputHandlers();
          showComplete();
          return;
        } else {
          const nextEl = allChars[railsState.currentCharIndex];
          if (nextEl) {
            nextEl.classList.remove('pending');
            nextEl.classList.add('current');
            scrollToCurrentLine(nextEl);
          }
          updateFingerGuide(fullText[railsState.currentCharIndex]);
        }
      } else {
        railsState.totalMiss++;
        if (currentEl) {
          currentEl.classList.add('miss');
        }
        if (!railsState.missChars[expectedChar]) {
          railsState.missChars[expectedChar] = 0;
        }
        railsState.missChars[expectedChar]++;
      }
    }

    updateStats();
  }

  function scrollToCurrentLine(el) {
    const lineDiv = el.closest('.rl-code-line');
    if (lineDiv) {
      lineDiv.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  // ===== タイマー =====
  function startTimer() {
    railsState.startTime = Date.now();
    railsState.timerInterval = setInterval(() => {
      railsState.elapsedSeconds = Math.floor((Date.now() - railsState.startTime) / 1000);
      const min = String(Math.floor(railsState.elapsedSeconds / 60)).padStart(2, '0');
      const sec = String(railsState.elapsedSeconds % 60).padStart(2, '0');
      els.railsTimer.textContent = `${min}:${sec}`;
    }, 200);
  }

  function stopTimer() {
    if (railsState.timerInterval) {
      clearInterval(railsState.timerInterval);
      railsState.timerInterval = null;
    }
  }

  // ===== 統計更新 =====
  function updateStats() {
    if (railsState.startTime && railsState.totalCorrect > 0) {
      const elapsedMin = (Date.now() - railsState.startTime) / 60000;
      if (elapsedMin > 0.01) {
        const wpm = Math.round(railsState.totalCorrect / 5 / elapsedMin);
        els.railsWpm.textContent = String(wpm);
      }
    }
    if (railsState.totalChars > 0) {
      const acc = Math.floor((railsState.totalCorrect / railsState.totalChars) * 100);
      els.railsAccuracy.textContent = `${acc}%`;
    }
  }

  // ===== 完了画面 =====
  function showComplete() {
    showScreen('screen-rails-complete');
    const chapter = RAILS_LEARNING_DATA[railsState.currentChapterId];
    const step = chapter.steps[railsState.currentStepIndex];

    // 学習記録を保存
    if (window.Dashboard) {
      window.Dashboard.recordSession();
      const nextIndex = railsState.currentStepIndex + 1;
      if (nextIndex < chapter.steps.length) {
        window.Dashboard.saveLastSession({
          type: 'rails-learning',
          chapterId: railsState.currentChapterId,
          stepIndex: nextIndex
        });
      }
    }

    // Stats
    const elapsedMin = railsState.startTime ? (Date.now() - railsState.startTime) / 60000 : 0;
    const wpm = elapsedMin > 0.01 ? Math.round(railsState.totalCorrect / 5 / elapsedMin) : 0;
    const accuracy = railsState.totalChars > 0 ? Math.floor((railsState.totalCorrect / railsState.totalChars) * 100) : 100;
    const totalSec = railsState.startTime ? Math.floor((Date.now() - railsState.startTime) / 1000) : 0;
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');

    els.railsResultWpm.textContent = String(wpm);
    els.railsResultAccuracy.textContent = `${accuracy}%`;
    els.railsResultTime.textContent = `${min}:${sec}`;
    els.railsResultMiss.textContent = String(railsState.totalMiss);

    // Explanation
    els.railsCompleteExplanation.textContent = step.explanation;

    // Next step button
    const hasNextStep = railsState.currentStepIndex < chapter.steps.length - 1;
    els.railsNextStep.style.display = hasNextStep ? '' : 'none';
  }

  // ===== 初期化 =====
  function initRailsLearning() {
    els = getEls();

    const layoutSelect = document.getElementById('keyboard-select');
    const layout = layoutSelect ? layoutSelect.value : 'US';
    railsKeyboard = new KeyboardRenderer('ra-keyboard', layout);
    railsHandGuide = new HandGuide('ra-hand-guide');

    if (layoutSelect) {
      layoutSelect.addEventListener('change', () => {
        if (railsKeyboard) {
          railsKeyboard = new KeyboardRenderer('ra-keyboard', layoutSelect.value);
        }
      });
    }

    // Chapter screen - 戻るボタンでコース選択へ
    els.chapterBack.addEventListener('click', () => {
      if (window.RubyLearning && window.RubyLearning.showCourses) {
        window.RubyLearning.showCourses();
      }
    });

    // Step screen
    els.stepBack.addEventListener('click', showChapterScreen);

    // Complete screen
    els.railsNextStep.addEventListener('click', () => {
      railsState.currentStepIndex++;
      startTyping();
    });
    els.railsBackToSteps.addEventListener('click', showStepScreen);
    els.railsBackToChapters.addEventListener('click', showChapterScreen);
  }

  // ===== 途中から再開 =====
  function resumeAt(chapterId, stepIndex) {
    if (!els) els = getEls();
    if (window.RubyLearning && window.RubyLearning.setAuthenticated) {
      window.RubyLearning.setAuthenticated();
    }
    railsState.currentChapterId = chapterId;
    railsState.currentStepIndex = stepIndex;

    const chapter = RAILS_LEARNING_DATA[chapterId];
    if (!chapter || !chapter.steps[stepIndex]) {
      showChapterScreen();
      return;
    }

    startTyping();
  }

  // ===== 公開API =====
  window.RailsLearning = {
    showChapters: showChaptersPublic,
    init: initRailsLearning,
    resumeAt: resumeAt
  };
})();
