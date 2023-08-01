import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Style.css";
function Signup() {
  let navigate = useNavigate();
  // let history = useHistory();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authToken:
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3NTk0YTFlMGEyZTQ1MDA4NjEwMzQxIn0sImlhdCI6MTY1MTg3MjkyOX0.FktuCJ_m74kP-1xM5p7XKKHzJsRAcc_mgtCuLQSgE90",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });

    const jj = await response.json();
    console.log(jj);
    if (response.ok) {
      localStorage.setItem("authtoken", jj.authtoken);
      alert("Signup successful");
      navigate(`/`);
    } else {
      alert("user already exist");
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
            <h1 class="h3 mb-3 fw-normal">Sign-up</h1>
            <div class="form-floating">
              <input
                type="text"
                class="form-control login-ip"
                value={user.name}
                name="name"
                id="floatingInput"
                placeholder="Jhon Doe"
                onChange={handleOnChange}
              />
              <label for="floatingInput">Name</label>
            </div>
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

export default Signup;
