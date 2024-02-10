const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const auth = require("../middlewares/authMiddleware");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = express.Router();
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).send({ msg: "user not found" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send({ msg: "invalid credentials" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		const refreshToken = jwt.sign(
			{ id: user._id },
			process.env.REFRESH_TOKEN_SECRET
		);
		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: "none",
			secure: true,
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: "none",
			secure: true,
		});
		res.status(200).send({ msg: "login success" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});
userRouter.post("/register", async (req, res) => {
	const { email, name, gender, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (user) {
			return res.status(400).send({ msg: "user already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new userModel({
			email,
			name,
			gender,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(200).send({ msg: "user created" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

module.exports = userRouter;
