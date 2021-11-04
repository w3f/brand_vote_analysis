const fs = require('fs');

const file = fs.readFileSync('./sheet.csv');
const map = {};

file.toString().split('\n').forEach((line, index) => {
	if (index === 0) {
		return;
	}

	const block = line.split(',')[1].trim();
	const address = line.split(',')[2].trim();
	const balance = line.split(',')[3].trim();
	const IA = line.split(',')[4].trim();
	const LA = line.split(',')[5].trim();
	const IB = line.split(',')[6].trim();
	const LB = line.split(',')[7].trim();

	if (!parseInt(block)) {
		return;
	}

	if (!parseInt(balance)) {
		return;
	}

	if (!map[address]) {
		map[address] = {
			balance,
			block,
			IA,
			LA,
			IB,
			LB
		};
	}

	if (parseInt(block) > parseInt(map[address].block)) {
		map[address] = {
			balance,
			block,
			IA,
			LA,
			IB,
			LB
		};
	}
});

console.log('Address,Balance,Identity A,Logo A,Identity B,Logo B');

for (let address in map) {
	console.log(`${address},${map[address].balance},${map[address].IA},${map[address].LA},${map[address].IB},${map[address].LB}`);
}

