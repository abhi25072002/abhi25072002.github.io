// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-sustainability-benchmark-automation",
          title: 'Sustainability Benchmark Automation',
          description: "Full-stack Azure-based solution for ESG pdf report automation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project.html";
            },},{id: "projects-user-threads",
          title: 'User-Threads',
          description: "Implementation of a user-level multithreading library supporting multiple mapping models in C.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project.html";
            },},{id: "projects-http-1-1-web-server-systems-programming",
          title: 'HTTP/1.1 Web Server - Systems Programming',
          description: "Implementation of a multithreaded HTTP/1.1-compliant server with request handling, logging, and configuration management.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project.html";
            },},{id: "projects-arbitrary-precision-calculator",
          title: 'Arbitrary-Precision Calculator',
          description: "A bc-like command-line calculator supporting arbitrary-precision arithmetics.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project.html";
            },},{id: "projects-paint-shapes-editor",
          title: 'Paint – Shapes Editor',
          description: "C++ Paint application for drawing and manipulating shapes using OOP concepts and OpenGL.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project.html";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project.html";
            },},{id: "projects-arbitrary-precision-calculator-c",
          title: 'Arbitrary-Precision Calculator (C)',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/arbitrary-precision-calculator.html";
            },},{id: "projects-banktrack-banking-application",
          title: 'BankTrack - Banking Application',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/banktrack.html";
            },},{id: "projects-http-server-computer-networks",
          title: 'HTTP Server - Computer Networks',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/http-server.html";
            },},{id: "projects-paint-application-object-oriented-programming-c",
          title: 'Paint Application - Object Oriented Programming (C++)',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/paint-application.html";
            },},{id: "projects-sustainability-benchmark-automation",
          title: 'Sustainability Benchmark Automation',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sustainability-benchmark-automation.html";
            },},{id: "projects-user-threads-operating-systems",
          title: 'User-Threads - Operating Systems',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/user-threads-os.html";
            },},{id: "projects-weed-detection-using-vision-transformers-vit",
          title: 'Weed Detection using Vision Transformers (ViT)',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/weed-detection-vit.html";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6A%64%36@%67%61%74%65%63%68.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/abhi25072002", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/abhishek_250702", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/abhishek-dharmadhikari/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=iyv1BAEAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
