
import React from "react";
import { auth } from "../../firebase";

export default function Test() {
  return (
    <div>
      <h1>User Logged In </h1>
      {auth.currentUser.email}
        <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}