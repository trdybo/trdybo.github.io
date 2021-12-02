function hash(input) {                  
	var hash = 65535;
	
	if (input.length !== 0)
	for (i = 0; i < input.length; i++) {
		let charCode = input.charCodeAt(i);
		hash = Math.pow(((hash << 1) ^ ((~charCode) * 3)), 2) * 7;
	}
	
	return (~hash).toString(16);
}