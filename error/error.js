const fs = require("fs");

const error_code = JSON.parse(
  fs.readFileSync("./error/error-handle.json", "utf8")
);
const error_history = JSON.parse(
  fs.readFileSync("./error/error-history.json", "utf8")
);

// save error on error-history.json for control
const addNewError = (code, route, jsonFile) => {
  jsonFile.data_error.push({
    date: new Date(),
    code: error_code.error_list[code].HTTPStatusCode,
    name: error_code.error_list[code].name,
    message: error_code.error_list[code].message,
    route: route,
  });

  let toJSON = JSON.stringify(error_history);

  fs.writeFileSync("./error/error-history.json", toJSON, "utf-8");
};

module.exports = { addNewError, error_code, error_history };
