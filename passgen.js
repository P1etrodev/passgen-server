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

module.exports = genPwd;
