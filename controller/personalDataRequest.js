const jwt = require("jsonwebtoken");
const { error_code, error_history, addNewError } = require("../error/error.js");
const { getUserIdAccount, updateUser } = require("../db/init.js");

module.exports = {
  /* ----- dashboard - datos personales user ----- */
  getPersonalData: (req, res) => {
    const { auth } = req.cookies;
    const { id, token, account } = auth;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`get/../datos-personales: Token Expired`);
        addNewError(
          "TOKEN_EXPIRED",
          "get/dashboard/datos-personales",
          error_history
        );
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      }
      console.log(`get/../datos-personales: Token valid`);

      const user = await getUserIdAccount(id, account);

      if (!user) {
        console.log(`get/../datos-personales: User not found`);
        addNewError(
          "USER_NOT_FOUND",
          "get/dashboard/datos-personales",
          error_history
        );
        return res.status(400).send({
          error: `${error_code.error_list.USER_NOT_FOUND.message}`,
          code: `${error_code.error_list.USER_NOT_FOUND.HTTPStatusCode}`,
        });
      }
      res.render("dashboard", {
        title: `Datos Personales`,
        styles: `styles`,
        dash: `datos-personales`,
        info: user,
      });
    });
  },
  /* ----- dashboard - datos personales edit main  ----- */
  getPersonalDataEdit: (req, res) => {
    const { auth } = req.cookies;
    const { id, token, account } = auth;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`get/../../edit: Token Expired`);
        addNewError(
          "TOKEN_EXPIRED",
          "get/dashboard/datos-personales/edit",
          error_history
        );
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      }
      const user = await getUserIdAccount(id, account);
      res.render("dashboard", {
        title: `Modificar Datos`,
        styles: `styles`,
        dash: `datos-personales-edit`,
        info: user,
      });
    });
  },
  /* ----- dashboard - datos personales edit route  ----- */
  putPersonalDataEdit: (req, res) => {
    let { name, email, address } = req.body;
    const { auth } = req.cookies;
    const { id, token } = auth;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`post/../../edit: Token Expired`);
        addNewError(
          "TOKEN_EXPIRED",
          "post/dashboard/datos-personales/edit",
          error_history
        );
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      }
      name = name.toLowerCase().trim();
      email = email.toLowerCase().trim();
      address = address.toLowerCase().trim();

      const user = await updateUser(id, name, email, address);
      console.log(`post/../../edit, user: ${user.name} updated`);

      return res.status(200).send({
        message: `${user.name} actualizado`,
        name: user.name,
      });
    });
  },
};
