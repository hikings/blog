---
title: Hexo Command
category:   Static-Website
tags:
      - Static-Website
date: 2016/3/4 21:48:45

description: Hexo 备忘录

---

## 搭建流程
 需要两个分支或者仓库，分别用来保存生成结果和源文件
 - 创建仓库，xx.github.io
 - 创建两个分支：master 与 dev 或者两个仓库
 - git clone
 - 通过Git bash依次执行

``` bash
npm install -g hexo-cli
hexo init
$ cd <folder>
$ npm install
```

 - 修改_config.yml中的deploy参数，分支应为master
 - 执行hexo generate -d生成网站并部署到GitHub上
 - 执行git add .、git commit -m “…”、git push 提交源文件到dev分之或者源码仓库

<!--more-->

## 日常修改
 - 在本地对博客进行修改
 - 分别发布到两个仓库（用脚本自动化）

## 恢复环境
 - 当重装电脑之后，或者想在其他电脑上修改博客，可以使用下列步骤：
 - 使用git clone git@github.com:CrazyMilk/CrazyMilk.github.io.git拷贝仓库（默认分支为hexo）；
 - 在本地新拷贝的xx.github.io文件夹下通过Git bash依次执行下列指令（记得，不需要hexo init这条指令）。
``` bash
npm install -g hexo-cli
$ cd <folder>
$ npm install
```


>  [Hexo](https://hexo.io/)!
>  [documentation](https://hexo.io/docs/) for more info.
>  find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html)
>  ask on [GitHub](https://github.com/hexojs/hexo/issues).


## 常见问题

### 发布后没有更新
- 使用 hexo clean 命令, 然后重新生成
- 删除 .deploy 目录, 然后重新发布




## 目录结构

``` bash
hexo/
  |- node_modules/  # hexo需要的模块，不需要上传GitHub
  |- themes/        # 主题文件，需要上传GitHub的dev分支
  |- sources/       # 博文md文件，需要上传GitHub的dev分支
  |- public/        # 生成的静态页面，由hexo deploy自动上传到gh-page分支
  |- package.json   # 记录hexo需要的包信息，不需要上传GitHub
  |- _config.yml    # 全局配置文件，需要上传GitHub的dev分支
  |- .gitignore     # hexo生成默认的.gitignore，它已经配置好了不需要上传的hexo文件
```

## Quick Start

### Create a new post

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
