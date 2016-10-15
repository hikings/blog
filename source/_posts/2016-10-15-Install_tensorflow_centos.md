---
layout:     post
title:      Install tensorflow on centos
keywords:
category:   MachineLearning
tags:
      - MachineLearning
      - Tensorflow
      - Centos
date:        2016/10/7 12:01:33
description: tensorflow

---


[root@localhost ~]# pip list
Cython (0.24.1)
funcsigs (1.0.2)
mock (2.0.0)
numpy (1.11.2)
pandas (0.19.0)
pbr (1.10.0)
pip (8.1.2)
protobuf (3.0.0)
python-dateutil (2.5.3)
pytz (2016.7)
setuptools (28.4.0)
six (1.10.0)
tensorflow (0.11.0rc0)
wheel (0.29.0)
[root@localhost ~]# ls		

<!--more-->
https://www.tensorflow.org/versions/r0.11/get_started/os_setup.html
# Ubuntu/Linux 64-bit, CPU only, Python 2.7
pip install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.11.0rc0-cp27-none-linux_x86_64.whl

Successfully installed setuptools-28.5.0 tensorflow-0.11.0rc0


[root@localhost part2]# python wide.py
Traceback (most recent call last):
  File "wide.py", line 2, in <module>
    import tensorflow as tf
  File "/usr/local/python2.7/lib/python2.7/site-packages/tensorflow/__init__.py", line 23, in <module>
    from tensorflow.python import *
  File "/usr/local/python2.7/lib/python2.7/site-packages/tensorflow/python/__init__.py", line 49, in <module>
    from tensorflow.python import pywrap_tensorflow
  File "/usr/local/python2.7/lib/python2.7/site-packages/tensorflow/python/pywrap_tensorflow.py", line 28, in <module>
    _pywrap_tensorflow = swig_import_helper()
  File "/usr/local/python2.7/lib/python2.7/site-packages/tensorflow/python/pywrap_tensorflow.py", line 24, in swig_import_helper
    _mod = imp.load_module('_pywrap_tensorflow', fp, pathname, description)
ImportError: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by /usr/local/python2.7/lib/python2.7/site-packages/tensorflow/python/_pywrap_tensorflow.so)
1.试图运行程序，提示"libc.so.6: version `GLIBC_2.14' not found",原因是系统的glibc版本太低，软件编译时使用了较高版本的glibc引起的：

2.查看系统glibc支持的版本：
[cpp] view plain copy
[ghui@StuOS bin]$ strings /lib64/libc.so.6 |grep GLIBC_  
GLIBC_2.2.5  
GLIBC_2.2.6  
GLIBC_2.3  
GLIBC_2.3.2  
GLIBC_2.3.3  
GLIBC_2.3.4  
GLIBC_2.4  
GLIBC_2.5  
GLIBC_2.6  
GLIBC_2.7  
GLIBC_2.8  
GLIBC_2.9  
GLIBC_2.10  
GLIBC_2.11  
GLIBC_2.12  
GLIBC_PRIVATE 

[root@localhost part2]# rpm -qa |grep glibc
glibc-2.12-1.192.el6.i686
glibc-2.12-1.192.el6.x86_64
vzdummy-glibc-2.12-1.7.el6.noarch
glibc-devel-2.12-1.192.el6.x86_64
glibc-common-2.12-1.192.el6.x86_64
glibc-headers-2.12-1.192.el6.x86_64

3.可以看到最高只支持2.12版本，所以考虑编译解决这个问题：
       a. 到http://www.gnu.org/software/libc/下载最新版本，我这里下载了glibc-2.14.tar.xz 这个版本，解压到任意目录准备编译
       b.这里解压到/var/VMdisks/glibc-2.14/

c.在glibc源码目录建立构建目录，并cd进入构建目录
[cpp] view plain copy
[ghui@StuOS glibc-2.14]$ mkdir build  
[cpp] view plain copy
[ghui@StuOS glibc-2.14]$ cd build  

    d.运行configure配置，make && sudo  make install
[cpp] view plain copy
[ghui@StuOS build]$ ../configure --prefix=/opt/glibc-2.14  
[ghui@StuOS build]$ make -j4   
[ghui@StuOS build]$ sudo make install  
[sudo] password for ghui:   

4.临时修改环境变量
[cpp] view plain copy
[ghui@StuOS bin]$ export LD_LIBRARY_PATH=/opt/glibc-2.14/lib:$LD_LIBRARY_PATH  

在CentOS 6环境下升级Android SDK的platform-tools版本到最新的23时，报/lib64/libc.so.6: version `GLIBC_2.14' not found错误，升级glibc2.14出现glibc-2.14/etc/ld.so.conf: No such file or directory错误，使用命令touch /glibc-2.14/etc/ld.so.conf不再报错，但查看glibc安装版本还是不对，系统的glibc版本始终是glibc-2.12，也就是依然没有安装进去，使用export LD_LIBRARY_PATH=/opt/glibc-2.14/lib:$LD_LIBRARY_PATH修改过临时变量，都不能解决
cp -r /etc/ld.so.c* /opt/glibc-2.14/etc/ 
ln -sf /opt/glibc-2.14/lib/libc-2.14.so /lib64/libc.so.6       

You cannot update glibc on Centos 6 safely. However you can install 2.14 alongside 2.12 easily, then use it to compile projects etc. Here is how:

mkdir ~/glibc_install; cd ~/glibc_install
wget http://ftp.gnu.org/gnu/glibc/glibc-2.14.tar.gz
tar zxvf glibc-2.14.tar.gz
cd glibc-2.14
mkdir build
cd build
../configure --prefix=/opt/glibc-2.14
make && make install
export LD_LIBRARY_PATH=/opt/glibc-2.14/lib


cd glibc-2.17
mkdir build
cd build
../configure --prefix=/opt/glibc-2.17
make && make install
export LD_LIBRARY_PATH=/opt/glibc-2.17/lib


diJHMKULUQKY