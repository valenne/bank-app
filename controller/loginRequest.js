const jwt = require("jsonwebtoken");
const { error_code, error_history, addNewError } = require("../error/error.js");
const { validate } = require("../public/assets/js/validateRut.js");
const { getUsers } = require("../db/init.js");

module.exports = {
  getLogin: (_, res) => {
    res.render("login", {
      title: `Login`,
      styles: `styles`,
    });
  },
  postLogin: async (req, res) => {
    const { rut, password } = req.body;

    try {
      // validate rut
      if (validate(rut) == undefined) {
        console.log(`post/login: rut not valid`);
        addNewError("RUT_NOT_VALID", "post/login", error_history);
        return res.status(400).send({
          error: `${error_code.error_list.RUT_NOT_VALID.message}`,
          code: `${error_code.error_list.RUT_NOT_VALID.HTTPStatusCode}`,
        });
      }

      let user = await getUsers(validate(rut), password);

      if (!user) {
        console.log(`post/login: user not found`);
        addNewError("CREDENDTIALS_ERROR", "post/login", error_history);
        return res.status(400).send({
          error: `${error_code.error_list.CREDENDTIALS_ERROR.message}`,
          code: `${error_code.error_list.CREDENDTIALS_ERROR.HTTPStatusCode}`,
        });
      } else {
        let token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user,
          },
          process.env.SECRET_KEY
        );

        // set cookie config
        const auth = {
          token,
          id: user.id,
          account: user.account,
        };

        res.status(200).cookie("auth", auth).send({ name: user.name });

        console.log(`User was found, login successful`);
      }
    } catch (err) {
      console.log(`Login error:`, err.message);
    }
  },
};
