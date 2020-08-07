let name,email;
function toggleTab(tab){
	let list1 = document.querySelectorAll(tab+" .filter > *");
	let h1 = list1[0].offsetHeight, arr1 = [], i1 = -1, l1 = list1.length;
	let anim1 = "transform" in document.body.style ? "transform" : "webkitTransform";

	while (++i1 < l1) {
		arr1.push(list1[i1].textContent.trim());
		list1[i1].style[anim1] = "translateY(" + i1*h1 +"px)";
	}
	$(tab+" .filter").removeClass('before');
	document.querySelector(tab+" input.filter").addEventListener("input", function() {
		let rgx = new RegExp(this.value, "i");
		arr1.forEach(function(el, idx) {
			if (rgx.test(el)) list1[idx].classList.remove("hidden");
			else list1[idx].classList.add("hidden");
			let i1 = -1;
			let p1 = 0;
			while (++i1 < l1) {
				if (list1[i1].className !== "hidden")
					list1[i1].style[anim1] = "translateY(" + p1++ * h1 + "px)";
			}
		})
	});
}
function get_12_hr(timestamp){
	timestamp = new Date(timestamp);
	let hours = (timestamp.getHours() < 10 ? '0' : '') +
		timestamp.getHours();
	let minutes = (timestamp.getMinutes() < 10 ? '0' : '') +
		timestamp.getMinutes();
	let newformat = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return hours + ':' + minutes + ' ' + newformat;
}
function get_24_hr(timestamp){
	timestamp = new Date(timestamp);
	let hours = (timestamp.getHours() < 10 ? '0' : '') +
		timestamp.getHours();
	let minutes = (timestamp.getMinutes() < 10 ? '0' : '') +
		timestamp.getMinutes();
	return hours + ':' + minutes;
}
function say(from,message,timestamp,me){
	message = message.trim();
	if(message === '') return;
	let twelve_hr = get_12_hr(timestamp);
	$(".chat-thread").append(
		'                    <div class="'+ ((me)?'me':'not-me') +'">\n' +
		'                        <div class="name">' + from + '</div>\n' +
		'                        <div class="text">' + message + '</div>\n' +
		'                        <div class="time">' + twelve_hr + '</div>\n' +
		'                    </div>'
	);
	$(".chat-div")[0].scrollTop = $(".chat-div")[0].scrollHeight;
}
function updateStatus(status){
	$.ajax({
		url: "../assets/utils/chat/updateStatus.php",
		type: 'POST',
		async:false,
		data:{
			status:status
		},
		success: function (result) {
			console.log(result);
		}
	});
}
$(document).ready(function () {
	$.ajax({
		url: "../assets/utils/getDetails.php",
		success: function (result) {
			console.log(result);
			if(result === 'F'){
				window.location.href = '../';
			}
			result = JSON.parse(result);
			name = result.name;
			email = result.email;
		}
	});
	updateStatus('online');

	var server = new EventSource("../assets/utils/chat/server.php");
	window.onbeforeunload = function() {
		updateStatus('offline');
		server.close();
	}
	server.onerror = function(err) {
		console.error("EventSource failed:", err);
		updateStatus('offline');
		server.close();
	};

	server.addEventListener("community", function(event) {
		let data = JSON.parse(event.data);
		for(let i = 0; i < data.length ; i++){
			if(data[i].email === email) continue;
			say(data[i].name, data[i].message, data[i].timestamp,false);
		}
	});
	// server.addEventListener("timestamp", function(event) {
	// 	console.log(event.data);
	// });

	$('.chat-window-message').keypress(function(e){
		if(e.keyCode === 13){
			$('#send').click();
			e.preventDefault();
		}
	});
	$(".chat-div")[0].scrollTop = $(".chat-div")[0].scrollHeight;
	$('#send').click(function(e){
		e.preventDefault();
		let text = $('.chat-window-message').val().trim();
		text = text.trim();
		if(text === '') return;
		let timestamp = new Date();
		let target = '1';
		$.ajax({
			url: '../assets/utils/chat/sendMessage.php',
			type: 'POST',
			data: {
				target:target,
				text:text,
				timestamp:timestamp.toISOString().split('T')[0] + ' ' + timestamp.toTimeString().split(' ')[0],
			},
			success: function (result) {
				if(result === 'F'){
					M.toast({html: 'Some error occurred while sending the message!'});
					setTimeout(function(){window.location.reload();},1000);
				}
				else{
					$('.chat-window-message').val('');
					say(name, text, timestamp.toString(),true);
				}
			}
		});

	});
	setTimeout(()=>toggleTab('#users'),100);
	$(".chat-tab").click(function(){
		if($(this).hasClass('active')) return;
		$(".chat-tab.active").removeClass('active');
		$(this).addClass('active');
		let target = $(this).attr('data-target');
		$(".chat-tab-div").fadeOut(10);
		$(target).fadeIn();
		console.log(target);
		$(".filter").addClass('before');
		$(".filter>li").css('transform','translateY(0)');
		setTimeout(()=>toggleTab(target),100);
	})
});