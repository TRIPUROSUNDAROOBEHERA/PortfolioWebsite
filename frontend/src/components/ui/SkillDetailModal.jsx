import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import laptopLevelFrameImg from '../../assets/laptop_level_frame.png';

/**
 * SKILL_PROFILES: 4-Block Architectural Competency Structure
 * Matching the exact design in the user-provided reference (Image 2):
 * 1. WHAT IT DOES & HOW IT WORKS
 * 2. HOW I USE IT IN MY WORKFLOW
 * 3. DESIGN VALUE & USER IMPACT
 * 4. HANDS-ON EXECUTION PROCESS
 */
export const SKILL_PROFILES = {
  python: {
    displayName: 'Python',
    brandColor: '#387EB8',
    officialUrl: 'https://www.python.org',
    modules: [
      {
        title: 'Python Fundamentals',
        desc: 'Understanding Python syntax, variables, data types, operators, and basic input/output operations to write simple and readable programs.'
      },
      {
        title: 'Control Flow and Functions',
        desc: 'Using conditional statements, loops, and reusable functions to control program execution, reduce code duplication, and solve problems efficiently.'
      },
      {
        title: 'Data Structures and Collections',
        desc: 'Working with lists, tuples, sets, and dictionaries to store, organize, access, and manipulate data effectively.'
      },
      {
        title: 'Object-Oriented Programming (OOP)',
        desc: 'Understanding classes, objects, inheritance, encapsulation, and polymorphism to build structured, reusable, and maintainable applications.'
      },
      {
        title: 'File Handling, Modules and Practical Development',
        desc: 'Reading and writing files, working with modules and packages, handling exceptions, and applying Python concepts to practical programming projects.'
      }
    ]
  },

  django: {
    displayName: 'Django',
    brandColor: '#0C4B33',
    officialUrl: 'https://www.djangoproject.com',
    modules: [
      {
        title: 'Django Fundamentals and Architecture',
        desc: "Understanding Django's project structure, applications, settings, URL routing, and Model-View-Template architecture for server-side web development."
      },
      {
        title: 'Models and Database Management',
        desc: 'Defining models, fields, relationships, and constraints, and using Django ORM and migrations to manage database schemas and records.'
      },
      {
        title: 'Views, Templates and URL Routing',
        desc: 'Building function-based or class-based views, mapping URLs, rendering templates, and passing dynamic data to frontend pages.'
      },
      {
        title: 'Authentication and Security',
        desc: 'Implementing user registration, login, logout, permissions, sessions, CSRF protection, and secure handling of user input.'
      },
      {
        title: 'Forms, Admin and Application Development',
        desc: 'Using Django forms, configuring the Django admin panel, validating submitted data, and building maintainable database-driven web applications.'
      }
    ]
  },

  djangorest: {
    displayName: 'Django REST Framework',
    brandColor: '#E11D48',
    officialUrl: 'https://www.django-rest-framework.org',
    modules: [
      {
        title: 'REST API Fundamentals',
        desc: 'Understanding REST architecture, endpoints, HTTP methods, status codes, and JSON responses for communication between frontend and backend applications.'
      },
      {
        title: 'Serializers and Data Validation',
        desc: 'Using serializers to convert Django model instances into JSON-compatible data and validate incoming request data before processing.'
      },
      {
        title: 'Views, ViewSets and Routers',
        desc: 'Building API endpoints using function-based views, class-based views, generic views, ViewSets, and routers to manage application resources.'
      },
      {
        title: 'Authentication and Permissions',
        desc: 'Implementing API authentication, permission classes, and access control to protect endpoints and manage authorized user operations.'
      },
      {
        title: 'CRUD Operations and API Testing',
        desc: 'Developing create, read, update, and delete endpoints, handling pagination and filtering, and testing APIs using the browsable API or tools such as Postman.'
      }
    ]
  },

  react: {
    displayName: 'React.js',
    brandColor: '#00D8FF',
    officialUrl: 'https://react.dev',
    modules: [
      {
        title: 'React Fundamentals',
        desc: 'Understanding components, JSX, props, state, and the component-based architecture used to build interactive user interfaces.'
      },
      {
        title: 'Hooks and State Management',
        desc: 'Using hooks such as useState and useEffect to manage component state, handle side effects, and respond to changes in application data.'
      },
      {
        title: 'Components and Reusable UI',
        desc: 'Creating reusable functional components, passing data through props, handling events, and organizing interfaces into maintainable sections.'
      },
      {
        title: 'API Integration and Data Fetching',
        desc: 'Connecting React applications to backend APIs using fetch or Axios, handling JSON responses, and displaying loading, success, and error states.'
      },
      {
        title: 'Routing and Application Development',
        desc: 'Using React Router to create multi-page navigation experiences, organize application layouts, and develop responsive frontend applications.'
      }
    ]
  },

  javascript: {
    displayName: 'JavaScript',
    brandColor: '#EAB308',
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    modules: [
      {
        title: 'JavaScript Fundamentals',
        desc: 'Understanding variables, constants, data types, operators, expressions, and basic programming syntax to implement application logic.'
      },
      {
        title: 'Functions and Control Flow',
        desc: 'Using functions, conditional statements, loops, arrow functions, and scope to create reusable logic and manage program execution.'
      },
      {
        title: 'Arrays, Objects and Modern JavaScript',
        desc: 'Working with arrays, objects, destructuring, template literals, spread syntax, and methods such as map, filter, and reduce.'
      },
      {
        title: 'DOM Manipulation and Event Handling',
        desc: 'Selecting and updating HTML elements, handling user interactions, managing form events, and creating dynamic browser interfaces.'
      },
      {
        title: 'Asynchronous Programming and API Integration',
        desc: 'Using promises, async/await, and the Fetch API to retrieve data from backend services and handle asynchronous operations and errors.'
      }
    ]
  },

  html: {
    displayName: 'HTML5',
    brandColor: '#E34F26',
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    modules: [
      {
        title: 'Semantic Document Structure',
        desc: 'Creating well-organized web pages using semantic elements such as header, nav, main, section, article, and footer to improve structure and readability.'
      },
      {
        title: 'Forms and Input Validation',
        desc: 'Building accessible forms with text, email, password, date, and other input types, using labels, required attributes, and built-in validation.'
      },
      {
        title: 'Multimedia and Embedded Content',
        desc: 'Integrating images, audio, video, SVG graphics, and embedded content to create informative and engaging web pages.'
      },
      {
        title: 'Accessibility and Web Standards',
        desc: 'Using meaningful HTML elements, descriptive alternative text, appropriate labels, and accessible navigation patterns to improve usability.'
      },
      {
        title: 'Metadata and Web Integration',
        desc: 'Configuring page titles, meta descriptions, viewport settings, and social-sharing metadata while connecting HTML pages with CSS and JavaScript.'
      }
    ]
  },

  css: {
    displayName: 'CSS',
    brandColor: '#E44D26',
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    modules: [
      {
        title: 'Selectors, Cascade & Box Model',
        desc: 'Mastering class/ID selectors, specificity hierarchy, box model sizing (margin, padding, border), and border-box sizing.'
      },
      {
        title: 'Flexbox Layout System',
        desc: 'Building responsive 1-dimensional layouts with flex container properties, justify-content, align-items, and flex-wrap.'
      },
      {
        title: 'CSS Grid Layout System',
        desc: 'Designing complex 2-dimensional grid systems using grid-template-columns, grid-template-rows, and gap spacing.'
      },
      {
        title: 'Responsive Design & Media Queries',
        desc: 'Creating adaptive layouts for mobile, tablet, and desktop screens using mobile-first CSS @media breakpoint queries.'
      },
      {
        title: 'Animations, Transitions & Variables',
        desc: 'Implementing smooth cubic-bezier transitions, keyframe animations, CSS custom properties (:root variables), and hover states.'
      }
    ]
  },

  tailwind: {
    displayName: 'Tailwind CSS',
    brandColor: '#06B6D4',
    officialUrl: 'https://tailwindcss.com',
    modules: [
      {
        title: 'Utility-First CSS Fundamentals',
        desc: 'Using utility classes to style HTML elements directly, control colors, spacing, typography, borders, shadows, and other visual properties.'
      },
      {
        title: 'Responsive Web Design',
        desc: 'Applying responsive breakpoints to create layouts that adapt to mobile phones, tablets, laptops, and desktop screens.'
      },
      {
        title: 'Flexbox and Grid Layouts',
        desc: 'Building flexible page structures with Flexbox and CSS Grid to align elements, arrange cards, and create consistent layouts.'
      },
      {
        title: 'Interactive States and Visual Effects',
        desc: 'Using hover, focus, active, transition, and animation utilities to create interactive buttons, navigation menus, cards, and modern UI elements.'
      },
      {
        title: 'Reusable Components and Design Consistency',
        desc: 'Combining utility classes into reusable React components and maintaining consistent spacing, typography, colors, and styling across an application.'
      }
    ]
  },

  mysql: {
    displayName: 'MySQL',
    brandColor: '#00758F',
    officialUrl: 'https://www.mysql.com',
    modules: [
      {
        title: 'Relational Database Fundamentals',
        desc: 'Understanding relational database concepts, schemas, tables, columns, data types, and relationships for organizing structured application data.'
      },
      {
        title: 'SQL Queries and CRUD Operations',
        desc: 'Writing SELECT, INSERT, UPDATE, and DELETE statements to retrieve and manage records in relational databases.'
      },
      {
        title: 'Database Design and Constraints',
        desc: 'Creating normalized tables, defining primary and foreign keys, applying constraints, and designing relationships between database entities.'
      },
      {
        title: 'Joins, Functions and Transactions',
        desc: 'Using joins, aggregate functions, grouping, subqueries, and transactions to combine information and maintain reliable database operations.'
      },
      {
        title: 'Python and Django Integration',
        desc: 'Connecting MySQL with Python and Django, configuring database settings, running migrations, and performing database operations through Django ORM.'
      }
    ]
  },

  postgresql: {
    displayName: 'PostgreSQL',
    brandColor: '#336791',
    officialUrl: 'https://www.postgresql.org',
    modules: [
      {
        title: 'PostgreSQL Fundamentals',
        desc: 'Understanding PostgreSQL as a relational database management system, including database creation, tables, data types, rows, columns, and basic database operations.'
      },
      {
        title: 'SQL Queries and Data Manipulation',
        desc: 'Writing SQL queries using SELECT, INSERT, UPDATE, and DELETE to retrieve, add, modify, and remove records efficiently.'
      },
      {
        title: 'Database Design and Relationships',
        desc: 'Designing structured database schemas using primary keys, foreign keys, constraints, and one-to-one, one-to-many, and many-to-many relationships.'
      },
      {
        title: 'Joins, Functions and Transactions',
        desc: 'Using SQL joins, aggregate functions, filtering, grouping, and transactions to combine data, perform calculations, and maintain data consistency.'
      },
      {
        title: 'Python and Django Integration',
        desc: 'Integrating PostgreSQL with Python and Django ORM to manage models, perform CRUD operations, execute database queries, and store application data for full-stack web development.'
      }
    ]
  },

  sqlite: {
    displayName: 'SQLite',
    brandColor: '#003B57',
    officialUrl: 'https://www.sqlite.org',
    modules: [
      {
        title: 'SQLite Fundamentals',
        desc: 'Understanding SQLite as a lightweight, file-based relational database that stores structured data without requiring a separate database server.'
      },
      {
        title: 'SQL Queries and CRUD Operations',
        desc: 'Using SQL statements to create tables, insert records, retrieve information, update values, and delete unwanted data.'
      },
      {
        title: 'Tables, Relationships and Constraints',
        desc: 'Designing tables with appropriate data types, primary keys, foreign keys, and constraints to maintain data integrity.'
      },
      {
        title: 'Transactions and Database Management',
        desc: 'Using transactions, indexes, and SQL queries to manage database operations and maintain consistent application data.'
      },
      {
        title: 'Python and Django Integration',
        desc: "Working with SQLite through Python's sqlite3 module and Django ORM to store application records, configure databases, and support local development and testing."
      }
    ]
  },

  mongodb: {
    displayName: 'MongoDB',
    brandColor: '#47A248',
    officialUrl: 'https://www.mongodb.com',
    modules: [
      {
        title: 'NoSQL Database Fundamentals',
        desc: "Understanding document-oriented database concepts, databases, collections, documents, BSON data, and MongoDB's flexible schema model."
      },
      {
        title: 'CRUD Operations',
        desc: 'Using MongoDB queries to insert, retrieve, update, and delete documents while managing application data efficiently.'
      },
      {
        title: 'Querying and Data Filtering',
        desc: 'Applying query operators, sorting, projections, limits, and filters to find specific documents and retrieve relevant information.'
      },
      {
        title: 'Document Modeling and Aggregation',
        desc: 'Designing document structures with embedded documents and references, and using aggregation pipelines to filter, group, transform, and analyze data.'
      },
      {
        title: 'Python Integration and Database Management',
        desc: 'Connecting Python applications to MongoDB using PyMongo, managing database operations, and handling application data through backend services.'
      }
    ]
  },

  docker: {
    displayName: 'Docker',
    brandColor: '#2496ED',
    officialUrl: 'https://www.docker.com',
    modules: [
      {
        title: 'Containerization Fundamentals',
        desc: 'Understanding containers, images, registries, and the differences between containers and virtual machines to create consistent application environments.'
      },
      {
        title: 'Dockerfiles and Image Building',
        desc: 'Writing Dockerfiles to define application dependencies, copy project files, configure working directories, and build reproducible container images.'
      },
      {
        title: 'Container Lifecycle and Networking',
        desc: 'Running, stopping, inspecting, and removing containers while configuring ports, environment variables, and container networking.'
      },
      {
        title: 'Docker Compose and Multi-Service Applications',
        desc: 'Using Docker Compose to configure and run multiple services, such as a Django backend, React frontend, and PostgreSQL database.'
      },
      {
        title: 'Development and Deployment Workflows',
        desc: 'Managing environment configuration, persistent volumes, dependency installation, and container logs to support repeatable development and deployment workflows.'
      }
    ]
  },

  git: {
    displayName: 'Git & GitHub',
    brandColor: '#F05032',
    officialUrl: 'https://git-scm.com',
    modules: [
      {
        title: 'Git Fundamentals',
        desc: "Understanding repositories, working directories, staging areas, commits, branches, and Git's role in tracking source code history."
      },
      {
        title: 'Repository and Branch Management',
        desc: 'Creating repositories, cloning projects, creating branches, switching between branches, and merging changes during development.'
      },
      {
        title: 'Commits and Remote Synchronization',
        desc: 'Using git add, git commit, git push, git pull, and git fetch to record changes and synchronize work with remote repositories.'
      },
      {
        title: 'Collaboration and Code Review',
        desc: 'Using GitHub pull requests, issues, reviews, and merge workflows to collaborate with other developers and manage project contributions.'
      },
      {
        title: 'Project Publishing and Repository Security',
        desc: 'Writing README documentation, maintaining .gitignore, organizing project files, and protecting secrets by keeping .env files and credentials out of version control.'
      }
    ]
  },

  github: {
    displayName: 'Git & GitHub',
    brandColor: '#24292F',
    officialUrl: 'https://github.com',
    modules: [
      {
        title: 'Git Fundamentals',
        desc: "Understanding repositories, working directories, staging areas, commits, branches, and Git's role in tracking source code history."
      },
      {
        title: 'Repository and Branch Management',
        desc: 'Creating repositories, cloning projects, creating branches, switching between branches, and merging changes during development.'
      },
      {
        title: 'Commits and Remote Synchronization',
        desc: 'Using git add, git commit, git push, git pull, and git fetch to record changes and synchronize work with remote repositories.'
      },
      {
        title: 'Collaboration and Code Review',
        desc: 'Using GitHub pull requests, issues, reviews, and merge workflows to collaborate with other developers and manage project contributions.'
      },
      {
        title: 'Project Publishing and Repository Security',
        desc: 'Writing README documentation, maintaining .gitignore, organizing project files, and protecting secrets by keeping .env files and credentials out of version control.'
      }
    ]
  },

  bootstrap: {
    displayName: 'Bootstrap',
    brandColor: '#7952B3',
    officialUrl: 'https://getbootstrap.com',
    modules: [
      {
        title: '12-Column Responsive Grid',
        desc: 'Structuring fluid multi-device layouts using container, row, and responsive col-* breakpoint classes (sm, md, lg, xl).'
      },
      {
        title: 'Prebuilt UI Component Library',
        desc: 'Deploying accessible UI components: responsive Navbars, cards, modals, alerts, badges, dropdowns, and carousels.'
      },
      {
        title: 'Utility Classes & Spacing',
        desc: 'Using built-in utility classes for margins (m-*), padding (p-*), flexbox alignment (d-flex, justify-content), and text styles.'
      },
      {
        title: 'Forms & Responsive Inputs',
        desc: 'Building clean responsive forms with form-control, floating labels, input groups, checkboxes, and validation feedback states.'
      },
      {
        title: 'Customization & SCSS Theming',
        desc: 'Overriding default Bootstrap theme variables with SCSS, customizing color schemes, and compiling lightweight custom builds.'
      }
    ]
  },

  vite: {
    displayName: 'Vite',
    brandColor: '#646CFF',
    officialUrl: 'https://vitejs.dev',
    modules: [
      {
        title: 'Native ESM Development Server',
        desc: 'Instant server startup leveraging native ES Modules (ESM) in the browser, eliminating heavy development bundle overhead.'
      },
      {
        title: 'Lightning-Fast Hot Module Replacement (HMR)',
        desc: 'Instantaneous UI updates in milliseconds without resetting application state, maximizing front-end development speed.'
      },
      {
        title: 'Plugin System & Build Config',
        desc: 'Configuring vite.config.js plugins for React, setting path aliases (@/components), and managing environment variables.'
      },
      {
        title: 'Asset Processing & Code Splitting',
        desc: 'Automatic CSS code splitting, static asset hashing, dynamic import lazy loading, and SVG asset optimization.'
      },
      {
        title: 'Optimized Production Bundling',
        desc: 'Compiling highly minified, code-split production bundles with Rollup, chunk size analysis, and fast esbuild minification.'
      }
    ]
  },

  vscode: {
    displayName: 'VS Code',
    brandColor: '#007ACC',
    officialUrl: 'https://code.visualstudio.com',
    modules: [
      {
        title: 'Code Editing and Navigation',
        desc: 'Using Visual Studio Code to write, edit, and organize source code with syntax highlighting, auto-completion, IntelliSense, and code navigation.'
      },
      {
        title: 'Extensions and Development Environment',
        desc: 'Installing and configuring extensions for Python, Django, JavaScript, React, and other technologies to improve the development workflow.'
      },
      {
        title: 'Integrated Terminal and Debugging',
        desc: 'Running commands through the integrated terminal, setting breakpoints, inspecting variables, and debugging application errors efficiently.'
      },
      {
        title: 'Git and Version Control Integration',
        desc: 'Managing source code changes, reviewing file differences, staging changes, creating commits, and working with Git repositories directly in VS Code.'
      },
      {
        title: 'Project Management and Productivity',
        desc: 'Organizing project folders, managing configuration files, using search tools, and maintaining a productive development environment for full-stack applications.'
      }
    ]
  },

  linux: {
    displayName: 'Linux',
    brandColor: '#FCC624',
    officialUrl: 'https://www.linux.org',
    modules: [
      {
        title: 'Shell Navigation & File Operations',
        desc: 'Navigating directories (cd, ls, pwd), creating/copying/moving files (mkdir, cp, mv, rm), and viewing logs (cat, tail -f).'
      },
      {
        title: 'Permissions & User Management',
        desc: 'Managing file ownership (chown), permission bits (chmod 755/644), sudo administrative privileges, and user accounts.'
      },
      {
        title: 'Process Management & System Telemetry',
        desc: 'Monitoring server processes (ps aux, top, htop), terminating jobs (kill, pkill), and checking memory/disk usage (df, free).'
      },
      {
        title: 'Package Management & Remote SSH',
        desc: 'Installing server packages with apt/yum, connecting securely to remote cloud servers via SSH keys, and firewall setup (UFW).'
      },
      {
        title: 'Systemd Services & Cron Automation',
        desc: 'Configuring systemd service daemons (systemctl start/enable/status) and automating recurring jobs with crontab.'
      }
    ]
  },

  figma: {
    displayName: 'Figma',
    brandColor: '#F24E1E',
    officialUrl: 'https://www.figma.com',
    modules: [
      {
        title: 'UI/UX Wireframing & Screen Layouts',
        desc: 'Designing user interfaces, artboards, auto-layout frames, and responsive layouts that mirror web Flexbox behavior.'
      },
      {
        title: 'Design Systems & Token Architecture',
        desc: 'Establishing centralized color palettes, typographic scales, elevation shadow tokens, and consistent border radii.'
      },
      {
        title: 'Reusable Components & Variants',
        desc: 'Building component libraries with interactive hover/active states, property controls, and responsive UI variants.'
      },
      {
        title: 'Interactive Prototyping & Flow Testing',
        desc: 'Connecting application screens with animated transitions, trigger micro-interactions, and validating UX usability flows.'
      },
      {
        title: 'Developer Handoff & Asset Exporting',
        desc: 'Inspecting exact CSS attributes in Dev Mode, measuring spacing in pixels, and exporting optimized SVG and PNG assets.'
      }
    ]
  },

  redis: {
    displayName: 'Redis',
    brandColor: '#DC382D',
    officialUrl: 'https://redis.io',
    modules: [
      {
        title: 'In-Memory Key-Value Architecture',
        desc: 'Supercharged in-memory data store delivering sub-millisecond read/write latency for high-throughput applications.'
      },
      {
        title: 'Core Data Structures',
        desc: 'Working with Strings, Hashes, Lists, Sets, and Sorted Sets (ZSET) for leaderboard rankings and priority processing.'
      },
      {
        title: 'TTL Caching & Invalidation',
        desc: 'Setting Time-To-Live (EXPIRE) for temporary data, managing cache invalidation, and optimizing LRU memory eviction.'
      },
      {
        title: 'Pub/Sub & Real-Time Messaging',
        desc: 'Implementing real-time Publish/Subscribe messaging channels for event broadcasting, notifications, and chat systems.'
      },
      {
        title: 'Task Queue Broker for Celery',
        desc: 'Configuring Redis as the high-speed message broker and result backend for Celery asynchronous background task queues.'
      }
    ]
  },

  aws: {
    displayName: 'AWS',
    brandColor: '#FF9900',
    officialUrl: 'https://aws.amazon.com',
    modules: [
      {
        title: 'Cloud Compute Infrastructure (EC2)',
        desc: 'Provisioning scalable Linux virtual servers, configuring security groups, SSH key pairs, and application deployment.'
      },
      {
        title: 'Object Storage (S3)',
        desc: 'Creating cloud storage buckets for user-uploaded media files, static assets, bucket policies, and secure presigned URLs.'
      },
      {
        title: 'Managed Relational Databases (RDS)',
        desc: 'Setting up managed PostgreSQL and MySQL database instances, automated daily backups, multi-AZ failover, and maintenance.'
      },
      {
        title: 'Global CDN & SSL (CloudFront)',
        desc: 'Distributing web assets globally with CloudFront CDN edge caching, custom domain routing, and free AWS SSL/TLS certificates.'
      },
      {
        title: 'IAM Security & Access Governance',
        desc: 'Configuring Identity and Access Management (IAM) users, role-based access policies, and programmatic API access keys.'
      }
    ]
  },

  postman: {
    displayName: 'Postman',
    brandColor: '#FF6C37',
    officialUrl: 'https://www.postman.com',
    modules: [
      {
        title: 'REST API Request Testing',
        desc: 'Authoring and sending HTTP requests (GET, POST, PUT, PATCH, DELETE) with headers, auth tokens, and JSON payloads.'
      },
      {
        title: 'Environment Variables & Base URLs',
        desc: 'Managing dynamic environment variables for Local, Staging, and Production environments, automating token storage.'
      },
      {
        title: 'Automated Assertion Test Scripts',
        desc: 'Writing JavaScript test scripts to assert HTTP 200 status codes, validate response time, and verify response schema fields.'
      },
      {
        title: 'Collections & Test Runners',
        desc: 'Organizing endpoints into structured collections, running automated test suites with Collection Runner, and data-driven testing.'
      },
      {
        title: 'Interactive API Documentation',
        desc: 'Generating live web-accessible API documentation with request examples, expected response payloads, and team sharing.'
      }
    ]
  },

  graphql: {
    displayName: 'GraphQL',
    brandColor: '#E10098',
    officialUrl: 'https://graphql.org',
    modules: [
      {
        title: 'Schema Definition Language (SDL)',
        desc: 'Defining strongly-typed schemas with Types, Queries, Mutations, Inputs, and Enums for bulletproof API contracts.'
      },
      {
        title: 'Declarative Data Fetching (Queries)',
        desc: 'Requesting precise data fields in a single query, eliminating over-fetching and under-fetching on mobile and web clients.'
      },
      {
        title: 'Mutations & Data Updates',
        desc: 'Writing mutation operations to create, update, and delete server data with predictable strongly-typed return responses.'
      },
      {
        title: 'Resolvers & Backend Integration',
        desc: 'Implementing backend resolver functions to fetch data from relational databases, microservices, or external APIs.'
      },
      {
        title: 'Client Integration with Apollo',
        desc: 'Connecting React frontends using Apollo Client, managing client-side caching, loading states, and error handling.'
      }
    ]
  },

  celery: {
    displayName: 'Celery',
    brandColor: '#37814A',
    officialUrl: 'https://docs.celeryq.dev',
    modules: [
      {
        title: 'Asynchronous Background Task Processing',
        desc: 'Offloading long-running jobs (emails, PDF generation, data processing) from HTTP request cycles to keep web apps fast.'
      },
      {
        title: 'Task Definitions & Execution',
        desc: 'Decorating functions with @shared_task, executing tasks asynchronously with delay() and apply_async(), and task signatures.'
      },
      {
        title: 'Message Broker & Result Backend',
        desc: 'Connecting Redis or RabbitMQ as the high-throughput message queue broker and caching task execution results.'
      },
      {
        title: 'Scheduled Jobs (Celery Beat)',
        desc: 'Setting up automated periodic tasks and cron-like schedules for automated database maintenance, cleanups, and reports.'
      },
      {
        title: 'Worker Scaling & Retry Handling',
        desc: 'Managing worker concurrency, handling transient failures with automatic retries and exponential backoff strategies.'
      }
    ]
  },

  firebase: {
    displayName: 'Firebase',
    brandColor: '#FFCA28',
    officialUrl: 'https://firebase.google.com',
    modules: [
      {
        title: 'User Authentication System',
        desc: 'Implementing secure user sign-up and login with Email/Password, Google OAuth, and managing user auth state listeners.'
      },
      {
        title: 'Cloud Firestore Real-Time NoSQL DB',
        desc: 'Storing and syncing NoSQL documents in real time with live snapshot listeners (onSnapshot) for instant collaborative UI.'
      },
      {
        title: 'Cloud Storage for Media',
        desc: 'Uploading and serving user-generated images and files with secure access control and public download URLs.'
      },
      {
        title: 'Security Rules & Data Governance',
        desc: 'Authoring declarative Firestore and Storage security rules to validate schema fields and enforce user authorization.'
      },
      {
        title: 'Firebase Hosting & Cloud Functions',
        desc: 'Deploying fast single-page web apps to global CDN hosting and executing serverless backend logic with Cloud Functions.'
      }
    ]
  },

  sql: {
    displayName: 'SQL',
    brandColor: '#00618A',
    officialUrl: 'https://en.wikipedia.org/wiki/SQL',
    modules: [
      {
        title: 'Database & Table Fundamentals (DDL)',
        desc: 'Creating databases, defining tables, establishing data types, primary keys, foreign keys, and unique constraints.'
      },
      {
        title: 'Data Querying & Filtering (DQL)',
        desc: 'Writing SELECT statements, WHERE clauses, logical operators (AND, OR, NOT), IN filters, and LIKE pattern matching.'
      },
      {
        title: 'Data Manipulation & Modification (DML)',
        desc: 'Executing INSERT statements to add rows, UPDATE to modify existing records, and DELETE with transaction safety.'
      },
      {
        title: 'Joins & Multi-Table Queries',
        desc: 'Combining related records across tables using INNER JOIN, LEFT OUTER JOIN, RIGHT JOIN, and subqueries.'
      },
      {
        title: 'Aggregations & Group Operations',
        desc: 'Calculating summary metrics with COUNT(), SUM(), AVG(), MIN(), MAX(), GROUP BY grouping, and HAVING filter clauses.'
      }
    ]
  },

  nodejs: {
    displayName: 'Node.js',
    brandColor: '#339933',
    officialUrl: 'https://nodejs.org',
    modules: [
      {
        title: 'Server-Side JavaScript & V8 Engine',
        desc: 'Executing JavaScript outside the browser using Chrome\'s V8 engine with an event-driven, non-blocking I/O model.'
      },
      {
        title: 'Core Modules & File System (fs)',
        desc: 'Working with built-in modules: fs for reading/writing files, path for directory handling, and http for web servers.'
      },
      {
        title: 'Package Management with NPM',
        desc: 'Managing project dependencies, configuring package.json scripts, installing packages, and semantic versioning.'
      },
      {
        title: 'Express.js Backend Framework',
        desc: 'Building RESTful Web APIs with Express routing, middleware pipelines, JSON body parsing, and CORS configuration.'
      },
      {
        title: 'Asynchronous Concurrency & Streams',
        desc: 'Handling asynchronous event streams, promises, async/await, and building real-time microservices with WebSockets.'
      }
    ]
  },

  cpp: {
    displayName: 'C++',
    brandColor: '#00599C',
    officialUrl: 'https://isocpp.org',
    modules: [
      {
        title: 'Core Syntax, Pointers & References',
        desc: 'Working with fundamental data types, control structures, pointer arithmetic, memory references, and dynamic memory (new/delete).'
      },
      {
        title: 'Object-Oriented Programming (OOP)',
        desc: 'Designing classes and objects, constructors and destructors, encapsulation, and inheritance access specifiers.'
      },
      {
        title: 'Polymorphism & Virtual Functions',
        desc: 'Implementing function and operator overloading, runtime polymorphism with virtual functions, and abstract base classes.'
      },
      {
        title: 'Standard Template Library (STL)',
        desc: 'Utilizing STL containers (vector, list, map, set), iterators, and high-performance sorting and search algorithms.'
      },
      {
        title: 'Memory Safety & Modern RAII',
        desc: 'Applying Resource Acquisition Is Initialization (RAII), smart pointers (unique_ptr, shared_ptr), and preventing memory leaks.'
      }
    ]
  },

  java: {
    displayName: 'Java',
    brandColor: '#5382A1',
    officialUrl: 'https://www.oracle.com/java',
    modules: [
      {
        title: 'Java Architecture & Core Syntax',
        desc: 'Understanding the JVM and bytecode execution, variables, primitives vs reference types, and control flow statements.'
      },
      {
        title: 'Object-Oriented Architecture',
        desc: 'Mastering classes, objects, encapsulation, inheritance (extends), polymorphism, abstract classes, and interfaces (implements).'
      },
      {
        title: 'Java Collections Framework',
        desc: 'Working with List (ArrayList, LinkedList), Set (HashSet), Map (HashMap), and functional processing with Java Streams.'
      },
      {
        title: 'Exception Handling & File I/O',
        desc: 'Handling runtime errors with try-catch-finally, custom exception classes, and reading/writing data with File I/O streams.'
      },
      {
        title: 'Multithreading & Modern Java',
        desc: 'Implementing concurrent threads with Runnable and ExecutorService, lambda expressions, and Maven project management.'
      }
    ]
  },

  flutter: {
    displayName: 'Flutter',
    brandColor: '#02569B',
    officialUrl: 'https://flutter.dev',
    modules: [
      {
        title: 'Widget Tree Architecture',
        desc: 'Composing mobile UIs entirely with widgets: StatelessWidget, StatefulWidget, Container, Row, Column, and Stack.'
      },
      {
        title: 'Responsive & Adaptive Layouts',
        desc: 'Designing layouts for different mobile screen sizes using Flex, Expanded, Positioned, and MediaQuery constraints.'
      },
      {
        title: 'State Management Systems',
        desc: 'Managing reactive application state across screens using Provider, Riverpod, or setState for fluid UI updates.'
      },
      {
        title: 'Navigation & Route Management',
        desc: 'Implementing multi-screen navigation with Navigator push/pop, named routes, passing arguments, and dialog overlays.'
      },
      {
        title: 'REST API Integration & Native APKs',
        desc: 'Consuming backend REST APIs with the http package, parsing JSON models, and compiling signed Android release APKs.'
      }
    ]
  },

  dart: {
    displayName: 'Dart',
    brandColor: '#0175C2',
    officialUrl: 'https://dart.dev',
    modules: [
      {
        title: 'Language Fundamentals & Typing',
        desc: 'Strongly typed syntax, type inference (var, final, const), operators, loops, and control flow structures.'
      },
      {
        title: 'Sound Null Safety',
        desc: 'Eliminating null reference crashes at compile time using non-nullable types, null assertion (!), and null-aware operators (?., ??).'
      },
      {
        title: 'Functions & Collection Methods',
        desc: 'First-class functions, anonymous closures, arrow syntax, and functional transformations on Lists, Sets, and Maps.'
      },
      {
        title: 'Object-Oriented Programming & Mixins',
        desc: 'Defining classes, named constructors, getters/setters, abstract classes, and reusable code composition with mixins.'
      },
      {
        title: 'Asynchronous Programming (Futures & Streams)',
        desc: 'Handling asynchronous workflows with Future and async/await, and event-driven data pipelines using Streams.'
      }
    ]
  },

  android: {
    displayName: 'Android',
    brandColor: '#3DDC84',
    officialUrl: 'https://developer.android.com',
    modules: [
      {
        title: 'Core Android Architecture',
        desc: 'Understanding Activities, Fragments, Activity lifecycle callbacks, and Intent-based inter-component communication.'
      },
      {
        title: 'UI Design & RecyclerView Lists',
        desc: 'Building responsive XML layouts with ConstraintLayout, custom ViewHolders, and high-performance RecyclerView lists.'
      },
      {
        title: 'Gradle Build Automation',
        desc: 'Configuring build.gradle dependencies, Android SDK target versions, build variants, and signing configurations.'
      },
      {
        title: 'Permissions & Local Storage',
        desc: 'Requesting runtime permissions (camera, location), persisting user preferences with SharedPreferences, and SQLite/Room.'
      },
      {
        title: 'App Manifest & Publishing',
        desc: 'Configuring AndroidManifest.xml, services, broadcast receivers, and compiling signed production AAB and APK releases.'
      }
    ]
  },

  kotlin: {
    displayName: 'Kotlin',
    brandColor: '#7F52FF',
    officialUrl: 'https://kotlinlang.org',
    modules: [
      {
        title: 'Concise Syntax & Null Safety',
        desc: 'Modern null-safe language syntax (String?), safe call operators (?.), elvis operator (?:), and smart casting.'
      },
      {
        title: 'Functions & Extension Capabilities',
        desc: 'Writing top-level functions, default and named parameters, lambda expressions, and custom extension functions.'
      },
      {
        title: 'Data Classes & Sealed Hierarchies',
        desc: 'Creating concise data classes with automatic copy()/toString(), sealed classes for UI state models, and object singletons.'
      },
      {
        title: 'Asynchronous Coroutines',
        desc: 'Executing non-blocking background network and database operations with Coroutine scopes, suspend functions, and Dispatchers.'
      },
      {
        title: 'Android Jetpack Architecture',
        desc: 'Integrating modern Android components: ViewModel, LiveData, StateFlow, and ViewBinding for clean MVVM architecture.'
      }
    ]
  }
};

/**
 * Resolves any skill key or user input to a normalized skill profile.
 */
export function resolveSkillProfile(skillKey) {
  if (!skillKey) return SKILL_PROFILES.python;
  const cleanKey = String(skillKey).toLowerCase().trim();

  if (SKILL_PROFILES[cleanKey]) return SKILL_PROFILES[cleanKey];

  // Alias lookup
  if (cleanKey.includes('python')) return SKILL_PROFILES.python;
  if (cleanKey.includes('django') && !cleanKey.includes('rest')) return SKILL_PROFILES.django;
  if (cleanKey.includes('rest') || cleanKey.includes('drf')) return SKILL_PROFILES.djangorest;
  if (cleanKey.includes('react')) return SKILL_PROFILES.react;
  if (cleanKey.includes('javascript') || cleanKey === 'js') return SKILL_PROFILES.javascript;
  if (cleanKey.includes('html')) return SKILL_PROFILES.html;
  if (cleanKey.includes('css') && !cleanKey.includes('tailwind')) return SKILL_PROFILES.css;
  if (cleanKey.includes('tailwind')) return SKILL_PROFILES.tailwind;
  if (cleanKey.includes('bootstrap')) return SKILL_PROFILES.bootstrap;
  if (cleanKey.includes('vite')) return SKILL_PROFILES.vite;
  if (cleanKey.includes('node')) return SKILL_PROFILES.nodejs;
  if (cleanKey.includes('c++') || cleanKey === 'cpp') return SKILL_PROFILES.cpp;
  if (cleanKey.includes('java') && !cleanKey.includes('script')) return SKILL_PROFILES.java;
  if (cleanKey.includes('flutter')) return SKILL_PROFILES.flutter;
  if (cleanKey.includes('dart')) return SKILL_PROFILES.dart;
  if (cleanKey.includes('android')) return SKILL_PROFILES.android;
  if (cleanKey.includes('kotlin')) return SKILL_PROFILES.kotlin;
  if (cleanKey.includes('figma')) return SKILL_PROFILES.figma;
  if (cleanKey.includes('docker')) return SKILL_PROFILES.docker;
  if (cleanKey.includes('git') && !cleanKey.includes('github')) return SKILL_PROFILES.git;
  if (cleanKey.includes('github')) return SKILL_PROFILES.github;
  if (cleanKey.includes('vscode')) return SKILL_PROFILES.vscode;
  if (cleanKey.includes('linux')) return SKILL_PROFILES.linux;
  if (cleanKey.includes('sqlite')) return SKILL_PROFILES.sqlite;
  if (cleanKey.includes('mysql')) return SKILL_PROFILES.mysql;
  if (cleanKey.includes('postgres')) return SKILL_PROFILES.postgresql;
  if (cleanKey.includes('mongo')) return SKILL_PROFILES.mongodb;
  if (cleanKey.includes('firebase')) return SKILL_PROFILES.firebase;
  if (cleanKey.includes('redis')) return SKILL_PROFILES.redis;
  if (cleanKey.includes('aws')) return SKILL_PROFILES.aws;
  if (cleanKey.includes('postman')) return SKILL_PROFILES.postman;
  if (cleanKey.includes('celery')) return SKILL_PROFILES.celery;
  if (cleanKey.includes('graphql')) return SKILL_PROFILES.graphql;
  if (cleanKey.includes('sql')) return SKILL_PROFILES.sql;

  // Fallback to CSS or first
  return SKILL_PROFILES.css;
}

/**
 * SkillDetailModal Component
 * Full-screen modal matching the exact design of reference Image 2:
 * Left side: 3D character illustration standing with laptop.
 * Right side: Skill icon, title, Open Official Tool button, speech button, and 4 architectural sections.
 */

/**
 * Helper: Returns authentic technical telemetry, code execution snippet,
 * and architecture metrics for each skill.
 */
function getSkillWorkbenchTelemetry(cleanKey, displayName) {
  if (cleanKey.includes('docker')) {
    return {
      fileName: 'docker-compose.prod.yml',
      tag: 'OCI Container Engine',
      metric: 'Immutable Zero-Drift Layering',
      category: 'Cloud Virtualization',
      code: `# Multi-stage production container
FROM python:3.12-alpine AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-alpine AS runtime
WORKDIR /app
COPY --from=build /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY . .
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:8000/health || exit 1
CMD ["gunicorn", "--workers=4", "config.wsgi:application"]`
    };
  }

  if (cleanKey.includes('css') && !cleanKey.includes('tailwind')) {
    return {
      fileName: 'design-tokens.css',
      tag: 'W3C CSS3 Architecture',
      metric: '60 FPS GPU-Accelerated Compositing',
      category: 'Design Systems & UI',
      code: `:root {
  /* Dynamic Design Token System */
  --color-primary: #E44D26;
  --surface-ground: hsl(220, 14%, 98%);
  --fluid-h1: clamp(2rem, 5vw, 3.75rem);
  --shadow-elevation: 0 10px 30px -5px rgba(0, 0, 0, 0.08);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}

.gpu-accelerated-layer {
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
  transition: transform 250ms var(--ease-spring);
}`
    };
  }

  if (cleanKey.includes('tailwind')) {
    return {
      fileName: 'tailwind.config.js',
      tag: 'JIT Compiler Engine',
      metric: 'Sub-15kb Atomic CSS Bundle',
      category: 'Utility-First Styling',
      code: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: '#ecfeff', 500: '#06b6d4', 900: '#164e63' },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};`
    };
  }

  if (cleanKey.includes('python')) {
    return {
      fileName: 'service_layer.py',
      tag: 'Python 3.12 LTS',
      metric: 'Asynchronous Coroutine Dispatch',
      category: 'Server-Side Business Logic',
      code: `from dataclasses import dataclass
from typing import Optional, Protocol

@dataclass(frozen=True, slots=True)
class EnterpriseDispatcher:
    runtime: str = "Python 3.12"
    concurrency_model: str = "asyncio"

    async def execute_transaction(self, payload: dict) -> dict:
        """Executes business rules with atomic validation."""
        validated_data = await self.validate_payload(payload)
        return await self.repository.commit_atomic(validated_data)`
    };
  }

  if (cleanKey.includes('django') && !cleanKey.includes('rest')) {
    return {
      fileName: 'views.py',
      tag: 'Django 5.x MVT',
      metric: 'Automated Migration & ACID ORM',
      category: 'Enterprise Web Framework',
      code: `from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import TourBooking
from .serializers import TourBookingSerializer

class TourBookingViewSet(ModelViewSet):
    queryset = TourBooking.objects.select_related('traveler', 'package')
    serializer_class = TourBookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)`
    };
  }

  if (cleanKey.includes('rest') || cleanKey.includes('drf')) {
    return {
      fileName: 'serializers.py',
      tag: 'Django REST Framework',
      metric: 'Nested Model Serialization & JWT',
      category: 'RESTful API Engineering',
      code: `from rest_framework import serializers
from .models import Destination, TourPackage

class TourPackageSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = TourPackage
        fields = ['id', 'title', 'price', 'destination_name', 'duration_days']

    def validate_price(self, value):
        if value <= 0: raise serializers.ValidationError("Price must be positive.")
        return value`
    };
  }

  if (cleanKey.includes('react')) {
    return {
      fileName: 'InteractivePortal.jsx',
      tag: 'React 19 / Fiber',
      metric: 'Concurrent Virtual DOM Reconciliation',
      category: 'Declarative UI Library',
      code: `import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function InteractivePortal({ isOpen, onClose, payload }) {
  const [telemetry, setTelemetry] = useState(payload);
  const memoizedStream = useMemo(() => transform(telemetry), [telemetry]);

  useEffect(() => {
    const stream = subscribeTelemetry(setTelemetry);
    return () => stream.unsubscribe();
  }, []);

  if (!isOpen) return null;
  return createPortal(<HUD stream={memoizedStream} />, document.body);
}`
    };
  }

  if (cleanKey.includes('javascript') || cleanKey === 'js') {
    return {
      fileName: 'event_dispatcher.js',
      tag: 'ECMAScript 2024 / V8',
      metric: 'Non-Blocking Event Loop Concurrency',
      category: 'Full-Stack Scripting',
      code: `// Asynchronous high-throughput pipeline
export async function executePipeline(tasks = []) {
  const results = await Promise.allSettled(
    tasks.map(async (task) => {
      const response = await fetch(\`/api/v1/jobs/\${task.id}\`);
      if (!response.ok) throw new Error(\`Failed: \${task.id}\`);
      return response.json();
    })
  );
  return results.filter(r => r.status === 'fulfilled').map(r => r.value);
}`
    };
  }

  if (cleanKey.includes('mysql')) {
    return {
      fileName: 'query_optimization.sql',
      tag: 'MySQL 8.0 InnoDB',
      metric: '0.42ms Latency B-Tree Index Scan',
      category: 'Relational Database Management',
      code: `EXPLAIN ANALYZE
SELECT
    b.id AS booking_id,
    u.username,
    t.title AS package_name,
    p.amount_paid
FROM bookings b
INNER JOIN users u ON u.id = b.user_id
INNER JOIN tour_packages t ON t.id = b.package_id
INNER JOIN payments p ON p.booking_id = b.id
WHERE b.status = 'CONFIRMED'
ORDER BY b.created_at DESC
LIMIT 50;`
    };
  }

  if (cleanKey.includes('postgres')) {
    return {
      fileName: 'schema_indexing.sql',
      tag: 'PostgreSQL 16 MVCC',
      metric: 'JSONB GIN Index Partitioning',
      category: 'Enterprise Object-Relational DB',
      code: `CREATE INDEX idx_audit_logs_metadata_gin
ON audit_logs USING GIN (metadata jsonb_path_ops);

SELECT
    id,
    action,
    metadata->>'user_id' AS user_ref,
    created_at
FROM audit_logs
WHERE metadata @> '{"environment": "production", "status": "200"}'
ORDER BY created_at DESC
LIMIT 100;`
    };
  }

  if (cleanKey.includes('sqlite')) {
    return {
      fileName: 'embedded_database.sql',
      tag: 'SQLite 3.45 WAL',
      metric: 'Zero-Config Write-Ahead Logging',
      category: 'Embedded Relational Engine',
      code: `PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA synchronous = NORMAL;

CREATE TABLE IF NOT EXISTS local_cache (
    key TEXT PRIMARY KEY NOT NULL,
    value BLOB NOT NULL,
    expires_at INTEGER NOT NULL
);
CREATE INDEX idx_local_cache_expiry ON local_cache(expires_at);`
    };
  }

  if (cleanKey.includes('mongo')) {
    return {
      fileName: 'aggregation_pipeline.js',
      tag: 'MongoDB 7.0 Document DB',
      metric: 'Distributed BSON Document Sharding',
      category: 'NoSQL Data Architecture',
      code: `db.operational_telemetry.aggregate([
  { $match: { status: "ACTIVE", environment: "production" } },
  { $group: {
      _id: "$service_name",
      totalRequests: { $sum: 1 },
      avgLatencyMs: { $avg: "$response_time_ms" }
    }
  },
  { $sort: { avgLatencyMs: 1 } },
  { $limit: 10 }
]);`
    };
  }

  if (cleanKey.includes('git') && !cleanKey.includes('github')) {
    return {
      fileName: 'release_workflow.sh',
      tag: 'Git 2.44 Distributed VCS',
      metric: 'Cryptographic SHA-1 Commit Tree',
      category: 'Version Control Architecture',
      code: `$ git checkout -b feature/production-telemetry
$ git add -p src/services/
$ git commit -m "feat(telemetry): atomic health check dispatch"
$ git rebase origin/main
$ git push origin feature/production-telemetry
✓ 0 Merge Conflicts • Fast-forward rebase verified`
    };
  }

  if (cleanKey.includes('github')) {
    return {
      fileName: 'ci-cd-pipeline.yml',
      tag: 'GitHub Actions 2.0',
      metric: 'Automated CI/CD Test & Deploy Matrix',
      category: 'Cloud DevOps & Automation',
      code: `name: Production CI/CD Pipeline
on:
  push:
    branches: [main, release/*]
  pull_request:
    branches: [main]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Full-Stack Stack
        uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -r requirements.txt && pytest
      - name: Docker Deploy
        run: docker compose -f docker-compose.prod.yml up -d --build`
    };
  }

  if (cleanKey.includes('vscode')) {
    return {
      fileName: 'launch.json',
      tag: 'Visual Studio Code 1.88+',
      metric: 'Full-Stack Multi-Target Debugger',
      category: 'Developer Environment',
      code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Django Runserver",
      "type": "debugpy",
      "request": "launch",
      "program": "\${workspaceFolder}/manage.py",
      "args": ["runserver", "0.0.0.0:8000"],
      "django": true,
      "justMyCode": true
    },
    {
      "name": "React: Vite Dev Server",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173"
    }
  ]
}`
    };
  }

  if (cleanKey.includes('linux')) {
    return {
      fileName: 'deploy_daemon.sh',
      tag: 'Linux Kernel 6.x / Systemd',
      metric: 'Zero-Downtime Daemon Process Supervisor',
      category: 'Operating System & Shell',
      code: `#!/usr/bin/env bash
set -euo pipefail

echo "=== Initializing Systemd Service Health Check ==="
systemctl daemon-reload
systemctl restart gunicorn.service
systemctl status gunicorn.service --no-pager

# Telemetry inspection
journalctl -u gunicorn.service -n 50 --no-pager
echo "System Telemetry: Active & Running on Port 8000"`
    };
  }

  if (cleanKey.includes('figma')) {
    return {
      fileName: 'design-tokens.tokens.json',
      tag: 'Figma Auto-Layout 5.0',
      metric: 'Centralized Typographic & Color Scales',
      category: 'UI/UX Design Systems',
      code: `{
  "global": {
    "color": {
      "brand-primary": { "value": "#F24E1E", "type": "color" },
      "surface-dark": { "value": "#0F172A", "type": "color" },
      "emerald-accent": { "value": "#10B981", "type": "color" }
    },
    "typography": {
      "display-h1": { "fontSize": "48px", "fontWeight": 900, "lineHeight": 1.1 },
      "body-mono": { "fontFamily": "JetBrains Mono", "fontSize": "13px" }
    },
    "elevation": {
      "card-deep": { "blur": "32px", "spread": "-4px", "color": "rgba(0,0,0,0.12)" }
    }
  }
}`
    };
  }

  if (cleanKey.includes('redis')) {
    return {
      fileName: 'cache_service.py',
      tag: 'Redis 7.2 In-Memory Store',
      metric: 'Sub-Millisecond Read/Write Latency',
      category: 'In-Memory Cache & Message Broker',
      code: `import redis.asyncio as aioredis
from typing import Optional

redis_client = aioredis.from_url("redis://localhost:6379/0", decode_responses=True)

async def get_cached_telemetry(key: str) -> Optional[dict]:
    cached = await redis_client.get(key)
    if cached:
        return orjson.loads(cached)
    return None

async def set_cached_telemetry(key: str, data: dict, ttl: int = 3600):
    await redis_client.set(key, orjson.dumps(data), ex=ttl)`
    };
  }

  if (cleanKey.includes('html')) {
    return {
      fileName: 'index.html',
      tag: 'HTML5 Semantic Standard',
      metric: 'Accessible ARIA Landmarks & SEO Architecture',
      category: 'Hypertext Markup Architecture',
      code: `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise Full-Stack Architecture</title>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased font-sans">
    <header role="banner" class="sticky top-0 z-50 backdrop-blur-md">
      <nav role="navigation" aria-label="Main Navigation">
        <!-- High-Performance Reactive Nav -->
      </nav>
    </header>
    <main role="main" id="content">
      <section aria-labelledby="skills-heading">...</section>
    </main>
  </body>
</html>`
    };
  }

  if (cleanKey.includes('vite')) {
    return {
      fileName: 'vite.config.js',
      tag: 'Vite 5.x / Rollup Bundler',
      metric: 'Instant Hot Module Replacement (HMR)',
      category: 'Next-Gen Frontend Tooling',
      code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    watch: { usePolling: true },
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: { manualChunks: { vendor: ['react', 'react-dom'] } }
    }
  }
});`
    };
  }

  if (cleanKey.includes('bootstrap')) {
    return {
      fileName: 'custom-bootstrap.scss',
      tag: 'Bootstrap 5.3 Framework',
      metric: '12-Column Responsive Flexbox Architecture',
      category: 'Frontend UI Toolkit',
      code: `// Custom SCSS overrides for Bootstrap 5.3
$primary: #7952b3;
$enable-shadows: true;
$enable-rounded: true;

@import "bootstrap/scss/bootstrap";

.custom-interactive-card {
  @extend .card, .border-0, .shadow-sm;
  transition: transform 200ms ease, box-shadow 200ms ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  }
}`
    };
  }

  if (cleanKey.includes('aws')) {
    return {
      fileName: 's3_storage_pipeline.py',
      tag: 'AWS SDK (Boto3) / Cloud Infrastructure',
      metric: 'S3 Multi-Region High-Availability Sync',
      category: 'Cloud Services & DevOps',
      code: `import boto3
from botocore.config import Config

s3_client = boto3.client(
    's3',
    region_name='us-east-1',
    config=Config(signature_version='s3v4', retries={'max_attempts': 3})
)

def upload_secure_asset(bucket_name: str, file_path: str, s3_key: str):
    """Uploads encrypted artifact with strict access control."""
    s3_client.upload_file(
        Filename=file_path,
        Bucket=bucket_name,
        Key=s3_key,
        ExtraArgs={'ServerSideEncryption': 'AES256', 'ACL': 'private'}
    )`
    };
  }

  if (cleanKey.includes('postman')) {
    return {
      fileName: 'api_test_suite.json',
      tag: 'Postman Collection v2.1',
      metric: 'Automated Contract Regression Suite',
      category: 'API Testing & Quality Assurance',
      code: `{
  "info": { "name": "Enterprise API Automation Suite", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
  "item": [
    {
      "name": "Health Check & Status",
      "request": { "method": "GET", "url": "{{BASE_URL}}/api/v1/health/" },
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test('Status code is 200', () => pm.response.to.have.status(200));",
              "pm.test('Latency is under 100ms', () => pm.expect(pm.response.responseTime).to.be.below(100));"
            ]
          }
        }
      ]
    }
  ]
}`
    };
  }

  if (cleanKey.includes('celery')) {
    return {
      fileName: 'tasks.py',
      tag: 'Celery 5.x Distributed Queue',
      metric: 'Asynchronous Worker Task Spooling',
      category: 'Distributed Task Processing',
      code: `from celery import shared_task
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def process_background_export(self, user_id: int, report_id: str):
    try:
        logger.info(f"Dispatching task {self.request.id} for user {user_id}")
        generate_pdf_report(report_id)
        return {"status": "SUCCESS", "report_id": report_id}
    except Exception as exc:
        raise self.retry(exc=exc)`
    };
  }

  if (cleanKey.includes('graphql')) {
    return {
      fileName: 'schema.graphql',
      tag: 'GraphQL Apollo Engine',
      metric: 'Declarative Single-Roundtrip Graph Querying',
      category: 'Graph API Architecture',
      code: `type TourPackage {
  id: ID!
  title: String!
  price: Float!
  durationDays: Int!
  destination: Destination!
}

type Query {
  activePackages(limit: Int = 10): [TourPackage!]!
  packageById(id: ID!): TourPackage
}

type Mutation {
  bookTour(packageId: ID!, travelerCount: Int!): BookingPayload!
}`
    };
  }

  if (cleanKey.includes('node')) {
    return {
      fileName: 'server.js',
      tag: 'Node.js 20 LTS / V8',
      metric: 'Non-Blocking High-Concurrency Event Loop',
      category: 'Server-Side JavaScript',
      code: `import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ACTIVE', uptime: process.uptime(), memory: process.memoryUsage() });
});

app.listen(3000, () => console.log('Server running on port 3000'));`
    };
  }

  if (cleanKey.includes('c++') || cleanKey === 'cpp') {
    return {
      fileName: 'concurrent_engine.cpp',
      tag: 'C++20 Native Systems',
      metric: 'Zero-Cost Abstractions & SIMD Concurrency',
      category: 'High-Performance Systems',
      code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main() {
    std::vector<double> telemetry_stream(1'000'000, 1.0);
    // Parallel vectorized computation
    std::for_each(std::execution::par_unseq, telemetry_stream.begin(), telemetry_stream.end(), [](double& n) {
        n = (n * 3.14159) / 2.71828;
    });
    std::cout << "Processed 1M records with SIMD hardware acceleration.\\n";
    return 0;
}`
    };
  }

  if (cleanKey.includes('java') && !cleanKey.includes('script')) {
    return {
      fileName: 'ApplicationService.java',
      tag: 'Java 21 LTS / Spring Boot 3',
      metric: 'Enterprise Virtual Threads & ACID Transactions',
      category: 'Enterprise Microservices',
      code: `package com.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnterpriseDispatcherService {
    @Transactional(readOnly = true)
    public TelemetryResponse fetchTelemetry(String traceId) {
        // Runs on lightweight Java 21 Project Loom virtual threads
        return telemetryRepository.findByTraceId(traceId)
            .orElseThrow(() -> new RecordNotFoundException(traceId));
    }
}`
    };
  }

  if (cleanKey.includes('flutter')) {
    return {
      fileName: 'main.dart',
      tag: 'Flutter 3.x / Skia Canvas',
      metric: '120 FPS Cross-Platform Reactive UI',
      category: 'Cross-Platform Mobile',
      code: `import 'package:flutter/material.dart';

void main() => runApp(const EnterpriseApp());

class EnterpriseApp extends StatelessWidget {
  const EnterpriseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true),
      home: const Scaffold(
        body: Center(child: Text('120 FPS Smooth Mobile Telemetry')),
      ),
    );
  }
}`
    };
  }

  if (cleanKey.includes('firebase')) {
    return {
      fileName: 'firestore.rules',
      tag: 'Firebase Cloud Firestore',
      metric: 'Real-Time NoSQL Security & Indexing',
      category: 'Cloud Backend as a Service',
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /public_telemetry/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}`
    };
  }

  // Fallback default
  return {
    fileName: `${cleanKey}.architecture.ts`,
    tag: `${displayName} Architecture`,
    metric: 'Production-Grade Standardized Execution',
    category: 'Engineering Architecture',
    code: `// ${displayName} Production Workbench
export interface ArchitectureSpec {
  technology: "${displayName}";
  executionTier: "Production Grade";
  verifiedIntegrity: true;
  scalability: "High Throughput";
}

export const activeSpec: ArchitectureSpec = {
  technology: "${displayName}",
  executionTier: "Production Grade",
  verifiedIntegrity: true,
  scalability: "High Throughput"
};`
  };
}

export default function SkillDetailModal({ isOpen, onClose, skillKey }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [laptopTab, setLaptopTab] = useState('code');

  useEffect(() => {
    if (!isOpen) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setCopiedCode(false);
      setIsCloseHovered(false);
      setLaptopTab('code');
      return;
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const isOtherModalOpen = Boolean(sessionStorage.getItem('open_project_id'));
      if (!isOtherModalOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !skillKey) return null;

  const profile = resolveSkillProfile(skillKey);
  const brandColor = profile.brandColor || '#0070F3';
  const cleanKey = String(skillKey).toLowerCase().trim();
  const telemetry = getSkillWorkbenchTelemetry(cleanKey, profile.displayName);

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const modulesText = (profile.modules || [])
      .map((m) => `${m.title}: ${m.desc}`)
      .join('. ');
    const textToSpeak = `${profile.displayName}. ${modulesText}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(telemetry.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const renderSkillIcon = () => {
    if (cleanKey.includes('docker')) {
      return <i className="devicon-docker-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('css') && !cleanKey.includes('tailwind')) {
      return <i className="devicon-css3-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('html')) {
      return <i className="devicon-html5-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('tailwind')) {
      return <i className="devicon-tailwindcss-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('python')) {
      return (
        <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 128 128">
          <path fill="#387EB8" d="M63.2 4.2c-7.7.1-15.1.7-21.7 1.8-19.4 3.1-23 9.6-23 21.5v15.8h44.6v4.5H23.5C10.7 47.8 0 55.4 0 71.4c0 15.6 9.4 23.9 23.3 23.9h13.5v-18.7c0-13.6 11.7-24.9 25.7-24.9h44v-26c0-11.4-9.6-20.1-23.2-21.5-6.8-.7-13.4-1-20.1-1z" />
          <path fill="#FFE052" d="M64.8 123.8c7.7-.1 15.1-.7 21.7-1.8 19.4-3.1 23-9.6 23-21.5v-15.8H64.9v-4.5h39.6c12.8 0 23.5-7.6 23.5-23.6 0-15.6-9.4-23.9-23.3-23.9H91.2v18.7c0 13.6-11.7 24.9-25.7 24.9h-44v26c0 11.4 9.6 20.1 23.2 21.5 6.8.7 13.4 1 20.1 1z" />
          <circle cx="47" cy="18.5" r="4.5" fill="#fff" />
          <circle cx="81" cy="109.5" r="4.5" fill="#fff" />
        </svg>
      );
    }
    if (cleanKey.includes('django') && !cleanKey.includes('rest')) {
      return <span className="font-serif font-black text-2xl sm:text-3xl text-[#0C4B33] tracking-tight">dj</span>;
    }
    if (cleanKey.includes('rest') || cleanKey.includes('drf')) {
      return <span className="font-black text-xs sm:text-sm text-[#E11D48] tracking-tight">REST</span>;
    }
    if (cleanKey.includes('react')) {
      return <i className="fa-brands fa-react text-[#00D8FF] text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('javascript') || cleanKey === 'js') {
      return <i className="devicon-javascript-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('mysql')) {
      return <i className="devicon-mysql-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('postgres')) {
      return <i className="devicon-postgresql-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('mongo')) {
      return <i className="devicon-mongodb-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('sqlite')) {
      return <i className="devicon-sqlite-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('git') && !cleanKey.includes('github')) {
      return <i className="devicon-git-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('github')) {
      return <i className="devicon-github-original text-slate-900 text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('vscode')) {
      return <i className="devicon-vscode-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('linux')) {
      return <i className="devicon-linux-plain text-slate-900 text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('figma')) {
      return <i className="devicon-figma-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('bootstrap')) {
      return <i className="devicon-bootstrap-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('vite')) {
      return <i className="devicon-vitejs-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('node')) {
      return <i className="devicon-nodejs-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('c++') || cleanKey === 'cpp') {
      return <i className="devicon-cplusplus-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('java') && !cleanKey.includes('script')) {
      return <i className="devicon-java-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('flutter')) {
      return <i className="devicon-flutter-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('dart')) {
      return <i className="devicon-dart-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('android')) {
      return <i className="devicon-android-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('kotlin')) {
      return <i className="devicon-kotlin-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('redis')) {
      return <i className="devicon-redis-plain colored text-3xl sm:text-4xl"></i>;
    }
    if (cleanKey.includes('firebase')) {
      return <i className="devicon-firebase-plain colored text-3xl sm:text-4xl"></i>;
    }
    return <i className="fa-solid fa-code text-3xl sm:text-4xl" style={{ color: profile.brandColor }}></i>;
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] w-full h-full bg-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-text no-scrollbar skill-modal-scrollbar-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        opacity: 1,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Top-Right Circular Close Button (Matches reference: white with brand border ring, filled with brand color on hover/touch) */}
      <button
        type="button"
        onClick={onClose}
        onMouseEnter={() => setIsCloseHovered(true)}
        onMouseLeave={() => setIsCloseHovered(false)}
        onTouchStart={() => setIsCloseHovered(true)}
        onTouchEnd={() => setIsCloseHovered(false)}
        onFocus={() => setIsCloseHovered(true)}
        onBlur={() => setIsCloseHovered(false)}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 lg:top-8 lg:right-8 z-50 w-9 h-9 sm:w-10.5 sm:h-10.5 lg:w-11 lg:h-11 aspect-square rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-95 hover:scale-105 animate-skill-item-entrance"
        style={{
          animationDelay: '0.1s',
          backgroundColor: isCloseHovered ? brandColor : '#ffffff',
          border: `2px solid ${brandColor}`,
          color: isCloseHovered ? '#ffffff' : brandColor,
          boxShadow: isCloseHovered
            ? `0 8px 24px ${brandColor}66`
            : `0 4px 14px ${brandColor}33`,
        }}
        title="Close (Esc)"
        aria-label="Close skill detail"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-colors duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Seamless Full-Page Content Layout - Stationary (Scrolled Not Moving) */}
      <div
        key={cleanKey}
        className="w-full max-w-7xl mx-auto px-3.5 xs:px-4 sm:px-8 lg:px-12 pt-[74px] xs:pt-[80px] pb-4 sm:py-5 lg:py-6 h-full flex flex-col justify-start lg:justify-center overflow-y-auto lg:overflow-hidden no-scrollbar skill-modal-scrollbar-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center">

          {/* Left Column: Authentic Level-Position Laptop for All Skills with Dynamic Skill Code & Architecture Visualization (Hidden on Mobile) */}
          <div
            className="hidden lg:block lg:col-span-5 space-y-4 lg:self-center animate-skill-laptop-entrance"
            style={{ animationDelay: '0.05s' }}
          >
            <div
              className="relative w-full max-w-[620px] mx-auto select-none transform sm:scale-[1.04] lg:scale-[1.08] origin-center transition-transform duration-300"
            >
              {/* Embedded Interactive Screen Display Inside the Laptop Screen */}
              <div
                className="absolute overflow-hidden bg-slate-950 flex flex-col font-mono text-xs shadow-inner"
                style={{
                  top: '5.26%',
                  left: '4.62%',
                  width: '90.64%',
                  height: '80.45%',
                  borderRadius: '4px 4px 0 0',
                  zIndex: 1,
                }}
              >
                {/* Screen Titlebar with Tabs */}
                <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 bg-slate-900/95 border-b border-slate-800/80 shrink-0">
                  <div className="flex items-center gap-1.5">
                    {/* Interactive Tab Switches */}
                    <div className="flex items-center gap-1 p-0.5 rounded bg-slate-950/70 border border-slate-800/70 text-[9px]">
                      <button
                        type="button"
                        onClick={() => setLaptopTab('code')}
                        className={`px-1.5 py-0.5 rounded font-mono font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          laptopTab === 'code'
                            ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <i className="fa-regular fa-file-code text-sky-400"></i>
                        <span className="truncate max-w-[120px]">{telemetry.fileName}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLaptopTab('flow')}
                        className={`px-1.5 py-0.5 rounded font-mono font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                          laptopTab === 'flow'
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <i className="fa-solid fa-diagram-project text-emerald-400"></i>
                        <span>Runtime Flow</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1 text-[8.5px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ACTIVE
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="text-slate-400 hover:text-white transition-colors text-[10px] px-1 py-0.5 rounded cursor-pointer"
                      title="Copy code snippet"
                    >
                      {copiedCode ? (
                        <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                      ) : (
                        <i className="fa-regular fa-copy text-xs"></i>
                      )}
                    </button>
                  </div>
                </div>

                {/* Screen Content Body */}
                {laptopTab === 'code' ? (
                  <div className="p-2.5 sm:p-3 text-slate-300 leading-relaxed overflow-y-auto custom-slim-scrollbar flex-1">
                    <pre className="font-mono text-[9px] sm:text-[10px] leading-relaxed">
                      <code>{telemetry.code}</code>
                    </pre>
                  </div>
                ) : (
                  /* Live Architecture Visualization Tab */
                  <div className="p-2 sm:p-2.5 space-y-1 overflow-y-auto custom-slim-scrollbar font-sans flex-1">
                    <div className="flex items-center justify-between text-[9px] text-slate-400 pb-0.5 border-b border-slate-800/60 font-mono">
                      <span className="truncate max-w-[200px]">{profile.displayName.toUpperCase()} ARCHITECTURE</span>
                      <span className="text-emerald-400 shrink-0">● 60 FPS Event Loop</span>
                    </div>

                    {/* Interactive Topic Flow Cards */}
                    <div className="grid grid-cols-1 gap-1">
                      {(profile.modules || []).map((item, index) => {
                        const stepColors = ['#38BDF8', '#818CF8', '#34D399', '#F472B6', '#FBBF24', '#A78BFA'];
                        const itemColor = stepColors[index % stepColors.length];
                        return (
                          <div
                            key={`${item.title}-${index}`}
                            className="flex items-center gap-2 p-1 rounded bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
                          >
                            <span
                              className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-mono font-bold text-white shrink-0"
                              style={{ backgroundColor: `${itemColor}33`, color: itemColor }}
                            >
                              {index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="text-[9.5px] font-bold text-slate-200 truncate">{item.title}</div>
                              <div className="text-[8px] text-slate-400 truncate">{item.desc}</div>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Laptop Screen Footer Telemetry */}
                <div className="px-2.5 py-1 bg-slate-900/80 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-400 shrink-0">
                  <span className="truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Runtime: {telemetry.tag}
                  </span>
                  <span className="text-slate-500 text-[8.5px]">UTF-8 • Verified</span>
                </div>
              </div>

              {/* 2nd Image Level-Position Laptop Frame (Bezel, Webcam, Base with Center Notch, Feet) */}
              <img
                src={laptopLevelFrameImg}
                alt={`${profile.displayName} Laptop Level Position`}
                className="relative w-full h-auto block select-none pointer-events-none drop-shadow-2xl z-10"
              />
            </div>
          </div>

          {/* Content Column: Full-width on mobile (<lg), 7 cols on Desktop (lg:) */}
          <div className="w-full lg:col-span-7 space-y-3 xs:space-y-3.5 lg:space-y-4">

            {/* MOBILE-ONLY HEADER (< lg): Left Info (Icon, Name, Open Official Tool + Audio) & Right Real Showing Laptop */}
            <div
              className="flex lg:hidden items-center justify-between gap-3.5 xs:gap-4 pb-3 xs:pb-3.5 border-b border-slate-100 animate-skill-item-entrance"
              style={{ animationDelay: '0.15s' }}
            >
              {/* Left Side: Skill Icon + Name, and beneath: Open Official Tool + Audio */}
              <div className="flex flex-col justify-center gap-2.5 xs:gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-1.5 shrink-0">
                    {renderSkillIcon()}
                  </div>
                  <h1 className="text-xl xs:text-2xl font-black text-slate-900 tracking-tight truncate">
                    {profile.displayName}
                  </h1>
                </div>

                <div className="flex items-center gap-1.5 xs:gap-2 flex-nowrap">
                  {profile.officialUrl && (
                    <a
                      href={profile.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 xs:px-3 xs:py-1.5 rounded-xl text-white font-extrabold text-[11px] xs:text-xs shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${profile.brandColor || '#EF4444'}, #E11D48)`,
                        boxShadow: `0 3px 10px ${profile.brandColor || '#EF4444'}35`,
                      }}
                      title={`Open official documentation for ${profile.displayName}`}
                    >
                      <span>Open Official Tool</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[9.5px] xs:text-[10px]"></i>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className={`w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isPlayingAudio
                        ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                        : 'bg-white border-slate-200 text-slate-700 active:bg-slate-50 shadow-2xs'
                    }`}
                    title={isPlayingAudio ? 'Stop Reading' : 'Listen to summary'}
                    aria-label="Listen to summary"
                  >
                    <i className={`fa-solid ${isPlayingAudio ? 'fa-volume-xmark' : 'fa-volume-high'} text-xs xs:text-[13px]`}></i>
                  </button>
                </div>
              </div>

              {/* Right Side: Real Showing Laptop (Increased Size) */}
              <div className="w-[166px] xs:w-[188px] sm:w-[205px] -mr-1 xs:-mr-1.5 shrink-0 self-center">
                <div className="relative w-full select-none">
                  {/* Embedded Interactive Screen Display Inside the Laptop Screen */}
                  <div
                    className="absolute overflow-hidden bg-slate-950 flex flex-col font-mono shadow-inner"
                    style={{
                      top: '5.26%',
                      left: '4.62%',
                      width: '90.64%',
                      height: '80.45%',
                      borderRadius: '3px 3px 0 0',
                      zIndex: 1,
                    }}
                  >
                    {/* Compact Screen Titlebar */}
                    <div className="flex items-center justify-between px-1.5 py-0.5 bg-slate-900/95 border-b border-slate-800/80 shrink-0">
                      <div className="flex items-center gap-1 min-w-0">
                        <i className="fa-regular fa-file-code text-sky-400 text-[8px] shrink-0"></i>
                        <span className="text-[8px] xs:text-[8.5px] text-sky-300 font-mono font-bold truncate max-w-[85px] xs:max-w-[100px]">
                          {telemetry.fileName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                    </div>

                    {/* Compact Screen Code Content */}
                    <div className="px-1.5 py-1 text-slate-300 overflow-hidden flex-1 custom-slim-scrollbar bg-slate-950">
                      <pre className="font-mono text-[6px] xs:text-[6.5px] sm:text-[7px] leading-[1.3] text-slate-300 overflow-hidden">
                        <code>{telemetry.code}</code>
                      </pre>
                    </div>

                    {/* Compact Screen Footer Telemetry */}
                    <div className="px-1.5 py-0.5 bg-slate-900/90 border-t border-slate-800/60 flex items-center justify-between text-[6.5px] xs:text-[7px] text-slate-400 shrink-0">
                      <span className="truncate flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        {telemetry.tag}
                      </span>
                      <span className="text-slate-500 text-[6px] xs:text-[6.5px]">UTF-8</span>
                    </div>
                  </div>

                  {/* Laptop Level-Position Frame */}
                  <img
                    src={laptopLevelFrameImg}
                    alt={`${profile.displayName} Laptop`}
                    className="relative w-full h-auto block select-none pointer-events-none drop-shadow-md z-10"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Header Row: Icon, Skill Name, Open Official Tool & Audio Button (Hidden on Mobile) */}
            <div
              className="hidden lg:flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 animate-skill-item-entrance"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-2">
                  {renderSkillIcon()}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight">
                  {profile.displayName}
                </h1>
              </div>

              {/* Right Action Buttons - Moved to the right */}
              <div className="flex items-center gap-2.5 sm:gap-3 ml-auto justify-end shrink-0">
                {profile.officialUrl && (
                  <a
                    href={profile.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] hover:opacity-95 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${profile.brandColor || '#EF4444'}, #E11D48)`,
                      boxShadow: `0 4px 14px ${profile.brandColor || '#EF4444'}40`,
                    }}
                    title={`Open official documentation for ${profile.displayName}`}
                  >
                    <span>Open Official Tool</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className={`w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                  }`}
                  title={isPlayingAudio ? 'Stop Reading' : 'Listen to summary'}
                  aria-label="Listen to summary"
                >
                  <i className={`fa-solid ${isPlayingAudio ? 'fa-volume-xmark' : 'fa-volume-high'} text-sm`}></i>
                </button>
              </div>
            </div>

            {/* Core Competency & Knowledge Modules (Staggered slowly and smoothly one by one) */}
            <div className="space-y-1.5 xs:space-y-2 lg:space-y-3">
              {(profile.modules || []).map((module, idx) => (
                <div
                  key={`${module.title}-${idx}`}
                  className="transition-all duration-200 animate-skill-item-entrance"
                  style={{ animationDelay: `${0.25 + idx * 0.1}s` }}
                >
                  <h4 className="text-[10px] xs:text-[10.5px] lg:text-[10.5px] sm:lg:text-xs font-black tracking-wider uppercase text-slate-800 mb-0.5 lg:mb-1">
                    {module.title}
                  </h4>
                  <div
                    className="p-1.5 xs:p-2 lg:p-2.5 sm:lg:p-3 rounded-lg lg:rounded-xl bg-slate-50/70 border border-slate-200/80 text-[11px] xs:text-[11.5px] lg:text-xs sm:lg:text-[13px] text-slate-700 leading-snug lg:leading-relaxed font-normal shadow-2xs"
                    style={{
                      borderLeftWidth: '3.5px',
                      borderLeftColor: profile.brandColor || '#EF4444',
                    }}
                  >
                    {module.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
