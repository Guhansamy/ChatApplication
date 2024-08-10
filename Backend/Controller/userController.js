const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.newCustomers = async (req, res) => {
    try {
        const freshUser = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
            email: req.body.email,
        });
        res.status(200).json({
            Status: "Success",
            Message: "Completed",
        });
    } catch (error) {
        res.status(505).json({
            Status: "Failed",
            Message: "Some error occered",
            Error: error,
        });
    }
};

exports.oldCustomers = async (req, res) => {
    try {
        console.log("Entered to login page");
        const email = req.body.email;
        const password = req.body.password;
        const loginVerify = await User.findOne({ email: email });
        console.log(loginVerify);

        if (!loginVerify) {
            res.status(500).json({ Message: "No user found" });
        } else {
            const passwordMatch = password === loginVerify.password;

            if (!passwordMatch) {
                res.status(500).json({
                    Message: "Invalid Credential with wrong password",
                });
            }
            // below jwt token has created
            else {
                const token = jwt.sign(
                    { userId: loginVerify._id },
                    "your-secret-key",
                    { expiresIn: "24h" }
                );
                res.status(200).json({
                    Status: "Success",
                    Message: "Successfully LoggedIn",
                    Token: token,
                    data: loginVerify,
                });
            }
        }
    } catch (error) {
        res.status(505).json({
            Status: "Failed",
            Message: "Error while logging in",
            Error: error,
        });
    }
};
