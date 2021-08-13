import { useEffect } from "react";
function Logout(props) {
  useEffect(function () {
    localStorage.removeItem("token");
    window.location.href = "/home";
  });
  return <div></div>;
}
export default Logout;
