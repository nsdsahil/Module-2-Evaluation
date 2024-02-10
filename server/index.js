const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors")
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://notesapp-a7lrr9y4l-sahil-nishads-projects.vercel.app",
	credentials: true
}))
app.use("/users", userRouter);
app.use("/posts",postRouter)
app.get("/", (req, res) => {
	res.send("Home Page");
});

app.listen(PORT, async () => {
	try {
		console.log("server is running on port 3000");
		mongoose.connect(process.env.MONGO_URL);
		console.log("database connected");
	} catch (err) {
		console.log(err);
		console.log("something went wrong");
	}
});
