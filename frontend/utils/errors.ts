const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function getInvalidEmailError(email: string): string | null {
  if (!email) {
    return "Email cannot be empty.";
  }

  if (!emailRegex.test(email)) {
    return "Invalid email format.";
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

  if (!password) {
    return "Password cannot be empty.";
  }

  return null;
}
