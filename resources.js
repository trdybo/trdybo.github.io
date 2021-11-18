// res.result.random.data

localStorage.setItem('retrieved', true);

function test(rand) {
	console.log(rand);
}

function write(element, content = "", append = false) {
	element = document.getElementById(element);
	element.innerHTML = (append ? element.textContent : "") + content;
}

function getRand(max = 1, min = 0, passTo = null, cycle = 0){
	const dif = max - min;
	// console.log(min + "," + max + "," + dif);
	const bits = dif.toString(2).length;
	
	if (dif > 0 && dif < 1024) {
		const interval = setInterval(function() {
			const data = localStorage.getItem('data');
			// console.log(bits + "," + (data !== null ? data.length : null));		
			// console.log(localStorage.getItem('retrieved'));

			if (data !== null && data.length >= (bits * (cycle + 1))) {
				write("dOld", data);

				let rand = data.substring((bits * cycle), (bits * (cycle + 1)));
				write("bits", rand + " ", true);

				write("int", (parseInt(rand, 2) + parseInt(min, 10)));

				if (parseInt(rand, 2) > dif) {
					getRand(max, min, passTo, (cycle + 1));
				} else {
					localStorage.setItem('data', data.substring(bits * (cycle + 1)));
					write("dNew", localStorage.getItem('data'));

					if (passTo !== null) {
						passTo(rand);
					}
				}

				clearInterval(interval);
			} else if (localStorage.getItem('retrieved') == 'true') {
				localStorage.setItem('retrieved', false);
				restockRand();
			}
		}, 100);
	} else {
		write("dOld");
		write("int", "ERROR");
		write("bits");
		write("dNew");
	}
}

function restockRand() {
	const input = {
		jsonrpc: "2.0",
		method: "generateIntegers",
		params: {
			apiKey: "6c5f661c-93e1-47c4-ae89-d8984ef199e0",
			n: 250,
			min: 0,
			max: 1,
			replacement: true,
			base: 10,
			pregeneratedRandomization: null
		},
		id: 30097
	};

	fetch('https://api.random.org/json-rpc/4/invoke', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input)
		})
			.then(res => res.json())
			.then(res => {
				const data = localStorage.getItem('data');
				localStorage.setItem('data', (data !== null ? data : "") + res.result.random.data.join(''));
				console.log(localStorage.getItem('data'));
				localStorage.setItem('retrieved', true);
			});
}