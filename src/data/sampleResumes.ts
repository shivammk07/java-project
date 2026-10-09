import { SampleResume } from '../types/resume';

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'java-architect',
    name: 'Priya Nair',
    role: 'Principal Java & Distributed Systems Architect',
    level: 'Lead / Staff (9 YOE)',
    formatType: 'pdf',
    formatBadge: 'PDF Document',
    visualStyle: 'clean-pdf',
    location: 'Seattle, WA',
    phone: '(206) 555-0148',
    email: 'priya.nair@javaarch.io',
    linkedin: 'linkedin.com/in/priyanair-java',
    tagline:
      'High-scale Java 21, Spring Boot & Kafka architecture background; needs sharper FinOps cost metrics and executive leadership framing.',
    targetJobTitle: 'Principal Backend Architect - Core Java & Cloud Financial Ledger',
    targetJobDescription: `Seeking a Principal Java Systems Architect to lead our ultra-low-latency global settlement engine.
Key Requirements:
- 8+ years designing mission-critical distributed backend systems in Java (Java 17/21, Virtual Threads, JVM GC tuning).
- Deep expertise with Spring Boot 3, Apache Kafka, gRPC, PostgreSQL, and Redis Cluster.
- Proven track record scaling high-throughput microservices (50k+ TPS) on AWS EKS / Kubernetes with Terraform.
- Experience with event sourcing, CQRS, distributed tracing (OpenTelemetry), and PCI-DSS/SOX compliance.
- Strong architectural governance: RFC authoring, staff engineer mentorship, and cloud cost optimization (FinOps).`,
    resumeText: `PRIYA NAIR
Seattle, WA | (206) 555-0148 | priya.nair@javaarch.io | linkedin.com/in/priyanair-java

ARCHITECTURAL SUMMARY
Principal Java & Distributed Systems Engineer with 9 years of experience designing fault-tolerant microservices, high-throughput event streaming pipelines, and cloud-native payment platforms. Expert in Java 21, Spring Boot, Apache Kafka, and JVM performance engineering across AWS Kubernetes environments.

TECHNICAL SKILLS
Languages: Java 21/17/11, Kotlin, SQL, Python, Bash
Frameworks & Runtime: Spring Boot 3, Spring Cloud, Project Loom (Virtual Threads), Hibernate/JPA, gRPC, Netty
Messaging & Data: Apache Kafka, RabbitMQ, PostgreSQL, Cassandra, Redis Cluster, Elasticsearch
Cloud & Infrastructure: AWS (EKS, RDS, DynamoDB, SQS), Kubernetes, Docker, Terraform, Helm, OpenTelemetry

PROFESSIONAL EXPERIENCE

Lead Java Systems Engineer | CorePay Financial | Seattle, WA
April 2021 - Present
- Architected multi-region settlement microservices in Java 21 and Spring Boot handling 42,000 transactions per second at 99.995% availability.
- Tuned G1GC and ZGC JVM garbage collection parameters across 180 production pods, cutting p99 tail latency from 140ms to 19ms.
- Led the migration from monolithic Oracle billing database to event-driven CQRS architecture using Apache Kafka and PostgreSQL.
- Responsible for reviewing system design documents and mentoring 12 senior and mid-level backend engineers.
- Worked on AWS infrastructure provisioning using Terraform and Helm charts for Kubernetes deployments.

Senior Java Backend Developer | CloudScale Commerce | Bellevue, WA
August 2018 - March 2021
- Designed high-concurrency order fulfillment APIs using Java 11, Spring WebFlux, and Redis distributed locks.
- Implemented idempotent Kafka consumers to process 85M+ daily inventory and shipment events with zero message loss.
- Built automated chaos testing and performance benchmarking pipelines in Jenkins and Gatling.
- Helped reduce database deadlock incidents during peak Black Friday traffic through query optimization.

Software Development Engineer (Java) | Vertex Enterprise Systems | Austin, TX
June 2016 - July 2018
- Developed RESTful web services in Java 8 and Spring MVC for enterprise resource planning modules.
- Wrote unit and integration test suites using JUnit 5, Mockito, and Testcontainers.

EDUCATION & CERTIFICATIONS
M.S. in Computer Science | University of Washington
AWS Certified Solutions Architect – Professional | Oracle Certified Professional: Java SE 17 Developer`,
    precomputedAnalysis: {
      candidateName: 'Priya Nair',
      detectedRole: 'Principal Java & Distributed Systems Architect',
      targetRoleMatch: 'Strong alignment (88%) with Principal Backend Architect; exceptional JVM & Kafka depth.',
      overallScore: 86,
      scoreLabel: 'Exceptional',
      executiveSummary:
        'High-caliber Principal Java profile featuring standout JVM tail-latency tuning (140ms to 19ms) and 42k TPS throughput scale. Tightening passive bullets around mentorship and quantifying AWS FinOps savings will elevate this into the top 1% of Staff/Principal candidates.',
      categoryScores: {
        atsParsability: {
          score: 92,
          feedback: 'Clean single-column PDF hierarchy, standard chronological timestamps, and clear technology taxonomy.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 84,
          feedback: 'Excellent latency (19ms p99) and throughput (42k TPS, 85M+ events) metrics; cloud cost and team velocity metrics are missing.',
          status: 'good',
        },
        actionVerbs: {
          score: 79,
          feedback: 'Strong opening verbs ("Architected", "Tuned"), but late bullets slip into passive phrasing ("Responsible for", "Worked on", "Helped reduce").',
          status: 'warning',
        },
        keywordMatch: {
          score: 89,
          feedback: 'Matches Java 21, Virtual Threads, Spring Boot 3, Kafka, CQRS, gRPC, PostgreSQL, and AWS EKS.',
          status: 'good',
        },
        formattingReadability: {
          score: 87,
          feedback: 'Concise 1-2 line bullets with strong technical density and clear credential hierarchy.',
          status: 'good',
        },
      },
      strengths: [
        'Concrete JVM garbage collection tuning impact (G1GC/ZGC reducing p99 latency by 86% from 140ms to 19ms)',
        'Proven high-throughput distributed systems scale (42,000 TPS at 99.995% SLA and 85M+ daily Kafka events)',
        'Modern Java 21, Project Loom Virtual Threads, and CQRS domain architecture alignment',
        'Strong academic pedigree (M.S. CS) paired with AWS Solutions Architect Pro & OCP Java 17 certifications',
      ],
      weaknesses: [
        'Mentorship and architectural RFC leadership bullet uses passive "Responsible for" phrasing without engineering velocity outcomes',
        'Missing explicit PCI-DSS / SOX regulatory compliance keywords required by the settlement ledger role',
        'Terraform / EKS bullet lacks quantified FinOps cloud spend reduction or deployment cycle metrics',
      ],
      criticalFixes: [
        {
          title: 'Add PCI-DSS & SOX Financial Compliance Context',
          section: 'Experience',
          issue: 'Target role requires PCI-DSS and SOX compliance for global financial settlement, which is absent from the resume.',
          recommendation: 'Update the CorePay settlement microservice bullet to specify PCI-DSS Level 1 and SOX audit compliance.',
          priority: 'high',
        },
        {
          title: 'Quantify AWS EKS & Terraform FinOps Impact',
          section: 'Experience',
          issue: '"Worked on AWS infrastructure provisioning using Terraform" reads like a junior task rather than Principal ownership.',
          recommendation: 'Reframe around multi-cluster EKS automation, deployment lead time reduction, and annual AWS cost savings.',
          priority: 'high',
        },
        {
          title: 'Upgrade Architectural Governance & Mentorship Bullet',
          section: 'Experience',
          issue: '"Responsible for reviewing system design documents" under-sells Principal-level RFC governance.',
          recommendation: 'State how many architectural RFCs were ratified and the resulting reduction in production incident rates.',
          priority: 'medium',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Responsible for reviewing system design documents and mentoring 12 senior and mid-level backend engineers.',
          improved: 'Chaired the Backend Architecture Review Board across 45+ engineering RFCs and mentored 12 engineers, accelerating sprint delivery velocity by 28% and cutting sev-1 incidents by 60%.',
          explanation: 'Replaces passive "Responsible for" with executive ownership ("Chaired") and measurable engineering outcomes.',
          impactCategory: 'Leadership & Governance',
        },
        {
          original: 'Worked on AWS infrastructure provisioning using Terraform and Helm charts for Kubernetes deployments.',
          improved: 'Automated multi-region AWS EKS cluster provisioning via Terraform and Helm, slashing release lead times from 4 hours to 8 minutes and reducing annual cloud compute spend by $340K (24%).',
          explanation: 'Applies Google XYZ structure with concrete deployment speed and FinOps cost savings.',
          impactCategory: 'Metrics & FinOps ROI',
        },
        {
          original: 'Helped reduce database deadlock incidents during peak Black Friday traffic through query optimization.',
          improved: 'Eliminated 98% of PostgreSQL deadlock bottlenecks during 12x Black Friday traffic spikes by redesigning composite indexes and transaction isolation levels.',
          explanation: 'Removes weak "Helped reduce" and quantifies the traffic multiplier and deadlock elimination rate.',
          impactCategory: 'Technical Precision',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: [
          'Java 21',
          'Virtual Threads',
          'Spring Boot 3',
          'JVM GC Tuning',
          'Apache Kafka',
          'gRPC',
          'PostgreSQL',
          'Redis Cluster',
          'AWS EKS',
          'Kubernetes',
          'Terraform',
          'CQRS',
          'OpenTelemetry',
        ],
        missingCrucialKeywords: ['PCI-DSS Compliance', 'SOX Audit', 'Event Sourcing', 'FinOps'],
        recommendedAdditions: ['Resilience4j', 'Distributed Saga Pattern', 'ArgoCD', 'Prometheus / Grafana'],
        jobDescriptionMatchPercentage: 88,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'Complete location, phone, professional email, and LinkedIn URL in a single parsable line.',
          improvements: 'Consider adding a GitHub or technical blog link showcasing distributed systems articles.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'excellent',
          positiveNotes: 'Immediately establishes 9 YOE, Java 21, Spring Boot, and high-throughput payment domain authority.',
          improvements: 'Mention total transaction volume ($B processed) or FinOps impact in the opening sentence.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'excellent',
          positiveNotes: 'Strong progression from SDE to Lead Java Systems Engineer with verifiable latency and TPS figures.',
          improvements: 'Eliminate the 3 passive bullets ("Responsible for", "Worked on", "Helped") in favor of active ROI statements.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'Well-grouped into Languages, Frameworks, Messaging/Data, and Cloud/Infrastructure.',
          improvements: 'Add security/compliance standards (PCI-DSS, OAuth2/mTLS) for Principal fintech roles.',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'M.S. in CS plus both AWS Solutions Architect Pro and Oracle Java SE 17 certifications.',
          improvements: 'No structural changes needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Single-column PDF structure parses cleanly with zero multi-column text interleaving.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'All 4 core contact fields detected in standard top header block.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard ATS section headers (Skills, Professional Experience, Education) mapped accurately.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: true,
          details: 'All technical keywords and dates are machine-readable text layers.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year formatting across all 3 positions.',
        },
      ],
      estimatedYoe: '9 years',
      topSkillsIdentified: [
        'Java 21',
        'Spring Boot 3',
        'Apache Kafka',
        'JVM GC Tuning',
        'Kubernetes / AWS EKS',
        'PostgreSQL',
        'CQRS & Microservices',
        'Terraform',
      ],
      analysisTimeMs: 380,
      detectedFormat: 'PDF Document (Visual + Text Layer)',
    },
  },
  {
    id: 'ai-ml-photo',
    name: 'Dr. Elena Rostova',
    role: 'Senior AI & Machine Learning Research Engineer',
    level: 'Senior (6 YOE)',
    formatType: 'photo',
    formatBadge: 'Photo Scan (JPG)',
    visualStyle: 'camera-photo',
    location: 'San Francisco, CA',
    phone: '(415) 555-0934',
    email: 'elena.rostova@aiml.org',
    linkedin: 'linkedin.com/in/elenarostova-ai',
    tagline:
      'Camera-scanned photo resume with strong PyTorch & LLM fine-tuning experience; needs production latency SLAs and MLOps keywords.',
    targetJobTitle: 'Staff Applied AI Engineer - Multimodal LLM & Production Inference',
    targetJobDescription: `We are hiring a Staff Applied AI Engineer to scale our multimodal document intelligence and LLM inference platform.
Requirements:
- 5+ years in Machine Learning Engineering with deep proficiency in PyTorch, Transformers, vLLM, and CUDA optimization.
- Experience with RAG architectures, vector databases (Pinecone, Milvus, pgvector), and LLM evaluation harnesses.
- Proven track record deploying quantized models (FP8/INT4, TensorRT-LLM) on Kubernetes GPU clusters (NVIDIA A100/H100).
- Strong software engineering rigor in Python, C++, FastAPI, Docker, and CI/CD for ML (MLflow, Weights & Biases).`,
    resumeText: `DR. ELENA ROSTOVA
San Francisco, CA | (415) 555-0934 | elena.rostova@aiml.org | linkedin.com/in/elenarostova-ai

RESEARCH & ENGINEERING SUMMARY
Senior Machine Learning & Applied AI Engineer with a Ph.D. in Computer Vision and 6 years of industry experience training, fine-tuning, and deploying multimodal foundation models and RAG systems at scale.

TECHNICAL SKILLS
ML & Deep Learning: PyTorch, HuggingFace Transformers, LoRA/QLoRA, LangChain, Vision-Language Models, OCR
Inference & Hardware: CUDA, ONNX Runtime, NVIDIA Triton, vLLM, Model Quantization
Languages & Backend: Python, C++, SQL, FastAPI, gRPC, Docker, Kubernetes, AWS SageMaker

WORK EXPERIENCE

Senior Applied AI Engineer | DocuVision AI | San Francisco, CA
May 2022 - Present
- Fine-tuned 7B and 13B vision-language models using QLoRA on 2.4M proprietary financial documents, raising extraction F1 score from 81.2% to 94.6%.
- Built production Retrieval-Augmented Generation (RAG) pipelines with hybrid dense/sparse embeddings, cutting hallucination rates by 62%.
- Worked on optimizing GPU inference throughput using vLLM and dynamic batching across AWS GPU instances.
- Responsible for setting up automated LLM evaluation benchmarks for accuracy and toxicity regression testing.

Machine Learning Engineer | NeuralSense Robotics | Palo Alto, CA
July 2019 - April 2022
- Trained real-time 3D object detection networks in PyTorch for autonomous warehouse navigation running at 45 FPS on edge GPUs.
- Developed automated data labeling and active learning pipelines that reduced manual annotation costs by $180K annually.
- Collaborated with embedded C++ engineers to convert PyTorch checkpoints into ONNX models.

EDUCATION & PUBLICATIONS
Ph.D. in Computer Science (Computer Vision & Deep Learning) | Stanford University
First-author publications at CVPR and NeurIPS on multimodal representation learning`,
    precomputedAnalysis: {
      candidateName: 'Dr. Elena Rostova',
      detectedRole: 'Senior AI & Machine Learning Research Engineer',
      targetRoleMatch: 'High alignment (84%) for Staff Applied AI; elite research & fine-tuning metrics, needs TensorRT-LLM & vector DB specifics.',
      overallScore: 83,
      scoreLabel: 'Competitive',
      executiveSummary:
        'Multimodal OCR scan successfully extracted an impressive Applied AI profile with standout F1 accuracy gains (81.2% to 94.6%) and Stanford Ph.D. credentials. Adding specific GPU quantization metrics (TensorRT-LLM, H100 cost/token) and explicit vector database names will push this score above 92.',
      categoryScores: {
        atsParsability: {
          score: 80,
          feedback: 'Scanned photo resume parsed accurately via Vision OCR, though submitting a native PDF in ATS portals is recommended to avoid legacy OCR drop-off.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 86,
          feedback: 'Strong model quality metrics (94.6% F1, -62% hallucinations, $180K saved); needs GPU latency/cost-per-1M-tokens metrics.',
          status: 'good',
        },
        actionVerbs: {
          score: 81,
          feedback: 'Mostly strong technical verbs ("Fine-tuned", "Trained"), with two passive phrases ("Worked on", "Responsible for").',
          status: 'good',
        },
        keywordMatch: {
          score: 82,
          feedback: 'Strong coverage of PyTorch, vLLM, RAG, CUDA, and FastAPI; missing TensorRT-LLM, Milvus/Pinecone, and MLflow.',
          status: 'good',
        },
        formattingReadability: {
          score: 85,
          feedback: 'Well-structured sections and crisp academic/publication highlights.',
          status: 'good',
        },
      },
      strengths: [
        'Quantified LLM fine-tuning uplift (+13.4% F1 score across 2.4M documents) and 62% hallucination reduction',
        'Top-tier academic foundation (Stanford Ph.D. + CVPR/NeurIPS first-author publications)',
        'End-to-end coverage from model training (PyTorch/QLoRA) to inference serving (vLLM/Triton)',
      ],
      weaknesses: [
        'Photo scan format risks rejection on legacy non-vision ATS parsers if not exported as text-layer PDF',
        'GPU inference optimization bullet ("Worked on optimizing GPU inference") lacks p95 latency and $/million token savings',
        'Vector database tools (Pinecone, Milvus, pgvector) and experiment trackers (MLflow, W&B) are not explicitly named',
      ],
      criticalFixes: [
        {
          title: 'Quantify vLLM GPU Inference Latency & Token Cost',
          section: 'Experience',
          issue: '"Worked on optimizing GPU inference throughput using vLLM" does not specify hardware (A100/H100) or latency reduction.',
          recommendation: 'Specify FP8/INT4 quantization, tokens/sec throughput gain, and GPU cluster cost reduction.',
          priority: 'high',
        },
        {
          title: 'Name Specific Vector Databases & MLOps Tooling',
          section: 'Skills / Experience',
          issue: 'Job description explicitly filters for Pinecone, Milvus, pgvector, MLflow, and Weights & Biases.',
          recommendation: 'Include the exact vector store used in the RAG pipeline bullet and add MLflow / W&B to Technical Skills.',
          priority: 'high',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Worked on optimizing GPU inference throughput using vLLM and dynamic batching across AWS GPU instances.',
          improved: 'Engineered INT4/FP8 quantized LLM serving on AWS A100 GPU clusters using vLLM and TensorRT-LLM, boosting throughput by 3.4x (to 1,850 tokens/sec) and cutting inference spend by $290K/yr.',
          explanation: 'Turns a vague task into a Staff-level systems benchmark with hardware and dollar ROI.',
          impactCategory: 'Metrics & Scale',
        },
        {
          original: 'Responsible for setting up automated LLM evaluation benchmarks for accuracy and toxicity regression testing.',
          improved: 'Architected an automated LLM-as-a-Judge evaluation harness in Weights & Biases across 15,000 golden prompts, catching 100% of hallucination regressions pre-deployment.',
          explanation: 'Replaces passive language with concrete scale and reliability impact.',
          impactCategory: 'Technical Precision',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['PyTorch', 'Transformers', 'vLLM', 'CUDA', 'RAG', 'Python', 'C++', 'FastAPI', 'Docker', 'Kubernetes'],
        missingCrucialKeywords: ['TensorRT-LLM', 'Pinecone / Milvus / pgvector', 'MLflow', 'Weights & Biases', 'A100 / H100'],
        recommendedAdditions: ['FlashAttention-2', 'Ray Serve', 'DeepSpeed', 'OpenTelemetry'],
        jobDescriptionMatchPercentage: 84,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'Clear credentials (Dr. Elena Rostova) and complete contact links.',
          improvements: 'Add Google Scholar or HuggingFace profile link.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'excellent',
          positiveNotes: 'Concise blend of Ph.D. research depth and production engineering.',
          improvements: 'Include production scale (e.g., serving 10M+ daily inference requests).',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'excellent',
          positiveNotes: 'Strong F1 and hallucination metrics in first two bullets.',
          improvements: 'Quantify GPU serving latency and token economics.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'adequate',
          positiveNotes: 'Strong deep learning and inference runtime stack.',
          improvements: 'Add Vector DBs (Milvus, pgvector) and MLOps trackers (W&B, MLflow).',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'Stanford Ph.D. + CVPR/NeurIPS publications provide strong authority.',
          improvements: 'None required.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Single-column visual layout with clear section separation.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'Phone, email, location, and LinkedIn extracted via OCR.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard Experience, Skills, and Education headings detected.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: false,
          details: 'Uploaded as a camera photo scan (.jpg). Modern AI ATS parses this via OCR, but exporting as a text-layer PDF is strongly advised.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year date ranges across all roles.',
        },
      ],
      estimatedYoe: '6 years',
      topSkillsIdentified: ['PyTorch', 'LLM Fine-Tuning (QLoRA)', 'RAG Pipelines', 'vLLM', 'CUDA', 'Computer Vision', 'FastAPI', 'Kubernetes'],
      analysisTimeMs: 420,
      detectedFormat: 'Photo Scan (JPEG Multimodal OCR)',
    },
  },
  {
    id: 'swe-senior',
    name: 'Alex Rivera',
    role: 'Senior Full-Stack Software Engineer',
    level: 'Senior (6+ YOE)',
    formatType: 'text',
    formatBadge: 'Plain Text / MD',
    visualStyle: 'plain-text',
    location: 'San Francisco, CA',
    phone: '(415) 555-0192',
    email: 'alex.rivera@email.com',
    linkedin: 'linkedin.com/in/alexrivera-dev',
    tagline:
      'Strong technical depth with cloud & microservices, but needs more quantifiable business outcomes',
    targetJobTitle: 'Staff / Senior Full Stack Engineer (Cloud & React/Node)',
    targetJobDescription: `We are seeking a Senior Full Stack Engineer to lead our core billing and payments platform.
Key Requirements:
- 5+ years building distributed web applications with TypeScript, React, Node.js, and PostgreSQL.
- Experience with high-throughput cloud infrastructure (AWS, Docker, Kubernetes, Terraform).
- Strong track record of improving system latency, test coverage, and CI/CD pipelines.
- Proven leadership mentoring junior and mid-level engineers, running architectural reviews.
- Familiarity with PCI-DSS compliance, Redis caching, and event-driven architecture (Kafka/SQS).`,
    resumeText: `ALEX RIVERA
San Francisco, CA | (415) 555-0192 | alex.rivera@email.com | linkedin.com/in/alexrivera-dev | github.com/alexrivera-dev

PROFESSIONAL SUMMARY
Experienced Full-Stack Software Engineer with 6 years of expertise in React, Node.js, TypeScript, and AWS cloud environments. Passionate about building robust web services, improving developer tooling, and modernizing legacy codebases.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL
Frontend: React, Next.js, Redux, Tailwind CSS, HTML5, Webpack
Backend: Node.js, Express, Fastify, REST APIs, GraphQL, PostgreSQL, Redis
DevOps & Cloud: AWS (EC2, S3, Lambda), Docker, GitHub Actions, Jest

WORK EXPERIENCE

Senior Software Engineer | CloudSphere Inc. | Austin, TX (Remote)
July 2022 - Present
- Led the migration of monolith frontend to modern Next.js and React architecture.
- Built backend microservices using Node.js and TypeScript handling payment webhooks.
- Worked on improving database query response times by introducing Redis caching layer.
- Responsible for mentoring 3 junior developers and reviewing pull requests.
- Implemented CI/CD pipelines using GitHub Actions to automate unit and integration testing.
- Collaborated with product managers and designers to deliver new customer dashboard features.

Software Engineer | FinFlow Technologies | San Francisco, CA
March 2020 - June 2022
- Developed user-facing features for a high-volume financial analytics dashboard using React and D3.js.
- Integrated third-party banking APIs and handled secure OAuth2 authentication flows.
- Participated in weekly on-call rotations and resolved production incidents.
- Refactored legacy relational database schemas in PostgreSQL to support multi-tenant architecture.
- Wrote unit and end-to-end tests using Jest and Cypress to improve code reliability.

Junior Web Developer | BrightPath Digital | San Jose, CA
June 2018 - February 2020
- Built responsive client websites using React, HTML5, and CSS3.
- Maintained RESTful API endpoints in Express and Node.js.
- Assisted senior engineers in debugging cross-browser compatibility issues.

EDUCATION
Bachelor of Science in Computer Science
San Jose State University, 2018`,
    precomputedAnalysis: {
      candidateName: 'Alex Rivera',
      detectedRole: 'Senior Full-Stack Software Engineer',
      targetRoleMatch: 'Solid core stack match (76%), but lacks quantified metrics and infrastructure orchestration keywords (Kubernetes, Terraform).',
      overallScore: 74,
      scoreLabel: 'Needs Optimization',
      executiveSummary:
        'Cleanly structured 6-year full-stack resume with strong TypeScript, React, Node.js, and PostgreSQL fundamentals. However, almost every work experience bullet describes tasks rather than measurable impact—adding latency percentages, payment volumes, and Kubernetes/Terraform keywords will dramatically boost interview conversion.',
      categoryScores: {
        atsParsability: {
          score: 90,
          feedback: 'Clean chronological layout with standard headings and complete contact metadata.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 52,
          feedback: 'Only 1 number ("3 junior developers") across 14 experience bullets. Zero percentages, latency gains, or revenue figures.',
          status: 'critical',
        },
        actionVerbs: {
          score: 68,
          feedback: 'Uses weak phrases like "Worked on", "Responsible for", "Participated in", and "Assisted".',
          status: 'warning',
        },
        keywordMatch: {
          score: 76,
          feedback: 'Matches TypeScript, React, Node.js, PostgreSQL, Redis, AWS, and Docker; misses Kubernetes, Terraform, Kafka/SQS, and PCI-DSS.',
          status: 'warning',
        },
        formattingReadability: {
          score: 85,
          feedback: 'Easy to skim with clear company, location, and date formatting.',
          status: 'good',
        },
      },
      strengths: [
        'Full 6-year progression from Junior Developer to Senior Software Engineer',
        'Direct domain relevance in payments webhooks, banking APIs, and multi-tenant PostgreSQL',
        'High ATS machine readability with clean section headers',
      ],
      weaknesses: [
        'Severe lack of quantifiable metrics (no latency reduction %, webhook throughput, or test coverage numbers)',
        'Missing critical cloud-native keywords from target job: Kubernetes, Terraform, Kafka/SQS, and PCI-DSS',
        'Passive phrasing ("Worked on", "Responsible for") dilutes senior engineering ownership',
      ],
      criticalFixes: [
        {
          title: 'Quantify Redis Caching & Payment Webhook Scale',
          section: 'Experience',
          issue: 'Bullets state "Built backend microservices... handling payment webhooks" and "Worked on improving database query response times" with zero numbers.',
          recommendation: 'Specify daily webhook volume, success rate (e.g., 99.99%), and exact query latency improvement (e.g., cut p95 latency by 65%).',
          priority: 'high',
        },
        {
          title: 'Incorporate Missing Infrastructure & Event Keywords',
          section: 'Skills & Experience',
          issue: 'Target Staff/Senior role requires Kubernetes, Terraform, Kafka/SQS, and PCI-DSS compliance.',
          recommendation: 'Add AWS SQS/Kafka, Kubernetes, Terraform, and PCI-DSS where applicable in CloudSphere and FinFlow roles.',
          priority: 'high',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Worked on improving database query response times by introducing Redis caching layer.',
          improved: 'Architected a distributed Redis write-through caching layer for high-traffic PostgreSQL endpoints, slashing p95 API response latency by 68% (from 420ms to 135ms) across 2M+ daily requests.',
          explanation: 'Applies Google XYZ formula to quantify latency drop and request scale.',
          impactCategory: 'Metrics & Scale',
        },
        {
          original: 'Built backend microservices using Node.js and TypeScript handling payment webhooks.',
          improved: 'Engineered fault-tolerant Node.js and TypeScript payment webhook microservices with AWS SQS retry queues, processing $45M+ in annual PCI-DSS compliant volume with 99.99% delivery reliability.',
          explanation: 'Injects missing SQS and PCI-DSS keywords alongside concrete transaction volume.',
          impactCategory: 'Technical Precision',
        },
        {
          original: 'Led the migration of monolith frontend to modern Next.js and React architecture.',
          improved: 'Spearheaded the strangler-fig migration of a legacy frontend monolith to Next.js and TypeScript, improving Core Web Vitals LCP by 44% and accelerating feature deployment cadence by 2.5x.',
          explanation: 'Connects architectural migration to user performance and engineering velocity.',
          impactCategory: 'Leadership',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'CI/CD', 'Jest'],
        missingCrucialKeywords: ['Kubernetes', 'Terraform', 'Kafka / SQS', 'PCI-DSS Compliance', 'Architectural Reviews'],
        recommendedAdditions: ['OpenTelemetry', 'GraphQL Federation', 'Playwright', 'Datadog'],
        jobDescriptionMatchPercentage: 76,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'Includes GitHub, LinkedIn, email, phone, and city.',
          improvements: 'None needed.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'adequate',
          positiveNotes: 'Clearly states 6 YOE and core stack.',
          improvements: 'Replace generic "Passionate about building robust web services" with 1-2 headline career achievements.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'needs_work',
          positiveNotes: 'Relevant companies and responsibilities.',
          improvements: 'Add hard numbers (%, $, ms, scale) to at least 75% of bullets.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'Cleanly categorized into Languages, Frontend, Backend, and DevOps.',
          improvements: 'Add Kubernetes, Terraform, and message queues (SQS/Kafka).',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'B.S. in Computer Science clearly formatted.',
          improvements: 'None needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Plain-text single-column layout is 100% ATS parsable.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'Email, phone, LinkedIn, and GitHub present.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Uses standard headings recognized by Workday, Greenhouse, and Lever.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: true,
          details: 'Pure text stream with zero table traps.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year dates across all roles.',
        },
      ],
      estimatedYoe: '6 years',
      topSkillsIdentified: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
      analysisTimeMs: 310,
      detectedFormat: 'Plain Text / Markdown',
    },
  },
  {
    id: 'devops-sre-photo',
    name: 'Arjun Mehta',
    role: 'Cloud DevOps & Site Reliability Engineer (SRE)',
    level: 'Mid-Senior (4.5 YOE)',
    formatType: 'photo',
    formatBadge: 'Photo Scan (PNG)',
    visualStyle: 'camera-photo',
    location: 'Austin, TX',
    phone: '(512) 555-0821',
    email: 'arjun.mehta@cloudops.dev',
    linkedin: 'linkedin.com/in/arjunmehta-sre',
    tagline:
      'Visual camera-scanned resume with strong Kubernetes, Terraform & Prometheus skills; needs MTTR and SLO error-budget metrics.',
    targetJobTitle: 'Senior Site Reliability Engineer (Kubernetes & Multi-Cloud Platform)',
    targetJobDescription: `Looking for a Senior SRE to own reliability, observability, and Kubernetes platform engineering.
Requirements:
- 4+ years in SRE, DevOps, or Platform Engineering managing production Kubernetes (EKS/GKE) clusters.
- Strong Infrastructure-as-Code expertise with Terraform, Ansible, and GitOps (ArgoCD / Flux).
- Deep observability experience with Prometheus, Grafana, OpenTelemetry, and ELK/Datadog.
- Programming proficiency in Go or Python for infrastructure automation and custom Kubernetes operators.
- Proven experience defining SLIs/SLOs, managing error budgets, and driving down MTTR via blameless postmortems.`,
    resumeText: `ARJUN MEHTA
Austin, TX | (512) 555-0821 | arjun.mehta@cloudops.dev | linkedin.com/in/arjunmehta-sre

SUMMARY
Site Reliability & Cloud DevOps Engineer with 4.5 years of experience automating cloud infrastructure, scaling Kubernetes clusters, and building unified observability stacks across AWS and GCP.

TECHNICAL SKILLS
Cloud & Containers: AWS (EKS, EC2, VPC, IAM), GCP (GKE), Kubernetes, Docker, Helm, Istio Service Mesh
IaC & GitOps: Terraform, Terragrunt, ArgoCD, GitHub Actions, GitLab CI, Ansible
Observability: Prometheus, Grafana, Datadog, ELK Stack, PagerDuty
Languages: Go, Python, Bash, YAML, HCL

WORK EXPERIENCE

Site Reliability Engineer | Nimbus Cloud Platform | Austin, TX
August 2022 - Present
- Managed 14 production AWS EKS clusters hosting 300+ microservices with 99.95% uptime.
- Implemented GitOps continuous delivery workflows using ArgoCD and Helm charts, reducing manual deployment errors.
- Built centralized Prometheus and Grafana dashboards to monitor cluster CPU, memory, and API error rates.
- Wrote Python and Go automation scripts to clean up orphaned cloud resources and reduce monthly AWS bills.
- Participated in 24/7 on-call rotation and led root-cause analysis after major outages.

Cloud DevOps Engineer | PulseHealth Systems | Dallas, TX
January 2020 - July 2022
- Migrated legacy VM workloads into Docker containers orchestrated on AWS ECS and EKS.
- Authored reusable Terraform modules for VPC networking, RDS databases, and IAM least-privilege roles.
- Set up automated vulnerability scanning in CI/CD pipelines using Trivy and SonarQube.

EDUCATION & CERTIFICATIONS
B.S. in Information Technology | University of Texas at Dallas
Certified Kubernetes Administrator (CKA) | HashiCorp Certified: Terraform Associate`,
    precomputedAnalysis: {
      candidateName: 'Arjun Mehta',
      detectedRole: 'Cloud DevOps & Site Reliability Engineer (SRE)',
      targetRoleMatch: 'Strong toolset match (85%) with Senior SRE; needs explicit SLI/SLO error budget and MTTR metrics.',
      overallScore: 81,
      scoreLabel: 'Competitive',
      executiveSummary:
        'Well-qualified SRE profile with CKA certification and hands-on ownership of 14 production EKS clusters. Upgrading unquantified bullets around AWS cost savings, ArgoCD deployment frequency, and incident MTTR reduction will make this resume stand out immediately.',
      categoryScores: {
        atsParsability: {
          score: 81,
          feedback: 'Camera-scanned image parsed cleanly by multimodal OCR; export as native PDF for legacy ATS compatibility.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 74,
          feedback: 'Includes cluster count (14 EKS clusters, 300+ services, 99.95% uptime), but misses $ saved and MTTR % drop.',
          status: 'warning',
        },
        actionVerbs: {
          score: 82,
          feedback: 'Strong verbs ("Managed", "Implemented", "Authored"), except for passive "Participated in 24/7 on-call".',
          status: 'good',
        },
        keywordMatch: {
          score: 88,
          feedback: 'Matches Kubernetes, EKS, GKE, Terraform, ArgoCD, Prometheus, Grafana, Go, and Python; missing OpenTelemetry & SLO error budgets.',
          status: 'good',
        },
        formattingReadability: {
          score: 84,
          feedback: 'Clear technical categorization and strong certifications section.',
          status: 'good',
        },
      },
      strengths: [
        'Verified production scale (14 AWS EKS clusters, 300+ microservices, 99.95% uptime)',
        'High-value certifications: Certified Kubernetes Administrator (CKA) + Terraform Associate',
        'Full GitOps (ArgoCD/Helm) and IaC (Terraform/Terragrunt) alignment',
      ],
      weaknesses: [
        'Missing core SRE methodology terms required by JD: SLIs/SLOs, Error Budgets, and OpenTelemetry',
        'Python/Go FinOps script bullet fails to state the dollar amount or percentage saved on AWS bills',
        'On-call bullet uses passive "Participated in" without quantifying MTTR improvement',
      ],
      criticalFixes: [
        {
          title: 'Add SLI/SLO Error Budget & MTTR Metrics',
          section: 'Experience',
          issue: 'SRE hiring managers look specifically for SLI/SLO governance and Mean Time To Recovery (MTTR) improvements.',
          recommendation: 'Update the observability and on-call bullets to quantify MTTR reduction (e.g., from 45m to 11m) and SLO error-budget tracking.',
          priority: 'high',
        },
        {
          title: 'Quantify Go/Python AWS Cost Optimization',
          section: 'Experience',
          issue: '"reduce monthly AWS bills" has no numeric value.',
          recommendation: 'Specify exact monthly or annual savings (e.g., saved $14,500/month or 22% of EC2/EBS spend).',
          priority: 'high',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Wrote Python and Go automation scripts to clean up orphaned cloud resources and reduce monthly AWS bills.',
          improved: 'Engineered automated Go and Python FinOps controllers to reclaim unattached EBS volumes and right-size EKS nodes, reducing annual AWS cloud expenditure by $175,000 (21%).',
          explanation: 'Quantifies the exact financial ROI of the Go/Python automation.',
          impactCategory: 'Metrics & Scale',
        },
        {
          original: 'Participated in 24/7 on-call rotation and led root-cause analysis after major outages.',
          improved: 'Spearheaded SLI/SLO error-budget governance and blameless postmortems across Tier-1 services, slashing Mean Time To Recovery (MTTR) by 64% (from 52 mins to 19 mins).',
          explanation: 'Replaces passive "Participated in" with Senior SRE leadership and MTTR telemetry.',
          impactCategory: 'Leadership',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['Kubernetes', 'AWS EKS', 'GKE', 'Terraform', 'ArgoCD', 'Prometheus', 'Grafana', 'Go', 'Python', 'Ansible', 'Datadog'],
        missingCrucialKeywords: ['SLIs / SLOs', 'Error Budgets', 'OpenTelemetry', 'MTTR', 'Custom Kubernetes Operators'],
        recommendedAdditions: ['Karpenter', 'Cilium eBPF', 'Chaos Mesh', 'Crossplane'],
        jobDescriptionMatchPercentage: 85,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'All contact fields present and clear.',
          improvements: 'Add GitHub link for Terraform/Go modules.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'excellent',
          positiveNotes: 'Crisp multi-cloud SRE positioning.',
          improvements: 'Mention CKA certification and uptime SLA track record.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'adequate',
          positiveNotes: 'Strong EKS and ArgoCD experience.',
          improvements: 'Quantify deployment frequency, MTTR, and cloud cost savings.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'Great grouping of Cloud, IaC/GitOps, Observability, and Languages.',
          improvements: 'Add OpenTelemetry and Kubernetes Operators.',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'CKA + HashiCorp Terraform Associate are gold-standard SRE credentials.',
          improvements: 'None needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Clear single-column visual structure.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'Complete contact header detected.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard headings detected accurately.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: false,
          details: 'Scanned image resume (.png); convert to searchable text PDF for maximum ATS compatibility.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year dates.',
        },
      ],
      estimatedYoe: '4.5 years',
      topSkillsIdentified: ['Kubernetes (CKA)', 'AWS EKS', 'Terraform', 'ArgoCD GitOps', 'Prometheus & Grafana', 'Go', 'Python', 'Docker'],
      analysisTimeMs: 390,
      detectedFormat: 'Photo Scan (PNG Multimodal OCR)',
    },
  },
  {
    id: 'pm-lead',
    name: 'Sophia Zhang',
    role: 'Product Manager (B2B SaaS)',
    level: 'Mid-Senior (5 YOE)',
    formatType: 'pdf',
    formatBadge: 'PDF Document',
    visualStyle: 'clean-pdf',
    location: 'New York, NY',
    phone: '(917) 555-8392',
    email: 'sophia.zhang@email.com',
    linkedin: 'linkedin.com/in/sophiazhang-pm',
    tagline:
      'Great product strategy and stakeholder management, needs tighter technical ATS alignment',
    targetJobTitle: 'Senior Product Manager - Enterprise SaaS & AI Workflow',
    targetJobDescription: `We are looking for a Senior Product Manager to own our automated workflow automation platform.
Requirements:
- 4-7 years of product management experience in B2B enterprise software or workflow automation.
- Proven track record driving product-led growth (PLG), customer retention (NDR), and reducing churn.
- Experience running discovery sprints, defining user personas, and crafting detailed PRDs.
- Data-driven mindset: proficient in SQL, Mixpanel, Amplitude, and A/B testing methodologies.
- Technical fluency communicating with engineering architects and enterprise IT buyers.`,
    resumeText: `SOPHIA ZHANG
New York, NY | (917) 555-8392 | sophia.zhang@email.com | linkedin.com/in/sophiazhang-pm

EXECUTIVE PROFILE
Data-driven Product Manager with 5 years of experience scaling enterprise SaaS tools from zero to $12M ARR. Adept at translating ambiguous customer friction into clear engineering specifications, running high-velocity experiment loops, and aligning cross-functional teams across Sales, Design, and Engineering.

CORE COMPETENCIES
Product Strategy, User Research, Agile/Scrum, PRD Authoring, Roadmapping, A/B Testing, Feature Prioritization, Customer Discovery, SQL, Amplitude, Jira, Figma

EXPERIENCE

Lead Product Manager | Omnisync SaaS | New York, NY
Jan 2023 - Present
- Spearheaded the launch of an automated workflow engine, driving 34% increase in user activation within 90 days.
- Conducted 60+ customer interviews with Fortune 500 IT leads to identify high-value integration opportunities.
- Partnered with engineering leads to scope milestones and run 2-week agile sprints.
- Designed product telemetry dashboards in Amplitude tracking feature adoption and retention.
- Reduced onboarding drop-off by 22% through self-service walkthrough optimization.

Product Manager | TalentPulse Technologies | Boston, MA
Aug 2020 - Dec 2022
- Managed the applicant tracking suite used by 450+ mid-market corporate recruiting teams.
- Led cross-functional team of 8 engineers and 2 UX designers across end-to-end delivery cycles.
- Increased Net Revenue Retention (NRR) from 104% to 118% via enterprise collaboration add-ons.
- Executed 15+ A/B conversion tests that boosted monthly trial-to-paid conversion by 18%.
- Authored detailed product requirement documents (PRDs) and user journey diagrams.

Associate Product Manager | VentureLoop | Boston, MA
June 2019 - July 2020
- Supported senior product leaders in competitive landscape analysis and pricing tier experiments.
- Tracked core KPIs and resolved customer support escalations with engineering.

EDUCATION & CERTIFICATIONS
B.S. in Business Administration & Information Systems | Boston University
Pragmatic Institute Certified (PMC-III)`,
    precomputedAnalysis: {
      candidateName: 'Sophia Zhang',
      detectedRole: 'Lead Product Manager (B2B SaaS)',
      targetRoleMatch: 'High alignment (89%) with Senior PM - Enterprise SaaS; strong ARR, NRR, and activation metrics.',
      overallScore: 88,
      scoreLabel: 'Exceptional',
      executiveSummary:
        'Standout B2B SaaS Product Manager resume with quantified commercial wins ($12M ARR scale, +34% activation, NRR lifted from 104% to 118%). Explicitly adding "Product-Led Growth (PLG)", "Mixpanel", and "Churn Reduction" will bring keyword match near 100%.',
      categoryScores: {
        atsParsability: {
          score: 94,
          feedback: 'Clean single-column structure with standard section titles and clear date formatting.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 91,
          feedback: 'Strong commercial metrics ($12M ARR, 34% activation, 118% NRR, 18% conversion lift).',
          status: 'good',
        },
        actionVerbs: {
          score: 86,
          feedback: 'Strong leadership verbs ("Spearheaded", "Increased", "Executed").',
          status: 'good',
        },
        keywordMatch: {
          score: 82,
          feedback: 'Matches B2B SaaS, PRDs, SQL, Amplitude, A/B Testing; missing exact "Product-Led Growth (PLG)", "Mixpanel", and "Churn".',
          status: 'good',
        },
        formattingReadability: {
          score: 89,
          feedback: 'Crisp 1-line bullets that scan effortlessly in a 6-second recruiter review.',
          status: 'good',
        },
      },
      strengths: [
        'Quantified revenue and retention metrics ($12M ARR, 104% to 118% NRR, +18% trial-to-paid conversion)',
        'Direct workflow automation domain experience at Omnisync SaaS',
        'Strong customer discovery rigor (60+ Fortune 500 IT buyer interviews)',
      ],
      weaknesses: [
        'Missing the exact acronym "PLG (Product-Led Growth)" despite describing self-service onboarding wins',
        'Target JD mentions Mixpanel and Churn Reduction, which are implied but not explicitly stated',
      ],
      criticalFixes: [
        {
          title: 'Include Explicit "Product-Led Growth (PLG)" Keyword',
          section: 'Experience / Competencies',
          issue: 'You reduced onboarding drop-off by 22% via self-service walkthroughs, which is textbook PLG, but the keyword "PLG" is missing.',
          recommendation: 'Label the self-service walkthrough and trial-to-paid experiments explicitly as "Product-Led Growth (PLG)" initiatives.',
          priority: 'high',
        },
        {
          title: 'Quantify Outcome of Agile Sprint & Telemetry Bullets',
          section: 'Experience',
          issue: '"Partnered with engineering leads to scope milestones" and "Designed product telemetry dashboards" lack measurable outcomes.',
          recommendation: 'Add on-time release predictability % and how telemetry insights reduced logo churn.',
          priority: 'medium',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Reduced onboarding drop-off by 22% through self-service walkthrough optimization.',
          improved: 'Championed a Product-Led Growth (PLG) self-service onboarding redesign using Amplitude funnel cohorts, cutting user drop-off by 22% and accelerating time-to-value from 14 days to 3 days.',
          explanation: 'Injects the required PLG keyword and quantifies time-to-value improvement.',
          impactCategory: 'Metrics & Scale',
        },
        {
          original: 'Partnered with engineering leads to scope milestones and run 2-week agile sprints.',
          improved: 'Aligned a 12-person engineering and design pod across 2-week Agile sprints, achieving 94% roadmap delivery predictability across 4 major enterprise releases.',
          explanation: 'Turns a generic responsibility into measurable execution predictability.',
          impactCategory: 'Leadership',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['B2B Enterprise SaaS', 'Workflow Automation', 'PRDs', 'SQL', 'Amplitude', 'A/B Testing', 'Customer Discovery', 'NRR'],
        missingCrucialKeywords: ['Product-Led Growth (PLG)', 'Mixpanel', 'Churn Reduction', 'User Personas'],
        recommendedAdditions: ['AI Agent Workflows', 'Pendo', 'API Platform Strategy', 'OKR Planning'],
        jobDescriptionMatchPercentage: 89,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'Clean and complete.',
          improvements: 'Optional link to product portfolio or case studies.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'excellent',
          positiveNotes: 'Opens immediately with $12M ARR scale.',
          improvements: 'Add PLG and AI workflow specialization.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'excellent',
          positiveNotes: 'Packed with high-signal SaaS metrics.',
          improvements: 'Quantify the engineering sprint and telemetry bullets.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'Balances product methodology and analytics tools.',
          improvements: 'Add PLG, Mixpanel, and LLM/AI Product Management.',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'B.S. in Business & IS + Pragmatic Institute PMC-III certification.',
          improvements: 'None needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Single-column structure passes all ATS parsers.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'Complete contact block.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard Experience and Education headings.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: true,
          details: 'Clean text layer.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year formatting.',
        },
      ],
      estimatedYoe: '5 years',
      topSkillsIdentified: ['B2B SaaS Strategy', 'Workflow Automation', 'NRR & Growth', 'A/B Experimentation', 'SQL', 'Amplitude', 'PRD Authoring', 'Agile Leadership'],
      analysisTimeMs: 340,
      detectedFormat: 'PDF Document',
    },
  },
  {
    id: 'data-analyst',
    name: 'Marcus Vance',
    role: 'Data Analyst & BI Specialist',
    level: 'Entry-Mid (2.5 YOE)',
    formatType: 'text',
    formatBadge: 'Plain Text (.txt)',
    visualStyle: 'plain-text',
    location: 'Chicago, IL',
    phone: '(312) 555-4810',
    email: 'marcus.vance@email.com',
    linkedin: 'github.com/marcusv-data',
    tagline:
      'Solid SQL and dashboard skills, needs stronger quantified impact verbs and statistical rigor',
    targetJobTitle: 'Senior Data & Business Intelligence Analyst',
    targetJobDescription: `Seeking an experienced Data Analyst to turn complex transaction data into actionable strategic insights.
Key Requirements:
- Advanced SQL proficiency (window functions, query optimization, CTEs) and Python/R for data analysis.
- Proven experience building executive dashboards in Tableau or Power BI.
- Experience with cloud data warehouses (Snowflake, BigQuery, or Redshift) and dbt data modeling.
- Track record of identifying cost-saving or revenue-generating opportunities through statistical analysis.
- Strong stakeholder presentation skills communicating findings to C-suite and VP leadership.`,
    resumeText: `MARCUS VANCE
Chicago, IL | (312) 555-4810 | marcus.vance@email.com | github.com/marcusv-data

SUMMARY
Detail-oriented Data Analyst with 2.5 years of experience utilizing SQL, Python, and Tableau to extract meaningful business insights. Experienced in automating reporting workflows and data cleansing for marketing and sales teams.

SKILLS
- Languages: SQL (PostgreSQL, MySQL), Python (pandas, numpy, matplotlib), R
- BI Tools: Tableau, Power BI, Metabase, Excel (VLOOKUP, Pivot Tables)
- Data Tools: Snowflake, Git, dbt, ETL fundamentals

WORK HISTORY

Data Analyst | Meridian Retail Analytics | Chicago, IL
Nov 2022 - Present
- Responsible for querying large customer transaction datasets using SQL to find sales trends.
- Built interactive Tableau dashboards for regional sales managers updated weekly.
- Cleaned and prepared raw CSV datasets in Python using pandas to ensure reporting accuracy.
- Worked on marketing attribution reports and presented charts in monthly team meetings.
- Helped automate daily sales email reports using Python scripts, saving team manual effort.

Junior Data Analyst | Apex Media Group | Chicago, IL
June 2021 - Oct 2022
- Extracted advertising campaign metrics from Google Ads and Facebook Ads APIs.
- Maintained Excel spreadsheets and tracked customer acquisition cost across multiple channels.
- Created slide decks summarizing quarterly campaign performance for account managers.
- Answered ad-hoc data questions for marketing team members.

EDUCATION
B.A. in Economics, Minor in Applied Statistics
University of Illinois Urbana-Champaign, 2021`,
    precomputedAnalysis: {
      candidateName: 'Marcus Vance',
      detectedRole: 'Data Analyst & BI Specialist',
      targetRoleMatch: 'Good foundational tool match (72%), but lacks quantified revenue/cost impact and LinkedIn profile URL.',
      overallScore: 66,
      scoreLabel: 'Needs Optimization',
      executiveSummary:
        'Marcus has the right core technical stack (SQL, Python, Tableau, Snowflake, dbt), but the resume reads like a job description rather than an achievement record. Replacing passive verbs ("Responsible for", "Helped automate") with hard numbers (hours saved, dataset row volume, revenue uncovered) is essential.',
      categoryScores: {
        atsParsability: {
          score: 84,
          feedback: 'Clean structure, though LinkedIn URL is missing from the contact header.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 42,
          feedback: 'Zero quantified metrics across 9 experience bullets—no dataset sizes, hours saved, or CAC improvements.',
          status: 'critical',
        },
        actionVerbs: {
          score: 58,
          feedback: 'Overuses weak openers: "Responsible for", "Worked on", "Helped automate", "Answered".',
          status: 'warning',
        },
        keywordMatch: {
          score: 75,
          feedback: 'Matches SQL, Python, R, Tableau, Power BI, Snowflake, and dbt; missing CTEs, Window Functions, and C-Suite presentation.',
          status: 'warning',
        },
        formattingReadability: {
          score: 82,
          feedback: 'Concise layout with clear chronological order.',
          status: 'good',
        },
      },
      strengths: [
        'Strong modern data stack coverage (SQL, Python pandas, Tableau, Power BI, Snowflake, dbt)',
        'Economics & Applied Statistics academic background fits quantitative analysis',
      ],
      weaknesses: [
        'Complete absence of numbers, percentages, or dollar figures in Work History',
        'Missing LinkedIn URL in header',
        'Passive phrasing ("Helped automate", "Responsible for querying") undermines seniority',
      ],
      criticalFixes: [
        {
          title: 'Quantify Python Report Automation & Dataset Scale',
          section: 'Work History',
          issue: '"Helped automate daily sales email reports... saving team manual effort" lacks hours saved and stakeholder count.',
          recommendation: 'State the exact hours saved per week (e.g., 14 hrs/week) and the number of sales leaders served.',
          priority: 'high',
        },
        {
          title: 'Highlight Advanced SQL (CTEs, Window Functions) & Snowflake/dbt',
          section: 'Work History',
          issue: 'Snowflake and dbt are listed in Skills but never mentioned in Work History bullets.',
          recommendation: 'Show how you used dbt models and SQL window functions in Snowflake at Meridian Retail Analytics.',
          priority: 'high',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Helped automate daily sales email reports using Python scripts, saving team manual effort.',
          improved: 'Automated daily KPI ingestion and executive email reporting using Python (pandas) and Snowflake tasks, eliminating 12 hours of manual spreadsheet work weekly across 35 regional managers.',
          explanation: 'Quantifies weekly time savings and integrates Snowflake.',
          impactCategory: 'Efficiency & ROI',
        },
        {
          original: 'Responsible for querying large customer transaction datasets using SQL to find sales trends.',
          improved: 'Engineered complex SQL queries utilizing window functions and CTEs across 40M+ Snowflake transaction rows, uncovering a seasonal churn pattern that recovered $420K in annual retail revenue.',
          explanation: 'Adds dataset scale (40M+ rows), advanced SQL keywords, and revenue impact.',
          impactCategory: 'Metrics & Scale',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['SQL', 'Python', 'R', 'Tableau', 'Power BI', 'Snowflake', 'dbt', 'Applied Statistics'],
        missingCrucialKeywords: ['Window Functions', 'CTEs', 'Query Optimization', 'C-Suite / VP Presentations', 'BigQuery / Redshift'],
        recommendedAdditions: ['Apache Airflow', 'Looker', 'A/B Hypothesis Testing', 'Cohort Retention Analysis'],
        jobDescriptionMatchPercentage: 72,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'adequate',
          positiveNotes: 'Includes location, phone, email, and GitHub.',
          improvements: 'Add a LinkedIn profile URL.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'adequate',
          positiveNotes: 'Clear 2.5 YOE and core tools.',
          improvements: 'Add a headline business impact metric.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'needs_work',
          positiveNotes: 'Clear progression from Junior to Data Analyst.',
          improvements: 'Every bullet needs a metric (rows queried, % accuracy gain, hours saved, or $ impact).',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'Well-organized into Languages, BI Tools, and Data Tools.',
          improvements: 'Specify SQL Window Functions and CTEs.',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'UIUC Economics + Applied Statistics minor is strong.',
          improvements: 'None needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Single-column text layout.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: false,
          details: 'Missing LinkedIn URL in contact header.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard Summary, Skills, Work History, and Education headings.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: true,
          details: 'Clean plain text.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year dates.',
        },
      ],
      estimatedYoe: '2.5 years',
      topSkillsIdentified: ['SQL', 'Python (pandas)', 'Tableau', 'Power BI', 'Snowflake', 'dbt', 'R', 'Applied Statistics'],
      analysisTimeMs: 290,
      detectedFormat: 'Plain Text (.txt)',
    },
  },
  {
    id: 'vp-growth-docx',
    name: 'Olivia Sterling',
    role: 'VP of Growth Marketing & Revenue Operations',
    level: 'Executive (10 YOE)',
    formatType: 'docx',
    formatBadge: 'DOCX Document',
    visualStyle: 'executive-docx',
    location: 'Boston, MA',
    phone: '(617) 555-0319',
    email: 'olivia.sterling@execgrowth.com',
    linkedin: 'linkedin.com/in/oliviasterling-vp',
    tagline:
      'Executive DOCX brief with $85M pipeline ownership; needs stronger AI GTM automation and board-level CAC/LTV framing.',
    targetJobTitle: 'VP of Marketing & Revenue Growth (Series C Enterprise AI)',
    targetJobDescription: `Seeking a VP of Marketing & Revenue Growth to scale our Series C Enterprise AI platform from $35M to $100M ARR.
Requirements:
- 8+ years in B2B SaaS growth marketing, demand generation, and Revenue Operations (RevOps).
- Proven track record owning $50M+ qualified pipeline, CAC payback optimization, and LTV:CAC ratio > 4x.
- Deep expertise in Account-Based Marketing (ABM), PLG-to-Enterprise motion, HubSpot/Salesforce, and 6sense.
- Executive leadership scaling global marketing teams (15+ FTEs) and partnering with CRO/CEO on board reporting.`,
    resumeText: `OLIVIA STERLING
Boston, MA | (617) 555-0319 | olivia.sterling@execgrowth.com | linkedin.com/in/oliviasterling-vp

EXECUTIVE PROFILE
Revenue-focused VP of Growth & Demand Generation with 10 years of experience scaling B2B SaaS companies from Series B through IPO readiness. Proven track record building high-converting Account-Based Marketing (ABM) engines, aligning Sales and Marketing RevOps, and generating $85M+ in qualified enterprise pipeline.

CORE COMPETENCIES
Enterprise Demand Generation, Account-Based Marketing (ABM), Revenue Operations (RevOps), Pipeline Velocity, Multi-Touch Attribution, Team Leadership, Salesforce, HubSpot, 6sense, Marketo, Board Reporting

PROFESSIONAL EXPERIENCE

VP of Growth Marketing | ScaleOps Enterprise | Boston, MA
March 2022 - Present
- Scaled annual qualified sales pipeline from $28M to $85M over 24 months while reducing blended Customer Acquisition Cost (CAC) by 19%.
- Built and led a 16-person global marketing organization spanning Demand Gen, Product Marketing, ABM, and RevOps.
- Implemented intent-driven ABM campaigns using 6sense and Salesforce, increasing Fortune 1000 enterprise deal velocity by 31%.
- Partnered with the CRO and CFO on quarterly board decks, forecasting marketing-sourced ARR and pipeline coverage.

Director of Demand Generation | CloudVault Security | New York, NY
May 2018 - February 2022
- Owned a $6.5M annual paid media and field events budget, delivering a 5.2x return on ad spend (ROAS).
- Redesigned MQL-to-SQL lead scoring in Marketo and Salesforce, lifting SDR conversion rates from 14% to 29%.

EDUCATION
M.B.A. in Marketing & Strategy | Kellogg School of Management, Northwestern University`,
    precomputedAnalysis: {
      candidateName: 'Olivia Sterling',
      detectedRole: 'VP of Growth Marketing & Revenue Operations',
      targetRoleMatch: 'Exceptional Executive match (91%) with strong pipeline ($85M) and team leadership (16 FTEs) metrics.',
      overallScore: 91,
      scoreLabel: 'Exceptional',
      executiveSummary:
        'Executive-ready VP profile with clear board-level metrics ($28M to $85M pipeline growth, -19% CAC, 16-person team, 5.2x ROAS). Adding explicit LTV:CAC ratio figures, CAC payback months, and PLG-to-Enterprise funnel bridging will make this a 96+ score.',
      categoryScores: {
        atsParsability: {
          score: 95,
          feedback: 'Clean DOCX structure with crisp executive hierarchy and complete contact details.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 94,
          feedback: 'Outstanding commercial numbers ($85M pipeline, -19% CAC, 31% deal velocity, 5.2x ROAS).',
          status: 'good',
        },
        actionVerbs: {
          score: 90,
          feedback: 'Commanding executive verbs ("Scaled", "Built and led", "Implemented", "Owned").',
          status: 'good',
        },
        keywordMatch: {
          score: 86,
          feedback: 'Matches ABM, RevOps, 6sense, Salesforce, HubSpot, Board Reporting; missing explicit LTV:CAC ratio and PLG-to-Enterprise.',
          status: 'good',
        },
        formattingReadability: {
          score: 90,
          feedback: 'High-impact executive brief format.',
          status: 'good',
        },
      },
      strengths: [
        'Verified $28M to $85M enterprise pipeline expansion with simultaneous 19% CAC reduction',
        'Executive org leadership (16 FTEs across 4 functions) and direct CRO/CFO board reporting',
        'Kellogg MBA + modern enterprise GTM stack (6sense, Salesforce, HubSpot, Marketo)',
      ],
      weaknesses: [
        'Missing explicit LTV:CAC ratio (>4x) and CAC payback period in months required by Series C board JD',
        'Does not mention PLG-to-Enterprise self-serve conversion motion',
      ],
      criticalFixes: [
        {
          title: 'Include LTV:CAC Ratio & Payback Period Metrics',
          section: 'Experience',
          issue: 'Series C executive search committees screen specifically for LTV:CAC ratio and payback period.',
          recommendation: 'Add LTV:CAC ratio (e.g., 4.6x) and CAC payback reduction (e.g., from 18 to 13 months) to the first ScaleOps bullet.',
          priority: 'medium',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Partnered with the CRO and CFO on quarterly board decks, forecasting marketing-sourced ARR and pipeline coverage.',
          improved: 'Co-authored quarterly Series C Board of Directors GTM reviews with the CRO and CFO, maintaining 3.8x pipeline coverage and improving LTV:CAC ratio from 3.1x to 4.7x.',
          explanation: 'Adds concrete pipeline coverage and the exact LTV:CAC metric requested in the target JD.',
          impactCategory: 'Executive ROI',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['Demand Generation', 'RevOps', 'ABM', '6sense', 'Salesforce', 'HubSpot', 'Board Reporting', 'CAC Optimization'],
        missingCrucialKeywords: ['LTV:CAC Ratio', 'CAC Payback Period', 'PLG-to-Enterprise Motion', 'AI GTM Automation'],
        recommendedAdditions: ['Clay / AI Outbound', 'Gong Revenue Intelligence', 'Clari Forecasting'],
        jobDescriptionMatchPercentage: 91,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'Complete executive contact block.',
          improvements: 'None needed.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'excellent',
          positiveNotes: 'Strong $85M pipeline anchor.',
          improvements: 'Mention AI GTM and PLG-to-Enterprise motion.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'excellent',
          positiveNotes: 'Every bullet carries clear commercial weight.',
          improvements: 'Add LTV:CAC and payback period to the board reporting bullet.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'Strong RevOps and MarTech coverage.',
          improvements: 'None needed.',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'Kellogg MBA.',
          improvements: 'None needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Clean DOCX paragraph structure.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'All contact fields verified.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard executive headings.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: true,
          details: 'Extracted cleanly from DOCX XML stream.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year dates.',
        },
      ],
      estimatedYoe: '10 years',
      topSkillsIdentified: ['Enterprise Demand Gen', 'RevOps', 'ABM (6sense)', 'Pipeline Scaling ($85M)', 'Salesforce & Marketo', 'CAC & ROAS Optimization', 'Board Reporting', 'Team Leadership'],
      analysisTimeMs: 320,
      detectedFormat: 'DOCX Word Document',
    },
  },
  {
    id: 'cyber-secops-photo',
    name: 'Lucas Chen',
    role: 'Cybersecurity & Cloud SecOps Analyst',
    level: 'Entry-Mid (2 YOE)',
    formatType: 'photo',
    formatBadge: 'Photo Scan (WEBP)',
    visualStyle: 'camera-photo',
    location: 'Reston, VA',
    phone: '(703) 555-0644',
    email: 'lucas.chen@secops.io',
    linkedin: 'linkedin.com/in/lucaschen-sec',
    tagline:
      'Scanned photo resume with CompTIA Security+ and SIEM experience; needs quantified incident triage SLA and SOAR automation metrics.',
    targetJobTitle: 'Cloud Security & SOC Engineer (AWS & CrowdStrike/Splunk)',
    targetJobDescription: `Seeking a Cloud Security & SOC Engineer to defend our cloud infrastructure and automate threat detection.
Requirements:
- 2+ years in SOC threat detection, incident response, or Cloud Security (AWS IAM, GuardDuty, SecurityHub).
- Hands-on experience with Splunk ES, CrowdStrike Falcon EDR, and SOAR playbook automation (Python).
- Familiarity with MITRE ATT&CK framework, NIST 800-53, and SOC2 Type II compliance audits.
- Security certifications such as CompTIA Security+, CySA+, or AWS Certified Security.`,
    resumeText: `LUCAS CHEN
Reston, VA | (703) 555-0644 | lucas.chen@secops.io | linkedin.com/in/lucaschen-sec

SUMMARY
Cybersecurity & SOC Analyst with 2 years of experience monitoring enterprise SIEM alerts, investigating endpoint threats, and hardening AWS cloud environments mapped to the MITRE ATT&CK framework.

TECHNICAL SKILLS
Security Tools: Splunk Enterprise Security, CrowdStrike Falcon EDR, Wireshark, Nessus, Burp Suite
Cloud & Compliance: AWS (IAM, GuardDuty, CloudTrail, SecurityHub), MITRE ATT&CK, NIST 800-53, SOC2
Scripting: Python, Bash, PowerShell, KQL, Sigma Rules

WORK EXPERIENCE

SOC Security Analyst | CyberShield Defense | Reston, VA
June 2024 - Present
- Monitored Splunk SIEM and CrowdStrike EDR alerts across 4,500 corporate endpoints to detect malware and phishing attacks.
- Wrote custom Sigma detection rules mapped to MITRE ATT&CK techniques to catch credential dumping.
- Worked on Python SOAR playbooks to automate IP reputation lookups and phishing email quarantine.
- Assisted senior incident responders with forensic disk and memory triage during security incidents.

Security Operations Intern | Vanguard Federal IT | Arlington, VA
May 2023 - May 2024
- Ran weekly Nessus vulnerability scans across 200+ Linux and Windows servers and tracked patching compliance.
- Helped audit AWS IAM roles and S3 bucket policies for SOC2 Type II readiness.

EDUCATION & CERTIFICATIONS
B.S. in Cybersecurity | George Mason University, 2024
CompTIA Security+ (SY0-701) | AWS Certified Cloud Practitioner`,
    precomputedAnalysis: {
      candidateName: 'Lucas Chen',
      detectedRole: 'Cybersecurity & Cloud SecOps Analyst',
      targetRoleMatch: 'Strong entry-mid keyword match (87%) covering Splunk, CrowdStrike, AWS SecurityHub, and MITRE ATT&CK.',
      overallScore: 77,
      scoreLabel: 'Competitive',
      executiveSummary:
        'Strong early-career cybersecurity resume with exact tool alignment (Splunk, CrowdStrike, AWS GuardDuty/SecurityHub, MITRE ATT&CK, Security+). Quantifying false-positive reduction rates and SOAR triage time savings will elevate this profile into the 88+ tier.',
      categoryScores: {
        atsParsability: {
          score: 80,
          feedback: 'Scanned photo parsed cleanly via OCR; upload a native PDF when applying through corporate ATS portals.',
          status: 'good',
        },
        quantifiableImpact: {
          score: 66,
          feedback: 'Includes endpoint (4,500) and server (200+) scale, but lacks MTTD/MTTR minutes and false-positive reduction %.',
          status: 'warning',
        },
        actionVerbs: {
          score: 72,
          feedback: 'Contains passive phrases ("Worked on", "Assisted", "Helped audit").',
          status: 'warning',
        },
        keywordMatch: {
          score: 90,
          feedback: 'Matches Splunk, CrowdStrike, SOAR, Python, AWS IAM/GuardDuty/SecurityHub, MITRE ATT&CK, NIST 800-53, SOC2, and Security+.',
          status: 'good',
        },
        formattingReadability: {
          score: 84,
          feedback: 'Clean layout with clear security tool grouping.',
          status: 'good',
        },
      },
      strengths: [
        '90% keyword match with target Cloud Security & SOC Engineer job description',
        'Quantified environment scope (4,500 endpoints, 200+ servers)',
        'B.S. in Cybersecurity + CompTIA Security+ certification',
      ],
      weaknesses: [
        'SOAR automation bullet ("Worked on Python SOAR playbooks") lacks time saved per alert',
        'Sigma detection rule bullet does not mention false-positive rate reduction',
      ],
      criticalFixes: [
        {
          title: 'Quantify Python SOAR Playbook Triage Speed',
          section: 'Experience',
          issue: '"Worked on Python SOAR playbooks to automate IP reputation lookups" misses the measurable SOC efficiency gain.',
          recommendation: 'Specify how much Mean Time To Respond (MTTR) dropped per phishing ticket (e.g., from 25 mins to 90 seconds).',
          priority: 'high',
        },
      ],
      bulletEnhancements: [
        {
          original: 'Worked on Python SOAR playbooks to automate IP reputation lookups and phishing email quarantine.',
          improved: 'Engineered automated Python SOAR playbooks integrating VirusTotal and CrowdStrike APIs, cutting Tier-1 phishing triage time by 88% (from 22 minutes to 2.5 minutes per alert) across 600+ monthly tickets.',
          explanation: 'Quantifies SOC analyst time saved and monthly ticket volume.',
          impactCategory: 'Efficiency & ROI',
        },
      ],
      keywordAnalysis: {
        matchedKeywords: ['Splunk ES', 'CrowdStrike Falcon EDR', 'Python SOAR', 'AWS IAM', 'GuardDuty', 'SecurityHub', 'MITRE ATT&CK', 'NIST 800-53', 'SOC2', 'CompTIA Security+'],
        missingCrucialKeywords: ['MTTD / MTTR Metrics', 'CySA+ / AWS Security Specialty', 'Terraform Security'],
        recommendedAdditions: ['SentinelOne', 'Palo Alto Cortex XSOAR', 'Wiz Cloud Security'],
        jobDescriptionMatchPercentage: 87,
      },
      sectionEvaluations: [
        {
          sectionName: 'Header & Contact Details',
          rating: 'excellent',
          positiveNotes: 'Complete contact block.',
          improvements: 'None needed.',
        },
        {
          sectionName: 'Professional Summary',
          rating: 'excellent',
          positiveNotes: 'Directly highlights SIEM, EDR, AWS, and MITRE ATT&CK.',
          improvements: 'None needed.',
        },
        {
          sectionName: 'Work Experience & Achievements',
          rating: 'adequate',
          positiveNotes: 'Strong tools and scope.',
          improvements: 'Add MTTD/MTTR and false-positive reduction percentages.',
        },
        {
          sectionName: 'Skills & Technologies',
          rating: 'excellent',
          positiveNotes: 'High-signal security tool taxonomy.',
          improvements: 'None needed.',
        },
        {
          sectionName: 'Education & Credentials',
          rating: 'excellent',
          positiveNotes: 'B.S. Cybersecurity + CompTIA Security+.',
          improvements: 'None needed.',
        },
      ],
      atsComplianceChecklist: [
        {
          item: 'Clean standard fonts & single-column flow',
          passed: true,
          details: 'Single-column visual layout.',
        },
        {
          item: 'Contact information completeness (Email, Phone, LinkedIn)',
          passed: true,
          details: 'All contact fields present.',
        },
        {
          item: 'Recognized standard section headings',
          passed: true,
          details: 'Standard headings.',
        },
        {
          item: 'No text embedded inside complex images or tables',
          passed: false,
          details: 'Scanned photo format; export as searchable PDF for traditional ATS portals.',
        },
        {
          item: 'Consistent employment date formats (Month Year - Month Year)',
          passed: true,
          details: 'Consistent Month Year dates.',
        },
      ],
      estimatedYoe: '2 years',
      topSkillsIdentified: ['Splunk SIEM', 'CrowdStrike EDR', 'AWS SecurityHub & GuardDuty', 'Python SOAR', 'MITRE ATT&CK', 'SOC2 & NIST 800-53', 'Sigma Rules', 'CompTIA Security+'],
      analysisTimeMs: 360,
      detectedFormat: 'Photo Scan (WEBP Multimodal OCR)',
    },
  },
];
