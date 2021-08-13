import { useEffect, useState } from "react";
import Button from "./Button";
import osm from "./MapAddition";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pic from "../resources/images/marker.png";
import axios from 'axios';

const markerIcon = new L.Icon({
  iconUrl: pic,
  iconRetinaUrl: pic,
  iconSize: [40, 40],
  popupAnchor: [0, -46],
});
function Cars(props) {
  const HOST_NAME = `http://127.0.0.1:3000/`;
  const [response, setCars] = useState([]);
  const [center, setCenter] = useState({ lat: 46.084622, lng: 15.247367 });
  const [register, setRegister] = useState([]);
/*
 {response.map((car) => (
        <h4 key={car._id}>
          <br/>
          <p>Model: {car.model} </p>
          <p>Letnik: {car.firstRegistration}</p>
          <p>Tablica: {car.registration}</p>
          <p>
            {" "}
            <img
              src={`${HOST_NAME}${car.img}`}
              alt={car._id}
              height="50%"
              width="60%"
            />
          </p>
          
          <button className="btn btn-light" onClick={() => download(`${HOST_NAME}${car.img}`)} > Prenesi sliko </button>
        </h4>
      ))}




        <br/>
          <p>Model: {Cars.model} </p>
          <p>Letnik: {Cars.firstRegistration}</p>
          <p>Tablica: {Cars.registration}</p>
          <p>
            {" "}
            <img
              src={`${HOST_NAME}${Cars.img}`}
              alt={Cars._id}
              height="50%"
              width="60%"
            />
          </p>
          
          <button className="btn btn-light" onClick={() => download(`${HOST_NAME}${Cars.img}`)} > Prenesi sliko </button>
      <br/>
*/
  const ZOOM_LEVEL = 9;
  useEffect(function () {
    const getCars = async function () {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("token", token);
      const res = await fetch(`${HOST_NAME}cars/get`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setRegister(data.CarVideos)
      setCars(data.Cars);

      console.log(data.Cars)

    };
    getCars();
  }, []);

  function redirect() {
    window.location.href = "/registercar";
  }
  function download(values) {
    axios({
      url:values,
      method:'GET',
      responseType: 'blob'
})
.then((response) => {
  console.log(response.data)
     const url = window.URL
     .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'proof.jpg');
            document.body.appendChild(link);
            link.click();
})
  }
  return (
    <div style={{ margin:"5px", overflow:"auto", height:"85vh", padding:"30px", background:"#29648A"}}>
      <Button text="Dodaj avto" onClick="./registercar" />
      {response.map((car) => (
        <h4 key={car._id}>
          <br/>
          <p>Model: {car.model} </p>
          <p>Letnik: {car.firstRegistration}</p>
          <p>Tablica: {car.registration}</p>
          <p>
            {" "}
            <img
              src={`${HOST_NAME}${car.img}`}
              alt={car._id}
              height="50%"
              width="60%"
            />
          </p>
          
          <button className="btn btn-light" onClick={() => download(`${HOST_NAME}${car.img}`)} > Prenesi sliko </button>


      <h3>Registerska tablica je bila zaznana tukaj: </h3>
      <div>
        <MapContainer center={center} zoom={ZOOM_LEVEL}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
        {register.map((reg) => (
        <h4 key={reg._id}>
          <br/>
          <p>Model: {reg.model} </p>
          {reg.tablica.toString().includes(car.registration) == true ? (
            <Marker position={[reg.Latitude, reg.Longitude]} icon={markerIcon}></Marker>

        ) : ( 
          <div>{            

   
          } {            
          } </div>
        )}

        </h4>
      ))}
      
        </MapContainer>
      </div>
        </h4>
      ))}

    </div>
  );
}
export default Cars;
