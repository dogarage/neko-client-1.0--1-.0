!function () {
	let element;
	let lastx = 0;
	let lasty = 0;
	let loc = "Limbo";

	function distance(x, y, x2, y2) {
		return Math.hypot(x2 - x, y2 - y)
	}

	element = document.createElement("span");
	element.style.transform = "initial";
	element.className = "framed";
	element.textContent = `0.00pix/1s | ${loc}`;
	// element.style.float = "left";
	OWOP.client.elements.topLeftDisplays.appendChild(element);
	setInterval(function () {
		let x = OWOP.client.mouse.tileX;
		let y = OWOP.client.mouse.tileY;
		let lx = x, ly = y;
		let delta = distance(x, y, lastx, lasty);
		x = Math.abs(x); y = Math.abs(y);
		loc = x < 1000 && y < 1000 ? "Limbo" :
		x < 10000 && y < 10000 ? "Oblivion" :
		x < 100000 && y < 100000 ? "Arcadia" :
		x < 200000 && y < 200000 ? "Purgatory" :
		x < 300000 && y < 300000 ? "Damnation" :
		x < 400000 && y < 400000 ? "Paradise" :
		x < 500000 && y < 500000 ? "Nirvana" :
		x < 600000 && y < 600000 ? "Ragnarok" :
		x < 700000 && y < 700000 ? "Olympus" :
		x < 800000 && y < 800000 ? "Eden" :
		x < 900000 && y < 900000 ? "Utopia" :
		x < 1000000 && y < 1000000 ? "Laniakea" :
		x < 16776000 && y < 16776000 ? "Void" :
		x < 16777216 && y < 16777216 ? "Proxima" :
		x < 134217728 && y < 134217728 ? "Death" : "ERROR";
		element.textContent = `${delta.toFixed(2)}pix/1s | ${loc}`;
		lastx = lx; lasty = ly;
	}, 1000);
}();
