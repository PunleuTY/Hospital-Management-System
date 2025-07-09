# 🏥 Hospital Management System

## 📚 Introduction

This project is a hand-on deep dive into **PostgreSQL**. A comprehensive relational database system for managing hospital operations.

At the core of this dataset are **7 thoughfully designed tables** that simulate a fully operational hospital management system : `department`, `doctor`, `staff`, `patient`, `appointment`, `medical_record`, and `billing`. Each table captures a unique aspect of the hospital's operations.

By walking through this project, you will :

- 📌 Strengthen your understanding of relational database structures
- 🔍 Practice writing real-world SQL queries with Postgres
- 🧠 Explore _Entity Relationships_, _Joins_, _Aggregation_, _View_, _Procedure_, _Trigger_, and core concept of **Data Administratoin** such as _User Management_, _Access Control_, _Backup & Recovery_, and _Performance Optimization_.
- 🎓 Showcase the practical SQL and Data Administration expertise cultivated as sophomore students of Computer Science at [CADT](https://cadt.edu.kh/).

## 🎯 Project Objectives

- Develop a fully structured PostgreSQL database that simulates the core operations of a hospital, including departments, staff, doctors, patients, appointments, medical records, and billing.
- Apply foundational SQL concepts (DDL, DML, DQL) to manage and query structured, mock healthcare data.
- Implement key database administration features:
  - _Role-based user management_ and _access control_
  - _Backup_ and _recovery_ using PostgreSQL tools
  - _Performance tuning_ through indexing and _query analysis_
- Create a modular, maintainable database system suitable for academic demonstration and future scalability.
- Showcase practical database design and administration skills aligned with the CADT Computer Science curriculum.

## 🛠️ Tools & Technologies

| Tool           | Purpose                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| **PostgreSQL** | Core relational database system for running queries                            |
| **VS Code**    | Code editor used for writing SQL and documentation                             |
| **SQLTools**   | VS Code extension for connecting and executing queries                         |
| **pgAdmin 4**  | GUI for exploring schemas and visualizing the ERD                              |
| **Git**        | Version control for managing project changes                                   |
| **GitHub**     | Cloud-based hosting for version-controlled code                                |
| **Markdown**   | For writing documentation like README and reports                              |
| **Click up**   | Project management tool for tracking progress and tasks for team collaboration |

## 🗄️ Hospital Database Tables

| Table Name       | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| `department`     | Stores department details such as name and location                               |
| `doctor`         | Contains doctor information including name, specialization, and contact           |
| `staff`          | Stores staff data including department assignment and roles (e.g., receptionist). |
| `patient`        | Contains patient personal details and medical information .                       |
| `appointment`    | Tracks appointment scheduling between doctors and patients.                       |
| `medical_record` | Logs diagnoses, prescriptions, and treatments per patient visit.                  |
| `billing`        | Records billing details including fees, payment status, and appointment ID.       |

## 🧬 Data Modeling Overview

The data model of the Hospital Management System is designed to simulate core administrative operations across departments, patients, staff, medical records, and billing.

### 🔍 Key Modeling Highlights:

- **👨‍⚕️ Personnel Entities**  
  `doctor`, `staff`, and `department` manage role-specific personnel data, with foreign keys connecting doctors and staff to departments.

- **🩺 Patient Lifecycle**  
  `patient`, `appointment`, and `medical_record` work in tandem to track patient admissions, diagnoses, treatments, and consultations.

- **💳 Billing Structure**  
  The `billing` table ties directly to `appointment` and `staff` (receptionist) records, enabling clear financial transaction tracking and fee breakdowns.

- **📅 Relational Flow**  
  Appointments create bridges between patients and doctors, allowing traceability and time-based scheduling.

- **🔐 Access Control**  
  Administrative scripts enable role-based user assignment with GRANT/REVOKE privileges, enhancing security and data governance.

This design enables both analytical reporting and operational management while staying modular and adaptable for future enhancements.

## Hospital Managment System ERD

The diagram below illustrates the key entities in the Hospital Management System and how they relate to one another. It captures the full operational flow—from patient admissions and doctor appointments to medical record tracking and billing.

### 📌 Key Relationships:

- Each **doctor** belongs to a department, and each **appointment** links a doctor to a patient.
- **Medical records** are tied to specific appointments and patients, capturing diagnostic and treatment history.
- The **staff** table connects support roles (like receptionists) to doctors and departments.
- **Billing** entries are generated per patient, based on services associated with their appointments.

> This ERD ensures referential integrity and supports normalized, relational design principles (up to 3NF) for secure, maintainable, and scalable data operations.
> ![alt text](<ER _Schema.jpg>)

## 📂 Project Structure

```
Hospital Management System/
│
├── ddl/
│ └── create_tables.sql
│
├── dml/
│ └── sample_data.sql
│
│
├── dql/
│ └── queries.sql
│
├── user_roles/
│ └── create_users.sql → PostgreSQL roles (users) creation
│ └── grant_privileges.sql → Permission control using GRANT/REVOKE
│
├── backup_restore/ # Backup & Recovery utilities
│ └── pg_dump.sh → Logical backup using pg_dump
│ └── restore_script.sh → Recovery via psql restore
│
├── performance/ # Query tuning and indexing
│ └── index_creation.sql → Index setup for performance enhancement
│ └── slow_queries_analysis.sql → EXPLAIN ANALYZE usage examples
│
├── docs/
│ └── ERD.png
│ └── system_overview.pdf → Design and workflow explanation
│ └── README.md
```

## 📘 How to Run / Setup Instructions

## 🧠 Final Thoughts / Credits
