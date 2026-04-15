// コードスニペットデータ

const SNIPPETS = {
  // 記号特訓モード（そのまま）
  symbols: {
    name: "記号特訓",
    description: "コーディング頻出記号を集中練習",
    snippets: [
      {
        text: "{}[]()<>",
        hint: "波括弧{} 角括弧[] 丸括弧() 山括弧<> — コーディングで使う4種類の括弧",
      },
      {
        text: "();{}",
        hint: "(); は関数の呼び出し、{} はコードブロック（if文やfor文の中身）を囲む",
      },
      {
        text: "=> {}",
        hint: "アロー関数の書き方。=> の左に引数、{} の中に処理を書く",
      },
      {
        text: "=== !== && ||",
        hint: "=== は厳密等価、!== は厳密不等価、&& はAND、|| はOR",
      },
      {
        text: "${} `` \"\" ''",
        hint: "`` はテンプレートリテラル、${} で変数を埋め込む。\"\" と '' は通常の文字列",
      },
      {
        text: "<div></div>",
        hint: "HTMLタグは <開始タグ> と </終了タグ> のペアで要素を囲む",
      },
      {
        text: "[]{}();:.,",
        hint: "[] 配列、{} オブジェクト、() 関数、; 文末、: キー値、. アクセス、, 区切り",
      },
      {
        text: "!@#$%^&*()",
        hint: "Shift+数字キーで入力する記号。! 否定、# コメント、$ 変数、% 剰余、& AND、* 乗算",
      },
      {
        text: "+=  -=  *=  /=  %=",
        hint: "複合代入演算子。x += 1 は x = x + 1 の省略形",
      },
      {
        text: "?.  ??  ...",
        hint: "?. オプショナルチェーン（存在確認）、?? Null合体演算子、... スプレッド演算子",
      },
      {
        text: "<!-- -->",
        hint: "HTMLのコメント。ブラウザには表示されないメモを書ける",
      },
      {
        text: "/* */ // #",
        hint: "/* */ はCSS/JSの複数行コメント、// はJS1行コメント、# はRuby/Pythonのコメント",
      },
      {
        text: "-> => :: ..",
        hint: "-> はCSS/PHP、=> はJSのアロー関数、:: はRubyのスコープ、.. はRubyの範囲",
      },
      {
        text: "[] {} () <>",
        hint: "角括弧・波括弧・丸括弧・山括弧 — それぞれ用途が違うので使い分けが大切",
      },
      {
        text: "& | ^ ~ << >>",
        hint: "ビット演算子。& AND、| OR、^ XOR、~ 反転、<< 左シフト、>> 右シフト",
      },
    ],
  },

  // HTML/CSSモード（10問に厳選）
  html_css: {
    name: "HTML / CSS",
    description: "HTMLタグとCSSプロパティの練習",
    snippets: [
      {
        text: '<meta charset="utf-8">',
        hint: "文字コードをUTF-8に指定するメタタグ",
      },
      {
        text: '<link rel="stylesheet" href="style.css">',
        hint: "外部CSSファイルを読み込むタグ",
      },
      {
        text: '<div class="container">',
        hint: "divは汎用ブロック要素。classでCSSスタイルを適用する",
      },
      {
        text: '<a href="https://example.com">Link</a>',
        hint: "aタグはリンクを作成する。hrefにリンク先URLを指定",
      },
      {
        text: '<img src="image.png" alt="photo">',
        hint: "画像を表示するタグ。srcに画像パス、altに説明文",
      },
      {
        text: '<input type="text" placeholder="name">',
        hint: "テキスト入力フォーム。placeholderはヒントテキスト",
      },
      {
        text: "<ul><li>item</li></ul>",
        hint: "ulは順序なしリスト、liは各項目",
      },
      {
        text: '<script src="app.js"></script>',
        hint: "外部JSファイルを読み込むタグ",
      },
      {
        text: "display: flex; justify-content: center;",
        hint: "Flexboxで横方向の中央寄せ",
      },
      {
        text: "@media (max-width: 768px) {}",
        hint: "メディアクエリ。画面幅768px以下の時に適用するCSS",
      },
    ],
  },

  // JavaScriptモード（10問に厳選、関数・コード中心）
  javascript: {
    name: "JavaScript",
    description: "JavaScript構文の練習",
    snippets: [
      {
        text: 'console.log("Hello, World!");',
        hint: "コンソールにメッセージを出力する。デバッグの基本",
      },
      {
        text: 'document.getElementById("app");',
        hint: 'HTMLからid="app"の要素を取得するDOM操作',
      },
      {
        text: "const arr = [1, 2, 3];",
        hint: "配列を宣言する。[]の中にカンマ区切りで値を入れる",
      },
      {
        text: 'const obj = { key: "value" };',
        hint: "オブジェクトを宣言する。{ キー: 値 }でデータを格納",
      },
      {
        text: "function add(a, b) { return a + b; }",
        hint: "関数宣言。引数a, bを受け取り、a + bを返す",
      },
      {
        text: "const sum = (a, b) => a + b;",
        hint: "アロー関数。functionの短縮形",
      },
      {
        text: "arr.map((item) => item * 2);",
        hint: "配列の各要素を変換して新しい配列を返す",
      },
      {
        text: "arr.filter((x) => x > 0);",
        hint: "条件に合う要素だけ抽出して新しい配列を返す",
      },
      {
        text: "for (let i = 0; i < arr.length; i++) {}",
        hint: "for文。i=0からarr.length未満までループ",
      },
      {
        text: "async function getData() { await fetch(); }",
        hint: "async/awaitで非同期処理を同期的に書く",
      },
    ],
  },

  // Rubyモード（10問に厳選、コード中心）
  ruby: {
    name: "Ruby",
    description: "Ruby構文の練習",
    snippets: [
      {
        text: 'puts "Hello, World!"',
        hint: "putsはコンソールに文字列を出力するメソッド。改行付き",
      },
      {
        text: "def initialize(name, age)",
        hint: "コンストラクタ。User.newした時に自動で呼ばれる",
      },
      {
        text: "@name = name",
        hint: "@はインスタンス変数。オブジェクト内でどこからでもアクセス可能",
      },
      {
        text: "attr_accessor :name, :email",
        hint: "ゲッターとセッターを自動生成する",
      },
      {
        text: "arr.each { |item| puts item }",
        hint: "eachで配列の各要素をループ。|item|はブロック引数",
      },
      {
        text: "arr.map { |x| x * 2 }",
        hint: "mapで各要素を変換した新しい配列を返す",
      },
      {
        text: 'hash = { name: "Alice", age: 25 }',
        hint: "ハッシュ。キーと値のペアでデータを管理する",
      },
      {
        text: "arr.select { |x| x > 0 }",
        hint: "selectは条件に合う要素だけ抽出する",
      },
      {
        text: "class User < ApplicationRecord",
        hint: "Userクラスを定義し、ApplicationRecordを継承する",
      },
      {
        text: "has_many :posts, dependent: :destroy",
        hint: "Railsのアソシエーション。削除時に投稿も一緒に削除",
      },
    ],
  },

  // Rails Questモード — ストーリーに沿ったRuby/Rails入門タイピング
  rails_quest: {
    name: "Rails Quest",
    description: "冒険者ギルドで学ぶRuby/Rails基礎",
    snippets: [
      // --- 第一章：旅の準備 ---
      {
        text: 'puts "Hello, World!"',
        hint: "冒険者の最初の呪文。画面に文字を表示する魔法だ",
      },
      {
        text: 'name = "Takeru"',
        hint: "冒険者の名前を変数に刻む。=は「代入」の意味だ",
      },
      {
        text: 'puts "My name is #{name}"',
        hint: "#{}で変数を文字列に埋め込む。冒険者の名乗りだ",
      },
      { text: "age = 25", hint: '数値は""で囲まない。整数はそのまま書ける' },
      {
        text: 'goal = "Become a Rails wizard"',
        hint: "冒険者ギルド登録書に誓いを刻め",
      },
      // --- 第二章：Rubyの基礎魔法 ---
      {
        text: "arr = [1, 2, 3, 4, 5]",
        hint: "配列は[]で囲む。複数の値を順番に格納する宝箱だ",
      },
      {
        text: "arr.each { |n| puts n }",
        hint: "eachで宝箱の中身を1つずつ取り出す。|n|がブロック引数",
      },
      {
        text: "arr.map { |n| n * 2 }",
        hint: "mapで各要素を変換。元の配列はそのまま残る",
      },
      {
        text: "hash = { hp: 100, mp: 50 }",
        hint: "ハッシュはキーと値のペア。冒険者のステータスだ",
      },
      { text: "hash[:hp]", hint: ":hpはシンボル。ハッシュからHP値を取り出す" },
      // --- 第三章：メソッドとクラス ---
      {
        text: "def attack(power)",
        hint: "defでメソッドを定義。攻撃の術式を書く",
      },
      {
        text: "  power * rand(1..3)",
        hint: "1〜3のランダム倍率で攻撃力を計���する",
      },
      { text: "end", hint: "Rubyではendでブロックを閉じる。呪文の終わりだ" },
      { text: "class Hero", hint: "classで冒険者の設計図を作る" },
      {
        text: "  attr_accessor :name, :level",
        hint: "attr_accessorで属性の読み書きを自動生成",
      },
      // --- 第四章：Railsの世��� ---
      {
        text: "rails new quest_app",
        hint: "Railsプロジェクトを生成するコマンド。冒険の拠点を建てる",
      },
      {
        text: "rails generate model Quest",
        hint: "モデルを生成。データベースの設計図を作る",
      },
      {
        text: "has_many :quests",
        hint: "アソシエーション。冒険者は複数のクエストを持つ",
      },
      { text: "belongs_to :hero", hint: "クエストは1人の冒険者に属���る" },
      {
        text: "validates :name, presence: true",
        hint: "バリデーション。名前がないと登録できない",
      },
    ],
  },
};

// ミックスモード: 全モードからランダムに取得
function getMixedSnippets(count = 5) {
  const all = [];
  Object.keys(SNIPPETS).forEach((mode) => {
    SNIPPETS[mode].snippets.forEach((s) => {
      all.push({ ...s, mode: mode });
    });
  });
  // シャッフル
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, count);
}

// 指定モードのスニペットをシャッフルして返す
function getSnippets(mode, count = 5) {
  if (mode === "mix") {
    return getMixedSnippets(count);
  }
  const modeData = SNIPPETS[mode];
  if (!modeData) return [];
  const shuffled = [...modeData.snippets];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
