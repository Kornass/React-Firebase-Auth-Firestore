# Authentication and Storage with Firebase

This is a project boilerplate for implementing sign up/in functionalities with Firebase and working with Firestore. Features included:

- Creating a Firebase Project
- Creating project database in Firestore
- Sign up and Log in with email and password
- Sign up and Log in with Google pop-up
- Logging out
- Adding a documents to Firestore database
- Fetching multiple documents from Firestore database
- Managing forms in React
- React Router
- useNavigate, useEffect and useState hooks

## Steps:

1. Log in into your Google Account and go to [firebase.google.com](https://firebase.google.com/).
2. Click 'Go to console'
3. Click 'Add project'
4. Enable/Disable google analytics for your projects as you need
5. Create a firebase.config.js file in your project
6. Install firebase in your project - _npm i firebase_
7. Create ‘web’ app within firebase to get config values
8. Copy the code from project initialization and paste it into firebase.config.js
9. As an SDK we are importing firestore: _import {getFirestore} from ‘firebase/firestore’_
10. export your db from config file: _export const db = getFirestore()_
    1. Code example snippet:
       ![Config file snippet.](./src/assets/firebaseconfig.jpg "firebase.config.js example")
