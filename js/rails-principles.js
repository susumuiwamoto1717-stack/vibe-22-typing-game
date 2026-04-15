// Rails基礎原則 学習モード ロジック
// RAILS_PRINCIPLES_CHAPTERS / RAILS_PRINCIPLES_DATA を使用

(function () {
  "use strict";

  // ===== 状態管理 =====
  const rpState = {
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
    flatCode: "",
    isComposing: false,
  };

  // ===== DOM要素（Rails入門と同じscreen-rails-*を共有） =====
  function getEls() {
    return {
      chapterScreen: document.getElementById("screen-rails-chapters"),
      chapterList: document.getElementById("rails-chapter-list"),
      chapterBack: document.getElementById("rails-chapter-back"),
      stepScreen: document.getElementById("screen-rails-steps"),
      stepTitle: document.getElementById("rails-step-title"),
      stepList: document.getElementById("rails-step-list"),
      stepBack: document.getElementById("rails-step-back"),
      typingScreen: document.getElementById("screen-rails-typing"),
      railsTimer: document.getElementById("ra-timer"),
      railsStepInfo: document.getElementById("ra-step-info"),
      railsWpm: document.getElementById("ra-wpm"),
      railsAccuracy: document.getElementById("ra-accuracy"),
      railsExplanation: document.getElementById("ra-explanation"),
      railsCodeArea: document.getElementById("ra-code-area"),
      railsLineNumbers: document.getElementById("ra-line-numbers"),
      railsCodeText: document.getElementById("ra-code-text"),
      railsImeInput: document.getElementById("ra-ime-input"),
      railsFingerGuide: document.getElementById("ra-finger-guide"),
      railsFingerHand: document.getElementById("ra-finger-hand"),
      railsFingerName: document.getElementById("ra-finger-name"),
      completeScreen: document.getElementById("screen-rails-complete"),
      railsResultWpm: document.getElementById("ra-result-wpm"),
      railsResultAccuracy: document.getElementById("ra-result-accuracy"),
      railsResultTime: document.getElementById("ra-result-time"),
      railsResultMiss: document.getElementById("ra-result-miss"),
      railsCompleteExplanation: document.getElementById(
        "ra-complete-explanation",
      ),
      railsNextStep: document.getElementById("ra-next-step"),
      railsBackToSteps: document.getElementById("ra-back-to-steps"),
      railsBackToChapters: document.getElementById("ra-back-to-chapters"),
    };
  }

  let els = null;
  let rpKeyboard = null;
  let rpHandGuide = null;

  // ===== キーボード・手ガイド更新 =====
  function updateFingerGuide(char) {
    if (!rpKeyboard) return;
    if (char === "\n") {
      rpKeyboard.highlightChar("Enter");
    } else {
      rpKeyboard.highlightChar(char);
    }

    const info = rpKeyboard.getFingerInfo(char === "\n" ? "Enter" : char);
    if (info && info.hand) {
      els.railsFingerGuide.classList.remove("hidden");
      els.railsFingerHand.textContent = info.hand;
      els.railsFingerName.textContent = info.name;
    } else if (info) {
      els.railsFingerGuide.classList.remove("hidden");
      els.railsFingerHand.textContent = "";
      els.railsFingerName.textContent = info.name;
    } else {
      els.railsFingerGuide.classList.add("hidden");
      els.railsFingerHand.textContent = "";
      els.railsFingerName.textContent = "";
    }

    if (rpHandGuide && info) {
      rpHandGuide.highlightFinger(info.finger);
    } else if (rpHandGuide) {
      rpHandGuide.clearHighlight();
    }
  }

  // ===== 画面管理 =====
  function showScreen(id) {
    document
      .querySelectorAll("#main > .screen")
      .forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  // ===== 章選択画面 =====
  function showChaptersPublic() {
    if (!els) els = getEls();

    // キーボード・手ガイド初期化（未作成の場合のみ）
    if (!rpKeyboard) {
      const layoutSelect = document.getElementById("keyboard-select");
      const layout = layoutSelect ? layoutSelect.value : "US";
      rpKeyboard = new KeyboardRenderer("ra-keyboard", layout);
      rpHandGuide = new HandGuide("ra-hand-guide");
    }

    // ナビゲーションハンドラをこのモード用に差し替え
    bindNavHandlers();
    showChapterScreen();
  }

  function showChapterScreen() {
    showScreen("screen-rails-chapters");

    // タイトルを原理原則用に変更
    const titleEl = els.chapterScreen.querySelector(".rl-section-title");
    if (titleEl) titleEl.textContent = "Rails基礎原則";
    const descEl = els.chapterScreen.querySelector(".rl-section-desc");
    if (descEl) descEl.textContent = "データの流れを追える力を身につけよう";

    els.chapterList.innerHTML = "";

    // インフォグラフィック
    const infoBlock = document.createElement("div");
    infoBlock.className = "rp-info-block";
    infoBlock.innerHTML = `
      <div class="rp-pyramid-img-wrap">
        <img src="img/rails-principles-pyramid.png" alt="AI時代の原理原則ピラミッド" class="rp-pyramid-img" />
      </div>
      <div class="rp-essence-box">
        <h3 class="rp-essence-title">本質的に理解すべきこと</h3>
        <p class="rp-essence-core">
          <strong>「データがどこから来て、どこを通り、どこへ行くのか」を追える力</strong>
        </p>
        <div class="rp-essence-detail">
          <p>AIにコードを書かせる時代でも、以下を自分の言葉で説明できなければ正しい指示は出せません：</p>
          <ul>
            <li><strong>データの入口</strong> — データベース? フォーム? API? URL?</li>
            <li><strong>データの処理</strong> — Controller? Model? Service?</li>
            <li><strong>データの出口</strong> — View? JSON? リダイレクト?</li>
          </ul>
          <p class="rp-essence-sub">この3つを繋げて説明できることが「原理原則を理解している」ということです。</p>
        </div>
        <div class="rp-essence-checklist">
          <h4>理解度チェック — 答えられますか？</h4>
          <ol>
            <li>Rubyで「すべてがオブジェクト」とは？</li>
            <li>なぜRailsはMVCを採用している？</li>
            <li>「設定より規約」の具体例を1つ挙げよ</li>
            <li>GET /users/1 はどのアクションに到達する？</li>
            <li>フォームのデータはControllerでどう受け取る？</li>
          </ol>
        </div>
      </div>
    `;
    els.chapterList.appendChild(infoBlock);

    // インフォグラフィック拡大表示
    const pyramidImg = infoBlock.querySelector(".rp-pyramid-img");
    if (pyramidImg) {
      pyramidImg.addEventListener("click", () => {
        if (pyramidImg.classList.contains("rp-expanded")) {
          pyramidImg.classList.remove("rp-expanded");
          const overlay = document.querySelector(".rp-overlay");
          if (overlay) overlay.remove();
        } else {
          const overlay = document.createElement("div");
          overlay.className = "rp-overlay";
          overlay.addEventListener("click", () => {
            pyramidImg.classList.remove("rp-expanded");
            overlay.remove();
          });
          document.body.appendChild(overlay);
          pyramidImg.classList.add("rp-expanded");
        }
      });
    }

    let lastPart = 0;
    RAILS_PRINCIPLES_CHAPTERS.forEach((ch) => {
      if (ch.part !== lastPart) {
        lastPart = ch.part;
        const label =
          ch.part === 1
            ? "Rails基礎原則① 〜Ruby・MVC・ルーティング・CRUD〜"
            : "Rails基礎原則② 〜アソシエーション・バリデーション・データフロー〜";
        const badge = document.createElement("div");
        badge.className = "rails-part-badge " + (ch.part === 1 ? "rp1" : "rp2");
        badge.textContent = label;
        els.chapterList.appendChild(badge);
      }

      const btn = document.createElement("button");
      btn.className = "rl-chapter-btn";
      const stepCount = RAILS_PRINCIPLES_DATA[ch.id]
        ? RAILS_PRINCIPLES_DATA[ch.id].steps.length
        : 0;
      btn.innerHTML = `
        <span class="rl-chapter-id" style="color:#e74c3c">Ch ${ch.id}</span>
        <span class="rl-chapter-title">${ch.title.replace(/^Chapter \d+: /, "")}</span>
        <span class="rl-chapter-count">${stepCount}ステップ</span>
      `;
      btn.addEventListener("click", () => {
        rpState.currentChapterId = ch.id;
        showStepScreen();
      });
      els.chapterList.appendChild(btn);
    });
  }

  // ===== ステップ選択画面 =====
  function showStepScreen() {
    showScreen("screen-rails-steps");
    const chapter = RAILS_PRINCIPLES_DATA[rpState.currentChapterId];
    if (!chapter) return;

    els.stepTitle.textContent = `Chapter ${rpState.currentChapterId}: ${chapter.subtitle}`;
    els.stepList.innerHTML = "";

    chapter.steps.forEach((step, index) => {
      const btn = document.createElement("button");
      btn.className = "rl-step-btn";
      btn.innerHTML = `
        <span class="rl-step-number">${step.number}</span>
        <span class="rl-step-title">${step.title}</span>
      `;
      btn.addEventListener("click", () => {
        rpState.currentStepIndex = index;
        startTyping();
      });
      els.stepList.appendChild(btn);
    });
  }

  // ===== タイピング開始 =====
  function startTyping() {
    const chapter = RAILS_PRINCIPLES_DATA[rpState.currentChapterId];
    const step = chapter.steps[rpState.currentStepIndex];

    if (window.Dashboard && window.Dashboard.saveLastSession) {
      window.Dashboard.saveLastSession({
        type: "rails-principles",
        chapterId: rpState.currentChapterId,
        stepIndex: rpState.currentStepIndex,
      });
    }

    rpState.currentCharIndex = 0;
    rpState.totalCorrect = 0;
    rpState.totalMiss = 0;
    rpState.totalChars = 0;
    rpState.missChars = {};
    rpState.startTime = null;
    rpState.elapsedSeconds = 0;

    rpState.flatCode = step.code;
    rpState.codeLines = step.code.split("\n");

    showScreen("screen-rails-typing");

    els.railsStepInfo.textContent = `Chapter ${rpState.currentChapterId} - Step ${step.number}: ${step.title}`;
    els.railsExplanation.textContent = step.explanation;
    els.railsTimer.textContent = "00:00";
    els.railsWpm.textContent = "0";
    els.railsAccuracy.textContent = "100%";

    renderCode();

    const fullText = rpState.codeLines.join("\n");
    if (fullText.length > 0) {
      updateFingerGuide(fullText[0]);
    }

    rpState.isComposing = false;
    els.railsImeInput.value = "";
    els.railsImeInput.focus();
    attachInputHandlers();
  }

  // ===== コード描画 =====
  function renderCode() {
    els.railsLineNumbers.innerHTML = "";
    els.railsCodeText.innerHTML = "";

    rpState.codeLines.forEach((_, i) => {
      const lineNum = document.createElement("div");
      lineNum.className = "rl-line-num";
      lineNum.textContent = i + 1;
      els.railsLineNumbers.appendChild(lineNum);
    });

    let charIndex = 0;
    rpState.codeLines.forEach((line, lineIdx) => {
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

      if (lineIdx < rpState.codeLines.length - 1) {
        const nlSpan = document.createElement("span");
        nlSpan.className = "rl-char rl-newline pending";
        nlSpan.textContent = "↵";
        nlSpan.dataset.index = charIndex;
        lineDiv.appendChild(nlSpan);
        charIndex++;
      }

      els.railsCodeText.appendChild(lineDiv);
    });
  }

  // ===== キー入力処理 =====
  function attachInputHandlers() {
    els.railsImeInput.addEventListener("keydown", handleKeyDown);
    els.railsImeInput.addEventListener(
      "compositionstart",
      handleCompositionStart,
    );
    els.railsImeInput.addEventListener("compositionend", handleCompositionEnd);
    els.railsImeInput.addEventListener("input", handleInput);
    els.railsImeInput._rpBlurHandler = () => {
      if (
        document
          .getElementById("screen-rails-typing")
          .classList.contains("active")
      ) {
        setTimeout(() => els.railsImeInput.focus(), 10);
      }
    };
    els.railsImeInput.addEventListener(
      "blur",
      els.railsImeInput._rpBlurHandler,
    );
  }

  function detachInputHandlers() {
    els.railsImeInput.removeEventListener("keydown", handleKeyDown);
    els.railsImeInput.removeEventListener(
      "compositionstart",
      handleCompositionStart,
    );
    els.railsImeInput.removeEventListener(
      "compositionend",
      handleCompositionEnd,
    );
    els.railsImeInput.removeEventListener("input", handleInput);
    if (els.railsImeInput._rpBlurHandler) {
      els.railsImeInput.removeEventListener(
        "blur",
        els.railsImeInput._rpBlurHandler,
      );
    }
  }

  function handleCompositionStart() {
    rpState.isComposing = true;
  }

  function handleCompositionEnd(e) {
    rpState.isComposing = false;
    const composedText = e.data || "";
    if (composedText) {
      processChars(composedText);
    }
    els.railsImeInput.value = "";
  }

  function handleInput() {
    if (rpState.isComposing) return;
    els.railsImeInput.value = "";
  }

  function handleKeyDown(e) {
    if (e.isComposing || e.key === "Process") return;

    if (e.key === "Escape") {
      e.preventDefault();
      stopTimer();
      detachInputHandlers();
      showStepScreen();
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

    processChars(typedChar);
    els.railsImeInput.value = "";
  }

  function processChars(text) {
    const fullText = rpState.codeLines.join("\n");
    const allChars = els.railsCodeText.querySelectorAll(".rl-char");

    for (let i = 0; i < text.length; i++) {
      if (rpState.currentCharIndex >= fullText.length) break;

      const expectedChar = fullText[rpState.currentCharIndex];
      const typedChar = text[i];

      if (!rpState.startTime) {
        startTimer();
      }

      rpState.totalChars++;
      const currentEl = allChars[rpState.currentCharIndex];

      if (typedChar === expectedChar) {
        rpState.totalCorrect++;
        if (currentEl) {
          currentEl.classList.remove("current", "miss");
          currentEl.classList.add("typed");
        }

        rpState.currentCharIndex++;

        if (rpState.currentCharIndex >= fullText.length) {
          stopTimer();
          detachInputHandlers();
          showComplete();
          return;
        } else {
          const nextEl = allChars[rpState.currentCharIndex];
          if (nextEl) {
            nextEl.classList.remove("pending");
            nextEl.classList.add("current");
            scrollToCurrentLine(nextEl);
          }
          updateFingerGuide(fullText[rpState.currentCharIndex]);
        }
      } else {
        rpState.totalMiss++;
        if (currentEl) {
          currentEl.classList.add("miss");
        }
        if (!rpState.missChars[expectedChar]) {
          rpState.missChars[expectedChar] = 0;
        }
        rpState.missChars[expectedChar]++;
      }
    }

    updateStats();
  }

  function scrollToCurrentLine(el) {
    const lineDiv = el.closest(".rl-code-line");
    if (lineDiv) {
      lineDiv.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  // ===== タイマー =====
  function startTimer() {
    rpState.startTime = Date.now();
    rpState.timerInterval = setInterval(() => {
      rpState.elapsedSeconds = Math.floor(
        (Date.now() - rpState.startTime) / 1000,
      );
      const min = String(Math.floor(rpState.elapsedSeconds / 60)).padStart(
        2,
        "0",
      );
      const sec = String(rpState.elapsedSeconds % 60).padStart(2, "0");
      els.railsTimer.textContent = `${min}:${sec}`;
    }, 200);
  }

  function stopTimer() {
    if (rpState.timerInterval) {
      clearInterval(rpState.timerInterval);
      rpState.timerInterval = null;
    }
  }

  // ===== 統計更新 =====
  function updateStats() {
    if (rpState.startTime && rpState.totalCorrect > 0) {
      const elapsedMin = (Date.now() - rpState.startTime) / 60000;
      if (elapsedMin > 0.01) {
        const wpm = Math.round(rpState.totalCorrect / 5 / elapsedMin);
        els.railsWpm.textContent = String(wpm);
      }
    }
    if (rpState.totalChars > 0) {
      const acc = Math.floor((rpState.totalCorrect / rpState.totalChars) * 100);
      els.railsAccuracy.textContent = `${acc}%`;
    }
  }

  // ===== 完了画面 =====
  function showComplete() {
    showScreen("screen-rails-complete");
    const chapter = RAILS_PRINCIPLES_DATA[rpState.currentChapterId];
    const step = chapter.steps[rpState.currentStepIndex];

    if (window.Dashboard) {
      window.Dashboard.recordSession();
      const nextIndex = rpState.currentStepIndex + 1;
      if (nextIndex < chapter.steps.length) {
        window.Dashboard.saveLastSession({
          type: "rails-principles",
          chapterId: rpState.currentChapterId,
          stepIndex: nextIndex,
        });
      }
    }

    const elapsedMin = rpState.startTime
      ? (Date.now() - rpState.startTime) / 60000
      : 0;
    const wpm =
      elapsedMin > 0.01 ? Math.round(rpState.totalCorrect / 5 / elapsedMin) : 0;
    const accuracy =
      rpState.totalChars > 0
        ? Math.floor((rpState.totalCorrect / rpState.totalChars) * 100)
        : 100;
    const totalSec = rpState.startTime
      ? Math.floor((Date.now() - rpState.startTime) / 1000)
      : 0;
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");

    els.railsResultWpm.textContent = String(wpm);
    els.railsResultAccuracy.textContent = `${accuracy}%`;
    els.railsResultTime.textContent = `${min}:${sec}`;
    els.railsResultMiss.textContent = String(rpState.totalMiss);

    els.railsCompleteExplanation.textContent = step.explanation;

    const hasNextStep = rpState.currentStepIndex < chapter.steps.length - 1;
    els.railsNextStep.style.display = hasNextStep ? "" : "none";
  }

  // ===== ナビゲーションハンドラの付け替え =====
  // Rails入門(rails-learning.js)と共有DOMなので、表示時にハンドラを差し替える
  function bindNavHandlers() {
    // cloneNodeで既存リスナーを除去して差し替え
    function replaceBtn(el, handler) {
      const clone = el.cloneNode(true);
      el.parentNode.replaceChild(clone, el);
      clone.addEventListener("click", handler);
      return clone;
    }

    els.chapterBack = replaceBtn(els.chapterBack, () => {
      if (window.RubyLearning && window.RubyLearning.showCourses) {
        window.RubyLearning.showCourses();
      }
    });
    els.stepBack = replaceBtn(els.stepBack, showChapterScreen);
    els.railsNextStep = replaceBtn(els.railsNextStep, () => {
      rpState.currentStepIndex++;
      startTyping();
    });
    els.railsBackToSteps = replaceBtn(els.railsBackToSteps, showStepScreen);
    els.railsBackToChapters = replaceBtn(
      els.railsBackToChapters,
      showChapterScreen,
    );
  }

  // ===== 初期化 =====
  function initRailsPrinciples() {
    els = getEls();
    // キーボード・手ガイドはRails入門のinit時に作成済みなので、
    // showChapters呼び出し時にlayoutSelectから取得
  }

  // ===== 途中から再開 =====
  function resumeAt(chapterId, stepIndex) {
    if (!els) els = getEls();
    if (!rpKeyboard) {
      const layoutSelect = document.getElementById("keyboard-select");
      const layout = layoutSelect ? layoutSelect.value : "US";
      rpKeyboard = new KeyboardRenderer("ra-keyboard", layout);
      rpHandGuide = new HandGuide("ra-hand-guide");
    }
    bindNavHandlers();
    if (window.RubyLearning && window.RubyLearning.setAuthenticated) {
      window.RubyLearning.setAuthenticated();
    }
    rpState.currentChapterId = chapterId;
    rpState.currentStepIndex = stepIndex;

    const chapter = RAILS_PRINCIPLES_DATA[chapterId];
    if (!chapter || !chapter.steps[stepIndex]) {
      showChapterScreen();
      return;
    }

    startTyping();
  }

  // ===== 公開API =====
  window.RailsPrinciples = {
    showChapters: showChaptersPublic,
    init: initRailsPrinciples,
    resumeAt: resumeAt,
  };
})();
