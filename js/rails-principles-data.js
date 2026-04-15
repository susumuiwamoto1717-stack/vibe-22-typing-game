// Rails基礎原則 学習モード データ
// Rails Principles: Rubyオブジェクトの基本からデータの流れまで — Ch1-8

const RAILS_PRINCIPLES_CHAPTERS = [
  {
    id: 1,
    part: 1,
    title: "Chapter 1: Ruby Object Basics (Rubyオブジェクトの基本)",
  },
  { id: 2, part: 1, title: "Chapter 2: MVC Architecture (MVCアーキテクチャ)" },
  { id: 3, part: 1, title: "Chapter 3: Routing (ルーティング)" },
  { id: 4, part: 1, title: "Chapter 4: CRUD Operations (CRUD操作)" },
  { id: 5, part: 2, title: "Chapter 5: Associations (アソシエーション)" },
  {
    id: 6,
    part: 2,
    title:
      "Chapter 6: Strong Parameters & Validation (Strong Parametersとバリデーション)",
  },
  { id: 7, part: 2, title: "Chapter 7: Data Flow (データの流れ)" },
  {
    id: 8,
    part: 2,
    title: "Chapter 8: Error Reading (エラーメッセージの読み方)",
  },
];

const RAILS_PRINCIPLES_DATA = {
  // ===== Part 1: Rails基礎原則① =====
  1: {
    title: "Chapter 1",
    subtitle: "Ruby Object Basics (Rubyオブジェクトの基本)",
    steps: [
      {
        number: 1,
        title: "Numbers are objects",
        code: `5.times { puts "Hello" }`,
        explanation: "数値もオブジェクト。5にtimesメソッドを送る",
      },
      {
        number: 2,
        title: "String methods",
        code: `"hello".upcase`,
        explanation: "文字列オブジェクトにメソッドを送る",
      },
      {
        number: 3,
        title: "Method chaining",
        code: `"hello".upcase.reverse`,
        explanation: "メソッドチェーン。返り値がオブジェクトだから可能",
      },
      {
        number: 4,
        title: "Array method chaining",
        code: `[1, 2, 3].select { |n| n.even? }.sum`,
        explanation: "配列オブジェクトのメソッドチェーン",
      },
      {
        number: 5,
        title: "Dynamic typing",
        code: `name = "Ruby"`,
        explanation: "動的型付け。型宣言なしで変数に代入",
      },
    ],
  },
  2: {
    title: "Chapter 2",
    subtitle: "MVC Architecture (MVCアーキテクチャ)",
    steps: [
      {
        number: 1,
        title: "Model definition",
        code: `class User < ApplicationRecord`,
        explanation: "Model - データベースとのやり取り",
      },
      {
        number: 2,
        title: "Controller definition",
        code: `class UsersController < ApplicationController`,
        explanation: "Controller - リクエスト制御",
      },
      {
        number: 3,
        title: "Controller index action",
        code: `def index
  @users = User.all
end`,
        explanation: "Controllerのindexアクション",
      },
      {
        number: 4,
        title: "View - iterating data",
        code: `<%= @users.each do |user| %>`,
        explanation: "View - データの表示（ERBテンプレート）",
      },
      {
        number: 5,
        title: "View - displaying data",
        code: `<%= user.name %>`,
        explanation: "Viewでモデルのデータを表示",
      },
    ],
  },
  3: {
    title: "Chapter 3",
    subtitle: "Routing (ルーティング)",
    steps: [
      {
        number: 1,
        title: "RESTful resources",
        code: `resources :users`,
        explanation: "RESTfulルーティングの一括定義",
      },
      {
        number: 2,
        title: "GET index route",
        code: `get '/users', to: 'users#index'`,
        explanation: "GET /users → UsersController#index",
      },
      {
        number: 3,
        title: "POST create route",
        code: `post '/users', to: 'users#create'`,
        explanation: "POST /users → UsersController#create",
      },
      {
        number: 4,
        title: "GET show route",
        code: `get '/users/:id', to: 'users#show'`,
        explanation: "GET /users/1 → UsersController#show",
      },
      {
        number: 5,
        title: "DELETE destroy route",
        code: `delete '/users/:id', to: 'users#destroy'`,
        explanation: "DELETE /users/1 → UsersController#destroy",
      },
    ],
  },
  4: {
    title: "Chapter 4",
    subtitle: "CRUD Operations (CRUD操作)",
    steps: [
      {
        number: 1,
        title: "Read all records",
        code: `User.all`,
        explanation: "Read - 全レコード取得",
      },
      {
        number: 2,
        title: "Read one record by ID",
        code: `User.find(params[:id])`,
        explanation: "Read - IDで1件取得",
      },
      {
        number: 3,
        title: "Create a record",
        code: `User.create(name: "Taro", age: 20)`,
        explanation: "Create - レコード作成",
      },
      {
        number: 4,
        title: "Update a record",
        code: `user.update(name: "Jiro")`,
        explanation: "Update - レコード更新",
      },
      {
        number: 5,
        title: "Delete a record",
        code: `user.destroy`,
        explanation: "Delete - レコード削除",
      },
    ],
  },

  // ===== Part 2: Rails基礎原則② =====
  5: {
    title: "Chapter 5",
    subtitle: "Associations (アソシエーション)",
    steps: [
      {
        number: 1,
        title: "has_many association",
        code: `has_many :posts`,
        explanation: "1対多の関連（Userは複数のPostを持つ）",
      },
      {
        number: 2,
        title: "belongs_to association",
        code: `belongs_to :user`,
        explanation: "多対1の関連（PostはUserに属する）",
      },
      {
        number: 3,
        title: "Accessing associated records",
        code: `user.posts`,
        explanation: "関連付けによりユーザーの投稿を取得",
      },
      {
        number: 4,
        title: "has_many through",
        code: `has_many :comments, through: :posts`,
        explanation: "has_many :throughで多対多",
      },
      {
        number: 5,
        title: "dependent destroy",
        code: `dependent: :destroy`,
        explanation: "親を削除時に子も削除",
      },
    ],
  },
  6: {
    title: "Chapter 6",
    subtitle:
      "Strong Parameters & Validation (Strong Parametersとバリデーション)",
    steps: [
      {
        number: 1,
        title: "Strong Parameters",
        code: `params.require(:user).permit(:name, :email)`,
        explanation: "Strong Parameters - 許可するパラメータを制限",
      },
      {
        number: 2,
        title: "Presence validation",
        code: `validates :name, presence: true`,
        explanation: "バリデーション - 空を禁止",
      },
      {
        number: 3,
        title: "Uniqueness validation",
        code: `validates :email, uniqueness: true`,
        explanation: "バリデーション - 一意性",
      },
      {
        number: 4,
        title: "Numericality validation",
        code: `validates :age, numericality: { greater_than: 0 }`,
        explanation: "バリデーション - 数値検証",
      },
      {
        number: 5,
        title: "Save and redirect",
        code: `if @user.save
  redirect_to @user`,
        explanation: "保存成功時のリダイレクト",
      },
    ],
  },
  7: {
    title: "Chapter 7",
    subtitle: "Data Flow (データの流れ)",
    steps: [
      {
        number: 1,
        title: "Browser request",
        code: `GET /users`,
        explanation: "ブラウザからリクエスト送信",
      },
      {
        number: 2,
        title: "Routing to controller",
        code: `routes.rb -> UsersController#index`,
        explanation: "ルーティングがコントローラに振り分け",
      },
      {
        number: 3,
        title: "Controller fetches data",
        code: `@users = User.all`,
        explanation: "ControllerがModelにデータ取得を指示",
      },
      {
        number: 4,
        title: "Controller renders view",
        code: `render 'index'`,
        explanation: "ControllerがViewにデータを渡す",
      },
      {
        number: 5,
        title: "View generates HTML",
        code: `<html>...</html>`,
        explanation: "ViewがHTMLを生成してレスポンスを返す",
      },
    ],
  },
  8: {
    title: "Chapter 8",
    subtitle: "Error Reading (エラーメッセージの読み方)",
    steps: [
      {
        number: 1,
        title: "NoMethodError on nil",
        code: `NoMethodError: undefined method 'name' for nil`,
        explanation:
          "nilオブジェクトにnameメソッドがない → 変数がnilになっている",
      },
      {
        number: 2,
        title: "RecordNotFound",
        code: `ActiveRecord::RecordNotFound`,
        explanation: "指定したIDのレコードが見つからない",
      },
      {
        number: 3,
        title: "RoutingError",
        code: `ActionController::RoutingError`,
        explanation: "URLに対応するルートが定義されていない",
      },
      {
        number: 4,
        title: "NameError",
        code: `NameError: uninitialized constant`,
        explanation:
          "クラスやモジュールが見つからない（ファイル名やクラス名の規約違反）",
      },
      {
        number: 5,
        title: "ArgumentError",
        code: `ArgumentError: wrong number of arguments`,
        explanation: "メソッドに渡した引数の数が違う",
      },
    ],
  },
};
