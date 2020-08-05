$(document).ready(function () {

	$("#login_btn").click(function (e){
		e.preventDefault();
		$("#login-error").slideUp();
		let email_el = $("#login_email");
		let email = email_el.val().trim();
		let pass_el = $("#login_password");
		let pass = pass_el.val();
		if(pass.length<8) {
			pass_el.val(pass);
			pass_el.addClass('invalid');
			return;
		}
		let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
		if(!emailExp.test(email)) {
			email_el.val(email);
			email_el.addClass('invalid');
			return;
		}
		let hashpassword = CryptoJS.HmacSHA256(pass, "LiveChat").toString();
		console.log(hashpassword);
		$.ajax({
			url: "assets/utils/login.php",
			type:"POST",
			data:{
				// "name":name,
				"email":email,
				"pass":hashpassword,
			},
			success: function (result) {
				console.log(result);
				if(result === 'S'){
					$("#login-error").slideUp();
					$("#login-success").slideDown();
					setTimeout(function (){
						window.location.href='chat';
					}, 3000);
				}
				else if(result === 'email_not_found'){
					email_el.addClass('invalid');
					// email_el.parent().find('.helper-text').attr('data-error','');
					$("#login-error").html('This email address is not registered...').slideDown();
				}
				else if(result === 'pass_wrong'){
					pass_el.addClass('invalid');
					// email_el.parent().find('.helper-text').attr('data-error','');
					$("#login-error").html('Password entered is incorrect...').slideDown();
				}
				else{
					$("#login-error").html('We are sorry, some error occurred... Please try again...').slideDown();
				}
			}
		});
	})

});