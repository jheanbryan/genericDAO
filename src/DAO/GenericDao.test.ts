import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { GenericDao } from "./GenericDAO"; 
import { Seller, Product, Client } from "../models/types";
import path from "path";

let db: Database;

beforeAll(async () => {
  db = await open({
    filename: path.resolve(__dirname, "../database/database.db"),
    driver: sqlite3.Database,
  });

  console.log("Banco conectado!");
});

afterAll(async () => {
  await db.close();
});

describe("GenericDAO Tests", () => {
  let sellerDAO: GenericDao<Seller>;
  let productDAO: GenericDao<Product>;
  let clientDAO: GenericDao<Client>;

  beforeAll(async () => {
    sellerDAO = new GenericDao<Seller>(db, "Seller");
    productDAO = new GenericDao<Product>(db, "Product");
    clientDAO = new GenericDao<Client>(db, "Client");
  });

  test("Deve inserir um registro com sucesso", async () => {
    const result = await sellerDAO.create({
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      role: "Gerente",
      formation: "Administração"
    });
  
    expect(result).toBe(true);
  }, 50000);

  test("Deve ler um registro existente", async () => {
    const seller = await sellerDAO.read(1);
    expect(seller).not.toBeNull();
  });

  test("Deve retornar null para leitura de ID inexistente", async () => {
    const seller = await sellerDAO.read(9999);
    expect(seller).toBeNull();
  });

  test("Deve atualizar um registro existente", async () => {
    await sellerDAO.update(1, { name: "João Modificado" });
    const updatedSeller = await sellerDAO.read(1);
    expect(updatedSeller?.name).toBe("João Modificado");
  });

  test("Deve remover um registro existente", async () => {
    await sellerDAO.delete(1);
    const deletedSeller = await sellerDAO.read(1);
    expect(deletedSeller).toBeNull();
  });

  test("Deve listar todos os registros", async () => {
    const sellers = await sellerDAO.findAll();
    expect(sellers.length).toBeGreaterThan(0);
  });

  test("Deve listar registros com critério de consulta", async () => {
    const sellers = await sellerDAO.findByCriteria({ field: "role", op: "=", value: "Gerente" });
    expect(sellers.length).toBeGreaterThanOrEqual(1);
  });
});