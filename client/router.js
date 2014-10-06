
Router.map(function() {

	this.route('landing', {
		path: '/',
		waitOn: function() { return Meteor.subscribe('all'); },
		action: function () {
			this.ready()? this.render() : this.render('Loading');
		}
	});

});