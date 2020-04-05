---
title: getInitialPropsからgetServerSidePropsに移行する
layout: blog
date: '2020-04-05T14:27:11.930Z'
draft: false
---
Next.jsでpagesで用いるデータ取得を行う際はgetInitialPropsを用いるのが一般的でしたが、  
[9.3](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support)からサーバー側でのデータ取得のためのAPI(`getServerSideProps`)が導入され`getInitialProps`は実質的に使わなくても良くなくなりました。

> No deprecations are introduced and `getInitialProps` will continue to function as it currently does. We do encourage adopting these new methods on new pages and projects.

ただ、リリースノートに書かれているとおりdeprecatedになるわけではなく、ぜひ採用していってほしいというような気持ちっぽいです。以下の内容はSSRで`getInitialProps`を用いていた場合に、どのように`getServerSideProps`に移行するのかを説明しています。

# getInitialPropsの場合

9\.3より前はgetInitialPropsをpage用のfunctionのプロパティとして代入してあげる形で表現していました。

    import { NextPage } from "next";
        
    const UserIndexPage: NextPage<Props> = ({ username }) => {
        ...
    };
        
    UserIndexPage.getInitialProps = async (ctx) => {
        return {name: "foo"}
    };

# getServerSidePropsに移行した場合

9\.3以降はgetServerSidePropsという関数を直接exportしてあげることでサーバサイドでのデータ取得が可能です。getServerSidePropsの型はGetServerSidePropsを用います。([参考](https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getserversideprops))   
注意点としては返り値が以前はpropの名前と対応する値からなるオブジェクトでしたが、それを`props`でラッピングしてあげる必要があります。

```javascript
import { NextPage, GetServerSideProps } from "next";
    
const UserIndexPage: NextPage<Props> = ({ username }) => {
    ...
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    return {
        // propsでラッピング
    	props: {
        	name: "foo"
        }
    }
}
```

getServerSidePropsはgetInitialPropsとは違いサーバ側でしか実行されないので、今までサーバ側であるかどうかを判別していたロジックや、isomorphicなライブラリなどを使ったりと気にする箇所が減るのでありがたいです。