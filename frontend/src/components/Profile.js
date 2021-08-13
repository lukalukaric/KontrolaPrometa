import { useState } from "react";
import Button from "./Button";

function Profile(props) {
  const [name, setName] = useState("ime");
  const [email, setEmail] = useState("email");
  const [lastname, setLastname] = useState("priimek");
  const [age, setAge] = useState(1);
  
  var token =localStorage.getItem("token");
  console.log(token);
  var id = LoadUserData();

  async function LoadUserData(){
    const res = await fetch('http://127.0.0.1:3000/users/' + token , {
          method: 'GET',
      });
      const data = await res.json();
      setName(data.name);
      setLastname(data.lastname);
      setEmail(data.email);
      setAge(data.age);
      console.log("name:" + name);
      return data.id;
  }
  console.log("ID: " + id);
  
  

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:3000/users/' + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                age: age,
                email: email
            })

        });
        const data = await res.json();
  }
  return (
    <div style={{ height:"90vh", maxWidth:"30%", margin:"auto", textAlign:"center", paddingTop:"150px" }}>
      <h1 style={{ color:"white"}}>Moj profil</h1>
      <br/>
      <form className="form-group" onSubmit={onSubmit}>

          <input style={{ margin:"10px" }}
            type="text"
            text={name}
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input style={{ margin:"10px" }}
            type="text"
            text={lastname}
            className="form-control"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />

          <input style={{ margin:"10px" }}
            type="email"
            text={email}
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />


          <input style={{ margin:"10px" }}
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />

        <Button text="Posodobi" />
      </form>
    </div>
  );
}

export default Profile;
