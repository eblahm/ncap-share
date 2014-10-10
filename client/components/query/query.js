

Template.query.events({
	'click .applied-tag-query': function(evt) {

	}
});

Template.query.helpers({

	appliedTags: function(){
		var query = Session.get('query') || {};
		return collections.tags.find({'_id': {$in: _.values(query)}});
	}

});
