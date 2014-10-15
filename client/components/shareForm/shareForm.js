
Template.shareForm.rendered = function() {
	if(!this._rendered) {
		this._rendered = true;
		util.initSelect2(this.$('.tags-select'));
	}
};

var util = {
	validate: function($form) {

		if (!$form.find('[name="content"]').val()) {
			alert('Please provide content to share');
			return false
		}
		return true;
	},

	initSelect2: function($el) {
		$el.select2({
			placeholder: 'tags',
			width: 'resolve',
			formatSelection: function(tag) {
				return '<span style="background-color:'+ $(tag.element).data('color') + ';">' + tag.text + "</span>";
			},
			containerCssClass: 'tags-select2-container'
		});
	},

	resetForm: function($form) {
		var container = $form.closest('.share-form-container').get(0);
		$form.remove();
		Blaze.render(Template.shareForm, container);
		this.initSelect2();
	},

	resetItem: function($form) {
		var $container = $form.closest('.shared-item-container');
		$form.remove();
		$container.find('.shared-item').show();
	}
};

Template.shareForm.events({
	'click .btn-submit': function(event) {
		var $form = $(event.currentTarget).closest('.share-form'), _id;

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
			if (item.name === 'attachment') {
				data.files.push(item.value);
				return;
			}
			data[item.name] = item.value;
		});
		if (data._id) {
			_id = data._id;
			delete data.created;
			delete data._id;
			collections.posts.update(_id, {$set: data}, function(err) {
				console.error(err);
				util.resetItem($form);
			});
		} else {
			collections.posts.insert(data, function() {
				util.resetForm($form);
			});
		}
	},

  'change .attachments-input': function(event) {
		var $form = $(event.currentTarget).closest('form');
		var $attachments = $form.find('.attachments-list');
    FS.Utility.eachFile(event, function(file) {
      collections.attachments.insert(file, function (err, fileObj) {
				if (err) 
					alert('sorry, there was an error uploading your file :(');
				else 
					$attachments.append(Blaze.toHTMLWithData(Template.activeAttachment, fileObj));

				$input.val(null);
      });
    });	
	},

	'click .remove-attachment': function(event){
		$(event.currentTarget).closest('.active-attachment').remove();
	},

	'click .btn-cancel': function(event) {
		var container = $(event.currentTarget).closest('.shared-item-container');
		var $form = container.find('.share-form');
		var $item = container.find('.shared-item');
		$form.remove();
		$item.show();
	},

	'click .btn-delete': function(event) {
		var $form = $(event.currentTarget).closest('.share-form');
		var _id = $form.find('[name="_id"]').val();
		if (confirm('are you sure you want to delete this item?')) {
			collections.posts.remove(_id, function(err) {
				if (err) alert(err);
				$form.remove();
			});
		}
	}

});


Template.shareForm.helpers({

	allTags: function() {
		return collections.tags.find();
	}

});


