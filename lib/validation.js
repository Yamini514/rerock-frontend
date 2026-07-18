export function required(value, message = "This field is required") {
  if (value === undefined || value === null) return message;
  return String(value).trim() === "" ? message : null;
}

export function isEmail(value, message = "Enter a valid email address") {
  if (!value) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) ? null : message;
}

export function isPositiveNumber(value, message = "Enter a value greater than 0") {
  if (value === "" || value === undefined || value === null) return message;
  const n = Number(value);
  return !Number.isNaN(n) && n > 0 ? null : message;
}

export function inRange(value, min, max, message) {
  if (value === "" || value === undefined || value === null) return message || `Enter a value between ${min} and ${max}`;
  const n = Number(value);
  return !Number.isNaN(n) && n >= min && n <= max ? null : message || `Enter a value between ${min} and ${max}`;
}

export function minLength(value, len, message) {
  return String(value || "").trim().length >= len ? null : message || `Must be at least ${len} characters`;
}

export function notDuplicate(value, existingValues, message = "This already exists") {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  return existingValues.some((v) => String(v).trim().toLowerCase() === normalized) ? message : null;
}

/**
 * Runs a set of {field, validators: [...]} checks, returns the first error per field.
 * Usage: runValidation({ title: [() => required(form.title)], price: [() => isPositiveNumber(form.price)] })
 */
export function runValidation(fieldValidators) {
  const errors = {};
  for (const [field, validators] of Object.entries(fieldValidators)) {
    for (const validator of validators) {
      const message = validator();
      if (message) {
        errors[field] = message;
        break;
      }
    }
  }
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
