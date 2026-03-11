// RUNTEQ Git演習 学習モード ロジック

(function () {
  'use strict';

  const RUNTEQ_PASSWORD = 'runteq';

  // ===== 状態管理 =====
  const glState = {
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
      chapterScreen: document.getElementById('screen-git-chapters'),
      chapterList: document.getElementById('git-chapter-list'),
      chapterBack: document.getElementById('git-chapter-back'),
      // Step select
      stepScreen: document.getElementById('screen-git-steps'),
      stepTitle: document.getElementById('git-step-title'),
      stepList: document.getElementById('git-step-list'),
      stepBack: document.getElementById('git-step-back'),
      // Typing
      typingScreen: document.getElementById('screen-git-typing'),
      glTimer: document.getElementById('gl-timer'),
      glStepInfo: document.getElementById('gl-step-info'),
      glWpm: document.getElementById('gl-wpm'),
      glAccuracy: document.getElementById('gl-accuracy'),
      glExplanation: document.getElementById('gl-explanation'),
      glCodeArea: document.getElementById('gl-code-area'),
      glLineNumbers: document.getElementById('gl-line-numbers'),
      glCodeText: document.getElementById('gl-code-text'),
      glImeInput: document.getElementById('gl-ime-input'),
      glCopySkip: document.getElementById('gl-copy-skip'),
      // Keyboard & Hand
      glFingerGuide: document.getElementById('gl-finger-guide'),
      glFingerHand: document.getElementById('gl-finger-hand'),
      glFingerName: document.getElementById('gl-finger-name'),
      // Complete
      completeScreen: document.getElementById('screen-git-complete'),
      glResultWpm: document.getElementById('gl-result-wpm'),
      glResultAccuracy: document.getElementById('gl-result-accuracy'),
      glResultTime: document.getElementById('gl-result-time'),
      glResultMiss: document.getElementById('gl-result-miss'),
      glCompleteExplanation: document.getElementById('gl-complete-explanation'),
      glCopyCmd: document.getElementById('gl-copy-cmd'),
      glCmdText: document.getElementById('gl-cmd-text'),
      glNextStep: document.getElementById('gl-next-step'),
      glBackToSteps: document.getElementById('gl-back-to-steps'),
      glBackToChapters: document.getElementById('gl-back-to-chapters'),
    };
  }

  let els = null;
  let glKeyboard = null;
  let glHandGuide = null;

  // ===== キーボード・手ガイド更新 =====
  function updateGLFingerGuide(char) {
    if (!glKeyboard) return;
    if (char === '\n') {
      glKeyboard.highlightChar('Enter');
    } else {
      glKeyboard.highlightChar(char);
    }

    const info = glKeyboard.getFingerInfo(char === '\n' ? 'Enter' : char);
    if (info && info.hand) {
      els.glFingerGuide.classList.remove('hidden');
      els.glFingerHand.textContent = info.hand;
      els.glFingerName.textContent = info.name;
    } else if (info) {
      els.glFingerGuide.classList.remove('hidden');
      els.glFingerHand.textContent = '';
      els.glFingerName.textContent = info.name;
    } else {
      els.glFingerGuide.classList.add('hidden');
      els.glFingerHand.textContent = '';
      els.glFingerName.textContent = '';
    }

    if (glHandGuide && info) {
      glHandGuide.highlightFinger(info.finger);
    } else if (glHandGuide) {
      glHandGuide.clearHighlight();
    }
  }

  // ===== 画面管理 =====
  function showGLScreen(id) {
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
    showGLScreen('screen-git-chapters');
    els.chapterList.innerHTML = '';

    GIT_LEARNING_CHAPTERS.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'rl-chapter-btn';
      const stepCount = GIT_LEARNING_DATA[ch.id] ? GIT_LEARNING_DATA[ch.id].steps.length : 0;
      btn.innerHTML = `
        <span class="rl-chapter-id">Chapter ${ch.id}</span>
        <span class="rl-chapter-title">${ch.title.replace(/^Chapter \d+: /, '')}</span>
        <span class="rl-chapter-count">${stepCount}ステップ</span>
      `;
      btn.addEventListener('click', () => {
        glState.currentChapterId = ch.id;
        showStepScreen();
      });
      els.chapterList.appendChild(btn);
    });
  }

  // ===== ステップ選択画面 =====
  function showStepScreen() {
    showGLScreen('screen-git-steps');
    const chapter = GIT_LEARNING_DATA[glState.currentChapterId];
    if (!chapter) return;

    els.stepTitle.textContent = `Chapter ${glState.currentChapterId}: ${chapter.subtitle}`;
    els.stepList.innerHTML = '';

    chapter.steps.forEach((step, index) => {
      const btn = document.createElement('button');
      btn.className = 'rl-step-btn';
      btn.innerHTML = `
        <span class="rl-step-number">${step.number}</span>
        <span class="rl-step-title">${step.title}</span>
      `;
      btn.addEventListener('click', () => {
        glState.currentStepIndex = index;
        startGLTyping();
      });
      els.stepList.appendChild(btn);
    });
  }

  // ===== タイピング開始 =====
  function startGLTyping() {
    const chapter = GIT_LEARNING_DATA[glState.currentChapterId];
    const step = chapter.steps[glState.currentStepIndex];

    // セッション保存
    if (window.Dashboard && window.Dashboard.saveLastSession) {
      window.Dashboard.saveLastSession({
        type: 'git-learning',
        chapterId: glState.currentChapterId,
        stepIndex: glState.currentStepIndex
      });
    }

    // Reset state
    glState.currentCharIndex = 0;
    glState.totalCorrect = 0;
    glState.totalMiss = 0;
    glState.totalChars = 0;
    glState.missChars = {};
    glState.startTime = null;
    glState.elapsedSeconds = 0;

    // Parse code
    glState.flatCode = step.code;
    glState.codeLines = step.code.split('\n');

    showGLScreen('screen-git-typing');

    // Update info
    els.glStepInfo.textContent = `Chapter ${glState.currentChapterId} - Step ${step.number}: ${step.title}`;
    els.glExplanation.textContent = step.explanation;
    els.glTimer.textContent = '00:00';
    els.glWpm.textContent = '0';
    els.glAccuracy.textContent = '100%';

    // Copy skip button
    els.glCopySkip.onclick = () => {
      navigator.clipboard.writeText(step.code).then(() => {
        const orig = els.glCopySkip.textContent;
        els.glCopySkip.textContent = 'Copied!';
        els.glCopySkip.classList.add('copied');
        setTimeout(() => {
          els.glCopySkip.textContent = orig;
          els.glCopySkip.classList.remove('copied');
        }, 1500);
      });
    };

    // Render code
    renderGLCode();

    // Highlight first character
    const fullText = glState.codeLines.join('\n');
    if (fullText.length > 0) {
      updateGLFingerGuide(fullText[0]);
    }

    // Focus
    glState.isComposing = false;
    els.glImeInput.value = '';
    els.glImeInput.focus();
    attachGLInputHandlers();
  }

  // ===== コード描画 =====
  function renderGLCode() {
    els.glLineNumbers.innerHTML = '';
    els.glCodeText.innerHTML = '';

    glState.codeLines.forEach((_, i) => {
      const lineNum = document.createElement('div');
      lineNum.className = 'rl-line-num';
      lineNum.textContent = i + 1;
      els.glLineNumbers.appendChild(lineNum);
    });

    let charIndex = 0;
    glState.codeLines.forEach((line, lineIdx) => {
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

      if (lineIdx < glState.codeLines.length - 1) {
        const nlSpan = document.createElement('span');
        nlSpan.className = 'rl-char rl-newline pending';
        nlSpan.textContent = '↵';
        nlSpan.dataset.index = charIndex;
        lineDiv.appendChild(nlSpan);
        charIndex++;
      }

      els.glCodeText.appendChild(lineDiv);
    });
  }

  // ===== キー入力処理 =====
  function attachGLInputHandlers() {
    els.glImeInput.addEventListener('keydown', handleGLKeyDown);
    els.glImeInput.addEventListener('compositionstart', handleGLCompositionStart);
    els.glImeInput.addEventListener('compositionend', handleGLCompositionEnd);
    els.glImeInput.addEventListener('input', handleGLInput);
    els.glImeInput._blurHandler = () => {
      if (document.getElementById('screen-git-typing').classList.contains('active')) {
        setTimeout(() => els.glImeInput.focus(), 10);
      }
    };
    els.glImeInput.addEventListener('blur', els.glImeInput._blurHandler);
  }

  function detachGLInputHandlers() {
    els.glImeInput.removeEventListener('keydown', handleGLKeyDown);
    els.glImeInput.removeEventListener('compositionstart', handleGLCompositionStart);
    els.glImeInput.removeEventListener('compositionend', handleGLCompositionEnd);
    els.glImeInput.removeEventListener('input', handleGLInput);
    if (els.glImeInput._blurHandler) {
      els.glImeInput.removeEventListener('blur', els.glImeInput._blurHandler);
    }
  }

  function handleGLCompositionStart() {
    glState.isComposing = true;
  }

  function handleGLCompositionEnd(e) {
    glState.isComposing = false;
    const composedText = e.data || '';
    if (composedText) {
      processGLChars(composedText);
    }
    els.glImeInput.value = '';
  }

  function handleGLInput(e) {
    if (glState.isComposing) return;
    els.glImeInput.value = '';
  }

  function handleGLKeyDown(e) {
    if (e.isComposing || e.key === 'Process') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      stopGLTimer();
      detachGLInputHandlers();
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

    processGLChars(typedChar);
    els.glImeInput.value = '';
  }

  function processGLChars(text) {
    const fullText = glState.codeLines.join('\n');
    const allChars = els.glCodeText.querySelectorAll('.rl-char');

    for (let i = 0; i < text.length; i++) {
      if (glState.currentCharIndex >= fullText.length) break;

      const expectedChar = fullText[glState.currentCharIndex];
      const typedChar = text[i];

      if (!glState.startTime) {
        startGLTimer();
      }

      glState.totalChars++;
      const currentEl = allChars[glState.currentCharIndex];

      if (typedChar === expectedChar) {
        glState.totalCorrect++;
        if (currentEl) {
          currentEl.classList.remove('current', 'miss');
          currentEl.classList.add('typed');
        }

        glState.currentCharIndex++;

        if (glState.currentCharIndex >= fullText.length) {
          stopGLTimer();
          detachGLInputHandlers();
          showGLComplete();
          return;
        } else {
          const nextEl = allChars[glState.currentCharIndex];
          if (nextEl) {
            nextEl.classList.remove('pending');
            nextEl.classList.add('current');
            scrollToCurrentLine(nextEl);
          }
          updateGLFingerGuide(fullText[glState.currentCharIndex]);
        }
      } else {
        glState.totalMiss++;
        if (currentEl) {
          currentEl.classList.add('miss');
        }
        if (!glState.missChars[expectedChar]) {
          glState.missChars[expectedChar] = 0;
        }
        glState.missChars[expectedChar]++;
      }
    }

    updateGLStats();
  }

  function scrollToCurrentLine(el) {
    const lineDiv = el.closest('.rl-code-line');
    if (lineDiv) {
      lineDiv.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  // ===== タイマー =====
  function startGLTimer() {
    glState.startTime = Date.now();
    glState.timerInterval = setInterval(() => {
      glState.elapsedSeconds = Math.floor((Date.now() - glState.startTime) / 1000);
      const min = String(Math.floor(glState.elapsedSeconds / 60)).padStart(2, '0');
      const sec = String(glState.elapsedSeconds % 60).padStart(2, '0');
      els.glTimer.textContent = `${min}:${sec}`;
    }, 200);
  }

  function stopGLTimer() {
    if (glState.timerInterval) {
      clearInterval(glState.timerInterval);
      glState.timerInterval = null;
    }
  }

  // ===== 統計更新 =====
  function updateGLStats() {
    if (glState.startTime && glState.totalCorrect > 0) {
      const elapsedMin = (Date.now() - glState.startTime) / 60000;
      if (elapsedMin > 0.01) {
        const wpm = Math.round(glState.totalCorrect / 5 / elapsedMin);
        els.glWpm.textContent = String(wpm);
      }
    }
    if (glState.totalChars > 0) {
      const acc = Math.floor((glState.totalCorrect / glState.totalChars) * 100);
      els.glAccuracy.textContent = `${acc}%`;
    }
  }

  // ===== 完了画面 =====
  function showGLComplete() {
    showGLScreen('screen-git-complete');
    const chapter = GIT_LEARNING_DATA[glState.currentChapterId];
    const step = chapter.steps[glState.currentStepIndex];

    // 学習記録を保存
    if (window.Dashboard) {
      window.Dashboard.recordSession();
      const nextIndex = glState.currentStepIndex + 1;
      if (nextIndex < chapter.steps.length) {
        window.Dashboard.saveLastSession({
          type: 'git-learning',
          chapterId: glState.currentChapterId,
          stepIndex: nextIndex
        });
      }
    }

    // Stats
    const elapsedMin = glState.startTime ? (Date.now() - glState.startTime) / 60000 : 0;
    const wpm = elapsedMin > 0.01 ? Math.round(glState.totalCorrect / 5 / elapsedMin) : 0;
    const accuracy = glState.totalChars > 0 ? Math.floor((glState.totalCorrect / glState.totalChars) * 100) : 100;
    const totalSec = glState.startTime ? Math.floor((Date.now() - glState.startTime) / 1000) : 0;
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');

    els.glResultWpm.textContent = String(wpm);
    els.glResultAccuracy.textContent = `${accuracy}%`;
    els.glResultTime.textContent = `${min}:${sec}`;
    els.glResultMiss.textContent = String(glState.totalMiss);

    // Explanation
    els.glCompleteExplanation.textContent = step.explanation;

    // Terminal command to copy (the typed code itself)
    els.glCmdText.textContent = step.code;
    els.glCopyCmd.onclick = () => {
      navigator.clipboard.writeText(step.code).then(() => {
        showCopyFeedback(els.glCopyCmd);
      });
    };

    // Expected output
    const outputSection = document.getElementById('gl-output-section');
    if (step.output) {
      outputSection.style.display = '';
      document.getElementById('gl-expected-output').textContent = step.output;
    } else {
      outputSection.style.display = 'none';
    }

    // Next step button
    const hasNextStep = glState.currentStepIndex < chapter.steps.length - 1;
    els.glNextStep.style.display = hasNextStep ? '' : 'none';
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
  function initGitLearning() {
    els = getEls();

    const layoutSelect = document.getElementById('keyboard-select');
    const layout = layoutSelect ? layoutSelect.value : 'US';
    glKeyboard = new KeyboardRenderer('gl-keyboard', layout);
    glHandGuide = new HandGuide('gl-hand-guide');

    if (layoutSelect) {
      layoutSelect.addEventListener('change', () => {
        if (glKeyboard) {
          glKeyboard = new KeyboardRenderer('gl-keyboard', layoutSelect.value);
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
    els.glNextStep.addEventListener('click', () => {
      glState.currentStepIndex++;
      startGLTyping();
    });
    els.glBackToSteps.addEventListener('click', showStepScreen);
    els.glBackToChapters.addEventListener('click', showChapterScreen);
  }

  // ===== 途中から再開 =====
  function resumeAt(chapterId, stepIndex) {
    if (!els) els = getEls();
    // Ruby側の認証もセット（共通パスワード）
    if (window.RubyLearning && window.RubyLearning.setAuthenticated) {
      window.RubyLearning.setAuthenticated();
    }
    glState.currentChapterId = chapterId;
    glState.currentStepIndex = stepIndex;

    const chapter = GIT_LEARNING_DATA[chapterId];
    if (!chapter || !chapter.steps[stepIndex]) {
      showChapterScreen();
      return;
    }

    startGLTyping();
  }

  // ===== 公開API =====
  window.GitLearning = {
    showChapters: showChaptersPublic,
    init: initGitLearning,
    resumeAt: resumeAt
  };
})();
