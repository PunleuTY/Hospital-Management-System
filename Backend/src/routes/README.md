# Routes Directory

This README covers every file in the `backend/src/routes/` directory, detailing their roles, typical patterns, and usage.

---

## 📁 Directory Structure

```text
backend/
└── src/
    └── routes/
        ├── patient_routes.js
        ├── doctor_routes.js
        ├── appointment_routes.js
        ├── billing_routes.js
        ├── staff_routes.js
        ├── report_routes.js
        └── settings_routes.js
```

> **Note:** Add new route files here whenever you introduce a new feature (e.g., `auth_routes.js`).

---

## 🎯 Purpose of the Routes Layer

Routes are the **URL-to-controller map**. They:

1. **Define endpoints** and HTTP methods (GET, POST, PUT, DELETE).
2. **Attach middleware** (authentication, validation) to specific routes.
3. **Delegate** the request handling to corresponding controller functions.

Keeping routes **lightweight** ensures discoverability and easy maintenance.

---

## 📄 Route Files

Each `*_routes.js` file exports an Express router configured for one resource.

### Common Pattern

```js
const express = require('express');
const router = express.Router();
const <entity>Controller = require('../controllers/<entity>.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const <entity>Validator = require('../validators/<entity>.validator');

// Example: GET /entities
router.get('/', authMiddleware, <entity>Controller.getAll<Entities>);

// Example: POST /entities
router.post(
  '/',
  authMiddleware,
  validate(<entity>Validator.createSchema),
  <entity>Controller.create<entity>
);

module.exports = router;
```

---

### `patient_routes.js`

* **Base path**: `/patients`
* **Endpoints**:

  * `GET /` → `patientController.getAllPatients`
  * `GET /:id` → `patientController.getPatientById`
  * `POST /` → `patientController.createPatient`
  * `PUT /:id` → `patientController.updatePatient`
  * `DELETE /:id` → `patientController.deletePatient`

---

### `doctor_routes.js`

* **Base path**: `/doctors`
* **Endpoints**:

  * `GET /` → `doctorController.getAllDoctors`
  * `GET /:id` → `doctorController.getDoctorById`
  * `POST /` → `doctorController.createDoctor`
  * `PUT /:id` → `doctorController.updateDoctor`
  * `DELETE /:id` → `doctorController.deleteDoctor`

---

### `appointment_routes.js`

* **Base path**: `/appointments`
* **Endpoints**:

  * `GET /` → `appointmentController.getAllAppointments`
  * `GET /:id` → `appointmentController.getAppointmentById`
  * `POST /` → `appointmentController.createAppointment`
  * `PUT /:id` → `appointmentController.updateAppointment`
  * `DELETE /:id` → `appointmentController.deleteAppointment`

---

### `billing_routes.js`

* **Base path**: `/billing`
* **Endpoints**:

  * `GET /` → `billingController.getAllBills`
  * `GET /:id` → `billingController.getBillById`
  * `POST /` → `billingController.createBill`
  * `POST /:id/pay` → `billingController.payBill`

---

### `staff_routes.js`

* **Base path**: `/staff`
* **Endpoints**:

  * `GET /` → `staffController.getAllStaff`
  * `GET /:id` → `staffController.getStaffById`
  * `POST /` → `staffController.createStaff`
  * `PUT /:id` → `staffController.updateStaff`
  * `DELETE /:id` → `staffController.deleteStaff`

---

### `report_routes.js`

* **Base path**: `/reports`
* **Endpoints**:

  * `POST /generate` → `reportController.generateReport`
  * `GET /:id` → `reportController.getReportById`
  * `GET /:id/download` → `reportController.downloadReport`

---

### `settings_routes.js`

* **Base path**: `/settings`
* **Endpoints**:

  * `GET /` → `settingsController.getSettings`
  * `PUT /` → `settingsController.updateSettings`
  * `POST /reset` → `settingsController.resetSettings`

---

## ➕ Adding a New Route

1. **Create** `src/routes/<feature>_routes.js`.
2. **Import** the corresponding controller and any middleware.
3. **Define** your endpoints, attaching middleware and controller handlers.
4. **Register** the new router in `app.js`:

   ```js
   const patientRoutes = require('./routes/patient.routes');
   app.use('/patients', patientRoutes);
   ```

---

## 🛡️ Best Practices

* **Consistent base paths**: use plural nouns (`/patients`, `/doctors`).
* **HTTP semantics**: GET for reads, POST for creation, PUT/PATCH for updates, DELETE for removals.
* **Middleware order**: authorize **before** validation, validate **before** controllers.
* **Keep routes concise**: delegate complex logic to services.

---

With this blueprint, your routes layer will be clear, predictable, and easy to extend.
