import { useEffect, useState } from "react";
import Button from "./Button";
function RegisterCar(props) {

  const HOST_NAME = `http://127.0.0.1:3000/`;
  const [response, setCars] = useState([]);
  const [model, setModel] = useState([]);
  const [registration, setRegistration] = useState([]);
  const [registerNumber, setRegisterNumber] = useState([]);
  const [file, setFile] = useState("");

  async function Register(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model", model);
    formData.append("registration", registration);
    formData.append("registerNumber", registerNumber);
    formData.append("slika", file);
    formData.append("token", localStorage.getItem("token"));
    console.log(...formData);
    const res = await fetch(`${HOST_NAME}cars`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success === false) {
      window.alert("Napaka");
    } else if (data.success === true) {
      window.location.href = "/carcollection";
    }
  }

  return (
    <div style={{ height:"90vh", maxWidth:"30%", margin:"auto", paddingTop:"150px" }}>
      <form onSubmit={Register}>
        <input
          type="text"
          name="model"
          placeholder="Model"
          className="form-control"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <input
          type="number"
          name="registration"
          placeholder="Letnik"
          className="form-control"
          value={registration}
          min="1970"
          max="2021"
          onChange={(e) => {
            setRegistration(e.target.value);
          }}
        />
        <input
          type="text"
          name="registernumber"
          placeholder="Registerska"
          className="form-control"
          value={registerNumber}
          onChange={(e) => {
            setRegisterNumber(e.target.value);
          }}
        />
        <br/>
        <label style={{ color:"white"}}>Slika avtomobila:</label>
        <input
          type="file"
          id="file"
          className="form-control"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br/>
        <div style={{ textAlign:"center"}}>
        <Button text="Registriraj avto" />
        </div>
      </form>{" "}
    </div>
  );
}
export default RegisterCar;
