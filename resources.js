localStorage.setItem('open', true);

function test(rand) {
	console.log("Test Function Running");
}

function write(element, content = "", append = false) {
	try {
		element = document.getElementById(element);
		element.innerHTML = (append ? element.textContent : "") + content;
	} catch {}
}

function requirePassword (returnTo = "/", hashCheck = "-a804001") {
	document.getElementsByClassName("page")[0].style.visibility = "hidden";
	if (!localStorage.getItem('login') || (Date.now() - localStorage.getItem('login')) >= 10000) {
		
		setTimeout(function() {
			window.location.href = "/Login/";
			localStorage.setItem('hashCheck', hashCheck)
			localStorage.setItem('returnTo', returnTo)
		}, 1000);
	} else {
		document.getElementsByClassName("page")[0].style.visibility = "visible";
	}
}