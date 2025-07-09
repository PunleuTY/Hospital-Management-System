# Middlewares Directory

This README describes every file in the `backend/src/middlewares/` directory, outlining their roles, common patterns, and usage.

---

## 📁 Directory Structure

```text
backend/
└── src/
    └── middlewares/
        ├── auth_middleware.js
        ├── validate_middleware.js
        └── error_middleware.js
```

> **Tip:** Add new cross-cutting concerns here (e.g., `logging.middleware.js`).

---

## 🎯 Purpose of Middlewares

Middlewares in Express are functions that have access to the request (`req`), response (`res`), and next middleware (`next`) in the cycle. They enable:

* **Pre-processing**: Validating or transforming incoming requests.
* **Authentication & Authorization**: Guarding routes.
* **Error Handling**: Centralizing error responses.
* **Logging & Monitoring**: Capturing request/response metadata.

---

## 📄 Middleware Files

### `auth_middleware.js`

* **Purpose**: Protect routes by verifying JWT tokens or session credentials.
* **Typical content**:

  ```js
  const jwt = require('jsonwebtoken');
  const { jwtSecret } = require('../../config/app.config');

  module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = payload;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  ```
* **Usage**: Attach to protected routes:

  ```js
  router.get('/patients', authMiddleware, patientController.getAllPatients);
  ```

---

### `validate_middleware.js`

* **Purpose**: Ensure request bodies or parameters match expected schemas (e.g., using Joi or custom validators).
* **Typical content**:

  ```js
  const { validateSchema } = require('../utils/validator');

  module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  };
  ```
* **Usage**: Pass a Joi schema to the middleware:

  ```js
  const patientSchema = require('../validators/patient.validator');
  router.post('/patients', validateMiddleware(patientSchema), patientController.createPatient);
  ```

---

### `error_middleware.js`

* **Purpose**: Catch unhandled errors from controllers or other middlewares and send a standardized response.
* **Typical content**:

  ```js
  module.exports = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
  };
  ```
* **Usage**: Register after all routes in `app.js`:

  ```js
  app.use(errorMiddleware);
  ```

---

## ➕ Adding a New Middleware

1. **Create** `src/middlewares/<name>.middleware.js`.
2. **Export** a function with signature `(req, res, next)` or `(err, req, res, next)` for error handlers.
3. **Import** and **use** in `app.js` or in specific routes.

---

## 🛡️ Best Practices

* **Order matters**: Middlewares run in the order registered—place authentication before route handlers.
* **Single responsibility**: Each middleware should focus on one concern (auth, validation, logging).
* **Handle async errors**: Wrap async middlewares in try/catch or use a helper to forward errors.
* **Never swallow errors**: Always call `next(err)` or send a response.

---

With these patterns, your middleware layer will remain organized, predictable, and robust, ensuring clean handling of cross-cutting concerns across your API.
