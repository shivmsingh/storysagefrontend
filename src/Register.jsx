import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, password, email } = formData;
    if (!name || !password || !email) {
      setErrorMsg("Please fill in all fields");
      return false;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Invalid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const url = "http://localhost:8083/auth/register";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();
      console.log(response);
      if (response.ok) {
        console.log(jsonData);
        setErrorMsg("Registration successful");
        navigate("/");
      } else {
        throw new Error(jsonData.errorMsg || "Failed to register");
      }
    } catch (error) {
      console.log("error");
      setErrorMsg(error.errorMsg);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInput}
          ></input>
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          ></input>
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          ></input>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default Register;
