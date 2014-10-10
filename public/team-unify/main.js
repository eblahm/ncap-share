$(function() {
	var iframe = $('#ncap-share').get(0).contentWindow;
	var i = 0;
	var user = {
		name: UserVoice_firstName + UserVoice_lastName,
		email: UserVoice_email,
		id: UserVoice_id,
		psw: ''
	}
	user = JSON.stringify(user);
	var send = setInterval(function() {
		i++;
		if (i < 50) {
			iframe.postMessage(user, 'https://ncap-share.meteor.com');
		}
		else {
			clearInterval(send);
		}
	}, 300);
});
