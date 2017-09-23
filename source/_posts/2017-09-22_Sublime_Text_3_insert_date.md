---
layout:     post
title:      Sublime Text 3 插入日期时间
keywords:
category:   Tips
tags:
      - sublimeText

date:        2017-09-22 23:52:50
description: 

---


Sublime  Text 并没有自带插入日期时间的功能，但是可以通过插件的方式实现，这也是sublime可扩展性的强大体现。详细的步骤如下：

    1. 菜单栏：Tools -> New Plugin...

    2. 此时会打开一个插件模版文件，使用下面的内容覆盖
<!--more-->
``` python
import datetime, getpass
import sublime, sublime_plugin
import datetime

class AddDateTimeStampCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        self.view.run_command("insert_snippet",
            {
                # "contents": "%s" % datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S %A")
                # 可根据自己的需要进行调整（参照后面的日期时间格式）
                "contents": "/**""\n"
                " * ""\n"
                " * @author:      author""\n"
                " * @dateTime:    "  "%s"  %datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") +"\n"
                " * @description: ""\n"
                " */"
            }
        )
```        
    3. ctrl+s保存文件，输入文件名 add_date.py，可以随便定义，然后确认一下保存的位置是 Packages/User/add_date.py

    4. 绑定快捷键，在菜单栏：Preferences -> Key Bindings -> User，使用下面的内容覆盖
```python
[
    {"keys": ["ctrl+shift+f5"], "command": "add_date_time_stamp" }
]

```
    5. 保存上一步的快捷键设置，在需要插入的地方使用快捷键试试吧！效果如下：
```python
/**
 *
 * @author:      author
 * @dateTime:    2015-08-12 11:42:34
 * @description:
 */
 class Demo {
 
 }
 ```



附录（strftime的格式）：

%a 星期简称

%A 星期全称

%b 月份简称

%B 月份全称

%c 标准的日期的时间串

%C 年份的后两位数字

%d 十进制表示的每月的第几天

%D 月/天/年

%e 在两字符域中，十进制表示的每月的第几天

%F 年-月-日

%g 年份的后两位数字，使用基于周的年

%G 年份，使用基于周的年

%h 简写的月份名

%H 24小时制的小时

%I 12小时制的小时

%j 十进制表示的每年的第几天

%m 十进制表示的月份

%M 十时制表示的分钟数

%n 新行符

%p 本地的AM或PM的等价显示

%r 12小时的时间

%R 显示小时和分钟：hh:mm

%S 十进制的秒数

%t 水平制表符

%T 显示时分秒：hh:mm:ss

%u 每周的第几天，星期一为第一天 （值从0到6，星期一为0）

%U 第年的第几周，把星期日作为第一天（值从0到53）

%V 每年的第几周，使用基于周的年

%w 十进制表示的星期几（值从0到6，星期天为0）

%W 每年的第几周，把星期一做为第一天（值从0到53）

%x 标准的日期串

%X 标准的时间串

%y 不带世纪的十进制年份（值从0到99）

%Y 带世纪部分的十制年份

%z，%Z 时区名称，如果不能得到时区名称则返回空字符。

%% 百分号
