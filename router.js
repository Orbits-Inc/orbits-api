const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        data: null,
        message: "Welcome to Orbit's API!",
    });
});

// User API Routes

module.exports = router;
