

Template.landing.rendered = function() {
	if(!this._rendered) {
		this._rendered = true;

		window.addEventListener('message', function(event) {
			if (/teamunify\.com/.test(event.origin) || true) {
				var data = JSON.parse(event.data);
				Accounts.createUser({
					username: data.id,
					email: data.email,
					password: data.psw,
					profile: { name: data.name }
				}, function(err) {
					if (err) Meteor.loginWithPassword(data.id, data.psw);
				});
			}
		}, false);
	}
};

Template.landing.events({

});


Template.landing.helpers({

	posts: function() {
		return collections.posts.find().fetch();
	}

});

