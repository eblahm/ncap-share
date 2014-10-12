var fs = Npm.require('fs');

var util = Npm.require('util');

Router.map(function() {

	this.route('/uploads/:id', {
		where: 'server',
		path: '/uploads/:id',
		action: function () {
			var file = collections.attachments.findOne(this.params.id);
			if (!file) return this.response.end('sorry there was an error :(');
			var data = fs.readFileSync(process.env.HOME + '/.uploads/' + file.copies.attachments.key);
			this.response.writeHead(200, {
				"Content-Type": file.copies.attachments.type
			});
			this.response.end(data);
		}
	});

});

