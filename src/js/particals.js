function Particles(app) {
	var self = this;
	self.app = app;

	// parameters

	let particaleArray = [];
	let ctx = null;
	let canvas = null;
	let box = null;
	let imageData;

	var scale = 3;
	var maxDensity = 12;
	var maxSize = 0.5;
	var minSize = 0.2;

	var alphaLimit = 128;
	var maxLineDistance = 2.5;
	var minLineDistance = 2;
	
	var delay = 1000;
	var resizeCounter = 0;
	var callCounter = 0;

	var toUse = 'text';
	var canConnect = false;

	var imageWidth;
	var imageHeight;
	var imageSource = '/dist/img/blazon_icon_white.png';

	var textSize = 32;
	var text = ['Zerstreuung', 'in', 'der Corona Zeit'];
	var color = '#ffffff';


	// handle mouse
	const mouse = {
		x: null,
		y: null,
		radius: 22
	};

	this.init = function () {
		this.setup();
	};

	this.setup = function () {
		if (app.debug) {
			// console.log("Particals started");
		}

		canvas = document.getElementById('js-particals');
		ctx = canvas.getContext('2d');
		
		toUse = canvas.dataset.type;
		canConnect = JSON.parse(canvas.dataset.connect);
		if (toUse == 'image') {
			imageSource = canvas.dataset.input;
		}

		getSizes();

		window.addEventListener('mousemove', function (event) {
			mouse.x = event.x - box.x;
			mouse.y = event.y - box.y;
		});

		window.addEventListener('resize', function (event) {
			resizeCounter++;
			setTimeout(function () {
				triggerAfterResize();
			}, delay);
		});

		if (toUse == 'text') {
			loadText();
		} else {
			loadImage();
		}
		animate();
		
		function triggerAfterResize() {
			callCounter++;
			if (resizeCounter == callCounter) {
				resizeCounter = 0;
				callCounter = 0;
				
				var oldSizeX = canvas.width;
				var oldSizeY = canvas.height;
				getSizes();
				
				var divX = (canvas.width - oldSizeX) / 2;
				var divY = (canvas.height - oldSizeY) / 2;
				
				for (var i = 0; i < particaleArray.length; i++) {
					particaleArray[i].baseX += divX;
					particaleArray[i].baseY += divY;
				}

				animate();
				// console.log('after');
			}
		}
	};

	// Start Functions
	class Particle {
		constructor(x, y, color) {
			this.x = x;
			this.y = y;
			this.color = color;
			this.size = scale * maxSize;
			this.baseX = this.x;
			this.baseY = this.y;
			this.density = (Math.random() * maxDensity + 1);
		}

		draw() {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}

		update() {
			let dx = mouse.x - this.x;
			let dy = mouse.y - this.y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			let forceX = dx / distance;
			let forceY = dy / distance;
			let maxDistance = mouse.radius * scale;
			let force = (maxDistance - distance) / maxDistance;
			let directionX = forceX * force * (this.density - maxDensity);
			let directionY = forceY * force * (this.density - maxDensity);

			if (distance < mouse.radius * scale) {
				if (this.size > (scale * minSize)) {
					this.size -= 0.4;
				}

				this.x += directionX;
				this.y += directionY;
			} else {
				if (this.size <= (scale * maxSize)) {
					this.size += 0.08;
				}

				if (this.x != this.baseX) {
					this.x -= (this.x - this.baseX) / 10;
				}
				if (this.y != this.baseY) {
					this.y -= (this.y - this.baseY) / 10;
				}
			}
		}
	}

	function initParticals() {
		particaleArray = [];
		var red;
		var green;
		var blue;
		var color;
		var alpha;
		

		for (var y = 0; y < imageData.height; y++) {
			for (var x = 0; x < imageData.width; x++) {
				red = imageData.data[(y * imageData.width + x) * 4];
				green = imageData.data[(y * imageData.width + x) * 4 + 1];
				blue = imageData.data[(y * imageData.width + x) * 4 + 2];
				alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
				if (imageData.data[(y * imageData.width + x) * 4 + 3] > alphaLimit) {
					
					var posX = x * scale + ((canvas.width - (imageWidth * scale))/ 2);
					var posY = y * scale + ((canvas.height - (imageHeight * scale))/ 2);

					color = 'rgba(' + red + ', ' + green + ', ' + blue + ',' + alpha + ')';
					particaleArray.push(new Particle(posX, posY, color));
				}
			}
		}
	}

	function getSizes() {
		box = canvas.getBoundingClientRect();
		canvas.width = box.width;
		canvas.height = box.height;
	}

	function animate() {
		if (resizeCounter == 0) {			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < particaleArray.length; i++) {
				particaleArray[i].update();
				particaleArray[i].draw();
			}
			
			if (canConnect) {
				connect();
			}
			requestAnimationFrame(animate);
		}
	}

	function connect() {
		for (var a = 0; a < particaleArray.length; a++) {
			for (var b = a + 1; b < particaleArray.length; b++) {
				let dx = particaleArray[a].x - particaleArray[b].x;
				let dy = particaleArray[a].y - particaleArray[b].y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance <= (maxLineDistance * scale) && distance >= (minLineDistance * scale)) {
					var opacity = 1 - distance / (maxLineDistance * scale);
					ctx.strokeStyle = particaleArray[a].color;
					ctx.globalAlpha = opacity;
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.moveTo(particaleArray[a].x, particaleArray[a].y);
					ctx.lineTo(particaleArray[b].x, particaleArray[b].y);
					ctx.stroke();
					ctx.globalAlpha = 1;
				}
			}
		}
	}

	function loadImage() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		var img = new Image();
		img.onload = function() {
			imageWidth = img.width;
			imageHeight = img.height;
			
			var maxScaleWidth = Math.floor(canvas.width / img.width);
			var maxScaleHeight = Math.floor(canvas.height / img.height);
			
			scale =  maxScaleWidth < maxScaleHeight ? maxScaleWidth : maxScaleHeight;
			
			ctx.drawImage(img, 0, 0);
			// ctx.drawImage(img, (canvas.width - imageWidth)/2, (canvas.height - imageHeight)/2);
			imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			initParticals();
		};

		img.src = imageSource;
	}

	function loadText() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = color;
		ctx.font = 'bold ' + textSize + 'px sans-Serif';
		ctx.textAlign = "center";
		
		imageWidth = 0;
		
		for (var i = 0; i < text.length; i++) {
			var textWidth = text[i].length * textSize;
			imageWidth = textWidth > imageWidth ? textWidth : imageWidth;
		}
		
		for (var l = 0; l < text.length; l++) {
			ctx.fillText(text[l], imageWidth / 2, (textSize * l) + (textSize * text.length * 0.5) , imageWidth);
		}

		imageHeight = (textSize * text.length) + (textSize * text.length * 0.5);

		imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		initParticals();
	}
}
