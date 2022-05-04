const { router } = require("../config.js");
const controlRegister = require("../controller/registerRequest.js");
const controlLogin = require("../controller/loginRequest.js");
const controlDashboard = require("../controller/dashboardRequest.js");
const controlPersonalData = require("../controller/personalDataRequest.js");
const controlTranfer = require("../controller/transferRequest.js");
const controlHistorial = require("../controller/historialRequest.js");

// Login
router.get("/login", controlLogin.getLogin);
router.post("/login", controlLogin.postLogin);

// Register
router.get("/register", controlRegister.getRegister);
router.post("/register", controlRegister.postRegister);

// dashboard index
router.get("/dashboard/index", controlDashboard.getDashboard);

// Personal Data
router.get("/dashboard/datos-personales", controlPersonalData.getPersonalData);
router.get(
  "/dashboard/datos-personales/edit",
  controlPersonalData.getPersonalDataEdit
);
router.put(
  "/dashboard/datos-personales/edit",
  controlPersonalData.putPersonalDataEdit
);

// Transferences
router.get("/dashboard/transferencias", controlTranfer.getTransferences);
router.post("/dashboard/transferencias", controlTranfer.postTransferences);

// historial
router.get("/dashboard/historial", controlHistorial.getHistorial);

module.exports = router;
