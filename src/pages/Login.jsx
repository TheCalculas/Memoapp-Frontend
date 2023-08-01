import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Style.css";
function Login() {
  let navigate = useNavigate();
  // let history = useHistory();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      // save kar rha hu mei auth token ko :P
      window.localStorage.setItem("token", json.authToken);
      console.log(window.localStorage.getItem("token"));
      // history.push("/");
      navigate(`/`);
    } else {
      alert("invalid cred");
    }
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div div class="text-center">
        <main class="form-signin login-main">
          <form>
            <h1 class="h3 mb-3 fw-normal">Log In</h1>

            <div class="form-floating">
              <input
                type="email"
                class="form-control login-ip"
                value={user.email}
                name="email"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleOnChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control login-ip"
                name="password"
                value={user.password}
                id="floatingPassword"
                placeholder="Password"
                onChange={handleOnChange}
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button
              class="w-100 btn btn-lg btn-primary button-login"
              onClick={handleOnSubmit}
              type="submit"
            >
              Sign in
            </button>
            <p class="mt-5 mb-3 text-muted">&copy; Memoizer </p>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
