import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./button.css";

export const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState();

  const handleLogin = () => {
    localStorage.setItem("chat-username", username);

    history.push("/chat");
  };

  return (
    <div
      className=" d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundImage: `url("https://picsum.photos/1536/735?grayscale")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
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
        <button type="button" value={"Connect"} onClick={handleLogin}>
          <span>Connect</span>
        </button>
      </div>
    </div>
  );
};
