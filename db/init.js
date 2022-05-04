const { db } = require("../config.js");
const { Pool } = require("pg");

const pool = new Pool(db);

module.exports = {
  newUser: async (account, nombre, email, rut, address, password, balance) => {
    try {
      const consult = {
        text: `INSERT INTO usuarios (account, name, email, rut, address, password, balance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        values: [account, nombre, email, rut, address, password, balance],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log({
        error: `Database error, registerUser module`,
        message: `${err}`,
      });
    }
  },
  getUsers: async (rut, password) => {
    try {
      const consult = {
        text: `SELECT * FROM usuarios WHERE rut=$1 AND password=$2`,
        values: [rut, password],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log(`Something went wrong, getUsers module ${err}`);
    }
  },

  getUserIdAccount: async (id, account) => {
    try {
      const consult = {
        text: "SELECT * FROM usuarios WHERE id=$1 AND account=$2",
        values: [id, account],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log(`Something went wrong, getUserIdAccount module ${err}`);
    }
  },
  getUserRut: async (rut) => {
    try {
      const consult = {
        text: `SELECT * FROM usuarios WHERE rut=$1;`,
        values: [rut],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log(`Something went wrong, getUserRut module ${err}`);
    }
  },
  getUserNombreEmail: async (nombre, email) => {
    try {
      const consult = {
        text: `SELECT * FROM usuarios WHERE name=$1 AND email=$2`,
        values: [nombre, email],
      };

      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log(`Something went wrong, getUserNombreEmail module ${err}`);
    }
  },
  updateUser: async (id, name, email, address) => {
    try {
      const consult = {
        text: `UPDATE usuarios SET name=$2, email=$3, address=$4 WHERE id=$1 RETURNING *`,
        values: [id, name, email, address],
      };
      const response = await pool.query(consult);
      return response.rows[0];
    } catch (err) {
      console.log(`Something went wrong, updateUser module ${err}`);
    }
  },

  transferencias: async (
    id_from,
    rut_from,
    amount,
    id_to,
    rut_to,
    date,
    comment
  ) => {
    try {
      // transaction query
      await pool.query("BEGIN");

      // deducts balance to owner
      const discount = `UPDATE usuarios SET balance = balance - $3 WHERE id = $1 AND rut=$2`;
      await pool.query(discount, [id_from, rut_from, amount]);

      // add balance to beneficiary
      const add = `UPDATE usuarios SET balance = balance + $1 WHERE id=$2 AND rut=$3`;
      await pool.query(add, [amount, id_to, rut_to]);

      // register the transaccion on the table transferencias
      const register = `INSERT INTO transferencias (date, id_from, id_to, comment, amount) VALUES ($1, $2, $3, $4, $5)`;
      await pool.query(register, [date, id_from, id_to, comment, amount]);

      await pool.query("COMMIT");
    } catch (err) {
      console.log(`Something went wrong, transferencias module ${err}`);
    }
  },
  getHistorial: async (id) => {
    try {
      const consult = {
        text: `select date, name, comment, amount from transferencias as t inner join usuarios on usuarios.id = t.id_to where t.id_from = $1 or t.id_to = $1;`,
        values: [id],
      };
      const response = await pool.query(consult);
      return response.rows;
    } catch (err) {
      console.log(`Something went wrong, getHistorial module ${err}`);
    }
  },
};
