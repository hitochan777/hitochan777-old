---
layout: blog
title: Netlify functionsでCORSの設定ができない件
date: 2019-11-02T14:40:19.289Z
---
[Netlifyのコミュニティのディスカッション](https://community.netlify.com/t/access-control-allow-origin-policy/1813)に従って、静的ファイルホスティングは以下のようにAccess-Control-Allow-Originを設定すると機能したが、Functionについては反映されなかった。

```toml:netlify.toml
[[headers]]
  for = "/*"
    [headers.values]
    Access-Control-Allow-Origin = "*"
```

なので、ハンドラーで直接ヘッダーを設定するようにしたら問題なく動作しました。

```golang:main.go
return &events.APIGatewayProxyResponse{
  Headers: map[string]string{
    "Access-Control-Allow-Origin": "*",
  },
  StatusCode: http.StatusOK,
  Body:       string(jsonString),
}, nil
```
