import { useState } from "react";
import Button from "./Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function Login(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", username);
    formData.append("password", password);
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic " + btoa("username:password"));
    headers.append("Origin", "http://localhost:3000");
    /*
    headers: new Headers({
        Authorization: "Basic " + btoa("username:password"),
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      headers: headers,
    */

    const res = await fetch("http://127.0.0.1:3000/users/login", {
      method: "POST",
      body: formData,
    });
    const response = await res.json();
    const { success, token } = response;
    if (success == false) {
      alert("WRONG USERNAME OR PASSWORD");
    } else if (success == true) {
      console.log(response);
      localStorage.setItem("token", token);
      window.location.href = "/home";
      //console.log(response.user._id);
      /*
      localStorage.setItem("email", email);
      localStorage.setItem("id", _id);
      */
    }
    setUsername("");
    setPassword("");
  }
  return (
    <div style={{ height:"90vh", maxWidth:"30%", margin:"auto", textAlign:"center", paddingTop:"200px"}}>
    <form className="form-group" onSubmit={Login}>
      <input style={{ margin:"10px" }}
        type="text"
        className="form-control"
        name="username"
        placeholder="Uporabniško ime"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input style={{ margin:"10px" }}
        type="password"
        className="form-control"
        name="password"
        placeholder="Geslo"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button text="Prijavi" />
    </form>
    </div>
  );
}
export default Login;
