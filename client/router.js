

Router.map(function() {

	this.route('landing', {
		path: '/',
		waitOn: function() { return Meteor.subscribe('all'); }
	});

});