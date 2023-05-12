import React, { SyntheticEvent, useState, ChangeEvent } from "react";
import { registerOnChat } from "../../api/authApi";
import { User } from "../../models/User";
import { authValidator } from "../../utils/authValidator";
import { UseAuthUser } from "../../hooks/UseAuthUser";
import { useNavigate } from "react-router-dom";

export function RegisterComponent() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  } as User);

  const [authValidationError, setAuthValidationError] = useState<string>("");
  const { setUser: setGlobalUser, setId } = UseAuthUser();
  
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!authValidator(user, setAuthValidationError)) return;

    const res = await registerOnChat(user);
    if (res.error) {
      setAuthValidationError(res.error);
    }
    if (res.respond) {
      setGlobalUser(user.username);
      setId(res.respond);
    }
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
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex items-center flex-col sm:mt-25">
      <h2 className="mb-16 text-4xl text-center">Register on the chat hub!</h2>
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={user.username}
          onChange={(e) => handleUserChange(e)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border text-black"
          name="username"
        />
        <input
          value={user.password}
          onChange={(e) => handleUserChange(e)}
          type="password"
          placeholder="password"
          name="password"
          className="block w-full rounded-sm p-2 mb-2 border text-black"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
        <div className="text-center my-2">
          <div>
            Already a member?
            <button className="ml-1" onClick={navigateToLogin}>
              Login here
            </button>
          </div>
        </div>
        <div className="text-center h-12">
          {authValidationError && (
            <p className="font-bold p-2 border-solid border-2 border-red-600 rounded bg-redTransparent">
              {authValidationError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
