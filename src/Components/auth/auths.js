import React,{ useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc} from "firebase/firestore";
import { auth, db } from "../../Firebase/Config";

export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        if (authUser) {
          const userRef = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(userRef);
          setUser(docSnap.data());
        }
        setLoading(false);
      }
  
      if (!authLoading) {
        fetchData();
      }
    }, [authLoading, authUser]);
  
    return { user, isLoading, error };
  }