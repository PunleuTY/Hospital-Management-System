# Utils Directory

This README documents every file in the `backend/src/utils/` directory, explaining their roles and patterns for usage.

---

## 📁 Directory Structure

```text
backend/
└── src/
    └── utils/
        ├── logger.js
        ├── response.js
        └── validator.js
```

> **Tip:** Add any shared helper modules here (e.g., dateFormatter.js, pagination.js).

---

## 🎯 Purpose of the Utils Layer

Utils are **reusable helper functions** that cut across multiple layers:

1. **Logging**: Centralize logging behavior (levels, formatting).
2. **Response formatting**: Standardize API success/error payloads.
3. **Validation**: Common validation functions (custom checks, schema wrappers).

By isolating these concerns, you avoid duplication and keep your code DRY.

---

## 📄 Utility Files

### `logger.js`

* **Purpose**: Provide a unified logging interface.
* **Typical content**:

  ```js
  const { createLogger, transports, format } = require('winston');

  const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
      )
    ),
    transports: [new transports.Console()]
  });

  module.exports = logger;
  ```
* **Usage**: Import and use in services or middlewares:

  ```js
  const logger = require('../utils/logger');
  logger.info('Patient created with ID:', patient.id);
  ```

---

### `response.js`

* **Purpose**: Standardize HTTP JSON responses across controllers.
* **Typical content**:

  ```js
  exports.success = (res, data, message = 'OK', status = 200) => {
    res.status(status).json({ success: true, message, data });
  };

  exports.error = (res, message = 'Error', status = 500) => {
    res.status(status).json({ success: false, message });
  };
  ```
* **Usage**: In controllers:

  ```js
  const { success, error } = require('../utils/response');

  exports.getPatientById = async (req, res, next) => {
    try {
      const patient = await patientService.getPatientById(req.params.id);
      return success(res, patient, 'Patient retrieved');
    } catch (err) {
      return error(res, err.message, err.status);
    }
  };
  ```

---

### `validator.js`

* **Purpose**: Provide common validation helpers or integrate with Joi.
* **Typical content**:

  ```js
  const Joi = require('joi');

  exports.validateSchema = (schema, data) => {
    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
  };

  exports.isUUID = (value) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  };
  ```
* **Usage**: In validation middleware or services:

  ```js
  const { validateSchema, isUUID } = require('../utils/validator');
  const message = validateSchema(patientCreateSchema, req.body);
  if (message) return res.status(400).json({ message });
  ```

---

## 🛡️ Best Practices

* **Single responsibility**: Each util should do one thing well (logging vs formatting vs validation).
* **Stateless**: Avoid side effects; pure functions are easier to test.
* **Consistent interface**: Keep function signatures predictable for easier import.
* **Test coverage**: Write unit tests for complex helpers to ensure reliability.

---

With these utilities in place, your codebase will be more maintainable, consistent, and ready for scaling.
