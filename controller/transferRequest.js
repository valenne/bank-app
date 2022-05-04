const jwt = require("jsonwebtoken");
const { error_code, error_history, addNewError } = require("../error/error.js");
const { validate } = require("../public/assets/js/validateRut.js");
const {
  getUserRut,
  getUserIdAccount,
  transferencias,
} = require("../db/init.js");

const {
  fomatDateForTransactions,
} = require("../public/assets/js/helperFunction.js");

module.exports = {
  /* ----- dashboard - transferencias main ----- */
  getTransferences: (req, res) => {
    const { auth } = req.cookies;
    const { token } = auth;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`get/../transferencias: Token Expired`);
        addNewError(
          "TOKEN_EXPIRED",
          "get/dashboard/transferencias",
          error_history
        );
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      }
      console.log(`sv: Token valid`);
      res.render("dashboard", {
        title: `Transferencias`,
        styles: `styles`,
        dash: `transferencias`,
      });
    });
  },
  /* ----- dashboard - transferencias proceso ----- */
  postTransferences: async (req, res) => {
    // data user logged
    const { auth } = req.cookies;
    const { id, token, account } = auth;
    // data user to transfer
    const { rut, amount, comment } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`post/../../transfer: Token Expired`);
        addNewError(
          "TOKEN_EXPIRED",
          "post/dashboard/transferencias/transfer",
          error_history
        );
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      } else {
        if (validate(rut) == undefined) {
          console.log(`post/../../transfer: Rut not valid`);
          addNewError(
            "RUT_NOT_VALID",
            "post/dashboard/transferencias/transfer",
            error_history
          );
          return res.status(400).send({
            error: `${error_code.error_list.RUT_NOT_VALID.message}`,
            code: `${error_code.error_list.RUT_NOT_VALID.HTTPStatusCode}`,
          });
        }

        // validate if the destination user exists
        const destinatary = await getUserRut(validate(rut));
        const user = await getUserIdAccount(id, account);
        if (!destinatary) {
          console.log(`post/../../transfer: Destinary not found`);
          addNewError(
            "USER_NOT_FOUND",
            "post/dashboard/transferencias/transfer",
            error_history
          );
          return res.status(400).send({
            error: `${error_code.error_list.USER_NOT_FOUND.message}`,
            code: `${error_code.error_list.USER_NOT_FOUND.HTTPStatusCode}`,
          });
        } else {
          await transferencias(
            user.id,
            user.rut,
            amount,
            destinatary.id,
            destinatary.rut,
            fomatDateForTransactions(new Date()),
            comment
          );

          return res.status(200).send({
            message: `Transfer complete`,
          });
        }
      }
    });
  },
};
