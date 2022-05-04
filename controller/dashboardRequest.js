const jwt = require("jsonwebtoken");
const { error_code, error_history, addNewError } = require("../error/error.js");
const { getUserIdAccount } = require("../db/init.js");
const {
  formatDate,
  formatNumber,
} = require("../public/assets/js/helperFunction.js");

/* ----- dashboard main Route ----- */

module.exports = {
  getDashboard: (req, res) => {
    const { auth } = req.cookies;
    const { id, token, account } = auth;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`get/../index: Token Expired`);
        addNewError("TOKEN_EXPIRED", "get/dashboard/index", error_history);
        return res.status(401).render("login", {
          title: `Login`,
          styles: `styles`,
        });
      } else {
        const user = await getUserIdAccount(id, account);

        if (!user) {
          console.log(`get/../index: User not found`);
          return res.status(400).send({
            error: `User not found`,
            code: 400,
          });
        } else {
          return res.render("dashboard", {
            title: `Dashboard`,
            styles: `styles`,
            dash: `dashboard-index`,
            info: user,
            date: formatDate(new Date()),
            saldo: formatNumber(user.balance),
          });
        }
      }
    });
  },
};
