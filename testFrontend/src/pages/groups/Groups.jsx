import { useState } from "react";

import "./Groups.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";

function Groups() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default Groups;