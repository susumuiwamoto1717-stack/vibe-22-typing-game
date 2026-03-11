// RUNTEQ Git演習 学習モード データ
// カリキュラム: Git入門 > Git演習 (Chapter 2) の内容をそのまま反映

const GIT_LEARNING_CHAPTERS = [
  { id: 1, title: 'Chapter 1: Git環境のセットアップ' },
  { id: 2, title: 'Chapter 2: ローカルリポジトリの作成' },
  { id: 3, title: 'Chapter 3: Gitの基本操作' },
  { id: 4, title: 'Chapter 4: ブランチ操作' },
  { id: 5, title: 'Chapter 5: GitHubとの連携' },
];

const GIT_LEARNING_DATA = {
  1: {
    title: 'Chapter 1',
    subtitle: 'Git環境のセットアップ',
    steps: [
      {
        number: 1,
        title: 'ユーザー名とメールの設定',
        code: `git config --global user.name "Your Name"
git config --global user.email you@example.com
git config --list`,
        output: `user.name=Your Name
user.email=you@example.com`,
        explanation: 'gitのユーザー設定を行います。この設定により、Gitが誰の変更を記録しているのかを認識できるようになります。GitHubで使用しているemailと同一にするとコミット履歴（「草」）が表示されます。',
      },
    ],
  },

  2: {
    title: 'Chapter 2',
    subtitle: 'ローカルリポジトリの作成',
    steps: [
      {
        number: 1,
        title: 'ディレクトリの作成と移動',
        code: `mkdir git_exercise
ls
cd git_exercise`,
        output: `git_exercise`,
        explanation: 'Gitで管理するためのワーキングディレクトリを作成します。mkdirでディレクトリを作成し、cdで移動します。',
      },
      {
        number: 2,
        title: 'git init でリポジトリ初期化',
        code: `git status
git init
git status`,
        output: `fatal: not a git repository (or any of the parent directories): .git
Initialized empty Git repository in /home/user/git_exercise/.git/
On branch master
No commits yet
nothing to commit (create/copy files and use "git add" to track)`,
        explanation: 'git initを実行すると.gitという隠しディレクトリが作成され、Gitが管理するための情報が格納されます。git statusの実行結果が変わり、git管理下にあることが確認できます。',
      },
    ],
  },

  3: {
    title: 'Chapter 3',
    subtitle: 'Gitの基本操作',
    steps: [
      {
        number: 1,
        title: 'ファイルの作成',
        code: `echo "# Gitエクササイズ" > README.md
ls`,
        output: `README.md`,
        explanation: 'echoコマンドを使うことでファイルの中身を指定して作成することができます。> で出力先をファイルに指定しています。',
      },
      {
        number: 2,
        title: 'git add（ステージング）',
        code: `git status
git add README.md
git status`,
        output: `On branch master
No commits yet
Untracked files:
  README.md

On branch master
No commits yet
Changes to be committed:
  new file:   README.md`,
        explanation: 'git addでREADME.mdをステージングエリアに追加します。git addを実行するとファイル名の色が赤から緑に変わり、次回のコミットに含める変更として選択されたことがわかります。',
      },
      {
        number: 3,
        title: 'git commit（コミット）',
        code: `git commit -m "Add README.md"
git status`,
        output: `[master (root-commit) 9d4d713] Add README.md
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
On branch master
nothing to commit, working tree clean`,
        explanation: 'git commitでステージングエリアの内容をローカルリポジトリに保存します。-mオプションでコミットメッセージを指定します。コミット後はworking tree cleanと表示されます。',
      },
      {
        number: 4,
        title: 'git log（履歴確認）',
        code: `git log`,
        output: `commit 9d4d7130757d5d6024b951e091778a4b64a4cf78 (HEAD -> master)
Author: Your Name <you@example.com>
Date:   Mon Apr 21 20:17:46 2025 +0900

    Add README.md`,
        explanation: 'git logでコミット履歴を確認できます。コミットID（ハッシュ値）、コミットメッセージ、作成者、作成日時が表示されます。',
      },
    ],
  },

  4: {
    title: 'Chapter 4',
    subtitle: 'ブランチ操作',
    steps: [
      {
        number: 1,
        title: 'ブランチの作成',
        code: `git branch new_branch
git branch`,
        output: `* master
  new_branch`,
        explanation: 'git branchで新しいブランチを作成します。現在のブランチの状態をコピーした新しいブランチが作成されます。* がついているのが現在操作しているブランチです。',
      },
      {
        number: 2,
        title: 'ブランチの切り替え',
        code: `git switch new_branch
git branch`,
        output: `Switched to branch 'new_branch'
  master
* new_branch`,
        explanation: 'git switchで指定したブランチに切り替えます。git branchで確認すると * がnew_branchに移動しています。',
      },
      {
        number: 3,
        title: 'ブランチの作成と切り替えを同時に',
        code: `git switch -c new_branch_2
git branch`,
        output: `Switched to a new branch 'new_branch_2'
  master
  new_branch
* new_branch_2`,
        explanation: 'git switch -c でブランチの作成と切り替えを同時に行えます。同じことができるコマンドとして git checkout -b もあります。',
      },
      {
        number: 4,
        title: 'ブランチの削除',
        code: `git switch new_branch
git branch -d new_branch_2
git branch`,
        output: `Switched to branch 'new_branch'
Deleted branch new_branch_2 (was 9d4d713).
  master
* new_branch`,
        explanation: 'git branch -d でブランチを削除できます。削除するブランチにいる状態では削除できないので、先に別のブランチに切り替えます。',
      },
      {
        number: 5,
        title: 'ブランチ間の違いを体感（1）新ブランチで作業',
        code: `git switch -c new_branch_3
echo "Hello World" > hello.txt
git add hello.txt
git commit -m "Add hello.txt"
git status
ls`,
        output: `Switched to a new branch 'new_branch_3'
[new_branch_3 ce7cffa] Add hello.txt
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
On branch new_branch_3
nothing to commit, working tree clean
README.md  hello.txt`,
        explanation: 'new_branch_3を作成し、hello.txtを作成してコミットします。lsでREADME.mdとhello.txtの両方が表示されることを確認してください。',
      },
      {
        number: 6,
        title: 'ブランチ間の違いを体感（2）ブランチを戻す',
        code: `git switch new_branch
git status
ls`,
        output: `Switched to branch 'new_branch'
On branch new_branch
nothing to commit, working tree clean
README.md`,
        explanation: 'new_branchに切り替えるとhello.txtが消えます！new_branch_3で作成したhello.txtはnew_branch_3にのみ存在するためです。ブランチごとに異なる状態を持てるのがGitの特徴です。',
      },
      {
        number: 7,
        title: 'ブランチのマージ',
        code: `git switch new_branch
ls
git merge new_branch_3
ls`,
        output: `Already on 'new_branch'
README.md
Updating 9d4d713..ce7cffa
Fast-forward
 hello.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
README.md  hello.txt`,
        explanation: 'git mergeでnew_branch_3の変更をnew_branchに統合します。マージ後、hello.txtがnew_branchにも追加されたことが確認できます。',
      },
    ],
  },

  5: {
    title: 'Chapter 5',
    subtitle: 'GitHubとの連携',
    steps: [
      {
        number: 1,
        title: 'SSHキーの作成',
        code: `ssh-keygen -t ed25519`,
        output: `Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub.`,
        explanation: 'SSHキー（公開鍵と秘密鍵のペア）を作成します。保存先とパスフレーズはそのままEnterを押してデフォルト設定で作成します。',
      },
      {
        number: 2,
        title: '公開鍵の確認とコピー',
        code: `ls ~/.ssh
cat ~/.ssh/id_ed25519.pub | pbcopy`,
        output: `id_ed25519  id_ed25519.pub`,
        explanation: '秘密鍵（id_ed25519）と公開鍵（id_ed25519.pub）のペアが作成されていることを確認します。pbcopyで公開鍵をクリップボードにコピーし、GitHubの SSH and GPG keys に登録します。',
      },
      {
        number: 3,
        title: 'リモートリポジトリとの接続',
        code: `git remote add origin git@github.com:username/git_exercise.git
git push -u origin new_branch`,
        output: ``,
        explanation: 'git remote add originでGitHubのリモートリポジトリを登録します。git pushでローカルの変更をリモートにアップロードします。リモートリポジトリのURLはgit@から始まるSSH形式を使います。',
      },
    ],
  },
};
