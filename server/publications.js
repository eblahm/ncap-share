

Meteor.publish('all', function() {
	return [
		collections.tags.find(),
		collections.posts.find()
	]
});

collections.posts.allow({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
