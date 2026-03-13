import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAFLdHeztwXeeUT4hbG1ymiOcqlhipX9Jo",
    databaseURL: "https://giavinh123-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "giavinh123",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const initialProducts = [
    { name: "iPhone 15 Pro Max", price: 30000000 },
    { name: "Samsung Galaxy S24 Ultra", price: 28000000 },
    { name: "MacBook Pro M3", price: 45000000 },
    { name: "iPad Pro M2", price: 22000000 },
    { name: "AirPods Pro 2", price: 5500000 },
    { name: "Apple Watch Series 9", price: 10500000 }
];

async function seed() {
    console.log("Đang bắt đầu tạo dữ liệu...");
    const productsRef = ref(db, 'products');

    for (const product of initialProducts) {
        try {
            const newProductRef = push(productsRef);
            await set(newProductRef, {
                ...product,
                updatedAt: new Date().toISOString()
            });
            console.log(`Đã thêm: ${product.name}`);
        } catch (error) {
            console.error(`Lỗi khi thêm ${product.name}:`, error);
        }
    }

    console.log("Xong! Dữ liệu đã được tạo.");
    process.exit(0);
}

seed();
