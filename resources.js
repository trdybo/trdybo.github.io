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

function requirePassword (returnTo = "/") {
	document.getElementsByClassName("page")[0].style.visibility = "hidden";
	if (localStorage.getItem('login') == null || (Date.now() - parseInt(localStorage.getItem('login'), 10) >= 10 * (1000 * 60))) {
		window.location.href = "/Login/";
		localStorage.setItem('hashCheck', "-2872ae81");
		localStorage.setItem('returnTo', returnTo);
	} else {
		document.getElementsByClassName("page")[0].style.visibility = "visible";
	}
}
