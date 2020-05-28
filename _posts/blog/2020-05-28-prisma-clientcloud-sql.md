---
title: Cloud Run上のPrisma ClientからCloud SQLに接続する
layout: blog
date: '2020-05-28T14:18:56.382Z'
draft: false
---

[Prisma]()も[2.0.0-beta.6](https://github.com/prisma/prisma/releases/tag/2.0.0-beta.6)がリリースされ 2.0.0 の正式リリースにどんどん近づいてきている。  
備忘録として Cloud Run 上の Prisma Client から Cloud SQL へのつなぎ方を残しておく。

1.  Cloud Run で"Deploy revision to <サービス名>"から Connection タブを選ぶ
2.  Add connection からすでに作成済みの Cloud SQL のインスタンスを選択  
    こうすることによって Cloud Run のサービスからソケット経由で Cloud SQL にアクセスすることができるようになる
3.  Prisma の設定ファイル (`schema.prisma`)の datasource 内の url を下記のようにに変更。

        postgres://<USERNAME>:<PASSWORD>@localhost/<DB_NAME>?host=/cloudsql/<INSTANCE NAME>

    `USERNAME`, `PASSWORD`, `DB_NAME`, `INSTANCE NAME` は正しい値に置き換える。  
    もちろん schema.prisma は一般的に git とかで管理すると思うので`env("DB_URL")`のようにして環境変数として注入するようにするのがよいだろう。
