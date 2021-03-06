var fs = Npm.require('fs');

var util = Npm.require('util');

Router.map(function() {

	this.route('/ncap-share/uploads/:id', {
		where: 'server',
		path: '/ncap-share/uploads/:id',
		action: function () {
			var file = collections.attachments.findOne(this.params.id);
			if (!file) {
				this.response.statusCode = 404;
				return this.response.end('sorry there was an error :(');
			}
			console.log('reading file ' + file.copies.attachments.key);
			var data = fs.readFileSync(process.env.HOME + '/.uploads/' + file.copies.attachments.key);
			this.response.writeHead(200, {
				"Content-Type": file.copies.attachments.type
			});
			this.response.end(data);
		}
	});

});

