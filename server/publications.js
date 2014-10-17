
var util = Npm.require('util')

Meteor.publish('all', function() {
	return [
		collections.tags.find(),
		collections.posts.find(),
		collections.attachments.find()
	]
});

collections.posts.allow({
	insert: function(userId) { 
		console.log("INSERT POSTS:", util.inspect(arguments));
		return !!userId; 
	},
	update: function(userId, doc, fieldNames, modifier) { 
		console.log("UPDATE POSTS:", util.inspect(arguments));
		return (userId && doc.creator && userId === doc.creator); 
	},
	remove: function(userId, doc) { 
		console.log("REMOVE POSTS:", util.inspect(arguments));
		return (userId && doc.creator && userId === doc.creator); 
	}
});

collections.attachments.allow({
	insert: function(userId) { 
		console.log("INSERT FILE:", util.inspect(arguments));
		return !!userId; 
	},
	update: function(userId, doc, fieldNames, modifier) { 
		console.log("UPDATE FILE:", util.inspect(arguments));
		return false;
	},
	remove: function(userId, doc) { 
		console.log("REMOVE POSTS:", util.inspect(arguments));
		return false;
	}

});
