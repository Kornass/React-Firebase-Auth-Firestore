import { useLocation, useNavigate } from "react-router-dom";
// Imports for authentication, googleAuthProvider for google
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Imports for our DB
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
// Icon
import googleIcon from "../assets/googleIcon.svg";
function OAuth({ setMsg, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      // this code it's going to authenticate user whether it's a sign in or sign up
      const auth = getAuth();
      // Creating a new provider instance for google
      const provider = new GoogleAuthProvider();
      // Creating a logging in popup- we pass auth object and a provider as arguments
      const result = await signInWithPopup(auth, provider);
      // Result return an object with user property (sign in/up user data)- We can use it to save user to the database
      const user = result.user;
      // Putting user into a database
      // Creating a doc reference to our db, to the user collection and we pass in user.uid from google authenthication
      const docRef = doc(db, "users", user.uid);
      // snapshot of tour reference in our database
      const docSnap = await getDoc(docRef);
      // We check if user doesn't exist in the database using docSnap
      // exist is a method that allows us to do that
      // If user doesn't exist
      if (!docSnap.exists()) {
        // we are creating a new user in the database
        // setDoc we passing in doc(db,name of collection, userid) and the data that we want to add to the db (object)
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      setUser(user.uid); // setting a user uid to state
      setMsg("Success!"); // setting a message state
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="google">
      {/* Checking our location in ourder to display certain message  */}
      <p>{location.pathname === "/signup" ? "Sign up" : " Log in"} with </p>
      <button className="googleIconWrapper" onClick={onGoogleClick}>
        <img className="googleIcon" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
