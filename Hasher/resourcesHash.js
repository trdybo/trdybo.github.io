function hash(input) {                  
	var hash = 65535;
	
	if (input.length !== 0)
	for (i = 0; i < input.length; i++) {
		let charCode = input.charCodeAt(i);
		hash = ((hash << 1) ^ charCode) * 7;
	}
	
	localStorage.setItem('open', true);	  
	return hash;	
}