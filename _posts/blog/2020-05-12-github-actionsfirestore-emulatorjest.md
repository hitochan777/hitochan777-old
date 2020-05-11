---
title: GitHub ActionsでFirestore Emulator使って単体テストする
layout: blog
date: '2020-05-11T23:05:39.736Z'
draft: false
---

# package.json に単体テストのスクリプトを追加

`package.json`の`scripts`に以下を追記する。`firebase emulator:exec`を使うことで`firestore`が起動してからテストを実行するようにできる。

```
"test:unit": "firebase emulators:exec --only firestore \\"FIRESTORE_EMULATOR_HOST=localhost:8000 NODE_ENV=test npx vue-cli-service test:unit\\""
```

# GitHub Actions のフローを作成

`.github/workflows/main.yaml`を下記の様に作成する。
firebase emulator は JRE を必要とするが ubuntu-latest にはすでに入っているので、セットアップはする必要はない。

```
name: CI and CD

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: yarn install
      run: yarn install --frozen-lockfile
    - name: setup firebase emulator
      run: npx firebase setup:emulators:firestore
    - name: yarn test:unit
      run: yarn test:unit
```

# テストが終わらない...

GitHub Actions で上記のフローを実行したら単体テストのところでテストが終わらず、ログを見ると以下のようなメッセージが出ていた。

> Jest did not exit one second after the test run has completed. This usually means that there are asynchronous operations that weren’t stopped in your tests. Consider running Jest with --detectOpenHandles to troubleshoot this issue.

ぐぐってみたら[同じような問題が出ている人がいた](https://www.donnfelker.com/fixing-jest-did-not-exit-issue/)。
ログに出ている通り`--detectOpenHandles`のオプションを付けて実行しても効果なし。
破棄したりすべきインスタンスを放置したままにしているので Jest が正常に終わらない様子。

コードを確認すると Firestore のインスタンスを破棄していなかったため、afterAll で terminate を呼び出すようにしたらうまく行った。

```typescript
afterAll(() => {
  firestoreClient.terminate()
})
```

なぜローカル実行時には正常終了していたのかが気になるが...
