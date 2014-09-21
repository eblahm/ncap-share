

Template.landing.rendered = function() {
	if(!this._rendered) {
		this._rendered = true;
		$("#tags").select2({
			maximumSelectionSize: 3,
			width: 'resolve'
		});

		window.addEventListener('message', function(event) {
			if (/teamunify\.com/.test(event.origin)) {
				var data = JSON.parse(event.data);
				Session.set('teamUnifyUser', data);
				collections.teamUnifyUsers.upsert({id: id}, {$set: data});
			}
		}, false);
	}
};


Template.landing.events({
});


Template.landing.helpers({

	teamUnifyUser: function() {
		return Session.get('teamUnifyUser');
	},

	tags: function() {
		return collections.tags.find();
	},

	posts: function() {
		return collections.posts.find().fetch();
	}

});

