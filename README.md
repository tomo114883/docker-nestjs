# ローカル PC の前提条件

### 以下をインストール済みであること

- [docker(docker-compose)](https://docs.docker.com/)

# 開発環境構築

### リポジトリのクローン

※windows なら Ubuntu ＋ WSL での環境を推奨。

- docker Desktop を起動しておいてください。

```shell
git clone git@github.com:kichinan/nestjs_practice.git
cd nestjs_practice
```

# アプリケーション開始

```shell
docker-compose up -d
```

# アプリケーション終了

```shell
docker-compose down
```

# サーバへ shell で入る

コンテナを立ち上げていない場合

```shell
docker-compose run --rm api sh
```

コンテナを立ち上げている場合

```shell
docker-compose exec api sh
```

# テスト

```shell
# サーバへshellで入る
docker-compose exec api sh
# ユニットテスト全体実行
npm run test
# e2eテスト全体実行
npm run test:e2e
# ユニットテスト(フォルダを指定)
npm run test api/src/works/
# ユニットテスト(ファイルを指定)
npm run test api/src/works/works.controller.spec.ts
# テスト(特定のdescribeだけを指定)
npm run test api/src/works/works.policy.spec.ts -t 'read権限に関するテスト'
# ※e2eテストの時はtestの後に「:e2e」と添えるだけで指定の方法は同じ。
```
