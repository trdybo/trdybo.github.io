// res.result.random.data

localStorage.setItem('retrieved', true);
localStorage.setItem('id', 1);

function getRand(max = 1, min = 0, passTo = null, cycle = 0){
	const dif = max - min;
	const bits = dif.toString(2).length;
	
	if (dif > 0 && dif < 1024) {
		const interval = setInterval(function() {
			const data = localStorage.getItem('data');

			if (data !== null && data.length >= (bits * (cycle + 1))) {
				write("dOld", data);

				let rand = data.substring((bits * cycle), (bits * (cycle + 1)));
				write("bits", rand);
				
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

				localStorage.setItem('open', true);
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
		
		localStorage.setItem('open', true);
	}
}

function restockRand() {
	const input = {
		jsonrpc: "2.0",
		method: "generateIntegers",
		params: {
			apiKey: "56aaec18-d654-4b2c-8840-d9cdf3d95396",
			n: 250,
			min: 0,
			max: 1,
			replacement: true,
			base: 10,
			pregeneratedRandomization: null
		},
		id: localStorage.getItem("id")
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
				localStorage.setItem("id", parseInt(localStorage.getItem("id"), 10) + 1);
			});
}