
	import QrScanner from "./qr-scanner.min.js";

	const video = document.getElementById('qr-video');
	const scanner = new QrScanner(video, result => console.log(result));
	scanner.start();

