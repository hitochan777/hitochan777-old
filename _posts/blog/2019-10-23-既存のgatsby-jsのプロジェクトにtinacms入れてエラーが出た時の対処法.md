---
layout: blog
title: 既存のGatsby.jsのプロジェクトにTinaCMS入れてエラーが出た時の対処法
date: 2019-10-22T08:39:34.983Z
---
JAMStack界隈では[TinaCMS](https://tinacms.org/)が流行っていますね。
コンテンツを編集しながらリアルタイムに実際どうレンダリングされるのかが分かるのでとても便利です。  
ただ、現状ではローカルでサーバーをdevelopモードで起動しないと使えないので、外出時にスマホでサクッとメモなどを書きたいと行った要望には対応できません。  
今後の開発に期待しつつ継続してウォッチしていきたいと思います。

# エラー内容

さて、既存のGatsby.jsプロジェクトにTinaCMSを入れたら、`Uncaught Error: Trying to insert a new style tag, but the given Node is unmounted! ` と怒られました。これはstyle-componentsのインスタンスが複数作成されると起きるエラーで、私の場合はもともとstyled-componentsを使っており、TinaCMSでもstyle-componentsに依存しているのでこのようなエラーが出ていました。

# 解決方法

解決方法は[styled-componentsの公式ページ](https://www.styled-components.com/docs/faqs#duplicated-module-in-node_modules)に書かれています。

まず、`./node_modules`にstyled-componentsの依存が複数ないかを確認します。

```
find -L ./node_modules | grep /styled-components/package.json
```

複数ある場合は、[`npm dedupe`](https://docs.npmjs.com/cli/dedupe.html)を使い重複を取り除きます。
