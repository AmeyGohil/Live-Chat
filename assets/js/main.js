$(document).ready(function (){

	let paperMenu = {
		$window: $('.paper-window'),
		$paperFront: $('.paper-window .paper-front'),
		$hamburger: $('.hamburger'),
		offset: 1800,
		pageHeight: $('.paper-window .paper-front').outerHeight(),

		// open: function() {
		// 	this.$window.addClass('tilt');
		// 	this.$hamburger.off('click');
		// 	$('.custom_container, .hamburger').on('click', this.close.bind(this));
		// 	this.hamburgerFix(true);
		// 	console.log('opening...');
		// },
		// close: function() {
		// 	this.$window.removeClass('tilt');
		// 	$('.custom_container, .hamburger').off('click');
		// 	this.$hamburger.on('click', this.open.bind(this));
		// 	this.hamburgerFix(false);
		// 	console.log('closing...');
		// },
		updateTransformOrigin: function() {
			scrollTop = this.$window.scrollTop();
			equation = (scrollTop + this.offset) / this.pageHeight * 100;
			this.$paperFront.css('transform-origin', 'center ' + equation + '%');
		},
		//hamburger icon fix to keep its position
		// hamburgerFix: function(opening) {
		// 	if(opening) {
		// 		$('.hamburger').css({
		// 			position: 'absolute',
					// top: this.$window.scrollTop() + 30 + 'px'
				// });
			// } else {
			// 	setTimeout(function() {
			// 		$('.hamburger').css({
						// position: 'fixed',
						// top: '30px'
					// });
				// }, 300);
			// }
		// },
		bindEvents: function() {
			// this.$hamburger.on('click', this.open.bind(this));
			// $('.close').on('click', this.close.bind(this));
			this.$window.on('scroll', this.updateTransformOrigin.bind(this));
		},
		init: function() {
			this.bindEvents();
			this.updateTransformOrigin();
		},
	};

	paperMenu.init();

	$(".hamburger").click(function () {
		$(".paper-window").addClass('tilt');
		this.$window.addClass('tilt');
		$(this).off('click');
	});
	$('.custom_container').click(function () {
		$(".tilt").removeClass('tilt');
	});
	$(".close").click(function () {
		$(".tilt").removeClass('tilt');
	});


	$("#paper-back div a").click(function (){
		let curr=$(this),
			id=$(this).attr("id").replace("page-", ""),
			active=$(this).parent().find('.active');
		let active_id=active.attr("id").replace("page-", "");
		console.log(active_id);
		if(active_id===id){
			$(".tilt").removeClass('tilt');
		}
		else{
			$("#window-"+active_id).addClass('roll_out');
			$("#window-"+id).show().addClass('roll_in');
			setTimeout(function (){
				$("#window-"+active_id).hide().removeClass('roll_out');
				$(".tilt").removeClass('tilt');
				$("#window-"+id).removeClass('roll_in');
				active.removeClass('active');
				curr.addClass('active');
			},600);
		}
	});

	var textWrapper = document.querySelector('.ml11 .letters');

	textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\xFF]|\W|\w)/g, "<span class='letter'>$&</span>");

	anime.timeline({loop: false})
		.add({
			targets: '.ml11 .line',
			scaleY: [0,1],
			opacity: [0.5,1],
			easing: "easeOutExpo",
			duration: 700
		})
		.add({
			targets: '.ml11 .line',
			translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
			easing: "easeOutExpo",
			duration: 700,
			delay: 100
		}).add({
		targets: '.ml11 .letter',
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 600,
		offset: '-=775',
		delay: (el, i) => 34 * (i+1)
	});
	setTimeout(function (){
		anime({
			targets: '.ml11 .line',
			// scaleY: [0,1],
			opacity: [1,0],
			easing: "cubicBezier(.5, .05, .1, .3)",
			duration: 1000,
			loop: true
		});
	},2000);

	var textWrapper2 = document.querySelector('.ml2');
	textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter2'>$&</span>");

	anime.timeline({loop: false})
		.add({
			targets: '.ml2 .letter2',
			scale: [5,1],
			opacity: [0,1],
			translateZ: 0,
			easing: "cubicBezier(.5, .05, .1, .3)",
			duration: 600,
			delay: (el, i) => 100*i
		});
});