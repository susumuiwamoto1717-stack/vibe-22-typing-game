// RUNTEQ Rails入門 学習モード データ
// Rails入門① (Part 1): 基本フローの理解 — Ch1-5
// Rails入門② (Part 2): データモデリングと認証 — Ch6-11

const RAILS_LEARNING_CHAPTERS = [
  // === Part 1: Rails入門① 〜基本フローの理解〜 ===
  { id: 1, part: 1, title: 'Chapter 1: これから作成するアプリの機能を確認しよう' },
  { id: 2, part: 1, title: 'Chapter 2: Railsアプリケーションを動かしてみよう' },
  { id: 3, part: 1, title: 'Chapter 3: ユーザー画面を作ってRailsの処理フローを学ぼう' },
  { id: 4, part: 1, title: 'Chapter 4: 詳細イメージを掴むためにデバッグをできるようになろう' },
  { id: 5, part: 1, title: 'Chapter 5: ユーザー画面を元にコントローラとビューについて知ろう' },
  // === Part 2: Rails入門② 〜データモデリングと認証〜 ===
  { id: 6, part: 2, title: 'Chapter 6: これから作るアプリの機能を確認しよう（②）' },
  { id: 7, part: 2, title: 'Chapter 7: モデルについて知ろう' },
  { id: 8, part: 2, title: 'Chapter 8: マイグレーションについて知ろう' },
  { id: 9, part: 2, title: 'Chapter 9: バリデーションとアソシエーションを知ろう' },
  { id: 10, part: 2, title: 'Chapter 10: ログイン機能を作ろう' },
  { id: 11, part: 2, title: 'Chapter 11: ゼロからタスク管理ページを実装しよう' },
];

const RAILS_LEARNING_DATA = {
  // ===== Part 1: Rails入門① =====
  1: {
    title: 'Chapter 1',
    subtitle: 'これから作成するアプリの機能を確認しよう',
    steps: [
      {
        number: 1,
        title: 'rails new でプロジェクト作成',
        code: `rails new myapp
cd myapp`,
        explanation: 'rails new アプリ名 でRailsプロジェクトを一括生成。MVC構造のディレクトリが自動で作られる。',
      },
      {
        number: 2,
        title: 'MVC構造の確認',
        code: `app/models/
app/views/
app/controllers/
config/routes.rb
db/
Gemfile`,
        explanation: 'Model（データ）・View（画面）・Controller（制御）の3層構造。routes.rbでURLとアクションを結びつける。',
      },
    ],
  },
  2: {
    title: 'Chapter 2',
    subtitle: 'Railsアプリケーションを動かしてみよう',
    steps: [
      {
        number: 1,
        title: 'サーバー起動',
        code: `rails server
rails s`,
        explanation: 'rails server（rails s）で開発サーバー起動。localhost:3000 でアクセスできる。',
      },
      {
        number: 2,
        title: 'Gemfileとbundle install',
        code: `# Gemfile
gem 'rails', '~> 7.0'
gem 'puma'
gem 'sqlite3'

bundle install`,
        explanation: 'Gemfileに使用するGemを記述し、bundle installでインストール。Railsアプリの依存管理。',
      },
    ],
  },
  3: {
    title: 'Chapter 3',
    subtitle: 'ユーザー画面を作ってRailsの処理フローを学ぼう',
    steps: [
      {
        number: 1,
        title: 'ルーティング定義',
        code: `# config/routes.rb
Rails.application.routes.draw do
  get "/users", to: "users#index"
  get "/users/:id", to: "users#show"
end`,
        explanation: 'get "URL", to: "コントローラ#アクション" でルーティング定義。:idはURLパラメータ。',
      },
      {
        number: 2,
        title: 'コントローラ作成',
        code: `# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end
end`,
        explanation: '@変数（インスタンス変数）でコントローラからビューにデータを渡す。paramsでURLパラメータを取得。',
      },
      {
        number: 3,
        title: 'ビューテンプレート（ERB）',
        code: `<%# app/views/users/index.html.erb %>
<h1>Users</h1>
<% @users.each do |user| %>
  <p><%= user.name %></p>
<% end %>`,
        explanation: '<%= %> は出力あり、<% %> は出力なし。@usersはコントローラから渡されたデータ。',
      },
      {
        number: 4,
        title: 'rails routes で確認',
        code: `rails routes`,
        explanation: '定義済みルートを一覧表示。Prefix・HTTP動詞・URL・コントローラ#アクションの対応が確認できる。',
      },
    ],
  },
  4: {
    title: 'Chapter 4',
    subtitle: '詳細イメージを掴むためにデバッグをできるようになろう',
    steps: [
      {
        number: 1,
        title: 'binding.pry で処理を止める',
        code: `def show
  @user = User.find(params[:id])
  binding.pry
  render :show
end`,
        explanation: 'binding.pryを挿入した行で処理が止まり、ターミナルで変数の中身を確認できる。デバッグの基本。',
      },
      {
        number: 2,
        title: 'p / pp でターミナル出力',
        code: `def index
  @users = User.all
  p @users
  pp @users.first
end`,
        explanation: 'p はオブジェクトの中身を表示。pp はきれいに整形して表示。ログで確認する最もシンプルな方法。',
      },
    ],
  },
  5: {
    title: 'Chapter 5',
    subtitle: 'ユーザー画面を元にコントローラとビューについて知ろう',
    steps: [
      {
        number: 1,
        title: 'RESTfulな7つのアクション',
        code: `# config/routes.rb
resources :users
# => index, show, new, create, edit, update, destroy`,
        explanation: 'resources :モデル名 で7つのRESTfulルートを一括定義。CRUDに対応したURL設計。',
      },
      {
        number: 2,
        title: 'ストロングパラメータ',
        code: `class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end`,
        explanation: 'require/permitで許可されたパラメータのみ受け取る。マスアサインメント脆弱性を防ぐセキュリティ機能。',
      },
      {
        number: 3,
        title: 'パーシャルで共通パーツ切り出し',
        code: `<%# app/views/users/_form.html.erb %>
<%= form_with model: @user do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>

<%# new.html.erb / edit.html.erb %>
<%= render "form" %>`,
        explanation: '_ファイル名.html.erb がパーシャル。render "form" で呼び出す。newとeditでフォームを共有できる。',
      },
    ],
  },

  // ===== Part 2: Rails入門② =====
  6: {
    title: 'Chapter 6',
    subtitle: 'これから作るアプリの機能を確認しよう（②）',
    steps: [
      {
        number: 1,
        title: 'Active RecordでDB操作',
        code: `User.all
User.find(1)
User.where(active: true)
User.create(name: "Taro", email: "taro@example.com")`,
        explanation: 'Active RecordはRubyオブジェクトとDBテーブルを対応づけるORM。SQLを書かずにRubyでDB操作できる。',
      },
      {
        number: 2,
        title: 'CRUD操作の全体像',
        code: `user = User.new(name: "Taro")
user.save

user.update(name: "Hanako")
user.destroy`,
        explanation: 'new+saveまたはcreateで作成、updateで更新、destroyで削除。これがCRUDの基本4操作。',
      },
    ],
  },
  7: {
    title: 'Chapter 7',
    subtitle: 'モデルについて知ろう',
    steps: [
      {
        number: 1,
        title: 'モデル定義',
        code: `class User < ApplicationRecord
end

User.all
User.find(1)
User.where(active: true)`,
        explanation: 'ApplicationRecordを継承するだけでActive Record機能が使える。SQLを書かずにRubyでDB操作。',
      },
      {
        number: 2,
        title: 'スコープとコールバック',
        code: `class User < ApplicationRecord
  scope :active, -> { where(active: true) }
  scope :recent, -> { order(created_at: :desc) }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase
  end
end`,
        explanation: 'scopeでよく使う検索条件に名前をつけて再利用。before_saveで保存前に自動処理を実行。',
      },
    ],
  },
  8: {
    title: 'Chapter 8',
    subtitle: 'マイグレーションについて知ろう',
    steps: [
      {
        number: 1,
        title: 'マイグレーション生成と実行',
        code: `rails generate migration CreateUsers name:string email:string
rails db:migrate
rails db:rollback`,
        explanation: 'rails generate migrationでファイル生成。rails db:migrateでDB反映。rollbackで取り消し。',
      },
      {
        number: 2,
        title: 'カラム追加・削除',
        code: `rails generate migration AddAgeToUsers age:integer

class AddAgeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :age, :integer
  end
end`,
        explanation: 'add_columnでカラム追加、remove_columnで削除。DBの変更履歴をコードで管理できる。',
      },
    ],
  },
  9: {
    title: 'Chapter 9',
    subtitle: 'バリデーションとアソシエーションを知ろう',
    steps: [
      {
        number: 1,
        title: 'バリデーション',
        code: `class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :age, numericality: { greater_than: 0 }
end`,
        explanation: 'presence: 空欄禁止、uniqueness: 重複禁止、numericality: 数値チェック。saveやcreate時に自動検証。',
      },
      {
        number: 2,
        title: 'has_many / belongs_to',
        code: `class User < ApplicationRecord
  has_many :tasks, dependent: :destroy
end

class Task < ApplicationRecord
  belongs_to :user
end

user = User.find(1)
user.tasks
user.tasks.create(title: "Buy milk")`,
        explanation: 'has_many: 1対多（UserはTaskをたくさん持つ）。belongs_to: 多対1（TaskはUserに属する）。dependent: :destroyで親削除時に子も削除。',
      },
    ],
  },
  10: {
    title: 'Chapter 10',
    subtitle: 'ログイン機能を作ろう',
    steps: [
      {
        number: 1,
        title: 'has_secure_password',
        code: `gem 'bcrypt'

class User < ApplicationRecord
  has_secure_password
end

user = User.create(name: "Taro", password: "secret123")
user.authenticate("secret123")`,
        explanation: 'has_secure_passwordでパスワードをハッシュ化して保存。authenticateで認証チェック。bcrypt gemが必要。',
      },
      {
        number: 2,
        title: 'セッションでログイン管理',
        code: `session[:user_id] = user.id

def current_user
  @current_user ||= User.find_by(id: session[:user_id])
end

session.delete(:user_id)`,
        explanation: 'session[:user_id]にユーザーIDを保存してログイン状態を管理。current_userで現在のユーザーを取得。',
      },
      {
        number: 3,
        title: 'before_action でアクセス制御',
        code: `class ApplicationController < ActionController::Base
  private

  def authenticate_user!
    unless current_user
      flash[:alert] = "ログインしてください"
      redirect_to login_path
    end
  end
end

class TasksController < ApplicationController
  before_action :authenticate_user!
end`,
        explanation: 'before_actionでアクション実行前にログインチェック。未ログインならリダイレクト。flashで一回限りのメッセージ表示。',
      },
    ],
  },
  11: {
    title: 'Chapter 11',
    subtitle: 'ゼロからタスク管理ページを実装しよう',
    steps: [
      {
        number: 1,
        title: 'resources でルーティング一括定義',
        code: `Rails.application.routes.draw do
  resources :tasks
end`,
        explanation: 'resources :tasks で7つのRESTfulルートを一括定義。CRUDに必要な全URLが自動生成される。',
      },
      {
        number: 2,
        title: 'form_with でフォーム作成',
        code: `<%= form_with model: @task do |f| %>
  <%= f.label :title %>
  <%= f.text_field :title %>

  <%= f.label :body %>
  <%= f.text_area :body %>

  <%= f.submit %>
<% end %>`,
        explanation: 'form_withでCSRF対策済みフォームを生成。モデルを渡すとnew/edit両方で使えるフォームになる。',
      },
      {
        number: 3,
        title: 'ストロングパラメータとN+1解消',
        code: `def task_params
  params.require(:task).permit(:title, :body)
end

@tasks = Task.includes(:user).all`,
        explanation: 'require/permitで不正パラメータを防ぐ。includesで関連データをまとめて取得しN+1問題を解消。',
      },
    ],
  },
};
