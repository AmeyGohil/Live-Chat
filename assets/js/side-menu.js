$(document).ready(function () {
	$(".hamburger").click(function () {
		$(".side-menu").toggleClass('active');
		$(".overlay").toggleClass('active');
	});

	$(".overlay").click(function () {
		$(".side-menu").toggleClass('active');
		$(".overlay").toggleClass('active');
	});
});