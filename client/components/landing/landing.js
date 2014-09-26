

Template.landing.rendered = function() {
	if(!this._rendered) {
		this._rendered = true;
		$(".tags").select2({
			placeholder: 'tags',
			width: 'resolve',
			formatSelection: function(tag) {
				return '<span style="background-color:'+ $(tag.element).data('color') + ';">' + tag.text + "</span>";
			},
			containerCssClass: 'tags-select2-container'
		});

		window.addEventListener('message', function(event) {
			if (/teamunify\.com/.test(event.origin)) {
				var data = JSON.parse(event.data);
				Session.set('teamUnifyUser', data);
				collections.teamUnifyUsers.upsert({id: id}, {$set: data});
			}
		}, false);
	}
};


Template.landing.events({
});


Template.landing.helpers({

	posts: function() {
		return collections.posts.find().fetch();
	}

});

