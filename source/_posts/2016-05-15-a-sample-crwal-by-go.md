---
layout:     post
title:      Go实现的简单爬虫
keywords:
category:  Go
tags:
    - Crawler
    - GoLang
date:        2016/5/15 13:27:36
description: Go实现的简单爬虫, 帮助日常中偷偷懒

---
  - 这段时间整理分布式经典论文, 这个自己手工来下载是个很吃力的事情
  - 如果还想要进行一些处理方便使用,比如按引用排序,按年代排序,按作者来分类,这时候写个几十行的小爬虫就很方便了.
  - 一般下载资料,获取峰会材料等等的时候都会用爬虫来处理

  - 过去都是用 python 爬虫, 主要使用 BeautifulSoup 来解析, 用 requests 来请求

  - 现在想试试用 go 处理,今天刚好发挥了作用
  - 因为golang.org被墙, 很多库是没有办法下载的例如 https://godoc.org/golang.org/x/net
  - 没办法 go get golang.org/x/net 了。可以用 go get github.com/golang/net 替代

  - 但是很多库,手工处理太坑了, 写了个小爬虫, 生成了个批处理文件 在 golang.org/x 目录里面执行就获得了素有的库.
  - [批处理](https://github.com/hikings/goutil/blob/master/golang-x-lib.bat)
<!--more-->


## 方法1 利用 goquery 和 gocrawl
https://github.com/PuerkitoBio/goquery
https://github.com/PuerkitoBio/gocrawl


## 方法2 利用 go_spider
https://github.com/hu17889/go_spider

```go
spider.NewSpider(NewMyPageProcesser(), "TaskName").
    AddUrl("https://github.com/hu17889?tab=repositories", "html"). // Start url, html is the responce type ("html" or "json")
    AddPipeline(pipeline.NewPipelineConsole()).                    // Print result on screen
    SetThreadnum(3).                                               // Crawl request by three Coroutines
    Run()
```
## 方法3 利用 pholcus
https://github.com/henrylee2cn/pholcus
是个带界面的框架,比较重,不考虑了,发在这里供参考借鉴

## 方法4 不使用库, 不推荐
https://gorbledlog.appspot.com/article?id=e771244bd8db5838e8df6b3a09db14a7
只引用了  "fmt" , 没有办法理解
