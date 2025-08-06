// This function validates an email address using a regular expression.
export const validateEmail = (email) => {
  if (!email) {
    return "Email address is required.";
  }
  // A common regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return ""; // Return an empty string if validation passes
};

// This function validates the password.
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  // You could add more complex rules here (e.g., require numbers, special characters)
  return ""; // Return an empty string if validation passes
};
