// RUNTEQ Ruby学習モード データ
const RUBY_LEARNING_CHAPTERS = [
  { id: 1, title: 'Chapter 1: Rubyを動かす環境設定' },
  { id: 2, title: 'Chapter 2: Rubyを使った簡単なプログラムの作成' },
  { id: 3, title: 'Chapter 3: プログラムを制御する' },
  { id: 4, title: 'Chapter 4: 配列の基本' },
  { id: 5, title: 'Chapter 5: 配列を操作する' },
  { id: 6, title: 'Chapter 6: Hashの基本' },
  { id: 7, title: 'Chapter 7: メソッドについて' },
  { id: 8, title: 'Chapter 8: クラスについて' },
  { id: 9, title: 'Chapter 9: モジュールについて' },
  { id: 10, title: 'Chapter 10: Rubyを使った複雑な操作(1)' },
  { id: 11, title: 'Chapter 11: Rubyを使った複雑な操作(2)' },
];

const RUBY_LEARNING_DATA = {
  1: {
    title: 'Chapter 1',
    subtitle: 'Rubyを動かす環境設定',
    steps: [
      {
        number: 1,
        title: 'Docker環境の確認',
        code: null,
        file: null,
        terminal: 'docker compose run --rm app ruby -v',
        output: 'ruby 3.2.3 (2024-01-18 revision 52bb2ac0a6) [x86_64-linux]',
        explanation:
          'Dockerの中でRubyが動くか確認するコマンド。ruby -v でRubyのバージョンが表示されればOK。',
      },
      {
        number: 2,
        title: 'ruby -e でコマンドラインから直接実行',
        code: null,
        file: null,
        terminal: "docker compose run --rm app ruby -e \"puts 'hello world'\"",
        output: 'hello world',
        explanation:
          'ruby -e はRubyのコードを直接実行するオプション。ファイルを作らずにちょっとした動作確認ができる。',
      },
      {
        number: 3,
        title: 'Hello Worldをファイルで実行',
        code: `puts 'hello world'`,
        file: 'chapter1/hello_world.rb',
        terminal: 'docker compose run --rm app ruby chapter1/hello_world.rb',
        output: 'hello world',
        explanation:
          'Rubyコードをファイルに書いて実行する基本パターン。.rb がRubyファイルの拡張子。',
      },
      {
        number: 4,
        title: 'puts / print / p の違い',
        code: `puts "hello"
puts [1, 2, 3]

print "hello"
print "world"

puts ""
p "hello"
p [1, 2, 3]`,
        file: 'chapter1/output_methods.rb',
        terminal: 'docker compose run --rm app ruby chapter1/output_methods.rb',
        output: `hello
1
2
3
helloworld
"hello"
[1, 2, 3]`,
        explanation:
          'puts: 改行付きで表示（配列は1要素ずつ）。print: 改行なしで表示。p: データの型がわかる形で表示（文字列は""付き、配列は[]のまま）。デバッグにはpが便利。',
      },
      {
        number: 5,
        title: 'コメントの書き方',
        code: `# これはコメント（実行されない）
puts "Hello" # 行末コメントもOK

# puts "この行は実行されない"
puts "この行は実行される"`,
        file: 'chapter1/comment.rb',
        terminal: 'docker compose run --rm app ruby chapter1/comment.rb',
        output: `Hello
この行は実行される`,
        explanation:
          '# から行末まではコメント（プログラムとして実行されない）。コードの説明を書いたり、一時的にコードを無効化するのに使う。',
      },
    ],
  },
  2: {
    title: 'Chapter 2',
    subtitle: 'Rubyを使った簡単なプログラムの作成',
    steps: [
      {
        number: 1,
        title: '数値を出力する',
        code: `puts 1
puts 1 + 1
puts 2 - 1
puts 2 * 3
puts 6 / 3
puts 5 % 2
puts 2 ** 3`,
        file: 'chapter2/integer.rb',
        terminal: 'docker compose run --rm app ruby chapter2/integer.rb',
        output: `1
2
1
6
2
1
8`,
        explanation:
          '+ 足し算、- 引き算、* 掛け算、/ 割り算（整数同士は小数切り捨て）、% 余り、** べき乗（2の3乗=8）。',
      },
      {
        number: 2,
        title: '文字列の出力と連結',
        code: `puts 'Hello'
puts 'Hello' + 'RUNTEQ'
puts 'Hello' + ' ' + 'RUNTEQ'`,
        file: 'chapter2/string.rb',
        terminal: 'docker compose run --rm app ruby chapter2/string.rb',
        output: `Hello
HelloRUNTEQ
Hello RUNTEQ`,
        explanation:
          '文字列はシングルクォーテーションまたはダブルクォーテーションで囲む。+ で連結できる。スペースも文字列として明示的に足す必要がある。',
      },
      {
        number: 3,
        title: '文字列と数値の違い',
        code: `puts 1 + 1
puts '1' + '1'
puts '1'.to_i + '1'.to_i`,
        file: 'chapter2/string_vs_number.rb',
        terminal: 'docker compose run --rm app ruby chapter2/string_vs_number.rb',
        output: `2
11
2`,
        explanation:
          '数値の 1 + 1 は計算で2。文字列の "1" + "1" は連結で"11"。.to_i で文字列を数値に変換すれば計算できる。型の違いを意識することが大切。',
      },
      {
        number: 4,
        title: '変数（データの入れ物）',
        code: `x = 1
y = 2
z = 3
puts x + y
puts y - x
puts x * y * z
puts 6 / z`,
        file: 'chapter2/integer_variable.rb',
        terminal: 'docker compose run --rm app ruby chapter2/integer_variable.rb',
        output: `3
1
6
2`,
        explanation:
          '変数はデータを入れる箱。= で値を代入する。変数同士で計算もできる。変数名は自由に付けられるが、小文字で始めるのがルール。',
      },
      {
        number: 5,
        title: '文字列変数と式展開',
        code: `x = 'Hello'
y = 'RUNTEQ'
puts x + ' ' + y
puts "#{x} #{y}"
puts '#{x} #{y}'`,
        file: 'chapter2/string_variable.rb',
        terminal: 'docker compose run --rm app ruby chapter2/string_variable.rb',
        output: `Hello RUNTEQ
Hello RUNTEQ
#{x} #{y}`,
        explanation:
          '#{変数名} で文字列の中に変数の値を埋め込める（式展開）。ダブルクォーテーション""でのみ使える。シングルクォーテーション\'\'では式展開されずそのまま表示される。',
      },
      {
        number: 6,
        title: '定数（変わらない値）',
        code: `PI = 3.14159
TAX_RATE = 0.08
puts PI
puts TAX_RATE

# 定数を再代入すると警告が出る
TAX_RATE = 0.10
puts TAX_RATE`,
        file: 'chapter2/constant.rb',
        terminal: 'docker compose run --rm app ruby chapter2/constant.rb',
        output: `3.14159
0.08
chapter2/constant.rb:6: warning: already initialized constant TAX_RATE
0.1`,
        explanation:
          '定数は大文字で始める（慣習的に全大文字）。変更しない値に使う。再代入すると警告(warning)が出るが、エラーにはならない。',
      },
      {
        number: 7,
        title: '型変換メソッド',
        code: `# 文字列 → 数値
puts "10".to_i
puts "10".to_f

# 数値 → 文字列
puts 10.to_s
puts 10.to_f

# 型が違うとエラーになる例
# puts "10" + 10  # TypeError!
puts "10" + 10.to_s`,
        file: 'chapter2/type_convert.rb',
        terminal: 'docker compose run --rm app ruby chapter2/type_convert.rb',
        output: `10
10.0
10
10.0
1010`,
        explanation:
          '.to_i は整数に、.to_f は小数に、.to_s は文字列に変換。文字列と数値を+で結合するとTypeErrorになるので、型を揃える必要がある。',
      },
      {
        number: 8,
        title: '文字列メソッド',
        code: `puts "hello".upcase
puts "HELLO".downcase
puts "hello".length
puts "hello world".include?("world")
puts "hello".reverse
puts "  hello  ".strip`,
        file: 'chapter2/string_methods.rb',
        terminal: 'docker compose run --rm app ruby chapter2/string_methods.rb',
        output: `HELLO
hello
5
true
olleh
hello`,
        explanation:
          '.upcase 大文字化、.downcase 小文字化、.length 文字数、.include? 含まれるか、.reverse 逆順、.strip 前後の空白除去。メソッドは「オブジェクトへの命令」。',
      },
    ],
  },
  3: {
    title: 'Chapter 3',
    subtitle: 'プログラムを制御する',
    steps: [
      {
        number: 1,
        title: 'if文（条件分岐）',
        code: `number = 5

if number > 5
  puts "この数値は5より大きいです"
elsif number == 5
  puts "この数値は5です"
else
  puts "この数値は5より小さいです"
end`,
        file: 'chapter3/basic_conditional.rb',
        terminal: 'docker compose run --rm app ruby chapter3/basic_conditional.rb',
        output: 'この数値は5です',
        explanation:
          'if文で条件分岐。= は代入、== は比較（等しいか判定）。elsifで複数条件、elseでどれにも当てはまらない場合。',
      },
      {
        number: 2,
        title: '比較演算子',
        code: `a = 10
b = 20

puts a == b
puts a != b
puts a > b
puts a < b
puts a >= b
puts a <= b`,
        file: 'chapter3/comparison_operators.rb',
        terminal: 'docker compose run --rm app ruby chapter3/comparison_operators.rb',
        output: `false
true
false
true
false
true`,
        explanation:
          '== 等しい？、!= 等しくない？、> より大きい？、< より小さい？、>= 以上？、<= 以下？。結果はtrue/falseで返る。',
      },
      {
        number: 3,
        title: '論理演算子',
        code: `a = true
b = false

puts a && b
puts a || b
puts !a
puts !b`,
        file: 'chapter3/logical_operators.rb',
        terminal: 'docker compose run --rm app ruby chapter3/logical_operators.rb',
        output: `false
true
false
true`,
        explanation:
          '&& 両方trueか（かつ）、|| どちらかtrueか（または）、! 反転。',
      },
      {
        number: 4,
        title: 'case文',
        code: `language = 'Ruby'

case language
when 'Ruby'
  puts '私はRubyistです'
when 'Python'
  puts '私はPythonistaです'
when 'PHP'
  puts '私はPHPerです'
else
  puts '私はプログラマーです'
end`,
        file: 'chapter3/case_basic.rb',
        terminal: 'docker compose run --rm app ruby chapter3/case_basic.rb',
        output: '私はRubyistです',
        explanation:
          'case文は「この値は何？」で分岐するときに使う。if-elsifでも書けるが、条件が多いときはcase文の方が見やすい。',
      },
      {
        number: 5,
        title: 'while文（繰り返し）',
        code: `i = 1

puts "繰り返し処理を開始します"
while i <= 5
  puts "#{i}回目"
  i += 1
end
puts "繰り返し処理を終了しました"`,
        file: 'chapter3/while_loop.rb',
        terminal: 'docker compose run --rm app ruby chapter3/while_loop.rb',
        output: `繰り返し処理を開始します
1回目
2回目
3回目
4回目
5回目
繰り返し処理を終了しました`,
        explanation:
          'while 条件 → 条件がtrueの間ずっと繰り返す。i += 1 を忘れると無限ループになるので注意！',
      },
      {
        number: 6,
        title: 'timesメソッド',
        code: `5.times do |i|
  puts "#{i + 1}回目"
end`,
        file: 'chapter3/times_method.rb',
        terminal: 'docker compose run --rm app ruby chapter3/times_method.rb',
        output: `1回目
2回目
3回目
4回目
5回目`,
        explanation:
          '5.times で5回繰り返す。|i| の i は0から始まるので、i + 1 で1から表示。whileより短く書ける。',
      },
      {
        number: 7,
        title: 'each文',
        code: `(1..5).each do |i|
  puts "#{i}回目"
end`,
        file: 'chapter3/each_loop.rb',
        terminal: 'docker compose run --rm app ruby chapter3/each_loop.rb',
        output: `1回目
2回目
3回目
4回目
5回目`,
        explanation:
          '(1..5) は「1から5までの範囲」。eachはその範囲の要素を1つずつ取り出して |i| に入れる。timesと違って i が1から始まるので + 1 が不要。Rubyで一番よく使われる繰り返し。',
      },
    ],
  },
  4: {
    title: 'Chapter 4',
    subtitle: '配列の基本',
    steps: [
      {
        number: 1,
        title: '配列を作る',
        code: `fruits = ["apple", "banana", "cherry"]
p fruits

# 配列にはいろいろな型を混ぜて入れられる
mixed = [1, "two", 3.0, [4, 5], {six: 6}]
p mixed`,
        file: 'chapter4/generate_array.rb',
        terminal: 'docker compose run --rm app ruby chapter4/generate_array.rb',
        output: `["apple", "banana", "cherry"]
[1, "two", 3.0, [4, 5], {:six=>6}]`,
        explanation:
          '配列は複数のデータを順番に並べた箱（ロッカーのイメージ）。[] で囲んでカンマ , で区切る。数値・文字列・配列・Hashなど何でも入れられる。p は配列をそのまま見やすく表示する。',
      },
      {
        number: 2,
        title: 'インデックスでアクセス（正のインデックス）',
        code: `fruits = ["apple", "banana", "cherry", "date", "elderberry"]
puts fruits[0]
puts fruits[1]
puts fruits[2]`,
        file: 'chapter4/array_index.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_index.rb',
        output: `apple
banana
cherry`,
        explanation:
          'インデックスは0から始まる。fruits[0] が最初の要素。書いた順番がそのまま番号になる。',
      },
      {
        number: 3,
        title: '負のインデックス',
        code: `fruits = ["apple", "banana", "cherry", "date", "elderberry"]
puts fruits[-1]
puts fruits[-2]
puts fruits[-3]`,
        file: 'chapter4/array_negative.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_negative.rb',
        output: `elderberry
date
cherry`,
        explanation:
          '負のインデックスは後ろから数える。-1 が最後の要素、-2 が最後から2番目。',
      },
      {
        number: 4,
        title: '範囲でアクセス',
        code: `fruits = ["apple", "banana", "cherry", "date", "elderberry"]
p fruits[1..3]`,
        file: 'chapter4/array_range.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_range.rb',
        output: '["banana", "cherry", "date"]',
        explanation:
          '1..3 のドット2つは「1から3まで」という範囲を表す記号（小数点の1.3とは別物）。インデックス1から3までの要素をまとめて取り出せる。',
      },
      {
        number: 5,
        title: '要素の追加（push / <<）',
        code: `fruits = ["apple", "banana"]
p fruits

fruits.push("cherry")
p fruits

fruits << "date"
p fruits`,
        file: 'chapter4/array_push.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_push.rb',
        output: `["apple", "banana"]
["apple", "banana", "cherry"]
["apple", "banana", "cherry", "date"]`,
        explanation:
          'pushと<<は配列の末尾に要素を追加する。どちらも同じ動きで、<<の方が短く書ける。',
      },
      {
        number: 6,
        title: '要素の追加（unshift / insert）',
        code: `fruits = ["apple", "banana"]

# unshift: 先頭に追加
fruits.unshift("cherry")
p fruits

# insert: 指定位置に追加
fruits.insert(1, "grape")
p fruits`,
        file: 'chapter4/array_unshift_insert.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_unshift_insert.rb',
        output: `["cherry", "apple", "banana"]
["cherry", "grape", "apple", "banana"]`,
        explanation:
          'unshiftは先頭に追加（pushの逆）。insertは指定したインデックス位置に追加。insert(1, "grape")でインデックス1の位置に挿入。',
      },
      {
        number: 7,
        title: '要素の削除（pop / shift）',
        code: `fruits = ["apple", "banana", "cherry", "date"]
p fruits

last = fruits.pop
puts "popで削除: #{last}"
p fruits

first = fruits.shift
puts "shiftで削除: #{first}"
p fruits`,
        file: 'chapter4/array_pop_shift.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_pop_shift.rb',
        output: `["apple", "banana", "cherry", "date"]
popで削除: date
["apple", "banana", "cherry"]
shiftで削除: apple
["banana", "cherry"]`,
        explanation:
          'popは末尾の要素を削除して返す。shiftは先頭の要素を削除して返す。どちらも削除した要素が戻り値になる。',
      },
      {
        number: 8,
        title: '要素の削除（delete / delete_at）',
        code: `fruits = ["apple", "banana", "cherry", "banana"]

# delete: 値を指定して全て削除
fruits.delete("banana")
p fruits

fruits2 = ["apple", "banana", "cherry"]
# delete_at: インデックスを指定して削除
fruits2.delete_at(1)
p fruits2`,
        file: 'chapter4/array_delete.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_delete.rb',
        output: `["apple", "cherry"]
["apple", "cherry"]`,
        explanation:
          'deleteは値を指定して一致する要素を全て削除。delete_atはインデックスを指定して1つだけ削除。',
      },
      {
        number: 9,
        title: '配列の要素を変更する',
        code: `fruits = ["apple", "banana", "cherry"]
p fruits

fruits[1] = "avocado"
p fruits`,
        file: 'chapter4/array_change.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_change.rb',
        output: `["apple", "banana", "cherry"]
["apple", "avocado", "cherry"]`,
        explanation:
          'インデックスを指定して値を代入すると、その位置の要素を変更できる。fruits[1] = "avocado" で2番目の要素を上書き。',
      },
      {
        number: 10,
        title: 'eachで配列を繰り返す',
        code: `fruits = ["apple", "banana", "cherry"]
fruits.each do |fruit|
  puts fruit
end`,
        file: 'chapter4/array_each.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_each.rb',
        output: `apple
banana
cherry`,
        explanation:
          '配列.each do |変数| で各要素を1つずつ取り出して処理する。do~endの代わりに { } でも書ける。3章で学んだeachの配列版。',
      },
      {
        number: 11,
        title: 'each_with_index（インデックス付き）',
        code: `fruits = ["apple", "banana", "cherry"]
fruits.each_with_index do |fruit, index|
  puts "#{index}: #{fruit}"
end`,
        file: 'chapter4/array_each_index.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_each_index.rb',
        output: `0: apple
1: banana
2: cherry`,
        explanation:
          'each_with_indexで要素とインデックス番号を同時に取得できる。|fruit, index| の変数名は自由に決められる。',
      },
      {
        number: 12,
        title: 'まとめ：追加・削除メソッド一覧',
        code: `fruits = ["apple", "banana", "cherry"]
puts "元の配列:"
p fruits

puts "--- 追加メソッド ---"
puts "push(末尾):    fruits.push('date')"
puts "<<(末尾):      fruits << 'date'"
puts "unshift(先頭): fruits.unshift('date')"
puts "insert(位置):  fruits.insert(1, 'date')"

puts "--- 削除メソッド ---"
puts "pop(末尾):     fruits.pop"
puts "shift(先頭):   fruits.shift"
puts "delete(値):    fruits.delete('banana')"
puts "delete_at(位置): fruits.delete_at(1)"

puts "--- 変更 ---"
puts "fruits[1] = 'avocado'  # インデックス指定で上書き"`,
        file: 'chapter4/array_summary.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_summary.rb',
        output: `元の配列:
["apple", "banana", "cherry"]
--- 追加メソッド ---
push(末尾):    fruits.push('date')
<<(末尾):      fruits << 'date'
unshift(先頭): fruits.unshift('date')
insert(位置):  fruits.insert(1, 'date')
--- 削除メソッド ---
pop(末尾):     fruits.pop
shift(先頭):   fruits.shift
delete(値):    fruits.delete('banana')
delete_at(位置): fruits.delete_at(1)
--- 変更 ---
fruits[1] = 'avocado'  # インデックス指定で上書き`,
        explanation:
          '第4章で学んだ追加・削除・変更メソッドの一覧。push/<<は末尾追加、unshiftは先頭追加、insertは位置指定追加。pop/shift/delete/delete_atはそれぞれ異なる方法で削除。',
      },
    ],
  },
  5: {
    title: 'Chapter 5',
    subtitle: '配列を操作する',
    steps: [
      {
        number: 1,
        title: 'push / <<（末尾に追加）',
        code: `fruits = ["apple", "banana"]
fruits.push("cherry")
p fruits

fruits << "date"
p fruits`,
        file: 'chapter5/push_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/push_example.rb',
        output: `["apple", "banana", "cherry"]
["apple", "banana", "cherry", "date"]`,
        explanation:
          'pushは配列の末尾に要素を追加する。<< も同じ意味で、より短く書ける。どちらも元の配列を直接変更する（破壊的メソッド）。',
      },
      {
        number: 2,
        title: 'pop / shift（末尾・先頭から削除）',
        code: `fruits = ["apple", "banana", "cherry", "date"]

last = fruits.pop
puts "popで取り出した: #{last}"
p fruits

first = fruits.shift
puts "shiftで取り出した: #{first}"
p fruits`,
        file: 'chapter5/pop_shift_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/pop_shift_example.rb',
        output: `popで取り出した: date
["apple", "banana", "cherry"]
shiftで取り出した: apple
["banana", "cherry"]`,
        explanation:
          'popは末尾の要素を取り出して削除。shiftは先頭の要素を取り出して削除。どちらも取り出した要素を返す。',
      },
      {
        number: 3,
        title: 'unshift（先頭に追加）',
        code: `fruits = ["banana", "cherry"]
p fruits

fruits.unshift("apple")
p fruits

fruits.unshift("grape", "melon")
p fruits`,
        file: 'chapter5/unshift_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/unshift_example.rb',
        output: `["banana", "cherry"]
["apple", "banana", "cherry"]
["grape", "melon", "apple", "banana", "cherry"]`,
        explanation:
          'unshiftは配列の先頭に要素を追加する。pushの逆。複数の要素を一度に追加することもできる。',
      },
      {
        number: 4,
        title: 'uniq（重複を取り除く）',
        code: `numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5]
unique_numbers = numbers.uniq
p numbers
p unique_numbers`,
        file: 'chapter5/uniq_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/uniq_example.rb',
        output: `[1, 2, 2, 3, 4, 4, 5, 5, 5]
[1, 2, 3, 4, 5]`,
        explanation:
          'uniqメソッドは配列から重複を取り除いた新しい配列を作る。元の配列は変わらない。uniq!（!付き）なら元の配列を直接変更する。',
      },
      {
        number: 5,
        title: 'sort / sort.reverse（並び替え）',
        code: `numbers = [5, 3, 8, 1, 2, 7, 4, 6]
p numbers.sort
p numbers.sort.reverse

words = ["cherry", "apple", "banana"]
p words.sort`,
        file: 'chapter5/sort_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/sort_example.rb',
        output: `[1, 2, 3, 4, 5, 6, 7, 8]
[8, 7, 6, 5, 4, 3, 2, 1]
["apple", "banana", "cherry"]`,
        explanation:
          'sortは昇順（小さい順/あいうえお順）に並び替え。sort.reverseで降順。文字列もアルファベット順にソートできる。',
      },
      {
        number: 6,
        title: 'map / collect（要素を変換）',
        code: `numbers = [1, 2, 3, 4, 5]
doubled = numbers.map { |n| n * 2 }
p doubled

# collectはmapの別名（全く同じ動き）
squared = numbers.collect { |n| n ** 2 }
p squared`,
        file: 'chapter5/map_collect_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/map_collect_example.rb',
        output: `[2, 4, 6, 8, 10]
[1, 4, 9, 16, 25]`,
        explanation:
          'mapは各要素に処理を適用した新しい配列を作る。collectはmapの別名で全く同じ動き。{ |n| n * 2 } がブロック（処理のかたまり）。',
      },
      {
        number: 7,
        title: 'select / filter（条件に合う要素を抽出）',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# selectで偶数だけ抽出
even = numbers.select { |n| n.even? }
p even

# filterはselectの別名（全く同じ）
big = numbers.filter { |n| n > 5 }
p big`,
        file: 'chapter5/select_filter_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/select_filter_example.rb',
        output: `[2, 4, 6, 8, 10]
[6, 7, 8, 9, 10]`,
        explanation:
          'selectは条件がtrueの要素だけを集めた新しい配列を返す。filterはselectの別名。even?は偶数判定メソッド。',
      },
      {
        number: 8,
        title: 'reject（条件に合わない要素を抽出）',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# rejectで偶数を除外（=奇数だけ残す）
odd = numbers.reject { |n| n.even? }
p odd

# 5以下を除外
big = numbers.reject { |n| n <= 5 }
p big`,
        file: 'chapter5/reject_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/reject_example.rb',
        output: `[1, 3, 5, 7, 9]
[6, 7, 8, 9, 10]`,
        explanation:
          'rejectはselectの逆。条件がtrueの要素を除外した新しい配列を返す。selectが「〜に合うものを選ぶ」なら、rejectは「〜に合うものを除く」。',
      },
      {
        number: 9,
        title: 'find / detect（最初の1件を検索）',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 最初に見つかった偶数を返す
first_even = numbers.find { |n| n.even? }
puts first_even

# detectはfindの別名
first_big = numbers.detect { |n| n > 7 }
puts first_big`,
        file: 'chapter5/find_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/find_example.rb',
        output: `2
8`,
        explanation:
          'findは条件に合う最初の1件だけを返す。selectが「全部」返すのに対し、findは「最初の1つ」だけ。detectはfindの別名。見つからなければnilを返す。',
      },
      {
        number: 10,
        title: 'include?（要素が含まれるか確認）',
        code: `fruits = ["apple", "banana", "cherry"]

puts fruits.include?("banana")
puts fruits.include?("grape")

numbers = [1, 2, 3, 4, 5]
puts numbers.include?(3)
puts numbers.include?(10)`,
        file: 'chapter5/include_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/include_example.rb',
        output: `true
false
true
false`,
        explanation:
          'include?は配列にその要素が含まれているかをtrue/falseで返す。?で終わるメソッドは「〜ですか？」という意味で、true/falseを返す慣習。',
      },
      {
        number: 11,
        title: 'empty? / any? / all? / none?（配列の状態を確認）',
        code: `fruits = ["apple", "banana", "cherry"]
empty_array = []

puts "empty?:"
puts fruits.empty?
puts empty_array.empty?

puts "any?（1つでも条件に合うか）:"
puts fruits.any? { |f| f == "banana" }

puts "all?（全部条件に合うか）:"
puts fruits.all? { |f| f.length > 3 }

puts "none?（1つも条件に合わないか）:"
puts fruits.none? { |f| f == "grape" }`,
        file: 'chapter5/empty_any_all_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/empty_any_all_example.rb',
        output: `empty?:
false
true
any?（1つでも条件に合うか）:
true
all?（全部条件に合うか）:
true
none?（1つも条件に合わないか）:
true`,
        explanation:
          'empty?は配列が空かどうか。any?は1つでも条件を満たすか。all?は全要素が条件を満たすか。none?は条件を満たす要素がないか。全てtrue/falseを返す。',
      },
      {
        number: 12,
        title: 'join（配列を文字列に結合）',
        code: `words = ["Hello", "world", "this", "is", "Ruby"]
puts words.join(" ")
puts words.join(", ")
puts words.join("-")`,
        file: 'chapter5/join_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/join_example.rb',
        output: `Hello world this is Ruby
Hello, world, this, is, Ruby
Hello-world-this-is-Ruby`,
        explanation:
          'joinは配列の要素を指定した区切り文字で結合して1つの文字列にする。区切り文字を変えると結果も変わる。',
      },
      {
        number: 13,
        title: 'size / length / count（要素数）',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
puts numbers.size
puts numbers.length
puts numbers.count
puts numbers.count { |n| n.even? }`,
        file: 'chapter5/size_count_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/size_count_example.rb',
        output: `10
10
10
5`,
        explanation:
          'size/lengthは要素数を返す（同じ機能）。countはブロックなしなら要素数、ブロック付きなら条件に合う要素数を返す。',
      },
      {
        number: 14,
        title: 'flatten / compact（配列の整理）',
        code: `# flattenで入れ子の配列を平坦にする
nested = [[1, 2], [3, 4], [5, [6, 7]]]
p nested.flatten

# compactでnilを除去する
with_nil = [1, nil, 2, nil, 3, nil]
p with_nil.compact`,
        file: 'chapter5/flatten_compact_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/flatten_compact_example.rb',
        output: `[1, 2, 3, 4, 5, 6, 7]
[1, 2, 3]`,
        explanation:
          'flattenは入れ子の配列を1次元に平坦化する。compactはnil（空の値）を取り除く。どちらもデータ整理でよく使う。',
      },
      {
        number: 15,
        title: 'まとめ：メソッド一覧',
        code: `numbers = [3, 1, 4, 1, 5, 9, 2, 6]

puts "--- 基本操作 ---"
p numbers.push(7)      # 末尾に追加
p numbers.pop          # 末尾から取り出し
p numbers.unshift(0)   # 先頭に追加
p numbers.shift        # 先頭から取り出し

puts "--- 検索・抽出 ---"
p numbers.find { |n| n > 5 }     # 最初の1件
p numbers.select { |n| n > 3 }   # 条件に合う全件
p numbers.reject { |n| n > 3 }   # 条件に合わない全件

puts "--- 変換 ---"
p numbers.map { |n| n * 10 }     # 各要素を変換
p numbers.sort                    # 並び替え
p numbers.uniq                    # 重複除去

puts "--- 確認 ---"
p numbers.include?(5)   # 含まれるか
p numbers.empty?        # 空か
p numbers.any? { |n| n > 8 }  # 1つでも条件に合うか`,
        file: 'chapter5/summary_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/summary_example.rb',
        output: `--- 基本操作 ---
[3, 1, 4, 1, 5, 9, 2, 6, 7]
7
[0, 3, 1, 4, 1, 5, 9, 2, 6]
0
--- 検索・抽出 ---
5
[4, 5, 9, 6]
[3, 1, 1, 2]
--- 変換 ---
[30, 10, 40, 10, 50, 90, 20, 60]
[1, 1, 2, 3, 4, 5, 6, 9]
[3, 1, 4, 5, 9, 2, 6]
--- 確認 ---
true
false
true`,
        explanation:
          '第5章で学んだメソッドの総まとめ。基本操作（push/pop/shift/unshift）、検索・抽出（find/select/reject）、変換（map/sort/uniq）、確認（include?/empty?/any?）を1つのファイルで復習。',
      },
    ],
  },
  6: {
    title: 'Chapter 6',
    subtitle: 'Hashの基本',
    steps: [
      {
        number: 1,
        title: 'Hashとは（シンボルキーと文字列キー）',
        code: `# シンボルキー（推奨）
hash1 = { name: "Alice", age: 30, city: "Wonderland" }
puts hash1

# 文字列キー
hash2 = { "name" => "Alice", "age" => 30, "city" => "Wonderland" }
puts hash2`,
        file: 'chapter6/basic_hash.rb',
        terminal: 'docker compose run --rm app ruby chapter6/basic_hash.rb',
        output: `{:name=>"Alice", :age=>30, :city=>"Wonderland"}
{"name"=>"Alice", "age"=>30, "city"=>"Wonderland"}`,
        explanation:
          'Hashはキーと値のペアでデータを管理する。{ キー: 値 } のシンボルキーと { "キー" => 値 } の文字列キーの2通りの書き方がある。シンボルキーの方がメモリ効率が良く推奨。',
      },
      {
        number: 2,
        title: 'Hashの値にアクセス',
        code: `# 文字列キーの場合
hash_string = { "name" => "Alice", "age" => 30 }
puts hash_string["name"]
puts hash_string["age"]

# シンボルキーの場合
hash_symbol = { name: "Alice", age: 30 }
puts hash_symbol[:name]
puts hash_symbol[:age]`,
        file: 'chapter6/get_value.rb',
        terminal: 'docker compose run --rm app ruby chapter6/get_value.rb',
        output: `Alice
30
Alice
30`,
        explanation:
          '文字列キーは hash["key"] で、シンボルキーは hash[:key] で値を取得。キーの種類に合わせたアクセス方法を使う。外部API連携では文字列キーが返ることが多い。',
      },
      {
        number: 3,
        title: 'Hashに要素を追加・変更',
        code: `person = { name: "太郎", age: 30 }
p person

person[:city] = "東京"
person[:age] = 31
p person`,
        file: 'chapter6/hash_update.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_update.rb',
        output: `{:name=>"太郎", :age=>30}
{:name=>"太郎", :age=>31, :city=>"東京"}`,
        explanation:
          'Hash[キー] = 値 で追加・変更。存在しないキーなら新規追加、存在するキーなら値を上書き。',
      },
      {
        number: 4,
        title: 'Hashから要素を削除',
        code: `person = { name: "太郎", age: 30, city: "東京" }
p person

person.delete(:city)
p person`,
        file: 'chapter6/hash_delete.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_delete.rb',
        output: `{:name=>"太郎", :age=>30, :city=>"東京"}
{:name=>"太郎", :age=>30}`,
        explanation:
          'deleteメソッドで指定したキーの要素を削除できる。削除した値が返り値として返る。',
      },
      {
        number: 5,
        title: 'Hashの連結（merge）',
        code: `hash1 = { name: "Alice", age: 30 }
hash2 = { city: "Wonderland" }
hash3 = { name: "Bob", age: 20 }

merged = hash1.merge(hash2)
p merged

# キーが重複した場合、引数側の値が優先される
conflict = hash1.merge(hash3)
p conflict`,
        file: 'chapter6/merge_hash.rb',
        terminal: 'docker compose run --rm app ruby chapter6/merge_hash.rb',
        output: `{:name=>"Alice", :age=>30, :city=>"Wonderland"}
{:name=>"Bob", :age=>20}`,
        explanation:
          'mergeで複数のHashを1つにまとめる。キーが重複した場合は引数側（merge先）の値が優先される。元のHashは変わらない。',
      },
      {
        number: 6,
        title: 'Hashをeachで繰り返す',
        code: `person = { name: "太郎", age: 30, city: "東京" }

person.each do |key, value|
  puts "#{key}: #{value}"
end`,
        file: 'chapter6/hash_each.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_each.rb',
        output: `name: 太郎
age: 30
city: 東京`,
        explanation:
          'Hash.each do |key, value| でキーと値を1つずつ取り出して処理する。配列のeachは|要素|の1つだが、Hashは|キー, 値|の2つを受け取る。',
      },
      {
        number: 7,
        title: 'keys / values / has_key?',
        code: `person = { name: "太郎", age: 30, city: "東京" }

p person.keys
p person.values
puts person.has_key?(:name)
puts person.has_key?(:email)
puts person.size`,
        file: 'chapter6/hash_methods.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_methods.rb',
        output: `[:name, :age, :city]
["太郎", 30, "東京"]
true
false
3`,
        explanation:
          'keysでキーの配列、valuesで値の配列を取得。has_key?でキーが存在するか確認。sizeで要素数を取得。',
      },
      {
        number: 8,
        title: 'Hashの配列（実践的な使い方）',
        code: `users = [
  { name: "太郎", age: 30 },
  { name: "花子", age: 25 },
  { name: "次郎", age: 20 }
]

users.each do |user|
  puts "#{user[:name]}さん（#{user[:age]}歳）"
end

# 25歳以上のユーザーを抽出
adults = users.select { |user| user[:age] >= 25 }
p adults`,
        file: 'chapter6/hash_array.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_array.rb',
        output: `太郎さん（30歳）
花子さん（25歳）
次郎さん（20歳）
[{:name=>"太郎", :age=>30}, {:name=>"花子", :age=>25}]`,
        explanation:
          'Hashの配列は実務で非常によく使うパターン。ユーザー一覧などのデータを表現できる。配列メソッド（each, select等）と組み合わせて操作する。',
      },
    ],
  },
  7: {
    title: 'Chapter 7',
    subtitle: 'メソッドについて',
    steps: [
      {
        number: 1,
        title: 'メソッドの定義と呼び出し',
        code: `def say_hello
  puts "Hello, Ruby!"
end

say_hello`,
        file: 'chapter7/method_concept.rb',
        terminal: 'docker compose run --rm app ruby chapter7/method_concept.rb',
        output: 'Hello, Ruby!',
        explanation:
          'def メソッド名 〜 end でメソッドを定義。メソッドは処理をまとめて名前をつけたもの。定義しただけでは実行されず、呼び出して初めて動く。',
      },
      {
        number: 2,
        title: 'メソッドで重複を減らす',
        code: `# メソッドなし（同じ処理を何度も書く）
puts "Hello, Alice!"
puts "Hello, Bob!"
puts "Hello, Carol!"

# メソッドあり（1回定義すれば何度でも使える）
def greet(name)
  puts "Hello, #{name}!"
end

greet("Alice")
greet("Bob")
greet("Carol")`,
        file: 'chapter7/method_importance.rb',
        terminal: 'docker compose run --rm app ruby chapter7/method_importance.rb',
        output: `Hello, Alice!
Hello, Bob!
Hello, Carol!
Hello, Alice!
Hello, Bob!
Hello, Carol!`,
        explanation:
          'メソッドで同じ処理の繰り返し記述を省ける。名前を変えたくなった時もメソッド内を1箇所変えるだけでOK。これをDRY原則（Don\'t Repeat Yourself）という。',
      },
      {
        number: 3,
        title: '基本的な引数',
        code: `def greet(name)
  puts "Hello, #{name}!"
end

greet("Alice")
greet "Bob"`,
        file: 'chapter7/method_arguments.rb',
        terminal: 'docker compose run --rm app ruby chapter7/method_arguments.rb',
        output: `Hello, Alice!
Hello, Bob!`,
        explanation:
          '引数はメソッドに渡す値。括弧()で指定するのが基本だが、シンプルな場合は括弧を省略して半角スペースで区切ってもOK。',
      },
      {
        number: 4,
        title: 'デフォルト引数',
        code: `def greet(name = "Guest")
  puts "Hello, #{name}!"
end

greet("Alice")
greet`,
        file: 'chapter7/default_arguments.rb',
        terminal: 'docker compose run --rm app ruby chapter7/default_arguments.rb',
        output: `Hello, Alice!
Hello, Guest!`,
        explanation:
          '引数にデフォルト値を設定できる。呼び出し時に値を渡さなければデフォルト値が使われる。',
      },
      {
        number: 5,
        title: '可変長引数（*）',
        code: `def greet(*names)
  names.each do |name|
    puts "Hello, #{name}!"
  end
end

greet("Alice", "Bob", "Carol")`,
        file: 'chapter7/variable_arguments.rb',
        terminal: 'docker compose run --rm app ruby chapter7/variable_arguments.rb',
        output: `Hello, Alice!
Hello, Bob!
Hello, Carol!`,
        explanation:
          'アスタリスク * で可変長引数を定義。渡された引数は配列として扱われる。何個でも引数を渡せる。',
      },
      {
        number: 6,
        title: 'キーワード引数',
        code: `def greet(name:, age:)
  puts "Hello, I am #{name}!"
  puts "I am #{age} years old."
end

greet(age: 20, name: "Alice")`,
        file: 'chapter7/keyword_arguments.rb',
        terminal: 'docker compose run --rm app ruby chapter7/keyword_arguments.rb',
        output: `Hello, I am Alice!
I am 20 years old.`,
        explanation:
          'キーワード引数は引数名を指定して値を渡す。順番を気にしなくてよいのがメリット。引数名: で定義。',
      },
      {
        number: 7,
        title: '戻り値（return）',
        code: `def add(a, b)
  a + b
end

result = add(3, 5)
puts result

def check_age(age)
  if age >= 18
    return "成人です"
  end
  "未成年です"
end

puts check_age(20)
puts check_age(15)`,
        file: 'chapter7/method_return.rb',
        terminal: 'docker compose run --rm app ruby chapter7/method_return.rb',
        output: `8
成人です
未成年です`,
        explanation:
          'Rubyのメソッドは最後の行の値が自動的に返り値になる。returnを明示的に書くと途中で値を返してメソッドを終了できる。',
      },
      {
        number: 8,
        title: '変数のスコープ',
        code: `def greet
  message = "Hello, Ruby!"
  puts message
end

greet
# puts message  # ← これはエラーになる！`,
        file: 'chapter7/scope.rb',
        terminal: 'docker compose run --rm app ruby chapter7/scope.rb',
        output: 'Hello, Ruby!',
        explanation:
          'メソッド内で定義した変数（ローカル変数）はそのメソッド内でのみ有効。メソッドの外からは参照できない。これを「スコープ」という。',
      },
      {
        number: 9,
        title: 'スコープエラーの確認',
        code: `def greet
  message = "Hello, Ruby!"
  puts message
end

greet
puts message`,
        file: 'chapter7/scope_error.rb',
        terminal: 'docker compose run --rm app ruby chapter7/scope_error.rb',
        output: `Hello, Ruby!
chapter7/scope_error.rb:7:in \`<main>': undefined local variable or method \`message' for main (NameError)`,
        explanation:
          'メソッド外からmessageを参照するとNameErrorが発生する。ローカル変数はメソッド内だけの「一時的な入れ物」。外で使いたい場合は戻り値として返す。',
      },
    ],
  },
  8: {
    title: 'Chapter 8',
    subtitle: 'クラスについて',
    steps: [
      {
        number: 1,
        title: 'クラスの定義とインスタンス',
        code: `class Person
end

person = Person.new
p person`,
        file: 'chapter8/class_example.rb',
        terminal: 'docker compose run --rm app ruby chapter8/class_example.rb',
        output: '#<Person:0x00007f1338d44520>',
        explanation:
          'クラスはオブジェクトの設計図。class クラス名 〜 end で定義（クラス名は大文字で始める）。Person.new でインスタンス（実体）を生成する。',
      },
      {
        number: 2,
        title: 'クラスにメソッドを定義',
        code: `class Person
  def greet
    "Hello!"
  end
end

person = Person.new
puts person.greet`,
        file: 'chapter8/class_with_method.rb',
        terminal: 'docker compose run --rm app ruby chapter8/class_with_method.rb',
        output: 'Hello!',
        explanation:
          'クラスの中にメソッドを定義すると、インスタンスからそのメソッドを呼び出せる。person.greet でgreetメソッドを実行。',
      },
      {
        number: 3,
        title: 'initializeメソッド（初期化）',
        code: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def info
    "#{@name}, #{@age}歳"
  end
end

person = Person.new("太郎", 30)
p person
puts person.info`,
        file: 'chapter8/initialize_example.rb',
        terminal: 'docker compose run --rm app ruby chapter8/initialize_example.rb',
        output: `#<Person:0x00007f28e87c4300 @name="太郎", @age=30>
太郎, 30歳`,
        explanation:
          'initializeはインスタンス生成時に自動で呼ばれる特別なメソッド。Person.newの引数がそのままinitializeの引数に渡される。@name, @ageはインスタンス変数。',
      },
      {
        number: 4,
        title: 'インスタンス変数 vs ローカル変数',
        code: `class Person
  def initialize(name, age)
    @name = name
    @age = age
    country = "Japan"  # ← ローカル変数
  end

  def info
    # @name, @age は使えるが、country は使えない！
    "#{@name}, #{@age}歳"
    # "#{country}出身" ← これはNameError
  end
end

person = Person.new("太郎", 30)
puts person.info`,
        file: 'chapter8/instance_variable.rb',
        terminal: 'docker compose run --rm app ruby chapter8/instance_variable.rb',
        output: '太郎, 30歳',
        explanation:
          'インスタンス変数（@付き）はクラス内のどのメソッドからでも参照可能。ローカル変数（@なし）はそのメソッド内だけで有効。メソッド間でデータを共有するには@を付ける。',
      },
      {
        number: 5,
        title: 'ゲッターとセッター（手動定義）',
        code: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  # ゲッター（値を読む）
  def name
    @name
  end

  def age
    @age
  end

  # セッター（値を変更する）
  def name=(name)
    @name = name
  end
end

person = Person.new("太郎", 30)
puts person.name
puts person.age
person.name = "花子"
puts person.name`,
        file: 'chapter8/getter_setter.rb',
        terminal: 'docker compose run --rm app ruby chapter8/getter_setter.rb',
        output: `太郎
30
花子`,
        explanation:
          'ゲッターはインスタンス変数の値を外部から読むメソッド。セッターは外部から値を変更するメソッド（name= のように定義）。次のステップでもっと簡単な書き方を学ぶ。',
      },
      {
        number: 6,
        title: 'attr_accessor（ゲッター/セッターの省略形）',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

person = Person.new("太郎", 30)
puts person.name
puts person.age
person.name = "花子"
person.age = 25
puts person.name
puts person.age`,
        file: 'chapter8/attr_accessor_example.rb',
        terminal: 'docker compose run --rm app ruby chapter8/attr_accessor_example.rb',
        output: `太郎
30
花子
25`,
        explanation:
          'attr_accessorでゲッターとセッターを一行で定義できる。attr_reader（読み取りのみ）、attr_writer（書き込みのみ）もある。',
      },
      {
        number: 7,
        title: 'インスタンスメソッド',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce_text
    "私の名前は#{name}です。#{age}才です"
  end
end

tarou = Person.new("太郎", 30)
puts tarou.introduce_text

hanako = Person.new("花子", 25)
puts hanako.introduce_text`,
        file: 'chapter8/instance_method.rb',
        terminal: 'docker compose run --rm app ruby chapter8/instance_method.rb',
        output: `私の名前は太郎です。30才です
私の名前は花子です。25才です`,
        explanation:
          'インスタンスメソッドはインスタンスごとに異なる動作ができる。同じintroduce_textメソッドでも、太郎と花子で違う内容が表示される。',
      },
      {
        number: 8,
        title: 'クラスメソッド（self.）',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce_text
    "私の名前は#{name}です。#{age}才です"
  end

  def self.adulthood_age_text
    "成人年齢は18才です"
  end
end

# クラスメソッドはクラスから直接呼ぶ
puts Person.adulthood_age_text

# インスタンスメソッドはインスタンスから呼ぶ
person = Person.new("太郎", 30)
puts person.introduce_text`,
        file: 'chapter8/class_method.rb',
        terminal: 'docker compose run --rm app ruby chapter8/class_method.rb',
        output: `成人年齢は18才です
私の名前は太郎です。30才です`,
        explanation:
          'クラスメソッドは self. を付けて定義。クラス自体から呼ぶ（Person.メソッド名）。インスタンスに依存しない共通の処理に使う。インスタンスからは呼べない。',
      },
      {
        number: 9,
        title: 'privateメソッド',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce_text
    "私の名前は#{name}です。#{age}才です。私の秘密は#{secret}です。"
  end

  private

  def secret
    '内緒'
  end
end

person = Person.new("太郎", 30)
puts person.introduce_text
# puts person.secret  # ← これはNoMethodError！`,
        file: 'chapter8/private_method.rb',
        terminal: 'docker compose run --rm app ruby chapter8/private_method.rb',
        output: '私の名前は太郎です。30才です。私の秘密は内緒です。',
        explanation:
          'private以降に定義したメソッドはクラス内部からのみ呼び出し可能。外部から直接呼ぶとNoMethodError。補助的な処理や公開したくないメソッドに使う。',
      },
      {
        number: 10,
        title: 'クラスの継承',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce_text
    "私の名前は#{name}です。#{age}才です。"
  end
end

class Employee < Person
  def job_text
    "私は社員です。"
  end
end

employee = Employee.new("太郎", 30)
puts employee.introduce_text
puts employee.job_text`,
        file: 'chapter8/inheritance_example.rb',
        terminal: 'docker compose run --rm app ruby chapter8/inheritance_example.rb',
        output: `私の名前は太郎です。30才です。
私は社員です。`,
        explanation:
          'class Employee < Person で継承。子クラスは親クラスの属性・メソッドを引き継ぎつつ、新しいメソッドを追加できる。コードの再利用に有用。',
      },
    ],
  },
  9: {
    title: 'Chapter 9',
    subtitle: 'モジュールについて',
    steps: [
      {
        number: 1,
        title: 'モジュールとは',
        code: `# モジュールの定義
module Greeting
  def hello
    "Hello!"
  end

  def goodbye
    "Goodbye!"
  end
end

# モジュールはインスタンスを作れない（クラスとの違い）
# Greeting.new  # ← これはNoMethodError！
puts "モジュールは共通メソッドをまとめる仕組み"`,
        file: 'chapter9/module_basic.rb',
        terminal: 'docker compose run --rm app ruby chapter9/module_basic.rb',
        output: 'モジュールは共通メソッドをまとめる仕組み',
        explanation:
          'モジュールはメソッドや定数をまとめる仕組み。クラスとの違いは「インスタンスを作れない」「継承できない」こと。複数のクラスで共通の機能を使い回すのに便利。',
      },
      {
        number: 2,
        title: 'include（インスタンスメソッドとして取り込む）',
        code: `module Greeting
  def hello
    "Hello!"
  end
end

class Person
  include Greeting

  def initialize(name, age)
    @name = name
    @age = age
  end
end

person = Person.new("太郎", 30)
puts person.hello`,
        file: 'chapter9/module_include.rb',
        terminal: 'docker compose run --rm app ruby chapter9/module_include.rb',
        output: 'Hello!',
        explanation:
          'includeでモジュールをクラスに取り込むと、インスタンスメソッドとして使える。person.hello のようにインスタンスから呼び出す。',
      },
      {
        number: 3,
        title: 'extend（クラスメソッドとして取り込む）',
        code: `module Greeting
  def hello
    "Hello!"
  end
end

class Person
  extend Greeting
end

# クラスから直接呼ぶ
puts Person.hello

# person = Person.new
# person.hello  # ← これはNoMethodError！`,
        file: 'chapter9/module_extend.rb',
        terminal: 'docker compose run --rm app ruby chapter9/module_extend.rb',
        output: 'Hello!',
        explanation:
          'extendで取り込むとクラスメソッドになる。include → インスタンスから呼ぶ（person.hello）、extend → クラスから呼ぶ（Person.hello）。',
      },
      {
        number: 4,
        title: 'モジュールの定数',
        code: `module Greeting
  HELLO = "Hello!"
end

class Person
  include Greeting

  def hello
    HELLO
  end
end

person = Person.new
puts person.hello
puts Greeting::HELLO`,
        file: 'chapter9/module_constant.rb',
        terminal: 'docker compose run --rm app ruby chapter9/module_constant.rb',
        output: `Hello!
Hello!`,
        explanation:
          'モジュールに定数も定義できる。定数は大文字で始める。モジュール名::定数名（Greeting::HELLO）で直接アクセスも可能。includeしたクラス内からも参照できる。',
      },
      {
        number: 5,
        title: 'includeとextendの使い分け',
        code: `module Printable
  def print_info
    "情報を表示します"
  end
end

class Report
  include Printable  # インスタンスメソッドとして使う
end

class Logger
  extend Printable   # クラスメソッドとして使う
end

# includeの場合 → インスタンスから呼ぶ
report = Report.new
puts report.print_info

# extendの場合 → クラスから呼ぶ
puts Logger.print_info`,
        file: 'chapter9/include_vs_extend.rb',
        terminal: 'docker compose run --rm app ruby chapter9/include_vs_extend.rb',
        output: `情報を表示します
情報を表示します`,
        explanation:
          'include: 各インスタンスごとに使いたい機能に。extend: クラス全体で共通の機能に。同じモジュールでも取り込み方で呼び出し方が変わる。',
      },
    ],
  },
  10: {
    title: 'Chapter 10',
    subtitle: 'Rubyを使った複雑な操作(1)',
    steps: [
      {
        number: 1,
        title: 'リクエストとレスポンスの基本',
        code: `# HTTP通信の基本概念をRubyで確認
puts "=== HTTPリクエスト ==="
puts "クライアント(ブラウザ) → サーバー"
puts "  HTTPメソッド: GET, POST, PUT, DELETE"
puts "  URL: http://www.example.com"
puts ""
puts "=== HTTPレスポンス ==="
puts "サーバー → クライアント"
puts "  ステータスコード: 200(成功), 404(未発見), 500(サーバーエラー)"
puts "  ボディ: HTML, JSON などのデータ"`,
        file: 'chapter10/http_concept.rb',
        terminal: 'docker compose run --rm app ruby chapter10/http_concept.rb',
        output: `=== HTTPリクエスト ===
クライアント(ブラウザ) → サーバー
  HTTPメソッド: GET, POST, PUT, DELETE
  URL: http://www.example.com

=== HTTPレスポンス ===
サーバー → クライアント
  ステータスコード: 200(成功), 404(未発見), 500(サーバーエラー)
  ボディ: HTML, JSON などのデータ`,
        explanation:
          'Web通信の基本はリクエスト（要求）とレスポンス（応答）。ブラウザがサーバーにリクエストを送り、サーバーがレスポンスを返す。この仕組みでWebページやAPIが動いている。',
      },
      {
        number: 2,
        title: 'HTTP通信（Net::HTTP）',
        code: `require 'net/http'
require 'uri'

uri = URI.parse("http://www.example.com")
response = Net::HTTP.get_response(uri)

puts "ステータスコード: #{response.code}"
puts "レスポンスボディ（最初の100文字）:"
puts response.body[0..100]`,
        file: 'chapter10/http.rb',
        terminal: 'docker compose run --rm app ruby chapter10/http.rb',
        output: `ステータスコード: 200
レスポンスボディ（最初の100文字）:
<!doctype html>
<html>
<head>
    <title>Example Domain</title>...`,
        explanation:
          'Net::HTTPでHTTP通信ができる。requireで外部ライブラリを読み込む。URI.parseでURLを解析、Net::HTTP.get_responseでGETリクエストを送る。response.codeでステータスコード、response.bodyでHTMLの中身を取得。',
      },
      {
        number: 3,
        title: '例外処理（begin / rescue）',
        code: `# rescueなしだとプログラムが止まる
# 1 / 0  # ← ZeroDivisionError!

# begin〜rescueでエラーをキャッチ
begin
  1 / 0
rescue ZeroDivisionError => e
  puts "エラーをキャッチ: #{e.message}"
end

puts "プログラムは続行します"`,
        file: 'chapter10/exception.rb',
        terminal: 'docker compose run --rm app ruby chapter10/exception.rb',
        output: `エラーをキャッチ: divided by 0
プログラムは続行します`,
        explanation:
          'begin〜rescueでエラー（例外）をキャッチして処理できる。rescueがないとプログラムが止まるが、rescueがあれば続行できる。=> eでエラーオブジェクトを受け取り、e.messageでエラー内容を取得。',
      },
      {
        number: 4,
        title: 'ensure（必ず実行する処理）',
        code: `begin
  puts "処理を開始"
  1 / 0
rescue ZeroDivisionError => e
  puts "エラー: #{e.message}"
ensure
  puts "ensureは必ず実行される（後片付け用）"
end`,
        file: 'chapter10/ensure.rb',
        terminal: 'docker compose run --rm app ruby chapter10/ensure.rb',
        output: `処理を開始
エラー: divided by 0
ensureは必ず実行される（後片付け用）`,
        explanation:
          'ensureブロックはエラーの有無に関わらず必ず実行される。ファイルを閉じる、接続を切断するなど「後片付け」処理に使う。',
      },
      {
        number: 5,
        title: 'JSONとは',
        code: `require 'json'

# JSON文字列 → Rubyのハッシュ/配列に変換
json_string = '{"name": "John", "age": 30, "active": false, "courses": ["Math", "Science", "History"]}'
data = JSON.parse(json_string)

puts data["name"]
puts data["age"]
puts data["active"]
puts data["courses"]
p data["courses"]`,
        file: 'chapter10/json.rb',
        terminal: 'docker compose run --rm app ruby chapter10/json.rb',
        output: `John
30
false
Math
Science
History
["Math", "Science", "History"]`,
        explanation:
          'JSON（JavaScript Object Notation）はデータ交換フォーマット。JSON.parseでJSON文字列をRubyのハッシュ/配列に変換。putsで配列を表示すると1要素ずつ、pで表示すると配列のまま。',
      },
      {
        number: 6,
        title: 'RubyのハッシュをJSONに変換',
        code: `require 'json'

# Rubyのハッシュ → JSON文字列に変換
user = { name: "太郎", age: 30, hobbies: ["Ruby", "Rails"] }

json_output = JSON.generate(user)
puts json_output

# 見やすく整形して出力
puts JSON.pretty_generate(user)`,
        file: 'chapter10/json_generate.rb',
        terminal: 'docker compose run --rm app ruby chapter10/json_generate.rb',
        output: `{"name":"太郎","age":30,"hobbies":["Ruby","Rails"]}
{
  "name": "太郎",
  "age": 30,
  "hobbies": [
    "Ruby",
    "Rails"
  ]
}`,
        explanation:
          'JSON.generateでRubyのハッシュをJSON文字列に変換。JSON.pretty_generateで改行・インデント付きの見やすいJSONを出力。APIにデータを送るときに使う。',
      },
    ],
  },
  11: {
    title: 'Chapter 11',
    subtitle: 'Rubyを使った複雑な操作(2)',
    steps: [
      {
        number: 1,
        title: '例外の種類',
        code: `# よくある例外の一覧を確認する
puts "=== よくある例外 ==="
puts "NoMethodError:   存在しないメソッドを呼んだ"
puts "NameError:       未定義の変数やメソッドを参照した"
puts "TypeError:       型が合わない操作をした"
puts "ArgumentError:   引数の数が違う"
puts "ZeroDivisionError: 0で割った"
puts "SyntaxError:     文法が間違っている"
puts ""

# TypeErrorの例
begin
  puts "String" + 1
rescue TypeError => e
  puts "TypeErrorの例: #{e.message}"
end`,
        file: 'chapter11/exception_types.rb',
        terminal: 'docker compose run --rm app ruby chapter11/exception_types.rb',
        output: `=== よくある例外 ===
NoMethodError:   存在しないメソッドを呼んだ
NameError:       未定義の変数やメソッドを参照した
TypeError:       型が合わない操作をした
ArgumentError:   引数の数が違う
ZeroDivisionError: 0で割った
SyntaxError:     文法が間違っている

TypeErrorの例: no implicit conversion of Integer into String`,
        explanation:
          'Rubyにはさまざまな例外がある。NoMethodError（メソッドがない）、TypeError（型の不一致）、ZeroDivisionError（0割り）などが頻出。エラーメッセージを読んで原因を特定するのが重要。',
      },
      {
        number: 2,
        title: '例外処理（begin / rescue / ensure）',
        code: `# 複数の例外をキャッチする
begin
  puts "処理開始"
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "0で割りました: #{e.message}"
rescue TypeError => e
  puts "型エラー: #{e.message}"
ensure
  puts "ensureは必ず実行される"
end

puts "プログラムは続行"`,
        file: 'chapter11/exception_handling.rb',
        terminal: 'docker compose run --rm app ruby chapter11/exception_handling.rb',
        output: `処理開始
0で割りました: divided by 0
ensureは必ず実行される
プログラムは続行`,
        explanation:
          'rescueを複数書いて例外の種類ごとに処理を分けられる。ensureは成功でも失敗でも必ず実行される。10章で学んだ基本の応用編。',
      },
      {
        number: 3,
        title: '正規表現の基本',
        code: `# 正規表現は /パターン/ で書く
puts "=== 基本パターン ==="
puts "hello" =~ /hello/ ? "マッチ" : "不一致"
puts "hello" =~ /world/ ? "マッチ" : "不一致"

puts ""
puts "=== よく使う記号 ==="
puts "  .  → 任意の1文字"
puts "  *  → 0回以上の繰り返し"
puts "  +  → 1回以上の繰り返し"
puts "  ?  → 0回か1回"
puts "  [] → いずれか1文字"
puts "  ^  → 行頭"
puts '  $  → 行末'`,
        file: 'chapter11/regex_basic.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_basic.rb',
        output: `=== 基本パターン ===
マッチ
不一致

=== よく使う記号 ===
  .  → 任意の1文字
  *  → 0回以上の繰り返し
  +  → 1回以上の繰り返し
  ?  → 0回か1回
  [] → いずれか1文字
  ^  → 行頭
  $  → 行末`,
        explanation:
          '正規表現は文字列のパターンを表す記法。/パターン/ で定義。=~ 演算子でマッチするか確認できる（マッチすればマッチ位置、しなければnil）。',
      },
      {
        number: 4,
        title: '正規表現（matchメソッド）',
        code: `pattern = /Ruby/

result1 = "I love Ruby".match(pattern)
puts result1

result2 = "I love Python".match(pattern)
puts result2.nil? ? "マッチしない" : result2`,
        file: 'chapter11/regex_match.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_match.rb',
        output: `Ruby
マッチしない`,
        explanation:
          'matchメソッドはパターンに一致する最初の部分を返す。マッチしなければnilを返す。文字列の中に特定のパターンが含まれるか確認するのに使う。',
      },
      {
        number: 5,
        title: '正規表現（scanメソッド）',
        code: `# scanは全てのマッチを配列で返す
p "Ruby".scan(/Ruby/)
p "Ruby Ruby Ruby".scan(/Ruby/)

# 数字を全て抽出
p "電話番号は090-1234-5678です".scan(/[0-9]+/)`,
        file: 'chapter11/regex_scan.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_scan.rb',
        output: `["Ruby"]
["Ruby", "Ruby", "Ruby"]
["090", "1234", "5678"]`,
        explanation:
          'scanはパターンに一致する部分を全て配列で返す。matchは最初の1つだけだが、scanは全部。[0-9]+ は「1文字以上の数字の連続」を意味する。',
      },
      {
        number: 6,
        title: '正規表現（gsubメソッド）',
        code: `# gsubは全てのマッチを置換
p "Ruby".gsub(/Ruby/, "Python")
p "Ruby Ruby".gsub(/Ruby/, "Python")

# subは最初の1つだけ置換
p "Ruby Ruby".sub(/Ruby/, "Python")

# 実践例：電話番号のハイフンを除去
phone = "090-1234-5678"
p phone.gsub(/-/, "")`,
        file: 'chapter11/regex_gsub.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_gsub.rb',
        output: `"Python"
"Python Python"
"Python Ruby"
"09012345678"`,
        explanation:
          'gsubはパターンに一致する部分を全て別の文字列に置換する。gはglobal（全部）の意味。subは最初の1つだけ置換。データの整形やクリーニングに便利。',
      },
      {
        number: 7,
        title: '正規表現の実践パターン',
        code: `email = "test@example.com"
phone = "090-1234-5678"
url = "https://www.runteq.jp"

# メールアドレスのチェック
puts email.match?(/\\A[\\w+\\-.]+@[a-z\\d\\-.]+\\.[a-z]+\\z/i) ? "メール: OK" : "メール: NG"

# 電話番号のチェック（ハイフン付き）
puts phone.match?(/\\A\\d{2,4}-\\d{2,4}-\\d{4}\\z/) ? "電話番号: OK" : "電話番号: NG"

# URLのチェック
puts url.match?(/\\Ahttps?:\\/\\//) ? "URL: OK" : "URL: NG"`,
        file: 'chapter11/regex_practical.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_practical.rb',
        output: `メール: OK
電話番号: OK
URL: OK`,
        explanation:
          'match?はtrue/falseを返す（matchと違いMatchDataを返さないので軽い）。\\Aは文字列の先頭、\\zは文字列の末尾。実務ではバリデーション（入力値の検証）に正規表現を使う。',
      },
    ],
  },
};
