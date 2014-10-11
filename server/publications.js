

Meteor.publish('all', function() {
	return [
		collections.tags.find(),
		collections.posts.find()
	]
});

collections.posts.allow({
	insert: function(userId) { 
		console.log("INSERT POSTS:", JSON.stringify(arguments));
		return !!userId; 
	},
	update: function(userId, doc, fieldNames, modifier) { 
		console.log("UPDATE POSTS:", JSON.stringify(arguments));
		return (userId && doc.creator && userId === doc.creator); 
	},
	remove: function(userId, doc) { 
		console.log("REMOVE POSTS:", JSON.stringify(arguments));
		return (userId && doc.creator && userId === doc.creator); 
	}
});
