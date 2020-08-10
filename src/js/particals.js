function Particles(app) {
	var self = this;
	self.app = app;

	// parameters
	
	let particaleArray = [];
	let ctx = null;
	let canvas = null;
	let box = null;
	let imageData;
	var textField;
	
	var offsetX;
	var offsetY;
	var scale = 6;
	var textSize = 50;
	var maxDensity = 42;
	var maxSize = 3;
	var color = '#ffffff';
	var axisX = 0;
	var axisY = 12;
	
	var alphaLimit = 64;
	var maxLineDistance = 18;
	var minLineDistance = 10;
	var isPlaying = true;
	var hasStopped = false;
	var text = 'halma';

	// handle mouse
	const mouse = {
		x: null,
		y: null,
		radius: 350
	}

	this.init = function () {
		if (true) {
			this.setup();
		}
	};

	this.setup = function () {
		if (app.debug) {
			console.log("Particals started");
		}
		
		canvas = document.getElementById('js-particals');
		ctx = canvas.getContext('2d');
		var $text = document.querySelector('.control input');
		$text.placeholder = text;
		
		getSizes();
		
		window.addEventListener('mousemove', function(event) {
			mouse.x = event.x - box.x;
			mouse.y = event.y - box.y;
		});
		
		window.addEventListener('resize', function(event) {
			getSizes();
		});
		
		
		textField = document.querySelector('#control-text__input')
		textField.addEventListener('input', function(event) {
			text = textField.value;
			loadText();
		});
		
		var $color = document.querySelector('#control-color__input');
		$color.value = color;
		$color.addEventListener('change', function(event) {
			color = $color.value;
		});

		var $size = document.querySelector('#control-size__input');
		$size.value = textSize;
		$size.addEventListener('change', function(event) {
			textSize = $size.value;
			loadText();
		});
		
		var $axisX = document.querySelector('#control-axisX__input');
		$axisX.value = axisX;
		$axisX.max = canvas.width/2;
		$axisX.min = canvas.width/-2;
		$axisX.addEventListener('change', function(event) {
			axisX = $axisX.value;
			loadText();
		});
		
		var $axisY = document.querySelector('#control-axisY__input');
		$axisY.max = canvas.height/2;
		$axisY.min = canvas.height/-2;
		$axisY.value = axisY;
		$axisY.addEventListener('change', function(event) {
			axisY = $axisY.value;
			loadText();
		});
		
		var $scale = document.querySelector('#control-scale__input');
		$scale.value = scale;
		$scale.addEventListener('change', function(event) {
			scale = $scale.value;
			loadText();
		});
		
		var $density = document.querySelector('#control-density__input');
		$density.value = maxDensity;
		$density.addEventListener('change', function(event) {
			maxDensity = $density.value;
			loadText();
		});

		var $radius = document.querySelector('#control-radius__input');
		$radius.value = mouse.radius;
		$radius.addEventListener('change', function(event) {
			mouse.radius = $radius.value;
		});

		var $dot = document.querySelector('#control-dot__input');
		$dot.value = maxSize;
		$dot.addEventListener('change', function(event) {
			maxSize = $dot.value;
		});
		
		var $lineMax = document.querySelector('#control-lineMax__input');
		$lineMax.value = maxLineDistance;
		$lineMax.addEventListener('change', function(event) {
			maxLineDistance = $lineMax.value;
		});
		
		var $lineMin = document.querySelector('#control-lineMin__input');
		$lineMin.value = minLineDistance;
		$lineMin.addEventListener('change', function(event) {
			minLineDistance = $lineMin.value;
		});
	
		// $text.style.opacity = 0;
		loadText();

		animate();
	}

	// Start Functions
	class Particle {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.size = maxSize;
			this.baseX = this.x;
			this.baseY = this.y;
			this.density = (Math.random() * maxDensity + 1);
		}
		
		draw() {
			ctx.fillStyle = color;
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
			let maxDistance = mouse.radius;
			let force = (maxDistance - distance) / maxDistance;
			let directionX = forceX * force * (this.density - maxDensity);
			let directionY = forceY * force * (this.density - maxDensity);
			
			if (distance < mouse.radius) {
				if (this.size > 0.8) {
					this.size -= 0.4;
				}
				 
				this.x += directionX;
				this.y += directionY;
			} else {
				if (this.size <= maxSize) {
					this.size += 0.08;
				}
				 
				if (this.x != this.baseX) {	this.x -= (this.x - this.baseX)/10; }
				if (this.y != this.baseY) {	this.y -= (this.y - this.baseY)/10;	}
			}
		}
 	}
	
	function initParticals() {
		particaleArray = [];

		for (var y = 0; y < imageData.height; y++) {
			for (var x = 0; x < imageData.width; x++) {
				if (imageData.data[(y * imageData.width + x) * 4 + 3 ] > alphaLimit) {
					var posX = x * scale - offsetX + (parseInt(axisX) * scale);
					var posY = y * scale - offsetY + (parseInt(axisY) * scale);
					
					if (particaleArray.length == 1) {
						console.log('position:',posX, posY);
					}
					
					particaleArray.push(new Particle(posX, posY));
				}
			}
		}
	}
	
	function getSizes() {
		box = canvas.getBoundingClientRect();
		canvas.width = box.width;
		canvas.height = box.height;
		
		offsetX = (canvas.width/2) * (scale - 1);
		offsetY = (canvas.height/2) * (scale - 1) + ((textSize * (scale) / 4));
	}
	
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < particaleArray.length; i++) {
			particaleArray[i].update();
			particaleArray[i].draw();
		}
		connect();
		requestAnimationFrame(animate);
	}
	
	function connect() {
		for (var a = 0; a < particaleArray.length; a++) {
			for (var b = a + 1; b < particaleArray.length; b++) {
				let dx = particaleArray[a].x - particaleArray[b].x;
				let dy = particaleArray[a].y - particaleArray[b].y;
				let distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance <= maxLineDistance && distance >= minLineDistance) {
					var opacity = 1 - distance/maxLineDistance;
					ctx.strokeStyle = color;
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
	
	function loadText() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = color;
		ctx.font = textSize + 'px sans-serif';
		ctx.textAlign = "center"; 
		ctx.fillText(text, canvas.width/2 , canvas.height/2 + 16, canvas.width);
		imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		initParticals();
	}

}