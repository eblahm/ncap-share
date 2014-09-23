
var util = {
	validate: function($form) {
		if (!$form.find('[name="creator_name"]').val()) {
			alert('Please provide a name')
			return false;
		}

		if (!$form.find('[name="content"]').val()) {
			alert('Please provide content to share');
			return false
		}
		return true;
	},

	reset: function($form) {
		var container = $form.closest('.share-form-container').get(0);
		$form.remove();
		Blaze.render(Template.shareForm, container);
		$(".tags").select2({
			placeholder: 'tags',
			width: 'resolve'
		});
	}
}

Template.shareForm.events({
	'click .submit button': function(event) {
		var $form = $(event.currentTarget).closest('.share-form');

		if (!util.validate($form)) return false;

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
		collections.posts.insert(data, function() {
			util.reset($form);
		});
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

