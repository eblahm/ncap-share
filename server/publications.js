

Meteor.publish('all', function() {
	return [
		collections.tags.find(),
		collections.posts.find(),
		collections.attachments.find()
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

collections.attachments.allow({
	insert: function(userId) { 
		console.log("INSERT FILE:", JSON.stringify(arguments));
		return !!userId; 
	},
	update: function(userId, doc, fieldNames, modifier) { 
		console.log("UPDATE FILE:", JSON.stringify(arguments));
		return false;
	},
	remove: function(userId, doc) { 
		console.log("REMOVE POSTS:", JSON.stringify(arguments));
		return false;
	}

});
