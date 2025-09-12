---
layout: page
title: project 2
description: a project with a background image and giscus comments
img: assets/img/threading.png
importance: 1
category: work
giscus_comments: true
---

Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}



---
layout: page
title: User-Threads - Operating Systems
description: Implementation of a user-level multithreading library supporting multiple mapping models in C.
img: assets/img/threading.png
importance: 1
category: work
giscus_comments: true
---

### User-Threads - Operating Systems | C, Systems Programming, Multithreading (Mar ’22 – May ’22)

---

#### 🛠️ Tech Stack
- **Languages:** C  
- **Concepts:** Systems Programming, Multithreading, Coroutines, Synchronization, Signal Handling  
- **Tools:** Bash, setjmp/longjmp, clone system call  

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

---

#### Usage
```bash
git clone https://github.com/abhi25072002/threadHive
cd user-threads
bash runall.sh