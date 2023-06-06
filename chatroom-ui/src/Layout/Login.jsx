import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState();

  const handleLogin = () => {
    localStorage.setItem("chat-username", username);
   
    history.push("/chat");
  };

  return (
    <div
      className="bg-primary d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="container form-group w-25  d-flex align-items-center justify-content-center gap-2">
        <input
          type="text"
          name=""
          id=""
          className="rounded-3 form-control"
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e) => {
            console.log(e.key);
            if (e.key == "Enter" || e.key == 13) handleLogin();
          }}
        />
        <input
          type="button"
          value={"Connect"}
          className="btn btn-dark"
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};
