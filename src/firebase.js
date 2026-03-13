import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, remove, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAFLdHeztwXeeUT4hbG1ymiOcqlhipX9Jo",
    databaseURL: "https://giavinh123-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "giavinh123",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set, push, remove, update };
