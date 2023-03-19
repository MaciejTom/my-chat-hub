import { SyntheticEvent, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {LogViewState} from '../../models/LogViewState'
import axios from "axios";
import Login from './Login'
import Register from './Register'

export default function RegisterAndLoginForm() {

  const [logViewState, setlogViewState] = useState<LogViewState>(LogViewState.Login);
  
  // const { setUsername: setLoggedInUsername, setId } = useAuth();

  if (logViewState === LogViewState.Login) {
  return (
    <Login goToRegister={() => setlogViewState(LogViewState.Register)}/>
  )}

  if (logViewState === LogViewState.Register) {
    return <Register goToLogin={() => setlogViewState(LogViewState.Login)}/>
  }
}
