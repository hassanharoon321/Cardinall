import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { baseUrl } from "../../utils";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        // Register user in your app
        await axios.post(baseUrl + "/api/auth/register", user);

        // Create a user on Chat Engine
        await createChatUser(user);

        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Function to create a user on Chat Engine
  const createChatUser = async (user) => {
    const data = {
      username: user.username,
      secret: user.password, // Using the password as secret (you might want to change this)
      email: user.email,
      first_name: "", // You can add first name if available
      last_name: "", // You can add last name if available
      custom_json: {} // Add any custom data if needed
    };

    const config = {
      method: 'post',
      url: 'https://api.chatengine.io/users/',
      headers: {
        'PRIVATE-KEY': 'e9176648-b57b-4f21-83bc-ceb3f11e3835' // Replace with your private key
      },
      data: JSON.stringify(data)
    };

    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Cardinal</h3>
          <span className="loginDesc">Login or Sign Up.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
