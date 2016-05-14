---
layout:     post
title:      Hugo  A fast and modern static website engine
keywords:
category:  [DS, DS PAPER, Go]
tags:         [DS, DS PAPER, Go]
date:        2016/5/1 12:10:33
description: Hugo  A fast and modern static website engine

---

## Hugo是由Go语言实现的静态网站生成器。简单、易用、高效、易扩展、快速部署。

快速开始
安装Hugo1. 二进制安装（推荐：简单、快速）
到 Hugo Releases 下载对应的操作系统版本的Hugo二进制文件（hugo或者hugo.exe）
<!--more-->
Mac下直接使用 Homebrew 安装：

brew install hugo2. 源码安装
源码编译安装，首先安装好依赖的工具：

GitMercurialGo 1.3+ (Go 1.4+ on Windows)
设置好 GOPATH 环境变量，获取源码并编译：

$ export GOPATH=$HOME/go$ go get -v github.com/spf13/hugo
源码会下载到 $GOPATH/src 目录，二进制在 $GOPATH/bin/

如果需要更新所有Hugo的依赖库，增加 -u 参数：

$ go get -u -v github.com/spf13/hugo生成站点
使用Hugo快速生成站点，比如希望生成到 /path/to/site 路径：

$ hugo new site /path/to/site
这样就在 /path/to/site 目录里生成了初始站点，进去目录：

$ cd /path/to/site
站点目录结构：

▸ archetypes/ ▸ content/ ▸ layouts/ ▸ static/ config.toml创建文章
创建一个 about 页面：

$ hugo new about.md
about.md 自动生成到了 content/about.md ，打开 about.md 看下：

内容是 Markdown 格式的，+++ 之间的内容是 TOML 格式的，根据你的喜好，你可以换成 YAML 格式（使用 --- 标记）或者 JSON 格式。

创建第一篇文章，放到 post 目录，方便之后生成聚合页面。

$ hugo new post/first.md
打开编辑 post/first.md ：


安装皮肤
到 皮肤列表 挑选一个心仪的皮肤，比如你觉得 Hyde 皮肤不错，找到相关的 GitHub 地址，创建目录 themes，在 themes 目录里把皮肤 git clone 下来：

# 创建 themes 目录$ cd themes$ git clone https://github.com/spf13/hyde.git运行Hugo
在你的站点根目录执行 Hugo 命令进行调试：

$ hugo server --theme=hyde --buildDrafts --watch
使用 --watch 参数可以在修改文章内容时让浏览器自动刷新。

浏览器里打开： http://localhost:1313

部署
假设你需要部署在 GitHub Pages 上，首先在GitHub上创建一个Repository，命名为：name.github.io （name替换为你的github用户名）。

在站点根目录执行 Hugo 命令生成最终页面：

$ hugo --theme=hyde --baseUrl="http://name.github.io/"
如果一切顺利，所有静态页面都会生成到 public 目录，将pubilc目录里所有文件 push 到刚创建的Repository的 master 分支。

$ cd public$ git init$ git remote add origin https://github.com/name/name.github.io.git$ git add -A$ git commit -m "first commit"$ git push -u origin master
浏览器里访问：http://name.github.io/
