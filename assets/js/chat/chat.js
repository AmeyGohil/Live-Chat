$(document).ready(function () {
	$('.chat-window-message').keypress(function(e){
		console.log(e.keyCode);
		if(e.keyCode === 13){
			$('#loginBtn').click();
		}
	});
	$(".chat-div")[0].scrollTop = $(".chat-div")[0].scrollHeight;
	$('#send').click(function(e){
		e.preventDefault();
		$(".chat-thread").append('<div class="me">Are we meeting today?</div>');
		$(".chat-div")[0].scrollTop = $(".chat-div")[0].scrollHeight;
		let timestamp = new Date();
		let hours = (timestamp.getHours() < 10 ? '0' : '') +
			timestamp.getHours();
		let minutes = (timestamp.getMinutes() < 10 ? '0' : '') +
			timestamp.getMinutes();

		let twenty_four_hr = hours + ':' + minutes;

		let newformat = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		let twelve_hr = hours + ':' + minutes + ' ' + newformat;
		let text = $('.chat-window-message').val();
		let target = 'community';
		$.ajax({
			url: '../assets/utils/verify/getDetails.php',
			type: 'POST',
			data: {
				target:target,
				text:text,
				timestamp:timestamp,
			},
			success: function (result) {
				if(result === 'F'){
					window.location.href='..';
				}
				else{
					result = JSON.parse(result);
					$("#name").val(result.name);
					$("#email").val(result.email);
					let type = result.type;
					if(type !== 'visitor') $('.visitor').remove();
					if(type !== 'exhibitor') $('.exhibitor').remove();
					if(type !== 'sponsor') $('.sponsor').remove();
					if(type !== 'media') $('.media').remove();
				}
			}
		});

	});
});