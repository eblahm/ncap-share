

Template.query.events({
	'click .applied-tag-query i': function(evt) {
		var $tag = $(evt.currentTarget).closest('.tag-label')
		Session.set('query', {});
		$tag.remove();
	}, 


});

Template.query.helpers({

	appliedTags: function(){
		var query = Session.get('query') || {};
		return collections.tags.find({'_id': {$in: [query.tags]}});
	}

});
