const jwt = require("jsonwebtoken");
const { error_code, error_history, addNewError } = require("../error/error.js");
const { getUserIdAccount, getHistorial } = require("../db/init.js");
const {
  fomatDateForTransactions,
  formatNumber,
  portionOfData,
} = require("../public/assets/js/helperFunction.js");

/* ----- dashboard - historial transacciones ----- */

module.exports = {
  getHistorial: async (req, res) => {
    // data user logged
    const { auth } = req.cookies;
    const { id, token, account } = auth;

    const { page } = req.query;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`get/../historial: Token Expired`);
        addNewError("TOKEN_EXPIRED", "get/historial", error_history);
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      } else {
        console.log(`get/../historial: Token valid`);

        let historial = await getHistorial(id);
        const user = await getUserIdAccount(id, account);

        console.log(historial);

        // validate if the transfer is abono or cargo
        historial.forEach((element) => {
          element.date = fomatDateForTransactions(element.date);
          element.amount = formatNumber(element.amount);
          if (element.name == user.name) {
            element.transaccion = "abono";
          } else {
            element.transaccion = "cargo";
          }
        });

        // creating how many pagination numbers are show to the user
        const pagNumbers = Math.round(historial.length / 10) | 0;
        let pagination = [];
        for (let i = 0; i < pagNumbers; i++) {
          pagination.push(i + 1);
        }

        if (pagination.length == 0) {
          pagination = [1];
        }

        res.render("dashboard", {
          title: `Historial-Transacciones`,
          styles: `styles`,
          dash: `historial`,
          historialData: await portionOfData(page, historial)[0],
          page,
          pagination,
        });
      }
    });
  },
};
