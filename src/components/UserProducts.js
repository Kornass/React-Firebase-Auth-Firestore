import { useEffect, useState } from "react";
// imports for fetching multiple documents from one collection
import { collection, query, where, getDocs } from "firebase/firestore";
// db import
import { db } from "../firebase.config";

function UserProducts({ user }) {
  // state for our user's products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      // Creating a query for our products with condition specified inside where() method. In our collection 'products' we look for every document that has a userRef uid equal to current user uid
      const q = query(collection(db, "products"), where("userRef", "==", user));
      // To get documents we use getDocs() method
      const querySnapshot = await getDocs(q);
      // Creating a temp array to push single product data there while looping through querySnapshot results. We can retrieve product data with .data()
      const prods = [];
      querySnapshot.forEach((doc) => {
        // we are adding a id field to our products to retireve unique document id to use it as a key
        prods.push({ ...doc.data(), id: doc.id });
      });
      // setting a products state to fullfilled prods array
      setProducts(prods);
    };
    fetchUserProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {products.map((prod) => (
        <div className="product" key={prod.id}>
          <p>Product name:{prod.name}</p>
          <p>Product price:{prod.price}</p>
        </div>
      ))}
    </>
  );
}

export default UserProducts;
