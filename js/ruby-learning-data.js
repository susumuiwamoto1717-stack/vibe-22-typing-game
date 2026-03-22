// RUNTEQ Ruby学習モード データ（シンプル版：各章2-3ステップ、コードのみ）
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
        title: 'Hello World',
        code: `puts 'hello world'`,
        file: 'chapter1/hello_world.rb',
        terminal: 'docker compose run --rm app ruby chapter1/hello_world.rb',
        output: 'hello world',
        explanation:
          'putsは文字列を出力するメソッド。.rbがRubyファイルの拡張子。',
      },
      {
        number: 2,
        title: 'puts / print / p',
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
          'puts: 改行付き表示。print: 改行なし。p: 型がわかる形で表示（デバッグ向き）。',
      },
    ],
  },
  2: {
    title: 'Chapter 2',
    subtitle: 'Rubyを使った簡単なプログラムの作成',
    steps: [
      {
        number: 1,
        title: 'variables and interpolation',
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
          '#{変数名}で文字列に変数の値を埋め込める（式展開）。ダブルクォーテーションでのみ有効。',
      },
      {
        number: 2,
        title: 'type conversion',
        code: `puts "10".to_i
puts "10".to_f
puts 10.to_s
puts 10.to_f
puts "10" + 10.to_s`,
        file: 'chapter2/type_convert.rb',
        terminal: 'docker compose run --rm app ruby chapter2/type_convert.rb',
        output: `10
10.0
10
10.0
1010`,
        explanation:
          '.to_iは整数に、.to_fは小数に、.to_sは文字列に変換。型を揃えないとTypeErrorになる。',
      },
      {
        number: 3,
        title: 'string methods',
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
          '.upcase大文字化、.downcase小文字化、.length文字数、.include?含むか、.reverse逆順、.strip空白除去。',
      },
    ],
  },
  3: {
    title: 'Chapter 3',
    subtitle: 'プログラムを制御する',
    steps: [
      {
        number: 1,
        title: 'if / elsif / else',
        code: `number = 5

if number > 5
  puts "greater than 5"
elsif number == 5
  puts "equal to 5"
else
  puts "less than 5"
end`,
        file: 'chapter3/basic_conditional.rb',
        terminal: 'docker compose run --rm app ruby chapter3/basic_conditional.rb',
        output: 'equal to 5',
        explanation:
          'if文で条件分岐。=は代入、==は比較。elsifで複数条件、elseでそれ以外。',
      },
      {
        number: 2,
        title: 'while loop',
        code: `i = 1

while i <= 5
  puts "Round #{i}"
  i += 1
end`,
        file: 'chapter3/while_loop.rb',
        terminal: 'docker compose run --rm app ruby chapter3/while_loop.rb',
        output: `Round 1
Round 2
Round 3
Round 4
Round 5`,
        explanation:
          'while 条件 → trueの間ずっと繰り返す。i += 1を忘れると無限ループになる。',
      },
      {
        number: 3,
        title: 'each loop',
        code: `(1..5).each do |i|
  puts "Round #{i}"
end`,
        file: 'chapter3/each_loop.rb',
        terminal: 'docker compose run --rm app ruby chapter3/each_loop.rb',
        output: `Round 1
Round 2
Round 3
Round 4
Round 5`,
        explanation:
          '(1..5)は「1から5までの範囲」。eachは各要素を|i|に入れて処理する。Rubyで一番よく使う繰り返し。',
      },
    ],
  },
  4: {
    title: 'Chapter 4',
    subtitle: '配列の基本',
    steps: [
      {
        number: 1,
        title: 'array and index',
        code: `fruits = ["apple", "banana", "cherry"]
p fruits
puts fruits[0]
puts fruits[1]
puts fruits[-1]`,
        file: 'chapter4/array_index.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_index.rb',
        output: `["apple", "banana", "cherry"]
apple
banana
cherry`,
        explanation:
          '配列は[]で作る。インデックスは0から始まる。-1は最後の要素。',
      },
      {
        number: 2,
        title: 'push / pop / shift',
        code: `fruits = ["apple", "banana"]

fruits.push("cherry")
p fruits

fruits << "date"
p fruits

fruits.pop
p fruits

fruits.shift
p fruits`,
        file: 'chapter4/array_push_pop.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_push_pop.rb',
        output: `["apple", "banana", "cherry"]
["apple", "banana", "cherry", "date"]
["apple", "banana", "cherry"]
["banana", "cherry"]`,
        explanation:
          'push/<<は末尾に追加、popは末尾を削除、shiftは先頭を削除。',
      },
      {
        number: 3,
        title: 'each with array',
        code: `fruits = ["apple", "banana", "cherry"]
fruits.each do |fruit|
  puts fruit
end

fruits.each_with_index do |fruit, index|
  puts "#{index}: #{fruit}"
end`,
        file: 'chapter4/array_each.rb',
        terminal: 'docker compose run --rm app ruby chapter4/array_each.rb',
        output: `apple
banana
cherry
0: apple
1: banana
2: cherry`,
        explanation:
          'each do |変数| で各要素を処理する。each_with_indexでインデックスも同時に取得。',
      },
    ],
  },
  5: {
    title: 'Chapter 5',
    subtitle: '配列を操作する',
    steps: [
      {
        number: 1,
        title: 'map',
        code: `numbers = [1, 2, 3, 4, 5]
doubled = numbers.map { |n| n * 2 }
p doubled

squared = numbers.map { |n| n ** 2 }
p squared`,
        file: 'chapter5/map_example.rb',
        terminal: 'docker compose run --rm app ruby chapter5/map_example.rb',
        output: `[2, 4, 6, 8, 10]
[1, 4, 9, 16, 25]`,
        explanation:
          'mapは各要素に処理を適用した新しい配列を作る。{ |n| n * 2 }がブロック。',
      },
      {
        number: 2,
        title: 'select / reject',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even = numbers.select { |n| n.even? }
p even

odd = numbers.reject { |n| n.even? }
p odd`,
        file: 'chapter5/select_reject.rb',
        terminal: 'docker compose run --rm app ruby chapter5/select_reject.rb',
        output: `[2, 4, 6, 8, 10]
[1, 3, 5, 7, 9]`,
        explanation:
          'selectは条件がtrueの要素を集める。rejectはselectの逆で条件に合うものを除外する。',
      },
      {
        number: 3,
        title: 'sort / uniq / include?',
        code: `numbers = [5, 3, 8, 1, 2, 7, 4, 6]
p numbers.sort
p numbers.sort.reverse

dupes = [1, 2, 2, 3, 3, 3]
p dupes.uniq

puts [1, 2, 3].include?(2)
puts [1, 2, 3].include?(5)`,
        file: 'chapter5/sort_uniq.rb',
        terminal: 'docker compose run --rm app ruby chapter5/sort_uniq.rb',
        output: `[1, 2, 3, 4, 5, 6, 7, 8]
[8, 7, 6, 5, 4, 3, 2, 1]
[1, 2, 3]
true
false`,
        explanation:
          'sortは昇順、sort.reverseは降順。uniqは重複除去。include?は要素の存在確認。',
      },
    ],
  },
  6: {
    title: 'Chapter 6',
    subtitle: 'Hashの基本',
    steps: [
      {
        number: 1,
        title: 'hash creation and access',
        code: `hash1 = { name: "Alice", age: 30, city: "Wonderland" }
puts hash1[:name]
puts hash1[:age]

hash2 = { "name" => "Alice", "age" => 30 }
puts hash2["name"]`,
        file: 'chapter6/basic_hash.rb',
        terminal: 'docker compose run --rm app ruby chapter6/basic_hash.rb',
        output: `Alice
30
Alice`,
        explanation:
          'Hashはキーと値のペア。シンボルキーは hash[:key]、文字列キーは hash["key"]でアクセス。',
      },
      {
        number: 2,
        title: 'hash update and delete',
        code: `person = { name: "Taro", age: 30 }
p person

person[:city] = "Tokyo"
person[:age] = 31
p person

person.delete(:city)
p person`,
        file: 'chapter6/hash_update.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_update.rb',
        output: `{:name=>"Taro", :age=>30}
{:name=>"Taro", :age=>31, :city=>"Tokyo"}
{:name=>"Taro", :age=>31}`,
        explanation:
          'hash[:key] = valueで追加・変更。deleteで要素を削除。',
      },
      {
        number: 3,
        title: 'hash each and array of hashes',
        code: `person = { name: "Taro", age: 30, city: "Tokyo" }

person.each do |key, value|
  puts "#{key}: #{value}"
end

users = [
  { name: "Taro", age: 30 },
  { name: "Hanako", age: 25 }
]

users.each do |user|
  puts "#{user[:name]} (age #{user[:age]})"
end`,
        file: 'chapter6/hash_each.rb',
        terminal: 'docker compose run --rm app ruby chapter6/hash_each.rb',
        output: `name: Taro
age: 30
city: Tokyo
Taro (age 30)
Hanako (age 25)`,
        explanation:
          'Hash.each do |key, value|でキーと値をループ。Hashの配列は実務で頻出パターン。',
      },
    ],
  },
  7: {
    title: 'Chapter 7',
    subtitle: 'メソッドについて',
    steps: [
      {
        number: 1,
        title: 'def and arguments',
        code: `def greet(name)
  puts "Hello, #{name}!"
end

greet("Alice")
greet("Bob")

def greet_default(name = "Guest")
  puts "Hello, #{name}!"
end

greet_default("Alice")
greet_default`,
        file: 'chapter7/method_args.rb',
        terminal: 'docker compose run --rm app ruby chapter7/method_args.rb',
        output: `Hello, Alice!
Hello, Bob!
Hello, Alice!
Hello, Guest!`,
        explanation:
          'defでメソッドを定義。引数にデフォルト値を設定できる。',
      },
      {
        number: 2,
        title: 'keyword arguments',
        code: `def greet(name:, age:)
  puts "Hello, I am #{name}!"
  puts "I am #{age} years old."
end

greet(age: 20, name: "Alice")`,
        file: 'chapter7/keyword_args.rb',
        terminal: 'docker compose run --rm app ruby chapter7/keyword_args.rb',
        output: `Hello, I am Alice!
I am 20 years old.`,
        explanation:
          'キーワード引数は引数名を指定して渡す。順番を気にしなくてよいのがメリット。',
      },
      {
        number: 3,
        title: 'return value',
        code: `def add(a, b)
  a + b
end

result = add(3, 5)
puts result

def check_age(age)
  if age >= 18
    return "Adult"
  end
  "Minor"
end

puts check_age(20)
puts check_age(15)`,
        file: 'chapter7/method_return.rb',
        terminal: 'docker compose run --rm app ruby chapter7/method_return.rb',
        output: `8
Adult
Minor`,
        explanation:
          'Rubyでは最後の行の値が自動的に返り値になる。returnで途中で値を返すこともできる。',
      },
    ],
  },
  8: {
    title: 'Chapter 8',
    subtitle: 'クラスについて',
    steps: [
      {
        number: 1,
        title: 'class and initialize',
        code: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def info
    "#{@name}, age #{@age}"
  end
end

person = Person.new("Taro", 30)
puts person.info`,
        file: 'chapter8/initialize_example.rb',
        terminal: 'docker compose run --rm app ruby chapter8/initialize_example.rb',
        output: 'Taro, age 30',
        explanation:
          'classで定義、initializeは生成時に自動で呼ばれる。@nameはインスタンス変数。',
      },
      {
        number: 2,
        title: 'attr_accessor',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

person = Person.new("Taro", 30)
puts person.name
puts person.age
person.name = "Hanako"
person.age = 25
puts person.name
puts person.age`,
        file: 'chapter8/attr_accessor.rb',
        terminal: 'docker compose run --rm app ruby chapter8/attr_accessor.rb',
        output: `Taro
30
Hanako
25`,
        explanation:
          'attr_accessorでゲッターとセッターを一行で定義。attr_readerは読み取りのみ。',
      },
      {
        number: 3,
        title: 'inheritance and private',
        code: `class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce
    "My name is #{name}. #{secret}"
  end

  private

  def secret
    "classified"
  end
end

class Employee < Person
  def job
    "I am an employee."
  end
end

emp = Employee.new("Taro", 30)
puts emp.introduce
puts emp.job`,
        file: 'chapter8/inheritance.rb',
        terminal: 'docker compose run --rm app ruby chapter8/inheritance.rb',
        output: `My name is Taro. classified
I am an employee.`,
        explanation:
          'class Child < Parentで継承。privateメソッドはクラス内部からのみ呼び出し可能。',
      },
    ],
  },
  9: {
    title: 'Chapter 9',
    subtitle: 'モジュールについて',
    steps: [
      {
        number: 1,
        title: 'module and include',
        code: `module Greeting
  def hello
    "Hello!"
  end
end

class Person
  include Greeting

  def initialize(name)
    @name = name
  end
end

person = Person.new("Taro")
puts person.hello`,
        file: 'chapter9/module_include.rb',
        terminal: 'docker compose run --rm app ruby chapter9/module_include.rb',
        output: 'Hello!',
        explanation:
          'moduleはメソッドをまとめる仕組み。includeでクラスに取り込むとインスタンスメソッドとして使える。',
      },
      {
        number: 2,
        title: 'extend and constants',
        code: `module Greeting
  HELLO = "Hello!"

  def hello
    HELLO
  end
end

class Person
  extend Greeting
end

puts Person.hello
puts Greeting::HELLO`,
        file: 'chapter9/extend_const.rb',
        terminal: 'docker compose run --rm app ruby chapter9/extend_const.rb',
        output: `Hello!
Hello!`,
        explanation:
          'extendはクラスメソッドとして取り込む。定数はモジュール名::定数名でアクセス。',
      },
    ],
  },
  10: {
    title: 'Chapter 10',
    subtitle: 'Rubyを使った複雑な操作(1)',
    steps: [
      {
        number: 1,
        title: 'begin / rescue / ensure',
        code: `begin
  1 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
ensure
  puts "ensure always runs"
end

puts "Program continues"`,
        file: 'chapter10/exception.rb',
        terminal: 'docker compose run --rm app ruby chapter10/exception.rb',
        output: `Error: divided by 0
ensure always runs
Program continues`,
        explanation:
          'begin~rescueでエラーをキャッチ。ensureは成功でも失敗でも必ず実行される。',
      },
      {
        number: 2,
        title: 'JSON parse and generate',
        code: `require 'json'

json_string = '{"name": "John", "age": 30}'
data = JSON.parse(json_string)
puts data["name"]
puts data["age"]

user = { name: "Taro", age: 30, hobbies: ["Ruby", "Rails"] }
puts JSON.generate(user)
puts JSON.pretty_generate(user)`,
        file: 'chapter10/json.rb',
        terminal: 'docker compose run --rm app ruby chapter10/json.rb',
        output: `John
30
{"name":"Taro","age":30,"hobbies":["Ruby","Rails"]}
{
  "name": "Taro",
  "age": 30,
  "hobbies": [
    "Ruby",
    "Rails"
  ]
}`,
        explanation:
          'JSON.parseでJSON文字列をRubyハッシュに変換。JSON.generateでRubyハッシュをJSONに変換。',
      },
    ],
  },
  11: {
    title: 'Chapter 11',
    subtitle: 'Rubyを使った複雑な操作(2)',
    steps: [
      {
        number: 1,
        title: 'regex match and scan',
        code: `result = "I love Ruby".match(/Ruby/)
puts result

p "Ruby Ruby Ruby".scan(/Ruby/)
p "Phone: 090-1234-5678".scan(/[0-9]+/)`,
        file: 'chapter11/regex_match.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_match.rb',
        output: `Ruby
["Ruby", "Ruby", "Ruby"]
["090", "1234", "5678"]`,
        explanation:
          'matchは最初の一致を返す。scanは全ての一致を配列で返す。',
      },
      {
        number: 2,
        title: 'gsub and sub',
        code: `p "Ruby".gsub(/Ruby/, "Python")
p "Ruby Ruby".gsub(/Ruby/, "Python")
p "Ruby Ruby".sub(/Ruby/, "Python")

phone = "090-1234-5678"
p phone.gsub(/-/, "")`,
        file: 'chapter11/regex_gsub.rb',
        terminal: 'docker compose run --rm app ruby chapter11/regex_gsub.rb',
        output: `"Python"
"Python Python"
"Python Ruby"
"09012345678"`,
        explanation:
          'gsubは全て置換、subは最初の1つだけ置換。データ整形に便利。',
      },
    ],
  },
};
