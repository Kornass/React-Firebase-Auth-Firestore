import { useState } from "react";
import { useNavigate } from "react-router-dom";

// importsfor adding record in our collection
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

function AddProduct({ user }) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    bestSeller: false,
  });
  const { bestSeller } = formData;
  const navigate = useNavigate();
  // On form change
  const onMutate = (e) => {
    // buttons values will come as a strings, so we create boolean variable and we set it according to button value
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // if target is not a boolean. We use nullish coalescing operator (??) to get rid of booleans(if boolean is null, so our first conditional didn't trigger)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }));
  };
  // Adding product to the DB
  const addProduct = async (e) => {
    e.preventDefault();
    const formCopy = {
      ...formData,
      price: Number(formData.price), // convert price to a number
      userRef: user, // Adding a uid of a current user to create a reference
      timestamp: serverTimestamp(), // Adding a current timestamp
    };
    // addDoc method takes collection function call as first argument and data to submit as a second argument. To the collection we pass db from our config file and name of our collection in DB
    console.log(formCopy);
    const docRef = await addDoc(collection(db, "products"), formCopy);
    navigate("/profile");
  };

  return (
    <div className="add">
      <h2>Add Product</h2>
      <form className="form" onSubmit={addProduct}>
        <label>Name</label>
        <input id="name" type="text" onChange={onMutate} />
        <label>Price</label>
        <input id="price" type="number" onChange={onMutate} />
        <label>Description</label>
        <input id="description" type="text" onChange={onMutate} />
        <label>Best Seller</label>
        <div>
          <button
            className={bestSeller ? "buttonActive" : "formButton"}
            disabled={bestSeller}
            type="button"
            id="bestSeller"
            value={true}
            onClick={onMutate}
            min="1"
            max="50"
          >
            Yes
          </button>
          <button
            className={
              !bestSeller && bestSeller !== null ? "buttonActive" : "formButton"
            }
            disabled={!bestSeller}
            type="button"
            id="bestSeller"
            value={false}
            onClick={onMutate}
            min="1"
            max="50"
          >
            No
          </button>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
