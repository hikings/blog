---
layout:     post
title:      并发编程的春天
keywords:
category:  Concurrent & Parallelism
tags:
    - Concurrent
    - Parallelism
date:        2016/5/7 23:19:32
description: 并发编程的春天

---
  - 在过去的30年里，计算机的性能是在摩尔定律的推动下，从现在开始，这将由Amdahl's Law决定。编写代码，有效地利用多个处理器可以是非常具有挑战性的。" -Doron Rajwan　　
  - Amdahl's Law：每个程序都分为串行与并行部分，降低串行的比重，可提高程序的效率。
  
  - 现在系统面临下面的挑战：
    * 单节点上如何充分的利用多核
    * 云化或分布式网络化环境下越来越复杂的编程问题
    * 负责的部署和一致性检测难度
<!--more-->

  - 并行并不是新事物
    * SUN 的 SPARC 并行和可靠性一直优于 x86，但是输给了成本。（现在uinx是不是都转到linux上了？）
    * x86 直到 AMD 出来搅局，才逐步转向多核，但是很明显，桌面应用受限于程序员的水平，仍然不能重复利用多核的能力
    * GPU 提供指令级别的并行能力，挖掘比特币中大放异彩
  
  
  - 就传统利用线程、进程模型的应用或者服务没有办法利用多核的优势这个问题，现在发现有一些新思路
    * scale spark , akka 的出色表现，特点是 actor 模型，在 Apache 的 Flime 项目中也选择的 akka
    * google 推出 go, 这个面向工程的语言引入了CSP编程模型，Go语言的动态栈使得轻量级线程goroutine的初始栈可以很小，因此创建一个goroutine的代价很小，创建百万级的goroutine完全是可行的。
    * Java 1.5 并行提供了标准Concurrent库, Java7引入forkjoin并行计算，Java8流和 lamda
      - 从Java 1.5以后增加了需要同步工具如CycicBariier, CountDownLatch 和 Sempahore，你应当优先使用这些同步工具，而不是去思考如何使用线程的wait和notify，通过BlockingQueue实现生产-消费的设计比使用线程的wait和notify要好得多
      - 使用并发集合Collection而不是加了同步锁的集合. Java提供了 ConcurrentHashMap CopyOnWriteArrayList 和 CopyOnWriteArraySet以及BlockingQueue Deque and BlockingDeque五大并发集合
    * 顺便也提一下 netty，在过去BIO的模式下，web服务器的并发是很低的，但是Netty使用了NIO，现在已经很少人选择 Apache和Tomcat
    * 函数式编程也有翻身的趋势，现在使用aws的云服务进行大数据计算，并不需要多少分布式只是，可以聚焦在函数上
      

  - 还有问题就是为什么并行编程很难

  - 后续将逐步展开下面的话题
    * Reactive与Actors
    * NIO
    * Goroutine与Channel

