import React, { SyntheticEvent, useState, ChangeEvent } from "react";
import { registerOnChat } from "../../api/authApi";
import { User } from "../../models/user";
import { authValidator } from "../../utils/authValidator";

interface LoginProps {
  goToLogin: () => void;
}

export default function Register(props: LoginProps) {

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  } as User);
  const [authValidationError, setAuthValidationError] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
        if (!authValidator(user, setAuthValidationError)) {return}

    // // const url = isLoginOrRegister === "register" ? "register" : "login";
    const res = await registerOnChat(user);
    // setLoggedInUsername(username);
    // setId(data.id);
  }
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAuthValidationError('');
    const value = e.target.value
    setUser({
      ...user,
      [e.target.name]: value,
    });
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={user.username}
            onChange={(e) => handleUserChange(e)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
          name="username"
        />
        <input
          value={user.password}
         onChange={(e) => handleUserChange(e)}
          type="password"
          placeholder="password"
          name="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
        <div className="text-center my-2">
          <div>
            Already a member?
            <button className="ml-1" onClick={props.goToLogin}>
              Login here
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
