const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

dotenv.config();

connectDB();

const seedDatabase = async () => {
    try {

        // Delete existing data

        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Old data deleted.");

        // ==========================
        // USERS
        // ==========================

        const password = await bcrypt.hash("123456", 10);

        const users = await User.insertMany([
            {
                name: "Admin User",
                email: "admin@shopnest.com",
                password,
                role: "admin",
            },
            {
                name: "Rushikesh",
                email: "rushikesh@gmail.com",
                password,
                role: "user",
            },
            {
                name: "Ayush",
                email: "ayush@gmail.com",
                password,
                role: "user",
            },
            {
                name: "Rohit",
                email: "rohit@gmail.com",
                password,
                role: "user",
            },
            {
                name: "Priya",
                email: "priya@gmail.com",
                password,
                role: "user",
            }
        ]);

        console.log("Users inserted.");

        // ==========================
        // PRODUCTS
        // ==========================

        const products = await Product.insertMany([

            {
                name: "iPhone 16 Pro",
                description: "Apple flagship smartphone",
                price: 129999,
                category: "Mobiles",
                stock: 20,
                imageUrls: ["https://dummyimage.com/iphone.jpg"]
            },

            {
                name: "Samsung Galaxy S25",
                description: "Samsung premium phone",
                price: 99999,
                category: "Mobiles",
                stock: 15,
                imageUrls: ["https://dummyimage.com/samsung.jpg"]
            },

            {
                name: "MacBook Air M4",
                description: "Apple lightweight laptop",
                price: 145000,
                category: "Laptops",
                stock: 10,
                imageUrls: ["https://dummyimage.com/macbook.jpg"]
            },

            {
                name: "Dell XPS 15",
                description: "High performance laptop",
                price: 125000,
                category: "Laptops",
                stock: 12,
                imageUrls: ["https://dummyimage.com/dell.jpg"]
            },

            {
                name: "Sony WH-1000XM5",
                description: "Noise cancelling headphones",
                price: 29999,
                category: "Accessories",
                stock: 25,
                imageUrls: ["https://dummyimage.com/sony.jpg"]
            },

            {
                name: "Boat Rockerz 550",
                description: "Wireless headphones",
                price: 1999,
                category: "Accessories",
                stock: 40,
                imageUrls: ["https://dummyimage.com/boat.jpg"]
            },

            {
                name: "Logitech MX Master 3S",
                description: "Wireless Mouse",
                price: 8999,
                category: "Accessories",
                stock: 35,
                imageUrls: ["https://dummyimage.com/mouse.jpg"]
            },

            {
                name: "HP Pavilion",
                description: "Gaming Laptop",
                price: 89000,
                category: "Laptops",
                stock: 8,
                imageUrls: ["https://dummyimage.com/hp.jpg"]
            },

            {
                name: "Realme Buds Air",
                description: "Wireless Earbuds",
                price: 3499,
                category: "Accessories",
                stock: 50,
                imageUrls: ["https://dummyimage.com/buds.jpg"]
            },

            {
                name: "OnePlus 13",
                description: "Android flagship",
                price: 69999,
                category: "Mobiles",
                stock: 18,
                imageUrls: ["https://dummyimage.com/oneplus.jpg"]
            }

        ]);

        console.log("Products inserted.");

        // ==========================
        // ORDERS
        // ==========================

        await Order.insertMany([

            {
                user: users[1]._id,
                items: [
                    {
                        productID: products[0]._id,
                        quantity: 1,
                        price: products[0].price
                    }
                ],
                totalAmount: products[0].price,
                address: {
                    fullName: "Rushikesh",
                    street: "Chembur East",
                    city: "Mumbai",
                    postalCode: "400071",
                    country: "India"
                },
                paymentId: "PAY001",
                status: "pending"
            },

            {
                user: users[2]._id,
                items: [
                    {
                        productID: products[2]._id,
                        quantity: 1,
                        price: products[2].price
                    }
                ],
                totalAmount: products[2].price,
                address: {
                    fullName: "Ayush",
                    street: "Andheri",
                    city: "Mumbai",
                    postalCode: "400053",
                    country: "India"
                },
                paymentId: "PAY002",
                status: "shipped"
            },

            {
                user: users[3]._id,
                items: [
                    {
                        productID: products[5]._id,
                        quantity: 2,
                        price: products[5].price
                    }
                ],
                totalAmount: products[5].price * 2,
                address: {
                    fullName: "Rohit",
                    street: "Pune Camp",
                    city: "Pune",
                    postalCode: "411001",
                    country: "India"
                },
                paymentId: "PAY003",
                status: "delivered"
            }

        ]);

        console.log("Orders inserted.");

        console.log("========================================");
        console.log("🎉 Database Seeded Successfully!");
        console.log("========================================");

        console.log("\n👤 ADMIN ACCOUNT");
        console.log("----------------------------------------");
        console.log(`ID       : ${users[0]._id}`);
        console.log(`Name     : ${users[0].name}`);
        console.log(`Email    : ${users[0].email}`);
        console.log(`Password : 123456`);
        console.log(`Role     : ${users[0].role}`);
        process.exit()

    } catch (error) {

        console.log(error);

        process.exit(1);

    }
};

seedDatabase();