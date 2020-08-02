$(document).ready(function () {
	$('.chat-window-message').keypress(function(event){
		if(event.keyCode == 13){
			$('#loginBtn').click();
		}
	});

	$('.sub').click(function(e){
		e.preventDefault();
		alert('button was "clicked"');
		$(".chat-thread").append('<li class="me">Are we meeting today?</li>');
		$(".chat-thread")[0].scrollTop = $(".chat-thread")[0].scrollHeight;
	});
});