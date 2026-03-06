import { useState } from "react";
import axios from "axios";

function Login({ openRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "https://tributary-system.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      window.location.reload();

    } catch (error) {

      alert("Login failed");

    }
  };

  return (
    <div className="login-container">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

        <p style={{marginTop:"10px"}}>
          Don't have an account?{" "}
          <span
            style={{color:"#3a5f3d",cursor:"pointer",fontWeight:"bold"}}
            onClick={openRegister}
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;