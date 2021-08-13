import { BrowserRouter, Route, useHistory } from "react-router-dom";

import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Logout from "./components/Logout.js";
import Profile from "./components/Profile.js";
import Cars from "./components/Cars.js";
import RegisterCar from "./components/RegisterCar.js";
import Oglas from "./components/Oglas";
import Footer from "./components/Footer";
import GetDataFromAtlas from "./components/GetDataFromAtlas";

function App() {

  const HOST_NAME = `http://127.0.0.1:3000/`;
  async function Registration(state) {
    const formData = new FormData();

    console.log(...formData);
    formData.append("name", state.name);
    formData.append("lastname", state.lastname);
    formData.append("pass", state.pass);
    formData.append("email", state.email);
    formData.append("age", state.age);
    const res = await fetch(`${HOST_NAME}users`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success === false) {
    } else if (data.success === true) {
      window.location.href = "/login";
    }
  }

  async function LoadUserInfo(state) {
    //TODO
  }

  return (
    <BrowserRouter>
      <div style={{background:"#29648A"}}>
        <Header />
        <Oglas align="left"/>
        <Oglas align="right"/>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/registracija">
          <Register onRegister={Registration}></Register>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/logout">
          <Logout></Logout>
        </Route>
        <Route path="/profile">
          <Profile onLoad={LoadUserInfo}></Profile>
        </Route>
        <Route path="/carcollection">
          <Cars></Cars>
        </Route>
        <Route path="/registercar">
          <RegisterCar></RegisterCar>
        </Route>
        <Route path="/data">
          <GetDataFromAtlas></GetDataFromAtlas>
        </Route>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
