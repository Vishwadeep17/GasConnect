const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", (req, res) => {
    controller.allAccess(req, res);
  });

  app.get("/api/test/user", [authJwt.verifyToken], (req, res) => {
    controller.userBoard(req, res);
  });

  app.get(
    "/api/test/supp",
    [authJwt.verifyToken, authJwt.isModerator],
    (req, res) => {
      controller.supplierBoard(req, res);
    }
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      controller.adminBoard(req, res);
    }
  );
};
