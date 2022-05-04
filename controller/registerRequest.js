// importing functions
const { validate } = require("../public/assets/js/validateRut.js");
const { newUser } = require("../db/init.js");
const { error_code, error_history, addNewError } = require("../error/error.js");

//

module.exports = {
  getRegister: (req, res) => {
    res.render("register", {
      title: `Registro`,
      styles: `styles`,
    });
  },
  postRegister: async (req, res) => {
    let { nombre, email, rut, address, password, passwordConfirm } = req.body;
    const balance = 100000;

    // make a number for the account
    let account = [];
    for (let i = 0; i < 9; i++) {
      account.push(Math.floor(Math.random() * 10));
    }
    account = account.join("");

    try {
      // validate rut
      if (validate(rut) == undefined) {
        addNewError("RUT_NOT_VALID", "post/register", error_history);
        return res.status(400).send({
          error: `${error_code.error_list.RUT_NOT_VALID.message}`,
          code: `${error_code.error_list.RUT_NOT_VALID.HTTPStatusCode}`,
        });
      }

      // validate password
      if (password !== passwordConfirm) {
        console.log("Error: Passwords do not match");

        addNewError("PASSWORD_NOT_MATCH", "post/register", error_history);
        return res.status(400).send({
          error: `${error_code.error_list.PASSWORD_NOT_MATCH.message}`,
          code: `${error_code.error_list.PASSWORD_NOT_MATCH.HTTPStatusCode}`,
        });
      }

      // transform text to lowercase
      nombre = nombre.toLowerCase().trim();
      email = email.toLowerCase().trim();
      rut = rut.toLowerCase().trim();
      address = address.toLowerCase().trim();

      const data = await newUser(
        account,
        nombre,
        email,
        validate(rut),
        address,
        password,
        balance
      );

      res.status(200).send(JSON.stringify(data));
      console.log(`User ${nombre} was successful created`);
    } catch (err) {
      res.status(500).send({
        error: `post/register: ${err}`,
        code: 500,
      });
    }
  },
};
