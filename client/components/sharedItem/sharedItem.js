


Template.sharedItem.events({

	'dblclick .owned-shared-item': function(e) {
		var $el = $(e.currentTarget);
		var post = collections.posts.findOne($el.data('id'));
		var container = $el.closest('.shared-item-container');
		Blaze.renderWithData(Template.shareForm, post, container.get(0));
		$el.hide();
	},

	'click .tag-label': function(evt){
		var _id = $(evt.currentTarget).data('id');
		Session.set('query', {tags: _id});
	}

});


Template.sharedItem.helpers({
});
