---
layout: blog
title: ProbablyPrimeを使ってgolangで素数判定
date: 2019-02-03T08:08:04.284Z
---
Golang での素数判定には`math/big`の[`ProbablyPrime`](https://golang.org/pkg/math/big/#Int.ProbablyPrime)が使える。

メソッドのシグネチャは `func (x *Int) ProbablyPrime(n int) bool`。
このメソッドは疑似ランダムで選ばれた`n`個の数字を用いて`x`が(おそらく)素数かどうか判定する。
`x`が素数なら必ず`true`を返し、`x`がランダムに選ばれた素数でない数字なら**おそらく**`false`を返す。
false-positive (素数でないのに誤って素数と判定してしまう)確率は最大で$(\frac{1}{4})^{n}$。

$2^{64}$よりも小さい数字なら返り値は 100%正しい。

```golang:main.go
package main

import (
	"fmt"
	"math/big"
)

func main() {
	var prime, nonPrime big.Int
	prime.SetString("20988936657440586486151264256610222593863921", 10)
	nonPrime.SetString("20988936657440586486151264256610222593863922", 10)
	fmt.Println(prime.ProbablyPrime(0)) // 素数の場合
	fmt.Println(nonPrime.ProbablyPrime(0)) // 素数じゃない場合
}
```

実行結果

```bash
$ go run main.go
true
false
```
