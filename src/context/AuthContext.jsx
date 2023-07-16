/* eslint-disable no-unused-vars */
import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);
  const [userIsBlocked, setUserIsBlocked] = useState(false);
  const [userFirestoreDoc, setUserFirestoreDoc] = useState(null);
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth); // Signs out the user
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: "ac.sce.ac.il" });
    provider.addScope("profile");
    provider.addScope("email");

    return signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user?.email;
        const validDomain = "ac.sce.ac.il";

        if (email && !email.endsWith(`@${validDomain}`)) {
          logOut();
          toast.error(
            "Invalid email domain. Please use an ac.sce.ac.il email.",
            {
              position: "bottom-left",
              autoClose: 4500,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                fontFamily: "Arial",
                fontSize: "15px",
                fontWeight: "bold",
                color: "red",
                borderRadius: "5px",
                padding: "10px",
              },
            }
          );
        }
        return result;
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("Sign-in error:", error);
        throw error;
      });
  };

  const createUserDocument = async (userAuth) => {
    if (!userAuth) return; // If userAuth is null, return

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef); // Retrieves the document snapshot of the user

    //if user data does not exists -> create/set the document with data from userAuth in my collection
    if (!userSnapshot.exists()) {
      const { displayName, email, photoURL } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          photoURL,
          uid: userAuth.uid, // Add the UID as a property of the document
        });
      } catch (error) {
        console.log("error creating the user", error.message);
      }
    }
    //if user data exists -> return userDocRef
    return userDocRef;
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchAdminDoc = async () => {
      if (user) {
        const adminRef = doc(db, "admins", user.uid);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
          localStorage.setItem("isAdmin", true);
          setIsadmin(true);
        } else {
          localStorage.setItem("isAdmin", false);
          setIsadmin(false);
        }
      }
    };
    fetchAdminDoc();

    const GetUserFirestoreDoc = () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              const userObj = doc.data();
              setUserFirestoreDoc(userObj);
              console.log("User Firestore:", userObj);
            } else {
              console.log("No user object found");
            }
          })
          .catch((error) => {
            console.log("Error getting user object:", error);
          });
      }
    };
    GetUserFirestoreDoc();
  }, [user]);

  useEffect(() => {
    async function handleBlockedUser() {
      if (
        userFirestoreDoc?.blockedUntil !== undefined &&
        Date.now() < userFirestoreDoc?.blockedUntil
      ) {
        setUserIsBlocked(true);

        const daysRemaining = Math.ceil(
          (userFirestoreDoc?.blockedUntil - Date.now()) / (1000 * 60 * 60 * 24)
        );

        try {
          await logOut();
          localStorage.removeItem("isAdmin");
          navigate("/");
        } catch (error) {
          console.log(error);
        }

        // Show Blocked dialog
        const confirmDelete = await Swal.fire({
          title: `Your User has been Blocked for ${daysRemaining} days`,
          text: "This action cannot be undone.",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#f44336",
        });
      }
    }
    handleBlockedUser();
    // eslint-disable-next-line
  }, [userFirestoreDoc, navigate]);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        createUserDocument,
        user,
        logOut,
        isLoading,
        isAdmin,
        userFirestoreDoc,
        userIsBlocked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
