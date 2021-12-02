/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */

// importamos las funciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUzfV8SD5NXc-_42hUIkpmmrO-NugQnLs",
  authDomain: "gamer-girl-scl018.firebaseapp.com",
  projectId: "gamer-girl-scl018",
  storageBucket: "gamer-girl-scl018.appspot.com",
  messagingSenderId: "59327930943",
  appId: "1:59327930943:web:7ddf2c82611ea43950ce8a",
  measurementId: "G-MC38L54242",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);

export const signUp = () => {
  const signUpEmail = document.getElementById("emailSignUp").value;
  const signUpPassword = document.getElementById("passwordSignUp").value;
  const signUpUserName = document.getElementById("userSignUp").value;

  if (
    signUpPassword.length < 6
    && signUpEmail === ""
    && signUpUserName === ""
  ) {
    alert("ingrese datos");
  } else if (signUpPassword.length < 6) {
    alert("contraseña debe ser mayor a 6 digitos");
  } else if (signUpEmail === "") {
    alert("ingrese email");
  } else if (signUpUserName === "") {
    alert("ingrese nombre de usuario");
  } else {
    createUserWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpPassword,
      signUpUserName,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage) {
          alert(`error de registro, favor revisar sus datos ${errorMessage}`);
        }
        return errorCode + errorMessage;
      });
  }
};

export const userLogin = () => {
  const loginEmail = document.getElementById("emailLogin").value;
  const loginPassword = document.getElementById("passLogin").value;
  if (loginEmail === "" || loginPassword === "") {
    alert("email o contraseña no ingresados");
  } else {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage) {
          alert("Antes de iniciar sesión primero registrate o comprueba los datos ingresados");
        }
        return errorCode + errorMessage;
      });
  }
};

export const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return `${user} + logged in with google + ${token}`;
    })

    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      if (errorMessage) {
        alert("usuario no creado");
      }
      return errorMessage + errorCode + email + credential;
    });
};

// función para agregar datos en firestore
export const postData = async (postTheme, postMessage) => {
  const docRef = await addDoc(collection(db, "publicaciones"), {
    username: auth.currentUser.displayName,
    userId: auth.currentUser.uid,
    theme: postTheme,
    message: postMessage,
    datePost: Date(Date.now()),
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef;
};

// función para escuchar varios documentos en una colección y función callback la muestra.
export const readData = (callback, publicaciones) => {
  const q = query(collection(db, publicaciones), orderBy("datePost", "desc"));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((document) => {
      const element = {};
      element.id = document.id;
      element.data = document.data();
      posts.push({ element });
    });
    callback(posts);
  });
};

// función para salir de la app
export const logOut = () => {
  signOut(auth)
    .then(() => {
      window.location.hash = "#/landing";
    })
    .catch((error) => {
      alert(`ocurrio un error: ${error}`);
    });
};

// función para observador en el objeto Auth. Obtiene el usuario de una sesión activa.
export const observer = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.hash = "#/wall";
    } else if (!user) {
      if (window.location.hash !== "#/register") {
        logOut();
      }
    }
  });
};

// función para eliminar los posts de la consola.
export const deletePost = async (id) => {
  await deleteDoc(doc(db, "publicaciones", id));
};

// función para actualizar un documento.
export const updatePost = async (id, themeUpdate, messageUpdate) => {
  const uniquePost = doc(db, "publicaciones", id);
  await updateDoc(uniquePost, {
    theme: themeUpdate,
    message: messageUpdate,
  });
};
