---
layout: page
title: User-Threads - Operating Systems
description: Implementation of a user-level multithreading library supporting multiple mapping models in C.
img: assets/img/threading.png
importance: 1
category: non-academic-projects
giscus_comments: true
---


#### 🛠️ Tech Stack
- **Languages:** C  
- **Concepts:** Systems Programming, Multithreading, Coroutines, Synchronization, Signal Handling  
- **Tools & System Calls :** Bash, setjmp/longjmp, CLONE  

---

#### 📌 Description
- **threadHive** is a user-level multithreading library that provides APIs for thread creation, joining, blocking, destruction, and signal handling in threads.  
- Supports **three multithreading models**:
  1. **One-One Model:** Maps one user thread to one kernel thread using `clone()`; threads are managed in a linked list with metadata like thread ID and function pointer.  
  2. **Many-One Model:** Maps multiple user threads to a single kernel thread; context saved using jump buffers, scheduling handled via SIGALRM with FCFS strategy.  
  3. **Many-Many Model:** Multiplexes many user threads to multiple kernel threads; each kernel thread has its own scheduler, with separate linked lists for user and kernel threads.  
- Provides **APIs for thread management**:
  - `thread_create()`, `thread_join()`, `thread_exit()`, `thread_kill()`  
  - `thread_lock()` and `thread_unlock()` for spinlock-based synchronization  
- Implemented **round-robin scheduler** for many-one and many-many models, using `setjmp`/`longjmp` for context switching.  
- Built **linked list data structures** to manage threads and their associated metadata (thread descriptor, function descriptor).  
- Validated the library with test programs like **race condition scenarios** and **matrix multiplication**, achieving significant improvements in efficiency and control over thread execution.

---

#### 🔗 Repository
[View on GitHub](https://github.com/abhi25072002/threadHive)
