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
        },{id: "nav-talk-to-my-ai",
          title: "talk to my AI",
          description: "Ask my portfolio anything, or add me to your own AI assistant via MCP.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/ai/";
          },
        },{id: "news-started-my-ms-in-computer-science-at-georgia-tech-ml-specialization",
          title: 'Started my MS in Computer Science at Georgia Tech (ML Specialization). 🐝',
          description: "",
          section: "News",},{id: "news-our-paper-on-improving-physics-reasoning-in-llms-mixture-of-refinement-agents-was-accepted-at-an-aaai-2026-workshop",
          title: 'Our paper on improving physics reasoning in LLMs (Mixture of Refinement Agents) was...',
          description: "",
          section: "News",},{id: "news-became-a-graduate-teaching-assistant-for-data-amp-amp-visual-analytics-cse-6242-supporting-1500-students-globally",
          title: 'Became a Graduate Teaching Assistant for Data &amp;amp;amp; Visual Analytics (CSE 6242), supporting...',
          description: "",
          section: "News",},{id: "news-started-my-internship-at-intuit-atlanta",
          title: 'Started my internship at Intuit, Atlanta! 🚀',
          description: "",
          section: "News",},{id: "projects-sustainability-benchmark-automation",
          title: 'Sustainability Benchmark Automation',
          description: "Full-stack Azure-based solution for ESG pdf report automation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project.html";
            },},{id: "projects-user-threads",
          title: 'User-Threads',
          description: "Implementation of a user-level multithreading library supporting multiple mapping models in C.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project.html";
            },},{id: "projects-http-1-1-web-server",
          title: 'HTTP/1.1 Web Server',
          description: "Implementation of a multithreaded HTTP/1.1-compliant server.",
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
            },},{id: "projects-weed-detection-using-vision-transformers",
          title: 'Weed Detection using Vision Transformers',
          description: "B.Tech thesis - ViT-backed DETR for weed detection, published at IEEE ASIANCON",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project.html";
            },},{id: "projects-banktrack-banking-application",
          title: 'BankTrack - Banking Application',
          description: "Full-stack banking app with JWT auth, OTP verification, and role-based APIs",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project.html";
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
          window.open("https://www.linkedin.com/in/abhishek-dharmadhikari", "_blank");
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
