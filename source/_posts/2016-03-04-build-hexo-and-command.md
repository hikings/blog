---
title: Hexo Command
category:   Static-Website
tags:
      - Static-Website
date: 2016/3/4 21:48:43

description: Hexo 备忘录

---

## 搭建流程##
 需要两个分支或者仓库，分别用来保存生成结果和源文件
 - 创建仓库，xx.github.io
 - 创建两个分支：master 与 dev 或者两个仓库
 - git clone
 - 通过Git bash依次执行npm install hexo、hexo init、npm install 和 npm install hexo-deployer-git（此时当前分支应显示为hexo）
 - 修改_config.yml中的deploy参数，分支应为master
 - 执行hexo generate -d生成网站并部署到GitHub上
 - 执行git add .、git commit -m “…”、git push 提交源文件到dev分之或者源码仓库

<!--more-->

## 日常修改##
 - 在本地对博客进行修改
 - 分别发布到两个仓库（用脚本自动化）

## 更换机器##
 - 当重装电脑之后，或者想在其他电脑上修改博客，可以使用下列步骤：
 - 使用git clone git@github.com:CrazyMilk/CrazyMilk.github.io.git拷贝仓库（默认分支为hexo）；
 - 在本地新拷贝的CrazyMilk.github.io文件夹下通过Git bash依次执行下列指令：npm install hexo、npm install、npm install hexo-deployer-git（记得，不需要hexo init这条指令）。

>  [Hexo](https://hexo.io/)!
>  [documentation](https://hexo.io/docs/) for more info.
>  find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html)
>  ask on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

##
# Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)
