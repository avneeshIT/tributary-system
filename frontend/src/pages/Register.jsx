import { useState } from "react";
import axios from "axios";

function Register({ closeModal }) {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration successful. Please login.");
      closeModal();

    }catch(error){

      console.error(error);
      alert("Registration failed");

    }
  };

  return(

    <div className="login-container">

      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );
}

export default Register;