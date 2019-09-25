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

# Path Alias in Next.js with Typescript

With above setting only, Next.js with Typescript will complain that it cannot find aliased modules!

```console
17:31 Cannot find module '@/store'.
    15 | import { MultiSelect } from "./molecule/MultiSelect";
    16 | import Loading from "./Loading";
  > 17 | import { useStateValue } from "@/store";
       |                               ^
    18 | import { GET_LANGUAGES, GetLanguagesQuery } from "@/constant/queries";
    19 |
    20 | interface Props {
```

Then I realized that Typescript itself provides aliases by `compileOptions.paths` field in `tsconfig.json`.  
So I defined a module mapping using wildcard in `paths`, along with `baseUrl` set to the same directory as where `tsconfig.json` is located. (This is because each mapping in `paths` is relative to `baseUrl` so it also needs to be set).

```json
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"]
    }
    ...
  }
}
```

Then I ran Next.js server and yes, it finally worked!

# But isn't it a bit redundant...?

You probably noticed the redundancy here and are thinking, "you don't need the babel plugin anymore, do you?".  
Looking at GitHub issues, I found that this matter is currently under discussion ([Link](https://github.com/zeit/next-plugins/issues/136)).
I tried the possible solutions but they did not lead to removing this redundancy.  
Ideally, it would be nice if we can just specify `compileOptions.paths` because VSCode take `tsconfig.json` into account and thus it does not complain it cannot find modules.  
Even if we can do with only `.babelrc`, VSCode might not be able resolve modules.

# Conclusion

In conclusion, it **seems** that you need to configure both `tsconfig.json` and `.babelrc` for path aliases to work in Next.js + Typescript!
