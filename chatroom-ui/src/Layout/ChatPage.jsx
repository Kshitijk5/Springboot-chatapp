import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
var stompClient = null;
export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const history = useHistory();
  const [image, setImage] = useState();

  const handleLogout = () => {
    localStorage.removeItem("chat-username");
    if (stompClient != null) stompClient.disconnect();
    history.push("/login");
  };
  function showMessage(temp) {
    setMessages((prev) => [temp, ...prev]);
  }
  function connect() {
    let socket = new SockJS("http://localhost:8080/ws");

    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      console.log("Connected : " + frame);

      //subscribe
      stompClient.subscribe("/topic/return-to", function (response) {
        showMessage(JSON.parse(response.body));
      });

      //subscirbe private message
      stompClient.subscribe(
        `/user/${localStorage.getItem("chat-username")}/private`,
        onPrivateMessage
      );
    });
  }

  useEffect(() => {
    connect();
  }, []);

  const sendMessage = () => {
    stompClient.send(
      "/app/message",
      {},
      JSON.stringify({
        senderName: localStorage.getItem("chat-username"),
        message: message,
        image: image,
      })
    );
    setMessage("");
    setImage("");
  };

  async function base64ConversionForImages(e) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }
  return (
    <div
      style={{
        backgroundImage: `url("http://localhost:5173/green.gif")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container p-5">
        <div className="container form-group  d-flex align-items-center justify-content-center gap-2 ">
          <input
            type="text"
            name=""
            id=""
            className="rounded-3 form-control"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="file" className="btn bg-dark text-light">
            Media
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => base64ConversionForImages(e)}
            className="d-none"
          />
          <input
            type="button"
            value={"Send"}
            className="btn btn-dark"
            onClick={sendMessage}
          />
          <input
            type="button"
            value={"Logout"}
            className="btn btn-dark"
            onClick={handleLogout}
          />
          <Link to="/test" className="btn bg-dark text-light">
            Test
          </Link>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-start">
        <div
          className="p-2"
          style={{
            minWidth: "200px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          hello
        </div>
        <div className="table" style={{ maxHeight: "400px", margin: "0" }}>
          {messages.length > 0 ? (
            <div
              className=" bg-white card"
              style={{
                minHeight: "50px",
                width: "500px",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              {messages.map((message) => {
                return (
                  <p>
                    <span>
                      <i
                        style={{
                          fontWeight: "1000",
                          fontFamily: "sans-serif",
                          fontSize: "24px",
                        }}
                      >
                        {message.senderName}:-
                      </i>
                    </span>
                    <span>
                      <>{message.message ? <p> {message.message}</p> : <></>}</>
                      {message.image ? (
                        <>
                          <img
                            src={message.image}
                            style={{ height: "150px" }}
                          />
                          <video width="320" height="240" controls>
                            <source src={message.image} type="video/mp4" />
                          </video>
                          <a
                            href={message.image}
                            download="Media"
                            target="_blank"
                          >
                            <button
                              type="button"
                              class="btn btn-success btn-lg btn-block"
                            >
                              Download Media
                            </button>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                  </p>
                );
              })}
            </div>
          ) : (
            <div
              className="container bg-white card p-3"
              style={{
                minHeight: "50px",
                width: "800px",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              No Messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
