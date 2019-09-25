---
layout: blog
title: Using path alias in Next.js + Typescript like Nuxt.js
date: 2019-09-25T12:43:25.305Z
---
# Path Aliases

Nuxt.js provides path [aliases](https://nuxtjs.org/guide/directory-structure/#aliases) `~` for `srcDir` and `@` for `rootDir`.  
These aliases are particularly useful when you have somewhat deeply nested directory structure in your project and want to import modules that are far away from the current path.  
In this case you end up writing a code that might look like this.

```javascript
import FarAwayModule from "../../../lib/too/far/far_away_module"
```

What is annoying is you need to change the import path whenever you want to move the file from which you import `FarAwayModule` to the directory of other level.

By using path alias, you can rewrite the above like this.

```javascript
import FarAwayModule from "@/lib/too/far/far_away_module"
```

# Path Alias in Next.js
Unfortunately, Next.js does not provide aliases, but you don't need to be pessimistic because there is a way!
As written in [the previous article I wrote (in Japanese)](https://qiita.com/hitochan777/items/bf5204fe13e6996d1589), you can use [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) to achieve similar effect as Nuxt.js.  
You just need to download this package and add the following setting (or whatever aliases you like) to `.babelrc`

```json:.babelrc
{
  ...
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "@": "."
        }
      }
    ]
  ]
}
```

I was happy until I started using typescript in Next.js now that it officially added Typescript support from 9.x!
