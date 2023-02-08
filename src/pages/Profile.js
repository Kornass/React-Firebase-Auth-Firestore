import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
// imports for firebase authentication methods
import { getAuth, updateProfile } from "firebase/auth";
// imports for updating a user details
import { updateDoc, doc } from "firebase/firestore";
import UserProducts from "../components/UserProducts";
function Profile({ user }) {
  // initialize auth
  const auth = getAuth();
  const [edit, setEdit] = useState(false);
  // we are setting a formData state with current user credentials
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // function updating a user details
  const onSubmit = async () => {
    try {
      // if the current user name is not the same that inputted to the form
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase (we need to bring a updateProfile function from firebase)
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // Update reference to the user in the firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        // to update in firestore, we use updateDoc function (we need to bring it from firestore)
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Logging out function
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="profile">
      <h2>Welcome {name}!</h2>
      <div className="formDiv">
        <p>Change your personal details</p>
        <button
          className="changePersonalDetails"
          onClick={() => {
            edit && onSubmit();
            setEdit((prevState) => !prevState);
          }}
        >
          {edit ? "done" : "change"}
        </button>
        <form className="form">
          <label>Name</label>
          <input
            id="name"
            type="text"
            disabled={!edit}
            value={name}
            onChange={onChange}
          />
          <label>Email</label>
          <input
            id="email"
            type="text"
            disabled={!edit}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>
      <button className="logout" onClick={onLogout}>
        Log out
      </button>

      <UserProducts user={user} />
    </div>
  );
}

export default Profile;
