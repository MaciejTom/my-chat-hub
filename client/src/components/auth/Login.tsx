import React, { SyntheticEvent, useState } from "react";
import { logInToChat } from "../../api/authApi";

interface LoginProps {
  goToRegister: () => void;
}

export default function Login(props: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    // // const url = isLoginOrRegister === "register" ? "register" : "login";
    const res = await logInToChat(username, password);
    // setLoggedInUsername(username);
    // setId(data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Login
        </button>
        <div className="text-center mt-2">
          <div>
            Dont have an account?
            <button className="ml-1" onClick={props.goToRegister}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
