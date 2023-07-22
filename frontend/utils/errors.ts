import { isValidEmail, isValidPassword } from "./validators";

function getInvalidEmailError(email: string): string | null {
  if (!email) {
    return "Email cannot be empty.";
  }

  if (!isValidEmail(email)) {
    return "Invalid email format.";
  }

  return null;
}

function getInvalidPasswordError(password: string): string | null {
  if (!password) {
    return "Password cannot be empty.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!isValidPassword(password)) {
    return "Invalid password format.";
  }

  return null;
}

export function getLoginFormErrors(
  email: string,
  password: string
): string | null {
  const emailError = getInvalidEmailError(email);
  if (emailError) {
    return emailError;
  }

  const passwordError = getInvalidPasswordError(password);
  if (passwordError) {
    return passwordError;
  }

  return null;
}
