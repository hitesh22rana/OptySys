const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*])[a-zA-Z\d@!#$%^&*]{8,}$/;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return passwordRegex.test(password);
}
