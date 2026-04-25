# Chapter 2: Requirement Analysis

## 2.1 Introduction

The increasing sophistication of supply chain attacks in open-source software ecosystems (NPM and PyPI) necessitates a robust, intelligent threat detection and remediation platform. SCALA-Guard is a comprehensive full-stack capstone project designed to address critical vulnerabilities in package management systems through behavioral analysis, machine learning-assisted risk scoring, and LLM-powered automated remediation.

This chapter provides a detailed analysis of the functional and non-functional requirements that drive the development of SCALA-Guard. The requirement analysis phase is crucial in establishing a clear understanding of what the system must accomplish, who will use it, what infrastructure is needed, and how it will integrate into existing development workflows. By systematically documenting these requirements, we establish the foundation for architectural design, implementation decisions, and success metrics for the project.

The SCALA-Guard platform serves multiple stakeholder groups, including security researchers, development teams, DevOps engineers, and system administrators. Each stakeholder has distinct needs and expectations from the system, which are comprehensively detailed in subsequent sections of this chapter.

---

## 2.2 Software Development Life Cycle (SDLC)

The SCALA-Guard project follows a hybrid Software Development Life Cycle (SDLC) model that combines elements of **Agile methodology** with **structured requirement analysis** principles. This approach ensures flexibility during development while maintaining rigorous documentation and quality assurance standards.

### 2.2.1 SDLC Phases

**Phase 1: Requirements Gathering & Analysis (Current)**
- Stakeholder interviews and use case identification
- Requirement elicitation from threat intelligence domain
- Documentation of functional and non-functional requirements
- Risk assessment and feasibility analysis

**Phase 2: System Design & Architecture**
- High-level architecture design (frontend, backend, ML engine, LLM integration)
- Database schema design
- API endpoint specification
- Security architecture and sandbox design
- User interface (UI) wireframing and prototyping

**Phase 3: Implementation & Development**
- Backend FastAPI development with behavioral analysis pipeline
- Frontend React + TypeScript interface development
- ML model training and integration (Random Forest/XGBoost)
- DeepSeek API integration for automated remediation
- Docker containerization for sandbox environments

**Phase 4: Testing & Quality Assurance**
- Unit testing for individual modules (analyzer, predictor, remediation)
- Integration testing for API endpoints
- Performance testing for batch processing
- Security testing (penetration testing, vulnerability scanning)
- User acceptance testing (UAT) with stakeholders

**Phase 5: Deployment & Maintenance**
- CI/CD pipeline configuration
- Production environment setup
- Documentation and knowledge transfer
- Monitoring and performance optimization
- Continuous improvement and feature enhancement

### 2.2.2 Development Methodology

**Agile Sprints:** The project is organized into 2-week development sprints, each focusing on delivering incremental features that provide measurable value.

**Continuous Integration/Continuous Deployment (CI/CD):** Automated testing and deployment pipelines ensure code quality and rapid iteration. GitHub Actions workflows validate all changes before merging to the main branch.

**Version Control:** Git-based version control with GitHub ensures collaborative development, code review, and change tracking.

**Documentation-Driven Development:** Requirements are documented in Markdown format within the repository, ensuring traceability and accessibility to all team members.

---

## 2.3 User Requirements

### 2.3.1 Functional Requirements for End Users

**FR1: Package Analysis & Scanning**
- **Description:** Users must be able to upload package files (ZIP, TAR.GZ, PDF, DOCX, CSV) or specify package names (NPM/PyPI) for real-time threat detection.
- **Success Criteria:** 
  - Analyze packages up to 20MB in size
  - Return risk scores and threat levels within 2-5 seconds
  - Support minimum 10 different file formats

**FR2: Interactive Risk Scoring Dashboard**
- **Description:** Users require a visual dashboard displaying Malicious/Benign probability percentages, confidence intervals, threat severity levels (HIGH, MEDIUM, LOW, SAFE), and contributing behavioral factors.
- **Success Criteria:**
  - Display risk score with ±X% confidence band
  - Color-coded threat level indicators
  - Historical trend analysis over time
  - Top malicious packages identification

**FR3: AI-Powered Remediation Suggestions**
- **Description:** For detected threats, the system must provide actionable remediation recommendations including safe package alternatives, code patches, CVE mappings, and isolation strategies via DeepSeek LLM API.
- **Success Criteria:**
  - Suggest at least 2 alternative packages per threat
  - Link relevant CVE entries with context
  - Provide implementation-ready patch recommendations
  - Explain isolation and deployment strategies

**FR4: Batch Audit Mode**
- **Description:** Users must be able to scan entire project dependency files (requirements.txt, package.json, CSV) for comprehensive supply chain security auditing.
- **Success Criteria:**
  - Process 100+ packages per minute
  - Generate consolidated threat report
  - Export results in multiple formats (JSON, CSV, PDF)

**FR5: Real-Time ML Predictions**
- **Description:** Users require a dedicated prediction interface for direct ML model queries with flexible input methods (manual entry, CSV upload, JSON arrays).
- **Success Criteria:**
  - Support single and batch predictions
  - Automatic feature validation and type conversion
  - Return risk labels, confidence scores, and feature statistics
  - Process batch submissions with 100+ records efficiently

**FR6: Explainability & Transparency**
- **Description:** Users must understand why packages receive specific risk scores through feature importance visualization, SHAP values, and decision rule highlights.
- **Success Criteria:**
  - Display top 5 contributing syscalls/network patterns
  - Show decision paths through ML model
  - Highlight triggering behavioral anomalies
  - Provide rule-based explanations in plain language

**FR7: Scan History & Result Comparison**
- **Description:** Users need persistent storage of historical scans with filtering, export, and comparative analysis capabilities.
- **Success Criteria:**
  - Store minimum 1000 scan records
  - Filter by date, risk level, package name, ecosystem
  - Compare multiple scans side-by-side
  - Export individual or aggregated reports

### 2.3.2 Non-Functional Requirements for End Users

**NFR1: Performance & Response Time**
- Single package analysis: <5 seconds
- Batch processing: 100 packages/minute
- API response time: <500ms for predictions
- Dashboard load time: <3 seconds

**NFR2: Reliability & Availability**
- System uptime: 99.5% (4.32 hours downtime/month)
- Graceful degradation when sandbox unavailable
- Automatic error recovery for failed analyses

**NFR3: Usability & User Experience**
- Intuitive navigation with minimal learning curve
- Clear status indicators and progress feedback
- Responsive design for desktop and tablet use
- Accessibility compliance (WCAG 2.1 Level AA)

**NFR4: Data Privacy & Security**
- HTTPS encryption for all data transmission
- No persistent storage of scanned package contents
- Secure API authentication (token-based)
- GDPR compliance for user data handling

**NFR5: Scalability**
- Support minimum 1000 concurrent users
- Horizontal scaling via load balancing
- Database query optimization for large result sets

---

## 2.4 Administrator Requirements

### 2.4.1 Functional Requirements for Administrators

**AR1: System Configuration & Settings**
- **Description:** Administrators must configure API keys, database connections, sandbox parameters, and ML model settings through an admin dashboard.
- **Success Criteria:**
  - Centralized configuration interface
  - Environment variable management
  - Model parameters adjustment (confidence thresholds, feature weights)
  - Audit logging for all configuration changes

**AR2: ML Model Management**
- **Description:** Administrators need to train, test, retrain, and deploy ML models with version control and rollback capabilities.
- **Success Criteria:**
  - One-click model retraining
  - A/B testing framework for model comparison
  - Version history with rollback capability
  - Performance metrics dashboard

**AR3: User & Access Management**
- **Description:** Administrators must manage user accounts, roles (analyst, admin, viewer), permissions, and audit trails.
- **Success Criteria:**
  - Role-based access control (RBAC)
  - Multi-factor authentication (MFA) support
  - API key generation and revocation
  - Detailed audit logs with timestamps and user identification

**AR4: System Monitoring & Health Checks**
- **Description:** Real-time monitoring of system performance, resource utilization, error rates, and service health status.
- **Success Criteria:**
  - CPU, memory, disk usage dashboards
  - Error rate tracking and alerting
  - API endpoint health status
  - Database connection monitoring

**AR5: Data Management & Cleanup**
- **Description:** Administrators must manage data retention policies, perform database backups, and cleanup old scan records.
- **Success Criteria:**
  - Configurable data retention policies
  - Automated daily backups
  - Bulk deletion of aged records
  - Data export for compliance

**AR6: Integration Management**
- **Description:** Configure and manage integrations with external services (DeepSeek API, Registry APIs, CI/CD platforms).
- **Success Criteria:**
  - API key securely stored and rotated
  - Integration status dashboard
  - Webhook configuration for CI/CD
  - Fallback mechanisms for service failures

### 2.4.2 Non-Functional Requirements for Administrators

**AR-NFR1: System Reliability**
- Automatic failover for critical services
- Data redundancy and backup verification
- Recovery time objective (RTO): <1 hour

**AR-NFR2: Maintainability**
- Comprehensive system documentation
- Log aggregation and centralization (ELK stack compatible)
- API documentation with Swagger/OpenAPI

**AR-NFR3: Observability**
- Prometheus metrics export
- Grafana dashboard templates
- Distributed tracing support
- Custom alert configuration

**AR-NFR4: Security Hardening**
- Regular security audits
- Vulnerability scanning in CI/CD
- Penetration testing annually
- Security patch management

---

## 2.5 Used Platforms and Tools

### 2.5.1 Development Platforms

| Platform | Version | Purpose |
|----------|---------|---------|
| **Python** | 3.10+ | Backend development language (93.8% of codebase) |
| **Node.js** | 18+ | Frontend runtime and package management |
| **PostgreSQL** | 13+ | Primary relational database for persistent storage |
| **Redis** | 6.0+ | Task queue and caching layer |
| **Docker** | Latest | Containerization and sandbox environments |

### 2.5.2 Backend Framework & Libraries

| Tool | Version | Purpose |
|------|---------|---------|
| **FastAPI** | 0.104+ | REST API framework with automatic OpenAPI documentation |
| **Scikit-learn** | 1.3+ | ML model implementation (Random Forest, XGBoost) |
| **Cython** | 0.29+ | Performance optimization for critical paths (4% of codebase) |
| **Pydantic** | 2.0+ | Data validation and serialization |
| **Alembic** | 1.12+ | Database migration management |
| **Requests** | 2.31+ | HTTP library for package registry APIs |

### 2.5.3 Frontend Framework & Libraries

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 18.2+ | UI component framework |
| **TypeScript** | 5.0+ | Static type checking for JavaScript |
| **Vite** | 4.4+ | Next-generation frontend build tool |
| **Tailwind CSS** | 3.3+ | Utility-first CSS framework for styling |
| **React Router** | 6.14+ | Client-side routing and navigation |
| **Axios** | 1.4+ | HTTP client for API communication |
| **Chart.js** | 4.4+ | Data visualization library for dashboards |

### 2.5.4 ML & Data Science Tools

| Tool | Purpose | Application |
|------|---------|-------------|
| **SHAP** (SHapley Additive exPlanations) | Feature importance & explainability | Decision transparency and auditability |
| **XGBoost** | Gradient boosting classifier | Ensemble ML predictions (alternative to RF) |
| **Pandas** | Data manipulation & analysis | Feature engineering and batch processing |
| **NumPy** | Numerical computing | Mathematical operations and matrix operations |
| **Matplotlib/Seaborn** | Data visualization | Research and analysis plots |

### 2.5.5 AI/LLM Integration

| Service | API | Purpose |
|---------|-----|---------|
| **DeepSeek** | RESTful API | LLM-powered remediation suggestions and code generation |

### 2.5.6 DevOps & Infrastructure

| Tool | Purpose |
|------|---------|
| **GitHub Actions** | CI/CD pipeline automation |
| **Docker Compose** | Multi-container orchestration for local development |
| **Kubernetes** | Optional production orchestration |
| **Nginx** | Reverse proxy and load balancing |
| **Prometheus** | Metrics collection and monitoring |
| **Grafana** | Visualization of system metrics |

### 2.5.7 Testing & Quality Assurance

| Tool | Purpose |
|------|---------|
| **pytest** | Python unit testing framework |
| **Jest** | JavaScript/TypeScript testing framework |
| **Postman** | API testing and documentation |
| **SonarQube** | Code quality analysis |
| **OWASP ZAP** | Security vulnerability scanning |

### 2.5.8 Repository & Version Control

| Tool | Purpose |
|------|---------|
| **Git** | Distributed version control |
| **GitHub** | Repository hosting and collaboration |
| **GitHub Issues** | Bug tracking and feature requests |
| **GitHub Projects** | Agile board for sprint planning |

---

## 2.6 Conclusion

The requirement analysis phase of SCALA-Guard establishes a comprehensive foundation for developing a cutting-edge package threat intelligence platform. By systematically documenting functional requirements (package analysis, risk scoring, remediation, batch auditing, predictions, and explainability), non-functional requirements (performance, reliability, security), and the specific needs of end users and administrators, we create a clear roadmap for successful project delivery.

The technology stack selected for SCALA-Guard—combining Python's data science capabilities (93.8% of codebase), C/Cython optimizations (4.6%), and modern frontend technologies—provides an optimal balance between performance, maintainability, and research potential. The integration of FastAPI for RESTful services, Scikit-learn for ML predictions, DeepSeek for AI-assisted remediation, and Docker for secure sandboxing creates a robust platform capable of addressing real-world supply chain security threats.

The SDLC approach combining Agile methodology with structured requirements ensures that development remains flexible while maintaining quality and delivering measurable increments of value to stakeholders. By addressing the needs of both end users (security analysts, developers, DevOps engineers) and administrators (system operations, configuration management), SCALA-Guard is positioned to become a comprehensive, production-ready solution for protecting open-source ecosystems from behavioral anomalies and malicious packages.

Future chapters will detail the architectural design decisions, implementation strategies, and research contributions that transform these requirements into a fully functional, deployed system capable of supporting enterprise-scale security operations.

---

**Word Count: ~2,100 words**  
**Page Estimate: ~6 pages (standard formatting)**

---

*Chapter 2 establishes the complete requirement landscape for SCALA-Guard, providing the foundation for all subsequent design, implementation, and evaluation activities.*
