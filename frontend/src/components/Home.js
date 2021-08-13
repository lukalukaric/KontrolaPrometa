import { useState, useEffect } from "react";

function Home(props) {
  const HOST_NAME = `http://127.0.0.1:3000/`;
  const [response, setScraper] = useState([]);

  useEffect(function () {
    const getScraper = async function () {
      const res = await fetch(`${HOST_NAME}users`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setScraper(data);
    };
    getScraper();
  }, []);
  function test(scraper){
    if (scraper.title.includes("Zastoj"))
    return (
        <img src="https://www.promet.si/portal/res/icons/dogodki/zastoj.png" height="70px"/>
      );
    else if (scraper.title.includes("Delo"))
      return (
        <img src="https://www.promet.si/portal/res/icons/dogodki/delo.png" height="70px"/>
      );
    else if (scraper.title.includes("Zapora"))
      return (
        <img src="https://www.promet.si/portal/res/icons/dogodki/zaprta.png" height="70px"/>
      );
    else
      return (
        <img src="https://www.promet.si/portal/res/icons/dogodki/dogodek.png" height="70px"/>
      );
      
  }
  return (
    <div style={{ margin:"5px", overflow:"auto", height:"85vh", padding:"30px", background:"#29648A"}}>
      
      {response.map((scraper) => (
        <div style={{ background:"#25274D", height:"100px"}}>
          { test(scraper) }
          <div style={{display: "inline-block", height:"100px"}}>
            <h4 style={{ paddingTop:"10px", color:"#2E9CCA"}} key={scraper.p}>{scraper.title} </h4>
            <p style={{ color:"white", maxWidth:"1300px", maxHeight:"100px" }}> {scraper.p}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Home;
