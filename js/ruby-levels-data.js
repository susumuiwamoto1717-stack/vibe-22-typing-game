// Ruby 5段階理解レベル タイピングデータ

const RUBY_LEVELS_CHAPTERS = [
  { id: 1, title: "第1章 Rubyを動かす環境構築", image: "img/ch1_levels.png" },
  { id: 2, title: "第2章 プログラムの基礎", image: "img/ch2_levels.png" },
  { id: 3, title: "第3章 条件分岐、繰り返し処理", image: "img/ch3_levels.png" },
  { id: 4, title: "第4章 情報をまとめる配列", image: "img/ch4_levels.png" },
  { id: 5, title: "第5章 配列で扱うメソッド", image: "img/ch5_levels.png" },
  {
    id: 6,
    title: "第6章 名前と値をセットにするハッシュ",
    image: "img/ch6_hash_levels.png",
  },
  {
    id: 7,
    title: "第7章 まとまりを分けるメソッド",
    image: "img/ch7_levels.png",
  },
  {
    id: 8,
    title: "第8章 オブジェクトの種類を決めるクラス",
    image: "img/ch8_levels.png",
  },
  {
    id: 9,
    title: "第9章 メソッドを共通して使うモジュール",
    image: "img/ch9_levels.png",
  },
  {
    id: 10,
    title: "第10章 実際にアプリを作ってみよう",
    image: "img/ch10_levels.png",
  },
  {
    id: 11,
    title: "第11章 Rubyの理解をより深めよう",
    image: "img/ch11_levels.png",
  },
];

const RUBY_LEVELS_DATA = {
  1: {
    title: "第1章",
    subtitle: "Rubyを動かす環境構築",
    image: "img/ch1_levels.png",
    levels: {
      5: {
        name: "Lv5 深く理解する",
        description: "AIに「何をするか」指示を出す側",
        color: "#e74c3c",
        steps: [
          {
            title: "Hello World",
            code: 'puts "Hello World"',
            explanation:
              "putsは文字列を出力するメソッド。Rubyプログラムの最初の一歩。",
          },
          {
            title: "Rubyファイルの実行",
            code: "ruby hello.rb",
            explanation:
              "rubyコマンドでファイルを実行。.rbがRubyファイルの拡張子。",
          },
        ],
      },
      4: {
        name: "Lv4 分かればOK",
        description: "AIの出力をレビューする側",
        color: "#e67e22",
        steps: [
          {
            title: "Docker環境でRuby実行",
            code: "docker compose run --rm app ruby hello.rb",
            explanation:
              "Docker環境でRubyを実行するコマンド。RUNTEQの開発環境の基本。",
          },
        ],
      },
      3: {
        name: "Lv3 読めればOK",
        description: "AIのコードを確認する側",
        color: "#f1c40f",
        steps: [
          {
            title: "irb対話モード",
            code: "irb",
            explanation: "irbはRubyの対話型実行環境。コードを1行ずつ試せる。",
          },
        ],
      },
      2: {
        name: "Lv2 インデックスにある",
        description: "AIに的確なヒントを出せる側",
        color: "#3498db",
        steps: [
          {
            title: "Dockerfileの存在",
            code: "cat Dockerfile",
            explanation: "DockerfileはDocker環境の設計図。中身はAIに任せてOK。",
          },
        ],
      },
      1: {
        name: "Lv1 知っていればOK",
        description: "必要になったらAIに聞ける側",
        color: "#95a5a6",
        steps: [
          {
            title: "docker-compose.yml",
            code: "cat docker-compose.yml",
            explanation:
              "docker-compose.ymlは複数コンテナの設定ファイル。存在を知っていればOK。",
          },
        ],
      },
    },
  },
  2: {
    title: "第2章",
    subtitle: "プログラムの基礎",
    image: "img/ch2_levels.png",
    levels: {
      5: {
        name: "Lv5 深く理解する",
        description: "AIに「何をするか」指示を出す側",
        color: "#e74c3c",
        steps: [
          {
            title: "変数への代入",
            code: 'name = "Taro"\nage = 25\nputs name',
            explanation:
              "変数は「名前をつけた入れ物」。=は右の値を左に入れる。",
          },
          {
            title: "式展開",
            code: 'name = "Taro"\nputs "Hello, #{name}!"',
            explanation:
              "#{変数名}で文字列内に変数を埋め込む。ダブルクォート必須。",
          },
          {
            title: "数値と文字列の違い",
            code: 'puts 10 + 5\nputs "10" + "5"',
            explanation:
              "数値の+は計算(15)、文字列の+は連結(105)。型の違いが重要。",
          },
        ],
      },
      4: {
        name: "Lv4 分かればOK",
        description: "AIの出力をレビューする側",
        color: "#e67e22",
        steps: [
          {
            title: "型変換",
            code: 'num = "25".to_i\nstr = 25.to_s\nputs num + 5',
            explanation: "to_iで文字列を数値に、to_sで数値を文字列に変換。",
          },
          {
            title: "真偽値とnil",
            code: "puts true\nputs false\nputs nil",
            explanation:
              "true/falseは真偽値。nilは「何もない」を表す特別な値。",
          },
        ],
      },
      3: {
        name: "Lv3 読めればOK",
        description: "AIのコードを確認する側",
        color: "#f1c40f",
        steps: [
          {
            title: "putsとpとprintの違い",
            code: 'puts "hello"\nprint "hello"\np "hello"',
            explanation:
              "puts:改行付き、print:改行なし、p:型がわかる形で表示。",
          },
        ],
      },
      2: {
        name: "Lv2 インデックスにある",
        description: "AIに的確なヒントを出せる側",
        color: "#3498db",
        steps: [
          {
            title: "コメント",
            code: '# This is a comment\nputs "Hello" # inline comment',
            explanation:
              "#以降はコメント。コードの説明に使う。AIが生成するコードにも頻出。",
          },
        ],
      },
      1: {
        name: "Lv1 知っていればOK",
        description: "必要になったらAIに聞ける側",
        color: "#95a5a6",
        steps: [
          {
            title: "gets.chomp",
            code: 'input = gets.chomp\nputs "You said: #{input}"',
            explanation:
              "gets.chompでユーザー入力を受け取る。対話型プログラムで使う。",
          },
        ],
      },
    },
  },
  3: {
    title: "第3章",
    subtitle: "条件分岐、繰り返し処理",
    image: "img/ch3_levels.png",
    levels: {
      5: {
        name: "Lv5 深く理解する",
        description: "AIに「何をするか」指示を出す側",
        color: "#e74c3c",
        steps: [
          {
            title: "if-else文",
            code: 'age = 20\nif age >= 18\n  puts "adult"\nelse\n  puts "minor"\nend',
            explanation:
              "if文は条件が真の時だけ実行。elseはそれ以外。プログラムの流れを制御する基本。",
          },
          {
            title: "elsif",
            code: 'score = 85\nif score >= 80\n  puts "A"\nelsif score >= 60\n  puts "B"\nelse\n  puts "C"\nend',
            explanation:
              "elsifで複数条件を順番に評価。最初に真になった条件だけ実行される。",
          },
          {
            title: "while繰り返し",
            code: 'count = 1\nwhile count <= 3\n  puts "#{count} time"\n  count += 1\nend',
            explanation:
              "whileは条件が真の間繰り返す。count += 1を忘れると無限ループ。",
          },
        ],
      },
      4: {
        name: "Lv4 分かればOK",
        description: "AIの出力をレビューする側",
        color: "#e67e22",
        steps: [
          {
            title: "論理演算子 && と ||",
            code: 'age = 25\nlicense = true\nif age >= 18 && license\n  puts "can drive"\nend',
            explanation:
              "&&は両方真で真、||はどちらか真で真。条件の組み合わせに使う。",
          },
          {
            title: "times繰り返し",
            code: '3.times do\n  puts "hello"\nend',
            explanation: "timesは回数が決まっている繰り返し。whileより簡潔。",
          },
        ],
      },
      3: {
        name: "Lv3 読めればOK",
        description: "AIのコードを確認する側",
        color: "#f1c40f",
        steps: [
          {
            title: "unless",
            code: 'age = 15\nunless age >= 18\n  puts "minor"\nend',
            explanation:
              "unlessはifの逆。条件が偽の時に実行。AIコードに時々出てくる。",
          },
        ],
      },
      2: {
        name: "Lv2 インデックスにある",
        description: "AIに的確なヒントを出せる側",
        color: "#3498db",
        steps: [
          {
            title: "三項演算子",
            code: 'age = 20\nstatus = age >= 18 ? "adult" : "minor"\nputs status',
            explanation:
              "条件 ? 真の値 : 偽の値。if-elseの短縮形。AIコードで頻出。",
          },
        ],
      },
      1: {
        name: "Lv1 知っていればOK",
        description: "必要になったらAIに聞ける側",
        color: "#95a5a6",
        steps: [
          {
            title: "case文",
            code: 'lang = "Ruby"\ncase lang\nwhen "Ruby"\n  puts "great"\nwhen "Python"\n  puts "nice"\nend',
            explanation:
              "case文は複数の値で分岐。switch文に相当。存在を知っていればOK。",
          },
        ],
      },
    },
  },
  4: {
    title: "第4章",
    subtitle: "情報をまとめる配列",
    image: "img/ch4_levels.png",
    levels: {
      5: {
        name: "Lv5 深く理解する",
        description: "AIに「何をするか」指示を出す側",
        color: "#e74c3c",
        steps: [
          {
            title: "配列の作成",
            code: 'fruits = ["apple", "banana", "cherry"]\nputs fruits[0]',
            explanation:
              "配列は[]で作成。インデックスは0から始まる。fruits[0]は最初の要素。",
          },
          {
            title: "eachで繰り返し",
            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.each do |fruit|\n  puts fruit\nend',
            explanation:
              "eachは配列の要素を1つずつ取り出す。|fruit|はブロック変数（名前は自由）。",
          },
          {
            title: "配列に要素を追加",
            code: 'colors = ["red", "blue"]\ncolors << "green"\nputs colors',
            explanation:
              "<<で配列の末尾に追加。pushと同じ。Rubyで最もよく使う追加方法。",
          },
        ],
      },
      4: {
        name: "Lv4 分かればOK",
        description: "AIの出力をレビューする側",
        color: "#e67e22",
        steps: [
          {
            title: "合計を計算",
            code: "prices = [100, 200, 300]\ntotal = 0\nprices.each do |p|\n  total += p\nend\nputs total",
            explanation:
              "total=0で初期化、eachで1つずつ足す。total += pはtotal = total + pの短縮。",
          },
          {
            title: "負のインデックス",
            code: 'names = ["Taro", "Hanako", "Jiro"]\nputs names[-1]\nputs names[-2]',
            explanation:
              "[-1]は最後の要素、[-2]は最後から2番目。便利なアクセス方法。",
          },
        ],
      },
      3: {
        name: "Lv3 読めればOK",
        description: "AIのコードを確認する側",
        color: "#f1c40f",
        steps: [
          {
            title: "lengthとempty?",
            code: "arr = [1, 2, 3]\nputs arr.length\nputs arr.empty?",
            explanation:
              "lengthは要素数、empty?は空かどうか。AIコードのレビューで読めればOK。",
          },
        ],
      },
      2: {
        name: "Lv2 インデックスにある",
        description: "AIに的確なヒントを出せる側",
        color: "#3498db",
        steps: [
          {
            title: "include?で存在チェック",
            code: 'fruits = ["apple", "banana"]\nputs fruits.include?("apple")',
            explanation:
              "include?は要素が配列に含まれるか確認。AIに「含まれるかチェックして」と指示できる。",
          },
        ],
      },
      1: {
        name: "Lv1 知っていればOK",
        description: "必要になったらAIに聞ける側",
        color: "#95a5a6",
        steps: [
          {
            title: "flatten",
            code: "nested = [[1, 2], [3, 4]]\nputs nested.flatten",
            explanation:
              "flattenはネストした配列を平坦にする。存在を知っていればAIに任せられる。",
          },
        ],
      },
    },
  },
  5: {
    title: "第5章",
    subtitle: "配列で扱うメソッド",
    image: "img/ch5_levels.png",
    levels: {
      5: {
        name: "Lv5 深く理解する",
        description: "AIに「何をするか」指示を出す側",
        color: "#e74c3c",
        steps: [
          {
            title: "mapで変換",
            code: "numbers = [1, 2, 3, 4, 5]\ndoubled = numbers.map { |n| n * 2 }\nputs doubled",
            explanation:
              "mapは各要素を変換して新しい配列を返す。元の配列は変わらない。",
          },
          {
            title: "selectで条件抽出",
            code: "numbers = [1, 2, 3, 4, 5]\nevens = numbers.select { |n| n.even? }\nputs evens",
            explanation:
              "selectは条件に合う要素だけ抽出。SQLのWHEREに似た考え方。",
          },
          {
            title: "each_with_index",
            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.each_with_index do |fruit, i|\n  puts "#{i}: #{fruit}"\nend',
            explanation:
              "each_with_indexはインデックス付きで繰り返し。番号が必要な時に使う。",
          },
        ],
      },
      4: {
        name: "Lv4 分かればOK",
        description: "AIの出力をレビューする側",
        color: "#e67e22",
        steps: [
          {
            title: "sortで並び替え",
            code: "nums = [3, 1, 4, 1, 5]\nputs nums.sort\nputs nums.sort.reverse",
            explanation:
              "sortは昇順、reverseで降順。AIコードで見て意味が分かればOK。",
          },
          {
            title: "uniqで重複除去",
            code: "arr = [1, 2, 2, 3, 3, 3]\nputs arr.uniq",
            explanation:
              "uniqは重複を除去した新しい配列を返す。データクレンジングで頻出。",
          },
        ],
      },
      3: {
        name: "Lv3 読めればOK",
        description: "AIのコードを確認する側",
        color: "#f1c40f",
        steps: [
          {
            title: "joinで文字列化",
            code: 'words = ["Hello", "World"]\nputs words.join(" ")\nputs words.join(", ")',
            explanation:
              "joinは配列要素を指定の区切り文字で連結。HTMLやCSVの生成で使う。",
          },
        ],
      },
      2: {
        name: "Lv2 インデックスにある",
        description: "AIに的確なヒントを出せる側",
        color: "#3498db",
        steps: [
          {
            title: "rejectで除外",
            code: "numbers = [1, 2, 3, 4, 5]\nodds = numbers.reject { |n| n.even? }\nputs odds",
            explanation:
              "rejectはselectの逆。条件に合うものを除外。AIに「偶数を除外して」と言える。",
          },
        ],
      },
      1: {
        name: "Lv1 知っていればOK",
        description: "必要になったらAIに聞ける側",
        color: "#95a5a6",
        steps: [
          {
            title: "reduceで集約",
            code: "numbers = [1, 2, 3, 4, 5]\nsum = numbers.reduce(0) { |total, n| total + n }\nputs sum",
            explanation:
              "reduceは全要素を1つの値に集約。合計や最大値の計算に使う。",
          },
        ],
      },
    },
  },
  6: {
    title: "第6章",
    subtitle: "名前と値をセットにするハッシュ",
    image: "img/ch6_hash_levels.png",
    levels: {
      5: {
        name: "Lv5 深く理解する",
        description: "AIに「何をするか」指示を出す側",
        color: "#e74c3c",
        steps: [
          {
            title: "ハッシュと配列の違い",
            code: 'user = {name: "Taro", age: 25, city: "Tokyo"}',
            explanation:
              "ハッシュはキーと値のペア。配列と違い、名前でデータを管理する。AIに「ハッシュで管理して」と指示するための基本。",
          },
          {
            title: "ハッシュから値を取り出す",
            code: "puts user[:name]\nputs user[:age]",
            explanation:
              "シンボル(:name)でキーを指定して値を取得。Railsのparams[:id]と同じ仕組み。",
          },
          {
            title: "eachでキーと値を繰り返す",
            code: 'user.each do |key, value|\n  puts "#{key}: #{value}"\nend',
            explanation:
              "each do |key, value| でキーと値を1つずつ取り出す。Rails課題で頻繁に使う必須パターン。",
          },
          {
            title: "シンボル記法で定義",
            code: 'params = {id: "1", name: "Taro", age: "25"}',
            explanation:
              "Railsのルーティングやparamsで毎回出てくるシンボル記法。{key: value}の形。",
          },
        ],
      },
      4: {
        name: "Lv4 分かればOK",
        description: "AIの出力をレビューする側",
        color: "#e67e22",
        steps: [
          {
            title: "ネストしたハッシュ",
            code: 'data = {user: {name: "Taro", address: {city: "Tokyo"}}}',
            explanation:
              "ハッシュの中にハッシュ。Railsのparamsやアプリ設定で頻出。",
          },
          {
            title: "ネストへのアクセス",
            code: "puts data[:user][:name]\nputs data[:user][:address][:city]",
            explanation:
              "[]を連鎖してネストの深い値にアクセス。AIコードで頻出するパターン。",
          },
          {
            title: "ハッシュの配列",
            code: 'users = [\n  {name: "Taro", age: 25},\n  {name: "Hanako", age: 30}\n]',
            explanation:
              "DBレコードの一覧イメージ。ActiveRecordの結果がこの形式で返る。",
          },
        ],
      },
      3: {
        name: "Lv3 読めればOK",
        description: "AIのコードを確認する側",
        color: "#f1c40f",
        steps: [
          {
            title: "mergeでハッシュ合体",
            code: 'defaults = {color: "red", size: "M"}\ncustom = {size: "L", weight: "100g"}\nresult = defaults.merge(custom)',
            explanation:
              "mergeで2つのハッシュを合体。重複キーは後のハッシュが優先。",
          },
          {
            title: "selectで条件抽出",
            code: "prices = {apple: 100, banana: 200, cherry: 300}\nexpensive = prices.select { |k, v| v >= 200 }",
            explanation:
              "selectで条件に合うものだけ抽出。AIのコードレビュー時に読めれば十分。",
          },
        ],
      },
      2: {
        name: "Lv2 インデックスにある",
        description: "AIに的確なヒントを出せる側",
        color: "#3498db",
        steps: [
          {
            title: "digで安全にアクセス",
            code: 'data = {user: {profile: {name: "Taro"}}}\nputs data.dig(:user, :profile, :name)',
            explanation:
              "digはネストが深いハッシュに安全にアクセス。nilエラーを防ぐ。",
          },
        ],
      },
      1: {
        name: "Lv1 知っていればOK",
        description: "必要になったらAIに聞ける側",
        color: "#95a5a6",
        steps: [
          {
            title: "Hash.newのデフォルト値",
            code: "count = Hash.new(0)\ncount[:apple] += 1\ncount[:banana] += 3\nputs count",
            explanation:
              "Hash.new(0)で存在しないキーのデフォルト値を設定。カウント処理で使う。",
          },
        ],
      },
    },
  },
};
