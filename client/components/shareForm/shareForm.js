

Template.shareForm.events({
	'click .submit button': function(event) {
		var $form = $(event.currentTarget).closest('.share-form');

		if (!$form.find('[name="creator_name"]').val()) {
			return alert('Please provide a name');
		}

		if (!$form.find('[name="content"]').val()) {
			return alert('Please provide content to share');
		}

		var data = {
			tags: [],
			files: [],
			created: moment().toDate()
		};
		_.each($form.serializeArray(), function(item) {
			if (item.name === 'tags') {
				data.tags.push(item.value);
				return;
			}
			data[item.name] = item.value;
		});
		collections.posts.insert(data);
	}
});


Template.shareForm.helpers({

	teamUnifyUser: function() {
		return Session.get('teamUnifyUser');
	},

	tags: function() {
		return collections.tags.find();
	}

});

