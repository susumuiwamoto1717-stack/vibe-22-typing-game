# ベースイメージ: Nginx（軽量版）
FROM nginx:alpine

# プロジェクトのファイルを Nginx の配信ディレクトリにコピー
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# ポート80を公開（Nginxのデフォルト）
EXPOSE 80
