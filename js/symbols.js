// 記号ガイドデータ - コーディングで頻出する記号の名前・読み方・用途
const SYMBOL_GUIDE = {
  '{': {
    en: 'Left Curly Brace',
    ja: '左中括弧（ひだりちゅうかっこ）/ 左波括弧',
    usage: 'ブロック開始、オブジェクトリテラル'
  },
  '}': {
    en: 'Right Curly Brace',
    ja: '右中括弧（みぎちゅうかっこ）/ 右波括弧',
    usage: 'ブロック終了、オブジェクトリテラル'
  },
  '[': {
    en: 'Left Square Bracket',
    ja: '左角括弧（ひだりかくかっこ）',
    usage: '配列、インデックスアクセス'
  },
  ']': {
    en: 'Right Square Bracket',
    ja: '右角括弧（みぎかくかっこ）',
    usage: '配列、インデックスアクセス'
  },
  '(': {
    en: 'Left Parenthesis',
    ja: '左丸括弧（ひだりまるかっこ）',
    usage: '関数呼び出し、条件式、グループ化'
  },
  ')': {
    en: 'Right Parenthesis',
    ja: '右丸括弧（みぎまるかっこ）',
    usage: '関数呼び出し、条件式、グループ化'
  },
  '<': {
    en: 'Less Than / Left Angle Bracket',
    ja: '小なり（しょうなり）/ 左山括弧',
    usage: '比較演算子、HTMLタグ開始、ジェネリクス'
  },
  '>': {
    en: 'Greater Than / Right Angle Bracket',
    ja: '大なり（だいなり）/ 右山括弧',
    usage: '比較演算子、HTMLタグ終了、ジェネリクス'
  },
  ';': {
    en: 'Semicolon',
    ja: 'セミコロン',
    usage: '文の終端（JS/CSS/C系言語）'
  },
  ':': {
    en: 'Colon',
    ja: 'コロン',
    usage: 'オブジェクトのキー/値、CSSプロパティ、Rubyシンボル'
  },
  '"': {
    en: 'Double Quote',
    ja: 'ダブルクォート / ダブルクォーテーション',
    usage: '文字列リテラル、HTML属性値'
  },
  "'": {
    en: 'Single Quote',
    ja: 'シングルクォート / シングルクォーテーション',
    usage: '文字列リテラル（JS/Ruby）'
  },
  '`': {
    en: 'Backtick / Grave Accent',
    ja: 'バッククォート / バックティック',
    usage: 'テンプレートリテラル（JS）、コマンド実行（Ruby/Shell）'
  },
  '=': {
    en: 'Equals Sign',
    ja: 'イコール',
    usage: '代入演算子、比較演算子（==, ===）'
  },
  '!': {
    en: 'Exclamation Mark',
    ja: 'エクスクラメーションマーク / ビックリマーク',
    usage: '論理否定（NOT）、不等価（!=）'
  },
  '&': {
    en: 'Ampersand',
    ja: 'アンパサンド',
    usage: 'AND演算子（&&）、参照、HTMLエンティティ'
  },
  '|': {
    en: 'Pipe / Vertical Bar',
    ja: 'パイプ / 縦棒',
    usage: 'OR演算子（||）、Rubyブロック引数'
  },
  '/': {
    en: 'Slash / Forward Slash',
    ja: 'スラッシュ',
    usage: '除算、パス区切り、正規表現、閉じタグ'
  },
  '\\': {
    en: 'Backslash',
    ja: 'バックスラッシュ',
    usage: 'エスケープ文字、Windowsパス区切り'
  },
  '#': {
    en: 'Hash / Number Sign',
    ja: 'ハッシュ / シャープ',
    usage: 'コメント（Ruby/Python）、CSSセレクタ（ID）'
  },
  '_': {
    en: 'Underscore',
    ja: 'アンダースコア / アンダーバー',
    usage: '変数名（snake_case）、プライベート変数'
  },
  '~': {
    en: 'Tilde',
    ja: 'チルダ',
    usage: 'ホームディレクトリ、ビット反転'
  },
  '@': {
    en: 'At Sign',
    ja: 'アットマーク',
    usage: 'デコレータ（Python/TS）、インスタンス変数（Ruby）'
  },
  '%': {
    en: 'Percent Sign',
    ja: 'パーセント',
    usage: '剰余演算子、文字列フォーマット'
  },
  '^': {
    en: 'Caret',
    ja: 'キャレット',
    usage: 'XOR演算子、正規表現（行頭）'
  },
  '*': {
    en: 'Asterisk',
    ja: 'アスタリスク',
    usage: '乗算、スプレッド演算子、ワイルドカード'
  },
  '+': {
    en: 'Plus Sign',
    ja: 'プラス',
    usage: '加算、文字列結合、正規表現（1回以上）'
  },
  '-': {
    en: 'Hyphen / Minus',
    ja: 'ハイフン / マイナス',
    usage: '減算、CSSプロパティ名、アロー演算子の一部'
  },
  '.': {
    en: 'Dot / Period',
    ja: 'ドット / ピリオド',
    usage: 'プロパティアクセス、メソッドチェーン'
  },
  ',': {
    en: 'Comma',
    ja: 'カンマ',
    usage: '引数区切り、配列要素区切り'
  },
  '?': {
    en: 'Question Mark',
    ja: 'クエスチョンマーク / はてな',
    usage: '三項演算子、オプショナルチェーン（?.）'
  }
};

// 文字が記号かどうか判定
function isSymbol(char) {
  return SYMBOL_GUIDE.hasOwnProperty(char);
}

// 記号ガイド情報を取得
function getSymbolInfo(char) {
  return SYMBOL_GUIDE[char] || null;
}
