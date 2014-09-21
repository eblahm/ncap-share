

$(function() {
	var iframe = $('#ncap-share').get(0).contentWindow;
	var i = 0;
	var send = setInterval(function() {
		i++;
		if (i < 10) {
			iframe.postMessage(JSON.stringify({
				name: UserVoice_firstName + UserVoice_lastName,
				id: UserVoice_id
			}), 'https://ncap-share.meteor.com');
		}
		else {
			clearInterval(send);
		}
	}, 300);
});