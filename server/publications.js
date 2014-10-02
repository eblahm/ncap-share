

Meteor.publish('all', function() {
	return [
		collections.tags.find(),
		collections.teamUnifyUsers.find(),
		collections.posts.find()
	]
});

collections.teamUnifyUsers.allow({
	insert: function() { return true; },
	update: function() { return true; }
});


collections.posts.allow({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
