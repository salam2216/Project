# SCALA-Guard Website
## Software Requirements Specification (SRS)

**Institution:** MBSTU (Mawlana Bhashani Science & Technology University), Santosh, Tangail, Bangladesh

**Document Version:** 1.0

**Date:** May 2, 2026

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Appendix](#6-appendix)

---

## 1. Introduction

### 1.1 Purpose

The purpose of this Software Requirements Specification (SRS) is to define the functional and non-functional requirements for the SCALA-Guard Website. This document provides a comprehensive overview of the system's objectives, features, and constraints, serving as a reference for development, testing, and deployment teams.

### 1.2 Scope

SCALA-Guard Website is a comprehensive security monitoring and guard management system designed for MBSTU and similar institutional environments. The system will:

- Provide secure authentication and role-based access control (RBAC)
- Enable efficient guard scheduling and deployment management
- Facilitate real-time incident reporting and documentation
- Deliver analytics and reporting capabilities for security insights
- Support mobile access for field personnel
- Maintain comprehensive audit trails and compliance documentation

**Out of Scope:**
- Third-party security system integrations (future enhancement)
- Mobile application development (Phase 2)
- Integration with external law enforcement agencies

### 1.3 Stakeholders

| Stakeholder | Role | Interests |
|-----------|------|-----------|
| MBSTU Administration | System Owner | Budget, security compliance, operational efficiency |
| Security Director | System Manager | Guard scheduling, incident tracking, performance metrics |
| Security Guards | End Users | Simple interface, work schedule access, incident reporting |
| IT Department | Technical Support | System maintenance, backup, security patches |
| Campus Staff | Secondary Users | Security alerts, emergency notifications |
| Internal Auditors | Compliance | Audit trails, regulatory compliance, data integrity |

### 1.4 Definitions and Acronyms

| Term/Acronym | Definition |
|-------------|-----------|
| RBAC | Role-Based Access Control - Security model restricting system access based on user roles |
| SRS | Software Requirements Specification |
| MBSTU | Mawlana Bhashani Science & Technology University |
| GUI | Graphical User Interface |
| API | Application Programming Interface |
| JWT | JSON Web Token - Secure authentication mechanism |
| SSL/TLS | Secure Sockets Layer/Transport Layer Security - Encryption protocol |
| 2FA | Two-Factor Authentication |
| UI/UX | User Interface/User Experience |
| CRUD | Create, Read, Update, Delete - Basic database operations |
| DoS | Denial of Service - Security attack |
| GDPR | General Data Protection Regulation |
| SLA | Service Level Agreement |

---

## 2. Overall Description

### 2.1 Product Perspective

The SCALA-Guard Website is a standalone web-based security management system designed specifically for institutional use. It operates as an integrated platform combining guard management, incident tracking, and analytics within a unified interface. The system is independent but may integrate with campus infrastructure systems in future phases.

**System Architecture Overview:**
- Web-based frontend (responsive design)
- RESTful API backend
- Relational database for data persistence
- Real-time notification engine
- Analytics and reporting module

### 2.2 Product Functions

#### Primary Functions:

1. **Authentication & Authorization**
   - User login with email/username
   - Two-factor authentication (2FA)
   - Session management
   - Password reset functionality

2. **Guard Management**
   - Guard profile creation and maintenance
   - Shift scheduling and assignment
   - Attendance tracking
   - Performance evaluation
   - Leave and absence management

3. **Incident Management**
   - Real-time incident reporting
   - Incident classification and prioritization
   - Incident assignment and escalation
   - Photo and document attachment
   - Incident resolution tracking

4. **Access Control**
   - Campus area/zone management
   - Access point configuration
   - Check-in/check-out logging
   - Visitor management
   - Gate pass issuance and tracking

5. **Scheduling & Roster Management**
   - Shift creation and templates
   - Guard-to-shift assignment
   - Roster publishing and notifications
   - Overtime management
   - Schedule conflict detection

6. **Analytics & Reporting**
   - Dashboard with key metrics
   - Incident trend analysis
   - Guard performance reports
   - Attendance statistics
   - Custom report generation
   - Export to PDF/Excel

7. **Notification System**
   - Email notifications
   - In-app push notifications
   - SMS alerts (optional)
   - Emergency broadcast capability

8. **Audit & Compliance**
   - Comprehensive audit logging
   - Activity tracking
   - Data access logs
   - Compliance reporting

### 2.3 User Classes

| User Role | Scope & Access |
|-----------|--------------|
| **Admin/System Administrator** | Full system access; user management; system configuration; backup management; audit log review; all reports generation |
| **Security Director** | Guard management; shift scheduling; incident oversight; analytics dashboards; report generation; communication with guards; access approval |
| **Security Manager** | Incident management; guard scheduling within assigned areas; team performance monitoring; scheduling reports; guard leave management |
| **Security Guard** | Personal profile access; view assigned shifts; incident reporting; check-in/check-out; personal attendance records; internal communications |
| **Campus Staff/Admin** | Limited access; view security alerts; request visitor passes; report concerns; access security notifications |
| **Auditor** | Read-only access to audit logs; compliance reports; activity trails; no modification rights |

### 2.4 Operating Environment

**Supported Platforms:**
- **Web Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Operating Systems:** Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Server Requirements:** 
  - Processor: Multi-core (4+ cores recommended)
  - RAM: 8GB minimum, 16GB recommended
  - Storage: 100GB SSD for database and logs
  - Network: Minimum 1Mbps connection

**Software Stack:**
- Frontend: React/Vue.js with responsive design
- Backend: Python/Node.js
- Database: PostgreSQL 12+
- Server: Nginx/Apache HTTP Server
- Hosting: Cloud infrastructure (AWS/Azure/DigitalOcean)

### 2.5 Constraints

1. **Technical Constraints:**
   - System must support concurrent users (minimum 100)
   - Response time must not exceed 2 seconds for standard operations
   - Database must be accessible only through secured connections
   - No sensitive data in browser cache

2. **Regulatory Constraints:**
   - Must comply with GDPR data protection standards
   - Must maintain comprehensive audit trails for compliance
   - Must implement encryption for data in transit and at rest
   - Must support data retention and deletion policies

3. **Organizational Constraints:**
   - Budget limitations as approved by MBSTU administration
   - IT support availability during business hours
   - Limited customization post-deployment
   - Existing campus IT infrastructure compatibility required

4. **Performance Constraints:**
   - System availability target: 99.5% uptime (excluding planned maintenance)
   - Peak load handling: 500 concurrent users
   - Database backup completion within 2 hours
   - Recovery time objective (RTO): 4 hours
   - Recovery point objective (RPO): 1 hour

### 2.6 Assumptions & Dependencies

**Assumptions:**
1. Users have basic computer literacy and internet access
2. Campus network infrastructure is stable and reliable
3. MBSTU IT department will provide necessary hardware and networking support
4. Users will change default passwords upon first login
5. Guard training on system usage will be provided before deployment
6. Email infrastructure exists for system notifications

**Dependencies:**
1. Internet connectivity for web access
2. Email server for notification delivery
3. Campus directory or LDAP server (optional, for user import)
4. Mobile device with internet access for field operations
5. Cloud infrastructure provider reliability
6. Vendor support for deployed technologies

---

## 3. System Features

### 3.1 User Authentication & Role-Based Access Control (RBAC)

#### 3.1.1 User Authentication

**Feature Description:** Secure user login mechanism with multiple authentication factors.

**Functional Requirements:**
- FR-3.1.1.1: System shall support login via email address or username
- FR-3.1.1.2: System shall implement password hashing using bcrypt or Argon2
- FR-3.1.1.3: System shall support two-factor authentication (2FA) using TOTP or SMS
- FR-3.1.1.4: System shall enforce strong password policies (minimum 12 characters, mixed case, numbers, special characters)
- FR-3.1.1.5: System shall implement account lockout after 5 failed login attempts (30-minute duration)
- FR-3.1.1.6: System shall log all authentication attempts including failures
- FR-3.1.1.7: System shall support "Remember Me" functionality (not for admin accounts)
- FR-3.1.1.8: System shall provide password reset functionality via email verification
- FR-3.1.1.9: System shall implement JWT tokens with 24-hour expiration for session management
- FR-3.1.1.10: System shall automatically logout users after 30 minutes of inactivity

#### 3.1.2 Role-Based Access Control

**Feature Description:** Granular access control based on predefined user roles and permissions.

**Functional Requirements:**
- FR-3.1.2.1: System shall support five predefined roles: Admin, Security Director, Manager, Guard, and Auditor
- FR-3.1.2.2: System shall allow admins to create custom roles with specific permissions
- FR-3.1.2.3: System shall define permissions at module level (create, read, update, delete)
- FR-3.1.2.4: System shall prevent unauthorized access to restricted resources with 403 error
- FR-3.1.2.5: System shall maintain role-permission mappings in database
- FR-3.1.2.6: System shall support permission inheritance from parent roles
- FR-3.1.2.7: System shall allow temporary permission elevation with expiration
- FR-3.1.2.8: System shall enforce column-level security for sensitive data (guards cannot see other guards' personal details)
- FR-3.1.2.9: System shall log all permission changes with timestamp and admin user
- FR-3.1.2.10: System shall support permission revocation immediately upon admin action

### 3.2 Guard Profile Management

#### 3.2.1 Guard Profile Creation & Maintenance

**Feature Description:** Comprehensive guard profile management with personal information, qualifications, and employment details.

**Functional Requirements:**
- FR-3.2.1.1: System shall allow creation of guard profiles with mandatory fields: name, email, phone, ID number, address
- FR-3.2.1.2: System shall support optional fields: emergency contact, qualifications, certifications, language skills
- FR-3.2.1.3: System shall validate email uniqueness across the system
- FR-3.2.1.4: System shall support guard photo upload (JPG/PNG, max 2MB)
- FR-3.2.1.5: System shall generate unique guard ID automatically
- FR-3.2.1.6: System shall allow profile updates by guard or manager
- FR-3.2.1.7: System shall maintain profile version history for audit purposes
- FR-3.2.1.8: System shall support guard status (active, inactive, on-leave, terminated)
- FR-3.2.1.9: System shall enforce mandatory fields before profile activation
- FR-3.2.1.10: System shall allow bulk import of guard profiles via CSV

### 3.3 Shift Scheduling & Management

#### 3.3.1 Shift Creation & Assignment

**Feature Description:** Flexible shift scheduling system allowing managers to create and assign shifts to guards.

**Functional Requirements:**
- FR-3.3.1.1: System shall support creation of shift templates with name, start time, end time, and day pattern
- FR-3.3.1.2: System shall support recurring shifts (daily, weekly, monthly patterns)
- FR-3.3.1.3: System shall allow assignment of guards to specific shifts
- FR-3.3.1.4: System shall prevent double-booking of guards in overlapping shifts
- FR-3.3.1.5: System shall calculate total hours per guard and detect overtime scenarios
- FR-3.3.1.6: System shall allow shift swapping between guards with manager approval
- FR-3.3.1.7: System shall publish rosters with notification to assigned guards
- FR-3.3.1.8: System shall support emergency shift assignment with alerts
- FR-3.3.1.9: System shall track shift history and modifications
- FR-3.3.1.10: System shall allow shift cancellation with reason documentation

### 3.4 Incident Reporting & Management

#### 3.4.1 Incident Creation & Documentation

**Feature Description:** Real-time incident reporting mechanism allowing guards to document security incidents with comprehensive information.

**Functional Requirements:**
- FR-3.4.1.1: System shall provide incident report form with mandatory fields: date, time, location, incident type, description
- FR-3.4.1.2: System shall support incident categories: security breach, theft, damage, disturbance, medical emergency, equipment failure, other
- FR-3.4.1.3: System shall allow incident severity classification: critical, high, medium, low
- FR-3.4.1.4: System shall support file attachments (photos, documents, up to 10MB each)
- FR-3.4.1.5: System shall capture reporter information automatically
- FR-3.4.1.6: System shall geotag incidents based on campus location data
- FR-3.4.1.7: System shall auto-notify relevant managers upon incident creation
- FR-3.4.1.8: System shall allow witnesses information entry
- FR-3.4.1.9: System shall support incident status: open, acknowledged, assigned, resolved, closed
- FR-3.4.1.10: System shall maintain complete audit trail of incident modifications

#### 3.4.2 Incident Assignment & Resolution

**Feature Description:** Workflow management for incident assignment, tracking, and resolution.

**Functional Requirements:**
- FR-3.4.2.1: System shall allow incident assignment to specific managers or teams
- FR-3.4.2.2: System shall escalate incidents if not acknowledged within SLA time
- FR-3.4.2.3: System shall support incident reassignment with reason tracking
- FR-3.4.2.4: System shall require resolution notes before closing incidents
- FR-3.4.2.5: System shall calculate incident response time and resolution time metrics
- FR-3.4.2.6: System shall allow root cause analysis documentation
- FR-3.4.2.7: System shall support preventive action planning
- FR-3.4.2.8: System shall maintain incident closure history for reference
- FR-3.4.2.9: System shall support incident reopening if new information emerges
- FR-3.4.2.10: System shall prevent deletion of incident records (maintain audit trail)

### 3.5 Attendance Tracking & Leave Management

#### 3.5.1 Check-in/Check-out System

**Feature Description:** Automated attendance tracking with multiple check-in/check-out methods.

**Functional Requirements:**
- FR-3.5.1.1: System shall support mobile check-in/check-out with GPS location capture
- FR-3.5.1.2: System shall support web-based check-in/check-out from guard stations
- FR-3.5.1.3: System shall validate check-in/check-out against assigned shifts
- FR-3.5.1.4: System shall allow early check-in (15 minutes before shift)
- FR-3.5.1.5: System shall flag late arrivals (more than 10 minutes after shift start)
- FR-3.5.1.6: System shall calculate actual worked hours vs. scheduled hours
- FR-3.5.1.7: System shall support manual check-in/check-out for system failures (manager override)
- FR-3.5.1.8: System shall generate attendance reports by guard or date range
- FR-3.5.1.9: System shall calculate overtime automatically
- FR-3.5.1.10: System shall maintain attendance data immutably for audit purposes

#### 3.5.2 Leave Management

**Feature Description:** Leave request and approval workflow for guards.

**Functional Requirements:**
- FR-3.5.2.1: System shall support leave types: annual, sick, casual, emergency, unpaid
- FR-3.5.2.2: System shall allow guards to request leave with date range and reason
- FR-3.5.2.3: System shall display available leave balance before submission
- FR-3.5.2.4: System shall route leave requests to appropriate manager for approval
- FR-3.5.2.5: System shall support leave approval/rejection with comments
- FR-3.5.2.6: System shall update guard availability calendar upon leave approval
- FR-3.5.2.7: System shall prevent shift assignment during approved leave
- FR-3.5.2.8: System shall calculate leave accrual based on employment period
- FR-3.5.2.9: System shall support leave carryover policies with maximum limits
- FR-3.5.2.10: System shall generate leave balance reports

### 3.6 Access Control & Zone Management

#### 3.6.1 Zone/Area Management

**Feature Description:** Campus area and access point definition for security monitoring.

**Functional Requirements:**
- FR-3.6.1.1: System shall support creation of security zones (e.g., "Main Gate", "Laboratory Block", "Hostel Area")
- FR-3.6.1.2: System shall define access points per zone
- FR-3.6.1.3: System shall assign guards to specific zones
- FR-3.6.1.4: System shall support zone access time windows
- FR-3.6.1.5: System shall track access point events (entry/exit)
- FR-3.6.1.6: System shall support restricted area definitions with elevated access requirements
- FR-3.6.1.7: System shall generate zone-wise activity reports
- FR-3.6.1.8: System shall support geo-fencing with mobile location verification
- FR-3.6.1.9: System shall maintain zone hierarchy (parent/child relationships)
- FR-3.6.1.10: System shall alert on unauthorized zone access attempts

#### 3.6.2 Visitor Management

**Feature Description:** Visitor entry and exit tracking with gate pass management.

**Functional Requirements:**
- FR-3.6.2.1: System shall support visitor registration with name, contact, purpose, ID
- FR-3.6.2.2: System shall generate visitor gate passes (digital and printable)
- FR-3.6.2.3: System shall track visitor check-in and check-out times
- FR-3.6.2.4: System shall verify visitor against blacklist/restricted persons database
- FR-3.6.2.5: System shall support multi-day visitor passes
- FR-3.6.2.6: System shall require host (employee) confirmation for visitor entry
- FR-3.6.2.7: System shall send visitor notification with entry instructions
- FR-3.6.2.8: System shall alert on extended visitor stays beyond approved duration
- FR-3.6.2.9: System shall maintain visitor history and frequency tracking
- FR-3.6.2.10: System shall support vehicle visitor management (plate, model, entry/exit times)

### 3.7 Analytics & Reporting Dashboard

#### 3.7.1 Dashboard Metrics

**Feature Description:** Real-time dashboard displaying key security metrics and performance indicators.

**Functional Requirements:**
- FR-3.7.1.1: System shall display total active guards and current deployment status
- FR-3.7.1.2: System shall show active incidents with status distribution (open, assigned, resolved)
- FR-3.7.1.3: System shall display incident trend graph (past 30 days)
- FR-3.7.1.4: System shall show attendance statistics (on-time, late, absent)
- FR-3.7.1.5: System shall display zone-wise guard availability
- FR-3.7.1.6: System shall show pending approvals (leave requests, incident assignments)
- FR-3.7.1.7: System shall calculate and display SLA compliance percentage
- FR-3.7.1.8: System shall highlight critical alerts and urgent incidents
- FR-3.7.1.9: System shall show visitor count and current active visitors
- FR-3.7.1.10: System shall support customizable dashboard widgets per user role

#### 3.7.2 Report Generation

**Feature Description:** Comprehensive reporting capabilities for various stakeholders.

**Functional Requirements:**
- FR-3.7.2.1: System shall generate incident reports (daily, weekly, monthly summaries)
- FR-3.7.2.2: System shall generate guard performance reports (punctuality, incident response, attendance)
- FR-3.7.2.3: System shall generate attendance and leave reports
- FR-3.7.2.4: System shall support custom report builder with date range and filters
- FR-3.7.2.5: System shall export reports in PDF, Excel, and CSV formats
- FR-3.7.2.6: System shall support scheduled report generation and email distribution
- FR-3.7.2.7: System shall generate SLA compliance reports
- FR-3.7.2.8: System shall provide incident hotspot analysis (location-based)
- FR-3.7.2.9: System shall support trend analysis over multiple periods
- FR-3.7.2.10: System shall maintain report generation history and delivery logs

### 3.8 Communication & Notification System

#### 3.8.1 Internal Messaging

**Feature Description:** In-app messaging between system users for operational communication.

**Functional Requirements:**
- FR-3.8.1.1: System shall support one-to-one and group messaging
- FR-3.8.1.2: System shall provide read receipts for messages
- FR-3.8.1.3: System shall support message search functionality
- FR-3.8.1.4: System shall maintain message history with timestamps
- FR-3.8.1.5: System shall support message archival and deletion
- FR-3.8.1.6: System shall provide notification for new messages
- FR-3.8.1.7: System shall support file sharing within messages (documents, images)
- FR-3.8.1.8: System shall allow message pinning for important communications
- FR-3.8.1.9: System shall support announcement broadcasts to all users or specific groups
- FR-3.8.1.10: System shall log all communications for audit purposes

#### 3.8.2 Notifications

**Feature Description:** Multi-channel notification delivery for alerts and updates.

**Functional Requirements:**
- FR-3.8.2.1: System shall support email notifications for critical events
- FR-3.8.2.2: System shall provide in-app push notifications in real-time
- FR-3.8.2.3: System shall support SMS notifications for critical alerts (optional)
- FR-3.8.2.4: System shall allow user customization of notification preferences
- FR-3.8.2.5: System shall batch non-critical notifications to reduce alert fatigue
- FR-3.8.2.6: System shall support notification scheduling (quiet hours configuration)
- FR-3.8.2.7: System shall maintain notification delivery logs
- FR-3.8.2.8: System shall support notification retries on delivery failure
- FR-3.8.2.9: System shall allow notification templates for different event types
- FR-3.8.2.10: System shall support emergency broadcast notifications with priority escalation

---

## 4. External Interface Requirements

### 4.1 User Interface

#### 4.1.1 General UI Principles

- **Responsive Design:** System shall adapt seamlessly to desktop (1920x1080+), tablet (768x1024), and mobile (320x568) screen sizes
- **Accessibility:** Comply with WCAG 2.1 AA standards for color contrast, font sizes, and keyboard navigation
- **Consistency:** Maintain uniform design language, color scheme, and navigation patterns across all modules
- **Intuitiveness:** Minimize learning curve with clear labeling, logical workflow, and contextual help

#### 4.1.2 Key UI Components

| Module | Key Features |
|--------|-------------|
| **Login Page** | Email/username field, password field, 2FA verification, "Forgot Password" link, Remember Me checkbox |
| **Dashboard** | Widget-based layout, customizable panels, key metrics cards, incident timeline, pending actions widget |
| **Guard Management** | Guard list with search/filter, profile detail view, bulk import option, status indicators |
| **Shift Scheduling** | Calendar view, drag-and-drop assignment, conflict warnings, shift template management |
| **Incident Management** | Incident list with filters, detail view with history timeline, assignment panel, status workflow buttons |
| **Reports** | Report builder interface, date/range selectors, filter options, export buttons, scheduled report configuration |
| **Navigation** | Top navigation bar with user menu, left sidebar with module links, breadcrumb trail |

#### 4.1.3 UI Responsiveness Requirements

- FR-4.1.3.1: All pages shall load within 3 seconds on standard broadband (5Mbps)
- FR-4.1.3.2: Interactive elements shall respond within 100ms of user interaction
- FR-4.1.3.3: Mobile version shall support touch gestures (swipe, tap, pinch)
- FR-4.1.3.4: System shall display loading indicators for operations exceeding 2 seconds

### 4.2 Software Interface

#### 4.2.1 REST API Specifications

**Base URL:** `https://api.scala-guard.institution.edu/v1`

**Authentication:** JWT Bearer Token in Authorization header

**Common Response Format:**
```json
{
  "status": "success|error",
  "data": {},
  "message": "Description",
  "timestamp": "2026-05-02T10:30:00Z",
  "code": 200
}
```

#### 4.2.2 Key API Endpoints

| Endpoint | Method | Purpose | Authentication |
|----------|--------|---------|-----------------|
| `/auth/login` | POST | User authentication | None |
| `/auth/refresh` | POST | Token refresh | JWT |
| `/guards` | GET | List guards | JWT (Manager+) |
| `/guards/{id}` | GET | Guard detail | JWT (Self/Manager) |
| `/guards` | POST | Create guard | JWT (Admin) |
| `/shifts` | GET | List shifts | JWT |
| `/shifts` | POST | Create shift | JWT (Admin) |
| `/incidents` | GET | List incidents | JWT |
| `/incidents` | POST | Report incident | JWT (Guard+) |
| `/incidents/{id}` | PUT | Update incident | JWT (Manager+) |
| `/attendance/checkin` | POST | Check-in | JWT (Guard+) |
| `/attendance/checkout` | POST | Check-out | JWT (Guard+) |
| `/reports` | GET | List available reports | JWT (Admin+) |
| `/reports/{id}/generate` | POST | Generate report | JWT (Admin+) |
| `/zones` | GET | List zones | JWT |
| `/visitors` | POST | Register visitor | JWT (Admin+) |
| `/visitors/{id}/checkout` | POST | Visitor checkout | JWT (Guard+) |

#### 4.2.3 Database Interface

- **Database:** PostgreSQL 12+
- **Connection Protocol:** TCP/IP over SSL/TLS
- **Authentication:** Database user credentials (separate from application users)
- **Backup Interface:** Automated daily backups with retention of 30 days
- **Replication:** Master-slave replication for disaster recovery

#### 4.2.4 Third-Party Integrations

**Email Service:**
- Provider: SMTP or SES
- Purpose: Notifications, password resets, reports
- Retry Logic: 3 attempts with exponential backoff

**Optional Integrations:**
- LDAP/Active Directory: User directory synchronization (Phase 2)
- SMS Gateway: SMS notifications (Phase 2)
- Campus Information System: Guard and staff data import

### 4.3 Communications Interface

#### 4.3.1 Network Requirements

- **Protocol:** HTTPS (TLS 1.2+)
- **Port:** 443 (standard HTTPS)
- **Firewall Rules:** Allow inbound HTTPS traffic from campus network
- **VPN:** Optional for remote access
- **CDN:** Content delivery network for static assets

#### 4.3.2 Real-time Communication

- **WebSocket Support:** For real-time notifications and live updates
- **Fallback:** Long-polling for browsers without WebSocket support
- **Message Queue:** Redis/RabbitMQ for asynchronous event processing
- **Latency:** Real-time updates within 500ms

#### 4.3.3 Data Exchange Formats

- **JSON:** Primary format for API requests/responses
- **CSV:** For bulk import/export operations
- **PDF:** For report generation and printing
- **PNG/JPG:** For image attachments (incident photos, guard photos)

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

#### 5.1.1 Response Time

| Operation | Maximum Response Time | Target Response Time |
|-----------|----------------------|---------------------|
| User Login | 2 seconds | 800ms |
| Dashboard Load | 3 seconds | 1.5 seconds |
| Incident List (50 records) | 2 seconds | 800ms |
| Report Generation | 10 seconds | 5 seconds |
| Search Operations | 2 seconds | 1 second |
| File Upload (5MB) | 15 seconds | 5 seconds |
| Mobile Check-in | 3 seconds | 1.5 seconds |

#### 5.1.2 Throughput & Scalability

- FR-5.1.2.1: System shall support minimum 100 concurrent users
- FR-5.1.2.2: System shall support peak load of 500 concurrent users during shift changes
- FR-5.1.2.3: System shall process 1000 incidents per day without performance degradation
- FR-5.1.2.4: Database shall handle 10,000 check-in/check-out operations during peak hours
- FR-5.1.2.5: API shall support horizontal scaling via load balancing

#### 5.1.3 Availability & Reliability

- **Uptime Target:** 99.5% annually (allowing ~44 minutes downtime per month)
- **Recovery Time Objective (RTO):** 4 hours maximum after system failure
- **Recovery Point Objective (RPO):** 1 hour maximum data loss
- **Planned Maintenance:** 2 hours per month, scheduled during low-usage periods (midnight-2am)
- **Automated Failover:** Automatic switchover to backup system within 5 minutes

#### 5.1.4 Database Performance

- FR-5.1.4.1: Database queries shall execute within 500ms for normal operations
- FR-5.1.4.2: Report queries shall complete within 30 seconds for 1-year data range
- FR-5.1.4.3: Database indexes shall be optimized for common search patterns
- FR-5.1.4.4: Slow query logs shall be monitored and addressed
- FR-5.1.4.5: Database connection pooling shall limit connections to 100

### 5.2 Security Requirements

#### 5.2.1 Authentication Security

- FR-5.2.1.1: All passwords shall be hashed using Argon2 or bcrypt with salt
- FR-5.2.1.2: Passwords shall enforce minimum 12 characters with uppercase, lowercase, numbers, and special characters
- FR-5.2.1.3: System shall implement two-factor authentication (TOTP or SMS)
- FR-5.2.1.4: Account lockout policy: 5 failed attempts = 30-minute lockout
- FR-5.2.1.5: Session timeout: 30 minutes of inactivity
- FR-5.2.1.6: JWT tokens shall have 24-hour expiration with refresh token rotation
- FR-5.2.1.7: System shall prevent password reuse (last 5 passwords)
- FR-5.2.1.8: Password reset links shall expire within 1 hour
- FR-5.2.1.9: Multi-device session management with max 3 concurrent sessions per user

#### 5.2.2 Data Encryption

- FR-5.2.2.1: All data in transit shall use TLS 1.2 or higher (HTTPS)
- FR-5.2.2.2: Sensitive data at rest (passwords, personal IDs, phone numbers) shall be encrypted using AES-256
- FR-5.2.2.3: API responses shall use secure headers (X-Content-Type-Options, X-Frame-Options, CSP)
- FR-5.2.2.4: SSL certificates shall be valid and regularly renewed (minimum annually)
- FR-5.2.2.5: Encryption keys shall be stored securely using key management service
- FR-5.2.2.6: File uploads shall be scanned for malware before storage
- FR-5.2.2.7: Sensitive fields shall be masked in logs (passwords, tokens)

#### 5.2.3 Access Control & Authorization

- FR-5.2.3.1: All API endpoints shall validate user authorization before processing
- FR-5.2.3.2: Role-based access control (RBAC) shall be enforced at module level
- FR-5.2.3.3: Guards shall not access other guards' personal information
- FR-5.2.3.4: Managers shall only access data for assigned zones/teams
- FR-5.2.3.5: Admin actions shall require additional authentication (re-login or OTP)
- FR-5.2.3.6: Permission changes shall require approval workflow
- FR-5.2.3.7: Temporary elevated access shall auto-expire
- FR-5.2.3.8: Cross-site request forgery (CSRF) tokens shall be implemented

#### 5.2.4 Audit & Logging

- FR-5.2.4.1: All user actions shall be logged with timestamp, user ID, action, and result
- FR-5.2.4.2: Failed authentication attempts shall be logged with IP address
- FR-5.2.4.3: Data modifications shall include before/after values in audit log
- FR-5.2.4.4: Audit logs shall be immutable (no deletion, only archival)
- FR-5.2.4.5: Sensitive operations shall trigger additional logging (user creation, permission changes, exports)
- FR-5.2.4.6: Log retention: minimum 2 years
- FR-5.2.4.7: Real-time alerts for suspicious activities (10+ failed logins, unauthorized access attempts)
- FR-5.2.4.8: Monthly audit report generation for compliance

#### 5.2.5 Vulnerability Management

- FR-5.2.5.1: Regular security patches shall be applied within 7 days of release
- FR-5.2.5.2: Dependencies shall be scanned for known vulnerabilities (automated tools)
- FR-5.2.5.3: Annual penetration testing by third-party security firm
- FR-5.2.5.4: Vulnerability disclosure policy shall be published
- FR-5.2.5.5: Security headers shall prevent common attacks (XSS, clickjacking)
- FR-5.2.5.6: Input validation shall prevent SQL injection and command injection
- FR-5.2.5.7: Rate limiting shall prevent brute force attacks (100 requests/minute per IP)

#### 5.2.6 Data Privacy

- FR-5.2.6.1: System shall comply with GDPR data protection requirements
- FR-5.2.6.2: Personal data shall only be collected for legitimate purposes
- FR-5.2.6.3: Data subject access requests shall be fulfilled within 30 days
- FR-5.2.6.4: Data retention policy: 3 years for employee data, 1 year for visitor data
- FR-5.2.6.5: Data deletion shall permanently remove records from all backups
- FR-5.2.6.6: Privacy policy shall be displayed during user registration
- FR-5.2.6.7: Consent shall be explicitly obtained for data processing

### 5.3 Usability Requirements

#### 5.3.1 User Interface Usability

- FR-5.3.1.1: System shall require no more than 5 clicks to reach any feature
- FR-5.3.1.2: Error messages shall be clear and provide actionable guidance
- FR-5.3.1.3: Form validation errors shall be highlighted immediately upon submission
- FR-5.3.1.4: Confirmation dialogs shall be used for destructive actions (delete, cancel shift)
- FR-5.3.1.5: System shall provide undo functionality for reversible actions
- FR-5.3.1.6: Help documentation shall be accessible via context-sensitive help buttons
- FR-5.3.1.7: Search functionality shall support fuzzy matching and autocomplete
- FR-5.3.1.8: Keyboard shortcuts shall be provided for power users

#### 5.3.2 Accessibility

- FR-5.3.2.1: System shall support screen readers (NVDA, JAWS compatibility)
- FR-5.3.2.2: Color shall not be the only visual indicator of status/state
- FR-5.3.2.3: Contrast ratio shall meet WCAG AA standards (4.5:1 for text)
- FR-5.3.2.4: All interactive elements shall be keyboard accessible (Tab key navigation)
- FR-5.3.2.5: Forms shall have proper labels associated with input fields
- FR-5.3.2.6: Alt text shall be provided for all images
- FR-5.3.2.7: Video content shall include captions
- FR-5.3.2.8: Font sizes shall be at least 14px for body text

#### 5.3.3 Learning & Support

- FR-5.3.3.1: System shall provide context-sensitive help for all major features
- FR-5.3.3.2: User onboarding tutorial shall guide new users through key workflows
- FR-5.3.3.3: Video tutorials shall be available for complex operations
- FR-5.3.3.4: FAQ section shall address common questions
- FR-5.3.3.5: Support contact information shall be readily accessible
- FR-5.3.3.6: In-app tooltips shall explain button functions
- FR-5.3.3.7: System documentation shall be available in English and local languages

### 5.4 Maintainability Requirements

#### 5.4.1 Code Quality

- FR-5.4.1.1: Code shall follow established style guides (PEP 8 for Python, ESLint for JavaScript)
- FR-5.4.1.2: Code complexity shall be monitored (cyclomatic complexity < 10)
- FR-5.4.1.3: Unit test coverage shall be minimum 80% for core modules
- FR-5.4.1.4: Integration tests shall cover end-to-end workflows
- FR-5.4.1.5: Code reviews shall be mandatory before merge to main branch
- FR-5.4.1.6: Documentation shall be kept current with code changes
- FR-5.4.1.7: Technical debt shall be tracked and prioritized

#### 5.4.2 Supportability

- FR-5.4.2.1: System shall provide detailed error logs with stack traces
- FR-5.4.2.2: Database indexes shall be documented for support team
- FR-5.4.2.3: API documentation shall include request/response examples
- FR-5.4.2.4: Deployment procedures shall be fully documented
- FR-5.4.2.5: Backup and recovery procedures shall be tested quarterly
- FR-5.4.2.6: Performance monitoring tools shall be installed (New Relic, DataDog)
- FR-5.4.2.7: Incident response procedures shall be documented

#### 5.4.3 Modular Architecture

- FR-5.4.3.1: System shall be organized into modules (auth, guards, incidents, reports)
- FR-5.4.3.2: Dependencies between modules shall be minimized
- FR-5.4.3.3: APIs between modules shall be clearly documented
- FR-5.4.3.4: Modules shall be independently deployable
- FR-5.4.3.5: Database schema shall support independent module upgrades

### 5.5 Portability & Scalability Requirements

#### 5.5.1 Platform Portability

- FR-5.5.1.1: System shall run on any operating system with Docker support (Windows, macOS, Linux)
- FR-5.5.1.2: Frontend shall be compatible with all major browsers (Chrome, Firefox, Safari, Edge)
- FR-5.5.1.3: Mobile support shall work on iOS 12+ and Android 8+
- FR-5.5.1.4: Database shall be portable to any PostgreSQL 12+ installation
- FR-5.5.1.5: Configuration shall be environment-based (dev, staging, production)

#### 5.5.2 Scalability

- **Horizontal Scaling:** System shall support load balancing across multiple servers
- **Database Scaling:** Read replicas for analytics queries, master for transactional data
- **Caching Layer:** Redis for session storage and cache (1000+ concurrent users)
- **CDN:** Static assets distributed globally for faster delivery
- **Queue System:** Message queue for asynchronous operations (report generation, notifications)
- **Monitoring:** Real-time infrastructure monitoring with auto-scaling triggers

#### 5.5.3 Performance Optimization

- FR-5.5.3.1: Frontend assets shall be minified and gzipped
- FR-5.5.3.2: Database queries shall use indexes and avoid N+1 problems
- FR-5.5.3.3: API responses shall support pagination (default 50 records)
- FR-5.5.3.4: Caching headers shall be optimized for client/server-side caching
- FR-5.5.3.5: Image optimization shall reduce file sizes without quality loss
- FR-5.5.3.6: Lazy loading shall be implemented for lists and large datasets

### 5.6 Cloud Infrastructure Recommendations

#### 5.6.1 Cloud Architecture Components

| Component | Suggested Service | Rationale |
|-----------|------------------|-----------|
| **Compute (Web Server)** | AWS EC2 (t3.medium) / Azure App Service / DigitalOcean App Platform | Auto-scaling capability, managed updates |
| **Load Balancer** | AWS ALB / Azure Load Balancer / DigitalOcean Load Balancer | Distribute traffic across instances, SSL termination |
| **Database** | AWS RDS PostgreSQL / Azure Database for PostgreSQL / DigitalOcean Managed Databases | Automated backups, replication, monitoring |
| **Cache Layer** | AWS ElastiCache (Redis) / Azure Cache for Redis | Session management, performance optimization |
| **Object Storage** | AWS S3 / Azure Blob Storage / DigitalOcean Spaces | Store incident photos, documents, backups |
| **Message Queue** | AWS SQS / Azure Service Bus / RabbitMQ on EC2 | Asynchronous job processing, notifications |
| **CDN** | AWS CloudFront / Azure CDN / Cloudflare | Static asset delivery, DDoS protection |
| **DNS** | AWS Route 53 / Azure DNS / Cloudflare | Domain management, failover routing |
| **Monitoring** | AWS CloudWatch / Azure Monitor / Datadog | Performance monitoring, alerting |
| **Backup Storage** | AWS Glacier / Azure Archive Storage | Long-term backup retention (cost-effective) |
| **Email Service** | AWS SES / SendGrid / Azure Communication Services | Transactional emails, notifications |
| **SSL/TLS** | AWS Certificate Manager / Let's Encrypt | HTTPS encryption, certificate management |

#### 5.6.2 Infrastructure Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Internet Users                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Cloudflare │ (DDoS Protection, CDN)
                    └──────┬──────┘
                           │
                    ┌──────▼──────────┐
                    │  Load Balancer  │
                    └──────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼──┐          ┌───▼──┐          ┌───▼──┐
    │ App  │          │ App  │          │ App  │ (Auto-Scaling)
    │ Srv1 │          │ Srv2 │          │ Srv3 │
    └───┬──┘          └───┬──┘          └───┬──┘
        │                 │                 │
        └─────────���───────┼─────────────────┘
                          │
            ┌─────────────┼─────────────┐
            │             │             │
        ┌───▼──┐      ┌───▼──┐    ┌───▼─────┐
        │Redis │      │ RabbitMQ  │ Database│
        │Cache │      │Queue  │    │(Master) │
        └──────┘      └──────┘     └───┬────┘
                                       │
                                   ┌───▼────┐
                                   │ DB Replica
                                   │(Standby)│
                                   └────────┘
        ┌──────────────────────────────────────┐
        │        S3 (Photos, Documents)        │
        │        Glacier (Backups)             │
        └──────────────────────────────────────┘
```

#### 5.6.3 Deployment Strategy

**Development Environment:**
- Single EC2 instance with test database
- Minimal resources for team testing
- Cost: ~$30/month

**Staging Environment:**
- Production-like configuration with scaled-down resources
- Full backup and monitoring setup
- For pre-release testing and performance validation
- Cost: ~$150/month

**Production Environment:**
- High-availability setup with redundancy
- Auto-scaling enabled (2-5 instances)
- Read replicas for database
- Comprehensive monitoring and alerting
- Cost: ~$500-1000/month (variable based on usage)

#### 5.6.4 Backup & Disaster Recovery

| Aspect | Configuration |
|--------|--------------|
| **Frequency** | Automated daily full backups at 2:00 AM UTC |
| **Retention** | 30-day rolling window for daily backups |
| **Long-term** | Monthly backups archived to Glacier for 2 years |
| **RTO** | 4 hours (automatic failover to replica) |
| **RPO** | 1 hour (hourly incremental backups) |
| **Testing** | Quarterly recovery drills to verify backup integrity |
| **Failover** | Automated to read replica on primary failure |

#### 5.6.5 Security Configuration

- **VPC:** Private VPC with security groups restricting traffic
- **NAT Gateway:** Outbound internet access through NAT
- **SSL/TLS:** All data in transit encrypted (TLS 1.2+)
- **Encryption:** At-rest encryption for databases and storage (AES-256)
- **IAM Roles:** Service-to-service authentication using roles, not static credentials
- **Secrets Manager:** Sensitive data stored in AWS Secrets Manager / Azure Key Vault
- **DDoS Protection:** AWS Shield Standard (free), Shield Advanced for enterprise protection
- **WAF:** Web Application Firewall rules for common attacks

---

## 6. Appendix

### 6.1 Sitemap & Navigation Structure

#### 6.1.1 System Sitemap

```
SCALA-Guard Portal
│
├── Home / Dashboard
│   ├── Key Metrics Dashboard
│   ├── Incident Overview
│   ├── Pending Actions Widget
│   └── Calendar View
│
├── Guard Management
│   ├── Guard List
│   ├── Add/Edit Guard Profile
│   ├── Guard Performance Reports
│   ├── Guard Qualifications & Certifications
│   └── Bulk Import Wizard
│
├── Shift Scheduling
│   ├── Shift Templates
│   ├── Schedule Calendar
│   ├── Create/Edit Shift
│   ├── Roster Management
│   ├── Shift Swaps
│   └── Conflict Detection Report
│
├── Incident Management
│   ├── Incident List/Dashboard
│   ├── Report New Incident
│   ├── Incident Detail View
│   ├── Assignment & Escalation
│   ├── Incident Closure
│   └── Incident Analytics
│
├── Attendance & Leave
│   ├── Check-in/Check-out
│   ├── Attendance Reports
│   ├── Leave Requests
│   ├── Approve Leave
│   ├── Leave Balance Report
│   └── Attendance Calendar
│
├── Access Control
│   ├── Zones Management
│   ├── Access Points
│   ├── Zone Assignments
│   ├── Visitor Registration
│   ├── Gate Pass Management
│   ├── Access Log Reports
│   └── Geo-fencing Configuration
│
├── Analytics & Reports
│   ├── Dashboard Analytics
│   ├── Incident Reports
│   ├── Guard Performance Reports
│   ├── Attendance Reports
│   ├── Custom Report Builder
│   ├── Scheduled Reports
│   ├── Export & Download
│   └── Report Archive
│
├── Communication
│   ├── Internal Messaging
│   ├── Group Chats
│   ├── Announcements
│   ├── Emergency Broadcast
│   ├── Notification Settings
│   └── Message Archive
│
├── Administration
│   ├── User Management
│   ├── Role Management
│   ├── Permission Configuration
│   ├── System Settings
│   ├── Audit Logs
│   ├── Backup Management
│   ├── Email Templates
│   ├── Notification Rules
│   └── Integration Settings
│
├── Account & Profile
│   ├── My Profile
│   ├── Change Password
│   ├── 2FA Settings
│   ├── Notification Preferences
│   ├── Login History
│   └── Sessions Management
│
└── Help & Support
    ├── Documentation
    ├── User Guides
    ├── Video Tutorials
    ├── FAQ
    ├── Contact Support
    └── About System
```

#### 6.1.2 User Role Navigation

**Admin/System Administrator:**
- Full access to all modules
- Additional: Administration section, Audit Logs, Backup Management
- Direct access: User management, System settings

**Security Director:**
- Guard Management (full)
- Shift Scheduling (full)
- Incident Management (full)
- Analytics & Reports (all)
- Communication (full)
- Limited: User management (view only)

**Security Manager:**
- Guard Management (assigned team only)
- Shift Scheduling (assigned zone only)
- Incident Management (assigned team)
- Analytics (assigned team reports only)
- Communication (team messaging)
- Limited access to: User management

**Security Guard:**
- Attendance (own check-in/check-out)
- Profile (own profile view/edit)
- Incident (report and assigned incidents)
- Limited access: View own shifts, Personal leave requests
- Communication: Team messaging only

**Campus Staff/Admin:**
- Limited: Dashboard view
- Visitor management (self-service pass request)
- Security alerts (notifications only)
- Read-only: View security announcements

**Auditor:**
- Read-only access to all data
- Audit logs (full)
- Compliance reports
- No modification rights

### 6.2 Data Model Overview

#### 6.2.1 Core Entities

**User**
- user_id (PK)
- username, email, password_hash
- full_name, phone
- role_id (FK)
- status, created_at, updated_at
- last_login, failed_attempts

**Guard**
- guard_id (PK)
- user_id (FK)
- guard_number, id_number
- photo_url, emergency_contact
- qualifications, certifications
- status, hire_date
- assigned_zones, created_at, updated_at

**Shift**
- shift_id (PK)
- shift_name, start_time, end_time
- days_pattern (recurring)
- zone_id (FK)
- required_guards, created_at, updated_at

**ShiftAssignment**
- assignment_id (PK)
- shift_id (FK), guard_id (FK)
- assignment_date, status
- created_at, assigned_by

**Incident**
- incident_id (PK)
- reported_by (FK), assigned_to (FK)
- incident_type, severity, status
- location, description, date_time
- photos_attachments, resolution_notes
- created_at, updated_at, closed_at

**Attendance**
- attendance_id (PK)
- guard_id (FK), shift_id (FK)
- checkin_time, checkout_time
- checkin_location, checkout_location
- status, worked_hours, attendance_date

**LeaveRequest**
- leave_id (PK)
- guard_id (FK)
- leave_type, start_date, end_date
- reason, status, approved_by
- created_at, updated_at

**Zone**
- zone_id (PK)
- zone_name, description
- access_level, geo_coordinates
- created_at, updated_at

**Visitor**
- visitor_id (PK)
- name, email, phone, id_number
- purpose, host_id (FK), vehicle_info
- checkin_time, checkout_time, pass_number
- visitor_status, created_at

**AuditLog**
- log_id (PK)
- user_id (FK), action, entity_type
- entity_id, before_value, after_value
- ip_address, user_agent, timestamp

### 6.3 Technology Stack

**Frontend:**
- Framework: React 18+ / Vue.js 3+
- State Management: Redux / Vuex
- UI Library: Material-UI / Bootstrap
- Charts: Chart.js / D3.js
- HTTP Client: Axios
- Testing: Jest, React Testing Library

**Backend:**
- Language: Python 3.9+ or Node.js 16+
- Framework: Django / FastAPI (Python) or Express.js (Node)
- ORM: SQLAlchemy / Django ORM
- Authentication: Flask-JWT / Passport.js
- Validation: Pydantic / Joi
- Testing: Pytest / Mocha

**Database:**
- PostgreSQL 12+
- Redis (caching/sessions)
- Elasticsearch (optional, for full-text search)

**DevOps:**
- Containerization: Docker
- Orchestration: Docker Compose / Kubernetes
- CI/CD: GitHub Actions / GitLab CI
- Infrastructure: Terraform / CloudFormation
- Monitoring: Prometheus + Grafana / ELK Stack

**Security:**
- SSL/TLS: Let's Encrypt
- Secrets: HashiCorp Vault / AWS Secrets Manager
- API Gateway: Kong / AWS API Gateway

### 6.4 Performance Benchmarks & Targets

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Page Load Time | < 3 seconds | Lighthouse, WebPageTest |
| API Response Time | < 500ms | Application Performance Monitoring (APM) |
| Database Query Time | < 500ms | Database slow query logs |
| Concurrent Users | 500+ | Load testing (JMeter, Locust) |
| Uptime | 99.5% | Uptime monitoring service |
| Code Coverage | 80%+ | Code coverage tools (Coverage.py, Istanbul) |
| Security Score | A+ | OWASP evaluation, Qualys SSL Labs |

### 6.5 Glossary

| Term | Definition |
|------|-----------|
| **2FA** | Two-factor authentication using TOTP or SMS |
| **CRUD** | Create, Read, Update, Delete database operations |
| **JWT** | JSON Web Token for stateless authentication |
| **RBAC** | Role-Based Access Control restricting access by user roles |
| **SLA** | Service Level Agreement defining response/resolution times |
| **RTO** | Recovery Time Objective - maximum acceptable downtime |
| **RPO** | Recovery Point Objective - maximum acceptable data loss |
| **Geofencing** | Virtual boundary for location-based access control |
| **Audit Trail** | Complete record of all system actions and modifications |
| **Escalation** | Process of raising incident priority or reassigning to higher authority |

### 6.6 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | May 2, 2026 | SRS Team | Initial document creation |

### 6.7 Approval Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Manager | __________________ | __________________ | ________ |
| Technical Lead | __________________ | __________________ | ________ |
| Security Officer | __________________ | __________________ | ________ |
| Stakeholder (Director) | __________________ | __________________ | ________ |

### 6.8 Document Control

- **Document ID:** SRS-SCALA-Guard-001
- **Classification:** Internal Use
- **Last Updated:** May 2, 2026
- **Next Review:** August 2, 2026
- **Owner:** Project Management Office
- **Contact:** project@scala-guard.mbstu.edu.bd

---

## Document End

**This Software Requirements Specification serves as the comprehensive reference for the SCALA-Guard Website development, testing, and deployment. All stakeholders are expected to review, understand, and adhere to the requirements outlined in this document.**

For clarifications, questions, or change requests, please contact the Project Management Office.
