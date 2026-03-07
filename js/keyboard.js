// キーボード表示・ハイライト機能

// USキーボードレイアウト定義
const US_LAYOUT = {
  rows: [
    [
      { key: 'Backquote', label: '`', shiftLabel: '~', width: 1 },
      { key: 'Digit1', label: '1', shiftLabel: '!', width: 1 },
      { key: 'Digit2', label: '2', shiftLabel: '@', width: 1 },
      { key: 'Digit3', label: '3', shiftLabel: '#', width: 1 },
      { key: 'Digit4', label: '4', shiftLabel: '$', width: 1 },
      { key: 'Digit5', label: '5', shiftLabel: '%', width: 1 },
      { key: 'Digit6', label: '6', shiftLabel: '^', width: 1 },
      { key: 'Digit7', label: '7', shiftLabel: '&', width: 1 },
      { key: 'Digit8', label: '8', shiftLabel: '*', width: 1 },
      { key: 'Digit9', label: '9', shiftLabel: '(', width: 1 },
      { key: 'Digit0', label: '0', shiftLabel: ')', width: 1 },
      { key: 'Minus', label: '-', shiftLabel: '_', width: 1 },
      { key: 'Equal', label: '=', shiftLabel: '+', width: 1 },
      { key: 'Backspace', label: 'BS', shiftLabel: '', width: 2 }
    ],
    [
      { key: 'Tab', label: 'Tab', shiftLabel: '', width: 1.5 },
      { key: 'KeyQ', label: 'Q', shiftLabel: '', width: 1 },
      { key: 'KeyW', label: 'W', shiftLabel: '', width: 1 },
      { key: 'KeyE', label: 'E', shiftLabel: '', width: 1 },
      { key: 'KeyR', label: 'R', shiftLabel: '', width: 1 },
      { key: 'KeyT', label: 'T', shiftLabel: '', width: 1 },
      { key: 'KeyY', label: 'Y', shiftLabel: '', width: 1 },
      { key: 'KeyU', label: 'U', shiftLabel: '', width: 1 },
      { key: 'KeyI', label: 'I', shiftLabel: '', width: 1 },
      { key: 'KeyO', label: 'O', shiftLabel: '', width: 1 },
      { key: 'KeyP', label: 'P', shiftLabel: '', width: 1 },
      { key: 'BracketLeft', label: '[', shiftLabel: '{', width: 1 },
      { key: 'BracketRight', label: ']', shiftLabel: '}', width: 1 },
      { key: 'Backslash', label: '\\', shiftLabel: '|', width: 1.5 }
    ],
    [
      { key: 'CapsLock', label: 'Caps', shiftLabel: '', width: 1.75 },
      { key: 'KeyA', label: 'A', shiftLabel: '', width: 1 },
      { key: 'KeyS', label: 'S', shiftLabel: '', width: 1 },
      { key: 'KeyD', label: 'D', shiftLabel: '', width: 1 },
      { key: 'KeyF', label: 'F', shiftLabel: '', width: 1 },
      { key: 'KeyG', label: 'G', shiftLabel: '', width: 1 },
      { key: 'KeyH', label: 'H', shiftLabel: '', width: 1 },
      { key: 'KeyJ', label: 'J', shiftLabel: '', width: 1 },
      { key: 'KeyK', label: 'K', shiftLabel: '', width: 1 },
      { key: 'KeyL', label: 'L', shiftLabel: '', width: 1 },
      { key: 'Semicolon', label: ';', shiftLabel: ':', width: 1 },
      { key: 'Quote', label: "'", shiftLabel: '"', width: 1 },
      { key: 'Enter', label: 'Enter', shiftLabel: '', width: 2.25 }
    ],
    [
      { key: 'ShiftLeft', label: 'Shift', shiftLabel: '', width: 2.25 },
      { key: 'KeyZ', label: 'Z', shiftLabel: '', width: 1 },
      { key: 'KeyX', label: 'X', shiftLabel: '', width: 1 },
      { key: 'KeyC', label: 'C', shiftLabel: '', width: 1 },
      { key: 'KeyV', label: 'V', shiftLabel: '', width: 1 },
      { key: 'KeyB', label: 'B', shiftLabel: '', width: 1 },
      { key: 'KeyN', label: 'N', shiftLabel: '', width: 1 },
      { key: 'KeyM', label: 'M', shiftLabel: '', width: 1 },
      { key: 'Comma', label: ',', shiftLabel: '<', width: 1 },
      { key: 'Period', label: '.', shiftLabel: '>', width: 1 },
      { key: 'Slash', label: '/', shiftLabel: '?', width: 1 },
      { key: 'ShiftRight', label: 'Shift', shiftLabel: '', width: 2.75 }
    ],
    [
      { key: 'ControlLeft', label: 'Ctrl', shiftLabel: '', width: 1.5 },
      { key: 'AltLeft', label: 'Alt', shiftLabel: '', width: 1.25 },
      { key: 'MetaLeft', label: 'Cmd', shiftLabel: '', width: 1.25 },
      { key: 'Space', label: '', shiftLabel: '', width: 6.25 },
      { key: 'MetaRight', label: 'Cmd', shiftLabel: '', width: 1.25 },
      { key: 'AltRight', label: 'Alt', shiftLabel: '', width: 1.25 },
      { key: 'ControlRight', label: 'Ctrl', shiftLabel: '', width: 1.5 }
    ]
  ]
};

// JISキーボードレイアウト定義（Mac JIS配列）
const JIS_LAYOUT = {
  rows: [
    [
      { key: 'Digit1', label: '1', shiftLabel: '!', width: 1 },
      { key: 'Digit2', label: '2', shiftLabel: '"', width: 1 },
      { key: 'Digit3', label: '3', shiftLabel: '#', width: 1 },
      { key: 'Digit4', label: '4', shiftLabel: '$', width: 1 },
      { key: 'Digit5', label: '5', shiftLabel: '%', width: 1 },
      { key: 'Digit6', label: '6', shiftLabel: '&', width: 1 },
      { key: 'Digit7', label: '7', shiftLabel: "'", width: 1 },
      { key: 'Digit8', label: '8', shiftLabel: '(', width: 1 },
      { key: 'Digit9', label: '9', shiftLabel: ')', width: 1 },
      { key: 'Digit0', label: '0', shiftLabel: '', width: 1 },
      { key: 'Minus', label: '-', shiftLabel: '=', width: 1 },
      { key: 'Equal', label: '^', shiftLabel: '~', width: 1 },
      { key: 'IntlYen', label: '¥', shiftLabel: '|', width: 1 },
      { key: 'Backspace', label: 'delete', shiftLabel: '', width: 2 }
    ],
    [
      { key: 'Tab', label: 'tab', shiftLabel: '', width: 1.5 },
      { key: 'KeyQ', label: 'Q', shiftLabel: '', width: 1 },
      { key: 'KeyW', label: 'W', shiftLabel: '', width: 1 },
      { key: 'KeyE', label: 'E', shiftLabel: '', width: 1 },
      { key: 'KeyR', label: 'R', shiftLabel: '', width: 1 },
      { key: 'KeyT', label: 'T', shiftLabel: '', width: 1 },
      { key: 'KeyY', label: 'Y', shiftLabel: '', width: 1 },
      { key: 'KeyU', label: 'U', shiftLabel: '', width: 1 },
      { key: 'KeyI', label: 'I', shiftLabel: '', width: 1 },
      { key: 'KeyO', label: 'O', shiftLabel: '', width: 1 },
      { key: 'KeyP', label: 'P', shiftLabel: '', width: 1 },
      { key: 'BracketLeft', label: '@', shiftLabel: '`', width: 1 },
      { key: 'BracketRight', label: '[', shiftLabel: '{', width: 1 },
      { key: 'Enter', label: 'return', shiftLabel: '', width: 1.5, rowSpan: true }
    ],
    [
      { key: 'CapsLock', label: 'control', shiftLabel: '', width: 1.75 },
      { key: 'KeyA', label: 'A', shiftLabel: '', width: 1 },
      { key: 'KeyS', label: 'S', shiftLabel: '', width: 1 },
      { key: 'KeyD', label: 'D', shiftLabel: '', width: 1 },
      { key: 'KeyF', label: 'F', shiftLabel: '', width: 1 },
      { key: 'KeyG', label: 'G', shiftLabel: '', width: 1 },
      { key: 'KeyH', label: 'H', shiftLabel: '', width: 1 },
      { key: 'KeyJ', label: 'J', shiftLabel: '', width: 1 },
      { key: 'KeyK', label: 'K', shiftLabel: '', width: 1 },
      { key: 'KeyL', label: 'L', shiftLabel: '', width: 1 },
      { key: 'Semicolon', label: ';', shiftLabel: '+', width: 1 },
      { key: 'Quote', label: ':', shiftLabel: '*', width: 1 },
      { key: 'Backslash', label: ']', shiftLabel: '}', width: 1 }
    ],
    [
      { key: 'ShiftLeft', label: '⇧', shiftLabel: '', width: 2.25 },
      { key: 'KeyZ', label: 'Z', shiftLabel: '', width: 1 },
      { key: 'KeyX', label: 'X', shiftLabel: '', width: 1 },
      { key: 'KeyC', label: 'C', shiftLabel: '', width: 1 },
      { key: 'KeyV', label: 'V', shiftLabel: '', width: 1 },
      { key: 'KeyB', label: 'B', shiftLabel: '', width: 1 },
      { key: 'KeyN', label: 'N', shiftLabel: '', width: 1 },
      { key: 'KeyM', label: 'M', shiftLabel: '', width: 1 },
      { key: 'Comma', label: ',', shiftLabel: '<', width: 1 },
      { key: 'Period', label: '.', shiftLabel: '>', width: 1 },
      { key: 'Slash', label: '/', shiftLabel: '?', width: 1 },
      { key: 'IntlRo', label: '\\', shiftLabel: '_', width: 1 },
      { key: 'ShiftRight', label: '⇧', shiftLabel: '', width: 1.75 }
    ],
    [
      { key: 'Fn', label: 'fn', shiftLabel: '', width: 1 },
      { key: 'ControlLeft', label: '⌃', shiftLabel: '', width: 1.25 },
      { key: 'AltLeft', label: '⌥', shiftLabel: '', width: 1.25 },
      { key: 'MetaLeft', label: '⌘', shiftLabel: '', width: 1.5 },
      { key: 'Lang2', label: '英数', shiftLabel: '', width: 1.5 },
      { key: 'Space', label: '', shiftLabel: '', width: 3.5 },
      { key: 'Lang1', label: 'かな', shiftLabel: '', width: 1.5 },
      { key: 'MetaRight', label: '⌘', shiftLabel: '', width: 1.5 },
      { key: 'AltRight', label: '⌥', shiftLabel: '', width: 1.25 }
    ]
  ]
};

// 文字→キーコードのマッピング（US配列）
const US_CHAR_TO_KEY = {};
const US_SHIFT_CHARS = new Set();

// USレイアウトからマッピングを構築
(function buildUSMap() {
  US_LAYOUT.rows.forEach(row => {
    row.forEach(keyDef => {
      if (keyDef.label && keyDef.label.length === 1) {
        US_CHAR_TO_KEY[keyDef.label.toLowerCase()] = keyDef.key;
        US_CHAR_TO_KEY[keyDef.label] = keyDef.key;
      }
      if (keyDef.shiftLabel && keyDef.shiftLabel.length === 1) {
        US_CHAR_TO_KEY[keyDef.shiftLabel] = keyDef.key;
        US_SHIFT_CHARS.add(keyDef.shiftLabel);
      }
    });
  });
  // スペース
  US_CHAR_TO_KEY[' '] = 'Space';
  // 大文字
  for (let i = 65; i <= 90; i++) {
    const upper = String.fromCharCode(i);
    US_SHIFT_CHARS.add(upper);
  }
})();

// JIS用マッピング
const JIS_CHAR_TO_KEY = {};
const JIS_SHIFT_CHARS = new Set();

(function buildJISMap() {
  JIS_LAYOUT.rows.forEach(row => {
    row.forEach(keyDef => {
      if (keyDef.label && keyDef.label.length === 1) {
        JIS_CHAR_TO_KEY[keyDef.label.toLowerCase()] = keyDef.key;
        JIS_CHAR_TO_KEY[keyDef.label] = keyDef.key;
      }
      if (keyDef.shiftLabel && keyDef.shiftLabel.length === 1) {
        JIS_CHAR_TO_KEY[keyDef.shiftLabel] = keyDef.key;
        JIS_SHIFT_CHARS.add(keyDef.shiftLabel);
      }
    });
  });
  JIS_CHAR_TO_KEY[' '] = 'Space';
  for (let i = 65; i <= 90; i++) {
    JIS_SHIFT_CHARS.add(String.fromCharCode(i));
  }
})();

// キーボード描画クラス
class KeyboardRenderer {
  constructor(containerId, layoutType = 'US') {
    this.container = document.getElementById(containerId);
    this.layoutType = layoutType;
    this.keyElements = {};
    this.render();
  }

  getLayout() {
    return this.layoutType === 'JIS' ? JIS_LAYOUT : US_LAYOUT;
  }

  getCharToKey() {
    return this.layoutType === 'JIS' ? JIS_CHAR_TO_KEY : US_CHAR_TO_KEY;
  }

  getShiftChars() {
    return this.layoutType === 'JIS' ? JIS_SHIFT_CHARS : US_SHIFT_CHARS;
  }

  setLayout(layoutType) {
    this.layoutType = layoutType;
    this.keyElements = {};
    this.render();
  }

  render() {
    const layout = this.getLayout();
    this.container.innerHTML = '';
    this.container.className = 'keyboard';

    layout.rows.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard-row';

      row.forEach(keyDef => {
        const keyEl = document.createElement('div');
        keyEl.className = 'key';
        keyEl.dataset.keyCode = keyDef.key;

        // 幅の設定
        const widthPx = keyDef.width * 48;
        keyEl.style.width = widthPx + 'px';

        // 特殊キーのクラス
        if (['ShiftLeft', 'ShiftRight'].includes(keyDef.key)) {
          keyEl.classList.add('key-shift');
        }
        if (keyDef.key === 'Space') {
          keyEl.classList.add('key-space');
        }
        if (['Backspace', 'Tab', 'CapsLock', 'Enter', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'Fn', 'Lang1', 'Lang2'].includes(keyDef.key)) {
          keyEl.classList.add('key-special');
        }

        // 指の色分けクラス
        const fingerInfo = FINGER_MAP[keyDef.key];
        if (fingerInfo) {
          keyEl.classList.add(fingerInfo.cls);
        }

        // ラベル表示
        if (keyDef.shiftLabel && keyDef.shiftLabel.length === 1) {
          keyEl.innerHTML = `<span class="key-shift-label">${this.escapeHtml(keyDef.shiftLabel)}</span><span class="key-main-label">${this.escapeHtml(keyDef.label)}</span>`;
        } else {
          keyEl.innerHTML = `<span class="key-label">${this.escapeHtml(keyDef.label)}</span>`;
        }

        rowEl.appendChild(keyEl);
        this.keyElements[keyDef.key] = keyEl;
      });

      this.container.appendChild(rowEl);
    });
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // 全ハイライトをクリア
  clearHighlight() {
    Object.values(this.keyElements).forEach(el => {
      el.classList.remove('key-active', 'key-shift-active');
    });
  }

  // 指定文字のキーをハイライト
  highlightChar(char) {
    this.clearHighlight();
    if (char === undefined || char === null) return;

    const charToKey = this.getCharToKey();
    const shiftChars = this.getShiftChars();

    const keyCode = charToKey[char];
    if (keyCode && this.keyElements[keyCode]) {
      this.keyElements[keyCode].classList.add('key-active');
    }

    // Shift が必要な場合
    if (shiftChars.has(char)) {
      if (this.keyElements['ShiftLeft']) {
        this.keyElements['ShiftLeft'].classList.add('key-shift-active');
      }
      if (this.keyElements['ShiftRight']) {
        this.keyElements['ShiftRight'].classList.add('key-shift-active');
      }
    }
  }

  // スペースキーをハイライト（開始待ち用）
  highlightSpace() {
    this.clearHighlight();
    if (this.keyElements['Space']) {
      this.keyElements['Space'].classList.add('key-active');
    }
    return { hand: '', finger: '' };
  }

  // 指定文字の指情報を取得
  getFingerInfo(char) {
    if (char === undefined || char === null) return null;
    const charToKey = this.getCharToKey();
    const keyCode = charToKey[char];
    if (!keyCode) return null;
    return FINGER_MAP[keyCode] || null;
  }
}

// ===== 指の担当キーマッピング =====
// finger: 0=左小指, 1=左薬指, 2=左中指, 3=左人差し指, 4=右人差し指, 5=右中指, 6=右薬指, 7=右小指, 8=親指(スペース)
const FINGER_MAP = {
  // 数字行
  'Backquote':    { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'Digit1':       { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'Digit2':       { finger: 1, hand: '左手', name: '薬指', cls: 'finger-l-ring' },
  'Digit3':       { finger: 2, hand: '左手', name: '中指', cls: 'finger-l-middle' },
  'Digit4':       { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'Digit5':       { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'Digit6':       { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'Digit7':       { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'Digit8':       { finger: 5, hand: '右手', name: '中指', cls: 'finger-r-middle' },
  'Digit9':       { finger: 6, hand: '右手', name: '薬指', cls: 'finger-r-ring' },
  'Digit0':       { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'Minus':        { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'Equal':        { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'Backspace':    { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'IntlYen':      { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  // Qの行
  'Tab':          { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'KeyQ':         { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'KeyW':         { finger: 1, hand: '左手', name: '薬指', cls: 'finger-l-ring' },
  'KeyE':         { finger: 2, hand: '左手', name: '中指', cls: 'finger-l-middle' },
  'KeyR':         { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'KeyT':         { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'KeyY':         { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'KeyU':         { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'KeyI':         { finger: 5, hand: '右手', name: '中指', cls: 'finger-r-middle' },
  'KeyO':         { finger: 6, hand: '右手', name: '薬指', cls: 'finger-r-ring' },
  'KeyP':         { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'BracketLeft':  { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'BracketRight': { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'Backslash':    { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  // Aの行
  'CapsLock':     { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'KeyA':         { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'KeyS':         { finger: 1, hand: '左手', name: '薬指', cls: 'finger-l-ring' },
  'KeyD':         { finger: 2, hand: '左手', name: '中指', cls: 'finger-l-middle' },
  'KeyF':         { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'KeyG':         { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'KeyH':         { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'KeyJ':         { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'KeyK':         { finger: 5, hand: '右手', name: '中指', cls: 'finger-r-middle' },
  'KeyL':         { finger: 6, hand: '右手', name: '薬指', cls: 'finger-r-ring' },
  'Semicolon':    { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'Quote':        { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'Enter':        { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  // Zの行
  'ShiftLeft':    { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'KeyZ':         { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'KeyX':         { finger: 1, hand: '左手', name: '薬指', cls: 'finger-l-ring' },
  'KeyC':         { finger: 2, hand: '左手', name: '中指', cls: 'finger-l-middle' },
  'KeyV':         { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'KeyB':         { finger: 3, hand: '左手', name: '人差し指', cls: 'finger-l-index' },
  'KeyN':         { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'KeyM':         { finger: 4, hand: '右手', name: '人差し指', cls: 'finger-r-index' },
  'Comma':        { finger: 5, hand: '右手', name: '中指', cls: 'finger-r-middle' },
  'Period':       { finger: 6, hand: '右手', name: '薬指', cls: 'finger-r-ring' },
  'Slash':        { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'IntlRo':       { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'ShiftRight':   { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  // 最下段
  'Fn':           { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'ControlLeft':  { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'AltLeft':      { finger: 0, hand: '左手', name: '小指', cls: 'finger-l-pinky' },
  'MetaLeft':     { finger: 0, hand: '左手', name: '親指', cls: 'finger-thumb' },
  'Lang2':        { finger: 8, hand: '左手', name: '親指', cls: 'finger-thumb' },
  'Space':        { finger: 8, hand: '', name: '親指', cls: 'finger-thumb' },
  'Lang1':        { finger: 8, hand: '右手', name: '親指', cls: 'finger-thumb' },
  'MetaRight':    { finger: 7, hand: '右手', name: '親指', cls: 'finger-thumb' },
  'AltRight':     { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' },
  'ControlRight': { finger: 7, hand: '右手', name: '小指', cls: 'finger-r-pinky' }
};
