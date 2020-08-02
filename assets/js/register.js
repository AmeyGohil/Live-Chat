$(document).ready(function () {

	$("#register_btn").click(function (e){
		e.preventDefault();
		$("#register-error").slideUp();
		let name_el = $("#register_name");
		let name = name_el.val().trim();
		let email_el = $("#register_email");
		let email = email_el.val().trim();
		let pass_el = $("#register_password");
		let pass = pass_el.val();
		if(name.length<4) {
			name_el.val(name);
			name_el.addClass('invalid');
			return;
		}
		if(pass.length<8) {
			pass_el.val(pass);
			pass_el.addClass('invalid')
			return;
		}
		let emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
		if(!emailExp.test(email)) {
			email_el.val(email);
			// email_el.parent().find('.helper-text').attr('data-error','');
			email_el.addClass('invalid');
			return;
		}
		let hashpassword = CryptoJS.HmacSHA256(pass, "LiveChat").toString();
		$.ajax({
			url: "./assets/utils/register.php",
			type:"POST",
			data:{
				"name":name,
				"email":email,
				"pass":hashpassword,
			},
			success: function (result) {
				console.log(result);
				if(result === 'S'){
					$("#register-error").slideUp();
					$("#register-success").slideDown();
					setTimeout(function (){
						window.location.href='chat';
					}, 3000);
				}
				else if(result === 'user_exist'){
					$("#register-error").html('This email address is already used...').slideDown();
				}
				else{
					$("#register-error").html('We are sorry, some error occurred... Please try again...').slideDown();
				}
			}
		});
	})

});