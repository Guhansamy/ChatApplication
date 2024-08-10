const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    return jwt.sign(user, accessToken, { expiresIn: "25m" });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
        return res.status(500).json({ message: "Token was absent" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({
                Message: "The was some error occured",
                Error: String(err),
            });
        req.user = user;
        next();
    });
}
