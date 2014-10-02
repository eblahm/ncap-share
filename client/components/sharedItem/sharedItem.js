


Template.sharedItem.events({

	'dblclick .shared-item': function(e) {
		var $el = $(e.currentTarget);
		var post = collections.posts.findOne($el.data('id'));
		var container = $el.closest('.shared-item-container');
		Blaze.renderWithData(Template.shareForm, post, container.get(0));
		$el.hide();
	}

});


Template.sharedItem.helpers({

});