import { useState } from "react";
import Button from "./Button";
function Register(props) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [repass, setRePass] = useState("");
  const [age, setAge] = useState("");
  function onSubmit(e) {
    e.preventDefault();

    //Validacija podatkov
    if (pass !== repass) {
      alert("Gesli se ne ujemata");
      return;
    }
    props.onRegister({ name, pass, email, lastname, age });
  }
  return (
    <div style={{ height:"90vh", maxWidth:"30%", margin:"auto", textAlign:"center", paddingTop:"150px" }}>
      <form className="form-group" onSubmit={onSubmit}>

          <input style={{ margin:"10px" }}
            type="text"
            name="firstname"
            className="form-control"
            placeholder="Firstname"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input style={{ margin:"10px" }}
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />

          <input style={{ margin:"10px" }}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />


          <input style={{ margin:"10px" }}
            type="number"
            name="age"
            className="form-control"
            placeholder="Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />

          <input style={{ margin:"10px" }}
            type="Password"
            name="pass"
            className="form-control"
            placeholder="Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <input style={{ margin:"10px" }}
            type="Password"
            name="repass"
            className="form-control"
            placeholder="Re-type password"
            value={repass}
            onChange={(e) => {
              setRePass(e.target.value);
            }}
          />

        <Button text="Register" />
      </form>
    </div>
  );
}

export default Register;
