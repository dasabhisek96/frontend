const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");


router.get("/login/success", (req, res) => {
    if (req.user) {
        const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
            token: token, 
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});


router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});


router.get("/google", passport.authenticate("google", ["profile", "email"]));


router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
        
        res.redirect(`${process.env.CLIENT_URL}/dashboard?googleSuccess=true`);
    }
);


router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
