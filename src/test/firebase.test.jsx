import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { db, auth, storage } from "../firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBShxULsM6ICme75H1TitjSF7Lh-pN1NX0",
  authDomain: "sce-movie-social.firebaseapp.com",
  projectId: "sce-movie-social",
  storageBucket: "sce-movie-social.appspot.com",
  messagingSenderId: "1077333995909",
  appId: "1:1077333995909:web:b4fdc8a279236ec6b654ec",
};

describe("Firebase SDK tests", () => {
  beforeAll(() => {
    // Initialize Firebase before running any tests
    initializeApp(firebaseConfig);
  });

  test("Auth SDK initialized correctly", () => {
    const auth = getAuth();
    expect(auth).toBeDefined();
  });

  test("Firestore SDK initialized correctly", () => {
    const db = getFirestore();
    expect(db).toBeDefined();
  });

  test("Storage SDK initialized correctly", () => {
    const storage = getStorage();
    expect(storage).toBeDefined();
  });

  describe("Authentication", () => {
    it("imports the Firebase Auth SDK", () => {
      expect(typeof getAuth).toBe("function");
    });

    it("creates an instance of Firebase Auth", () => {
      expect(typeof auth).toBe("object");
    });
  });

  describe("Firestore", () => {
    it("imports the Firebase Firestore SDK", () => {
      expect(typeof getFirestore).toBe("function");
    });

    it("creates an instance of Firebase Firestore", () => {
      expect(typeof db).toBe("object");
    });
  });

  describe("Storage", () => {
    it("imports the Firebase Storage SDK", () => {
      expect(typeof getStorage).toBe("function");
    });

    it("creates an instance of Firebase Storage", () => {
      expect(typeof storage).toBe("object");
    });
  });
});
