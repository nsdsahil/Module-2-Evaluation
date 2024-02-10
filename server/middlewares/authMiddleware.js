const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;
    console.log(token, refreshToken);
    if (!token) {
        return res.status(401).send({ msg: "please login first" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err == "jwt expired") {
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, decoded) => {
                        if (err) {
                            return res.status(401).send({ msg: "unauthorized" });
                        }
                        const newToken = jwt.sign(
                            { email: decoded.email },
                            process.env.JWT_SECRET
                        );
                        res.cookie("token", newToken, {
                            httpOnly: true,
                            maxAge: 24 * 60 * 60 * 1000,
                            sameSite: "none",
                            secure: true,
                        });
                        req.payload = decoded;
                        next();
                    }
                );
            }
            if (err) {
                return res.status(401).send({ msg: err.message });
            }
            req.payload = decoded;
            next();
        });
    } catch (err) {
        return res.status(401).send({ msg: err.message });
    }
};
module.exports = authMiddleware; 