import { useState, useEffect } from "react";
import Button from './Button';

function Header(props) {
  const [isLogin, setisLogin] = useState(false);
  const getValueLocalStorage = () => {
    if (localStorage.getItem("token") !== null) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
  };
  useEffect(function () {
    getValueLocalStorage();
  }, []);
  return (
    <nav>
      <div style={{ padding:"10px", textAlign:"center",background:"#25274D" }}>
        <div style={{ display:"inline", margin:"3px" }} >
        <Button text="Domov" onClick="/home"/>
        </div>

        {isLogin === false ? (
          <div style={{ display:"inline" }}>
            <div style={{ display:"inline", margin:"3px" }} >
              <Button text="Registracija" onClick="/registracija" />
            </div>
            <div style={{ display:"inline", margin:"3px" }} >
              <Button text="Prijava" onClick="/login" />
            </div>
          </div>
        ) : (
          <div style={{ display:"inline" }}>
            <div style={{ display:"inline", margin:"3px" }} >
              <Button text="Profil" onClick="/profile" />
            </div>
            <div style={{ display:"inline", margin:"3px" }} >
              <Button text="Moji avtomobili" onClick="/carcollection" />
            </div>
            <div style={{ display:"inline", margin:"3px" }} >
              <Button text="Odjava" onClick="/logout" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Header;
