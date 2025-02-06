import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";

const db = new sqlite3.Database("./src/database/database.db");

const createTables = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS Seller (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT NOT NULL,
            formation TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Client (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            address TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS "Order" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            clienteId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            sellerId INTEGER NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY(clienteId) REFERENCES Client(id),
            FOREIGN KEY(productId) REFERENCES Product(id),
            FOREIGN KEY(sellerId) REFERENCES Seller(id)
        )`);
    });
};


const insertInDb = () => {
    db.serialize(() => {
        const insertSeller = db.prepare("INSERT INTO Seller (name, email, role, formation) VALUES (?, ?, ?, ?)");
        const insertProduct = db.prepare("INSERT INTO Product (name, description, price, quantity) VALUES (?, ?, ?, ?)");
        const insertClient = db.prepare("INSERT INTO Client (name, phone, email, address) VALUES (?, ?, ?, ?)");
        const insertOrder = db.prepare("INSERT INTO 'Order' (clienteId, productId, sellerId, status) VALUES (?, ?, ?, ?)");

        for (let i = 0; i < 50; i++) {
            insertSeller.run(
                faker.person.fullName(),
                faker.internet.email(),
                faker.helpers.arrayElement(["Gerente", "Vendedor", "Assistente"]),
                faker.helpers.arrayElement(["Administração", "Marketing", "TI"])
            );

            insertProduct.run(
                faker.commerce.productName(),
                faker.commerce.productDescription(),
                parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
                faker.number.int({ min: 1, max: 100 })
            );

            insertClient.run(
                faker.person.fullName(),
                faker.phone.number(),
                faker.internet.email(),
                faker.location.streetAddress()
            );
        }

        //criar pedidos
        for (let i = 0; i < 50; i++) {
            insertOrder.run(
                faker.number.int({ min: 1, max: 50 }),
                faker.number.int({ min: 1, max: 50 }),
                faker.number.int({ min: 1, max: 50 }),
                faker.helpers.arrayElement(["Pendente", "Pago", "Cancelado"])
            );
        }

        insertSeller.finalize();
        insertProduct.finalize();
        insertClient.finalize();
        insertOrder.finalize();
    });
};

createTables();
insertInDb();

db.close(() => console.log("Banco de dados populado com sucesso"));
