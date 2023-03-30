import { User } from "../models/User";

export const authValidator = (
  user: User,
  setAuthValidationError: (value: string) => void
): boolean => {
  if (Object.values(user).some((el) => el?.length === 0)) {
    setAuthValidationError("Please provide email and password");
    return false;
  } else if (user.password.length < 8) {
    setAuthValidationError("Password must be at least 8 characters long");
    return false;
  } else if (user.username.length < 3) {
    setAuthValidationError("Username must contain at least 3 characters");
    return false;
} else if (user.password.length > 15) {
    setAuthValidationError("Password can contain up to 15 characters");
    return false;
} else if (user.username.length > 15) {
    setAuthValidationError("Username can contain up to 15 characters");
    return false;
  } else {
    setAuthValidationError("");
    return true;
  }
};
