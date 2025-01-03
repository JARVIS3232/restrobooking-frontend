import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function validateForm(formData) {
  const errors = {};
  if (!formData.date) {
    errors.date = "Date is required.";
  }

  if (!formData.guests) {
    errors.guests = "Number of guests is required.";
  } else if (isNaN(formData.guests) || formData.guests <= 0) {
    errors.guests = "Guests must be a positive number.";
  }

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  } else if (formData.name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (!formData.contact.trim()) {
    errors.contact = "Contact is required.";
  } else {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (
      !emailRegex.test(formData.contact) &&
      !phoneNumberRegex.test(formData.contact)
    ) {
      errors.contact =
        "Contact must be a valid 10-digit number or a valid email.";
    }
  }

  return errors;
}
