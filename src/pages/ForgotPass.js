import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMsg("Email sent!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="forgot">
      <h2>Send an email with a password</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" id="email" value={email} onChange={onChange} />
        <button type="submit">Send email</button>
      </form>
      <p className="msg">{msg}</p>
      <button onClick={() => navigate("/signup")}>Sign up</button>
    </div>
  );
}

export default ForgotPass;
