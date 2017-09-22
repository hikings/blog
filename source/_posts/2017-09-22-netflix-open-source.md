
---
layout:     post
title:      Netflix 开源项目推荐
keywords:
category:   MachineLearning
tags:
      - netflix
      - opensource

date:        2017/9/22 12:01:33
description: tensorflow

---
<!-- TOC -->

- [联合作业执行引擎 Netflix Genie](#联合作业执行引擎-netflix-genie)
- [持续交付平台 Spinnaker](#持续交付平台-spinnaker)
- [云操作容错解决方案 SimianArmy](#云操作容错解决方案-simianarmy)
- [分布式系统的延迟和容错库 Hystrix](#分布式系统的延迟和容错库-hystrix)
- [数据管道服务 Suro](#数据管道服务-suro)
- [分布式内存数据云存储 EVCache](#分布式内存数据云存储-evcache)
- [云端负载均衡工具 Eureka](#云端负载均衡工具-eureka)

<!-- /TOC -->

## 联合作业执行引擎 Netflix Genie
https://www.oschina.net/p/netflix-genie
Genie 是 Netflix 联合作业执行引擎，提供 REST-ful APIs，运行各种类型的大数据作业，比如 Hadoop，Pig，Hive，Spark，Presto，Sqoop 等等。Genie 同时提供 APis 来管理在上面运行的大量的分布式进程集群配置，命令和应用。

基于 Java 的 Mesos 调度器 Fenzo
https://www.oschina.net/p/fenzo
Fenzo 是一个使用 Java 语言编写的 Apache Mesos 框架的可扩展调度器。Fenzo 负责管理 Netflix 内部所有服务的调度和资源分配。
Fenzo 支持使用两种互补的策略集群自动缩放：
  ● 基于阈值
  ● 基于资源短缺分析

## 持续交付平台 Spinnaker
https://www.oschina.net/p/spinnaker
Spinnaker 是一个持续交付平台，它定位于将产品快速且持续的部署到多种云平台上。
Spinnaker 主要特性：配置一次，随时运行；随地部署，集中化管理；开源。
Spinnaker 组件：


## 云操作容错解决方案 SimianArmy
https://www.oschina.net/p/simianarmy
SimianArmy 让你的云操作保持最佳状态的工具。Chaos Monkey 是伸缩性很强的工具，是 SimianArmy 的第一个成员，能帮助应用更好的容忍随机故障实例。
Simian Army 是 Netflix 实例的随机故障测试，用于验证可靠性。

## 分布式系统的延迟和容错库 Hystrix
https://www.oschina.net/p/hystrix
Netflix（一家在线影片租赁商）近日开源了其Hystrix库，这是一个针对分布式系统的延迟和容错库。
Hystrix 供分布式系统使用，提供延迟和容错功能，隔离远程系统、访问和第三方程序库的访问点，防止级联失败，保证复杂的分布系统在面临不可避免的失败时，仍能有其弹性。


## 数据管道服务 Suro
https://www.oschina.net/p/suro
Netflix 开源了一个叫做Suro的工具，它能够在数据被发送到不同的数据平台（如Hadoop、Elasticsearch）之前，收集不同应用服务器上的事件数据，这项创新技术具备成为大数据主流实践的潜力
Suro 是数据管道服务，用来收集，聚合和调度大数据应用事件，包括日志记录数据。


## 分布式内存数据云存储 EVCache
https://www.oschina.net/p/evcache
EVCache 是基于 memcached & spymemcached 的缓存解决方案，主要用在 AWS EC2 基础设施上，为了顺畅的使用数据而开发的缓存解决方案。 
EVCache 是一个缩写的单词，包含：
  ● Ephemeral  - 数据存储是短暂的，有自身的 TTL (Time To Live).
  ● Volatile  - 数据可以在任何时候消失
  ● Cache - 一个内存键值存储

## 云端负载均衡工具 Eureka
https://www.oschina.net/p/eureka
Netflix 填补了Amazon Web Services的大缺口，发布了云端负载均衡工具Eureka。
Netflix通过开源工具让亚马逊的服务变得更可靠。亚马逊提供了一个负载均衡工具Elastic Load Balancer，但针对的是终端用户Web流量服务器，而Eureka针对的是中间层服务器的负载均衡。

