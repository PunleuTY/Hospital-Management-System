# Controllers Directory

This README covers every file in the `backend/src/controllers/` directory, detailing their purposes, typical methods, and usage patterns.

---

## 📁 Directory Structure

```text
backend/
└── src/
    └── controllers/
        ├── patient_controller.js
        ├── doctor_controller.js
        ├── appointment_controller.js
        ├── billing_controller.js
        ├── staff_controller.js
        ├── report_controller.js
        └── settings_controller.js
```

> **Note:** If you add new features, create matching controller files here (e.g., `auth_controller.js`).

---

## 🎯 Purpose of the Controllers Layer

Controllers act as the **bridge** between HTTP requests and your business logic (services). Their responsibilities include:

1. **Parsing and validating** incoming data (or delegating to validation middleware).
2. **Invoking service** methods that perform the core logic and database operations.
3. **Formatting and sending** HTTP responses with appropriate status codes and JSON payloads.
4. **Forwarding errors** to the global error-handling middleware via `next(err)`.

Keep controllers **thin**; delegate heavy lifting to service modules.

---

## 📄 Controller Files

Below is a summary of each controller file in this directory:

### `patient_controller.js`

* **Responsibilities**: Manage patient records.

  * List all patients
  * Retrieve a patient by ID
  * Create, update, delete patient entries
* **Typical exports**:

  ```js
  exports.getAllPatients = async (req, res, next) => { /* ... */ };
  exports.getPatientById = async (req, res, next) => { /* ... */ };
  exports.createPatient = async (req, res, next) => { /* ... */ };
  exports.updatePatient = async (req, res, next) => { /* ... */ };
  exports.deletePatient = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `patient_routes.js`, e.g.,

  ```js
  router.get('/patients', patientController.getAllPatients);
  ```

---

### `doctor_controller.js`

* **Responsibilities**: Manage doctor profiles.

  * List all doctors
  * Retrieve a doctor by ID
  * Create, update, delete doctor entries
* **Typical exports**:

  ```js
  exports.getAllDoctors = async (req, res, next) => { /* ... */ };
  exports.getDoctorById = async (req, res, next) => { /* ... */ };
  exports.createDoctor = async (req, res, next) => { /* ... */ };
  exports.updateDoctor = async (req, res, next) => { /* ... */ };
  exports.deleteDoctor = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `doctor_routes.js`.

---

### `appointment_controller.js`

* **Responsibilities**: Handle appointments.

  * List all appointments
  * Retrieve an appointment by ID
  * Schedule (create), reschedule (update), cancel (delete) appointments
* **Typical exports**:

  ```js
  exports.getAllAppointments = async (req, res, next) => { /* ... */ };
  exports.getAppointmentById = async (req, res, next) => { /* ... */ };
  exports.createAppointment = async (req, res, next) => { /* ... */ };
  exports.updateAppointment = async (req, res, next) => { /* ... */ };
  exports.deleteAppointment = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `appointment.routes.js`.

---

### `billing_controller.js`

* **Responsibilities**: Oversee billing operations.

  * Generate invoices
  * List and retrieve bills
  * Process payments
* **Typical exports**:

  ```js
  exports.getAllBills = async (req, res, next) => { /* ... */ };
  exports.getBillById = async (req, res, next) => { /* ... */ };
  exports.createBill = async (req, res, next) => { /* ... */ };
  exports.payBill = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `billing_routes.js`.

---

### `staff_controller.js`

* **Responsibilities**: Manage hospital staff.

  * List and retrieve staff members
  * Create, update, delete staff entries
  * Assign roles/permissions
* **Typical exports**:

  ```js
  exports.getAllStaff = async (req, res, next) => { /* ... */ };
  exports.getStaffById = async (req, res, next) => { /* ... */ };
  exports.createStaff = async (req, res, next) => { /* ... */ };
  exports.updateStaff = async (req, res, next) => { /* ... */ };
  exports.deleteStaff = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `staff_routes.js`.

---

### `report_controller.js`

* **Responsibilities**: Generate and manage reports.

  * Create daily/weekly/monthly reports
  * Retrieve and download report files
* **Typical exports**:

  ```js
  exports.generateReport = async (req, res, next) => { /* ... */ };
  exports.getReportById = async (req, res, next) => { /* ... */ };
  exports.downloadReport = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `report.routes.js`.

---

### `settings_controller.js`

* **Responsibilities**: Manage application settings.

  * Retrieve current settings
  * Update configuration options
  * Reset to defaults
* **Typical exports**:

  ```js
  exports.getSettings = async (req, res, next) => { /* ... */ };
  exports.updateSettings = async (req, res, next) => { /* ... */ };
  exports.resetSettings = async (req, res, next) => { /* ... */ };
  ```
* **Usage**: Registered in `settings_routes.js`.

---

## ➕ Adding a New Controller

1. **Create** `<feature>_controller.js` in this folder.
2. **Export** `async (req, res, next)` functions for each route.
3. **Hook** into `routes/<feature>_routes.js`.
4. **Delegate** logic to `services/<feature>_service.js`.

---

## 🛡️ Best Practices

* Wrap async handlers to catch errors (`try/catch` or helper wrapper).
* Keep controllers thin—avoid direct DB logic in controllers.
* Use consistent naming: `getAllX`, `getXById`, `createX`, `updateX`, `deleteX`.

---

With these guidelines, your controllers will remain organized, maintainable, and ready for scale.
