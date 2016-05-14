---
layout:     post
title:      并发编程的新生
keywords:
category:  [Concurrent,parallelism]
tags:		[Concurrent,parallelism]
date:        2016/5/7 23:19:32
description: 并发编程的新生

---
  - 在过去的30年里，计算机的性能是在摩尔定律的推动下，从现在开始，这将由Amdahl's Law决定。编写代码，有效地利用多个处理器可以是非常具有挑战性的。" -Doron Rajwan　　
  - Amdahl's Law：每个程序都分为串行与并行部分，降低串行的比重，可提高程序的效率。
<!--more-->

  - SUN 输给了 Intel x86
  - AMD 提出了 x64
  - 传统利用线程、进程模型的应用或者服务没有办法利用多核的优势
  - scale spark , akka 的出色表现
  - google 推出 go, 面向工程的语言
  - java 1.5 重大变化, Java8流和forkjoin并行计算 lamda
    - 从Java 1.5以后增加了需要同步工具如CycicBariier, CountDownLatch 和 Sempahore，你应当优先使用这些同步工具，而不是去思考如何使用线程的wait和notify，通过BlockingQueue实现生产-消费的设计比使用线程的wait和notify要好得多
    - 使用并发集合Collection而不是加了同步锁的集合. Java提供了 ConcurrentHashMap CopyOnWriteArrayList 和 CopyOnWriteArraySet以及BlockingQueue Deque and BlockingDeque五大并发集合

    - 为什么并行编程很难

    - Reactive与Actors
    - NIO
    - Goroutine与Channel

