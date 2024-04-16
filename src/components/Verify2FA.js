import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Verify2FA = (props) => {
  const navigate = useNavigate();
  const { verify2FACode } = useAuth();
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await verify2FACode(code);
    if (isValid) {
      navigate("/dashboard");
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <><br/>
    <b>Your Code is 0000</b>
    <br/>
    <form onSubmit={handleSubmit}>
      <input
        type= "text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder= "Enter verification code"
      />
      <button type="submit">Verify</button>
    </form></>
  );
};
export default (Verify2FA);
