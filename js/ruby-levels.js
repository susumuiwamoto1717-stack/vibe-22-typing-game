// Ruby 5段階理解レベル タイピングモード ロジック

(function () {
  "use strict";

  // ===== 状態管理 =====
  const lvState = {
    currentChapterId: null,
    currentLevel: 5, // 5から1へ降順
    currentStepIndex: 0, // 現在のレベル内のステップindex
    currentCharIndex: 0,
    totalCorrect: 0,
    totalMiss: 0,
    totalChars: 0,
    missChars: {},
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    codeLines: [],
    flatCode: "",
    isComposing: false,
    // 全体の統計（全レベル通し）
    grandTotalCorrect: 0,
    grandTotalMiss: 0,
    grandTotalChars: 0,
    grandStartTime: null,
  };

  // ===== DOM要素 =====
  let els = null;
  let lvKeyboard = null;
  let lvHandGuide = null;

  function getEls() {
    return {
      // 章選択
      selectScreen: document.getElementById("screen-levels-select"),
      selectList: document.getElementById("levels-chapter-list"),
      selectBack: document.getElementById("levels-select-back"),
      // タイピング画面
      typingScreen: document.getElementById("screen-levels-typing"),
      lvTimer: document.getElementById("lv-timer"),
      lvStepInfo: document.getElementById("lv-step-info"),
      lvWpm: document.getElementById("lv-wpm"),
      lvAccuracy: document.getElementById("lv-accuracy"),
      lvExplanation: document.getElementById("lv-explanation"),
      lvCodeArea: document.getElementById("lv-code-area"),
      lvLineNumbers: document.getElementById("lv-line-numbers"),
      lvCodeText: document.getElementById("lv-code-text"),
      lvImeInput: document.getElementById("lv-ime-input"),
      lvLevelBadge: document.getElementById("lv-level-badge"),
      lvLevelName: document.getElementById("lv-level-name"),
      lvLevelDesc: document.getElementById("lv-level-desc"),
      lvProgress: document.getElementById("lv-progress"),
      lvImage: document.getElementById("lv-infographic"),
      lvImageLevel: document.getElementById("lv-image-level"),
      // 指ガイド
      lvFingerGuide: document.getElementById("lv-finger-guide"),
      lvFingerHand: document.getElementById("lv-finger-hand"),
      lvFingerName: document.getElementById("lv-finger-name"),
      // 完了画面
      completeScreen: document.getElementById("screen-levels-complete"),
      lvResultWpm: document.getElementById("lv-result-wpm"),
      lvResultAccuracy: document.getElementById("lv-result-accuracy"),
      lvResultTime: document.getElementById("lv-result-time"),
      lvResultMiss: document.getElementById("lv-result-miss"),
      lvCompleteTitle: document.getElementById("lv-complete-title"),
      lvCompleteSummary: document.getElementById("lv-complete-summary"),
      lvCompleteBack: document.getElementById("lv-complete-back"),
      lvCompleteDashboard: document.getElementById("lv-complete-dashboard"),
    };
  }

  // ===== 画面管理 =====
  function showLVScreen(id) {
    document
      .querySelectorAll("#main > .screen")
      .forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  // ===== 章選択画面 =====
  function showSelectScreen() {
    if (!els) els = getEls();
    showLVScreen("screen-levels-select");
    els.selectList.innerHTML = "";

    RUBY_LEVELS_CHAPTERS.forEach((ch) => {
      const chData = RUBY_LEVELS_DATA[ch.id];
      const hasData = chData && chData.levels;

      // 全ステップ数をカウント
      let totalSteps = 0;
      if (hasData) {
        const levelKeys = Object.keys(chData.levels).sort((a, b) => b - a);
        levelKeys.forEach((lv) => {
          totalSteps += chData.levels[lv].steps.length;
        });
      }

      const btn = document.createElement("button");
      btn.className = "rl-chapter-btn";
      if (!hasData) {
        btn.style.opacity = "0.4";
        btn.style.cursor = "default";
      }
      btn.innerHTML = `
        <span class="rl-chapter-id" style="color:#e74c3c">Lv</span>
        <span class="rl-chapter-title">${ch.title}</span>
        <span class="rl-chapter-count">${hasData ? "5段階 " + totalSteps + "ステップ" : "準備中"}</span>
      `;
      if (hasData) {
        btn.addEventListener("click", () => {
          lvState.currentChapterId = ch.id;
          startLevelsMode();
        });
      }
      els.selectList.appendChild(btn);
    });
  }

  // ===== レベルモード開始（Lv5から自動スタート） =====
  function startLevelsMode() {
    lvState.currentLevel = 5;
    lvState.currentStepIndex = 0;
    lvState.grandTotalCorrect = 0;
    lvState.grandTotalMiss = 0;
    lvState.grandTotalChars = 0;
    lvState.grandStartTime = Date.now();
    startLVTyping();
  }

  // ===== タイピング開始 =====
  function startLVTyping() {
    const chData = RUBY_LEVELS_DATA[lvState.currentChapterId];
    if (!chData) return;

    const levelData = chData.levels[lvState.currentLevel];
    if (!levelData) return;

    const step = levelData.steps[lvState.currentStepIndex];
    if (!step) return;

    // Reset per-step state
    lvState.currentCharIndex = 0;
    lvState.totalCorrect = 0;
    lvState.totalMiss = 0;
    lvState.totalChars = 0;
    lvState.missChars = {};
    lvState.startTime = null;
    lvState.elapsedSeconds = 0;

    // Parse code
    lvState.flatCode = step.code;
    lvState.codeLines = step.code.split("\n");

    showLVScreen("screen-levels-typing");

    // Update level info
    els.lvLevelBadge.textContent = `Lv${lvState.currentLevel}`;
    els.lvLevelBadge.style.background = levelData.color;
    els.lvLevelName.textContent = levelData.name;
    els.lvLevelDesc.textContent = levelData.description;

    // Update step info
    els.lvStepInfo.textContent = `${chData.title} ${chData.subtitle} - ${step.title}`;
    els.lvExplanation.textContent = step.explanation;
    els.lvTimer.textContent = "00:00";
    els.lvWpm.textContent = "0";
    els.lvAccuracy.textContent = "100%";

    // Update progress dots
    renderProgress();

    // Update image level indicator
    els.lvImageLevel.textContent = `現在: ${levelData.name}`;
    els.lvImageLevel.style.color = levelData.color;

    // Set image
    els.lvImage.src = chData.image;
    els.lvImage.alt = `${chData.title} インフォグラフィック`;

    // Render code
    renderLVCode();

    // Highlight first character
    const fullText = lvState.codeLines.join("\n");
    if (fullText.length > 0) {
      updateLVFingerGuide(fullText[0]);
    }

    // Focus IME input
    lvState.isComposing = false;
    els.lvImeInput.value = "";
    els.lvImeInput.focus();
    attachLVInputHandlers();
  }

  // ===== 進捗ドット描画 =====
  function renderProgress() {
    const chData = RUBY_LEVELS_DATA[lvState.currentChapterId];
    if (!chData) return;

    let html = "";
    const levelKeys = Object.keys(chData.levels).sort((a, b) => b - a); // 5, 4, 3, 2, 1

    levelKeys.forEach((lv) => {
      const lvNum = parseInt(lv);
      const levelData = chData.levels[lv];
      const isActive = lvNum === lvState.currentLevel;
      const isDone = lvNum > lvState.currentLevel;
      const stepCount = levelData.steps.length;

      html += `<div class="lv-progress-group ${isActive ? "active" : ""} ${isDone ? "done" : ""}">`;
      html += `<span class="lv-progress-label" style="color:${levelData.color}">[Lv${lv}]</span>`;

      for (let i = 0; i < stepCount; i++) {
        let dotClass = "lv-dot";
        if (isDone || (isActive && i < lvState.currentStepIndex)) {
          dotClass += " lv-dot-done";
        } else if (isActive && i === lvState.currentStepIndex) {
          dotClass += " lv-dot-current";
        }
        html += `<span class="${dotClass}" style="--dot-color:${levelData.color}"></span>`;
      }
      html += "</div>";
    });

    els.lvProgress.innerHTML = html;
  }

  // ===== コード描画 =====
  function renderLVCode() {
    els.lvLineNumbers.innerHTML = "";
    els.lvCodeText.innerHTML = "";

    lvState.codeLines.forEach((_, i) => {
      const lineNum = document.createElement("div");
      lineNum.className = "rl-line-num";
      lineNum.textContent = i + 1;
      els.lvLineNumbers.appendChild(lineNum);
    });

    let charIndex = 0;
    lvState.codeLines.forEach((line, lineIdx) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "rl-code-line";
      lineDiv.dataset.line = lineIdx;

      for (let i = 0; i < line.length; i++) {
        const span = document.createElement("span");
        span.className = "rl-char pending";
        span.textContent = line[i];
        span.dataset.index = charIndex;
        if (charIndex === 0) {
          span.classList.remove("pending");
          span.classList.add("current");
        }
        lineDiv.appendChild(span);
        charIndex++;
      }

      if (lineIdx < lvState.codeLines.length - 1) {
        const nlSpan = document.createElement("span");
        nlSpan.className = "rl-char rl-newline pending";
        nlSpan.textContent = "\u21B5";
        nlSpan.dataset.index = charIndex;
        lineDiv.appendChild(nlSpan);
        charIndex++;
      }

      els.lvCodeText.appendChild(lineDiv);
    });
  }

  // ===== キーボード・手ガイド更新 =====
  function updateLVFingerGuide(char) {
    if (!lvKeyboard) return;
    if (char === "\n") {
      lvKeyboard.highlightChar("Enter");
    } else {
      lvKeyboard.highlightChar(char);
    }

    const info = lvKeyboard.getFingerInfo(char === "\n" ? "Enter" : char);
    if (info && info.hand) {
      els.lvFingerGuide.classList.remove("hidden");
      els.lvFingerHand.textContent = info.hand;
      els.lvFingerName.textContent = info.name;
    } else if (info) {
      els.lvFingerGuide.classList.remove("hidden");
      els.lvFingerHand.textContent = "";
      els.lvFingerName.textContent = info.name;
    } else {
      els.lvFingerGuide.classList.add("hidden");
      els.lvFingerHand.textContent = "";
      els.lvFingerName.textContent = "";
    }

    if (lvHandGuide && info) {
      lvHandGuide.highlightFinger(info.finger);
    } else if (lvHandGuide) {
      lvHandGuide.clearHighlight();
    }
  }

  // ===== 入力ハンドラー =====
  function attachLVInputHandlers() {
    els.lvImeInput.addEventListener("keydown", handleLVKeyDown);
    els.lvImeInput.addEventListener(
      "compositionstart",
      handleLVCompositionStart,
    );
    els.lvImeInput.addEventListener("compositionend", handleLVCompositionEnd);
    els.lvImeInput.addEventListener("input", handleLVInput);
    els.lvImeInput._blurHandler = () => {
      if (
        document
          .getElementById("screen-levels-typing")
          .classList.contains("active")
      ) {
        setTimeout(() => els.lvImeInput.focus(), 10);
      }
    };
    els.lvImeInput.addEventListener("blur", els.lvImeInput._blurHandler);

    // 画面全体のクリックでフォーカスを戻す
    els.lvImeInput._screenClickHandler = () => {
      if (
        document
          .getElementById("screen-levels-typing")
          .classList.contains("active")
      ) {
        els.lvImeInput.focus();
      }
    };
    document
      .getElementById("screen-levels-typing")
      .addEventListener("click", els.lvImeInput._screenClickHandler);
  }

  function detachLVInputHandlers() {
    els.lvImeInput.removeEventListener("keydown", handleLVKeyDown);
    els.lvImeInput.removeEventListener(
      "compositionstart",
      handleLVCompositionStart,
    );
    els.lvImeInput.removeEventListener(
      "compositionend",
      handleLVCompositionEnd,
    );
    els.lvImeInput.removeEventListener("input", handleLVInput);
    if (els.lvImeInput._blurHandler) {
      els.lvImeInput.removeEventListener("blur", els.lvImeInput._blurHandler);
    }
    if (els.lvImeInput._screenClickHandler) {
      document
        .getElementById("screen-levels-typing")
        .removeEventListener("click", els.lvImeInput._screenClickHandler);
    }
  }

  function handleLVCompositionStart() {
    lvState.isComposing = true;
  }

  function handleLVCompositionEnd(e) {
    lvState.isComposing = false;
    const composedText = e.data || "";
    if (composedText) {
      processLVChars(composedText);
    }
    els.lvImeInput.value = "";
  }

  function handleLVInput() {
    if (lvState.isComposing) return;
    els.lvImeInput.value = "";
  }

  function handleLVKeyDown(e) {
    if (e.isComposing || e.key === "Process") return;

    if (e.key === "Escape") {
      e.preventDefault();
      stopLVTimer();
      detachLVInputHandlers();
      showSelectScreen();
      return;
    }

    if (
      e.key === "Shift" ||
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Meta" ||
      e.key === "CapsLock" ||
      e.key === "Tab" ||
      e.key === "Backspace" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Delete" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.key === "PageUp" ||
      e.key === "PageDown" ||
      e.key === "Insert" ||
      e.ctrlKey ||
      e.metaKey ||
      e.altKey
    ) {
      return;
    }

    e.preventDefault();

    let typedChar = e.key;
    if (typedChar === "Enter") typedChar = "\n";

    processLVChars(typedChar);
    els.lvImeInput.value = "";
  }

  // ===== 文字処理 =====
  function processLVChars(text) {
    const fullText = lvState.codeLines.join("\n");
    const allChars = els.lvCodeText.querySelectorAll(".rl-char");

    for (let i = 0; i < text.length; i++) {
      if (lvState.currentCharIndex >= fullText.length) break;

      const expectedChar = fullText[lvState.currentCharIndex];
      const typedChar = text[i];

      if (!lvState.startTime) {
        startLVTimer();
      }

      lvState.totalChars++;
      lvState.grandTotalChars++;
      const currentEl = allChars[lvState.currentCharIndex];

      if (typedChar === expectedChar) {
        lvState.totalCorrect++;
        lvState.grandTotalCorrect++;
        if (currentEl) {
          currentEl.classList.remove("current", "miss");
          currentEl.classList.add("typed");
        }

        lvState.currentCharIndex++;

        if (lvState.currentCharIndex >= fullText.length) {
          // Step complete - advance to next
          stopLVTimer();
          detachLVInputHandlers();
          advanceToNext();
          return;
        } else {
          const nextEl = allChars[lvState.currentCharIndex];
          if (nextEl) {
            nextEl.classList.remove("pending");
            nextEl.classList.add("current");
            scrollToCurrentLine(nextEl);
          }
          updateLVFingerGuide(fullText[lvState.currentCharIndex]);
        }
      } else {
        lvState.totalMiss++;
        lvState.grandTotalMiss++;
        if (currentEl) {
          currentEl.classList.add("miss");
        }
        if (!lvState.missChars[expectedChar]) {
          lvState.missChars[expectedChar] = 0;
        }
        lvState.missChars[expectedChar]++;
      }
    }

    updateLVStats();
  }

  function scrollToCurrentLine(el) {
    const lineDiv = el.closest(".rl-code-line");
    if (lineDiv) {
      lineDiv.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  // ===== 次のステップ/レベルへ進む =====
  function advanceToNext() {
    const chData = RUBY_LEVELS_DATA[lvState.currentChapterId];
    const levelData = chData.levels[lvState.currentLevel];

    // 現在のレベルに次のステップがあるか
    if (lvState.currentStepIndex + 1 < levelData.steps.length) {
      lvState.currentStepIndex++;
      startLVTyping();
      return;
    }

    // 次のレベル(数字が小さい方)へ
    if (lvState.currentLevel > 1) {
      lvState.currentLevel--;
      lvState.currentStepIndex = 0;
      startLVTyping();
      return;
    }

    // 全レベル完了
    showLVComplete();
  }

  // ===== タイマー =====
  function startLVTimer() {
    lvState.startTime = Date.now();
    lvState.timerInterval = setInterval(() => {
      lvState.elapsedSeconds = Math.floor(
        (Date.now() - lvState.startTime) / 1000,
      );
      // 全体の経過時間を表示
      const totalElapsed = Math.floor(
        (Date.now() - lvState.grandStartTime) / 1000,
      );
      const min = String(Math.floor(totalElapsed / 60)).padStart(2, "0");
      const sec = String(totalElapsed % 60).padStart(2, "0");
      els.lvTimer.textContent = `${min}:${sec}`;
    }, 200);
  }

  function stopLVTimer() {
    if (lvState.timerInterval) {
      clearInterval(lvState.timerInterval);
      lvState.timerInterval = null;
    }
  }

  // ===== 統計更新 =====
  function updateLVStats() {
    if (lvState.grandStartTime && lvState.grandTotalCorrect > 0) {
      const elapsedMin = (Date.now() - lvState.grandStartTime) / 60000;
      if (elapsedMin > 0.01) {
        const wpm = Math.round(lvState.grandTotalCorrect / 5 / elapsedMin);
        els.lvWpm.textContent = String(wpm);
      }
    }
    if (lvState.grandTotalChars > 0) {
      const acc = Math.floor(
        (lvState.grandTotalCorrect / lvState.grandTotalChars) * 100,
      );
      els.lvAccuracy.textContent = `${acc}%`;
    }
  }

  // ===== 完了画面 =====
  function showLVComplete() {
    showLVScreen("screen-levels-complete");

    const chData = RUBY_LEVELS_DATA[lvState.currentChapterId];

    // 全体統計
    const totalElapsed = lvState.grandStartTime
      ? Math.floor((Date.now() - lvState.grandStartTime) / 1000)
      : 0;
    const elapsedMin = totalElapsed / 60;
    const wpm =
      elapsedMin > 0.01
        ? Math.round(lvState.grandTotalCorrect / 5 / elapsedMin)
        : 0;
    const accuracy =
      lvState.grandTotalChars > 0
        ? Math.floor(
            (lvState.grandTotalCorrect / lvState.grandTotalChars) * 100,
          )
        : 100;
    const min = String(Math.floor(totalElapsed / 60)).padStart(2, "0");
    const sec = String(totalElapsed % 60).padStart(2, "0");

    els.lvResultWpm.textContent = String(wpm);
    els.lvResultAccuracy.textContent = `${accuracy}%`;
    els.lvResultTime.textContent = `${min}:${sec}`;
    els.lvResultMiss.textContent = String(lvState.grandTotalMiss);

    els.lvCompleteTitle.textContent = `${chData.title} ${chData.subtitle} - 全レベル完了!`;

    // サマリー: 各レベルのステップ数
    let summaryHtml = "";
    const levelKeys = Object.keys(chData.levels).sort((a, b) => b - a);
    levelKeys.forEach((lv) => {
      const ld = chData.levels[lv];
      summaryHtml += `<div class="lv-complete-level-item">
        <span class="lv-complete-level-badge" style="background:${ld.color}">Lv${lv}</span>
        <span>${ld.name}</span>
        <span class="lv-complete-level-steps">${ld.steps.length}ステップ完了</span>
      </div>`;
    });
    els.lvCompleteSummary.innerHTML = summaryHtml;

    // 学習記録を保存
    if (window.Dashboard) {
      window.Dashboard.recordSession();
    }
  }

  // ===== 初期化 =====
  function initRubyLevels() {
    els = getEls();

    // Initialize keyboard and hand guide
    const layoutSelect = document.getElementById("keyboard-select");
    const layout = layoutSelect ? layoutSelect.value : "US";
    lvKeyboard = new KeyboardRenderer("lv-keyboard", layout);
    lvHandGuide = new HandGuide("lv-hand-guide");

    if (layoutSelect) {
      layoutSelect.addEventListener("change", () => {
        if (lvKeyboard) {
          lvKeyboard = new KeyboardRenderer("lv-keyboard", layoutSelect.value);
        }
      });
    }

    // 章選択の戻るボタン
    els.selectBack.addEventListener("click", () => {
      if (window.Dashboard) {
        window.Dashboard.showDashboard();
      }
    });

    // 完了画面のボタン
    els.lvCompleteBack.addEventListener("click", () => {
      showSelectScreen();
    });

    els.lvCompleteDashboard.addEventListener("click", () => {
      if (window.Dashboard) {
        window.Dashboard.showDashboard();
      }
    });
  }

  // ===== 公開API =====
  window.RubyLevels = {
    show: showSelectScreen,
    init: initRubyLevels,
  };
})();
