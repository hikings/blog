---
layout:     post
title:      谷歌论文 Borg、Omega and Kubernetes
keywords:
category:   Distributed-Computer-Systems
tags:
      - DS
      - PAPER
      - Containers
date:        2016/10/7 12:01:33
description: 分布式领域论文目录

---


# google论文系列

# Borg、Omega and Kubernetes
## 谷歌十余年从三个容器管理系统中得到的经验教训 
## Lessons learned from three container-management systems over a decade

--------------
* [英文版原文链接](http://queue.acm.org/detail.cfm?id=2898444)
* 中文翻译参考了[韩佳瑶的翻译](http://geek.csdn.net/news/detail/63070)并做了修正

> 从2000年以来，谷歌基于容器研发三个容器管理系统，分别是Borg、Omega和Kubernetes。这篇论文由这三个容器集群管理系统长年开发维护的谷歌工程师Brendan Burns、Brian Grant、David Oppenheimer、Eric Brewer和John Wilkes于近日发表，阐述了谷歌从Borg到Kubernetes这个旅程中所获得知识和经验教训。
--------------
<!--more-->

尽管对软件容器广泛传播的兴趣是最近的现象，但在谷歌我们大规模使用Linux容器已经有10多年了，而且期间我们建了三种不同的容器管理系统。
Though widespread interest in software containers is a relatively recent phenomenon, at Google we have been managing Linux containers at scale for more than ten years and built three different container-management systems in that time. 

每一个系统都受之前的系统影响颇深，尽管它们的诞生是出于不同原因。这篇文章描述了我们在研发和使用它们的过程中得到的经验教训。
Each system was heavily influenced by its predecessors, even though they were developed for different reasons. This article describes the lessons we've learned from developing and operating them.

第一个在谷歌被开发出来的统一的容器管理系统，在我们内部称之为“Borg”，它管理着长时间运行的生产服务和批处理服务。这两类任务之前是由两个分离开的系统来管理的：
* Babysitter
* Global Work Queue。
The first unified container-management system developed at Google was the system we internally call Borg.7 It was built to manage both long-running services and batch jobs, which had previously been handled by two separate systems: Babysitter and the Global Work Queue.

The latter's architecture 极大地影响了Borg，但却只是针对批量服务的，且两者都在Linux control groups诞生之前。
The latter's architecture strongly influenced Borg, but was focused on batch jobs; both predated Linux control groups. 
 
Borg将这两种应用所用的机器统一成一个池子，这样得以提高资源利用率，进而降低成本。
Borg shares machines between these two types of applications as a way of increasing resource utilization and thereby reducing costs. 

之所以可以实现这样的机器资源共享，是因为可以拿到Linux内核的容器支持（确实，Google对Linux内核的容器代码贡献了很多），这使得在对时限敏感的、且面对用户的服务和占用很多CPU资源的批处理进程提供了更好的隔离。
Such sharing was possible because container support in the Linux kernel was becoming available (indeed, Google contributed much of the container code to the Linux kernel), which enabled better isolation between latency-sensitive user-facing services and CPU-hungry batch processes.


由于越来越多的应用被开发并运行在Borg上，我们的应用和底层团队开发了一个广泛的工具和服务的生态系统。这些系统提供了配置和更新job的机制，能够预测资源需求，动态地对在运行中的程序推送配置文件、服务发现、负载均衡、自动扩容、机器生命周期的管理、额度管理以及更多。
As more and more applications were developed to run on top of Borg, our application and infrastructure teams developed a broad ecosystem of tools and services for it. These systems provided mechanisms for configuring and updating jobs; predicting resource requirements; dynamically pushing configuration files to running jobs; service discovery and load balancing; auto-scaling; machine-lifecycle management; quota management; and much more. 

这个生态系统的发展源自谷歌内部不同团队的需求，发展的结果成为了异构的、ad-hoc系统的集合，Borg的使用者能够用几种不同的配置语言和进程来配置和沟通。
The development of this ecosystem was driven by the needs of different teams inside Google, and the result was a somewhat heterogeneous, ad-hoc collection of systems that Borg's users had to configure and interact with, using several different configuration languages and processes. 

由于Borg的规模、功能的广泛性和超高的稳定性，Borg在谷歌内部依然是主要的容器管理系统。
Borg remains the primary container-management system within Google because of its scale, breadth of features, and extreme robustness.


Omega，作为Borg的延伸，它的出现是出于提升Borg生态系统软件工程的愿望。
Omega,6 an offspring of Borg, was driven by a desire to improve the software engineering of the Borg ecosystem. 

Omega应用到了很多在Borg内已经被认证的成功的模式，但是是从头开始来搭建以期更为一致的构架。
It applied many of the patterns that had proved successful in Borg, but was built from the ground up to have a more consistent, principled architecture. 

Omega存储了基于Paxos、围绕transaction的集群的状态，能够被集群的控制面板（比如调度器）接触到，使用了优化的进程控制来解决偶尔发生的冲突。
Omega stored the state of the cluster in a centralized Paxos-based transaction-oriented store that was accessed by the different parts of the cluster control plane (such as schedulers), using optimistic concurrency control to handle the occasional conflicts. 

这种分离允许Borgmaster的功能被区分成几个并列的组建，而不是把所有变化都放到一个单独的、巨石型的master里。
This decoupling allowed the Borgmaster's functionality to be broken into separate components that acted as peers, rather than funneling every change through a monolithic, centralized master. 

许多Omega的创新（包括多个调度器）都被收录进了Borg。
Many of Omega's innovations (including multiple schedulers) have since been folded into Borg.

谷歌研发的第三个容器管理系统是Kubernetes。Kubernetes的研发和认知背景，是针对在谷歌外部的对Linux容器感兴趣的开发者以及谷歌在公有云底层商业增长的考虑。和Borg、Omega完全是谷歌内部系统相比，Kubernetes是开源的。
The third container-management system developed at Google was Kubernetes.4 It was conceived of and developed in a world where external developers were becoming interested in Linux containers, and Google had developed a growing business selling public-cloud infrastructure. Kubernetes is open source—a contrast to Borg and Omega, which were developed as purely Google-internal systems. 

像Omega一样，Kubernetes在其核心有一个被分享的持久存储，有组件来检测相关ojbect的变化。跟Omega不同的是，Omega把存储直接暴露给信任的控制面板的组件，而在Kubernete中，是要完全由domain-specific的提供更高一层的版本控制认证、语义、政策的REST API来接触，以服务更多的用户。
Like Omega, Kubernetes has at its core a shared persistent store, with components watching for changes to relevant objects. In contrast to Omega, which exposes the store directly to trusted control-plane components, state in Kubernetes is accessed exclusively through a domain-specific REST API that applies higher-level versioning, validation, semantics, and policy, in support of a more diverse array of clients. 

更重要的是，Kubernetes是由一支在集群层面应用开发能力更强的开发者开发的，他们主要的设计目标是用更容易的方法去部署和管理复杂的分布式系统，同时仍然能通过容器所提升的使用效率来受益。
More importantly, Kubernetes was developed with a stronger focus on the experience of developers writing applications that run in a cluster: its main design goal is to make it easy to deploy and manage complex distributed systems, while still benefiting from the improved utilization that containers enable.


这篇文章描述了谷歌从Borg到Kubernetes这个旅程中所获得知识和经验教训。
This article describes some of the knowledge gained and lessons learned during Google's journey from Borg to Kubernetes.

## 容器 Containers

历史上，第一个容器提供的仅仅是root file system的隔离（通过chroot），再加上FreeBSD jails提供额外的例如process ID这样的namespaces。
Historically, the first containers just provided isolation of the root file system (via chroot), with FreeBSD jails extending this to additional namespaces such as process IDs. 

Solaris后来成为先锋并且做了很多加强的探索。Linux control groups（cgroups）运用了很多这些想法，在这个领域的发展一直延续到今天。
Solaris subsequently pioneered and explored many enhancements. Linux control groups (cgroups) adopted many of these ideas, and development in this area continues today.

容器的资源隔离特性使得谷歌的资源使用率远远高出业界同行。例如，Borg使用容器将对延迟敏感、面向用户的任务和批量任务放在相通的物理机上，并会为它们预留更多的资源，这样可以解决load spikes、fail-over等问题。
The resource isolation provided by containers has enabled Google to drive utilization significantly higher than industry norms. For example, Borg uses containers to co-locate batch jobs with latency-sensitive, user-facing jobs on the same physical machines. The user-facing jobs reserve more resources than they usually need—allowing them to handle load spikes and fail-over—and these mostly unused resources can be reclaimed to run batch jobs. 

容器提供的资源管理工具使这些得以实现，稳定的内核层面的资源隔离也使进程之间不互相干扰。
Containers provide the resource-management tools that make this possible, as well as robust kernel-level resource isolation to prevent the processes from interfering with one another.

我们通过在研发Borg的同时加强Linux容器的方式来获得成功。然而，隔离并不是完美的，容器在内核操作系统不能管理的资源隔离方面鞭长莫及，比如level 3 processor caches、内存带宽、以及容器需要被一个额外的安全层支持以抵抗云端的各种恶意攻击。
We achieved this by enhancing Linux containers concurrently with Borg's development. The isolation is not perfect, though: containers cannot prevent interference in resources that the operating-system kernel doesn't manage, such as level 3 processor caches and memory bandwidth, and containers need to be supported by an additional security layer (such as virtual machines) to protect against the kinds of malicious actors found in the cloud.


现代的容器不仅仅是隔离机制：它也包括镜像，即包含了在容器内能够让应用跑起来的文件。
A modern container is more than just an isolation mechanism: it also includes an image—the files that make up the application that runs inside the container. 

在谷歌内部，MPM（Midas Package Manager）被用来建造和部署容器镜像。
Within Google, MPM (Midas Package Manager) is used to build and deploy container images. 

在隔离机制和MPM之间同样的共生关系，也可以在Docker daemon和Docker镜像之间被发现。
The same symbiotic relationship between the isolation mechanism and MPM packages can be found between the Docker daemon and the Docker image registry.

在这篇文章剩余的篇幅中，我们会使用“容器”这个词来包含这两方面：运行时隔离和镜像。
In the remainder of this article we use the word container to encompass both of these aspects: the runtime isolation and the image.


### 面向应用的架构（Application-oriented infrastructure）
随着时间的推移，我们越来越清楚容器在更高一层使用时的好处。容器化能使数据中心从面向机器转为面向应用。这个部分讨论两个例子：
Over time it became clear that the benefits of containerization go beyond merely enabling higher levels of utilization. Containerization transforms the data center from being machine oriented to being application oriented. This section discusses two examples:

1. 容器封装了应用环境，把很多机器和操作系统的细节从应用开发者和部署底层那里抽象了出来。
• Containers encapsulate the application environment, abstracting away many details of machines and operating systems from the application developer and the deployment infrastructure.
2. 因为设计良好的容器和镜像的作用范围是一个很小的应用，因此管理容器意味着管理应用而非机器，极大简化了应用的部署和管理。
• Because well-designed containers and container images are scoped to a single application, managing containers means managing applications rather than machines. This shift of management APIs from machine-oriented to application-oriented dramatically improves application deployment and introspection.
 


### 应用环境 Application Environment
Linux内核里的cgroup、chroot和namespace的原本是为了保护应用不受周边杂乱邻里的影响。把这些和容器镜像组合起来创建一个抽象事物把应用从运行它们的（纷杂的）操作系统里隔离出来，提高了部署可靠性，也通过减少不一致性和冲突而加快了开发速度。
The original purpose of the cgroup, chroot, and namespace facilities in the kernel was to protect applications from noisy, nosey, and messy neighbors. Combining these with container images created an abstraction that also isolates applications from the (heterogeneous) operating systems on which they run. This decoupling of image and OS makes it possible to provide the same deployment environment in both development and production, which, in turn, improves deployment reliability and speeds up development by reducing inconsistencies and friction.






能让这个抽象事物得以实现的关键在于有一个自包含的镜像，它把一个应用几乎所有的依赖环境都打包然后部署在一个容器里。
The key to making this abstraction work is having a hermetic container image that can encapsulate almost all of an application's dependencies into a package that can be deployed into the container. 

如果这个过程做的正确，本地的外部环境就只剩下Linux内核的system-call interface. 
If this is done correctly, the only local external dependencies will be on the Linux kernel system-call interface. 

这个有限制的interface极大提高了镜像的便携性，它并不完美：应用仍然暴露给了OS interface，尤其是在socket选项的广泛表面上、/proc、和给ioctl call的所传参数上。
While this limited interface dramatically improves the portability of images, it is not perfect: applications can still be exposed to churn in the OS interface, particularly in the wide surface area exposed by socket options, /proc, and arguments to ioctl calls. 

我们希望后面类似 Open Container Initiative（OCI: https://www.opencontainers.org/）的努力能继续把容器抽象的表层能理清。
Our hope is that ongoing efforts such as the Open Container Initiative (https://www.opencontainers.org/) will further clarify the surface area of the container abstraction.


然而，容器提供的隔离和对环境依赖的最低性在谷歌内部颇为有效，容器也是谷歌内部底层唯一支持的应用程序运行实体。
Nonetheless, the isolation and dependency minimization provided by containers have proved quite effective at Google, and the container has become the sole runnable entity supported by the Google infrastructure. 

这样的好处之一就是在任何时候，谷歌在它一整台机器上只有很少量的OS版本部署，只需要很少量的人员来管理或升级。
One consequence is that Google has only a small number of OS versions deployed across its entire fleet of machines at any one time, and it needs only a small staff of people to maintain them and push out new versions.


有很多种方式可以实现这些自包含的镜像。There are many ways to achieve these hermetic images. 

在Borg里，程序的二进制文件在构建时静态地连接到公司范围内repo库里已知的library版本。
In Borg, program binaries are statically linked at build time to known-good library versions hosted in the companywide repository.5 

即便这样，Borg容器镜像也并非100%的自包含：因为应用会共享一个所谓的基础镜像，而不是将这个基础镜像打包在每个容器中。
Even so, the Borg container image is not quite as airtight as it could have been: applications share a so-called base image that is installed once on the machine rather than being packaged in each container. 


这个基础镜像包含了一些容器需要用到的utilities，比如tar和libc library，因此对基础镜像的升级会影响运行中的应用，偶尔也会变成一个比较严重的问题产生来源。
This base image contains utilities such as tar and the libc library, so upgrades to the base image can affect running applications and have occasionally been a significant source of trouble.


现在的容器镜像格式，比如Docker和ACI把容器进一步抽象，通过消除内在的主机OS环境依赖和要求外在的user命令来共享容器之间的镜像数据，使得距离理想的自包含性又近了一步。
More modern container image formats such as Docker and ACI harden this abstraction further and get closer to the hermetic ideal by eliminating implicit host OS dependencies and requiring an explicit user command to share image data between containers.

### 容器作为管理的单位 Containers as the Unit of Management
搭建面向容器而非机器的管理API把数据中心的关键字从机器转向了应用。
Building management APIs around containers rather than machines shifts the "primary key" of the data center from machine to application. 

这样有很多好处：
（1）减轻应用开发者和运维团队操心机器和系统具体细节的压力；
（2）提供底层团队弹性，得以升级新硬件和操作系统，但同时对在跑的应用和开发者影响甚小；
（3）它把管理系统收集的telemetry（比如CPU和内存用量的metrics）和应用而非机器绑在一起，极大提升了应用监测和检查，尤其是在扩容、机器失败或者运维导致应用实例迁移的时候。
This has many benefits: 
(1) it relieves application developers and operations teams from worrying about specific details of machines and operating systems; 
(2) it provides the infrastructure team flexibility to roll out new hardware and upgrade operating systems with minimal impact on running applications and their developers; 
(3) it ties telemetry collected by the management system (e.g., metrics such as CPU and memory usage) to applications rather than machines, which dramatically improves application monitoring and introspection, especially when scale-up, machine failures, or maintenance cause application instances to move.


容器能够注册通用的API使得管理系统和应用之间尽管互相不甚明了对方的实现细节，但也能信息流通。
Containers provide convenient points to register generic APIs that enable the flow of information between the management system and an application without either knowing much about the particulars of the other's implementation. 

在Borg里，这个API是一系列HTTP终端衔接到每一个容器上。举例来说，／healthz终端对编排器报告应用的健康状态。当一个不健康的应用被发现，它就被自动终止和重启。这种自我修复对可靠的分布式系统而言是一个关键的砖头块。（Kubernetes提供了类似的功能；健康检查使用了一个用户指定的HTTP终端或者跑在容器里的exec命令。）
In Borg, this API is a series of HTTP endpoints attached to each container. For example, the /healthz endpoint reports application health to the orchestrator. When an unhealthy application is detected, it is automatically terminated and restarted. This self-healing is a key building block for reliable distributed systems. (Kubernetes offers similar functionality; the health check uses a user-specified HTTP endpoint or exec command that runs inside the container.)

可以为容器提供或获取附加信息，并在各种用户接口显示。例如，Borg 应用程序可以提供动态更新的简单文本状态消息，而 Kubernetes 提供用key-value注解方式存储的对象的元数据中,可用于通讯应用结构体 。
Additional information can be provided by or for containers and displayed in various user interfaces. For example, Borg applications can provide a simple text status message that can be updated dynamically, and Kubernetes provides key-value annotations stored in each object's metadata that can be used to communicate application structure. 
可以通过容器本身或在管理系统中的其他参与者来设置这些注解（例如: 容器的更新版本的过程）来设置。
Such annotations can be set by the container itself or other actors in the management system (e.g., the process rolling out an updated version of the container).

容器也能提供其他面向应用的监测：举例来说，Linux内核cgroups提供关于应用的资源利用数据，这些可以和先前提到的由HTTP API导出的客户metrics一起被延伸。
Containers can also provide application-oriented monitoring in other ways: for example, Linux kernel cgroups provide resource-utilization data about the application, and these can be extended with custom metrics exported using HTTP APIs, as described earlier. 

这些数据能够实现例如自动扩容或cAdvisor这样一般工具的开发，这些开发记录或者使用这些metrics，不需要理解每个应用的细节。因为容器就是应用，就不再需要从在一个物理机或者虚拟机上跑的多个应用来多路分配信号。
This data enables the development of generic tools like an auto-scaler or cAdvisor3 that can record and use metrics without understanding the specifics of each application. Because the container is the application, there is no need to (de)multiplex signals from multiple applications running inside a physical or virtual machine.

这个更简单、更稳定一些，而且也允许对metrics和日志进行更细粒度的报告和控制。拿这个跟需要ssh到一台机器去跑top去比一下。尽管对开发者来说，ssh到他们的容器是可能的，但程序员很少会需要这么去做。
This is simpler, more robust, and permits finer-grained reporting and control of metrics and logs. Compare this to having to ssh into a machine to run top. Though it is possible for developers to ssh into their containers, they rarely need to.

监测，只是一个例子。面向应用的这个变化在管理底层上是有连带效果的。我们的负载均衡器并不平衡机器间的传输，它们是针对应用实例来平衡。
Monitoring is just one example. The application-oriented shift has ripple effects throughout the management infrastructure. Our load balancers don't balance traffic across machines; they balance across application instances. 


日志也是根据应用，而非机器，因此它们可以很容易的被收集以及在实例之间集合，而不受到多个应用或者操作系统的影响。我们可以查探到应用失败，更容易对这些失败的原因来归类，而不需要对它们进行机器层面信号的分离。
Logs are keyed by application, not machine, so they can easily be collected and aggregated across instances without pollution from multiple applications or system operations. We can detect application failures and more readily ascribe failure causes without having to disentangle them from machine-level signals. Fundamentally, because the identity of an instance being managed by the container manager lines up exactly with the identity of the instance expected by the application developer, it is easier to build, manage, and debug applications.

最后，尽管到目前为止，我们对应用的关注和对容器的关注是1:1，但在现实中我们使用在同一台机器上联动的容器：最外面的容器提供一个资源池，里面的这些容器提供部署隔离。在Borg,最外面那层容器被称为资源调配器（或者alloc），在Kubernetes里，被称为pod。Borg也允许最顶端的应用容器跑在alloc的外面，这个带来了很多不方便，所以Kubernetes把这些规范化并且总是在一个顶端的pod里来跑应用容器，即便这个pod只有单一的一个容器。
Finally, although so far we have focused on applications being 1:1 with containers, in reality we use nested containers that are co-scheduled on the same machine: the outermost one provides a pool of resources; the inner ones provide deployment isolation. In Borg, the outermost container is called a resource allocation, or alloc; in Kubernetes, it is called a pod. Borg also allows top-level application containers to run outside allocs; this has been a source of much inconvenience, so Kubernetes regularizes things and always runs an application container inside a top-level pod, even if the pod contains a single container.

一个普遍的使用样式，是用一个pod来装一个复杂应用的实例。应用的主要部分在它其中一个容器（child containers）里，其他容器跑着支持功能，例如日志处理。跟把这些功能组合到一个单一的二进制相比，这使得开发团队开发不同功能的部件容易很多，也提高了稳定性（即便主体应用有新的东西进来，日志发送依然可以继续运行）和可编辑性。
A common use pattern is for a pod to hold an instance of a complex application. The major part of the application sits in one of the child containers, and other containers run supporting functions such as log rotation or click-log offloading to a distributed file system. Compared to combining the functionality into a single binary, this makes it easy to have different teams develop the distinct pieces of functionality, and it improves robustness (the offloading continues even if the main application gets wedged), composability (it's easy to add a new small support service, because it operates in the private execution environment provided by its own container), and fine-grained resource isolation (each runs in its own resources, so the logging system can't starve the main app, or vice versa).

### 编排只是开始，不是结束 Orchestration is the Beginning, Not the End

原始的Borg系统可以在共享的机器上跑不同的工作负荷来提高资源利用率。但在Borg内支持服务的迅速进化显示，容器管理的本质只是开发和管理可靠的分布式系统的开始，很多不同的系统在Borg上和周边被开发，用来提高Borg所提供的基本的容器管理服务。下面这个不完整的列表给出了这些服务大概的一个范围和多样性：
  ● 命名和服务发现（Borg Name Service或BNS）；
  ● Master election（用Chubby）；
  ● 面向应用的负载均衡；
  ● 横向（实例数量）和纵向（实例尺寸）的自动扩容；
  ● 发布工具，用来管理新二进制和配置数据；
  ● 工作流程工具（例如允许跑分析多任务的pipelines在不同阶段有互相环境依赖）；
  ● 监测工具用来收集关于容器的信息，集合这些信息、发布到dashboard上，或者用它来激发预警。
The original Borg system made it possible to run disparate workloads on shared machines to improve resource utilization. The rapid evolution of support services in the Borg ecosystem, however, showed that container management per se was just the beginning of an environment for developing and managing reliable distributed systems. Many different systems have been built in, on, and around Borg to improve upon the basic container-management services that Borg provided. The following partial list gives an idea of their range and variety:

• Naming and service discovery (the Borg Name Service, or BNS).
• Master election, using Chubby.2
• Application-aware load balancing.
• Horizontal (number of instances) and vertical (size of an instance) autoscaling.
• Rollout tools that manage the careful deployment of new binaries and configuration data.
• Workflow tools (e.g., to allow running multijob analysis pipelines with interdependencies between the stages).
• Monitoring tools to gather information about containers, aggregate it, present it on dashboards, and use it to trigger alerts.


构建这些服务是用来解决应用开发团队所经历的问题。成功的服务被广泛采用，那其他开发者就受益。不幸的是，这些工具常常选一些怪癖的API，conventions（比如文件位置）和Borg的深度结合。一个副作用就是增加了Borg生态系统部署应用的复杂性。
These services were built organically to solve problems that application teams experienced. The successful ones were picked up, adopted widely, and made other developers' lives easier. Unfortunately, these tools typically picked idiosyncratic APIs, conventions (such as file locations), and depth of Borg integration. An undesired side effect was to increase the complexity of deploying applications in the Borg ecosystem.

Kubernetes企图通过对API采用一种一致的方法来避免这种增加的复杂性。比如说，每一个Kubernetes的对象在它的描述里有三个基本的属性：对象的metadata、spec和状态（status）。


Kubernetes attempts to avert this increased complexity by adopting a consistent approach to its APIs. For example, every Kubernetes object has three basic fields in its description: Object Metadata, Specification (or Spec), and Status.

对象的metadata对系统中的所有对象都是一样的，它包含了例如对象名称、UID（特殊标示）、一个对象的版本号码（为了乐观的进程控制）以及标签（key-value对，见下面描述）。Spec和status的内容根据不同的对象类型会不同，但它们的概念是一样的：spec时用来描述对象的理想状态，而status提供了该对象目前当下的只读信息。
The Object Metadata is the same for all objects in the system; it contains information such as the object's name, UID (unique identifier), an object version number (for optimistic concurrency control), and labels (key-value pairs, see below). The contents of Spec and Status vary by object type, but their concept does not: Spec is used to describe the desired state of the object, whereas Status provides read-only information about the current state of the object.

这种统一的API带来很多好处，可以让我们更容易的了解系统，因为系统中所有对象都有类似的信息。另外，统一的API可以更容易地编写通用的工具来作用于所有对象，这样反过来也让使用者感觉更为连贯。通过对Borg和Omega的总结，Kubernetes建立在一整套可自由拆装的部件之上，可以由开发者任意延展。一个有共识的API和对象metadata结构可以使这个过程更为简单。
This uniform API provides many benefits. Concretely, learning the system is simpler: similar information applies to all objects. Additionally, writing generic tools that work across all objects is simpler, which in turn enables the development of a consistent user experience. Learning from Borg and Omega, Kubernetes is built from a set of composable building blocks that can readily be extended by its users. A common API and object-metadata structure makes that much easier. For example, the pod API is usable by people, internal Kubernetes components, and external automation tools. To further this consistency, Kubernetes is being extended to enable users to add their own APIs dynamically, alongside the core Kubernetes functionality.


一致性还可以通过在Kubernetes API内解构来完成。在API组建之间考虑进行一些分离意味着在更高层的服务上需要共享一些基本的构建组件。
Consistency is also achieved via decoupling in the Kubernetes API. Separation of concerns between API components means that higher-level services all share the same common basic building blocks. 

一个很好的例子是在Kubernetes的RC(replication controller)和它水平自动扩容系统之间的分离。一个RC保证了对某个角色（比如“前端”）理想的pod数量的存在。
A good example of this is the separation between the Kubernetes replica controller and its horizontal auto-scaling system. A replication controller ensures the existence of the desired number of pods for a given role (e.g., "front end"). 

自动扩容器，反过来，需要依赖这个能力并且简单地调整理想的pod数量，不需要担心pod如何生成和删除。自动扩容器的实现能够把精力集中在需求和使用的预测，忽略如何实现这些决定的细节。
The autoscaler, in turn, relies on this capability and simply adjusts the desired number of pods, without worrying about how those pods are created or deleted. The autoscaler implementation can focus on demand and usage predictions, and ignore the details of how to implement its decisions.

分离保证了多个关联但不同的组件共享一个相似的外表和感觉。举个例子，Kubernetes有三个不同的pod副本模式：
  ● ReplicationController ： 永远在运行的容器副本（比如web服务器）；
  ● DaemonSet ： 确保在集群里的每个节点上有一个单独的实例（例如日志代理）；
  ● Job： 一个知道如何从开始到结束运行一个（可能是并行的）批处理任务的run-to-completion的控制器。
  
Decoupling ensures that multiple related but different components share a similar look and feel. For example, Kubernetes has three different forms of replicated pods:
• ReplicationController: run-forever replicated containers (e.g., web servers).
• DaemonSet: ensure a single instance on each node in the cluster (e.g., logging agents).
• Job: a run-to-completion controller that knows how to run a (possibly parallelized) batch job from start to finish.



尽管在规则上有区别，所有这三个控制器都依赖共同的pod对象来制定它们想要运行在上面的容器。
Regardless of the differences in policy, all three of these controllers rely on the common pod object to specify the containers they wish to run.


一致性也可以通过不同Kubernetes组件上共同的设计形式来达到。在Borg、Omega和Kubernetes上用来提高系统弹性，有一个概念：“reconciliation controller loop”（清理控制器循环）,这个概念是来比较一个理想的状态（比如需要多少个pod才能来达到一个标签选择的query，即 label-selector query），和相对于观测到的状态（可以发现的这样的pod数量）来进行比较，然后采取行动去把这两个状态做到一致。


Consistency is also achieved through common design patterns for different Kubernetes components. The idea of a reconciliation controller loop is shared throughout Borg, Omega, and Kubernetes to improve the resiliency of a system: it compares a desired state (e.g., how many pods should match a label-selector query) against the observed state (the number of such pods that it can find), and takes actions to converge the observed and desired states. Because all action is based on observation rather than a state diagram, reconciliation loops are robust to failures and perturbations: when a controller fails or restarts it simply picks up where it left off.
The design of Kubernetes as a combination of microservices and small control loops is an example of control through choreography—achieving a desired emergent behavior by combining the effects of separate, autonomous entities that collaborate. This is a conscious design choice in contrast to a centralized orchestration system, which may be easier to construct at first but tends to become brittle and rigid over time, especially in the presence of unanticipated errors or state changes.


## 需要避免的事情 Things to Avoid
在研发这些系统的时候，我们也学到了许多关于哪些事情不该做，哪些事情值得去做的经验。我们把其中的一些写出来，期望后来者不再重蹈覆辙，而是集中精力去解决新问题。


While developing these systems we have learned almost as many things not to do as ideas that are worth doing. We present some of them here in the hopes that others can focus on making new mistakes, rather than repeating ours.

### 别让容器系统来管理port端口 Don't Make the Container System Manage Port Numbers
所有跑在Borg机器上的容器都共享主机的IP地址，所以Borg给容器分发了独特的port端口作为调度过程的一部分。一个容器当它移到一个新的机器上已经有时候如果在同样的机器上重启的话，会拿到一个新的端口号码。这意味着传统的例如像DNS（Domain Name System）网络服务需要被home-brew版本取代；因为服务的客户不会先验地知道给到服务的port端口，需要被告知；port端口号码不能被嵌在URL里，就需要以名字为基础的再次导向（redirection）机制；而且依赖于简单的IP地址的工具需要被重写来搞定IP：端口对的形式（port pairs）。


All containers running on a Borg machine share the host's IP address, so Borg assigns the containers unique port numbers as part of the scheduling process. A container will get a new port number when it moves to a new machine and (sometimes) when it is restarted on the same machine. This means that traditional networking services such as the DNS (Domain Name System) have to be replaced by home-brew versions; service clients do not know the port number assigned to the service a priori and have to be told; port numbers cannot be embedded in URLs, requiring name-based redirection mechanisms; and tools that rely on simple IP addresses need to be rewritten to handle IP:port pairs.


从我们在Borg的经验来看，我们决定Kubernetes可以来给每个pod制定IP地址，这样把网络身份（即IP地址）和应用身份能统一起来。这会使得在Kubernetes上跑现成的软件容易的多：应用可以随意使用静态已知的端口（比如80作为HTTP端口），已经存在的、熟悉的工具可以被用来做网络分段、带宽调节管理。所有流行的云平台提供网络的基础层，能够有每个pod的IP，在裸机上，可以使用SDN覆盖层或者配置L3路由来管理每个机器上的多个IP.
Learning from our experiences with Borg, we decided that Kubernetes would allocate an IP address per pod, thus aligning network identity (IP address) with application identity. This makes it much easier to run off-the-shelf software on Kubernetes: applications are free to use static well-known ports (e.g., 80 for HTTP traffic), and existing, familiar tools can be used for things like network segmentation, bandwidth throttling, and management. All of the popular cloud platforms provide networking underlays that enable IP-per-pod; on bare metal, one can use an SDN (Software Defined Network) overlay or configure L3 routing to handle multiple IPs per machine.

### 别仅仅只是给容器编号：给它们打标签 Don't Just Number Containers: Give Them Labels


如果你让用户很容易地创建容器，他们会倾向于创建很多，那么很快就会需要一种方式来管理和组织它们。Borg对于群组的相同的task提供了jobs（对于容器而言任务的名称）。一个job是一个压缩的容器（vector）装了一个或多个相同的task，从0开始计数。这提供了许多能量，而且很简单直白，但时间长了我们又会后悔它过于死板。比如说，当一个task死掉了，需要在另一台机器上被重新启动，在task这个vector上的相同的slot就要双倍的工作：既要指认这个新的备份，同时还要指向旧的那个，万一可能需要做debug。当task出现在vector的当中，那vector就有洞。因此vector很难去支持在Borg的一层上跨越多个集群的job.同时，也有潜在的、不期而遇的在Borg更新job的语意上（典型的是在做滚动升级的时候按照index标记来重启）和应用使用的task index标记(比如做一些sharding活着跨task的数据的分区)的互动：如果应用使用基于task index的range sharding，那么Borg的重启政策会导致拿不到数据，因为它会拉掉附近的任务。Borg也没有简单的办法去job里面增加跟应用有关的metadata，比如角色属性（比如“前端”）或者展示的状态（比如是canary），所以人们要把这些信息写到job名称里，这样他们可以用常规表达式（regular expression）来解析。
If you allow users to create containers easily, they tend to create lots of them, and soon need a way to group and organize them. Borg provides jobs to group identical tasks (its name for containers). A job is a compact vector of one or more identical tasks, indexed sequentially from zero. This provides a lot of power and is simple and straightforward, but we came to regret its rigidity over time. For example, when a task dies and has to be restarted on another machine, the same slot in the task vector has to do double duty: to identify the new copy and to point to the old one in case it needs to be debugged. When tasks in the middle of the vector exit, the vector ends up with holes. The vector makes it very hard to support jobs that span multiple clusters in a layer above Borg. There are also insidious, unexpected interactions between Borg's job-update semantics (which typically restarts tasks in index order when doing rolling upgrades) and an application's use of the task index (e.g., to do sharding or partitioning of a dataset across the tasks): if the application uses range sharding based on the task index, Borg's restart policy can cause data unavailability, as it takes down adjacent tasks. Borg also provides no easy way to add application-relevant metadata to a job, such as role (e.g., "frontend"), or rollout status (e.g., "canary"), so people encode this information into job names that they decode using regular expressions.


相比之下，Kubernetes主要使用标签（labels）来识别成组的容器。一个标签是一对key/value组，包含着容器信息可以用来识别对象。一个pod可能有这样的标签：role=frontend 和 stage=production，表明这个容器服务于前端生产。标签可以动态地被自动工具、用户来添加、移除和修改，也可以被其他不同的团队独立地来管理他们自己的标签。成组的对象，可以由label selectors来定义（比如 stage==production && role==frontend）。这些组（set）可以重叠，而且一个对象可以在多个的组（set）里，因此标签本身要比明确的对象列表或简单静态的属性更灵活。因为一个组（set）是由一个动态队列来定义的，一个新的组可以在任何时候被生成。在Kubernetes里label selectors是grouping（成组）的机制，来定义跨越多个实体的管理操作的范围。

即便在那样的环境里知道在一个set里的一个task的身份是很有帮助的（比如说静态角色的分配和工作分区或分片），适当的每个pod有标签可以被用来再次产生任务标示的效果，尽管这个是应用的责任（或者一些其他在Kubernetes外部的管理系统的责任）来提供这样的标签。标签和标签选择器提供了一个对这两者的最好的通用机制。

In contrast, Kubernetes primarily uses labels to identify groups of containers. A label is a key/value pair that contains information that helps identify the object. A pod might have the labels role=frontend and stage=production, indicating that this container is serving as a production front-end instance. Labels can be dynamically added, removed, and modified by either automated tools or users, and different teams can manage their own labels largely independently. Sets of objects are defined by label selectors (e.g., stage==production && role==frontend). Sets can overlap, and an object can be in multiple sets, so labels are inherently more flexible than explicit lists of objects or simple static properties. Because a set is defined by a dynamic query, a new one can be created at any time. Label selectors are the grouping mechanism in Kubernetes, and define the scope of all management operations that can span multiple entities.

Even in those circumstances where knowing the identity of a task in a set is helpful (e.g., for static role assignment and work-partitioning or sharding), appropriate per-pod labels can be used to reproduce the effect of task indexes, though it is the responsibility of the application (or some other management system external to Kubernetes) to provide such labeling. Labels and label selectors provide a general mechanism that gives the best of both worlds.


### 对所有权要谨慎 Be Careful with Ownership
在Borg里，tasks并不是独立于jobs存在的。生成一个job，也会生成它的task，那些tasks永远和特定的job是有关联的，如果删除job，也会删除task。这样很方便，但也会有一个主要的缺点：因为只有一个成组的机制，需要来解决所有出现的情况。举例来说，一个job需要存储参数，这些参数或者是对应服务（service）或者是对应批量工作（batch job）但不会是两者同时，而且用户必须要写出workarounds当job的抽象无法来解决某个情况的时候（比如一个DaemonSet对这个集群里的所有节点都去复制一个简单的pod）。


In Borg, tasks do not exist independently from jobs. Creating a job creates its tasks; those tasks are forever associated with that particular job, and deleting the job deletes the tasks. This is convenient, but it has a major drawback: because there is only one grouping mechanism, it needs to handle all use cases. For example, a job has to store parameters that make sense only for service or batch jobs but not both, and users must develop workarounds when the job abstraction doesn't handle a use case (e.g., a DaemonSet that replicates a single pod to all nodes in the cluster).

在Kubernetes里，pod生命周期的管理组件例如RC决定了哪个pod它们有责任要用标签选择器，因此多个控制器都可能会认为它们自己对于一个单一的pod有管辖权。通过适当的配置选择来预防这样的冲突就非常重要。但是标签的弹性也有额外的好处，比如说，控制器和pod的分离意味着可以孤立和启用一些容器。考虑到一个负载均衡的服务使用一个标签选择器去标示一组pod去发送请求。如果这些pod中的一个行为异常，那这个pod的被Kubernetes服务负载均衡器识别出来的标签会被删除、这个pod被隔离不再进行服务。这个pod不再服务接受请求，但它会保持线上的状态，在原处可以被debug.同时，管理pod的RC自动实现服务，为有问题的pod创建一个复制的pod.

In Kubernetes, pod-lifecycle management components such as replication controllers determine which pods they are responsible for using label selectors, so multiple controllers might think they have jurisdiction over a single pod. It is important to prevent such conflicts through appropriate configuration choices. But the flexibility of labels has compensating advantages—for example, the separation of controllers and pods means that it is possible to "orphan" and "adopt" containers. Consider a load-balanced service that uses a label selector to identify the set of pods to send traffic to. If one of these pods starts misbehaving, that pod can be quarantined from serving requests by removing one or more of the labels that cause it to be targeted by the Kubernetes service load balancer. The pod is no longer serving traffic, but it will remain up and can be debugged in situ. In the meantime, the replication controller managing the pods that implements the service automatically creates a replacement pod for the misbehaving one.




### 不要暴露raw state Don't Expose Raw State
Borg、Omega和Kubernetes之间一个关键的差别在于它们的API构架。Borgmaster是一个单一的组件，它知道每一个API运作的语义。它包含了诸如关于jobs,tasks和机器的状态机器的集群管理的逻辑；它跑基于Paxos的复制存储系统用来记录master的状态。反观Omega，Omega除了存储之外没有集中的部件，存储也是简单地汇集了被动的状态信息以及加强乐观的并行进程控制：所有的逻辑和语义都被推进存储的client里，直接读写存储的内容。在实践中，每一个Omega的部件为了存储使用同样的客户端library，来打包或者解体数据结构、重新尝试活着加强语义的一致性。
A key difference between Borg, Omega, and Kubernetes is in their API architectures. The Borgmaster is a monolithic component that knows the semantics of every API operation. It contains the cluster management logic such as the state machines for jobs, tasks, and machines; and it runs the Paxos-based replicated storage system used to record the master's state. In contrast, Omega has no centralized component except the store, which simply holds passive state information and enforces optimistic concurrency control: all logic and semantics are pushed into the clients of the store, which directly read and write the store contents. In practice, every Omega component uses the same client-side library for the store, which does packing/unpacking of data structures, retries, and enforces semantic consistency.

Kubernetes选择了一个中间地提供了像Omega部件结构的弹性和可扩容性，同时还能加强系统层面的无变化、政策和数据传输。它通过强制所有存储接触必须通过一个中央的API服务器来隐藏存储的实现细节和给对象验证、版本控制提供服务来做到这些。在Omega里，client的部件互相之间是分离的，可以进化或者单独被替换（这对开源环境而言尤其重要），但中央化对加强共同语义、不变性和政策会容易很多。

Kubernetes picks a middle ground that provides the flexibility and scalability of Omega's componentized architecture while enforcing system-wide invariants, policies, and data transformations. It does this by forcing all store accesses through a centralized API server that hides the details of the store implementation and provides services for object validation, defaulting, and versioning. As in Omega, the client components are decoupled from one another and can evolve or be replaced independently (which is especially important in the open-source environment), but the centralization makes it easy to enforce common semantics, invariants, and policies.




## 一些开放性的难题 Some Open, Hard Problems
有了八年的容器管理经验，我们感觉依然还有大量的问题我们没有很好的解决方案。这个部分描述了一些我们感到特别棘手的问题，作为抛砖引玉吧。

Even with years of container-management experience, we feel there are a number of problems that we still don't have good answers for. This section describes a couple of particularly knotty ones, in the hope of fostering discussion and solutions.

### Configuration

配置
在所有我们面对的问题中，最多的心思和笔墨涉及到的都是关于管理配置，即一整套的提供给应用的配置，而非硬生生写进应用里去。我们完全可以把整篇文章都拿来写这个主题（可能都说不完）。下面这些是一些我们想要强调的内容。

首先，应用配置变成了一个关联一切的抓手，来实现所有的东西，所有这些容器管理系统（尚且）不做的事情，包括：
  ● 样板化简约（比如把tast重启的政策调整到相适应的负载工作量，例如服务或者批处理工作）；
  ● 调整和验证应用参数以及command-line参数；
  ● 实现例如打包镜像管理的缺失API抽象的替代解决方法；
  ● 应用配置模版的library；
  ● 发布管理工具；
  ● 镜像版本说明。

Of all the problems we have confronted, the ones over which the most brainpower, ink, and code have been spilled are related to managing configurations—the set of values supplied to applications, rather than hard-coded into them. In truth, we could have devoted this entire article to the subject and still have had more to say. What follows are a few highlights.

First, application configuration becomes the catch-all location for implementing all of the things that the container-management system doesn't (yet) do. Over the history of Borg this has included:

• Boilerplate reduction (e.g., defaulting task-restart policies appropriate to the workload, such as service or batch jobs).

• Adjusting and validating application parameters and command-line flags.

• Implementing workarounds for missing API abstractions such as package (image) management.

• Libraries of configuration templates for applications.

• Release-management tools.

• Image version specification.

为了解决这些要求、配置管理系统趋向于发明一个domain-specific的配置语言，最终具有图灵完备性，起源于希望能够在配置的数据里进行计算（比如对一个服务调整给它的内存，作为在一个服务里进行分区的功能）。结果就产生一个难以理解的“配置是代码”，大家都通过不在应用当中hardcode参数来尽量避免的这种情况。它并没有减少操作上的复杂性或者使得配置更容易debug或改变，它只是把计算从一个真正的编程语言挪到了一个特殊领域。

我们相信最有效的方法是去接受这个需求，拥抱无所不在的程序配置和在计算和数据之间保持一个清楚的界线。代表数据的语言应该是简单的、仅数据格式的，比如像JSON或者YAML，对这种数据的程序化修改应该在一个真实的编程语言里，有被很好理解的语义和工具。有趣的是，同样的在计算和数据之间的分离在前端开发的不同领域是雷同的，比如像Angular在markup（数据）和JavaScript（计算）之间是有清晰的划分的。
To cope with these kinds of requirements, configuration-management systems tend to invent a domain-specific configuration language that (eventually) becomes Turing complete, starting from the desire to perform computation on the data in the configuration (e.g., to adjust the amount of memory to give a server as a function of the number of shards in the service). The result is the kind of inscrutable "configuration is code" that people were trying to avoid by eliminating hard-coded parameters in the application's source code. It doesn't reduce operational complexity or make the configurations easier to debug or change; it just moves the computations from a real programming language to a domain-specific one, which typically has weaker development tools (e.g., debuggers, unit test frameworks, etc).

We believe the most effective approach is to accept this need, embrace the inevitability of programmatic configuration, and maintain a clean separation between computation and data. The language to represent the data should be a simple, data-only format such as JSON or YAML, and programmatic modification of this data should be done in a real programming language, where there are well-understood semantics, as well as good tooling. Interestingly, this same separation of computation and data can be seen in the disparate field of front-end development with frameworks such as Angular that maintain a crisp separation between the worlds of markup (data) and JavaScript (computation).


### 依赖条件的管理 Dependency Management
起一个服务往往也意味着提供一系列相关的服务（监控、存储、CI/CD等等）。如果一个应用对其他应用有依赖，其他这些依赖条件（和任何它们可能有涉及的依赖条件）能够被集群系统自动管理，是不是很好呢？

更麻烦的是，对依赖条件的实例化很少会像起一个新的备份这么简单，比如说，它可能会需要对现有的服务注册一个新的消费者（比如Bigtable as a service）然后通过这些间接的依赖环境来传递认证、授权以及账号信息。然而，基本上没有系统会抓、保持或者透露这些依赖信息，所以在底层自动化这些即便是非常常见的情况都是近乎不可能的。起来一个新的应用对用户来说就很复杂，对开发者而言来建新的服务就变难，经常导致一些最佳实践无法进行，影响服务的可靠性。


Standing up a service typically also means standing up a series of related services (monitoring, storage, CI/CD, etc). If an application has dependencies on other applications, wouldn't it be nice if those dependencies (and any transitive dependencies they may have) were automatically instantiated by the cluster-management system?

To complicate things, instantiating the dependencies is rarely as simple as just starting a new copy—for example, it may require registering as a consumer of an existing service (e.g., Bigtable as a service) and passing authentication, authorization, and billing information across those transitive dependencies. Almost no system, however, captures, maintains, or exposes this kind of dependency information, so automating even common cases at the infrastructure level is nearly impossible. Turning up a new application remains complicated for the user, making it harder for developers to build new services, and often results in the most recent best practices not being followed, which affects the reliability of the resulting service.

一个标准的问题是：如果是手动更新，很难保持依赖信息的及时更新。而且同时，能自动地（比如跟踪access）决定它的这种企图也无法掌握需要了解结果的语义信息。（比如是否这个acess要给那个实例？或者任何一个实例就足够了？）一个能够改进的可能是要求应用枚举它所依赖的服务，然后让底层拒绝对其他服务的接触（我们在我们的build system里对compiler imports这么做过）。这个动机是让底层做有用的事情，比如自动的setup、认证和连接。

不幸的是，我们所观察到的系统在表达、分析和使用系统依赖这方面的复杂性都太高，所以它们还没有被夹到一个主流的容器管理系统里。我们依然希望Kubernetes可能可以成为一个这样的平台，在这个平台上有这样的工具，但这么做是一个很大的挑战。
A standard problem is that it is hard to keep dependency information up to date if it is provided manually, and at the same time attempts to determine it automatically (e.g., by tracing accesses) fail to capture the semantic information needed to understand the result. (Did that access have to go to that instance, or would any instance have sufficed?) One possible way to make progress is to require that an application enumerate the services on which it depends, and have the infrastructure refuse to allow access to any others. (We do this for compiler imports in our build system.1) The incentive would be enabling the infrastructure to do useful things in return, such as automatic setup, authentication, and connectivity.

Unfortunately, the perceived complexity of systems that express, analyze, and use system dependencies has been too high, and so they haven't yet been added to a mainstream container-management system. We still hope that Kubernetes might be a platform on which such tools can be built, but doing so remains an open challenge.

## 结语 Conclusions
十多年搭建容器管理系统的经验教会了我们很多。而且我们把很多已有的经验融入进了Kubernetes，谷歌最近的这个容器管理系统。它的目标是基于容器的能力来提供编程生产力方面的极大收获，简化人工和自动化系统管理。我们希望你会来加入我们来延伸和提高这个项目。


A decade's worth of experience building container-management systems has taught us much, and we have embedded many of those lessons into Kubernetes, Google's most recent container-management system. Its goals are to build on the capabilities of containers to provide significant gains in programmer productivity and ease of both manual and automated system management. We hope you'll join us in extending and improving it.


References

1. Bazel: {fast, correct}—choose two; http://bazel.io.

2. Burrows, M. 2006. The Chubby lock service for loosely coupled distributed systems. Symposium on Operating System Design and Implementation (OSDI), Seattle, WA.

3. cAdvisor; https://github.com/google/cadvisor.

4. Kubernetes; http://kubernetes.io/.

5. Metz, C. 2015. Google is 2 billion lines of code—and it's all in one place. Wired (September); http://www.wired.com/2015/09/google-2-billion-lines-codeand-one-place/.

6. Schwarzkopf, M., Konwinski, A., Abd-el-Malek, M., Wilkes, J. 2013. Omega: flexible, scalable schedulers for large compute clusters. European Conference on Computer Systems (EuroSys), Prague, Czech Republic.

7. Verma, A., Pedrosa, L., Korupolu, M. R., Oppenheimer, D., Tune, E., Wilkes, J. 2015. Large-scale cluster management at Google with Borg. European Conference on Computer Systems (EuroSys), Bordeaux, France.

Brendan Burns (@brendandburns) is a software engineer at Google, where he co-founded the Kubernetes project. He received his Ph.D. from the University of Massachusetts Amherst in 2007. Prior to working on Kubernetes and cloud, he worked on low-latency indexing for Google's web-search infrastructure.

Brian Grant is a software engineer at Google. He was previously a technical lead of Borg and founder of the Omega project and is now design lead of Kubernetes.

David Oppenheimer is a software engineer at Google and a tech lead on the Kubernetes project. He received a PhD from UC Berkeley in 2005 and joined Google in 2007, where he was a tech lead on the Borg and Omega cluster-management systems prior to Kubernetes.

Eric Brewer is VP Infrastructure at Google and a professor at UC Berkeley, where he pioneered scalable servers and elastic infrastructure.

John Wilkes has been working on cluster management and infrastructure services at Google since 2008. Before that, he spent time at HP Labs, becoming an HP and ACM Fellow in 2002. He is interested in far too many aspects of distributed systems, but a recurring theme has been technologies that allow systems to manage themselves. In his spare time he continues, stubbornly, trying to learn how to blow glass.

Copyright © 2016 by the ACM. All rights reserved.

acmqueue

Originally published in Queue vol. 14, no. 1— 
see this item in the [ACM Digital Library](http://portal.acm.org/citation.cfm?id=2898444)