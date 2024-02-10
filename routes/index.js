const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;