// メインアプリロジック

(function () {
  "use strict";

  // ===== 状態管理 =====
  const state = {
    currentScreen: "select", // select, ready, typing, result
    currentMode: null,
    snippets: [],
    currentSnippetIndex: 0,
    currentCharIndex: 0,
    totalCorrect: 0,
    totalMiss: 0,
    totalChars: 0,
    missChars: {}, // { 文字: ミス回数 }
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    keyboardLayout: "US",
  };

  // ===== DOM要素 =====
  const screens = {
    dashboard: document.getElementById("screen-dashboard"),
    select: document.getElementById("screen-select"),
    ready: document.getElementById("screen-ready"),
    typing: document.getElementById("screen-typing"),
    result: document.getElementById("screen-result"),
  };

  const els = {
    keyboardSelect: document.getElementById("keyboard-select"),
    readyModeName: document.getElementById("ready-mode-name"),
    timer: document.getElementById("timer"),
    questionCount: document.getElementById("question-count"),
    wpm: document.getElementById("wpm"),
    accuracy: document.getElementById("accuracy"),
    symbolGuide: document.getElementById("symbol-guide"),
    guideChar: document.getElementById("guide-char"),
    guideName: document.getElementById("guide-name"),
    guideUsage: document.getElementById("guide-usage"),
    typingHint: document.getElementById("typing-hint"),
    typingText: document.getElementById("typing-text"),
    resultLevel: document.getElementById("result-level"),
    resultScore: document.getElementById("result-score"),
    resultWpm: document.getElementById("result-wpm"),
    resultAccuracy: document.getElementById("result-accuracy"),
    resultTime: document.getElementById("result-time"),
    resultChars: document.getElementById("result-chars"),
    resultMiss: document.getElementById("result-miss"),
    resultMissChars: document.getElementById("result-miss-chars"),
    missCharList: document.getElementById("miss-char-list"),
    btnRetry: document.getElementById("btn-retry"),
    btnBack: document.getElementById("btn-back"),
    fingerGuide: document.getElementById("finger-guide"),
    fingerHand: document.getElementById("finger-hand"),
    fingerName: document.getElementById("finger-name"),
  };

  // キーボードレンダラー（待機画面用とタイピング画面用で共有）
  let keyboardReady = null;
  let keyboardTyping = null;
  let handGuideTyping = null;

  // ===== 画面切り替え =====
  function showScreen(name) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle("active", key === name);
    });
    state.currentScreen = name;
  }

  // ===== キーボード初期化 =====
  function initKeyboards() {
    keyboardReady = new KeyboardRenderer(
      "keyboard-ready",
      state.keyboardLayout,
    );
    keyboardTyping = new KeyboardRenderer(
      "keyboard-typing",
      state.keyboardLayout,
    );
    handGuideTyping = new HandGuide("hand-guide-typing");
  }

  function updateKeyboardLayout(layout) {
    state.keyboardLayout = layout;
    if (keyboardReady) keyboardReady.setLayout(layout);
    if (keyboardTyping) keyboardTyping.setLayout(layout);
  }

  // ===== モード選択 =====
  function selectMode(mode) {
    state.currentMode = mode;

    const modeNames = {
      symbols: "記号特訓",
      html_css: "HTML / CSS",
      javascript: "JavaScript",
      ruby: "Ruby",
      mix: "ミックス",
    };

    els.readyModeName.textContent = modeNames[mode] || mode;
    showScreen("ready");

    // セッション保存
    if (window.Dashboard && window.Dashboard.saveLastSession) {
      window.Dashboard.saveLastSession({ type: "normal", mode: mode });
    }

    // キーボードのスペースキーをハイライト
    if (keyboardReady) keyboardReady.highlightSpace();
  }

  // ===== タイピング開始 =====
  function startTyping() {
    // スニペット取得
    state.snippets = getSnippets(state.currentMode, 5);
    state.currentSnippetIndex = 0;
    state.currentCharIndex = 0;
    state.totalCorrect = 0;
    state.totalMiss = 0;
    state.totalChars = 0;
    state.missChars = {};
    state.startTime = null;
    state.elapsedSeconds = 0;

    showScreen("typing");
    loadSnippet();
  }

  // ===== スニペット読み込み =====
  function loadSnippet() {
    const snippet = state.snippets[state.currentSnippetIndex];
    if (!snippet) {
      finishTyping();
      return;
    }

    state.currentCharIndex = 0;

    // 問題数表示
    els.questionCount.textContent = `${state.currentSnippetIndex + 1} / ${state.snippets.length}`;

    // ヒント表示
    els.typingHint.textContent = snippet.hint || "";

    // テキスト描画
    renderText(snippet.text);

    // 最初の文字のガイド表示
    updateSymbolGuide(snippet.text[0]);

    // キーボードハイライト + 指ガイド
    if (keyboardTyping) keyboardTyping.highlightChar(snippet.text[0]);
    updateFingerGuide(snippet.text[0]);
  }

  // ===== テキスト描画 =====
  function renderText(text) {
    els.typingText.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = text[i];
      if (i === 0) {
        span.classList.add("current");
      } else {
        span.classList.add("pending");
      }
      span.dataset.index = i;
      els.typingText.appendChild(span);
    }
  }

  // ===== 記号ガイド更新 =====
  function updateSymbolGuide(char) {
    const info = getSymbolInfo(char);
    if (info) {
      els.symbolGuide.classList.remove("hidden");
      els.guideChar.textContent = `「${char}」`;
      els.guideName.textContent = `${info.en} / ${info.ja}`;
      els.guideUsage.textContent = info.usage;
    } else {
      els.symbolGuide.classList.add("hidden");
      els.guideChar.textContent = "";
      els.guideName.textContent = "";
      els.guideUsage.textContent = "";
    }
  }

  // ===== 指ガイド更新 =====
  function updateFingerGuide(char) {
    if (!keyboardTyping) return;
    const info = keyboardTyping.getFingerInfo(char);
    if (info && info.hand) {
      els.fingerGuide.classList.remove("hidden");
      els.fingerHand.textContent = info.hand;
      els.fingerName.textContent = info.name;
    } else if (info) {
      // スペース（親指）
      els.fingerGuide.classList.remove("hidden");
      els.fingerHand.textContent = "";
      els.fingerName.textContent = info.name;
    } else {
      els.fingerGuide.classList.add("hidden");
      els.fingerHand.textContent = "";
      els.fingerName.textContent = "";
    }

    // 手のイラストのハイライト
    if (handGuideTyping && info) {
      handGuideTyping.highlightFinger(info.finger);
    } else if (handGuideTyping) {
      handGuideTyping.clearHighlight();
    }
  }

  // ===== タイマー =====
  function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(() => {
      state.elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
      const min = String(Math.floor(state.elapsedSeconds / 60)).padStart(
        2,
        "0",
      );
      const sec = String(state.elapsedSeconds % 60).padStart(2, "0");
      els.timer.textContent = `${min}:${sec}`;
      updateWPM();
    }, 200);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  // ===== WPM計算 =====
  function updateWPM() {
    if (!state.startTime || state.totalCorrect === 0) {
      els.wpm.textContent = "0";
      return;
    }
    const elapsedMin = (Date.now() - state.startTime) / 60000;
    if (elapsedMin < 0.01) return;
    const wpm = Math.round(state.totalCorrect / 5 / elapsedMin);
    els.wpm.textContent = String(wpm);
  }

  // ===== 正確率計算 =====
  function updateAccuracy() {
    if (state.totalChars === 0) {
      els.accuracy.textContent = "100%";
      return;
    }
    const acc = Math.floor((state.totalCorrect / state.totalChars) * 100);
    els.accuracy.textContent = `${acc}%`;
  }

  // ===== キー入力処理 =====
  function handleKeyDown(e) {
    // Escape で中断
    if (e.key === "Escape") {
      e.preventDefault();
      if (state.currentScreen === "typing") {
        stopTimer();
        showScreen("select");
        return;
      }
      if (state.currentScreen === "ready" || state.currentScreen === "select") {
        if (window.Dashboard) {
          window.Dashboard.showDashboard();
        } else {
          showScreen("select");
        }
        return;
      }
      return;
    }

    // 待機画面でスペースキー → 開始
    if (state.currentScreen === "ready") {
      if (e.key === " ") {
        e.preventDefault();
        startTyping();
      }
      return;
    }

    // タイピング中
    if (state.currentScreen !== "typing") return;

    // 制御キーは無視
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
      e.key === "Enter" ||
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

    const snippet = state.snippets[state.currentSnippetIndex];
    if (!snippet) return;

    const expectedChar = snippet.text[state.currentCharIndex];
    const typedChar = e.key;
    const charEls = els.typingText.querySelectorAll(".char");
    const currentEl = charEls[state.currentCharIndex];

    // タイマー開始（最初の入力時）
    if (!state.startTime) {
      startTimer();
    }

    state.totalChars++;

    if (typedChar === expectedChar) {
      // 正解
      state.totalCorrect++;
      currentEl.classList.remove("current", "miss");
      currentEl.classList.add("typed");

      state.currentCharIndex++;

      if (state.currentCharIndex >= snippet.text.length) {
        // 次の問題へ
        state.currentSnippetIndex++;
        if (state.currentSnippetIndex >= state.snippets.length) {
          finishTyping();
        } else {
          loadSnippet();
        }
      } else {
        // 次の文字
        const nextEl = charEls[state.currentCharIndex];
        nextEl.classList.remove("pending");
        nextEl.classList.add("current");

        const nextChar = snippet.text[state.currentCharIndex];
        updateSymbolGuide(nextChar);
        if (keyboardTyping) keyboardTyping.highlightChar(nextChar);
        updateFingerGuide(nextChar);
      }
    } else {
      // ミス
      state.totalMiss++;
      currentEl.classList.add("miss");

      // ミス文字を記録
      if (!state.missChars[expectedChar]) {
        state.missChars[expectedChar] = 0;
      }
      state.missChars[expectedChar]++;
    }

    updateAccuracy();
    updateWPM();
  }

  // ===== タイピング終了 =====
  function finishTyping() {
    stopTimer();

    const elapsedMin = state.startTime
      ? (Date.now() - state.startTime) / 60000
      : 0;
    const wpm =
      elapsedMin > 0.01 ? Math.round(state.totalCorrect / 5 / elapsedMin) : 0;
    const accuracy =
      state.totalChars > 0
        ? Math.floor((state.totalCorrect / state.totalChars) * 100)
        : 100;

    // スコア計算（WPM × 正確率 / 100）
    const score = Math.round(wpm * (accuracy / 100));

    // レベル判定
    const level = getLevel(score);

    // 時間表示
    const totalSec = state.startTime
      ? Math.floor((Date.now() - state.startTime) / 1000)
      : 0;
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");

    // 結果画面に反映
    els.resultLevel.textContent = level.name;
    els.resultLevel.style.color = level.color;
    els.resultScore.textContent = `スコア: ${score}`;
    els.resultWpm.textContent = String(wpm);
    els.resultAccuracy.textContent = `${accuracy}%`;
    els.resultTime.textContent = `${min}:${sec}`;
    els.resultChars.textContent = String(state.totalCorrect);
    els.resultMiss.textContent = String(state.totalMiss);

    // ミス文字一覧
    renderMissChars();

    showScreen("result");

    // 学習記録を保存
    if (window.Dashboard) {
      window.Dashboard.recordSession();
    }
  }

  // ===== レベル判定 =====
  function getLevel(score) {
    if (score >= 300) return { name: "Thunder", color: "#9b59b6" };
    if (score >= 250) return { name: "Comet", color: "#e74c3c" };
    if (score >= 200) return { name: "Ninja", color: "#e67e22" };
    if (score >= 150) return { name: "Professor", color: "#f1c40f" };
    if (score >= 100) return { name: "Fast", color: "#2ecc71" };
    if (score >= 75) return { name: "Good!", color: "#3498db" };
    if (score >= 50) return { name: "OK", color: "#1abc9c" };
    if (score >= 25) return { name: "Slow", color: "#95a5a6" };
    return { name: "Practice", color: "#bdc3c7" };
  }

  // ===== ミス文字表示 =====
  function renderMissChars() {
    const missKeys = Object.keys(state.missChars);
    if (missKeys.length === 0) {
      els.resultMissChars.classList.add("no-miss");
      els.missCharList.innerHTML = "";
      return;
    }

    els.resultMissChars.classList.remove("no-miss");
    els.missCharList.innerHTML = "";

    // ミス回数順にソート
    missKeys.sort((a, b) => state.missChars[b] - state.missChars[a]);

    missKeys.forEach((char) => {
      const div = document.createElement("div");
      div.className = "miss-char-item";

      const charSpan = document.createElement("span");
      charSpan.textContent = char === " " ? "␣" : char;

      const countSpan = document.createElement("span");
      countSpan.className = "miss-count";
      countSpan.textContent = `${state.missChars[char]}回`;

      // 記号ガイドがあれば名前も表示
      const info = getSymbolInfo(char);
      if (info) {
        const nameSpan = document.createElement("span");
        nameSpan.className = "miss-count";
        nameSpan.textContent = info.en;
        div.appendChild(charSpan);
        div.appendChild(nameSpan);
        div.appendChild(countSpan);
      } else {
        div.appendChild(charSpan);
        div.appendChild(countSpan);
      }

      els.missCharList.appendChild(div);
    });
  }

  // ===== イベントリスナー =====
  function init() {
    // キーボード初期化
    initKeyboards();

    // ヘッダータイトルクリック → ダッシュボードへ
    const headerTitle = document.getElementById("header-title");
    if (headerTitle) {
      headerTitle.addEventListener("click", () => {
        stopTimer();
        if (window.Dashboard) {
          window.Dashboard.showDashboard();
        }
      });
    }

    // キーボードレイアウト変更
    els.keyboardSelect.addEventListener("change", (e) => {
      updateKeyboardLayout(e.target.value);
    });

    // モード選択ボタン（Ruby学習モードボタンは除外）
    document.querySelectorAll(".mode-btn[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectMode(btn.dataset.mode);
      });
    });

    // キー入力
    document.addEventListener("keydown", handleKeyDown);

    // もう一度ボタン
    els.btnRetry.addEventListener("click", () => {
      selectMode(state.currentMode);
    });

    // 戻るボタン → ダッシュボードに戻る
    els.btnBack.addEventListener("click", () => {
      if (window.Dashboard) {
        window.Dashboard.showDashboard();
      } else {
        showScreen("select");
      }
    });

    // RUNTEQ学習モード
    const btnRunteqLearning = document.getElementById("btn-runteq-learning");
    if (btnRunteqLearning) {
      btnRunteqLearning.addEventListener("click", (e) => {
        e.stopPropagation();
        if (window.RubyLearning) {
          window.RubyLearning.show();
        }
      });
    }

    // Ruby学習モード初期化
    if (window.RubyLearning) {
      window.RubyLearning.init();
    }

    // Git演習モード初期化
    if (window.GitLearning) {
      window.GitLearning.init();
    }

    // Rails入門モード初期化
    if (window.RailsLearning) {
      window.RailsLearning.init();
    }

    // 5段階レベル学習モード初期化
    if (window.RubyLevels) {
      window.RubyLevels.init();
    }

    // ダッシュボード初期化
    if (window.Dashboard) {
      window.Dashboard.init();
    }
  }

  // ===== 起動 =====
  init();
})();
