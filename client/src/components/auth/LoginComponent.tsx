import React, { SyntheticEvent, useState, ChangeEvent } from "react";
import { logInToChat } from "../../api/authApi";
import { User } from "../../models/User";
import { authValidator } from "../../utils/authValidator";
import { useNavigate } from "react-router-dom";
import { UseAuthUser } from "../../hooks/UseAuthUser";

export function LoginComponent() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  } as User);
  const [authValidationError, setAuthValidationError] = useState<string>("");
  const { setUser: setGlobalUser, setId } = UseAuthUser();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!authValidator(user, setAuthValidationError)) {
      return;
    }
    const res = await logInToChat(user);
    if (res.error) {
      setAuthValidationError(res.error);
    }
    if (res.respond) {
      setGlobalUser(user.username);
      setId(res.respond);
    }
  };
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAuthValidationError("");
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="flex items-center sm:mt-25 flex-col">
      <h2 className="mb-16 text-4xl text-center">Log to the chat hub!</h2>
      <form className="w-64 mx-auto mb-12 " onSubmit={handleSubmit}>
        <input
          value={user.username}
          onChange={(e) => handleUserChange(e)}
          type="text"
          placeholder="username"
          name="username"
          className="block w-full rounded-sm p-2 mb-2 border text-black"
        />
        <input
          value={user.password}
          onChange={(e) => handleUserChange(e)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border text-black"
          name="password"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Log in
        </button>
        <div className="text-center my-2">
          <div>
            Dont have an account?
            <button className="ml-1" onClick={navigateToRegister}>
              Register
            </button>
          </div>
        </div>
        <div className="text-center h-12">
          {authValidationError && (
            <p className="text-white-500 font-bold p-2 border-solid border-2 border-red-600 rounded bg-redTransparent">
              {authValidationError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
