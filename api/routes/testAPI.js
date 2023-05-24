var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("A API está funcionando corretamente.");
});

router.get("/test2", function(req, res, next) {
    res.send("A API está funcionando corretamente 2.");
});

module.exports = router;