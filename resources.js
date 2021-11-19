localStorage.setItem('open', true);

function test(rand) {
	console.log("Test Function Running");
}

function write(element, content = "", append = false) {
	element = document.getElementById(element);
	element.innerHTML = (append ? element.textContent : "") + content;
}