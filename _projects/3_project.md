---
layout: page
title: HTTP/1.1 Web Server - Systems Programming
description: Implementation of a multithreaded HTTP/1.1-compliant server with request handling, logging, and configuration management.
img: assets/img/httpserver_response.png
importance: 1
category: non-academic-projects
---

#### 🛠️ Tech Stack
- **Languages:** Python  
- **Concepts:** Networking, HTTP/1.1 (RFC 2616), Multithreading, Request Handling, MDN Docs  
- **Tools & Libraries:** Sockets, Configuration Parser, Logging  

---

#### 📌 Description
- Designed and implemented a **multithreaded HTTP/1.1-compliant web server** supporting core HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, and `HEAD`, 15+ status codes, and multipart form data handling.
- Built a **custom configuration system** similar to apache.conf for controlling server related parameters (for eg.document roots, timeouts, ports, keep-alive, persistent connections.  
- Implemented **access logs** and **error logs** with detailed request metadata (client IP, timestamps, status codes).  
- Supported **cookies** for basic session management between client and server.  
- Created automated regression tests to validate request handling, error responses, and concurrent connection limits.  

---

#### 🔗 Repository
[View on GitHub](https://github.com/abhi25072002/HTTPHaven)