import { Database } from "sqlite";
import initDataBase from  '../database/InitDataBase';

export type Criteria = {
  field: string;
  op: "=" | "!=" | ">" | "<" | ">=" | "<=";
  value: string | number;
};

export class GenericDao<T> {
  private db: Database;
  private tableName: string;

  constructor(db: Database, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  async create(entity: T): Promise<boolean> {
    const keys = Object.keys(entity).join(", ");
    const values = Object.values(entity).map(() => "?").join(", ");
    const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`;
  
    return new Promise((resolve, reject) => {
      this.db.run(sql, Object.values(entity), function (err) {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
  

  async read(id: number): Promise<T | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.get(sql, [id], (err, row: T) => {
        if (err) reject(err);
        else resolve(row || null);
      });
    });
  }

  async update(id: number, data: Partial<T>): Promise<boolean> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return false;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;

    values.push(id);

    await this.db.run(query, values);
    return true;
  };  


  async delete(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async findAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, [], (err, rows: T[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async findByCriteria(criteria: Criteria): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${criteria.field} ${criteria.op} ?`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, [criteria.value], (err, rows: T[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}
