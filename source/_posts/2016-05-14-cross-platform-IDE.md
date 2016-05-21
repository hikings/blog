---
layout:     post
title:      免费的跨平台多语言开发工具 VSCode
keywords:
category:  IDE
tags:
      - IDE
date:        2016/5/14 23:27:36
description: 免费的跨平台多语言开发工具 VSCode

---
  - 多年来一直在多个平台上用多种语言开发系统。从大型系统架构角度这是必然也是很好的选择，用擅长的语言做对应的事，人员的技能门槛也不会成为制约。
  - 一直希望一个能够跨 unix/linux/windows 三个平台的开发工具，当然vim是可以的
<!--more-->
  - 不过这是多么悲催的人才需要学习这么多系统啊
    + OS 覆盖了
       * UNIX : Solaris
       * Linux : Suse, Ubuntu, Debian, Centos
       * Windows
    + DB 覆盖了
       * Oracle, DB2, Sybase, Mysql, PostgreSQL
       * Oracle, SybaseIQ
       * Redis, Mongodb, leveldb, etcd
       * 还有一堆数不清的内存数据库
    + 语言覆盖了
       * Cpp, Java, Python, Js, Node, Html
       * 现在又多了 Go 和 Scala


  - 当前使用的工具主要是
      - eclipse -> intelljidea
      - vim
      - sublime

      - Atom 在跨平台上现在也是个不错的选择,但是还是不够流畅

  总是有一些不如意
   - 比如对json的支持
   - 比如java的开发工具 eclipse/ inteljidea 对内存的占用了迟滞的响应速度

  从这段时间开发Go来看， VSCode 是个不错的选择
    - 内存占用相对低（不过启动了多个实例）, intelljidea 700M
    - 响应快
    - 无需外部工具的diff
    - 编辑大文件快
    - 语言支持齐全
    - 免费用于Windows、Mac OS X和Linux
    - 并且支持扩展，包括Go/Python/Debugger for Chrome的支持, 并支持类似sublime的ext管理

  附上链接:https://code.visualstudio.com/

## vscode-go plugin

https://github.com/Microsoft/vscode-go

User Settings，找到.vscode/settings.json).
```shell
// Specifies the GOPATH to use when no environment variable is set.
{
    "go.buildOnSave": true,
    "go.lintOnSave": true,
    "go.vetOnSave": true,
    "go.buildTags": "",
    "go.buildFlags": [],
    "go.lintFlags": [],
    "go.vetFlags": [],
    "go.coverOnSave": false,
    "go.useCodeSnippetsOnFunctionSuggest": false,
    "go.formatOnSave": true,
    "go.formatTool": "goreturns",
    "go.goroot": "/usr/local/go",
    "go.gopath": "/Users/lukeh/go",
    "go.gocodeAutoBuild": false
}
```

 - gocode: go get -u -v github.com/nsf/gocode
 - godef: go get -u -v github.com/rogpeppe/godef
 - golint: go get -u -v github.com/golang/lint/golint
 - go-outline: go get -u -v github.com/lukehoban/go-outline
 - goreturns: go get -u -v sourcegraph.com/sqs/goreturns
 - gorename: go get -u -v golang.org/x/tools/cmd/gorename
 - gopkgs: go get -u -v github.com/tpng/gopkgs
 - go-symbols: go get -u -v github.com/newhook/go-symbols
 - guru: go get -u -v golang.org/x/tools/cmd/guru

```shell
go get -u -v github.com/nsf/gocode
go get -u -v github.com/rogpeppe/godef
go get -u -v github.com/golang/lint/golint
go get -u -v github.com/lukehoban/go-outline
go get -u -v sourcegraph.com/sqs/goreturns
go get -u -v golang.org/x/tools/cmd/gorename
go get -u -v github.com/tpng/gopkgs
go get -u -v github.com/newhook/go-symbols
go get -u -v golang.org/x/tools/cmd/guru
```

