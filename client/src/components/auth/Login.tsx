import React, { SyntheticEvent, useState, ChangeEvent } from "react";
import { logInToChat } from "../../api/authApi";
import { User } from "../../models/user";
import { authValidator } from "../../utils/authValidator";
authValidator;
interface LoginProps {
  goToRegister: () => void;
}

export default function Login(props: LoginProps) {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  } as User);
  const [authValidationError, setAuthValidationError] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    // const user: User = {username: username, password: password};
    if (!authValidator(user, setAuthValidationError)) {
      return;
    }
    const res = await logInToChat(user);
  }
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAuthValidationError("");
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={user.username}
          onChange={(e) => handleUserChange(e)}
          type="text"
          placeholder="username"
          name="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={user.password}
          onChange={(e) => handleUserChange(e)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
          name="password"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Login
        </button>
        <div className="text-center my-2">
          <div>
            Dont have an account?
            <button className="ml-1" onClick={props.goToRegister}>
              Register
            </button>
          </div>
        </div>
        <div className="text-center h-12">
          {authValidationError && (
            <p className="text-red-500 font-bold p-2 border-solid border-2 border-red-600 rounded">
              {authValidationError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
