---
layout:     post
title:      一个非常优秀的分布式系统课程，也可用来学习Go语言
keywords:
category:  Distributed-Computer-Systems
tags:
      - DS
      - PAPER
      - GoLang
date:        2016/4/9 12:10:33
description: 一个非常优秀的分布式系统课程，也可用来学习Go语言

---

## 6.824是MIT的分布式系统课程，

       学习语言和知识还是动手才能发现不足，这个课程非常棒，既包含了分布式领域最实用的理论又结合了实验进行演练。
       在此做个推荐。

　　- 以前的课程实现是Cpp实现一个分布式文件系统，可以看12年的课程。
       - 现在课程进行了刷新，并且语言更新为Go，现在正在切换成Go语言开发。从新学习一次这个课程和相关的Papers。

<!--more-->

 - Lab 1: MapReduce
 - 实现任务分配 ，支持将任务分发给线程
 - Lab 2: Primary/Backup Key/Value Service
 - 考查主从备份的实现
 - Lab 3: Paxos-based Key/Value Service
 - 实现paxos协议
 - 利用paxos协议，实现一个多副本的服务器，保证副本间的一致
 - Lab 4: Sharded Key/Value Service
 - 实现数据分片服务器
 - 数据分片的一致性：节点的加入，离开等，导致数据分片的移动
 - Lab 5: Persistence
 - 数据持久化
 - 重启支持：能够在磁盘数据丢失与未丢失情况下，进行恢复



[6.824 - Spring 2016 –MIT 6.824主页](https://pdos.csail.mit.edu/6.824/index.html)
