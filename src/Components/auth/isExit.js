
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Config";
export async function isMemberExists(fullName) {
    const q = query(collection(db, "members"), where("fullName", "==", fullName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
}