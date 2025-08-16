import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Greet() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <h1>
        Hello{" "}
        {localStorage
          .getItem("Name")
          .slice(0, localStorage.getItem("Name").indexOf("@"))}
      </h1>
    </>
  );
}
