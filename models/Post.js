
/**
 * creator: user
 * creator_name: string
 * title: string
 * created:  date
 * last_updated: date
 * content: String
 * tags: Array of Tag
 * attachments: Files
 */

var Post = function(props) {
	_.extend(this, props)
};

Post.prototype.getTags = function() {
	return collections.tags.find({_id: {$in: this.tags}});
};

Post.prototype.getFiles = function() {
	return _.map(this.files, function(id) {
		return collections.attachments.findOne(id);
	});
};

Post.prototype.contentHTML = function() {
	return _.escape(this.content).replace(/\n/g, '<br>');
};

collections.posts = new Meteor.Collection('posts', {
	transform: function(doc) {
		return new Post(doc);
	}
});

collections.attachments = new FS.Collection("attachments", {
  stores: [new FS.Store.FileSystem("attachments", {path: "~/.uploads"})]
});

