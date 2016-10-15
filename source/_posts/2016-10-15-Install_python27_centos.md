---
layout:     post
title:      Install python27 on centos6
keywords:
category:   MachineLearning
tags:
      - Python
      - Centos
date:        2016/10/7 22:01:33
description: python27

---


在工作环境中使用的是python 2.7.*，但是CentOS 6.4中默认使用的python版本是2.6.6，故需要升级版本。

安装步骤如下：

1,先安装GCC，用如下命令yum install gcc gcc-c++

2,下载python-2.7.5.tar.gz文件，修改文件权限chmode +x python-7.5.tar.gz

3,解压tar文件，tar -xzvf python-2.7.5.tar.gz

4,cd python-2.7.5

./configure --prefix=/usr/local/python27 ### 注意：安装在新目录，防止覆盖系统默认安装的python

make && make install

5、建立软连接，使系统默认的python指向python27

mv /usr/bin/python /usr/bin/python2.6.6.old

ln -s /usr/local/bin/python27 /usr/bin/python

已经安装完成python的安装或升级的全部操作了，我们再来看一下现在的python的版本：

# python -V

Python 2.7.5

虽然现在python已经安装完成，但是使用yum命令会有问题——yum不能正常工作：

# yum list

There was a problem importing one of the Python modules

required to run yum. The error leading to this problem was:

No module named yum

Please install a package which provides this module, or

verify that the module is installed correctly.

It's possible that the above module doesn't match the

current version of Python

这是因为yum默认使用的python版本是2.6.6，到哪是现在的python版本是2.7.5，故会出现上述问题，只需要该一下yum的默认python配置版本就行了：

#vi /usr/bin/yum

将文件头部的#!/usr/bin/python改为

#!/usr/bin/python2.6

https://pypi.python.org/pypi/setuptools
wget https://bootstrap.pypa.io/ez_setup.py -O - | python

<!--more-->


Centos 6.4 安装Python 2.7 python-pip

1. 准备工作

下载源码包

wget http://python.org/ftp/python/2.7.3/Python-2.7.3.tar.bz2
查看是否安装make工具

~#rpm -qa|grep make
automake-1.11.1-4.el6.noarch
make-3.81-20.el6.x86_64
如果没有安装make工具

yum -y install gcc automake autoconf libtool make
查看是否安装zlib库

~#rpm -qa|grep zlib
zlib-devel-1.2.3-29.el6.x86_64
zlib-1.2.3-29.el6.x86_64
安装zlib

yum install zlib-devel
检查是否安装ssl 库

复制代码
~#rpm -qa|grep openssl
openssl-devel-1.0.1e-16.el6_5.x86_64
openssl-static-1.0.1e-16.el6_5.x86_64
openssl098e-0.9.8e-17.el6.centos.2.x86_64
openssl-1.0.1e-16.el6_5.x86_64
openssl-perl-1.0.1e-16.el6_5.x86_64
复制代码
安装openssl

yum install openssl*
安装bzip2依赖库

yum install -y bzip2*
2. 编译安装

cp Python-2.7.3.tar.bz2 /usr/src/
tar -jxvf Python-2.7.3.tar.bz2
vi Modules/Setup.dist
 找到   

复制代码
#SSL=/usr/local/ssl
#_ssl _ssl.c \
#       -DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
#       -L$(SSL)/lib -lssl -lcrypto
......
#zlib zlibmodule.c -I$(prefix)/include -L$(exec_prefix)/lib -lz 
复制代码
 把注释去掉

 编译

./configure --prefix=/usr/local/python2.7
make all 
make install
make clean
make distclean
 安装成功

~#/usr/local/python2.7/bin/python2.7
Python 2.7.3 (default, Dec 18 2013, 15:43:35) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-4)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> 
cd /usr/local/python2.7
python setup.py install
建立python2.7 软链

~#mv /usr/bin/python /usr/bin/python.bak
~#ln -s /usr/local/python2.7/bin/python2.7 /usr/bin/python2.7
~#ln -s /usr/bin/python2.7 /usr/bin/python
3. 解决yum无法使用的问题

复制代码
~#yum update
There was a problem importing one of the Python modules
required to run yum. The error leading to this problem was:

   No module named yum

Please install a package which provides this module, or
verify that the module is installed correctly.

It's possible that the above module doesn't match the
current version of Python, which is:
2.7.3 (default, Dec 18 2013, 15:43:35) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-4)]

If you cannot solve this problem yourself, please go to 
the yum faq at:
  http://yum.baseurl.org/wiki/Faq
复制代码
因为centos 6.4 下yum默认使用的是python2.6

复制代码
vi /usr/bin/yum
----------------------------------------------------
#!/usr/bin/python
import sys
try:
    import yum
except ImportError:
.......
复制代码
修改为

#!/usr/bin/python2.6
........
4. 安装python-pip工具

先安装setup-tools

wget https://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg  --no-check-certificate
chmod +x setuptools-0.6c11-py2.7.egg
sh setuptools-0.6c11-py2.7.egg
安装pip

复制代码
wget https://pypi.python.org/packages/source/p/pip/pip-1.3.1.tar.gz --no-check-certificate
cp pip-1.3.1.tar.gz /usr/src/
tar zxvf pip-1.3.1.tar.gz
cd pip-1.3.1
python setup.py install
ln -s /usr/local/python2.7/bin/pip /usr/bin/pip
复制代码