// コードスニペットデータ

const SNIPPETS = {
  // 記号特訓モード
  symbols: {
    name: '記号特訓',
    description: 'コーディング頻出記号を集中練習',
    snippets: [
      { text: '{}[]()<>', hint: '波括弧{} 角括弧[] 丸括弧() 山括弧<> — コーディングで使う4種類の括弧' },
      { text: '();{}', hint: '(); は関数の呼び出し、{} はコードブロック（if文やfor文の中身）を囲む' },
      { text: '=> {}', hint: 'アロー関数の書き方。=> の左に引数、{} の中に処理を書く' },
      { text: '=== !== && ||', hint: '=== は厳密等価、!== は厳密不等価、&& はAND、|| はOR' },
      { text: '${} `` "" \'\'', hint: '`` はテンプレートリテラル、${} で変数を埋め込む。"" と \'\' は通常の文字列' },
      { text: '<div></div>', hint: 'HTMLタグは <開始タグ> と </終了タグ> のペアで要素を囲む' },
      { text: '[]{}();:.,', hint: '[] 配列、{} オブジェクト、() 関数、; 文末、: キー値、. アクセス、, 区切り' },
      { text: '!@#$%^&*()', hint: 'Shift+数字キーで入力する記号。! 否定、# コメント、$ 変数、% 剰余、& AND、* 乗算' },
      { text: '+=  -=  *=  /=  %=', hint: '複合代入演算子。x += 1 は x = x + 1 の省略形' },
      { text: '?.  ??  ...', hint: '?. オプショナルチェーン（存在確認）、?? Null合体演算子、... スプレッド演算子' },
      { text: '<!-- -->', hint: 'HTMLのコメント。ブラウザには表示されないメモを書ける' },
      { text: '/* */ // #', hint: '/* */ はCSS/JSの複数行コメント、// はJS1行コメント、# はRuby/Pythonのコメント' },
      { text: '-> => :: ..', hint: '-> はCSS/PHP、=> はJSのアロー関数、:: はRubyのスコープ、.. はRubyの範囲' },
      { text: '[] {} () <>', hint: '角括弧・波括弧・丸括弧・山括弧 — それぞれ用途が違うので使い分けが大切' },
      { text: '& | ^ ~ << >>', hint: 'ビット演算子。& AND、| OR、^ XOR、~ 反転、<< 左シフト、>> 右シフト' }
    ]
  },

  // HTML/CSSモード
  html_css: {
    name: 'HTML / CSS',
    description: 'HTMLタグとCSSプロパティの練習',
    snippets: [
      { text: '<html lang="en">', hint: 'HTMLドキュメントの開始タグ。lang="en" でページの言語を英語に設定する' },
      { text: '<meta charset="utf-8">', hint: '文字コードをUTF-8に指定するメタタグ。日本語を正しく表示するために必要' },
      { text: '<link rel="stylesheet" href="style.css">', hint: '外部CSSファイルを読み込むタグ。href にCSSファイルのパスを指定する' },
      { text: '<div class="container">', hint: 'divは汎用ブロック要素。class属性でCSSのスタイルを適用する名前をつける' },
      { text: '<a href="https://example.com">Link</a>', hint: 'aタグはリンクを作成する。href にリンク先URL、タグの中にリンクテキストを書く' },
      { text: '<img src="image.png" alt="photo">', hint: '画像を表示するタグ。src に画像パス、alt に画像の説明（アクセシビリティ用）' },
      { text: '<input type="text" placeholder="name">', hint: 'テキスト入力フォーム。placeholder は入力前に表示されるヒントテキスト' },
      { text: '<ul><li>item</li></ul>', hint: 'ul は順序なしリスト、li は各項目。ol にすると番号付きリストになる' },
      { text: '<script src="app.js"></script>', hint: '外部JavaScriptファイルを読み込むタグ。通常bodyの最後に配置する' },
      { text: 'display: flex;', hint: 'Flexboxレイアウトを有効にする。子要素を横並びや縦並びに自動配置できる' },
      { text: 'justify-content: center;', hint: 'Flexboxの主軸方向（横）の中央寄せ。要素をコンテナの真ん中に配置する' },
      { text: 'background-color: #ff6600;', hint: '背景色を指定する。#ff6600 はオレンジ色（16進数カラーコード）' },
      { text: 'border: 1px solid #ccc;', hint: '枠線を指定。1px=太さ、solid=実線、#ccc=薄いグレー色' },
      { text: 'margin: 0 auto;', hint: '上下マージン0、左右autoで要素を水平中央に配置するテクニック' },
      { text: '@media (max-width: 768px) {}', hint: 'メディアクエリ。画面幅768px以下の時だけ適用されるCSSを書く（レスポンシブ対応）' },
      { text: '.btn:hover { opacity: 0.8; }', hint: ':hover はマウスを乗せた時のスタイル。opacity: 0.8 で少し透明にする' },
      { text: 'font-family: "Arial", sans-serif;', hint: 'フォントを指定。Arialが無い場合はsans-serif（ゴシック体）を使う' },
      { text: 'transform: translateX(-50%);', hint: '要素を左に50%移動する。position: absoluteと組み合わせて中央寄せに使う' },
      { text: 'grid-template-columns: 1fr 1fr;', hint: 'CSS Gridで2列レイアウトを作成。1fr 1fr は同じ幅で2等分する指定' },
      { text: '<form action="/submit" method="post">', hint: 'フォームタグ。action にデータ送信先URL、method="post" でPOSTリクエストを送る' }
    ]
  },

  // JavaScriptモード
  javascript: {
    name: 'JavaScript',
    description: 'JavaScript構文の練習',
    snippets: [
      { text: 'const app = express();', hint: 'Expressサーバーを初期化する。const で変数宣言し、express() で新しいアプリを作成' },
      { text: 'console.log("Hello, World!");', hint: 'コンソール（開発者ツール）にメッセージを出力する。デバッグに最もよく使う命令' },
      { text: 'document.getElementById("app");', hint: 'HTMLからid="app"の要素を取得する。DOM操作の基本メソッド' },
      { text: 'const arr = [1, 2, 3];', hint: '配列（Array）を宣言する。[] の中にカンマ区切りで値を入れる' },
      { text: 'const obj = { key: "value" };', hint: 'オブジェクトを宣言する。{ キー: 値 } の形でデータを格納する' },
      { text: 'function add(a, b) { return a + b; }', hint: '関数を宣言する。add(引数a, 引数b) を受け取り、a + b の結果を返す' },
      { text: 'const sum = (a, b) => a + b;', hint: 'アロー関数。function の短縮形。=> の右側が戻り値（1行なら return 省略可）' },
      { text: 'arr.map((item) => item * 2);', hint: '配列の各要素を変換して新しい配列を返す。ここでは全要素を2倍にしている' },
      { text: 'arr.filter((x) => x > 0);', hint: '条件に合う要素だけを抽出して新しい配列を返す。ここでは正の数だけ残す' },
      { text: 'const { name, age } = person;', hint: '分割代入。オブジェクトから name と age を取り出して個別の変数にする' },
      { text: 'const [first, ...rest] = arr;', hint: '配列の分割代入。first に最初の要素、...rest に残り全部を入れる' },
      { text: 'if (x === null || x === undefined) {}', hint: '=== は型まで含めた厳密比較。|| はOR条件。null か undefined ならtrue' },
      { text: 'for (let i = 0; i < arr.length; i++) {}', hint: 'for文。i=0 から始めて、配列の長さ未満の間、i を1ずつ増やしてループする' },
      { text: 'switch (action) { case "run": break; }', hint: 'switch文。action の値に応じて処理を分岐する。break で次の case に落ちるのを防ぐ' },
      { text: 'try { fetch(url); } catch (e) {}', hint: 'try-catch でエラーを捕捉する。try 内でエラーが起きると catch ブロックに移る' },
      { text: 'async function getData() { await fetch(); }', hint: 'async/await で非同期処理を同期的に書く。await はPromiseの完了を待つ' },
      { text: '`Hello, ${name}! You are ${age}.`', hint: 'テンプレートリテラル。バッククォート`` 内で ${変数} を使い文字列に値を埋め込む' },
      { text: 'document.querySelector(".btn");', hint: 'CSSセレクタで要素を取得する。.btn はclass="btn"の要素を1つ選択する' },
      { text: 'addEventListener("click", (e) => {});', hint: 'クリックイベントを監視する。ボタン等がクリックされた時にコールバック関数を実行' },
      { text: 'export default class App {}', hint: 'ES Module。class App を定義し、他のファイルから import できるようにする' }
    ]
  },

  // Rubyモード
  ruby: {
    name: 'Ruby',
    description: 'Ruby構文の練習',
    snippets: [
      { text: 'puts "Hello, World!"', hint: 'puts はコンソールに文字列を出力するメソッド。改行付きで表示される' },
      { text: 'class User < ApplicationRecord', hint: 'Userクラスを定義し、ApplicationRecord を継承する（Railsのモデル）' },
      { text: 'def initialize(name, age)', hint: 'コンストラクタ（初期化メソッド）。User.new した時に自動で呼ばれる' },
      { text: '@name = name', hint: '@ はインスタンス変数。そのオブジェクト内でどこからでもアクセスできる変数' },
      { text: 'attr_accessor :name, :email', hint: 'ゲッターとセッターを自動生成する。:name はシンボル（名前を表す軽量オブジェクト）' },
      { text: 'has_many :posts, dependent: :destroy', hint: 'Railsのアソシエーション。「ユーザーは多くの投稿を持つ」。削除時に投稿も一緒に削除' },
      { text: 'validates :email, presence: true', hint: 'Railsのバリデーション。email が空だと保存を拒否する（必須チェック）' },
      { text: 'arr.each { |item| puts item }', hint: 'each で配列の各要素をループ。|item| はブロック引数（各要素が順番に入る）' },
      { text: 'arr.map { |x| x * 2 }', hint: 'map で各要素を変換した新しい配列を返す。元の配列は変更されない' },
      { text: 'hash = { name: "Alice", age: 25 }', hint: 'ハッシュ（キーと値のペア）を作成する。JSのオブジェクトに相当する' },
      { text: 'if condition && other_condition', hint: 'if文。&& はAND条件。両方trueの時だけ中の処理が実行される' },
      { text: 'unless arr.empty?', hint: 'unless は if の逆。empty? は「配列が空か？」を返すメソッド（? は慣習）' },
      { text: 'arr.select { |x| x > 0 }', hint: 'select は条件に合う要素だけ抽出する（JSの filter に相当）' },
      { text: 'result = condition ? "yes" : "no"', hint: '三項演算子。条件 ? true時の値 : false時の値。if-else の短縮形' },
      { text: 'def self.find_by(email:)', hint: 'self. はクラスメソッド（インスタンスではなくクラスに対して呼ぶ）。email: はキーワード引数' },
      { text: 'render json: { status: "ok" }', hint: 'RailsでJSON形式のレスポンスを返す。APIエンドポイントでよく使う' },
      { text: 'redirect_to root_path, notice: "Done"', hint: 'Railsでトップページにリダイレクトする。notice はフラッシュメッセージ' },
      { text: 'before_action :authenticate_user!', hint: 'Railsのコールバック。アクション実行前にユーザー認証を行う（Devise）' },
      { text: 'scope :active, -> { where(active: true) }', hint: 'Railsのスコープ。User.active で active=true のレコードだけ取得できる' },
      { text: 'raise StandardError, "Not found"', hint: '例外を発生させる。エラー時に処理を中断し、rescue ブロックに移る' }
    ]
  }
};

// ミックスモード: 全モードからランダムに取得
function getMixedSnippets(count = 5) {
  const all = [];
  Object.keys(SNIPPETS).forEach(mode => {
    SNIPPETS[mode].snippets.forEach(s => {
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
  if (mode === 'mix') {
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
