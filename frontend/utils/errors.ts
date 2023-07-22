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

  if (password.length >= 50) {
    return "Password must be atmost 50 characters long.";
  }

  if (!isValidPassword(password)) {
    return "Invalid password format.";
  }

  return null;
}

function getInvalidNameError(name: string): string | null {
  if (!name) {
    return "Name cannot be empty.";
  }

  if (name.length < 3) {
    return "Name must be at least 3 characters long.";
  }

  if (name.length >= 50) {
    return "Name must be atmost 50 characters long.";
  }

  return null;
}

export function getLoginFormErrors(
  email: string,
  password: string
): string | null {
  if (!email && !password) {
    return "All fields are required.";
  }

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

export function getRegisterFormErrors(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): string | null {
  if (!name && !email && !password && !confirmPassword) {
    return "All fields are required.";
  }

  const nameError = getInvalidNameError(name);
  if (nameError) {
    return nameError;
  }

  const emailError = getInvalidEmailError(email);
  if (emailError) {
    return emailError;
  }

  const passwordError = getInvalidPasswordError(password);
  if (passwordError) {
    return passwordError;
  }

  if (password !== confirmPassword) {
    return "Passwords must match.";
  }

  return null;
}
