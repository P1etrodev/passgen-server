require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const genPwd = (len, useData) => {
	const range = (n) => [...Array(n).keys()];

	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "._$%&/";

	let pwd = "";

	const bools = [...Object.values(useData)];

	// console.log(useData);

	if (bools.every((e) => e === false)) {
		return "You have to pick at least one.";
	}

	let characters = "";

	if (useData.upper) {
		characters = characters + uppercase;
	}

	if (useData.lower) {
		characters = characters + lowercase;
	}

	if (useData.numbers) {
		characters = characters + numbers;
	}

	if (useData.symbols) {
		characters = characters + symbols;
	}

	for (let _ in range(len)) {
		function getChar() {
			const i = Math.floor(Math.random() * characters.length);

			const char = characters.charAt(i);

			return char;
		}

		char = getChar();

		pwd = pwd + char;
	}

	if (pwd.includes(" ")) {
		pwd.replace(" ", "");
	}

	return pwd;
};

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://passgen-p1etrodev.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/password", (req, res) => {
	const len = Number(req.body.length);
	const useData = Object(req.body.useData);
	const pwd = genPwd(len, useData);

	answer = { status: "success", password: String(pwd) };

	// console.log(answer);

	res.status(200).json(answer);
});

app.get(["/", "/ping"], (req, res) =>
	res.status(200).json({ status: "success", message: "Pong!" })
);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

export const handler = serverless(api);