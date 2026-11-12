import React, { useState, useEffect, useCallback, useRef } from 'react';
import { assetUrl } from '../utils/assetUrl';
import { mergeWithCoreCertificates } from '../data/certificatesData';
import Modal from '../components/ui/Modal';
import CertificatePreviewModal from '../components/ui/CertificatePreviewModal';
import SkillsMarquee from '../components/ui/SkillsMarquee';
import AboutSection from '../components/sections/AboutSection';
import EducationSection from '../components/sections/EducationSection';
import TripGenWaterfall from '../components/common/TripGenWaterfall';
import IdsAntigravityCyberAnimation from '../components/IdsAntigravityCyberAnimation';
import IdsFuturisticHeroSection from '../components/IdsFuturisticHeroSection';
import IdsDualDashboardShowcase from '../components/IdsDualDashboardShowcase';
import IdsArchitecture10WorkflowAnimation from '../components/IdsArchitecture10WorkflowAnimation';
import IdsSystemHistorySimulation from '../components/IdsSystemHistorySimulation';
import IdsVennDiagramModules from '../components/IdsVennDiagramModules';
import IdsScreenshotsShowcase from '../components/IdsScreenshotsShowcase';
import IdsInteractiveModuleShowcase from '../components/IdsInteractiveModuleShowcase';
import IdsArchitectureWorkflowPanel from '../components/IdsArchitectureWorkflowPanel';
import IdsTechnologiesUsed from '../components/IdsTechnologiesUsed';
import IdsProjectOverview from '../components/IdsProjectOverview';
import IdsAcademicPresentationScreenshots from '../components/IdsAcademicPresentationScreenshots';
import IdsExperimentalResults from '../components/IdsExperimentalResults';
import IdsFutureScope from '../components/IdsFutureScope';
import IdsSecurityNotes from '../components/IdsSecurityNotes';
import IdsHeader from '../components/IdsHeader';
import TripGenWorkflowArchitecture from '../components/TripGenWorkflowArchitecture';
import TripGenKeyFeatures from '../components/TripGenKeyFeatures';
import TripGenProjectOverview from '../components/TripGenProjectOverview';
import TripGenContributions from '../components/TripGenContributions';
import TripGenHeader from '../components/TripGenHeader';
import TripGenSecurityNotes from '../components/TripGenSecurityNotes';
import TripGenTestingValidation from '../components/TripGenTestingValidation';
import TripGenVerificationLog from '../components/TripGenVerificationLog';
import EnglishMasterHeader from '../components/EnglishMasterHeader';
import EnglishMasterInteractiveModules from '../components/EnglishMasterInteractiveModules';
import EnglishMasterFeaturePillars from '../components/EnglishMasterFeaturePillars';
import EnglishMasterWorkflowScreenshots from '../components/EnglishMasterWorkflowScreenshots';
import EnglishMasterAuthOnboarding from '../components/EnglishMasterAuthOnboarding';
import EnglishMasterAspectsTable from '../components/EnglishMasterAspectsTable';
import EnglishMasterFooter from '../components/EnglishMasterFooter';
import EnglishMasterCurvedOverview from '../components/EnglishMasterCurvedOverview';
import EnglishMasterTechStackFlow from '../components/EnglishMasterTechStackFlow';
import EnglishMasterRoadmapOutcome from '../components/EnglishMasterRoadmapOutcome';
import EnglishMasterFutureScopeWheel from '../components/EnglishMasterFutureScopeWheel';
import EnglishMasterKeyFeaturesTimeline from '../components/EnglishMasterKeyFeaturesTimeline';
import { TRIPGEN_SCREENSHOTS, TRIPGEN_CATEGORIES, TRIPGEN_MODULE_IMAGES } from '../data/tripgenGalleryData';

const CORE_PROJECTS = [
  {
    id: 'travel-planner',
    title: 'TripGen (Travel Plan Itinerary Generator)',
    category: 'Python • Django • MySQL • Full-Stack Web App',
    image: assetUrl('project-travel-planner.png'),
    desc: 'TripGen is a travel planning web application that helps users explore destinations, find tour packages, plan itineraries, book hotels and transportation, and manage their trips. It also provides tools for administrators and employees to manage bookings, users, and customer feedback.',
    longDesc: 'TripGen is a travel planning web application that helps users explore destinations, find tour packages, plan itineraries, book hotels and transportation, and manage their trips. It also provides tools for administrators and employees to manage bookings, users, and customer feedback.',
    problemStatement: 'Planning multi-day travel typically requires juggling disconnected booking sites, disparate transport schedules, and uncoordinated hotel reservations, causing booking friction and scheduling confusion.',
    solution: 'TripGen delivers an integrated travel planning and booking management web application engineered with Python, Django, and MySQL. It unites public destination discovery, administrative audit control, employee catalog management, and traveler booking operations.',
    features: [
      'Public / Guest Discovery: Destination search bar, traveler count selector, and featured travel destinations (Vizag, Bangalore, Hyderabad, and Goa).',
      'Administrator Control Hub: Employee onboarding, directory management, and date-filtered authentication audit logs.',
      'Employee Operations Console: Management of tour itineraries, multi-modal transport (flights, buses, trains), hotel accommodations, master bookings, and feedback review.',
      'Traveler Account & Bookings: User registration, authentication, tour package checkout, transport & hotel reservation, cancellation handling, and feedback submission.',
      'Normalized Relational Data Architecture: MySQL relational schema connecting users, employees, packages, transport routes, hotels, reservations, and feedback.',
      'Role-Based Navigation & Dashboards: Dedicated, security-guarded portals for Admins, Employees, and Travelers with tailored operational dashboards.'
    ],
    workflow: [
      { step: '1. User Input & Search', desc: 'Guests and travelers search destinations, dates, packages, transport, and hotels via responsive forms.' },
      { step: '2. Django Views & Business Logic', desc: 'Django views validate incoming form payloads, enforce role permissions, and execute business logic.' },
      { step: '3. MySQL Database Operations', desc: 'CRUD operations persist and retrieve package catalogs, transport routes, hotel inventories, audit logs, and bookings.' },
      { step: '4. Dynamic Response & Dashboards', desc: 'Templates render personalized dashboards, reservation receipts, directories, and confirmation notices.' }
    ],
    techStack: {
      backend: ['Python', 'Django', 'Django REST Framework'],
      database: ['MySQL (Normalized relational schema)'],
      frontend: ['HTML5', 'CSS3', 'JavaScript'],
      tools: ['VS Code', 'Git', 'GitHub', 'MySQL Workbench', 'Postman']
    },
    highlights: [
      'Comprehensive 36-module role-based architecture spanning Public, Admin, Employee, and Traveler workflows.',
      'Normalized MySQL relational schema managing users, packages, transport, hotels, reservations, and feedback.',
      'Dedicated authentication portals and operational dashboards tailored to distinct user privileges.',
      'Thorough testing covering form validation, credentials, CRUD operations, date filters, and responsive design.'
    ],
    futureScope: [
      'Production password migration from development credentials to Django PBKDF2/Argon2 hashing.',
      'Live payment gateway integration (Razorpay / Stripe) for automated payment authorization.',
      'Interactive map integration and live weather forecast notifications for travel itineraries.'
    ],
    tags: ['Python', 'Django', 'MySQL', 'Full-Stack Web App', 'Django REST'],
    liveUrl: 'https://github.com/TRIPUROSUNDAROOBEHERA',
    repoUrl: 'https://github.com/TRIPUROSUNDAROOBEHERA'
  },
  {
    id: 'english-master',
    title: 'English Master Pro',
    category: 'Flutter • Dart • Firebase',
    image: assetUrl('english_master_pro_showcase.jpg'),
    video: assetUrl('english-master-demo.mp4'),
    desc: 'A cross-platform mobile language learning application built with Flutter and Firebase featuring interactive grammar lessons, vocabulary flashcards, and quizzes.',
    longDesc: '',
    problemStatement: 'Language learners frequently struggle with generic learning apps that lack structured learning progression, provide no real-time feedback, or require continuous online connectivity that hinders studying on the go.',
    solution: 'English Master Pro delivers a structured, bite-sized curriculum categorized into Beginner, Intermediate, and Advanced tiers. Integrated quizzes reinforce learning immediately, while offline local caching paired with Firebase Cloud Firestore enables uninterrupted learning anywhere.',
    objective: 'English Master Pro makes learning English simple, easy, and interactive. It helps users improve their grammar, vocabulary, speaking, and writing skills. The app provides lessons, daily practice, and tests to support learning. It also tracks progress and helps users build confidence in English communication.',
    features: [
      'AI-Powered Learning Guidance: AI-powered learning guidance, if supported.',
      'Grammar and Vocabulary: Build a strong English foundation with structured lessons and practical exercises.',
      'Speaking and Pronunciation: Practice communication and improve pronunciation.',
      'Writing Skills: Practical composition and sentence structure exercises to enhance written English.',
      'Interactive Practice: Reinforce learning through quizzes, exercises, and assessments.',
      'Progress Analytics: Track learning progress with detailed feedback, metrics, and visual analytics.',
      'Learning Achievements: Celebrate milestones with gamified streak rewards and completion achievements.',
      'Certificates: Official course completion certificates, where supported by the application.'
    ],
    workflow: [
      { step: '1. Onboarding & Proficiency Assessment', desc: 'Learner chooses their learning goal and proficiency level to unlock a tailored curriculum path.' },
      { step: '2. Interactive Lesson Study', desc: 'Content is delivered through clear rule explanations, example dialogues, and flashcard practice.' },
      { step: '3. Skill Evaluation & Quizzing', desc: 'Students complete periodic quizzes; answers are evaluated instantly with detailed explanations.' },
      { step: '4. Cloud Sync & Analytics', desc: 'Progress telemetry is synchronized to Cloud Firestore, updating streak counts and unlocking subsequent modules.' }
    ],
    techStack: {
      framework: ['Flutter (Cross-platform Android & iOS)'],
      language: ['Dart'],
      cloudBackend: ['Firebase Authentication', 'Cloud Firestore', 'Firebase Analytics'],
      tools: ['Android Studio / VS Code', 'Flutter DevTools', 'Git & GitHub']
    },
    highlights: [
      'Over 60 structured modules and 500+ interactive practice questions.',
      'Flawless 60 FPS performance across diverse mobile devices.',
      'Offline caching with automatic background synchronization upon network reconnection.'
    ],
    futureScope: [
      'AI-Powered Learning: Provide personalized English learning recommendations.',
      'Speech Recognition: Improve pronunciation through voice analysis and feedback.',
      'Advanced Learning Content: Add more grammar lessons, vocabulary, and speaking exercises.',
      'Live Practice: Enable real-time conversations and interactive speaking sessions.',
      'Progress Analytics: Track learning progress, strengths, and areas for improvement.',
      'Offline Learning: Expand downloadable lessons for learning without internet access.',
      'Gamification: Introduce daily challenges, rewards, badges, and learning streaks.',
      'Multilingual Support: Add regional languages to help beginners understand English easily.'
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile UI', 'Cloud Firestore'],
    repoUrl: 'https://github.com/TRIPUROSUNDAROOBEHERA'
  },
  {
    id: 'intrusion-detection',
    title: 'Intrusion Detection System (IDS)',
    category: 'Machine Learning | Cybersecurity | Django',
    projectStatus: 'Completed',
    projectType: 'MCA Academic Project',
    image: assetUrl('project-ids-showcase.png'),
    desc: 'The Intrusion Detection System (IDS) is a machine learning-based cybersecurity application designed to classify network traffic and identify potentially malicious activities.',
    overview: 'The Intrusion Detection System (IDS) is a machine learning-based cybersecurity application designed to classify network traffic and identify potentially malicious activities. It uses machine learning algorithms and a Django-based web interface to provide intrusion prediction results and model performance information.',
    longDesc: 'The Intrusion Detection System (IDS) is a machine learning-based cybersecurity application designed to classify network traffic and identify potentially malicious activities. It uses machine learning algorithms and a Django-based web interface to provide intrusion prediction results and model performance information.',
    problemStatement: 'Traditional signature-based intrusion detection systems primarily rely on known attack patterns. They may struggle to identify new, modified, or previously unseen threats, creating a need for more adaptive network traffic classification techniques.',
    objective: 'To design and engineer an intelligent, machine learning-driven intrusion detection application using the benchmark NSL-KDD dataset to classify network traffic, detect anomalies in real time, and provide an interactive Django web interface for security monitoring.',
    solution: 'The proposed system uses machine learning algorithms, including Random Forest and Support Vector Machine (SVM), to analyze network traffic features and classify records as normal or potentially malicious. The NSL-KDD dataset supports model training and evaluation, while Django provides the web interface for user authentication, intrusion prediction, and viewing model performance.',
    features: [
      'Network Traffic Monitoring: Monitors network traffic to identify suspicious activities in real-time.',
      'Data Preprocessing: Cleans, transforms, and prepares network data for machine learning analysis.',
      'Machine Learning Detection: Uses a trained machine learning model to identify normal and abnormal network activities.',
      'Attack Classification: Classifies network traffic as normal or potentially malicious, such as DoS, Probe, U2R, and R2L attacks.',
      'Intrusion Prediction: Analyzes network traffic features to predict potential intrusions using machine learning models.',
      'Real-Time Alert System: Generates instant alerts when suspicious activities or potential threats are detected.',
      'User Authentication: Provides secure user registration, login, and access control.',
      'Admin Dashboard: Displays user information, intrusion detection results, and system statistics.',
      'Model Accuracy Results: Presents the performance and accuracy metrics of implemented machine learning algorithms.',
      'Detection Reports: Displays and generates detailed reports on intrusion predictions and detection results.'
    ],
    applicationModules: [
      {
        title: 'Home Page',
        desc: 'Introduces the Intrusion Detection System and provides access to its main features.',
        icon: 'fa-solid fa-house',
        color: 'text-blue-600 bg-blue-100'
      },
      {
        title: 'User Registration and Login',
        desc: 'Enables users to create accounts and securely access the application.',
        icon: 'fa-solid fa-user-lock',
        color: 'text-indigo-600 bg-indigo-100'
      },
      {
        title: 'Admin Dashboard',
        desc: 'Provides administrators with an overview of system activities, users, and detection results.',
        icon: 'fa-solid fa-gauge-high',
        color: 'text-purple-600 bg-purple-100'
      },
      {
        title: 'User Profile Management',
        desc: 'Allows users to view and update their profile information.',
        icon: 'fa-solid fa-id-card',
        color: 'text-amber-600 bg-amber-100'
      },
      {
        title: 'Intrusion Prediction',
        desc: 'Processes network traffic features using a trained machine learning model to predict potential intrusions.',
        icon: 'fa-solid fa-shield-halved',
        color: 'text-cyan-600 bg-cyan-100'
      },
      {
        title: 'Model Accuracy Results',
        desc: 'Displays the performance and accuracy metrics of the implemented machine learning algorithms.',
        icon: 'fa-solid fa-chart-line',
        color: 'text-emerald-600 bg-emerald-100'
      },
      {
        title: 'Admin User Management',
        desc: 'Enables administrators to view, monitor, and manage registered user accounts.',
        icon: 'fa-solid fa-users-gear',
        color: 'text-rose-600 bg-rose-100'
      },
      {
        title: 'Detection Reports',
        desc: 'Provides access to intrusion prediction results and related detection reports.',
        icon: 'fa-solid fa-file-shield',
        color: 'text-teal-600 bg-teal-100'
      }
    ],
    architectureDesc: 'The dataset is used to prepare and evaluate the machine learning models. During prediction, the application validates and preprocesses the input network features, passes them to the trained model, and displays the classification result through the Django interface.',
    trainingPipeline: [
      { step: '1. NSL-KDD Dataset', desc: 'Benchmark network traffic dataset providing comprehensive training & testing flow records.' },
      { step: '2. Data Preprocessing', desc: 'Feature encoding, min-max scaling, handling missing values, and protocol transformation.' },
      { step: '3. Model Training & Evaluation', desc: 'Training multiple ML classifiers (Random Forest, SVM) with cross-validation.' },
      { step: '4. Trained ML Model', desc: 'Serialized model artifacts ready for live inference and scoring.' }
    ],
    predictionPipeline: [
      { step: '1. Network Feature Input (User)', desc: 'User inputs network flow parameters and packet telemetry via Django web forms.' },
      { step: '2. Intrusion Prediction', desc: 'Backend validates, preprocesses inputs, and passes features through trained ML models.' },
      { step: '3. Result Display', desc: 'Classification output (Normal vs. Malicious) and performance telemetry rendered on screen.' }
    ],
    workflow: [
      { step: '1. NSL-KDD Dataset', desc: 'NSL-KDD dataset ingestion and feature preparation.' },
      { step: '2. Data Preprocessing', desc: 'Feature encoding, min-max scaling, and dataset normalization.' },
      { step: '3. Model Training & Evaluation', desc: 'Model training using Random Forest, SVM, Decision Tree, and Extra Trees.' },
      { step: '4. Trained ML Model', desc: 'High-accuracy model ready for live inference and result display.' }
    ],
    techStack: {
      programmingLanguage: ['Python'],
      webFramework: ['Django'],
      machineLearning: ['Machine Learning', 'Scikit-learn'],
      algorithms: ['Random Forest and Support Vector Machine (SVM)'],
      dataset: ['NSL-KDD'],
      dataProcessing: ['NumPy and pandas'],
      frontend: ['HTML', 'CSS', 'JavaScript'],
      database: ['SQL (SQLite / MySQL)'],
      developmentTools: ['Visual Studio Code, Git, and GitHub']
    },
    experimentalResults: {
      description: 'The project evaluates machine learning algorithms using classification accuracy and other relevant performance metrics. The application presents available prediction results, algorithm comparisons, and screenshots of its implemented interfaces.',
      table: [
        { algorithm: 'Random Forest', accuracy: '98.6%', score: 98.6 },
        { algorithm: 'Decision Tree', accuracy: '98%', score: 98.0 },
        { algorithm: 'XGBoost', accuracy: '99%', score: 99.0 },
        { algorithm: 'Extra Trees', accuracy: '99%', score: 99.0 }
      ],
      note: 'Verify these accuracy figures against your actual test results before including them in the final report.'
    },
    futureScope: [
      'Real-Time Detection: Detect threats in live network traffic efficiently.',
      'Deep Learning Models: Use CNN and LSTM to improve detection accuracy and identify unknown attacks.',
      'Hybrid Models: Combine machine learning and deep learning to reduce false positives.',
      'Cloud Deployment: Deploy IDS on AWS, Azure, and Google Cloud for scalable detection.',
      'IoT and Smart Devices: Extend intrusion detection to IoT networks and smart devices.',
      'Encrypted Traffic Analysis: Analyze encrypted network traffic to identify potential threats.',
      'Advanced Attack Detection: Detect advanced threats such as APTs, DDoS attacks, and botnets.',
      'Web and Application Security: Detect web-based attacks such as SQL injection and XSS.',
      'Automated Response System: Automatically block malicious IPs and send real-time security alerts.'
    ],
    securityNotes: [
      'Network Security: Monitor network traffic to identify suspicious activities and potential threats.',
      'Data Collection: Use the NSL-KDD dataset to collect network records for training and testing.',
      'Model Training: Train Random Forest and Support Vector Machine (SVM) models using Scikit-learn.',
      'Detection & Classification: Classify network traffic as normal or malicious based on extracted features.',
      'Logging & Reporting: Store detection results, record security events, and generate reports.',
      'System Implementation: Integrate Python, Django, Scikit-learn, NumPy, and pandas into the IDS application.',
      'Deployment: Run the application on a local server or deploy it to a suitable cloud platform.',
      'Real-Time Monitoring: Analyze incoming network traffic to identify potential intrusions where live traffic integration is supported.',
      'Automated Response: Generate alerts for suspicious activities and support appropriate security actions.',
      'Security Management: Implement secure authentication, role-based access control, protected database operations, and administrator monitoring.'
    ],
    conclusion: {
      text: 'The Intrusion Detection System demonstrates how machine learning and web technologies can be combined to classify network traffic and identify potential security threats. The Django application provides user management, intrusion prediction, and model performance information. The project can be extended with real-time monitoring, automated alerts, and advanced threat detection capabilities.',
      status: 'Completed',
      type: 'MCA Academic Project'
    },
    tags: ['Python', 'Django', 'Machine Learning', 'HTML', 'CSS', 'JavaScript', 'SQL', 'Scikit-learn', 'Cybersecurity', 'NSL-KDD'],
    repoUrl: 'https://github.com/TRIPUROSUNDAROOBEHERA',
    liveUrl: 'https://github.com/TRIPUROSUNDAROOBEHERA'
  }
];

// Helper to format concise title, subtitle, description and tags for Mobile Carousel Card
const getMobileProjectMeta = (proj) => {
  if (!proj) return { title: '', subtitle: '', desc: '', tags: [] };
  if (proj.id === 'travel-planner') {
    return {
      title: 'TripGen',
      subtitle: '(Travel Plan Itinerary Generator)',
      desc: 'A Django-based travel planning application to explore destinations, plan trips, and generate itineraries.',
      tags: ['Python', 'Django', 'MySQL'],
    };
  }
  if (proj.id === 'english-master') {
    return {
      title: 'English Master Pro',
      subtitle: '(Cross-Platform Mobile Learning App)',
      desc: 'A cross-platform mobile language learning application built with Flutter and Firebase featuring interactive grammar lessons, vocabulary flashcards, and quizzes.',
      tags: ['Flutter', 'Dart', 'Firebase'],
    };
  }
  if (proj.id === 'intrusion-detection') {
    return {
      title: 'Intrusion Detection System',
      subtitle: '(Machine Learning & Django IDS)',
      desc: 'A machine learning-based cybersecurity application to classify network traffic, detect anomalies, and monitor real-time threats.',
      tags: ['Python', 'Django', 'Machine Learning'],
    };
  }
  return {
    title: proj.title || '',
    subtitle: '',
    desc: proj.desc || '',
    tags: (proj.tags || []).slice(0, 3),
  };
};

// ─── IDS KEY FEATURES TIMELINE DATA (EXACT MATCH TO INFOGRAPHIC DESIGN) ───
const IDS_KEY_FEATURES_TIMELINE = [
  {
    number: '01',
    title: 'Network Traffic Monitoring',
    desc: 'Monitors network traffic to identify suspicious activities in real-time.',
    icon: (
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M6 10h2l2-3 3 6 2-3h3" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200/90',
    numberColor: 'text-blue-600',
    lineColor: 'bg-blue-400',
    nodeBg: 'bg-blue-600',
    hoverBorder: 'hover:border-blue-400 hover:shadow-[0_8px_24px_-4px_rgba(59,130,246,0.22)]',
    btnHover: 'group-hover:bg-blue-600 group-hover:text-white',
    titleHover: 'group-hover:text-blue-600',
  },
  {
    number: '02',
    title: 'Data Preprocessing',
    desc: 'Cleans, transforms, and prepares network data for machine learning analysis.',
    icon: (
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        <circle cx="17" cy="17" r="3" />
        <path d="M17 13v1" />
        <path d="M17 20v1" />
        <path d="M13 17h1" />
        <path d="M20 17h1" />
      </svg>
    ),
    iconBg: 'bg-purple-50 text-purple-600 border-purple-200/90',
    numberColor: 'text-purple-600',
    lineColor: 'bg-purple-400',
    nodeBg: 'bg-purple-600',
    hoverBorder: 'hover:border-purple-400 hover:shadow-[0_8px_24px_-4px_rgba(168,85,247,0.22)]',
    btnHover: 'group-hover:bg-purple-600 group-hover:text-white',
    titleHover: 'group-hover:text-purple-600',
  },
  {
    number: '03',
    title: 'Machine Learning Detection',
    desc: 'Uses a trained machine learning model to identify normal and abnormal network activities.',
    icon: <i className="fa-solid fa-brain text-lg sm:text-xl"></i>,
    iconBg: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200/90',
    numberColor: 'text-fuchsia-600',
    lineColor: 'bg-fuchsia-400',
    nodeBg: 'bg-fuchsia-600',
    hoverBorder: 'hover:border-fuchsia-400 hover:shadow-[0_8px_24px_-4px_rgba(217,70,239,0.22)]',
    btnHover: 'group-hover:bg-fuchsia-600 group-hover:text-white',
    titleHover: 'group-hover:text-fuchsia-600',
  },
  {
    number: '04',
    title: 'Attack Classification',
    desc: 'Classifies network traffic as normal or potentially malicious, such as DoS, Probe, U2R, and R2L attacks.',
    icon: (
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
      </svg>
    ),
    iconBg: 'bg-rose-50 text-rose-600 border-rose-200/90',
    numberColor: 'text-rose-600',
    lineColor: 'bg-rose-400',
    nodeBg: 'bg-rose-600',
    hoverBorder: 'hover:border-rose-400 hover:shadow-[0_8px_24px_-4px_rgba(244,63,94,0.22)]',
    btnHover: 'group-hover:bg-rose-600 group-hover:text-white',
    titleHover: 'group-hover:text-rose-600',
  },
  {
    number: '05',
    title: 'Intrusion Prediction',
    desc: 'Analyzes network traffic features to predict potential intrusions using machine learning models.',
    icon: (
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/90',
    numberColor: 'text-emerald-600',
    lineColor: 'bg-emerald-400',
    nodeBg: 'bg-emerald-600',
    hoverBorder: 'hover:border-emerald-400 hover:shadow-[0_8px_24px_-4px_rgba(16,185,129,0.22)]',
    btnHover: 'group-hover:bg-emerald-600 group-hover:text-white',
    titleHover: 'group-hover:text-emerald-600',
  },
  {
    number: '06',
    title: 'Real-Time Alert System',
    desc: 'Generates instant alerts when suspicious activities or potential threats are detected.',
    icon: (
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <path d="M2 8c0-3.3 2.7-6 6-6" />
        <path d="M22 8c0-3.3-2.7-6-6-6" />
      </svg>
    ),
    iconBg: 'bg-red-50 text-red-500 border-red-200/90',
    numberColor: 'text-red-500',
    lineColor: 'bg-red-400',
    nodeBg: 'bg-red-500',
    hoverBorder: 'hover:border-red-400 hover:shadow-[0_8px_24px_-4px_rgba(239,68,68,0.22)]',
    btnHover: 'group-hover:bg-red-500 group-hover:text-white',
    titleHover: 'group-hover:text-red-600',
  },
  {
    number: '07',
    title: 'User Authentication',
    desc: 'Provides secure user registration, login, and access control.',
    icon: <i className="fa-solid fa-user-shield text-lg sm:text-xl"></i>,
    iconBg: 'bg-sky-50 text-sky-600 border-sky-200/90',
    numberColor: 'text-sky-600',
    lineColor: 'bg-sky-400',
    nodeBg: 'bg-sky-600',
    hoverBorder: 'hover:border-sky-400 hover:shadow-[0_8px_24px_-4px_rgba(14,165,233,0.22)]',
    btnHover: 'group-hover:bg-sky-600 group-hover:text-white',
    titleHover: 'group-hover:text-sky-600',
  },
  {
    number: '08',
    title: 'Admin Dashboard',
    desc: 'Displays user information, intrusion detection results, and system statistics.',
    icon: <i className="fa-solid fa-table-columns text-lg sm:text-xl"></i>,
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/90',
    numberColor: 'text-indigo-600',
    lineColor: 'bg-indigo-400',
    nodeBg: 'bg-indigo-600',
    hoverBorder: 'hover:border-indigo-400 hover:shadow-[0_8px_24px_-4px_rgba(99,102,241,0.22)]',
    btnHover: 'group-hover:bg-indigo-600 group-hover:text-white',
    titleHover: 'group-hover:text-indigo-600',
  },
  {
    number: '09',
    title: 'Model Accuracy Results',
    desc: 'Presents the performance and accuracy metrics of implemented machine learning algorithms.',
    icon: <i className="fa-solid fa-award text-lg sm:text-xl"></i>,
    iconBg: 'bg-amber-50 text-amber-500 border-amber-200/90',
    numberColor: 'text-amber-500',
    lineColor: 'bg-amber-400',
    nodeBg: 'bg-amber-500',
    hoverBorder: 'hover:border-amber-400 hover:shadow-[0_8px_24px_-4px_rgba(245,158,11,0.22)]',
    btnHover: 'group-hover:bg-amber-500 group-hover:text-white',
    titleHover: 'group-hover:text-amber-600',
  },
  {
    number: '10',
    title: 'Detection Reports',
    desc: 'Displays and generates detailed reports on intrusion predictions and detection results.',
    icon: <i className="fa-solid fa-file-invoice text-lg sm:text-xl"></i>,
    iconBg: 'bg-teal-50 text-teal-600 border-teal-200/90',
    numberColor: 'text-teal-600',
    lineColor: 'bg-teal-400',
    nodeBg: 'bg-teal-600',
    hoverBorder: 'hover:border-teal-400 hover:shadow-[0_8px_24px_-4px_rgba(20,184,166,0.22)]',
    btnHover: 'group-hover:bg-teal-600 group-hover:text-white',
    titleHover: 'group-hover:text-teal-600',
  },
];

// ─── COMPLETE 36 TRIPGEN APPLICATION MODULES CATALOG ───
const TRIPGEN_MODULES = [
  // A. Public / Guest Module (1-2)
  {
    num: 1,
    title: 'Landing / Home Page',
    role: 'Guest / Public',
    roleKey: 'public',
    roleBadge: 'bg-sky-50 text-sky-700 border-sky-200/90',
    roleIcon: 'fa-globe',
    icon: 'fa-house',
    desc: 'Destination search bar and traveler counter. Featured destinations: Vizag, Bangalore, Hyderabad, and Goa. Brand information and contact details.',
    template: 'templates/index.html',
    handler: 'views.index',
    status: 'Implemented'
  },
  {
    num: 2,
    title: 'FAQ & Helpdesk',
    role: 'Guest / Public',
    roleKey: 'public',
    roleBadge: 'bg-sky-50 text-sky-700 border-sky-200/90',
    roleIcon: 'fa-globe',
    icon: 'fa-circle-question',
    desc: 'Information about cancellations, payments, booking modifications, and contact support assistance.',
    template: 'templates/FAQ.html',
    handler: 'views.FAQ',
    status: 'Implemented'
  },

  // B. Admin Module (3-9) - Exact Serial Order
  {
    num: 3,
    title: 'Admin Dashboard Home Screen',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-shield-halved',
    desc: 'Initial administrator portal access screen with credential prompt.',
    template: 'templates/AdminLogin.html',
    handler: 'views.AdminLogin',
    status: 'Implemented',
    devNote: 'Uses development credential admin/admin. Recommendation: migrate to salted PBKDF2 hashing in production.'
  },
  {
    num: 4,
    title: 'Admin Login Screen (Credentials Entered)',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-key',
    desc: 'Administrator login credential verification with verified administrative username and password.',
    template: 'templates/AdminLogin.html',
    handler: 'views.AdminLoginAction',
    status: 'Implemented'
  },
  {
    num: 5,
    title: 'Welcome Administrator Dashboard',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-gauge-high',
    desc: 'Central administrative executive dashboard and system management console.',
    template: 'templates/AdminScreen.html',
    handler: 'views.AdminScreen',
    status: 'Implemented'
  },
  {
    num: 6,
    title: 'Add Employee Screen',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-user-plus',
    desc: 'Staff onboarding form to register new employees with username, contact, and email.',
    template: 'templates/AddEmployee.html',
    handler: 'views.AddEmployee',
    status: 'Implemented'
  },
  {
    num: 7,
    title: 'Employee Login Screen',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-right-to-bracket',
    desc: 'Staff portal sign-in interface for authenticated employee workspace access.',
    template: 'templates/EmployeeLogin.html',
    handler: 'views.EmployeeLogin',
    status: 'Implemented'
  },
  {
    num: 8,
    title: 'View Employee Directory Screen',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-address-book',
    desc: 'Active staff directory table displaying registered employee records, contact details, and account status.',
    template: 'templates/ViewEmployee.html',
    handler: 'views.ViewEmployee',
    status: 'Implemented'
  },
  {
    num: 9,
    title: 'View Authentication Logs',
    role: 'Admin',
    roleKey: 'admin',
    roleBadge: 'bg-purple-50 text-purple-700 border-purple-200/90',
    roleIcon: 'fa-shield-halved',
    icon: 'fa-clock-rotate-left',
    desc: 'Date-filtered security audit table tracking employee login timestamps and session activity.',
    template: 'templates/ViewAuthEmployee.html',
    handler: 'views.ViewAuthEmployee',
    status: 'Implemented'
  },

  // C. Employee Module (10-21) - Exact Serial Order (12 Screens)
  {
    num: 10,
    title: 'Employee Portal Login',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-right-to-bracket',
    desc: 'Staff login gateway to access the employee management workspace.',
    template: 'templates/EmployeeLogin.html',
    handler: 'views.EmployeeLogin',
    status: 'Implemented'
  },
  {
    num: 11,
    title: 'Employee Login (Credentials Entered)',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-user-check',
    desc: 'Staff credential verification and secure session initialization.',
    template: 'templates/EmployeeLogin.html',
    handler: 'views.EmployeeLoginAction',
    status: 'Implemented'
  },
  {
    num: 12,
    title: 'Welcome Staff Member Dashboard',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-table-columns',
    desc: 'Operational command center for managing tours, transport, hotels, and customer bookings.',
    template: 'templates/EmployeeScreen.html',
    handler: 'views.EmployeeScreen',
    status: 'Implemented'
  },
  {
    num: 13,
    title: 'Create Tour Itinerary Form',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-map-location-dot',
    desc: 'Form to construct new tour packages with destination, duration, pricing, and day-wise details.',
    template: 'templates/CreateItinerary.html',
    handler: 'views.CreateItineraryAction',
    status: 'Implemented'
  },
  {
    num: 14,
    title: 'View Master Tour Itineraries Table',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-list-check',
    desc: 'Master catalog of all registered vacation packages with pricing, durations, and details.',
    template: 'templates/ViewItinerary.html',
    handler: 'views.ViewItinerary',
    status: 'Implemented'
  },
  {
    num: 15,
    title: 'Add Transport Route Form',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-bus',
    desc: 'Form to add transit schedules for flights, buses, and trains with route and timing details.',
    template: 'templates/AddTransport.html',
    handler: 'views.AddTransportAction',
    status: 'Implemented'
  },
  {
    num: 16,
    title: 'View Transport Schedules Directory',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-plane-departure',
    desc: 'Multi-modal transit route directory showing vehicle types, schedules, origins, and fares.',
    template: 'templates/ViewTransport.html',
    handler: 'views.ViewTransport',
    status: 'Implemented'
  },
  {
    num: 17,
    title: 'Add Partner Hotel Form',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-hotel',
    desc: 'Form to register partner hotel accommodations with nightly rates, amenities, and room availability.',
    template: 'templates/AddHotel.html',
    handler: 'views.AddHotelAction',
    status: 'Implemented'
  },
  {
    num: 18,
    title: 'View Partner Hotels Directory',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-square-h',
    desc: 'Inventory table of partner hotels and resorts with locations and verified pricing.',
    template: 'templates/ViewHotel.html',
    handler: 'views.ViewHotel',
    status: 'Implemented'
  },
  {
    num: 19,
    title: 'Master Bookings & Inventory Console',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-calendar-check',
    desc: 'Transaction log displaying customer bookings, itinerary reservations, and payment statuses.',
    template: 'templates/ViewBookings.html',
    handler: 'views.ViewBookings',
    status: 'Implemented'
  },
  {
    num: 20,
    title: 'Customer Feedback & Ratings Inspection',
    role: 'Employee',
    roleKey: 'employee',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    roleIcon: 'fa-user-gear',
    icon: 'fa-comments',
    desc: 'Review traveler feedback, satisfaction scores, and service ratings across tours and hotels.',
    template: 'templates/ViewFeedback.html',
    handler: 'views.ViewFeedback',
    status: 'Implemented'
  },
  // D. Traveler Module (21-32) - Exact Serial Order (12 Screens)
  {
    num: 21,
    title: 'Traveler Registration / Signup',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-user-plus',
    desc: 'New user registration form for travelers with contact details and account credentials.',
    template: 'templates/Register.html',
    handler: 'views.RegisterAction',
    status: 'Implemented'
  },
  {
    num: 22,
    title: 'Traveler Account Login',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-right-to-bracket',
    desc: 'User authentication portal for registered travelers to access booking tools.',
    template: 'templates/UserLogin.html',
    handler: 'views.UserLogin',
    status: 'Implemented'
  },
  {
    num: 23,
    title: 'Traveler Login (Credentials Entered)',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-key',
    desc: 'Traveler login credential verification for personalized itinerary planning.',
    template: 'templates/UserLogin.html',
    handler: 'views.UserLoginAction',
    status: 'Implemented'
  },
  {
    num: 24,
    title: 'Search & Discover Tour Packages',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-magnifying-glass-location',
    desc: 'Explore curated regional tour packages and filter vacation options by destination.',
    template: 'templates/SearchItinerary.html',
    handler: 'views.SearchItinerary',
    status: 'Implemented'
  },
  {
    num: 25,
    title: 'Tour Itinerary Booking Checkout',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-cart-shopping',
    desc: 'Reservation checkout form to book selected vacation packages.',
    template: 'templates/BookItinerary.html',
    handler: 'views.BookItineraryAction',
    status: 'Implemented'
  },
  {
    num: 26,
    title: 'Search Multi-Modal Transport',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-train-subway',
    desc: 'Search and filter flight, bus, and train schedules between regional destinations.',
    template: 'templates/SearchTransport.html',
    handler: 'views.SearchTransport',
    status: 'Implemented'
  },
  {
    num: 27,
    title: 'Transport Ticket Reservation Checkout',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-ticket',
    desc: 'Complete passenger ticket reservation and secure transit booking.',
    template: 'templates/BookTransport.html',
    handler: 'views.BookTransportAction',
    status: 'Implemented'
  },
  {
    num: 28,
    title: 'Search Partner Hotel Accommodations',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-bed',
    desc: 'Discover hotel rooms and resort accommodations across preferred travel destinations.',
    template: 'templates/SearchHotels.html',
    handler: 'views.SearchHotels',
    status: 'Implemented'
  },
  {
    num: 29,
    title: 'Hotel Reservation Booking Checkout',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-hotel',
    desc: 'Select check-in dates and confirm hotel room reservation.',
    template: 'templates/BookHotel.html',
    handler: 'views.BookHotelAction',
    status: 'Implemented'
  },
  {
    num: 30,
    title: 'Cancel & Manage Bookings Console',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-ban',
    desc: 'Review active traveler reservations and process booking cancellations if needed.',
    template: 'templates/CancelBookings.html',
    handler: 'views.CancelBookingAction',
    status: 'Implemented'
  },
  {
    num: 31,
    title: 'Submit Traveler Review & Rating',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-star-half-stroke',
    desc: 'Post customer experience ratings and write feedback for booked tours and stays.',
    template: 'templates/Feedbacks.html',
    handler: 'views.FeedbacksAction',
    status: 'Implemented'
  },
  {
    num: 32,
    title: 'Public Reviews & Helpdesk FAQ',
    role: 'Traveler',
    roleKey: 'traveler',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200/90',
    roleIcon: 'fa-user',
    icon: 'fa-heart-circle-check',
    desc: 'Inspect verified customer reviews, transparent star ratings, and helpdesk policies.',
    template: 'templates/feedback',
    handler: 'views.feedback_view',
    status: 'Implemented'
  }
];

// ─── TRIPGEN PROJECT OVERVIEW PILLARS (01 CHALLENGE, 02 TARGET, 03 ARCHITECTURE) ───
const TRIPGEN_OVERVIEW_PILLARS = {
  problem: {
    id: 'problem',
    num: '01',
    label: '01 • CHALLENGE',
    title: 'The Problem',
    tagline: 'Manual Disconnected Workflow',
    icon: 'fa-triangle-exclamation',
    accentColor: '#f43f5e',
    badgeClass: 'bg-rose-50 text-rose-600 border-rose-200/70',
    activeBadgeClass: 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-500/30',
    desc: 'Planning a trip typically requires searching across disconnected booking sites, managing disparate transport schedules, calculating distances, and tracking reservations manually. Travelers frequently face scheduling conflicts, travel fatigue, and inefficient backtracking between distant destinations.',
    image: '/tripgen-banner-smooth.jpg',
    imageCaption: '01 • Challenge: Multi-city route friction, disconnected schedules & manual booking coordination',
    bulletPoints: [
      'Disjointed booking portals with zero reservation sync',
      'Manual transport calculation prone to travel fatigue',
      'High friction in multi-city itinerary coordination'
    ]
  },
  target: {
    id: 'target',
    num: '02',
    label: '02 • TARGET',
    title: 'The Objective',
    tagline: 'Integrated Unified Platform',
    icon: 'fa-bullseye',
    accentColor: '#2563eb',
    badgeClass: 'bg-blue-50 text-blue-600 border-blue-200/70',
    activeBadgeClass: 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30',
    desc: 'To engineer an integrated, web-based travel management platform that connects travelers with customizable tour itineraries, multi-modal transport options, and hotel accommodations, while offering role-guarded administrative and employee operations.',
    image: '/project-travel-planner.png',
    imageCaption: '02 • Target: Unified TripGen Travel Plan Itinerary Generator platform connecting travelers & bookings',
    bulletPoints: [
      'Centralized itinerary generator & booking engine',
      '4 role-guarded portals (Guest, Admin, Employee, Traveler)',
      'End-to-end trip planning from discovery to reservation'
    ]
  },
  solution: {
    id: 'solution',
    num: '03',
    label: '03 • ARCHITECTURE',
    title: 'The Solution',
    tagline: '4 Dedicated Role-Guarded Modules',
    icon: 'fa-lightbulb',
    accentColor: '#059669',
    badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
    activeBadgeClass: 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/30',
    desc: 'TripGen integrates Python Django views and a normalized MySQL database to deliver four dedicated, role-guarded operational modules (Public, Admin, Employee, and Traveler) spanning 36 specialized views, catalog managers, booking checkout, and feedback loops.',
    image: '/tripgen-square.jpg',
    imageCaption: '03 • Architecture: 4-tier MVC Django architecture, normalized MySQL schema & 36 operational views',
    bulletPoints: [
      'Django MVC backend with 36 role-guarded view handlers',
      'Normalized relational MySQL database schema with foreign keys',
      'Integrated catalog management, booking checkout & feedback loops'
    ]
  }
};

// ─── ROLE METADATA & FILTER TABS ───
const TRIPGEN_ROLE_META = {
  all: { label: 'All Modules', count: 32, icon: 'fa-cubes' },
  public: { label: 'Public / Guest', count: 2, icon: 'fa-globe', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  admin: { label: 'Admin Module', count: 7, icon: 'fa-shield-halved', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  employee: { label: 'Employee Module', count: 11, icon: 'fa-user-gear', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  traveler: { label: 'Traveler Module', count: 12, icon: 'fa-user', badge: 'bg-amber-50 text-amber-700 border-amber-200' }
};

// ─── COMPLETE APPLICATION MODULES ROLE SHOWCASE (HOME, ADMIN, EMPLOYEE, USER) ───
const TRIPGEN_ROLE_SHOWCASE = {
  public: {
    id: 'public',
    roleKey: 'public',
    tabLabel: 'Home',
    fullName: 'Home (Public / Guest)',
    heading: 'Home: Destination Discovery & FAQ Helpdesk',
    subheading: 'Public Guest & Traveler Exploration Interface',
    badge: 'Guest / Public Access',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-300',
    themeColor: '#0284c7',
    glowClass: 'tripgen-glow-public',
    image: '/tripgen-gallery/home page.png',
    thumb: '/tripgen-gallery/thumbs/home page.webp',
    imageAlt: 'TripGen Public Landing and Search Interface',
    summary: 'Open-access traveler discovery engine enabling guests to search regional destinations, view curated vacation packages, inspect pricing, and access customer service without authentication.',
    keyTemplates: ['templates/index.html', 'templates/FAQ.html'],
    keyHandlers: ['views.index', 'views.FAQ'],
    moduleCount: '2 Modules (#1 - #2)',
    features: [
      'Interactive destination search bar with dynamic traveler counter selection.',
      'Featured regional travel destinations: Vizag, Bangalore, Hyderabad, and Goa.',
      'Live running FAQ & Helpdesk portal (FAQ.html) with booking & refund policies.',
      'Transparent customer feedback ratings and tour package reviews showcase.'
    ],
    screenshotId: 1
  },
  admin: {
    id: 'admin',
    roleKey: 'admin',
    tabLabel: 'Admin',
    fullName: 'Administrator Control Hub',
    heading: 'Admin: Executive Security & Staff Governance',
    subheading: 'Centralized Administrative Command Dashboard',
    badge: 'Superuser Portal',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-300',
    themeColor: '#9333ea',
    glowClass: 'tripgen-glow-admin',
    image: '/tripgen-gallery/admin.png',
    thumb: '/tripgen-gallery/thumbs/admin.webp',
    imageAlt: 'TripGen Administrator Executive Dashboard',
    summary: 'High-privilege executive command center providing full oversight over staff accounts, system credentials, employee onboarding, and security audit verification.',
    keyTemplates: ['templates/AdminScreen.html', 'templates/AdminLogin.html', 'templates/AddEmployee.html', 'templates/ViewEmployee.html', 'templates/ViewAuthEmployee.html'],
    keyHandlers: ['views.AdminScreen', 'views.AddEmployeeAction', 'views.ViewEmployee', 'views.ViewAuthEmployeeAction'],
    moduleCount: '7 Modules (#3 - #9)',
    features: [
      'Centralized administration dashboard for system-wide governance and staff oversight.',
      'Employee onboarding form with field validation for username, password, email, and phone.',
      'Active staff directory with employee contact roster and credential status.',
      'Date-filtered authentication audit logs tracking staff session activity.'
    ],
    screenshotId: 3
  },
  employee: {
    id: 'employee',
    roleKey: 'employee',
    tabLabel: 'Employee',
    fullName: 'Employee Operations Console',
    heading: 'Employee: Tour Packages, Hotel Inventory & Fleet Routes',
    subheading: 'Operational Workflow & Inventory Management Hub',
    badge: 'Operations Console',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    themeColor: '#059669',
    glowClass: 'tripgen-glow-employee',
    image: '/tripgen-gallery/Screenshot 2026-10-14 232013.png',
    thumb: '/tripgen-gallery/thumbs/Screenshot 2026-10-14 232013.webp',
    imageAlt: 'TripGen Master Tour Itinerary Table',
    summary: 'Operational management suite for staff members to create, modify, and maintain itineraries, partner hotel listings, and multi-modal transportation schedules.',
    keyTemplates: ['templates/EmployeeScreen.html', 'templates/Itinerary.html', 'templates/CreateItinerary.html', 'templates/Hotels.html', 'templates/Transport.html'],
    keyHandlers: ['views.EmployeeScreen', 'views.CreateItineraryAction', 'views.AddHotelAction', 'views.AddTransportAction'],
    moduleCount: '11 Modules (#10 - #20)',
    features: [
      'Multi-day tour itinerary builder with per-head tariffs and daily activity schedules.',
      'Partner hotel room inventory management across regional destination cities.',
      'Multi-modal transport route scheduling for Flights, Trains, and Buses.',
      'Customer feedback inspection with rating telemetry and service quality review.'
    ],
    screenshotId: 20
  },
  traveler: {
    id: 'traveler',
    roleKey: 'traveler',
    tabLabel: 'User',
    fullName: 'Traveler Account & Bookings',
    heading: 'User: Personalized Booking Engine & Reservation Receipts',
    subheading: 'Traveler Self-Service & Reservation Management',
    badge: 'Traveler Workspace',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-300',
    themeColor: '#2563eb',
    glowClass: 'tripgen-glow-traveler',
    image: '/tripgen-gallery/Screenshot 2026-10-14 235041.png',
    thumb: '/tripgen-gallery/thumbs/Screenshot 2026-10-14 235041.webp',
    imageAlt: 'TripGen Traveler Bookings and Reservations Dashboard',
    summary: 'Self-service traveler portal enabling registered users to search itineraries, reserve hotel accommodations, book transit tickets, and review booking history.',
    keyTemplates: ['templates/UserScreen.html', 'templates/SearchItinerary.html', 'templates/BookItinerary.html', 'templates/SearchHotels.html', 'templates/ViewBookings.html'],
    keyHandlers: ['views.UserLoginAction', 'views.BookItineraryAction', 'views.BookHotelAction', 'views.BookTransportAction', 'views.CancelBookingAction'],
    moduleCount: '12 Modules (#21 - #32)',
    features: [
      'User registration, authentication session tokens, and traveler profile settings.',
      'Real-time itinerary checkout with automated per-traveler fare calculation.',
      'Multi-modal transport booking with seat reservations and ticket confirmation.',
      'Centralized booking history dashboard with self-service cancellation actions.'
    ],
    screenshotId: 52
  }
};

// ─── VERIFIED FULL-STACK DEVELOPER RESPONSIBILITIES ───
const TRIPGEN_MY_ROLES = [
  {
    num: 1,
    title: 'Backend Development',
    points: [
      'Developed Django views and handled user requests.',
      'Configured URLs for Admin, Employee, and Traveler modules.',
      'Implemented validation, error handling, and sessions.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'Python, Django, MVT Architecture'
    },
    cardBorder: 'border-blue-200/90 hover:border-blue-300',
    cardBg: 'bg-[#f4f8ff]',
    badgeBg: 'bg-[#0066FF] text-white',
    bulletColor: 'bg-[#0066FF]',
    footerLabelColor: 'text-[#0066FF]'
  },
  {
    num: 2,
    title: 'Database Management',
    points: [
      'Managed data for employees, hotels, transport, and bookings.',
      'Created database tables and relationships.',
      'Performed CRUD operations using SQL queries.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'MySQL, SQL'
    },
    cardBorder: 'border-emerald-200/90 hover:border-emerald-300',
    cardBg: 'bg-[#f0fdf4]',
    badgeBg: 'bg-[#10B981] text-white',
    bulletColor: 'bg-[#10B981]',
    footerLabelColor: 'text-[#10B981]'
  },
  {
    num: 3,
    title: 'Frontend Development',
    points: [
      'Designed 34 Django HTML templates.',
      'Created forms, tables, and dashboards.',
      'Built responsive layouts with interactive elements.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'HTML5, Tailwind CSS, JavaScript'
    },
    cardBorder: 'border-orange-200/90 hover:border-orange-300',
    cardBg: 'bg-[#fffbf5]',
    badgeBg: 'bg-[#F97316] text-white',
    bulletColor: 'bg-[#F97316]',
    footerLabelColor: 'text-[#F97316]'
  },
  {
    num: 4,
    title: 'Authentication & Authorization',
    points: [
      'Created separate login portals for Admin, Employee, and Traveler.',
      'Implemented session verification and role-based access.',
      'Documented secure password-handling practices.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'Django Authentication, Sessions, Access Control'
    },
    cardBorder: 'border-purple-200/90 hover:border-purple-300',
    cardBg: 'bg-[#faf5ff]',
    badgeBg: 'bg-[#8B5CF6] text-white',
    bulletColor: 'bg-[#8B5CF6]',
    footerLabelColor: 'text-[#8B5CF6]'
  },
  {
    num: 5,
    title: 'Application Modules',
    points: [
      'Developed itinerary creation, editing, and search features.',
      'Managed hotel, transport, and booking operations.',
      'Implemented cancellations and user feedback.'
    ],
    footer: {
      label: 'Tools:',
      value: 'VS Code, Git, GitHub, MySQL Workbench'
    },
    cardBorder: 'border-rose-200/90 hover:border-rose-300',
    cardBg: 'bg-[#fff1f2]',
    badgeBg: 'bg-[#F43F5E] text-white',
    bulletColor: 'bg-[#F43F5E]',
    footerLabelColor: 'text-[#F43F5E]'
  },
  {
    num: 6,
    title: 'Testing & Debugging',
    points: [
      'Tested form validation and login functionality.',
      'Checked access permissions and database operations.',
      'Verified booking records and status updates.'
    ],
    footer: {
      label: 'Tools:',
      value: 'Django Testing, MySQL Workbench, Python'
    },
    cardBorder: 'border-sky-200/90 hover:border-sky-300',
    cardBg: 'bg-[#f0f9ff]',
    badgeBg: 'bg-[#0EA5E9] text-white',
    bulletColor: 'bg-[#0EA5E9]',
    footerLabelColor: 'text-[#0EA5E9]'
  }
];

// ─── TRIPGEN 10 KEY FEATURES (EXACT MATCH TO INFOGRAPHIC TEMPLATE) ───
const TRIPGEN_KEY_FEATURES = [
  {
    num: '01',
    title: 'Role-Based Access Control',
    desc: 'Separate Admin, Employee, and Traveler portals.',
    icon: 'fa-solid fa-users',
    badgeColor: 'bg-[#0066FF] text-white',
    iconColor: 'text-[#0066FF]',
    chevronColor: 'text-[#0066FF]',
    cardBg: 'bg-[#eff6ff]/75 border-[#bfdbfe]/80 hover:border-[#0066FF]',
    nodeColor: 'bg-[#0066FF]'
  },
  {
    num: '02',
    title: 'Itinerary Management',
    desc: 'Create, update, search, and manage travel packages with day-wise schedules.',
    icon: 'fa-solid fa-calendar-days',
    badgeColor: 'bg-[#10B981] text-white',
    iconColor: 'text-[#10B981]',
    chevronColor: 'text-[#10B981]',
    cardBg: 'bg-[#ecfdf5]/75 border-[#a7f3d0]/80 hover:border-[#10B981]',
    nodeColor: 'bg-[#10B981]'
  },
  {
    num: '03',
    title: 'Transport Management',
    desc: 'Manage flight, bus, and train details.',
    icon: 'fa-solid fa-plane-departure',
    badgeColor: 'bg-[#F97316] text-white',
    iconColor: 'text-[#F97316]',
    chevronColor: 'text-[#F97316]',
    cardBg: 'bg-[#fff7ed]/75 border-[#fed7aa]/80 hover:border-[#F97316]',
    nodeColor: 'bg-[#F97316]'
  },
  {
    num: '04',
    title: 'Hotel Management',
    desc: 'Manage hotel listings, amenities, and accommodation rates.',
    icon: 'fa-solid fa-hotel',
    badgeColor: 'bg-[#8B5CF6] text-white',
    iconColor: 'text-[#8B5CF6]',
    chevronColor: 'text-[#8B5CF6]',
    cardBg: 'bg-[#f5f3ff]/75 border-[#ddd6fe]/80 hover:border-[#8B5CF6]',
    nodeColor: 'bg-[#8B5CF6]'
  },
  {
    num: '05',
    title: 'Booking Management',
    desc: 'Handle reservations, booking records, and cancellations.',
    icon: 'fa-solid fa-ticket',
    badgeColor: 'bg-[#14B8A6] text-white',
    iconColor: 'text-[#14B8A6]',
    chevronColor: 'text-[#14B8A6]',
    cardBg: 'bg-[#f0fdfa]/75 border-[#99f6e4]/80 hover:border-[#14B8A6]',
    nodeColor: 'bg-[#14B8A6]'
  },
  {
    num: '06',
    title: 'Customer Feedback',
    desc: 'Submit and manage traveler reviews and ratings.',
    icon: 'fa-solid fa-comments',
    badgeColor: 'bg-[#F43F5E] text-white',
    iconColor: 'text-[#F43F5E]',
    chevronColor: 'text-[#F43F5E]',
    cardBg: 'bg-[#fff1f2]/75 border-[#fecdd3]/80 hover:border-[#F43F5E]',
    nodeColor: 'bg-[#F43F5E]'
  },
  {
    num: '07',
    title: 'Employee Management',
    desc: 'Add employees and maintain employee records.',
    icon: 'fa-solid fa-user-tie',
    badgeColor: 'bg-[#6366F1] text-white',
    iconColor: 'text-[#6366F1]',
    chevronColor: 'text-[#6366F1]',
    cardBg: 'bg-[#eef2ff]/75 border-[#c7d2fe]/80 hover:border-[#6366F1]',
    nodeColor: 'bg-[#6366F1]'
  },
  {
    num: '08',
    title: 'Login Audit Tracking',
    desc: 'View login history and filter audit records by date.',
    icon: 'fa-solid fa-file-invoice',
    badgeColor: 'bg-[#F59E0B] text-white',
    iconColor: 'text-[#F59E0B]',
    chevronColor: 'text-[#F59E0B]',
    cardBg: 'bg-[#fffbeb]/75 border-[#fde68a]/80 hover:border-[#F59E0B]',
    nodeColor: 'bg-[#F59E0B]'
  },
  {
    num: '09',
    title: 'Destination Exploration',
    desc: 'Browse travel destinations and view available packages.',
    icon: 'fa-solid fa-map-location-dot',
    badgeColor: 'bg-[#0EA5E9] text-white',
    iconColor: 'text-[#0EA5E9]',
    chevronColor: 'text-[#0EA5E9]',
    cardBg: 'bg-[#f0f9ff]/75 border-[#bae6fd]/80 hover:border-[#0EA5E9]',
    nodeColor: 'bg-[#0EA5E9]'
  },
  {
    num: '10',
    title: 'Form Validation',
    desc: 'Validate user inputs and display appropriate error messages.',
    icon: 'fa-solid fa-list-check',
    badgeColor: 'bg-[#A855F7] text-white',
    iconColor: 'text-[#A855F7]',
    chevronColor: 'text-[#A855F7]',
    cardBg: 'bg-[#faf5ff]/75 border-[#e9d5ff]/80 hover:border-[#A855F7]',
    nodeColor: 'bg-[#A855F7]'
  }
];

// ─── TRIPGEN SYSTEM ARCHITECTURE & MODULES (EXACT MATCH TO IMAGE 2) ───
const TRIPGEN_SYS_LAYERS = [
  {
    num: '1',
    title: 'Users',
    subtitle: '(Multi-Role Interface)',
    borderColor: 'border-[#BAE6FD]',
    headerBg: 'bg-[#0284C7] text-white',
    cardBg: 'bg-[#F0F9FF]/80',
    badgeColor: 'bg-[#0284C7] text-white',
    avatars: [
      { name: 'Admin', icon: 'fa-solid fa-user-tie text-[#0284C7]' },
      { name: 'Employee', icon: 'fa-solid fa-user text-[#059669]' },
      { name: 'Traveler', icon: 'fa-solid fa-person-hiking text-[#D97706]' }
    ]
  },
  {
    num: '2',
    title: 'Frontend UI',
    subtitle: '(Web Interface)',
    borderColor: 'border-[#A7F3D0]',
    headerBg: 'bg-[#059669] text-white',
    cardBg: 'bg-[#ECFDF5]/80',
    badgeColor: 'bg-[#059669] text-white',
    techBadges: [
      { name: '5 HTML', color: 'bg-[#E44D26] text-white' },
      { name: '3 CSS', color: 'bg-[#264DE4] text-white' },
      { name: 'JS', color: 'bg-[#F7DF1E] text-slate-900 font-bold' },
      { name: 'B', color: 'bg-[#7952B3] text-white' }
    ],
    subtext: 'Web Pages, Forms & Dashboards (Responsive Design)'
  },
  {
    num: '3',
    title: 'Django Backend',
    subtitle: '(Application Layer)',
    borderColor: 'border-[#DDD6FE]',
    headerBg: 'bg-[#7C3AED] text-white',
    cardBg: 'bg-[#F5F3FF]/80',
    badgeColor: 'bg-[#7C3AED] text-white',
    djangoBadge: true,
    features: [
      { name: 'URL Routing', icon: 'fa-solid fa-gear' },
      { name: 'Views & Controllers', icon: 'fa-solid fa-code' },
      { name: 'Business Logic', icon: 'fa-solid fa-laptop-code' },
      { name: 'Validation & Authentication', icon: 'fa-solid fa-shield-halved' },
      { name: 'Role-Based Access Control', icon: 'fa-solid fa-users' },
      { name: 'API / Database Operations', icon: 'fa-solid fa-database' }
    ]
  },
  {
    num: '4',
    title: 'MySQL Database',
    subtitle: '(Data Layer)',
    borderColor: 'border-[#FDE68A]',
    headerBg: 'bg-[#D97706] text-white',
    cardBg: 'bg-[#FFFBEB]/80',
    badgeColor: 'bg-[#D97706] text-white',
    mysqlBadge: true,
    tables: [
      'Users Table',
      'Itineraries Table',
      'Transport Table',
      'Hotels Table',
      'Bookings Table',
      'Feedback Table',
      'Login Logs Table',
      'Others...'
    ]
  }
];


// ─── 7 TESTING & VALIDATION DOMAINS (FROM INFOGRAPHIC ARCHITECTURE) ───
const TRIPGEN_TESTING_DOMAINS = [
  {
    num: 1,
    id: 'functional',
    title: 'Functional Testing',
    subtitle: 'Tested major features of the system.',
    color: '#0284C7',
    badgeBg: 'bg-blue-600',
    cardBorder: 'border-blue-200/90',
    cardBg: 'bg-gradient-to-br from-white via-sky-50/20 to-blue-50/30',
    bulletCheck: 'text-blue-500',
    bullets: [
      'Login and registration',
      'Itinerary creation',
      'Transport and hotel management',
      'Booking and cancellation',
      'Feedback and reviews'
    ],
    visualType: 'monitor'
  },
  {
    num: 2,
    id: 'form-validation',
    title: 'Form Validation Testing',
    subtitle: 'Verified input validation and error handling.',
    color: '#8B5CF6',
    badgeBg: 'bg-purple-600',
    cardBorder: 'border-purple-200/90',
    cardBg: 'bg-gradient-to-br from-white via-purple-50/20 to-violet-50/30',
    bulletCheck: 'text-purple-500',
    bullets: [
      'Required field validation',
      'Invalid input handling',
      'Proper error messages',
      'Form submission checks'
    ],
    visualType: 'document-alert'
  },
  {
    num: 3,
    id: 'authentication',
    title: 'Authentication Testing',
    subtitle: 'Tested multi-role login and access control.',
    color: '#10B981',
    badgeBg: 'bg-emerald-600',
    cardBorder: 'border-emerald-200/90',
    cardBg: 'bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30',
    bulletCheck: 'text-emerald-500',
    bullets: [
      'Admin login',
      'Employee login',
      'Traveler login',
      'Role-based access control'
    ],
    visualType: 'roles'
  },
  {
    num: 4,
    id: 'database',
    title: 'Database Testing',
    subtitle: 'Verified MySQL database operations.',
    color: '#F59E0B',
    badgeBg: 'bg-amber-500',
    cardBorder: 'border-amber-200/90',
    cardBg: 'bg-gradient-to-br from-white via-amber-50/20 to-orange-50/30',
    bulletCheck: 'text-amber-500',
    bullets: [
      'Create (Insert data)',
      'Read (Retrieve data)',
      'Update (Modify data)',
      'Delete (Remove data)',
      'Data storage and consistency'
    ],
    visualType: 'database'
  },
  {
    num: 5,
    id: 'integration',
    title: 'Integration Testing',
    subtitle: 'Checked communication between components.',
    color: '#EF4444',
    badgeBg: 'bg-rose-500',
    cardBorder: 'border-rose-200/90',
    cardBg: 'bg-gradient-to-br from-white via-rose-50/20 to-pink-50/30',
    bulletCheck: 'text-rose-500',
    bullets: [
      'Frontend templates & Django views',
      'Django views ⟺ MySQL database',
      'API and form data flow',
      'End-to-end feature integration'
    ],
    visualType: 'integration-flow'
  },
  {
    num: 6,
    id: 'debugging',
    title: 'Debugging',
    subtitle: 'Identified and fixed application errors.',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-600',
    cardBorder: 'border-cyan-200/90',
    cardBg: 'bg-gradient-to-br from-white via-cyan-50/20 to-sky-50/30',
    bulletCheck: 'text-cyan-500',
    bullets: [
      'URL routing issues',
      'Form submission errors',
      'Database operation errors',
      'Application workflow bugs',
      'Error log analysis and fixes'
    ],
    visualType: 'debugging'
  },
  {
    num: 7,
    id: 'workflow',
    title: 'Workflow Testing',
    subtitle: 'Verified complete user workflows.',
    color: '#6366F1',
    badgeBg: 'bg-indigo-600',
    cardBorder: 'border-indigo-200/90',
    cardBg: 'bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30',
    bulletCheck: 'text-indigo-500',
    bullets: [
      'User requests to response flow',
      'Module-wise end-to-end testing',
      'Data processing and validation',
      'Correct outputs and redirections'
    ],
    visualType: 'workflow-pipeline'
  }
];

// ─── 10 DETAILED UNIT & INTEGRATION VERIFICATION SUITES ───
const TRIPGEN_VERIFICATION_LOG_ITEMS = [
  {
    num: 1,
    title: 'Login and registration validation',
    icon: 'fa-user',
    iconColor: 'text-[#0284C7]',
    badgeBg: 'bg-[#0284C7]',
    rowBg: 'bg-[#F0F9FF]',
    category: 'Authentication',
    categoryBadge: 'bg-sky-100 text-sky-800 border-sky-200',
    desc: 'Verified user registration form validation (username, password, phone, email, address) and traveler login authentication flow.',
    status: 'Verified in Local Dev'
  },
  {
    num: 2,
    title: 'Invalid credentials and unauthorized access',
    icon: 'fa-shield-halved',
    iconColor: 'text-[#E11D48]',
    badgeBg: 'bg-[#E11D48]',
    rowBg: 'bg-[#FFF1F2]',
    category: 'Security & Access',
    categoryBadge: 'bg-rose-100 text-rose-800 border-rose-200',
    desc: 'Tested incorrect passwords, non-existent usernames, and unauthorized direct access to protected screens, verifying redirect to login.',
    status: 'Verified in Local Dev'
  },
  {
    num: 3,
    title: 'Employee CRUD operations',
    icon: 'fa-users',
    iconColor: 'text-[#10B981]',
    badgeBg: 'bg-[#10B981]',
    rowBg: 'bg-[#ECFDF5]',
    category: 'Admin Operations',
    categoryBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: 'Tested employee onboarding (AddEmployeeAction), field population, directory display (ViewEmployee), and record updates.',
    status: 'Verified in Local Dev'
  },
  {
    num: 4,
    title: 'Itinerary creation and modification',
    icon: 'fa-map-location-dot',
    iconColor: 'text-[#F97316]',
    badgeBg: 'bg-[#F97316]',
    rowBg: 'bg-[#FFF7ED]',
    category: 'Itinerary Engine',
    categoryBadge: 'bg-orange-100 text-orange-800 border-orange-200',
    desc: 'Created multi-day tour packages with day-wise breakdown, validated price inputs, and confirmed updates via ModifyItineraryAction.',
    status: 'Verified in Local Dev'
  },
  {
    num: 5,
    title: 'Transport and hotel record management',
    icon: 'fa-bus',
    iconColor: 'text-[#8B5CF6]',
    badgeBg: 'bg-[#8B5CF6]',
    rowBg: 'bg-[#FAF5FF]',
    category: 'Asset Management',
    categoryBadge: 'bg-purple-100 text-purple-800 border-purple-200',
    desc: 'Validated adding and modifying flights, buses, trains, and hotel listings with check-in/out times, room numbers, and pricing.',
    status: 'Verified in Local Dev'
  },
  {
    num: 6,
    title: 'Booking, cancellation, and status handling',
    icon: 'fa-calendar-check',
    iconColor: 'text-[#06B6D4]',
    badgeBg: 'bg-[#06B6D4]',
    rowBg: 'bg-[#ECFEFF]',
    category: 'Booking Engine',
    categoryBadge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    desc: 'Tested package, transport, and hotel booking workflows; verified reservation record creation and cancellation state updates.',
    status: 'Verified in Local Dev'
  },
  {
    num: 7,
    title: 'Feedback submission',
    icon: 'fa-star',
    iconColor: 'text-[#EC4899]',
    badgeBg: 'bg-[#EC4899]',
    rowBg: 'bg-[#FDF2F8]',
    category: 'Customer Engagement',
    categoryBadge: 'bg-pink-100 text-pink-800 border-pink-200',
    desc: 'Submitted traveler star ratings and written reviews; verified feedback storage in MySQL and inspector display in ViewFeedback.',
    status: 'Verified in Local Dev'
  },
  {
    num: 8,
    title: 'Audit date filtering',
    icon: 'fa-chart-simple',
    iconColor: 'text-[#14B8A6]',
    badgeBg: 'bg-[#14B8A6]',
    rowBg: 'bg-[#F0FDFA]',
    category: 'Audit & Compliance',
    categoryBadge: 'bg-teal-100 text-teal-800 border-teal-200',
    desc: 'Tested From Date and To Date filtering in ViewAuthEmployee, verifying correct retrieval of employee login timestamps in range.',
    status: 'Verified in Local Dev'
  },
  {
    num: 9,
    title: 'Database persistence and error handling',
    icon: 'fa-database',
    iconColor: 'text-[#EAB308]',
    badgeBg: 'bg-[#EAB308]',
    rowBg: 'bg-[#FEFCE8]',
    category: 'Database Integrity',
    categoryBadge: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: 'Inspected MySQL Workbench table schemas, verified foreign-key integrity between tables, and confirmed error-safe SQL execution.',
    status: 'Verified in Local Dev'
  },
  {
    num: 10,
    title: 'Responsive layout and navigation',
    icon: 'fa-laptop-code',
    iconColor: 'text-[#6366F1]',
    badgeBg: 'bg-[#6366F1]',
    rowBg: 'bg-[#EEF2FF]',
    category: 'UI / UX',
    categoryBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    desc: 'Verified desktop, tablet, and smartphone layouts across all 36 screens, ensuring readable tables, responsive cards, and clean buttons.',
    status: 'Verified in Local Dev'
  }
];

// ─── STRUCTURED TESTING MATRIX (10 CATEGORIES) ───
const TRIPGEN_TESTING_ITEMS = [
  {
    num: 1,
    title: 'Login and registration validation',
    icon: 'fa-user-check',
    category: 'Authentication',
    desc: 'Verified user registration form validation (username, password, phone, email, address) and traveler login authentication flow.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 2,
    title: 'Invalid credentials and unauthorized access',
    icon: 'fa-shield-halved',
    category: 'Security & Access',
    desc: 'Tested incorrect passwords, non-existent usernames, and unauthorized direct access to protected screens, verifying redirect to login.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 3,
    title: 'Employee CRUD operations',
    icon: 'fa-address-card',
    category: 'Admin Operations',
    desc: 'Tested employee onboarding (AddEmployeeAction), field population, directory display (ViewEmployee), and record updates.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 4,
    title: 'Itinerary creation and modification',
    icon: 'fa-map-location-dot',
    category: 'Itinerary Engine',
    desc: 'Created multi-day tour packages with day-wise breakdown, validated price inputs, and confirmed updates via ModifyItineraryAction.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 5,
    title: 'Transport and hotel record management',
    icon: 'fa-hotel',
    category: 'Asset Management',
    desc: 'Validated adding and modifying flights, buses, trains, and hotel listings with check-in/out times, room numbers, and pricing.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 6,
    title: 'Booking, cancellation, and status handling',
    icon: 'fa-calendar-check',
    category: 'Booking Engine',
    desc: 'Tested package, transport, and hotel booking workflows; verified reservation record creation and cancellation state updates.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 7,
    title: 'Feedback submission',
    icon: 'fa-star',
    category: 'Customer Engagement',
    desc: 'Submitted traveler star ratings and written reviews; verified feedback storage in MySQL and inspector display in ViewFeedback.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 8,
    title: 'Audit date filtering',
    icon: 'fa-filter',
    category: 'Audit & Compliance',
    desc: 'Tested From Date and To Date filtering in ViewAuthEmployee, verifying correct retrieval of employee login timestamps in range.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 9,
    title: 'Database persistence and error handling',
    icon: 'fa-database',
    category: 'Database Integrity',
    desc: 'Inspected MySQL Workbench table schemas, verified foreign-key integrity between tables, and confirmed error-safe SQL execution.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    num: 10,
    title: 'Responsive layout and navigation',
    icon: 'fa-mobile-screen',
    category: 'UI / UX',
    desc: 'Verified desktop, tablet, and smartphone layouts across all 36 screens, ensuring readable tables, responsive cards, and clean buttons.',
    status: 'Verified in Local Dev',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
];

export default function Home({
  profile,
  setActiveTab,
  projects = [],
  skills = [],
  certificates = [],
  education = [],
  onRefresh,
  isRefreshing = false,
  refreshingSection = null,
  sectionRefreshKeys = {},
}) {
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project') || sessionStorage.getItem('open_project_id');
        if (projectId) {
          const found = CORE_PROJECTS.find(
            (p) =>
              String(p.id).toLowerCase() === projectId.toLowerCase() ||
              (p.title && p.title.toLowerCase().includes(projectId.toLowerCase()))
          );
          if (found) return found;
        }
      }
    } catch {
      // fallback
    }
    return null;
  });
  const projectsScrollPosRef = useRef(0);
  const [selectedCert, setSelectedCert] = useState(null);

  // ─── MOBILE FEATURED PROJECTS CAROUSEL STATE & AUTOMATIC VERY SLOW SCROLL ───
  const [activeMobileProjectIdx, setActiveMobileProjectIdx] = useState(0);
  const [isMobileProjectTransitioning, setIsMobileProjectTransitioning] = useState(true);
  const [isProjectCarouselPaused, setIsProjectCarouselPaused] = useState(false);
  const [isMobileCarouselInView, setIsMobileCarouselInView] = useState(false);
  const mobileCarouselContainerRef = useRef(null);
  const projectTouchStartXRef = useRef(0);
  const projectTouchEndXRef = useRef(0);
  const projectResumeTimerRef = useRef(null);

  // IntersectionObserver to auto-scroll only when mobile projects is in view
  useEffect(() => {
    const node = mobileCarouselContainerRef.current;
    if (!node) return;

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsMobileCarouselInView(entry.isIntersecting);
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
    } else {
      setIsMobileCarouselInView(true);
    }

    return () => {
      if (observer && node) observer.unobserve(node);
    };
  }, []);

  // Pause carousel when browser tab is inactive / backgrounded
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsProjectCarouselPaused(true);
      } else {
        setIsProjectCarouselPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Automatic Very Slow Scrolling to the right side (advancing projects: 0 -> 1 -> 2 -> 3 seamlessly)
  useEffect(() => {
    if (isProjectCarouselPaused || !isMobileCarouselInView) return;

    const interval = setInterval(() => {
      setIsMobileProjectTransitioning(true);
      setActiveMobileProjectIdx((prev) => prev + 1);
    }, 4200);

    return () => clearInterval(interval);
  }, [isProjectCarouselPaused, isMobileCarouselInView, sectionRefreshKeys?.['projects']]);

  // Seamless reset handler: when slide reaches index 3 (clone of 0), seamlessly reset to 0
  const handleMobileProjectTransitionEnd = () => {
    if (activeMobileProjectIdx >= CORE_PROJECTS.length) {
      setIsMobileProjectTransitioning(false);
      setActiveMobileProjectIdx(0);
    }
  };

  // Re-enable CSS transition on next animation frame after seamless jump
  useEffect(() => {
    if (!isMobileProjectTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMobileProjectTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isMobileProjectTransitioning]);

  const handleProjectTouchStart = (e) => {
    setIsProjectCarouselPaused(true);
    if (projectResumeTimerRef.current) clearTimeout(projectResumeTimerRef.current);
    projectTouchStartXRef.current = e.targetTouches[0].clientX;
    projectTouchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleProjectTouchMove = (e) => {
    projectTouchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleProjectTouchEnd = () => {
    const diff = projectTouchStartXRef.current - projectTouchEndXRef.current;
    if (diff > 40) {
      // Swipe left -> advance to next project (scrolls rightwards)
      setIsMobileProjectTransitioning(true);
      setActiveMobileProjectIdx((prev) => prev + 1);
    } else if (diff < -40) {
      // Swipe right -> go to previous project
      setIsMobileProjectTransitioning(true);
      setActiveMobileProjectIdx((prev) => (prev > 0 ? prev - 1 : CORE_PROJECTS.length - 1));
    }

    if (projectResumeTimerRef.current) clearTimeout(projectResumeTimerRef.current);
    projectResumeTimerRef.current = setTimeout(() => {
      setIsProjectCarouselPaused(false);
    }, 3500);
  };

  const handleMobileDotClick = (dotIdx) => {
    setIsMobileProjectTransitioning(true);
    setActiveMobileProjectIdx(dotIdx);
    setIsProjectCarouselPaused(true);
    if (projectResumeTimerRef.current) clearTimeout(projectResumeTimerRef.current);
    projectResumeTimerRef.current = setTimeout(() => {
      setIsProjectCarouselPaused(false);
    }, 3500);
  };

  // ─── MOBILE ONLY: TYPEWRITER (SLOW WRITING) EFFECT FOR NAME HEADING ───
  // Condition 1: On first link opened or page refresh, slowly writes "Tripurosundaro Behera"
  // Condition 2: Desktop heading remains 100% static and untouched
  const heroFirstName = (profile?.first_name && profile.first_name !== 'Your') ? profile.first_name : (profile?.full_name ? (profile.full_name.split(' ').slice(0, -1).join(' ') || profile.full_name) : 'Tripurosundaro');
  const heroLastName = (profile?.last_name && profile.last_name !== 'Name') ? profile.last_name : (profile?.full_name && profile.full_name.includes(' ') ? profile.full_name.split(' ').slice(-1).join(' ') : 'Behera');
  const heroFullName = `${heroFirstName} ${heroLastName}`;

  const isTestEnv = typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom');
  const [mobileTypedCount, setMobileTypedCount] = useState(() => (isTestEnv ? heroFullName.length : 0));

  useEffect(() => {
    if (isTestEnv) return;

    setMobileTypedCount(0);

    let typingInterval = null;
    const startDelay = setTimeout(() => {
      typingInterval = setInterval(() => {
        setMobileTypedCount((prev) => {
          if (prev < heroFullName.length) {
            return prev + 1;
          } else {
            clearInterval(typingInterval);
            return prev;
          }
        });
      }, 70); // 70ms per character gives smooth, natural slow writing
    }, 150);

    return () => {
      clearTimeout(startDelay);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [heroFullName, sectionRefreshKeys?.['home']]);

  const mobileFirstPart = mobileTypedCount <= heroFirstName.length
    ? heroFirstName.slice(0, mobileTypedCount)
    : heroFirstName;
  const mobileShowSpace = mobileTypedCount > heroFirstName.length;
  const mobileLastPart = mobileTypedCount > heroFirstName.length
    ? heroLastName.slice(0, Math.max(0, mobileTypedCount - heroFirstName.length - 1))
    : '';

  // ─── FEATURED PROJECTS: 3-DIRECTIONAL ENTRANCE ANIMATION ───
  // Condition 1: Top to Down scroll animation given (Left from Left, Middle from Down, Right from Right)
  // Condition 2: Down to Top scroll animation NOT given (remains static and stable)
  // Condition 3: On page refresh / load, if in viewport, triggers smooth entrance
  const [projectsAnimationActive, setProjectsAnimationActive] = useState(false);
  const projectsLastScrollYRef = useRef(0);
  const projectsHasAnimatedDownRef = useRef(false);

  useEffect(() => {
    const handleProjectsScroll = () => {
      if (typeof window === 'undefined') return;
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const isScrollingDown = currentScrollY >= projectsLastScrollYRef.current;
      projectsLastScrollYRef.current = currentScrollY;

      const el = document.getElementById('projects');
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // In viewport check
      const inView = rect.top < viewportHeight * 0.85 && rect.bottom > 80;
      // Completely below viewport (user is at Home, About, or Skills)
      const completelyBelow = rect.top >= viewportHeight;

      if (inView) {
        // 1) Top to Down scrolled animation given:
        if (isScrollingDown && !projectsHasAnimatedDownRef.current) {
          projectsHasAnimatedDownRef.current = true;
          setProjectsAnimationActive(true);
        }
        // 2) Down to top scrolled animation not working & not given:
        // When scrolling up, projectsHasAnimatedDownRef is untouched and no animation triggers
      } else if (completelyBelow) {
        // When user scrolls back up above projects, reset so scrolling down again triggers it
        projectsHasAnimatedDownRef.current = false;
        setProjectsAnimationActive(false);
      }
    };

    window.addEventListener('scroll', handleProjectsScroll, { passive: true });
    // Immediate check on mount / refresh
    handleProjectsScroll();
    const t = setTimeout(handleProjectsScroll, 120);

    return () => {
      window.removeEventListener('scroll', handleProjectsScroll);
      clearTimeout(t);
    };
  }, [sectionRefreshKeys['projects']]);

  // ─── SCROLL DIRECTION TRACKER (DOWN vs UP) TO GUARD MOBILE SLIDE ANIMATIONS ───
  const homeLastScrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const homeScrollDirection = useRef('down');

  useEffect(() => {
    const handleHomeScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const diff = currentY - homeLastScrollY.current;
      if (Math.abs(diff) > 2) {
        homeScrollDirection.current = diff > 0 ? 'down' : 'up';
        homeLastScrollY.current = currentY;
      }
    };
    window.addEventListener('scroll', handleHomeScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleHomeScroll);
  }, []);

  // ─── MOBILE ONLY: PROJECTS HEADER ILLUSTRATION SMOOTH ENTRANCE ON SCROLL / REFRESH ───
  const [projectsIllustrationInView, setProjectsIllustrationInView] = useState(false);
  const [projectsShouldSlide, setProjectsShouldSlide] = useState(true);
  const projectsIllustrationRef = useRef(null);

  useEffect(() => {
    const illusNode = projectsIllustrationRef.current;

    const checkVisibility = () => {
      const isUp = homeScrollDirection.current === 'up';
      if (illusNode) {
        const r1 = illusNode.getBoundingClientRect();
        if (r1.top < window.innerHeight * 0.95 && r1.bottom > 0) {
          // If scrolling UP from bottom to top: DO NOT slide! Settle immediately without slide animation.
          if (isUp) {
            setProjectsShouldSlide(false);
            setProjectsIllustrationInView(true);
          } else {
            // Scrolling down or initial load / refresh: slide smoothly into position
            setProjectsShouldSlide(true);
            setProjectsIllustrationInView(true);
          }
        } else if (r1.top > window.innerHeight + 60) {
          // Only reset when element goes BELOW the viewport (user scrolled back up to the top)
          setProjectsIllustrationInView(false);
          setProjectsShouldSlide(true);
        }
      }
    };

    checkVisibility();
    const t = setTimeout(checkVisibility, 120);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const isUp = homeScrollDirection.current === 'up';
          entries.forEach((entry) => {
            if (entry.target === illusNode) {
              if (entry.isIntersecting) {
                if (isUp) {
                  setProjectsShouldSlide(false);
                  setProjectsIllustrationInView(true);
                } else {
                  setProjectsShouldSlide(true);
                  setProjectsIllustrationInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setProjectsIllustrationInView(false);
                setProjectsShouldSlide(true);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      if (illusNode) observer.observe(illusNode);
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t);
      if (observer && illusNode) {
        observer.unobserve(illusNode);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [sectionRefreshKeys?.['projects']]);

  // ─── CERTIFICATES: 3-CARD SLOW VERTICAL ENTRANCE ANIMATION ───
  // Condition 1: Top to Down scroll animation given (3 horizontal cards slowly glide up vertically into position)
  // Condition 2: Down to Top scroll animation remains static and rock-solid
  // Condition 3: On page refresh / load, if in viewport, triggers smooth entrance
  // Condition 4: Replays when user scrolls completely above section and scrolls back down
  // Condition 5: Replays on sectionRefreshKeys['certificates'] update
  const [certificatesAnimationActive, setCertificatesAnimationActive] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom')) return true;
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') return true;
    return false;
  });
  const certificatesLastScrollYRef = useRef(0);
  const certificatesHasAnimatedDownRef = useRef(false);

  // Replay animation on explicit refresh
  useEffect(() => {
    if (sectionRefreshKeys['certificates'] > 0) {
      certificatesHasAnimatedDownRef.current = false;
      setCertificatesAnimationActive(false);
      const t = setTimeout(() => {
        certificatesHasAnimatedDownRef.current = true;
        setCertificatesAnimationActive(true);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [sectionRefreshKeys['certificates']]);

  useEffect(() => {
    const handleCertificatesScroll = () => {
      if (typeof window === 'undefined') return;

      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const isScrollingDown = currentScrollY >= certificatesLastScrollYRef.current;
      certificatesLastScrollYRef.current = currentScrollY;

      const el = document.getElementById('certificates');
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // In JSDOM / test runner where rect dimensions are all 0
      if (rect.top === 0 && rect.bottom === 0) {
        setCertificatesAnimationActive(true);
        return;
      }

      // Check if Certificates section is entering/inside the viewport
      const inView = rect.top < viewportHeight * 0.85 && rect.bottom > 80;
      // Completely below viewport: user is scrolled above Certificates
      const completelyBelow = rect.top >= viewportHeight;

      if (inView) {
        // 1) Top to Down scroll triggers slow vertical entrance
        if (isScrollingDown && !certificatesHasAnimatedDownRef.current) {
          certificatesHasAnimatedDownRef.current = true;
          setCertificatesAnimationActive(true);
        } else if (!certificatesHasAnimatedDownRef.current && currentScrollY < 120 && rect.top < viewportHeight) {
          // If user loaded/refreshed while already at Certificates section
          certificatesHasAnimatedDownRef.current = true;
          setCertificatesAnimationActive(true);
        }
      } else if (completelyBelow) {
        // User scrolled all the way back up above Certificates: reset so scrolling down triggers again
        certificatesHasAnimatedDownRef.current = false;
        setCertificatesAnimationActive(false);
      }
    };

    window.addEventListener('scroll', handleCertificatesScroll, { passive: true });
    window.addEventListener('touchmove', handleCertificatesScroll, { passive: true });
    document.addEventListener('scroll', handleCertificatesScroll, { capture: true, passive: true });
    window.addEventListener('resize', handleCertificatesScroll, { passive: true });

    let observer = null;
    const targetEl = document.getElementById('certificates');
    if (typeof IntersectionObserver !== 'undefined' && targetEl) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              certificatesHasAnimatedDownRef.current = true;
              setCertificatesAnimationActive(true);
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(targetEl);
    }

    // Immediate check on mount / tab switch
    handleCertificatesScroll();
    const t1 = setTimeout(handleCertificatesScroll, 80);
    const t2 = setTimeout(handleCertificatesScroll, 250);

    return () => {
      window.removeEventListener('scroll', handleCertificatesScroll);
      window.removeEventListener('touchmove', handleCertificatesScroll);
      document.removeEventListener('scroll', handleCertificatesScroll, { capture: true });
      window.removeEventListener('resize', handleCertificatesScroll);
      if (observer) observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [sectionRefreshKeys['certificates']]);

  // ─── MOBILE ONLY: CERTIFICATES HEADER ILLUSTRATION SMOOTH ENTRANCE ON SCROLL / REFRESH ───
  const [certificatesIllustrationInView, setCertificatesIllustrationInView] = useState(false);
  const [certificatesShouldSlide, setCertificatesShouldSlide] = useState(true);
  const certificatesIllustrationRef = useRef(null);

  useEffect(() => {
    const illusNode = certificatesIllustrationRef.current;

    const checkVisibility = () => {
      const isUp = homeScrollDirection.current === 'up';
      if (illusNode) {
        const r1 = illusNode.getBoundingClientRect();
        if (r1.top < window.innerHeight * 0.95 && r1.bottom > 0) {
          // If scrolling UP from bottom to top: DO NOT slide! Settle immediately without slide animation.
          if (isUp) {
            setCertificatesShouldSlide(false);
            setCertificatesIllustrationInView(true);
          } else {
            // Scrolling down or initial load / refresh: slide smoothly into position
            setCertificatesShouldSlide(true);
            setCertificatesIllustrationInView(true);
          }
        } else if (r1.top > window.innerHeight + 60) {
          // Only reset when element goes BELOW the viewport (user scrolled back up to the top)
          setCertificatesIllustrationInView(false);
          setCertificatesShouldSlide(true);
        }
      }
    };

    checkVisibility();
    const t = setTimeout(checkVisibility, 120);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const isUp = homeScrollDirection.current === 'up';
          entries.forEach((entry) => {
            if (entry.target === illusNode) {
              if (entry.isIntersecting) {
                if (isUp) {
                  setCertificatesShouldSlide(false);
                  setCertificatesIllustrationInView(true);
                } else {
                  setCertificatesShouldSlide(true);
                  setCertificatesIllustrationInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setCertificatesIllustrationInView(false);
                setCertificatesShouldSlide(true);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      if (illusNode) observer.observe(illusNode);
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t);
      if (observer && illusNode) {
        observer.unobserve(illusNode);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [sectionRefreshKeys?.['certificates']]);

  // ─── MOBILE ONLY: CERTIFICATES SPLIT-ENTRANCE ANIMATION (THUMB FROM LEFT, TEXT FROM RIGHT) ───
  const [mobileCertsInView, setMobileCertsInView] = useState(false);
  const [mobileCertsShouldSlide, setMobileCertsShouldSlide] = useState(true);
  const [mobileCertsExpandKey, setMobileCertsExpandKey] = useState(0);
  const mobileCertsListRef = useRef(null);

  useEffect(() => {
    const listNode = mobileCertsListRef.current;

    const checkVisibility = () => {
      const isUp = homeScrollDirection.current === 'up';
      if (listNode) {
        const r1 = listNode.getBoundingClientRect();
        if (r1.top < window.innerHeight * 0.95 && r1.bottom > 0) {
          if (isUp) {
            setMobileCertsShouldSlide(false);
            setMobileCertsInView(true);
          } else {
            setMobileCertsShouldSlide(true);
            setMobileCertsInView(true);
          }
        } else if (r1.top > window.innerHeight + 60) {
          setMobileCertsInView(false);
          setMobileCertsShouldSlide(true);
        }
      }
    };

    checkVisibility();
    const t = setTimeout(checkVisibility, 120);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const isUp = homeScrollDirection.current === 'up';
          entries.forEach((entry) => {
            if (entry.target === listNode) {
              if (entry.isIntersecting) {
                if (isUp) {
                  setMobileCertsShouldSlide(false);
                  setMobileCertsInView(true);
                } else {
                  setMobileCertsShouldSlide(true);
                  setMobileCertsInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setMobileCertsInView(false);
                setMobileCertsShouldSlide(true);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      if (listNode) observer.observe(listNode);
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t);
      if (observer && listNode) {
        observer.unobserve(listNode);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [sectionRefreshKeys?.['certificates'], mobileCertsExpandKey]);

  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [mobileShowAllCertificates, setMobileShowAllCertificates] = useState(false);
  const [homeExpTab, setHomeExpTab] = useState('software');
  const [tripgenRoleTab, setTripgenRoleTab] = useState('all');
  const [tripgenShowcaseRole, setTripgenShowcaseRole] = useState(null);
  const [tripgenOverviewPillar, setTripgenOverviewPillar] = useState('target');
  const [tripgenSearch, setTripgenSearch] = useState('');
  const [tripgenGalleryCategory, setTripgenGalleryCategory] = useState('all');
  const [tripgenLightboxImage, setTripgenLightboxImage] = useState(null);
  const [tripgenLightboxCustomList, setTripgenLightboxCustomList] = useState(null);
  const [tripgenGalleryVisibleCount, setTripgenGalleryVisibleCount] = useState(12);
  const [tripgenSlideIndex, setTripgenSlideIndex] = useState(0);
  const [academicSlideIndex, setAcademicSlideIndex] = useState(0);
  const [isAcademicSlidePaused, setIsAcademicSlidePaused] = useState(false);
  const [showTestingChecklist, setShowTestingChecklist] = useState(false);
  const [idsGalleryFilter, setIdsGalleryFilter] = useState('all');

  // Academic Project Presentation Slides (Real MCA Presentation Photos)
  const ACADEMIC_PRESENTATION_SLIDES = [
    {
      id: 'academic-defense-review',
      title: 'Project Viva & Faculty Review',
      subtitle: 'Live Project Demonstration & Explanation.',
      desc: 'Demonstrating the TripGen application to faculty members, explaining its features, working process, and technologies during the MCA project viva.',
      image: '/tripgen-gallery/presentation-photo1.png',
      full: '/tripgen-gallery/presentation-photo1.png',
      preview: '/tripgen-gallery/presentation-photo1.png',
      icon: 'fa-solid fa-chalkboard-user',
      categoryLabel: 'Academic Presentation • Viva Voce & Faculty Review',
    },
    {
      id: 'academic-title-synopsis',
      title: 'Project Title & Synopsis Presentation',
      subtitle: 'MCA Project Introduction & Faculty Review.',
      desc: 'Presenting the TripGen project title, objectives, and synopsis to the faculty guide during the MCA academic project review. Explaining the problem statement, proposed solution, project scope, and technologies used in the Travel Plan Itinerary Generator.\n\nUnder the Supervision of:\nP. Deepthi, MCA, Ph.D.\nAssistant Professor\nDepartment of Master of Computer Applications.',
      image: '/tripgen-gallery/presentation-photo2.png',
      full: '/tripgen-gallery/presentation-photo2.png',
      preview: '/tripgen-gallery/presentation-photo2.png',
      icon: 'fa-solid fa-graduation-cap',
      categoryLabel: 'Academic Presentation • Synopsis & Faculty Review',
    },
    {
      id: 'academic-abstract-methodology',
      title: 'Project Abstract & System Methodology',
      subtitle: 'Project Overview & Working Process.',
      desc: 'Explaining how TripGen helps users plan trips and generate personalized travel itineraries. Presenting the main features, route planning, budget estimation, and daily activity scheduling to the faculty members.',
      image: '/tripgen-gallery/presentation-photo3.png',
      full: '/tripgen-gallery/presentation-photo3.png',
      preview: '/tripgen-gallery/presentation-photo3.png',
      icon: 'fa-solid fa-diagram-project',
      categoryLabel: 'Academic Presentation • Overview & Methodology',
    },
    {
      id: 'academic-live-demo',
      title: 'Live Application Demonstration',
      subtitle: 'Real-time TripGen website walkthrough.',
      desc: 'Demonstrating the running TripGen web application, dynamic itinerary calculations, destination filters, and role-based modules live on the presentation laptop.',
      image: '/tripgen-gallery/presentation-photo4.png',
      full: '/tripgen-gallery/presentation-photo4.png',
      preview: '/tripgen-gallery/presentation-photo4.png',
      icon: 'fa-solid fa-laptop-code',
      categoryLabel: 'Academic Presentation • Live Software Deployment',
    },
  ];

  // Filtered screenshots based on active category
  const filteredScreenshots = TRIPGEN_SCREENSHOTS.filter(
    (img) => tripgenGalleryCategory === 'all' || img.category === tripgenGalleryCategory
  );

  const displayedScreenshots =
    tripgenGalleryCategory === 'all'
      ? filteredScreenshots.slice(0, tripgenGalleryVisibleCount)
      : filteredScreenshots;

  const openLightbox = (image, customList = null) => {
    setTripgenLightboxImage(image);
    setTripgenLightboxCustomList(customList || null);
  };

  const closeLightbox = () => {
    setTripgenLightboxImage(null);
    setTripgenLightboxCustomList(null);
  };

  const prevLightbox = useCallback(() => {
    if (!tripgenLightboxImage) return;
    const currentList = tripgenLightboxCustomList || TRIPGEN_SCREENSHOTS.filter(
      (img) => tripgenGalleryCategory === 'all' || img.category === tripgenGalleryCategory
    );
    if (!currentList || currentList.length === 0) return;
    const currentIndex = currentList.findIndex(
      (img) => img.id === tripgenLightboxImage.id || img.full === tripgenLightboxImage.full
    );
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const prevIndex = (safeIndex - 1 + currentList.length) % currentList.length;
    const nextItem = currentList[prevIndex];
    setTripgenLightboxImage({
      ...nextItem,
      full: nextItem.full || nextItem.image,
      desc: nextItem.desc || '',
      categoryLabel: nextItem.categoryLabel || '',
    });
    if (tripgenLightboxCustomList) {
      setAcademicSlideIndex(prevIndex);
    }
  }, [tripgenLightboxImage, tripgenLightboxCustomList, tripgenGalleryCategory]);

  const nextLightbox = useCallback(() => {
    if (!tripgenLightboxImage) return;
    const currentList = tripgenLightboxCustomList || TRIPGEN_SCREENSHOTS.filter(
      (img) => tripgenGalleryCategory === 'all' || img.category === tripgenGalleryCategory
    );
    if (!currentList || currentList.length === 0) return;
    const currentIndex = currentList.findIndex(
      (img) => img.id === tripgenLightboxImage.id || img.full === tripgenLightboxImage.full
    );
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (safeIndex + 1) % currentList.length;
    const nextItem = currentList[nextIndex];
    setTripgenLightboxImage({
      ...nextItem,
      full: nextItem.full || nextItem.image,
      desc: nextItem.desc || '',
      categoryLabel: nextItem.categoryLabel || '',
    });
    if (tripgenLightboxCustomList) {
      setAcademicSlideIndex(nextIndex);
    }
  }, [tripgenLightboxImage, tripgenLightboxCustomList, tripgenGalleryCategory]);

  // Keyboard navigation for Lightbox (Left / Right arrows, Escape)
  useEffect(() => {
    if (!tripgenLightboxImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevLightbox();
      else if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tripgenLightboxImage, prevLightbox, nextLightbox]);

  // Merge API certificates with core certified assets ensuring authentic images, descriptions, and serial order
  const displayCertificates = mergeWithCoreCertificates(certificates);

  // Only show first 3 certificates by default while scrolling the page; reveal extra certificates only after clicking 'View All'
  const visibleCertificates = showAllCertificates
    ? displayCertificates
    : displayCertificates.slice(0, 3);

  // Open project & update browser URL (?project=id)
  const openProject = useCallback((proj) => {
    // Record exact target offset of projects section before opening
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const navHeight = 70;
      const buffer = 16;
      projectsScrollPosRef.current = Math.max(
        0,
        projectsEl.getBoundingClientRect().top + window.pageYOffset - navHeight - buffer
      );
    } else {
      projectsScrollPosRef.current = window.scrollY || window.pageYOffset || 0;
    }

    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    }
    setSelectedProject(proj);
    setTripgenRoleTab('all');
    setTripgenShowcaseRole(null);
    setTripgenOverviewPillar('target');
    setTripgenSearch('');
    setTripgenGalleryCategory('all');
    setTripgenLightboxImage(null);
    setTripgenGalleryVisibleCount(12);
    try {
      sessionStorage.setItem('open_project_id', proj.id || proj.title);
      const url = new URL(window.location.href);
      url.searchParams.set('project', proj.id || proj.title);
      window.history.pushState({ projectId: proj.id || proj.title }, '', url);
    } catch {
      // fallback
    }
  }, []);

  // Close project & immediately show Projects section without any scroll animation
  const closeProject = useCallback(() => {
    setSelectedProject(null);
    setTripgenRoleTab('all');
    setTripgenShowcaseRole(null);
    setTripgenOverviewPillar('target');
    setTripgenSearch('');
    setTripgenLightboxImage(null);

    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }

    try {
      sessionStorage.removeItem('open_project_id');
      sessionStorage.setItem('active_portfolio_section', 'projects');
      sessionStorage.setItem('active_portfolio_tab', 'projects');
      const url = new URL(window.location.href);
      url.searchParams.delete('project');
      url.hash = 'projects';
      window.history.replaceState({}, '', url);
    } catch {
      // fallback
    }

    // Immediately return user directly to Projects section without any scroll animation
    const immediateReturnToProjects = () => {
      if (typeof setActiveTab === 'function') {
        setActiveTab('projects', null, 'instant');
      }

      const el = document.getElementById('projects');
      const navHeight = 70;
      const buffer = 16;
      const targetTop = el
        ? Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - navHeight - buffer)
        : (projectsScrollPosRef.current || 0);

      window.scrollTo({
        top: targetTop,
        behavior: 'instant',
      });
    };

    immediateReturnToProjects();
    requestAnimationFrame(immediateReturnToProjects);
  }, [setActiveTab]);

  // Sync project state on initial page load / refresh & browser Back / Forward buttons
  useEffect(() => {
    const syncProjectFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project') || sessionStorage.getItem('open_project_id');
      if (projectId) {
        const candidateProjects = [...CORE_PROJECTS, ...(projects || [])];
        const found = candidateProjects.find(
          (p) =>
            String(p.id).toLowerCase() === projectId.toLowerCase() ||
            (p.title && p.title.toLowerCase().includes(projectId.toLowerCase()))
        );
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      setSelectedProject(null);
    };

    syncProjectFromUrl();

    window.addEventListener('popstate', syncProjectFromUrl);
    return () => window.removeEventListener('popstate', syncProjectFromUrl);
  }, [projects]);

  // ESC key listener and background scroll-lock for full-screen project view
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeProject();
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const isStillOpen =
        document.querySelector('.fixed.inset-0.z-50') ||
        Boolean(sessionStorage.getItem('open_project_id'));
      if (!isStillOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    };
  }, [selectedProject, closeProject]);

  // Ref for the dedicated TripGen modal scrolling container
  const tripgenModalScrollRef = useRef(null);
  // Ref for the dedicated Intrusion Detection System (IDS) modal scrolling container
  const idsModalScrollRef = useRef(null);
  // Ref & visibility trigger state for the TripGen Security & Implementation Notes split-screen banner
  const tripgenBannerRef = useRef(null);
  const [tripgenBannerVisible, setTripgenBannerVisible] = useState(false);

  // Intersection Observer & scroll detection to smoothly reveal TripGen sections and split-screen banner as user scrolls
  useEffect(() => {
    if (!selectedProject) {
      setTripgenBannerVisible(false);
      return;
    }
    const isTripGen =
      selectedProject.id === 'travel-planner' ||
      selectedProject.id === 2 ||
      String(selectedProject.slug || '').includes('travel') ||
      String(selectedProject.title || '').toLowerCase().includes('tripgen') ||
      String(selectedProject.title || '').toLowerCase().includes('travel plan');

    if (!isTripGen) return;

    // Reset banner visibility when modal opens so entrance animation plays when scrolled to
    setTripgenBannerVisible(false);

    let observer;
    let bannerObserver;

    // Direct geometric bounding-box visibility check (failsafe across all browsers & devices)
    const checkBannerInView = () => {
      const bannerEl = tripgenBannerRef.current;
      const scrollEl = tripgenModalScrollRef.current;
      if (!bannerEl) return;

      if (scrollEl) {
        const bRect = bannerEl.getBoundingClientRect();
        const sRect = scrollEl.getBoundingClientRect();
        // Trigger as soon as the banner enters the scrollable viewport area
        if (bRect.top < sRect.bottom - 20 && bRect.bottom > sRect.top + 20) {
          setTripgenBannerVisible(true);
        }
      } else {
        const bRect = bannerEl.getBoundingClientRect();
        if (bRect.top < window.innerHeight - 20 && bRect.bottom > 20) {
          setTripgenBannerVisible(true);
        }
      }
    };

    const timer = setTimeout(() => {
      const scrollContainer = tripgenModalScrollRef.current;
      if (scrollContainer) {
        scrollContainer.classList.add('tripgen-scroll-ready');
        // Attach passive scroll listener for instantaneous animation trigger on scroll
        scrollContainer.addEventListener('scroll', checkBannerInView, { passive: true });
      }

      // Check immediately in case the banner is already within the visible viewport
      checkBannerInView();

      if (typeof IntersectionObserver === 'undefined') {
        document.querySelectorAll('.tripgen-reveal-section').forEach((el) => {
          el.classList.add('is-revealed');
        });
        setTripgenBannerVisible(true);
        return;
      }

      // Observer for sections
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: tripgenModalScrollRef.current || null,
          threshold: 0.05,
          rootMargin: '0px 0px -20px 0px',
        }
      );

      const elements = tripgenModalScrollRef.current
        ? tripgenModalScrollRef.current.querySelectorAll('.tripgen-reveal-section')
        : document.querySelectorAll('.tripgen-reveal-section');
      elements.forEach((el) => observer.observe(el));

      // Dedicated IntersectionObserver for the TripGen split-screen banner
      const bannerEl = tripgenBannerRef.current;
      if (bannerEl) {
        bannerObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTripgenBannerVisible(true);
                bannerObserver.unobserve(entry.target);
              }
            });
          },
          {
            root: tripgenModalScrollRef.current || null,
            threshold: 0.08,
            rootMargin: '0px 0px -20px 0px',
          }
        );
        bannerObserver.observe(bannerEl);
      }
    }, 60);

    return () => {
      clearTimeout(timer);
      const scrollContainer = tripgenModalScrollRef.current;
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkBannerInView);
      }
      if (observer) observer.disconnect();
      if (bannerObserver) bannerObserver.disconnect();
    };
  }, [selectedProject]);

  // Automatic slideshow for Academic Project Presentation Screenshots (one image every 4 seconds)
  useEffect(() => {
    const isTripGenOpen =
      selectedProject &&
      (selectedProject.id === 'travel-planner' ||
        selectedProject.id === 2 ||
        String(selectedProject.slug || '').includes('travel') ||
        String(selectedProject.title || '').toLowerCase().includes('tripgen') ||
        String(selectedProject.title || '').toLowerCase().includes('travel plan'));

    if (!isTripGenOpen || isAcademicSlidePaused || tripgenLightboxImage !== null) {
      return;
    }

    const timer = setInterval(() => {
      setAcademicSlideIndex((prev) => (prev + 1) % ACADEMIC_PRESENTATION_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [selectedProject, isAcademicSlidePaused, tripgenLightboxImage, ACADEMIC_PRESENTATION_SLIDES.length]);

  // ─── IDS SCROLL REVEAL OBSERVER FOR STAGGERED CARDS ───
  useEffect(() => {
    if (!selectedProject) return;
    const isIDS =
      selectedProject.id === 'intrusion-detection' ||
      String(selectedProject.title || '').toLowerCase().includes('intrusion');

    if (!isIDS) return;

    let observer = null;
    const timer = setTimeout(() => {
      const scrollContainer = idsModalScrollRef.current;
      if (scrollContainer) {
        scrollContainer.classList.add('ids-scroll-ready');
      }

      const elements = scrollContainer
        ? scrollContainer.querySelectorAll('.ids-reveal-section')
        : document.querySelectorAll('.ids-reveal-section');

      if (typeof IntersectionObserver === 'undefined') {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: scrollContainer || null,
          threshold: 0.05,
          rootMargin: '0px 0px -20px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [selectedProject]);

  // WhatsApp Link Resolver (Desktop: WhatsApp Web login/chat, Mobile: WhatsApp App)
  const rawWhatsApp = profile?.whatsapp_url || profile?.whatsapp_number || profile?.phone || '+91 98765 43210';
  const isDirectUrl = typeof rawWhatsApp === 'string' && (rawWhatsApp.startsWith('http://') || rawWhatsApp.startsWith('https://'));
  const cleanPhone = !isDirectUrl ? String(rawWhatsApp).replace(/[^0-9]/g, '') : '';
  const isMobileDevice = typeof window !== 'undefined' && typeof navigator !== 'undefined'
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    : false;
  const whatsappUrl = isDirectUrl
    ? rawWhatsApp
    : cleanPhone
      ? (isMobileDevice ? `https://wa.me/${cleanPhone}` : `https://web.whatsapp.com/send?phone=${cleanPhone}`)
      : 'https://web.whatsapp.com/';

  return (
    <div className="w-full bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── 1. HERO SECTION (FULL PAGE 1ST SCREEN VIEWPORT, OPTIMIZED FOR MOBILE MATCHING REFERENCE & DESKTOP PRESERVED) ─── */}
      <section
        id="home"
        key={`hero-section-${sectionRefreshKeys['home'] || 0}`}
        className={`relative min-h-0 sm:min-h-0 lg:min-h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)] flex flex-col justify-start lg:justify-center items-center bg-white overflow-hidden scroll-mt-16 transition-opacity duration-200 pt-7 xs:pt-8 sm:pt-10 lg:pt-0 pb-4 xs:pb-5 sm:pb-6 lg:pb-0 ${refreshingSection === 'home' ? 'opacity-30' : 'opacity-100'
          }`}
      >
        {/* Hero Content (Aligned with Main Content Grid max-w-7xl px-4 sm:px-8) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 xs:pt-5 sm:pt-6 lg:py-8 pb-2 xs:pb-3 sm:pb-6 flex flex-col lg:flex-row items-center justify-between gap-3 xs:gap-3.5 sm:gap-6 lg:gap-10 xl:gap-14 relative z-10">

          {/* ─── PROFILE AVATAR (Order-1 on Mobile, Order-2 / Right Column on Desktop) ─── */}
          <div className="order-1 lg:order-2 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-8 relative w-full lg:w-auto flex-shrink-0">
            {/* Portrait with Bright Blue Circular Ring on Mobile (< lg), Clean Cutout on Desktop (>= lg) */}
            <div
              style={{ animationDelay: '0.25s' }}
              className="relative flex items-center justify-center w-full lg:w-auto lg:animate-none"
            >
              <div className="w-[185px] h-[185px] xs:w-[200px] xs:h-[200px] sm:w-[220px] sm:h-[220px] lg:w-auto lg:h-auto rounded-full lg:rounded-none border-4 border-[#0062FF] lg:border-none overflow-hidden lg:overflow-visible bg-gradient-to-b from-blue-50/80 to-indigo-50/40 lg:bg-none lg:bg-transparent shadow-[0_10px_28px_-6px_rgba(0,98,255,0.25)] lg:shadow-none flex items-center justify-center animate-mobile-profile-slide">
                {/* Mobile Profile Image: 2nd image type (Forward-facing portrait) */}
                <img
                  src={assetUrl('hero-portrait-mobile.png')}
                  alt={profile?.full_name || 'Tripurosundaro Behera'}
                  className="lg:hidden w-full h-full object-cover object-top scale-[1.06] translate-y-2.5 xs:translate-y-3 select-none"
                />
                {/* Desktop Hero Portrait (Crossed-arms pose, subtle scaled desktop size with smooth slow flip animation on refresh) */}
                <img
                  src={assetUrl('hero-portrait.png')}
                  alt={profile?.full_name || 'Tripurosundaro Behera'}
                  className="hidden lg:block w-auto h-[425px] xl:h-[455px] max-w-full object-contain object-top scale-100 translate-y-0 select-none transition-all duration-300 drop-shadow-sm hover:drop-shadow-md mx-auto animate-desktop-photo-flip"
                />
              </div>
            </div>

            {/* Desktop Vertical Social Links Panel (Preserved 100% on Desktop) */}
            <div
              style={{ animationDelay: '0.35s' }}
              className="hidden lg:flex translate-y-0 lg:-translate-y-8 flex-col gap-2.5 xs:gap-3 sm:gap-3.5 items-center justify-center animate-card-slide-fade"
            >
              <a
                href={profile?.linkedin_url || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="contact-social-item w-12 h-12 rounded-full bg-white border border-slate-200 text-[#0077b5] hover:bg-[#005e93] hover:text-white hover:border-[#005e93] shadow-xs hover:shadow-md flex items-center justify-center text-base transition-colors duration-200"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={profile?.github_url || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="contact-social-item w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-[#24292f] hover:text-white hover:border-[#24292f] shadow-xs hover:shadow-md flex items-center justify-center text-base transition-colors duration-200"
                title="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href={profile?.naukri_url || 'https://www.naukri.com'}
                target="_blank"
                rel="noreferrer"
                className="contact-social-item w-12 h-12 rounded-full bg-white border border-slate-200 text-[#00a2e8] hover:bg-[#0284c7] hover:text-white hover:border-[#0284c7] shadow-xs hover:shadow-md flex items-center justify-center text-base transition-colors duration-200 group"
                title="Naukri"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M8 7c3-3 8-1 9 4s-3 8-7 8" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-social-item w-12 h-12 rounded-full bg-white border border-slate-200 text-[#25D366] hover:bg-[#15803d] hover:text-white hover:border-[#15803d] shadow-xs hover:shadow-md flex items-center justify-center text-lg transition-colors duration-200 group"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile?.email || '24jnf00084@svcn.ac.in')}&su=${encodeURIComponent('Portfolio Inquiry - Tripurosundaro Behera')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-item w-12 h-12 rounded-full bg-white border border-slate-200 text-[#e11d48] hover:bg-[#be123c] hover:text-white hover:border-[#be123c] shadow-xs hover:shadow-md flex items-center justify-center text-base transition-colors duration-200 cursor-pointer"
                title={`Send Email via Gmail to ${profile?.email || '24jnf00084@svcn.ac.in'}`}
                aria-label="Email via Gmail"
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
              <a
                href={profile?.resume || '/resume.pdf'}
                download
                className="contact-social-item w-12 h-12 rounded-full bg-white border border-slate-200 text-[#6366f1] hover:bg-[#4338ca] hover:text-white hover:border-[#4338ca] shadow-xs hover:shadow-md flex items-center justify-center text-base transition-colors duration-200"
                title="Download CV"
              >
                <i className="fa-solid fa-download"></i>
              </a>
            </div>
          </div>

          {/* ─── MAIN TEXT & MOBILE HERO WIDGETS (Order-2 on Mobile, Order-1 / Left Column on Desktop) ─── */}
          <div className="order-2 lg:order-1 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl text-center lg:text-left">
            <div className="translate-y-0 sm:translate-y-0 lg:-translate-y-12 space-y-2 xs:space-y-2.5 sm:space-y-3.5 lg:space-y-4 animate-heading-fade-slide-up">
              {/* Desktop "HI, I'M" with blue horizontal line */}
              <div className="hidden lg:flex items-center justify-start gap-2.5">
                <span className="text-[#0062FF] font-black text-[13px] lg:text-sm tracking-widest uppercase">
                  HI, I&apos;M
                </span>
                <span className="w-12 h-[3px] bg-[#0062FF] rounded-full"></span>
              </div>

              {/* Mobile "——— HI, I'M ———" (Visual showing on both left and right side) */}
              <div className="lg:hidden flex items-center justify-center gap-2.5">
                <span className="w-10 xs:w-12 h-[3px] bg-[#0062FF] rounded-full inline-block"></span>
                <span className="text-[#0062FF] font-black text-sm xs:text-[14.5px] tracking-widest uppercase">
                  HI, I&apos;M
                </span>
                <span className="w-10 xs:w-12 h-[3px] bg-[#0062FF] rounded-full inline-block"></span>
              </div>

              {/* Two-line Name Heading (Tripurosundaro in black, Behera in blue) */}
              <h1 className="text-[27px] xs:text-[30px] sm:text-[38px] lg:text-[58px] xl:text-[64px] font-black tracking-tight leading-[1.12] break-words text-center lg:text-left pt-0">
                {/* Desktop: Static Full Text (100% UNTOUCHED, hidden on mobile) */}
                <span className="hidden lg:block text-[#0f172a]">
                  {heroFirstName}{' '}
                </span>
                <span className="hidden lg:block text-[#0062FF]">
                  {heroLastName}
                </span>

                {/* Mobile: Slowly Writing Typewriter Effect Coming from Left Side (Mobile Only) */}
                <span className="inline-block lg:hidden animate-mobile-name-slide">
                  <span className="text-[#0f172a]">
                    {mobileFirstPart}{mobileShowSpace ? ' ' : ''}
                  </span>
                  <span className="text-[#0062FF]">
                    {mobileLastPart}
                  </span>
                </span>
              </h1>

              {/* Desktop Role Title in Solid Dark Slate (Preserved on Desktop) */}
              <div className="hidden lg:block">
                <p className="text-xl lg:text-[22px] xl:text-[24px] font-extrabold text-slate-800 tracking-tight text-left">
                  {profile?.role || profile?.headline || 'Python Full-Stack Developer'}
                </p>
              </div>

              {/* Mobile Role Pill Badge with Python Logo (Exact match to Image 2) */}
              <div className="flex justify-center lg:hidden pt-0.5">
                <div className="inline-flex items-center gap-2 px-3.5 xs:px-4 py-1.5 rounded-full bg-[#f0f6ff] border border-[#bfdbfe] shadow-2xs">
                  <svg className="w-4 h-4 xs:w-4.5 xs:h-4.5 flex-shrink-0" viewBox="0 0 128 128">
                    <path fill="#387EB8" d="M63.04 7.02c-5.4 0-10.4.45-14.73 1.28-12.72 2.45-15.05 7.6-15.05 17.06v12.51h30.4v4.17H21.43c-9.52 0-17.88 5.76-20.52 16.71-3.05 12.58-3.19 20.44 0 33.77 2.37 9.8 7.9 16.7 17.43 16.7h9.99v-13.89c0-10.5 8.94-19.78 19.78-19.78h30.34c8.89 0 16.14-7.46 16.14-16.42V25.36c0-8.67-7.44-15.17-16.14-16.78-5.06-.93-10.54-1.56-15.41-1.56zM50.22 17.18c2.97 0 5.37 2.4 5.37 5.37 0 2.97-2.4 5.37-5.37 5.37-2.97 0-5.37-2.4-5.37-5.37 0-2.97 2.4-5.37 5.37-5.37z" />
                    <path fill="#FFE052" d="M64.96 120.98c5.4 0 10.4-.45 14.73-1.28 12.72-2.45 15.05-7.6 15.05-17.06v-12.51H64.34v-4.17h42.23c9.52 0 17.88-5.76 20.52-16.71 3.05-12.58 3.19-20.44 0-33.77-2.37-9.8-7.9-16.7-17.43-16.7h-9.99v13.89c0 10.5-8.94 19.78-19.78 19.78H49.55c-8.89 0-16.14 7.46-16.14 16.42v33.77c0 8.67 7.44 15.17 16.14 16.78 5.06.93 10.54 1.56 15.41 1.56zm12.82-10.16c-2.97 0-5.37-2.4-5.37-5.37 0-2.97 2.4-5.37 5.37-5.37 2.97 0 5.37 2.4 5.37 5.37 0 2.97-2.4 5.37-5.37 5.37z" />
                  </svg>
                  <span className="font-extrabold text-[13px] xs:text-[14px] text-slate-800 tracking-tight">
                    {profile?.role || profile?.headline || 'Python Full-Stack Developer'}
                  </span>
                </div>
              </div>

              {/* Hero Description */}
              <p
                className="w-full text-[13.5px] xs:text-[14px] sm:text-[15px] lg:text-[16px] text-slate-600 lg:text-slate-500 font-normal leading-relaxed pt-0.5 text-justify [text-align-last:center] lg:text-left lg:[text-align-last:left] max-w-sm xs:max-w-md sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0"
              >
                {(() => {
                  const defaultDesc =
                    'Passionate Python Full-Stack Developer dedicated to building responsive, scalable web applications with Python, Django, React, and SQL. Committed to writing clean code, solving real-world engineering challenges, and delivering modern, high-impact web solutions.';
                  const desc = profile?.hero_description || defaultDesc;
                  if (desc === defaultDesc) {
                    return (
                      <>
                        <span className="lg:hidden">
                          Passionate Python Full-Stack Developer dedicated to building responsive, scalable web applications with Python, Django, React, and SQL.
                        </span>
                        <span className="hidden lg:inline">
                          Passionate Python Full-Stack Developer dedicated to building responsive,<br className="hidden sm:inline" />{' '}
                          scalable web applications with Python, Django, React, and SQL.<br className="hidden sm:inline" />{' '}
                          Committed to writing clean code, solving real-world engineering<br className="hidden sm:inline" />{' '}
                          challenges, and delivering modern, high-impact web solutions.
                        </span>
                      </>
                    );
                  }
                  return desc;
                })()}
              </p>
            </div>

            {/* ─── MOBILE ONLY: QUICK STATS CARD (Placed Above Action Buttons per Mobile Arrow) ─── */}
            <div className="lg:hidden w-full max-w-sm mx-auto pt-3.5 xs:pt-4 pb-2.5 xs:pb-3">
              <div className="bg-white border border-blue-100/90 rounded-2xl p-2.5 xs:p-3 shadow-[0_2px_12px_-3px_rgba(0,98,255,0.06)] grid grid-cols-3 divide-x divide-slate-100 text-center">
                <div className="px-1 flex flex-col items-center justify-center">
                  <i className="fa-solid fa-graduation-cap text-[#0062FF] text-base xs:text-lg mb-0.5"></i>
                  <span className="font-extrabold text-slate-900 text-[13.5px] xs:text-[14px] leading-tight">
                    MCA
                  </span>
                  <span className="text-[10.5px] xs:text-[11.5px] text-slate-500 font-medium leading-tight mt-0.5">
                    Postgraduate
                  </span>
                </div>
                <div className="px-1 flex flex-col items-center justify-center">
                  <i className="fa-solid fa-location-dot text-[#0062FF] text-base xs:text-lg mb-0.5"></i>
                  <span className="font-extrabold text-slate-900 text-[13.5px] xs:text-[14px] leading-tight">
                    Bengaluru
                  </span>
                  <span className="text-[10.5px] xs:text-[11.5px] text-slate-500 font-medium leading-tight mt-0.5">
                    Karnataka, India
                  </span>
                </div>
                <div className="px-1 flex flex-col items-center justify-center">
                  <i className="fa-solid fa-code text-[#0062FF] text-base xs:text-lg mb-0.5"></i>
                  <span className="font-extrabold text-slate-900 text-[13.5px] xs:text-[14px] leading-tight">
                    4+
                  </span>
                  <span className="text-[10.5px] xs:text-[11.5px] text-slate-500 font-medium leading-tight mt-0.5">
                    Projects
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div
              style={{ animationDelay: '0.15s' }}
              className="w-full max-w-sm xs:max-w-md lg:max-w-2xl flex flex-row items-center justify-center lg:justify-start gap-3 xs:gap-3.5 sm:gap-4 pt-3 xs:pt-3.5 sm:pt-6 lg:pt-8 animate-card-slide-fade mx-auto lg:mx-0"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) {
                    const navHeight = 70;
                    const buffer = 16;
                    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: Math.max(0, elementPosition - navHeight - buffer), behavior: 'smooth' });
                  }
                }}
                className="flex-1 sm:flex-initial py-3 xs:py-3.5 px-4 xs:px-6 rounded-xl text-[13.5px] xs:text-[14.5px] sm:text-base font-bold text-white bg-gradient-to-r from-[#0062FF] via-[#5B45FF] to-[#8B5CF6] lg:bg-none lg:bg-[#0062FF] hover:opacity-95 lg:hover:opacity-100 lg:hover:bg-blue-700 shadow-md shadow-indigo-500/25 lg:shadow-blue-500/20 hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none whitespace-nowrap"
              >
                View My Work <i className="fa-solid fa-arrow-right text-[11px] xs:text-xs"></i>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    const navHeight = 70;
                    const buffer = 16;
                    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: Math.max(0, elementPosition - navHeight - buffer), behavior: 'smooth' });
                  } else if (typeof setActiveTab === 'function') {
                    setActiveTab('contact');
                  }
                }}
                className="flex-1 sm:flex-initial py-3 xs:py-3.5 px-4 xs:px-6 rounded-xl text-[13.5px] xs:text-[14.5px] sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none whitespace-nowrap"
              >
                <i className="fa-regular fa-envelope text-slate-600 text-xs sm:text-sm"></i> Contact Me
              </button>
            </div>



          </div>
        </div>
      </section>

      {/* ─── 3. MULTI-SECTION FULL-PAGE WORKSPACE (EACH SECTION FULL VIEWPORT, CENTERED IN MIDDLE) ─── */}
      <main className="w-full">

        {/* ─── SECTION 1: ABOUT ME (FULL VIEWPORT PAGE, CENTERED IN THE MIDDLE) ─── */}
        <div
          id="about"
          key={`about-${sectionRefreshKeys['about'] || 0}`}
          className={`w-full min-h-0 lg:min-h-[calc(100vh-70px)] flex flex-col justify-start lg:justify-center items-center py-6 sm:py-8 lg:py-10 lg:sm:py-14 scroll-mt-[70px] transition-opacity duration-200 ${refreshingSection === 'about' ? 'opacity-30' : 'opacity-100'
            }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
            <AboutSection
              setActiveTab={setActiveTab}
              refreshingSection={refreshingSection}
              refreshKey={sectionRefreshKeys['about'] || 0}
            />
          </div>
        </div>

        {/* ─── SKILLS & TECHNOLOGIES: AUTOMATIC SLOW-MOTION MARQUEE (FULL VIEWPORT PAGE, CENTERED IN THE MIDDLE) ─── */}
        <div
          id="skills"
          key={`skills-${sectionRefreshKeys['skills'] || 0}`}
          className={`w-full min-h-0 lg:min-h-[calc(100vh-70px)] flex flex-col justify-start lg:justify-center items-center py-6 sm:py-8 lg:py-10 lg:sm:py-14 scroll-mt-[70px] transition-opacity duration-200 ${refreshingSection === 'skills' ? 'opacity-30' : 'opacity-100'
            }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
            <SkillsMarquee
              setActiveTab={setActiveTab}
              skills={skills}
              refreshingSection={refreshingSection}
              refreshKey={sectionRefreshKeys['skills'] || 0}
              onOpenProject={openProject}
            />
          </div>
        </div>

        {/* ─── PROJECTS: FEATURED PROJECTS (FULL VIEWPORT PAGE, CENTERED IN THE MIDDLE) ─── */}
        <div
          id="projects"
          key={`projects-${sectionRefreshKeys['projects'] || 0}`}
          className={`w-full min-h-0 lg:min-h-[calc(100vh-70px)] flex flex-col justify-start lg:justify-center py-4 xs:py-5 sm:py-8 lg:py-10 lg:sm:py-14 scroll-mt-[70px] transition-opacity duration-200 ${refreshingSection === 'projects' ? 'opacity-30' : 'opacity-100'
            }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-1 xs:space-y-1.5 sm:space-y-7">
          {/* Header matching 2nd Reference Image */}
          <div className="relative overflow-visible pb-0 space-y-1.5 xs:space-y-2 sm:space-y-2 animate-heading-fade-slide-up">
            {/* Mobile Only: Top-Right Project Illustration (< md) matching Skills / Education / Certificates */}
            <div
              ref={projectsIllustrationRef}
              className={`md:hidden float-right ml-2 -mb-2 xs:-mb-2.5 w-[176px] xs:w-[192px] sm:w-[208px] flex-shrink-0 select-none pointer-events-none ${
                projectsIllustrationInView
                  ? projectsShouldSlide
                    ? 'animate-mobile-about-slide'
                    : 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <img
                src={assetUrl('projects-header-illustration.png')}
                alt="Featured Projects Illustration"
                className="w-full h-auto object-contain drop-shadow-sm"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Category Tag: PROJECTS — */}
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] xs:text-[13.5px] sm:text-[13px] font-black tracking-wider text-[#0062FF] uppercase">
                PROJECTS
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-[#0062FF] rounded-full inline-block"></span>
            </div>

            {/* Headline: Featured Projects */}
            <h2 className="text-[22px] xs:text-[24px] sm:text-3xl lg:text-[35px] font-black tracking-tight leading-tight">
              <span className="text-[#0f172a] block sm:inline">Featured </span>
              <span className="text-[#0062FF] block sm:inline">Projects</span>
            </h2>

            {/* Subtitle description */}
            <p className="text-[13px] xs:text-[13.5px] sm:text-[15px] text-slate-500 font-normal leading-relaxed max-w-2xl text-justify xs:text-left clear-none">
              Here are some of the projects I&apos;ve built to apply my skills and solve real-world problems.
            </p>
            <div className="clear-both"></div>
          </div>

          {/* Desktop & Tablet Grid: 3 Core Projects (100% UNCHANGED for PC) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-hidden p-1">
            {CORE_PROJECTS.map((proj, idx) => {
              const directionalAnimClass = projectsAnimationActive
                ? (idx === 0
                    ? 'animate-project-left'
                    : idx === 1
                      ? 'animate-project-down'
                      : 'animate-project-right')
                : '';

              return (
                <div
                  key={proj.id}
                  className={`card-hover-lift ${directionalAnimClass} bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group/card`}
                >
                  <div>
                    {/* Project Image */}
                    <div
                      onClick={() => openProject(proj)}
                      className={`w-full h-44 sm:h-48 overflow-hidden ${proj.id === 'english-master'
                        ? 'bg-[#030d2e]'
                        : proj.id === 'intrusion-detection'
                          ? 'bg-[#01082a]'
                          : 'bg-slate-100'
                        } relative cursor-pointer border-b border-slate-200/80`}
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/project-travel-planner.png';
                        }}
                      />
                    </div>

                    <div className="p-5 sm:p-6 pb-2">
                      <h4
                        onClick={() => openProject(proj)}
                        className="text-base sm:text-lg font-extrabold text-slate-900 group-hover/card:text-blue-600 transition-colors cursor-pointer"
                      >
                        {proj.title}
                      </h4>

                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2.5 line-clamp-2 font-normal">
                        {proj.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Place: Clean 'Explore ->' Action */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openProject(proj)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group/link"
                      >
                        <span>Explore</span>
                        <span className="text-sm font-semibold transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile View: Single-Card Interactive Carousel Slider (matching 2nd Reference Image) */}
          {(() => {
            const mobileSlides = [...CORE_PROJECTS, CORE_PROJECTS[0]];
            const currentActiveDotIdx = activeMobileProjectIdx % CORE_PROJECTS.length;

            return (
              <div
                ref={mobileCarouselContainerRef}
                className="md:hidden flex flex-col items-center w-full !-mt-1 xs:!-mt-1.5 sm:!mt-0"
              >
                {/* Carousel Window: clipped cleanly with rounded corners */}
                <div
                  className="w-full max-w-sm mx-auto overflow-hidden rounded-3xl py-1 px-0.5"
                  onTouchStart={handleProjectTouchStart}
                  onTouchMove={handleProjectTouchMove}
                  onTouchEnd={handleProjectTouchEnd}
                  onMouseEnter={() => setIsProjectCarouselPaused(true)}
                  onMouseLeave={() => {
                    if (projectResumeTimerRef.current) clearTimeout(projectResumeTimerRef.current);
                    projectResumeTimerRef.current = setTimeout(() => {
                      setIsProjectCarouselPaused(false);
                    }, 2000);
                  }}
                >
                  {/* Sliding Track: moves by -100% per activeMobileProjectIdx */}
                  <div
                    onTransitionEnd={handleMobileProjectTransitionEnd}
                    className="flex w-full select-none"
                    style={{
                      transform: `translate3d(-${activeMobileProjectIdx * 100}%, 0, 0)`,
                      transition: isMobileProjectTransitioning
                        ? 'transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'none',
                      willChange: 'transform',
                    }}
                  >
                    {mobileSlides.map((currentMobileProject, sIdx) => {
                      const currentMobileMeta = getMobileProjectMeta(currentMobileProject);

                      return (
                        <div
                          key={`${currentMobileProject.id}-${sIdx}`}
                          className="w-full flex-shrink-0 px-0.5"
                        >
                          <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-md p-3.5 xs:p-4">
                            {/* Project Image Banner inside Card with Rounded Corners */}
                            <div
                              onClick={() => openProject(currentMobileProject)}
                              className={`w-full h-48 xs:h-52 rounded-2xl overflow-hidden ${
                                currentMobileProject.id === 'english-master'
                                  ? 'bg-[#030d2e]'
                                  : currentMobileProject.id === 'intrusion-detection'
                                    ? 'bg-[#01082a]'
                                    : 'bg-slate-100'
                              } relative cursor-pointer mb-3.5 select-none`}
                            >
                              <img
                                src={currentMobileProject.image}
                                alt={currentMobileProject.title}
                                className="w-full h-full object-cover object-center transition-transform duration-300 active:scale-95"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = '/project-travel-planner.png';
                                }}
                              />
                            </div>

                            {/* Title & Subtitle */}
                            <div className="mb-1.5 xs:mb-2">
                              <h3
                                onClick={() => openProject(currentMobileProject)}
                                className="text-[19px] xs:text-[21px] font-extrabold text-slate-900 tracking-tight cursor-pointer hover:text-[#0062FF] transition-colors"
                              >
                                {currentMobileMeta.title}
                              </h3>
                              {currentMobileMeta.subtitle && (
                                <p className="text-[13px] xs:text-[14px] font-bold text-slate-800 -mt-0.5">
                                  {currentMobileMeta.subtitle}
                                </p>
                              )}
                            </div>

                            {/* Concise Description */}
                            <p className="text-[13.5px] xs:text-[14px] text-slate-600 leading-relaxed mb-3.5 font-normal">
                              {currentMobileMeta.desc}
                            </p>

                            {/* Tech Pills Row */}
                            <div className="flex flex-wrap items-center gap-2 mb-2 xs:mb-2.5">
                              {currentMobileMeta.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 xs:px-3.5 py-1 xs:py-1.5 rounded-xl bg-slate-100 text-slate-700 text-[12.5px] xs:text-[13px] font-semibold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Action Link: Explore Project → */}
                            <div>
                              <button
                                type="button"
                                onClick={() => openProject(currentMobileProject)}
                                className="inline-flex items-center gap-1.5 text-[14.5px] xs:text-[15px] font-extrabold text-[#0062FF] hover:text-blue-700 transition-colors cursor-pointer group"
                              >
                                <span>Explore Project</span>
                                <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pagination Dots Row */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-0.5" role="tablist" aria-label="Project carousel pagination">
                  {CORE_PROJECTS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleMobileDotClick(dotIdx)}
                      aria-label={`Go to project ${dotIdx + 1}`}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        currentActiveDotIdx === dotIdx
                          ? 'w-2.5 h-2.5 bg-[#0062FF]'
                          : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
          </div>
        </div>

        {/* ─── SECTION: EDUCATION (FULL VIEWPORT PAGE, CENTERED IN THE MIDDLE) ─── */}
        <div
          id="education"
          key={`education-${sectionRefreshKeys['education'] || 0}`}
          className={`w-full min-h-0 lg:min-h-[calc(100vh-70px)] flex flex-col justify-start lg:justify-center items-center py-6 sm:py-8 lg:py-10 lg:sm:py-14 scroll-mt-[70px] transition-opacity duration-200 ${refreshingSection === 'education' ? 'opacity-30' : 'opacity-100'
            }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
            <EducationSection
              refreshKey={sectionRefreshKeys['education'] || 0}
              refreshingSection={refreshingSection}
            />
          </div>
        </div>

        {/* ─── SECTION: CERTIFICATES (FULL VIEWPORT PAGE, CENTERED IN THE MIDDLE) ─── */}
        <div
          id="certificates"
          key={`certificates-${sectionRefreshKeys['certificates'] || 0}`}
          className={`w-full min-h-0 lg:min-h-[calc(100vh-70px)] flex flex-col justify-start lg:justify-center py-6 sm:py-8 lg:py-10 lg:sm:py-14 scroll-mt-[70px] transition-opacity duration-200 ${refreshingSection === 'certificates' ? 'opacity-30' : 'opacity-100'
            }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-7">
            {/* ======================================================== */}
            {/* DESKTOP / TABLET CERTIFICATES VIEW (100% UNCHANGED)     */}
            {/* ======================================================== */}
            <div className="hidden sm:block space-y-6 sm:space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1 animate-heading-fade-slide-up">
                <div className="space-y-2">
                  {/* Category Tag: CERTIFICATIONS — */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-[13px] xs:text-[13.5px] sm:text-[13px] font-black tracking-wider text-[#0062FF] uppercase">
                      CERTIFICATIONS
                    </span>
                    <span className="w-8 sm:w-10 h-[2.5px] bg-[#0062FF] rounded-full inline-block"></span>
                  </div>

                  {/* Headline: Certifications & Achievements */}
                  <h2 className="text-[26px] xs:text-[28px] sm:text-3xl lg:text-[35px] font-black tracking-tight leading-tight">
                    <span className="text-[#0f172a]">Certifications & </span>
                    <span className="text-[#0062FF]">Achievements</span>
                  </h2>

                  {/* Subtitle description */}
                  <p className="text-[14.5px] xs:text-[15px] sm:text-[15px] text-slate-500 font-normal leading-relaxed max-w-2xl">
                    I have completed various online courses and certifications to enhance my skills and stay updated with the latest technologies.
                  </p>
                </div>

                {/* View All / Show Less Link on the right side */}
                {displayCertificates.length > 3 && (
                  <button
                    type="button"
                    id="view-all-certificates-btn"
                    data-testid="view-all-certificates-btn"
                    onClick={() => setShowAllCertificates((prev) => !prev)}
                    className="text-[13px] xs:text-sm sm:text-sm font-bold text-[#0062FF] hover:underline cursor-pointer pb-1 whitespace-nowrap self-start sm:self-end inline-flex items-center gap-1.5 transition-all group/btn"
                    aria-expanded={showAllCertificates}
                  >
                    <span>{showAllCertificates ? 'Show Less' : 'View All'}</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
                      {showAllCertificates ? '↑' : '→'}
                    </span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {visibleCertificates.map((cert, idx) => {
                  const cardDelay = `${(idx % 3) * 0.18 + 0.08}s`;
                  const textDelay = `${(idx % 3) * 0.18 + 0.18}s`;
                  return (
                    <div
                      key={cert.id || idx}
                      style={certificatesAnimationActive ? { animationDelay: cardDelay } : undefined}
                      onClick={() => setSelectedCert(cert)}
                      className={`cert-card-hover bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-200 flex flex-col justify-between overflow-hidden group/card cursor-pointer edu-text-clarity ${
                        certificatesAnimationActive
                          ? 'animate-cert-card-up animate-card-slide-fade opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-16 pointer-events-none'
                      }`}
                    >
                      <div>
                        {/* Certificate Image (Total Image) */}
                        <div className="w-full aspect-[16/10] overflow-hidden bg-slate-50 relative border-b border-slate-200/80 flex items-center justify-center p-2">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = cert.image;
                            }}
                          />
                        </div>

                        {/* Under the total image: All Text Content */}
                        <div
                          style={certificatesAnimationActive ? { animationDelay: textDelay } : undefined}
                          className={`p-5 sm:p-6 pb-2 edu-text-clarity ${
                            certificatesAnimationActive ? 'animate-cert-text-in' : ''
                          }`}
                        >
                          <h4 className="text-[16.5px] xs:text-[17.5px] sm:text-lg font-extrabold text-slate-900 group-hover/card:text-amber-600 transition-colors line-clamp-2 leading-snug">
                            {cert.title}
                          </h4>

                          {/* Two Lines Paragraph Content */}
                          <p className="text-[13px] xs:text-[13.5px] sm:text-[13px] text-slate-600 leading-relaxed mt-2.5 line-clamp-2 font-normal">
                            {cert.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Card Action */}
                      <div className="px-5 sm:px-6 pb-5 pt-2">
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs xs:text-[12.5px] sm:text-[11px] font-semibold text-slate-400 truncate max-w-[150px]">
                            {cert.issuer}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[13px] xs:text-[13.5px] sm:text-xs font-bold text-amber-600 group-hover/card:text-amber-700">
                            <span>View Certificate</span>
                            <span className="transition-transform duration-200 group-hover/card:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom collapse action when expanded, returning to 3 cards cleanly */}
              {showAllCertificates && displayCertificates.length > 3 && (
                <div className="flex justify-center pt-3 animate-card-slide-fade">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllCertificates(false);
                      const el = document.getElementById('certificates');
                      if (el) {
                        const navHeight = 70;
                        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                          top: Math.max(0, elementPosition - navHeight),
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="inline-flex items-center gap-2 text-[13px] xs:text-sm sm:text-sm font-bold text-[#0062FF] bg-blue-50/80 hover:bg-blue-100 text-blue-600 px-5 py-2 rounded-full border border-blue-200/60 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Show Less Certifications</span>
                    <span>↑</span>
                  </button>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* MOBILE CERTIFICATES VIEW (Design matching Image 2 mock)  */}
            {/* ======================================================== */}
            <div className="block sm:hidden space-y-2.5 xs:space-y-3">
              {/* 1. Header with 3D Illustration on Top-Right */}
              <div className="relative overflow-visible pb-0.5">
                <div
                  ref={certificatesIllustrationRef}
                  className={`float-right ml-2 -mb-2 w-[156px] xs:w-[170px] flex-shrink-0 select-none pointer-events-none ${
                    certificatesIllustrationInView
                      ? certificatesShouldSlide
                        ? 'animate-mobile-about-slide'
                        : 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-10'
                  }`}
                >
                  <img
                    src={assetUrl('certificates-header-illustration.png')}
                    alt="Certificates Illustration"
                    className="w-full h-auto object-contain drop-shadow-sm"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[12px] font-black tracking-wider text-[#0062FF] uppercase">
                    CERTIFICATIONS
                  </span>
                  <span className="w-8 h-[2px] bg-[#0062FF] rounded-full inline-block"></span>
                </div>

                {/* Headline: Certifications & Achievements */}
                <h2 className="text-[20px] xs:text-[22px] font-black tracking-tight leading-[1.18] mb-2 text-slate-900">
                  <span className="block whitespace-nowrap">Certifications &</span>
                  <span className="block text-[#0062FF]">Achievements</span>
                </h2>

                {/* Subtitle description */}
                <p className="text-[12px] xs:text-[12.5px] text-slate-500 font-normal leading-relaxed text-justify xs:text-left clear-none">
                  I have completed various online courses and certifications to enhance my skills and stay updated with the latest technologies.
                </p>
                <div className="clear-both"></div>
              </div>

              {/* 2. Stats Pill Card: Real Certifications Count | Platforms | Multiple Domains */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs py-2.5 px-2 grid grid-cols-3 divide-x divide-slate-100 text-center">
                <div className="flex flex-col items-center justify-center px-1">
                  <span className="text-[15px] font-black text-[#0062FF] leading-tight">
                    {displayCertificates.length}
                  </span>
                  <span className="text-[10.5px] font-semibold text-slate-500 leading-tight mt-0.5">Certifications</span>
                </div>

                <div className="flex flex-col items-center justify-center px-1">
                  <span className="text-[15px] font-black text-[#0062FF] leading-tight">
                    {new Set(displayCertificates.map((c) => c.issuer)).size}
                  </span>
                  <span className="text-[10.5px] font-semibold text-slate-500 leading-tight mt-0.5">Platforms</span>
                </div>

                <div className="flex flex-col items-center justify-center px-1">
                  <span className="text-[15px] font-black text-[#0062FF] leading-tight">Multiple</span>
                  <span className="text-[10.5px] font-semibold text-slate-500 leading-tight mt-0.5">Domains</span>
                </div>
              </div>

              {/* 3. Horizontal Compact Certificate Cards (Visual limit: 3 on mobile) */}
              <div ref={mobileCertsListRef} className="flex flex-col gap-3">
                {(mobileShowAllCertificates ? displayCertificates : displayCertificates.slice(0, 3)).map((cert, idx) => {
                  const badgeLabel = cert.badge || (cert.title.toLowerCase().includes('internship') ? 'Internship' : cert.issuer.split(' ')[0]);
                  const staggerDelay = `${(idx % 6) * 85}ms`;

                  return (
                    <div
                      key={`mobile-cert-${cert.id || idx}-k${mobileCertsExpandKey}`}
                      onClick={() => setSelectedCert(cert)}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-[#0062FF]/40 py-2 px-2.5 flex items-center gap-2.5 xs:gap-3 transition-all duration-200 cursor-pointer group/mcard overflow-hidden"
                    >
                      {/* Left Thumbnail (Slowly coming into position from Left Side) */}
                      <div
                        style={mobileCertsInView ? { animationDelay: staggerDelay } : undefined}
                        className={`w-[80px] xs:w-[88px] h-[66px] xs:h-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shadow-2xs ${
                          mobileCertsInView
                            ? mobileCertsShouldSlide
                              ? 'animate-mobile-cert-thumb-left'
                              : 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-8'
                        }`}
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover/mcard:scale-105"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = cert.image;
                          }}
                        />
                      </div>

                      {/* Right Content (Slowly coming into position from Right Side) */}
                      <div
                        style={mobileCertsInView ? { animationDelay: staggerDelay } : undefined}
                        className={`flex-1 min-w-0 flex flex-col justify-between py-0 ${
                          mobileCertsInView
                            ? mobileCertsShouldSlide
                              ? 'animate-mobile-cert-text-right'
                              : 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-8'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="text-[12.5px] xs:text-[13.5px] font-black text-slate-900 leading-snug line-clamp-1 group-hover/mcard:text-[#0062FF] transition-colors">
                            {cert.title}
                          </h4>
                          <span className="text-[9.5px] xs:text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0062FF] border border-blue-200/60 shrink-0">
                            {badgeLabel}
                          </span>
                        </div>

                        <p className="text-[11px] xs:text-[11.5px] text-slate-500 font-normal leading-relaxed line-clamp-2 mt-0.5">
                          {cert.desc}
                        </p>

                        <div className="flex items-center justify-between gap-1.5 mt-1.5 pt-1 border-t border-slate-100">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {cert.issue_date}
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[9.5px] font-bold">
                            <span>✔</span>
                            <span>Completed</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4. Bottom View All Certificates Button */}
              {displayCertificates.length > 3 && (
                <button
                  type="button"
                  id="mobile-view-all-certificates-btn"
                  onClick={() => {
                    setMobileCertsExpandKey((prevKey) => prevKey + 1);
                    setMobileShowAllCertificates((prev) => {
                      const next = !prev;
                      if (!next) {
                        const el = document.getElementById('certificates');
                        if (el && typeof window?.scrollTo === 'function') {
                          const navHeight = 70;
                          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                          try {
                            window.scrollTo({
                              top: Math.max(0, elementPosition - navHeight),
                              behavior: 'smooth',
                            });
                          } catch {
                            // no-op for non-supporting test environments
                          }
                        }
                      }
                      return next;
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-50/90 hover:bg-blue-100/90 active:bg-blue-100 border border-blue-200/70 text-[#0062FF] font-black text-[12.5px] xs:text-[13px] flex items-center justify-center gap-2 shadow-2xs transition-all duration-200 cursor-pointer"
                >
                  <span>{mobileShowAllCertificates ? 'Show Less Certifications' : 'View All Certifications'}</span>
                  <span>{mobileShowAllCertificates ? '↑' : '→'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </main>

      {/* Workspace Image Preview Modal */}
      <Modal
        isOpen={showWorkspaceModal}
        onClose={() => setShowWorkspaceModal(false)}
        title="Workspace & Developer Setup"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-3">
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center p-1">
            <img
              src={profile?.about_image || profile?.workspaceImg || assetUrl('about-illustration.png')}
              alt="Full Workspace Setup"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
          <p className="text-center text-xs text-slate-500 font-medium">
            Full Stack Developer • Scalable, Secure &amp; Efficient Web Applications
          </p>
        </div>
      </Modal>

      {/* Certificate Preview Modal with Rounded Zoom In/Out Controller */}
      <CertificatePreviewModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />


      {/* ─── 100% TRUE FULL SCREEN PROJECT DETAILS VIEW ─── */}
      {selectedProject && (() => {
        const isTripGen =
          selectedProject.id === 'travel-planner' ||
          selectedProject.id === 2 ||
          String(selectedProject.slug || '').includes('travel') ||
          String(selectedProject.title || '').toLowerCase().includes('tripgen') ||
          String(selectedProject.title || '').toLowerCase().includes('travel plan');

        const isTBCMS =
          selectedProject.id === 'portfolio-cms' ||
          selectedProject.id === 1 ||
          String(selectedProject.slug || '').includes('cms') ||
          String(selectedProject.title || '').toLowerCase().includes('tbcms') ||
          String(selectedProject.title || '').toLowerCase().includes('portfolio cms');

        const isEnglishMaster =
          selectedProject.id === 'english-master' ||
          selectedProject.id === 'english-master-pro' ||
          String(selectedProject.title || '').toLowerCase().includes('english');

        const isIDS =
          selectedProject.id === 'intrusion-detection' ||
          selectedProject.id === 4 ||
          String(selectedProject.slug || '').includes('intrusion') ||
          String(selectedProject.title || '').toLowerCase().includes('intrusion');

        // ─── DEDICATED CLEAN RECRUITER-FRIENDLY REDESIGN FOR TRIPGEN ───
        if (isTripGen) {
          const matchModuleSearch = (mod) => {
            if (!tripgenSearch.trim()) return true;
            const q = tripgenSearch.toLowerCase();
            return (
              mod.title.toLowerCase().includes(q) ||
              mod.desc.toLowerCase().includes(q) ||
              mod.template.toLowerCase().includes(q) ||
              mod.handler.toLowerCase().includes(q) ||
              mod.role.toLowerCase().includes(q) ||
              String(mod.num).includes(q)
            );
          };

          const filteredTripgenModules = TRIPGEN_MODULES.filter((mod) => {
            const matchesRole = tripgenShowcaseRole === 'all' || mod.roleKey === tripgenShowcaseRole;
            return matchesRole && matchModuleSearch(mod);
          });

          return (
            <div className="fixed inset-0 z-50 w-full h-full bg-white flex flex-col overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] animate-fadeIn">

              {/* Fixed Corner Circular Close Button (Matching Project Theme) */}
              <button
                type="button"
                onClick={closeProject}
                className="fixed top-3 right-3 sm:top-6 sm:right-8 z-50 w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full border-2 bg-white/95 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7]"
                title="Close (Esc)"
                aria-label="Close project view"
              >
                <i className="fa-solid fa-xmark text-base sm:text-xl font-bold"></i>
              </button>

              {/* Scrollable Container with TripGen Pink → Purple → Dark Navy Gradient Scrollbar */}
              <div ref={tripgenModalScrollRef} className="flex-1 w-full overflow-y-auto overscroll-contain bg-white custom-slim-scrollbar tripgen-scrollbar">

                {/* ─── 1. TRIPGEN CINEMATIC HERO HEADER (MATCHING IMAGE 2 "TIME TO TRAVEL" DESIGN) ─── */}
                <TripGenHeader selectedProject={selectedProject} />

                {/* ─── MAIN CONTENT BODY ─── */}
                <div className="max-w-7xl mx-auto px-1 xs:px-1.5 sm:px-8 pt-4 xs:pt-5 sm:pt-6 pb-8 sm:pb-14 space-y-5 xs:space-y-6 sm:space-y-10 relative z-10">

                  {/* ─── 2. PROJECT OVERVIEW (AUTO-ANIMATED CHEVRON PILLARS) ─── */}
                  <TripGenProjectOverview />

                  {/* ─── 3. SYSTEM WORKFLOW & ARCHITECTURE (EXACT MATCH TO 2ND INFOGRAPHIC) ─── */}
                  <TripGenWorkflowArchitecture />

                  {/* ─── 4. KEY FEATURES (AUTO-ANIMATED 10 FEATURES TIMELINE) ─── */}
                  <TripGenKeyFeatures />

                  {/* ─── 4. COMPLETE APPLICATION MODULES (ALL 36 MODULES ACROSS 4 ROLES) ─── */}
                  <section className="space-y-3.5 sm:space-y-4 tripgen-reveal-section">
                    {(() => {
                      const TRIPGEN_ROLE_GROUPS = [
                        {
                          key: 'public',
                          tabLabel: 'Home',
                          fullName: 'Home / Public Guest Modules',
                          subheading: 'Public Guest & Travel Itinerary Discovery Portal',
                          desc: 'Explore curated regional vacation destinations, check real-time package tariffs, browse day-wise tour schedules, and access the public FAQ helpdesk without authentication.',
                          badge: 'Guest / Public Access',
                          badgeClass: 'bg-sky-50 text-sky-700 border-sky-300',
                          icon: 'fa-house',
                          iconColor: 'text-[#0284C7]',
                          countBadge: '2 Modules',
                          rangeText: '#01 - #02',
                          colorClasses: {
                            activeBtn: 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/25',
                            headerBorder: 'border-sky-200',
                            headerBg: 'bg-sky-50/70',
                            iconBox: 'bg-sky-50 text-sky-600 border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white',
                            codeColor: 'bg-blue-50 text-blue-700 group-hover:bg-blue-100'
                          }
                        },
                        {
                          key: 'admin',
                          tabLabel: 'Admin',
                          fullName: 'Admin Superuser Modules',
                          subheading: 'Executive Administration & Staff Governance Command Center',
                          desc: 'Superuser management console providing centralized staff onboarding, verified employee credential provisioning, active staff directory tracking, and security session audit logs.',
                          badge: 'Superuser Portal (7 Modules)',
                          badgeClass: 'bg-purple-50 text-purple-700 border-purple-300',
                          icon: 'fa-shield-halved',
                          iconColor: 'text-purple-600',
                          countBadge: 'Admin Module 7',
                          rangeText: '#03 - #09',
                          colorClasses: {
                            activeBtn: 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/25',
                            headerBorder: 'border-purple-200',
                            headerBg: 'bg-purple-50/70',
                            iconBox: 'bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white',
                            codeColor: 'bg-purple-50 text-purple-700 group-hover:bg-purple-100'
                          }
                        },
                        {
                          key: 'employee',
                          tabLabel: 'Employee',
                          fullName: 'Employee Operations Modules',
                          subheading: 'Operational Workflow, Itinerary Builder & Inventory Console',
                          desc: 'Operational management suite for staff members to create, modify, and maintain tour itineraries, partner hotel room inventories, multi-modal transportation schedules, and customer feedback reviews.',
                          badge: 'Operations Console (11 Modules)',
                          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-300',
                          icon: 'fa-user-gear',
                          iconColor: 'text-emerald-600',
                          countBadge: 'Employee 11',
                          rangeText: '#10 - #20',
                          colorClasses: {
                            activeBtn: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25',
                            headerBorder: 'border-emerald-200',
                            headerBg: 'bg-emerald-50/70',
                            iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
                            codeColor: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
                          }
                        },
                        {
                          key: 'traveler',
                          tabLabel: 'User',
                          fullName: 'User / Traveler Modules',
                          subheading: 'Traveler Self-Service Booking & Reservation Management Workspace',
                          desc: 'Self-service traveler portal enabling registered users to search itineraries, reserve hotel accommodations, book transit tickets with automated fare calculation, and manage reservations.',
                          badge: 'Traveler Workspace (12 Modules)',
                          badgeClass: 'bg-amber-50 text-amber-700 border-amber-300',
                          icon: 'fa-user',
                          iconColor: 'text-amber-500',
                          countBadge: 'Traveler Module 12',
                          rangeText: '#21 - #32',
                          colorClasses: {
                            activeBtn: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25',
                            headerBorder: 'border-amber-200',
                            headerBg: 'bg-amber-50/70',
                            iconBox: 'bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white',
                            codeColor: 'bg-amber-50 text-amber-700 group-hover:bg-amber-100'
                          }
                        }
                      ];

                      const MODULE_DESCRIPTIONS = {
                        1: 'Interactive destination search portal with traveler counter, regional showcases (Vizag, Bangalore, Hyderabad, Goa), and verified brand contact information.',
                        2: 'Real-time FAQ and traveler support center detailing booking guidelines, payment gateways, cancellation policies, and helpdesk contact channels.',
                        3: 'Administrative portal sign-in gateway with security credential authentication.',
                        4: 'Superuser authentication verification and session token initialization.',
                        5: 'Centralized administrative executive dashboard and system management console.',
                        6: 'Staff onboarding form to register new employees with username, contact, and email.',
                        7: 'Staff portal sign-in interface for authenticated employee workspace access.',
                        8: 'Active staff directory table displaying registered employee records, contact details, and account status.',
                        9: 'Date-filtered security audit table tracking employee login timestamps and session activity.',
                        10: 'Staff login gateway to access the employee management workspace.',
                        11: 'Staff credential verification and secure session initialization.',
                        12: 'Operational command center for managing tours, transport, hotels, and customer bookings.',
                        13: 'Tour package creation form with destination, duration, pricing, and day-wise details.',
                        14: 'Master catalog of all registered vacation packages with pricing, durations, and details.',
                        15: 'Transit schedule manager for flights, buses, and trains with route and timing details.',
                        16: 'Multi-modal transit route directory showing vehicle types, schedules, origins, and fares.',
                        17: 'Hotel accommodation registration form with destination cities and room tariffs.',
                        18: 'Partner hotel directory table displaying active lodging partners and amenities.',
                        19: 'Real-time reservation tracking console for passenger bookings and ticket statuses.',
                        20: 'Customer feedback inspection with rating telemetry and service quality review.',
                        21: 'Traveler user registration form with username, contact, and profile details.',
                        22: 'Traveler sign-in gateway with authentication credential verification.',
                        23: 'Traveler session initialization and personalized workspace login.',
                        24: 'Live tour itinerary search engine filtering destinations, travel dates, and passenger counts.',
                        25: 'Automated itinerary booking checkout calculating total tariffs based on traveler headcount.',
                        26: 'Multi-modal transit search filtering flights, trains, and buses by route and departure.',
                        27: 'Transit seat booking and ticket reservation confirmation system.',
                        28: 'Hotel room search engine filtering regional lodging by city, check-in dates, and guests.',
                        29: 'Hotel reservation confirmation interface with stay dates and guest vouchers.',
                        30: 'Personal reservation management dashboard with self-service cancellation actions.',
                        31: 'Customer feedback submission form with star ratings and travel review comments.',
                        32: 'Public customer feedback review showcase displaying verified traveler ratings.'
                      };

                      const effectiveRoleKey = (tripgenShowcaseRole && tripgenShowcaseRole !== 'all') ? tripgenShowcaseRole : 'public';
                      const activeRoleGroup = TRIPGEN_ROLE_GROUPS.find((g) => g.key === effectiveRoleKey);
                      const activeRoleModules = TRIPGEN_MODULES.filter((m) => m.roleKey === effectiveRoleKey);

                      const currentIdx = Math.max(0, Math.min(tripgenSlideIndex, Math.max(0, activeRoleModules.length - 1)));
                      const activeMod = activeRoleModules[currentIdx] || activeRoleModules[0];
                      const activeModImage = activeMod
                        ? (TRIPGEN_MODULE_IMAGES[activeMod.num] || {
                          image: '/tripgen-banner-smooth.jpg',
                          thumb: '/tripgen-banner-smooth.jpg'
                        })
                        : null;

                      const handlePrev = (e) => {
                        if (e) e.stopPropagation();
                        setTripgenSlideIndex((prev) => (prev > 0 ? prev - 1 : activeRoleModules.length - 1));
                      };

                      const handleNext = (e) => {
                        if (e) e.stopPropagation();
                        setTripgenSlideIndex((prev) => (prev < activeRoleModules.length - 1 ? prev + 1 : 0));
                      };

                      return (
                        <div className="space-y-3 sm:space-y-4">
                          {/* ─── ONE LEVEL HEADER: TITLE (LEFT) + ROLE BUTTONS (MIDDLE CENTER) ─── */}
                          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-3 min-h-[44px]">
                            <h2 className="text-lg sm:text-xl lg:text-[22px] font-extrabold text-slate-900 tracking-tight shrink-0">
                              Complete Application Modules
                            </h2>

                            {/* 1. Serial Role Switcher Buttons: Balanced middle placement with comfortable gap after title */}
                            <div className="flex md:absolute md:left-[54%] md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 items-center justify-center gap-1.5 sm:gap-2 flex-wrap z-10">
                              {TRIPGEN_ROLE_GROUPS.map((group) => {
                                const isSelected = tripgenShowcaseRole === group.key;

                                return (
                                  <button
                                    key={group.key}
                                    type="button"
                                    onClick={() => {
                                      setTripgenShowcaseRole(group.key);
                                      setTripgenRoleTab(group.key);
                                      setTripgenSlideIndex(0);
                                    }}
                                    className={`px-3 sm:px-3.5 py-1.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 border active:scale-95 ${isSelected
                                      ? group.colorClasses.activeBtn
                                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                                      }`}
                                  >
                                    <i className={`fa-solid ${group.icon} text-xs transition-colors ${isSelected ? 'text-white' : group.iconColor}`}></i>
                                    <span>{group.tabLabel}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* ─── SCREEN IMAGE DISPLAY (HIGH CLARITY & CURSOR NAVIGATION) ─── */}
                          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xs space-y-2 tripgen-stagger-card">

                            {/* Main Screen Image Container (No Shadows, Clean High Clarity) */}
                            <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">

                              <div className="relative w-full bg-slate-950 flex items-center justify-center min-h-[260px] sm:min-h-[380px] select-none">
                                <img
                                  key={`slide-img-${activeMod?.num}`}
                                  src={activeModImage?.image}
                                  alt={activeMod?.title || 'TripGen Screenshot'}
                                  className="w-full h-auto max-h-[540px] object-contain rounded-xl animate-fadeIn select-none"
                                  loading="eager"
                                />

                                {/* Transparent Left Click Zone (Click goes to Previous Screenshot - Zero Shadow) */}
                                <div
                                  onClick={handlePrev}
                                  className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10"
                                  title="Previous Image"
                                />

                                {/* Transparent Right Click Zone (Click goes to Next Screenshot - Zero Shadow) */}
                                <div
                                  onClick={handleNext}
                                  className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10"
                                  title="Next Image"
                                />
                              </div>
                            </div>


                            {/* ─── 2. PAGINATION CONTROLS (LEFT PREVIOUS, MIDDLE NUMBERS, RIGHT NEXT - MATCHING IMAGE 2) ─── */}
                            <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-0.5 sm:px-1 select-none gap-0.5 xs:gap-1 sm:gap-2">
                              {/* Left: Previous */}
                              <button
                                type="button"
                                onClick={handlePrev}
                                className="flex items-center gap-0.5 sm:gap-1.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1 px-1 xs:px-1.5 sm:py-1.5 sm:px-2.5 rounded-lg hover:bg-slate-100 active:scale-95 shrink-0"
                              >
                                <i className="fa-solid fa-chevron-left text-[8px] sm:text-[10px]"></i>
                                <span>Previous</span>
                              </button>

                              {/* Middle: Numbers in Single Row (Matching Image 2 on All Tabs: Home, Admin, Employee, User) */}
                              <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 flex-nowrap justify-center py-0.5 shrink">
                                {activeRoleModules.map((mod, idx) => {
                                  const isActive = idx === currentIdx;
                                  return (
                                    <button
                                      key={mod.num}
                                      type="button"
                                      onClick={() => setTripgenSlideIndex(idx)}
                                      className={`w-[13.5px] h-[13.5px] xs:w-[15px] xs:h-[15px] sm:w-7 sm:h-7 rounded-xs xs:rounded-sm sm:rounded-md text-[8px] xs:text-[8.5px] sm:text-xs font-bold transition-all duration-150 flex items-center justify-center shrink-0 cursor-pointer ${isActive
                                        ? `${activeRoleGroup?.colorClasses?.activeBtn || 'bg-blue-600 text-white'} shadow-xs`
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-medium'
                                        }`}
                                    >
                                      {idx + 1}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Right: Next */}
                              <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-0.5 sm:gap-1.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1 px-1 xs:px-1.5 sm:py-1.5 sm:px-2.5 rounded-lg hover:bg-slate-100 active:scale-95 shrink-0"
                              >
                                <span>Next</span>
                                <i className="fa-solid fa-chevron-right text-[8px] sm:text-[10px]"></i>
                              </button>
                            </div>

                            {/* ─── 3. SUBHEADING & CONTENT (SAME POSITION AS 1ST IMAGE) ─── */}
                            <div key={`content-${activeMod.num}`} className="w-full max-w-4xl mx-auto space-y-0.5 pt-0 animate-fadeIn">
                              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                                {activeRoleGroup?.subheading}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                {MODULE_DESCRIPTIONS[activeMod.num] || activeMod.desc || activeRoleGroup?.desc}
                              </p>
                            </div>

                          </div>
                        </div>
                      );
                    })()}
                  </section>

                  {/* ─── 4. MY CONTRIBUTIONS (INFOGRAPHIC PINWHEEL & 2-COLUMN CARDS) ─── */}
                  <TripGenContributions />

                  {/* ─── 5. TESTING & VALIDATION ─── */}
                  <TripGenTestingValidation />

                  {/* ─── 7. DETAILED UNIT & INTEGRATION VERIFICATION LOG ─── */}
                  <TripGenVerificationLog items={TRIPGEN_VERIFICATION_LOG_ITEMS} />

                  {/* ─── 8. ACADEMIC PROJECT PRESENTATION SCREENSHOTS (TOTAL SCREEN CAROUSEL) ─── */}
                  <section className="space-y-4 tripgen-reveal-section">

                    {/* Section Header: Title */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        Academic Project Presentation Screenshots
                      </h2>
                    </div>

                    {/* Interactive Carousel: Left Side Image & Right Side Content Text (Automatic 4s rotation) */}
                    <div
                      className="grid grid-cols-12 lg:grid-cols-12 gap-2 xs:gap-2.5 sm:gap-6 items-stretch"
                      onMouseEnter={() => setIsAcademicSlidePaused(true)}
                      onMouseLeave={() => setIsAcademicSlidePaused(false)}
                    >

                      {/* ─── LEFT SIDE: SCREENSHOT IMAGE ─── */}
                      <div className="col-span-7 xl:col-span-8 flex flex-col justify-between space-y-1.5 xs:space-y-2 sm:space-y-3">
                        {/* Smooth Horizontal Scrolling Carousel Frame - In Same Position (No Zoom Popup) */}
                        <div
                          onClick={() => {
                            setAcademicSlideIndex((prev) => (prev + 1) % ACADEMIC_PRESENTATION_SLIDES.length);
                          }}
                          className="w-full h-[160px] xs:h-[185px] sm:h-[340px] md:h-[400px] lg:h-[430px] rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl border border-slate-200/90 overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400 group relative bg-slate-100"
                        >
                          {/* Smooth Horizontally Scrolled Carousel Track (Slow Graceful Transition in Same Position) */}
                          <div
                            className="flex w-full h-full transition-transform duration-1000 ease-in-out will-change-transform"
                            style={{ transform: `translateX(-${academicSlideIndex * 100}%)` }}
                          >
                            {ACADEMIC_PRESENTATION_SLIDES.map((slide, idx) => (
                              <div
                                key={slide.id}
                                className="w-full shrink-0 h-full overflow-hidden"
                              >
                                <img
                                  src={slide.image}
                                  alt={slide.title}
                                  className="w-full h-full object-cover object-center select-none block"
                                  loading={idx === 0 ? 'eager' : 'lazy'}
                                  style={{ imageRendering: 'high-quality' }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Pagination Dots */}
                        <div className="flex items-center justify-center gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                          {ACADEMIC_PRESENTATION_SLIDES.map((slide, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={() => setAcademicSlideIndex(dotIdx)}
                              className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer ${dotIdx === academicSlideIndex
                                ? 'w-4 xs:w-5 sm:w-8 bg-[#0062FF] shadow-xs'
                                : 'w-1.5 sm:w-2.5 bg-slate-200 hover:bg-slate-300'
                                }`}
                              title={slide.title}
                              aria-label={`Go to slide ${dotIdx + 1}: ${slide.title}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* ─── RIGHT SIDE: CONTENT TEXT (EXACTLY LEVEL WITH IMAGE HEIGHT) ─── */}
                      <div className="col-span-5 xl:col-span-4 h-[160px] xs:h-[185px] sm:h-[340px] md:h-[400px] lg:h-[430px] self-start flex flex-col justify-center bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs sm:shadow-sm p-2 xs:p-2.5 sm:p-8 space-y-1.5 xs:space-y-2 sm:space-y-4 overflow-hidden">
                        <div key={`title-${academicSlideIndex}`} className="space-y-0.5 xs:space-y-1 sm:space-y-2 animate-academic-slide">
                          <h3 className="text-[8.5px] xs:text-[10px] sm:text-2xl font-black text-slate-900 tracking-tight leading-tight sm:leading-snug">
                            {ACADEMIC_PRESENTATION_SLIDES[academicSlideIndex].title}
                          </h3>
                          <p className="text-[6.5px] xs:text-[7.5px] sm:text-sm text-slate-500 font-medium leading-tight sm:leading-relaxed">
                            {ACADEMIC_PRESENTATION_SLIDES[academicSlideIndex].subtitle}
                          </p>
                        </div>

                        <div
                          key={`desc-${academicSlideIndex}`}
                          className="text-[6px] xs:text-[7px] sm:text-sm text-slate-600 font-normal leading-tight sm:leading-relaxed pt-1 xs:pt-1.5 sm:pt-3 border-t border-slate-100 animate-academic-slide"
                        >
                          {(() => {
                            const descText = ACADEMIC_PRESENTATION_SLIDES[academicSlideIndex].desc;
                            if (descText.includes('Under the Supervision of:')) {
                              const [mainDesc, ...rest] = descText.split('Under the Supervision of:');
                              const supervisionContent = rest.join('Under the Supervision of:').trim();
                              return (
                                <div className="space-y-1 xs:space-y-1.5 sm:space-y-3">
                                  <p className="whitespace-pre-line text-slate-600 font-normal leading-tight">{mainDesc.trim()}</p>
                                  <div className="font-bold text-slate-900 space-y-0.5 leading-tight">
                                    <p className="font-bold text-slate-900">Under the Supervision of:</p>
                                    <p className="font-bold text-slate-900 whitespace-pre-line">{supervisionContent}</p>
                                  </div>
                                </div>
                              );
                            }
                            return <p className="whitespace-pre-line text-slate-600 font-normal leading-tight">{descText}</p>;
                          })()}
                        </div>
                      </div>

                    </div>

                  </section>

                  {/* ─── 9. SECURITY & IMPLEMENTATION NOTES (MATCHING DETAILED LOG HEADING SIZE & EXACT IMAGE 2) ─── */}
                  <TripGenSecurityNotes />
                </div>

                {/* ─── 10. BOTTOM LINKS & CLOSE ACTION (REDUCED MARGIN GAP) ─── */}
                <footer className="w-full tripgen-cinematic-footer py-7 sm:py-9 relative overflow-hidden shadow-2xl border-t border-white/20 mt-6 sm:mt-8">
                  <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col items-center justify-center text-center gap-3.5 sm:gap-4">

                    {/* TripGen Footer Branding (Middle Center) */}
                    <div className="flex flex-col items-center justify-center text-center select-none">
                      <div className="inline-flex items-center justify-center leading-none">
                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-['Outfit',sans-serif] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">Trip</span><span className="text-2xl sm:text-3xl font-black tracking-tight text-[#F82C32] font-['Outfit',sans-serif] drop-shadow-[0_2px_10px_rgba(248,44,50,0.5)]">Gen</span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white/95 tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] pt-1">
                        (Travel Plan Itinerary Generator)
                      </span>
                    </div>

                    {/* Action Buttons: GitHub (Middle Center) */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {selectedProject.repoUrl && (
                        <a
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 bg-slate-950/85 hover:bg-slate-950 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-md hover:scale-105 border border-white/20 backdrop-blur-xs"
                        >
                          <i className="fa-brands fa-github text-base"></i> View on GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </footer>
              </div>

              {/* ─── FULL HD LIGHTBOX ZOOM MODAL ─── */}
              {tripgenLightboxImage && (
                <div
                  className="fixed inset-0 z-[100] bg-slate-950/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fadeIn"
                  onClick={closeLightbox}
                >
                  {tripgenLightboxCustomList ? (
                    /* ─── CLEAN FULL-HD PRESENTATION SCREENSHOT (NO TOP BAR, NO SIDE BUTTONS, NO BOTTOM BAR) ─── */
                    <div
                      className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-hidden"
                      onClick={closeLightbox}
                    >
                      {/* Floating Top-Right Close Button */}
                      <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-xs"
                        title="Close (Esc)"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-xmark text-xl"></i>
                      </button>

                      {/* Pure High-Definition Screenshot */}
                      <img
                        src={tripgenLightboxImage.full}
                        alt={tripgenLightboxImage.title}
                        className="max-h-[90vh] max-w-[95vw] w-auto object-contain rounded-xl shadow-2xl select-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ) : (
                    /* ─── STANDARD GALLERY LIGHTBOX WITH FULL CONTROLS ─── */
                    <>
                      {/* Lightbox Header */}
                      <div
                        className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white shadow-sm">
                            {tripgenLightboxImage.id ? `#${tripgenLightboxImage.id}` : 'HD'}
                          </span>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                              {tripgenLightboxImage.title}
                            </h3>
                            <span className="text-[11px] text-white/70">
                              {tripgenLightboxImage.categoryLabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                          <a
                            href={tripgenLightboxImage.full}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                            title="Open original image file in new tab"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                            <span className="hidden sm:inline">Original PNG</span>
                          </a>

                          <button
                            type="button"
                            onClick={closeLightbox}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                            title="Close Lightbox (Esc)"
                            aria-label="Close Lightbox"
                          >
                            <i className="fa-solid fa-xmark text-lg"></i>
                          </button>
                        </div>
                      </div>

                      {/* Center Image with Prev / Next */}
                      <div
                        className="flex-1 relative flex items-center justify-center py-2 sm:py-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Prev Button */}
                        <button
                          type="button"
                          onClick={prevLightbox}
                          className="absolute left-2 sm:left-4 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-blue-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-xs hover:scale-110"
                          title="Previous Screenshot (Left Arrow)"
                          aria-label="Previous Screenshot"
                        >
                          <i className="fa-solid fa-chevron-left text-lg"></i>
                        </button>

                        {/* Main Image */}
                        <div className="max-w-6xl max-h-[75vh] flex items-center justify-center p-1 bg-slate-900/50 rounded-2xl border border-white/10 shadow-2xl">
                          <img
                            src={tripgenLightboxImage.full}
                            alt={tripgenLightboxImage.title}
                            className="max-h-[72vh] max-w-full w-auto object-contain rounded-xl"
                          />
                        </div>

                        {/* Next Button */}
                        <button
                          type="button"
                          onClick={nextLightbox}
                          className="absolute right-2 sm:right-4 z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-blue-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-xs hover:scale-110"
                          title="Next Screenshot (Right Arrow)"
                          aria-label="Next Screenshot"
                        >
                          <i className="fa-solid fa-chevron-right text-lg"></i>
                        </button>
                      </div>

                      {/* Bottom Bar Description & Navigation Hints */}
                      <div
                        className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white/80"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-xs sm:text-sm font-normal max-w-2xl line-clamp-2">
                          {tripgenLightboxImage.desc}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-white/60 self-end sm:self-auto shrink-0">
                          <span className="hidden sm:inline">Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">→</kbd> keys to navigate</span>
                          <span className="px-2.5 py-1 bg-white/10 rounded-full font-bold text-white text-[11px]">
                            {tripgenLightboxImage.id ? `Screenshot #${tripgenLightboxImage.id} of 55` : 'Live Preview'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        }

        const closeBtnClass = isTripGen
          ? 'border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7]'
          : isTBCMS
            ? 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1]'
            : isEnglishMaster
              ? 'border-[#FF762E] text-[#FF762E] hover:bg-[#FF762E] hover:text-white hover:border-[#FF762E]'
              : isIDS
                ? 'border-[#0070F3] text-[#0070F3] hover:bg-[#0070F3] hover:text-white hover:border-[#0070F3]'
                : 'border-slate-400 text-slate-600 hover:bg-slate-700 hover:text-white hover:border-slate-700';

        const headerBgClass = isTripGen
          ? 'bg-gradient-to-b from-[#FCD2D8] via-[#FCD2D8] via-[82%] to-white'
          : isTBCMS
            ? 'bg-gradient-to-b from-indigo-100/90 via-purple-100/60 to-white'
            : isEnglishMaster
              ? 'bg-gradient-to-b from-sky-100/90 via-blue-100/60 to-white'
              : isIDS
                ? ''
                : 'bg-gradient-to-b from-slate-100 via-slate-50 to-white';

        return (
          <div className={`fixed inset-0 z-50 w-full h-full ${isTripGen ? 'bg-gradient-to-b from-[#FCD2D8] via-[#FDDCE0] to-white' : 'bg-white'
            } flex flex-col overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] animate-fadeIn`}>

            {/* ─── FIXED CORNER CIRCULAR CLOSE BUTTON (MATCHING THEME COLOR) ─── */}
            <button
              type="button"
              onClick={closeProject}
              className={`fixed top-3 right-3 sm:top-6 sm:right-8 z-50 w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full border-2 bg-white/95 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer ${closeBtnClass}`}
              title="Close (Esc)"
              aria-label="Close project view"
            >
              <i className="fa-solid fa-xmark text-base sm:text-xl font-bold"></i>
            </button>

            {/* ─── FULL SCREEN SCROLLABLE CONTENT BODY (TOTAL SCROLLED) ─── */}
            <div
              ref={isIDS ? idsModalScrollRef : undefined}
              className={`flex-1 w-full overflow-y-auto overscroll-contain custom-slim-scrollbar ${
                isEnglishMaster
                  ? 'english-master-scrollbar bg-white'
                  : isTripGen
                  ? 'bg-gradient-to-b from-[#FCD2D8] via-[#FDDCE0] to-white tripgen-scrollbar'
                  : isIDS
                  ? 'ids-scrollbar bg-white'
                  : 'bg-white'
              }`}
            >

              {/* 1 & 2. TOP HEADER SECTION */}
              {isEnglishMaster ? (
                <EnglishMasterHeader selectedProject={selectedProject} />
              ) : isTripGen ? (
                <TripGenHeader selectedProject={selectedProject} />
              ) : isIDS ? (
                <IdsHeader selectedProject={selectedProject} />
              ) : (
                <div
                  className={`w-full ${headerBgClass} pt-8 xs:pt-10 sm:pt-16 pb-5 xs:pb-6 sm:pb-10 transition-colors`}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 space-y-4 sm:space-y-7">
                      {/* IN MIDDLE: HEADING (INCREASED SIZE & EXACT LOGO COLORS) */}
                      <div className="text-center max-w-5xl mx-auto px-4">
                        <h1 className="leading-tight tracking-tight">
                          {isTripGen ? (
                            <>
                              <span className="block text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-none mb-1.5 sm:mb-2">
                                <span className="text-[#062F64]">Trip</span>
                                <span className="text-[#F73836]">Gen</span>
                              </span>
                              <span className="block text-sm xs:text-base sm:text-xl lg:text-[22px] font-bold text-slate-700">
                                (Travel Plan Itinerary Generator)
                              </span>
                            </>
                          ) : selectedProject.title.includes('(') ? (
                            <>
                              <span className="block text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-none mb-1.5 sm:mb-2">
                                {selectedProject.title.split('(')[0].trim()}
                              </span>
                              <span className="block text-sm xs:text-base sm:text-xl lg:text-[22px] font-bold text-slate-700">
                                ({selectedProject.title.split('(')[1]}
                              </span>
                            </>
                          ) : (
                            <span className="block text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-none">
                              {selectedProject.title}
                            </span>
                          )}
                        </h1>
                      </div>

                      {/* PROJECT SUMMARY / DESCRIPTION */}
                      {(selectedProject.longDesc || selectedProject.desc) && (
                        <div className="max-w-4xl mx-auto text-center px-4">
                          <p className="text-[11px] xs:text-xs sm:text-sm md:text-[15px] text-slate-800 leading-relaxed font-medium text-center">
                            {selectedProject.longDesc || selectedProject.desc}
                          </p>
                        </div>
                      )}

                      {/* ─── JUST MIDDLE DIVIDER (NOT FULL SCREEN WIDTH) ─── */}
                      <div className="max-w-7xl mx-auto pt-1 sm:pt-2">
                        <div className={`w-full h-[1.5px] rounded-full ${isTripGen ? 'bg-[#E57A88]' : isTBCMS ? 'bg-indigo-200' : 'bg-slate-200'}`}></div>
                      </div>
                    </div>
                </div>
              )}

              {/* 3. LOWER CONTENT BODY (BELOW THE DIVIDER - CLEAN WHITE BACKGROUND - WIDE 7XL MARGIN) */}
              <div className={`max-w-7xl mx-auto px-1 xs:px-1.5 sm:px-8 lg:px-10 ${isEnglishMaster ? 'pt-4 xs:pt-5 sm:pt-8 pb-2 sm:pb-3' : 'pt-6 xs:pt-7 sm:pt-12 pb-10 sm:pb-16'} space-y-6 sm:space-y-10`}>


                {/* MEDIA SHOWCASE: DEDICATED PROJECT VIDEO OR IMAGE (FOR NON-ENGLISH-MASTER & NON-IDS PROJECTS) */}
                {!isEnglishMaster && !isIDS && (
                  <div className={`w-full rounded-2xl overflow-hidden border ${isTripGen
                    ? 'border-rose-200/90 bg-gradient-to-b from-[#FCD2D8] via-[#FDDCE0] to-white'
                    : isIDS
                      ? 'border-cyan-200/90 bg-slate-950 p-2 sm:p-4'
                      : 'border-slate-200/90 bg-slate-50'
                    } shadow-md flex items-center justify-center ${selectedProject.video ? 'bg-slate-950 p-1 sm:p-2' : isIDS ? '' : 'p-3 sm:p-6 lg:p-8'}`}>
                    {selectedProject.video ? (
                      <video
                        key={selectedProject.video}
                        src={selectedProject.video}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full max-h-[520px] sm:max-h-[600px] lg:max-h-[680px] rounded-xl object-contain bg-black"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        key={selectedProject.id || selectedProject.title}
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full max-h-[500px] sm:max-h-[600px] lg:max-h-[680px] object-contain rounded-xl animate-illustration-entrance transition-transform duration-500 hover:scale-[1.01]"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/project-travel-planner.png';
                        }}
                      />
                    )}
                  </div>
                )}

                {/* ENGLISH MASTER PRO: METRIC / ASPECT & DETAILS TABLE (FIRST PLACE) */}
                {isEnglishMaster && (
                  <EnglishMasterAspectsTable />
                )}

                {/* PROJECT OVERVIEW: CURVED WORKFLOW ARCHITECTURE (IMAGE 2 ANIMATION) FOR ENGLISH MASTER */}
                {isEnglishMaster ? (
                  <section className="space-y-3 sm:space-y-3.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Project Overview
                    </h2>
                    <EnglishMasterCurvedOverview selectedProject={selectedProject} />
                  </section>
                ) : isIDS ? (
                  <IdsProjectOverview />
                ) : (
                  (selectedProject.problemStatement || selectedProject.solution || selectedProject.objective || selectedProject.objectives) && (
                    <section className="space-y-3 sm:space-y-3.5">
                      <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        Project Overview
                      </h2>

                      {/* 3 Pillars in a Single Row (Side-by-Side on All Viewports) */}
                      <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-5">
                        {/* Card 01: Problem Statement */}
                        {selectedProject.problemStatement && (
                          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden p-1.5 xs:p-2 sm:px-6 sm:py-5 transition-all duration-300 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-rose-300 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-3">
                                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-11 sm:h-11 rounded-md sm:rounded-xl flex items-center justify-center shadow-xs bg-rose-50 text-rose-600 border border-rose-200/80 shrink-0">
                                  <i className="fa-solid fa-triangle-exclamation text-[9px] xs:text-[10px] sm:text-base"></i>
                                </div>
                                <h3 className="text-[7.5px] xs:text-[9px] sm:text-lg font-black text-slate-900 tracking-tight truncate">
                                  The Problem
                                </h3>
                              </div>
                              <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-slate-600 leading-tight xs:leading-snug sm:leading-relaxed font-normal">
                                {selectedProject.problemStatement}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Card 02: Objective (for other projects) */}
                        {selectedProject.objective && (
                          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden p-1.5 xs:p-2 sm:px-6 sm:py-5 transition-all duration-300 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-3">
                                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-11 sm:h-11 rounded-md sm:rounded-xl flex items-center justify-center shadow-xs bg-blue-50 text-blue-600 border border-blue-200/80 shrink-0">
                                  <i className="fa-solid fa-bullseye text-[9px] xs:text-[10px] sm:text-base"></i>
                                </div>
                                <h3 className="text-[7.5px] xs:text-[9px] sm:text-lg font-black text-slate-900 tracking-tight truncate">
                                  The Objective
                                </h3>
                              </div>
                              <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-slate-600 leading-tight xs:leading-snug sm:leading-relaxed font-normal">
                                {selectedProject.objective}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Card 03: Proposed Solution */}
                        {selectedProject.solution && (
                          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden p-1.5 xs:p-2 sm:px-6 sm:py-5 transition-all duration-300 border border-emerald-400/90 shadow-xs hover:shadow-md hover:border-emerald-500 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-3">
                                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-11 sm:h-11 rounded-md sm:rounded-xl flex items-center justify-center shadow-xs bg-emerald-50 text-emerald-600 border border-emerald-200/80 shrink-0">
                                  <i className="fa-solid fa-lightbulb text-[9px] xs:text-[10px] sm:text-base"></i>
                                </div>
                                <h3 className="text-[7.5px] xs:text-[9px] sm:text-lg font-black text-slate-900 tracking-tight truncate">
                                  The Solution
                                </h3>
                              </div>
                              <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-slate-600 leading-tight xs:leading-snug sm:leading-relaxed font-normal">
                                {selectedProject.solution}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  )
                )}

                {/* 4 CORE LEARNING PILLARS (NATIVE 3D SPHERE CARDS - ENGLISH MASTER PRO) */}
                {isEnglishMaster && (
                  <EnglishMasterFeaturePillars />
                )}

                {/* SYSTEM ARCHITECTURE & PREDICTION WORKFLOW */}
                {(selectedProject.trainingPipeline || (selectedProject.workflow && selectedProject.workflow.length > 0)) && (
                  <div id="ids-features-section" className="space-y-3 sm:space-y-4">
                    <h3 id="ids-arch-heading" className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                      {!isIDS && !isEnglishMaster && <i className="fa-solid fa-network-wired text-purple-500"></i>} {isIDS ? 'System Architecture and Prediction Workflow' : 'System Architecture & Workflow'}
                    </h3>

                    {selectedProject.trainingPipeline ? (
                      <div className="space-y-4 sm:space-y-5">
                        {/* Architectural Summary Description */}
                        {!isIDS && selectedProject.architectureDesc && (
                          <div className="p-3.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-[11px] xs:text-xs sm:text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal">
                            <p>{selectedProject.architectureDesc}</p>
                          </div>
                        )}

                        {/* ─── IDS UNIFIED ARCHITECTURE & PREDICTION WORKFLOW PANEL ─── */}
                        {isIDS ? (
                          <IdsArchitectureWorkflowPanel />
                        ) : (
                          <>
                            {/* Workflow 1: Model Training and Preparation */}
                            <div className="p-3.5 xs:p-4.5 sm:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-100 shadow-2xs">
                              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                                  <i className="fa-solid fa-brain"></i>
                                </div>
                                <h4 className="text-sm xs:text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                                  Model Training and Preparation
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 pt-1">
                                {selectedProject.trainingPipeline.map((item, idx) => (
                                  <div key={idx} className="p-3 xs:p-3.5 sm:p-4 rounded-lg sm:rounded-xl bg-white border border-indigo-100 shadow-2xs flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                        <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700">
                                          Step {idx + 1}
                                        </span>
                                        {idx < selectedProject.trainingPipeline.length - 1 && (
                                          <span className="text-indigo-400 font-bold text-xs hidden lg:inline">→</span>
                                        )}
                                      </div>
                                      <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1 leading-snug">
                                        {item.step}
                                      </h5>
                                    </div>
                                    <p className="text-[11px] xs:text-xs text-slate-600 leading-relaxed mt-1 font-normal">
                                      {item.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Workflow 2: Prediction Workflow (User Input to Result) */}
                            {selectedProject.predictionPipeline && (
                              <div className="p-3.5 xs:p-4.5 sm:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-50/60 to-blue-50/40 border border-cyan-100 shadow-2xs">
                                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                                    <i className="fa-solid fa-bolt"></i>
                                  </div>
                                  <h4 className="text-sm xs:text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                                    Prediction Workflow (User Input to Result)
                                  </h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 pt-1">
                                  {selectedProject.predictionPipeline.map((item, idx) => (
                                    <div key={idx} className="p-3 xs:p-3.5 sm:p-4 rounded-lg sm:rounded-xl bg-white border border-cyan-100 shadow-2xs flex flex-col justify-between">
                                      <div>
                                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                          <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800">
                                            Step {idx + 1}
                                          </span>
                                          {idx < selectedProject.predictionPipeline.length - 1 && (
                                            <span className="text-cyan-400 font-bold text-xs hidden sm:inline">→</span>
                                          )}
                                        </div>
                                        <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1 leading-snug">
                                          {item.step}
                                        </h5>
                                      </div>
                                      <p className="text-[11px] xs:text-xs text-slate-600 leading-relaxed mt-1 font-normal">
                                        {item.desc}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : isEnglishMaster ? (
                      <EnglishMasterWorkflowScreenshots />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {selectedProject.workflow.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/30 border border-indigo-100/80 flex flex-col justify-between"
                          >
                            <div>
                              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                                {idx + 1}
                              </div>
                              <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug mb-1.5">
                                {item.step}
                              </h5>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ─── AUTHENTICATION & ON-BOARDING (ENGLISH MASTER PRO) ─── */}
                {isEnglishMaster && (
                  <EnglishMasterAuthOnboarding />
                )}

                {/* CORE FEATURES & CAPABILITIES (NON-IDS PROJECTS) */}
                {!isIDS && selectedProject.features && selectedProject.features.length > 0 && (
                  isEnglishMaster ? (
                    <EnglishMasterKeyFeaturesTimeline />
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                        <i className="fa-solid fa-list-check text-indigo-500"></i> Core Features &amp; Capabilities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                        {selectedProject.features.map((feat, idx) => {
                          const hasColon = feat.includes(':');
                          const titlePart = hasColon ? feat.split(':')[0] : null;
                          const descPart = hasColon ? feat.substring(feat.indexOf(':') + 1) : feat;
                          return (
                            <div
                              key={idx}
                              className="p-3 xs:p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-300 hover:shadow-xs transition-all flex items-start gap-2.5 sm:gap-3.5 group/feat"
                            >
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feat:scale-110 transition-transform">
                                <i className="fa-solid fa-check text-[10px] sm:text-xs"></i>
                              </div>
                              <div className="text-[11px] xs:text-xs sm:text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal">
                                {titlePart ? (
                                  <>
                                    <strong className="text-slate-900 font-bold block mb-0.5 sm:mb-1 text-xs xs:text-sm sm:text-[15px]">{titlePart}</strong>
                                    <span>{descPart}</span>
                                  </>
                                ) : (
                                  <span>{descPart}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}

                {/* APPLICATION MODULES (INTERACTIVE TABBED SHOWCASE FOR IDS MATCHING PROCEDURE) */}
                {((selectedProject.applicationModules && selectedProject.applicationModules.length > 0) || (selectedProject.modules && selectedProject.modules.length > 0) || isIDS) && (
                  <div className={`space-y-3 sm:space-y-4 ${isIDS ? 'ids-reveal-section' : ''}`}>
                    {isIDS ? (
                      <IdsInteractiveModuleShowcase />
                    ) : (
                      <>
                        <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                          <i className="fa-solid fa-cubes text-cyan-600"></i> Application Modules
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                          {(selectedProject.applicationModules || selectedProject.modules).map((mod, idx) => {
                            const isObj = typeof mod === 'object' && mod !== null;
                            const title = isObj ? mod.title : (mod.includes(':') ? mod.split(':')[0] : mod);
                            const desc = isObj ? mod.desc : (mod.includes(':') ? mod.substring(mod.indexOf(':') + 1).trim() : '');
                            const icon = isObj && mod.icon ? mod.icon : 'fa-solid fa-cube';
                            const colorClass = isObj && mod.color ? mod.color : 'text-cyan-600 bg-cyan-100';

                            return (
                              <div
                                key={idx}
                                className="p-3 xs:p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-300 hover:shadow-xs transition-all flex flex-col justify-between group/mod"
                              >
                                <div className="flex items-start gap-2.5 sm:gap-3.5">
                                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/mod:scale-110 transition-transform shadow-2xs`}>
                                    <i className={`${icon} text-[10px] sm:text-xs`}></i>
                                  </div>
                                  <div className="text-[11px] xs:text-xs sm:text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    <strong className="text-slate-900 font-bold block mb-0.5 sm:mb-1 text-xs xs:text-sm sm:text-[15px]">{title}</strong>
                                    {desc && <span>{desc}</span>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 06. TECHNOLOGIES USED */}
                {isEnglishMaster ? (
                  <EnglishMasterTechStackFlow />
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                      {!isIDS && <i className="fa-solid fa-code text-blue-500"></i>} {isIDS ? 'Technologies Used' : 'Technologies & Tools Used'}
                    </h3>
                    {isIDS ? (
                      <IdsTechnologiesUsed />
                    ) : selectedProject.techStack ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                        {Object.entries(selectedProject.techStack).map(([category, items], idx) => (
                          <div key={idx} className="p-3.5 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
                            <span className="text-[11px] sm:text-xs font-bold uppercase text-slate-500 tracking-wider block mb-2 sm:mb-2.5 capitalize">
                              {category.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {Array.isArray(items) ? (
                                items.map((item, i) => (
                                  <span
                                    key={i}
                                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-white text-slate-800 text-[11px] xs:text-xs sm:text-sm font-semibold border border-slate-200 shadow-xs"
                                  >
                                    {item}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs sm:text-sm font-semibold text-slate-700">{items}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {(selectedProject.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] xs:text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ─── ACADEMIC PROJECT PRESENTATION SCREENSHOTS (IDS) ─── */}
                {isIDS && (
                  <IdsAcademicPresentationScreenshots />
                )}

                {/* ─── APPLICATION MODULES (ENGLISH MASTER PRO) ─── */}
                {isEnglishMaster && (
                  <EnglishMasterInteractiveModules />
                )}


                {/* 07. EXPERIMENTAL RESULTS */}
                {selectedProject.experimentalResults && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                      {!isIDS && <i className="fa-solid fa-chart-simple text-emerald-500"></i>} {isIDS ? 'Experimental Results' : '07. Experimental Results'}
                    </h3>

                    {isIDS ? (
                      <IdsExperimentalResults />
                    ) : (
                      <div className="p-4 xs:p-4.5 sm:p-7 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
                        <p className="text-[11px] xs:text-xs sm:text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {selectedProject.experimentalResults.description}
                        </p>

                        {/* Algorithm Accuracy Comparison Table */}
                        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                          <table className="w-full text-left text-[11px] xs:text-xs sm:text-sm">
                            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] sm:text-xs border-b border-slate-200">
                              <tr>
                                <th className="py-2.5 px-3 sm:py-3.5 sm:px-4 font-bold">Algorithm</th>
                                <th className="py-2.5 px-3 sm:py-3.5 sm:px-4 font-bold">Reported Accuracy</th>
                                <th className="py-2.5 px-3 sm:py-3.5 sm:px-4 hidden sm:table-cell font-bold">Visual Benchmark</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedProject.experimentalResults.table.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                  <td className="py-2.5 px-3 sm:py-3.5 sm:px-4 font-bold text-slate-900 flex items-center gap-2">
                                    <i className="fa-solid fa-microchip text-slate-400 text-xs"></i>
                                    {row.algorithm}
                                  </td>
                                  <td className="py-2.5 px-3 sm:py-3.5 sm:px-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                      {row.accuracy}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 sm:py-3.5 sm:px-4 hidden sm:table-cell w-1/3">
                                    <div className="w-full bg-slate-100 rounded-full h-2 sm:h-2.5 overflow-hidden">
                                      <div
                                        className="bg-emerald-500 h-2 sm:h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${row.score || 98}%` }}
                                      ></div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Note Box */}
                        {selectedProject.experimentalResults.note && (
                          <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] xs:text-xs sm:text-[13px] flex items-start gap-2.5 shadow-2xs">
                            <i className="fa-solid fa-circle-info text-amber-600 mt-0.5 text-xs flex-shrink-0"></i>
                            <p className="font-normal leading-relaxed">
                              <strong className="font-bold">Note:</strong> {selectedProject.experimentalResults.note}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 08. FUTURE SCOPE & ENHANCEMENTS */}
                {selectedProject.futureScope && selectedProject.futureScope.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                      {!isIDS && !isEnglishMaster && <i className="fa-solid fa-compass text-indigo-500"></i>} {isIDS ? 'Future Scope' : 'Future Scope & Roadmap'}
                    </h3>
                    {isIDS ? (
                      <IdsFutureScope />
                    ) : isEnglishMaster ? (
                      <EnglishMasterFutureScopeWheel />
                    ) : (
                      <div className="p-3.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-indigo-50/40 border border-indigo-200/60 shadow-2xs">
                        <ul className="space-y-2.5 sm:space-y-3">
                          {selectedProject.futureScope.map((scope, idx) => {
                            const hasColon = typeof scope === 'string' && scope.includes(':');
                            const title = hasColon ? scope.substring(0, scope.indexOf(':')) : '';
                            const desc = hasColon ? scope.substring(scope.indexOf(':') + 1).trim() : scope;

                            return (
                              <li key={idx} className="text-[11px] xs:text-xs sm:text-[13px] sm:text-sm text-slate-700 flex items-start gap-2 sm:gap-2.5 leading-relaxed font-normal">
                                <i className="fa-solid fa-arrow-trend-up text-indigo-500 mt-1 text-xs flex-shrink-0"></i>
                                <span>
                                  {hasColon ? (
                                    <>
                                      <strong className="font-bold text-slate-900">{title}: </strong>
                                      <span className="text-slate-600 font-normal">{desc}</span>
                                    </>
                                  ) : (
                                    scope
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* SECURITY & IMPLEMENTATION NOTES */}
                {isIDS && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                      Security & Implementation Notes
                    </h3>
                    <IdsSecurityNotes />
                  </div>
                )}

                {/* 09. PROJECT CONCLUSION */}
                {selectedProject.conclusion && !isIDS && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                      <i className="fa-solid fa-flag-checkered text-emerald-600"></i> 09. Project Conclusion
                    </h3>
                    <div className="p-4 xs:p-4.5 sm:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border border-emerald-200/70 shadow-2xs space-y-3 sm:space-y-4">
                      <p className="text-[11px] xs:text-xs sm:text-[13px] sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {selectedProject.conclusion.text}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2.5 sm:pt-3 border-t border-emerald-200/60">
                        <span className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white text-emerald-800 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Project Status: {selectedProject.conclusion.status}
                        </span>
                        <span className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white text-purple-800 border border-purple-200 shadow-2xs flex items-center gap-1.5">
                          <i className="fa-solid fa-graduation-cap text-purple-600"></i>
                          Project Type: {selectedProject.conclusion.type}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── ENGLISH MASTER PRO: ROADMAP PHASES & EXPECTED OUTCOME ─── */}
                {isEnglishMaster && (
                  <EnglishMasterRoadmapOutcome selectedProject={selectedProject} />
                )}


                {/* BOTTOM ACTION LINKS FOR NON-IDS & NON-ENGLISH-MASTER PROJECTS */}
                {!isIDS && !isEnglishMaster && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-start gap-3 mt-8">
                    {selectedProject.repoUrl && (
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
                      >
                        <i className="fa-brands fa-github text-base"></i> View on GitHub
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-sm shadow-blue-500/25 hover:scale-105 active:scale-95 border border-blue-500/30"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i> Live Demo Preview
                      </a>
                    )}
                  </div>
                )}

              </div>

              {/* ENGLISH MASTER PRO FULLSCREEN FOOTER */}
              {isEnglishMaster && (
                <EnglishMasterFooter selectedProject={selectedProject} />
              )}

              {/* IDS FULLSCREEN REVERSE FOOTER */}
              {isIDS && (
                <div
                  className="w-full mt-12 border-t border-[#E8D9C0] transition-colors"
                  style={{
                    backgroundColor: '#E8DCC4',
                    backgroundImage: `
                    radial-gradient(ellipse at 0% 0%, #E8CDB5 0%, transparent 65%),
                    radial-gradient(ellipse at 100% 100%, #E9E6CF 0%, transparent 65%),
                    radial-gradient(ellipse at 50% 50%, #E8D9C0 0%, transparent 70%),
                    linear-gradient(135deg, #E8CDB5 0%, #E8D9C0 50%, #E9E6CF 100%)
                  `,
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-5 sm:py-6 flex flex-col items-center justify-center text-center gap-2.5">
                    {/* IDS Brand Identity Text */}
                    <div className="flex flex-col items-center justify-center text-center space-y-1">
                      <span className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-none">
                        IDS
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-700 tracking-tight leading-none">
                        (Intrusion Detection System)
                      </span>
                    </div>

                    {/* View on GitHub Button */}
                    {selectedProject.repoUrl && (
                      <div className="pt-1">
                        <a
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <i className="fa-brands fa-github text-base"></i> View on GitHub
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })()}

    </div>
  );
}