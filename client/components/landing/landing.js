
var landingPage = {

	init: function() {
		this.initAutocomplete();
		this.listenForLogin();
	},

	initAutocomplete: function() {
		var suggestions = _.map(collections.tags.find().fetch(), function(doc) {
			return { value: doc.name, data: doc };
		});
		$('#search-posts').autocomplete({
		    lookup: suggestions,
		    onSelect: function (suggestion) {
					Session.set('autocompleteTagSelection', suggestion.data);
				}
		});
	},

	listenForLogin: function() {
		window.addEventListener('message', function(event) {
			if (/teamunify\.com/.test(event.origin) || true) {
				var data = JSON.parse(event.data);
				Accounts.createUser({
					username: data.id,
					email: data.email,
					password: data.psw,
					profile: { name: data.name }
				}, function(err) {
					if (err) Meteor.loginWithPassword(data.id, data.psw);
				});
			}
		}, false);
	},

	search: function() {
		var keywordSearch = $('#search-posts').val();
		var tagSelection = Session.get('autocompleteTagSelection');
		var tagSearch = (tagSelection && tagSelection.name === keywordSearch);
		var query;
		if (tagSearch) {
			query = {tags: tagSelection._id};
		} else {
			var regexsOnFields = _.map(['creator_name', 'content'], function(field) {
				var subQuery = {};
				subQuery[field] = {"$regex": keywordSearch, "$options": "i" }
				return subQuery;
			});
			query = {$or: regexsOnFields};
		}
		Session.set('query', query);
	}

};


Template.landing.rendered = function() {
	if(!this._rendered) {
		this._rendered = true;
		landingPage.init();
	}
};


Template.landing.events({
	'keydown #search-posts': function(event) {
		var ENTER_KEY = 13;
		if (event.keyCode === ENTER_KEY) {
			landingPage.search();
		}
	},

	'click .search-label i': function(evt) {
		var $tag = $(evt.currentTarget).closest('.search-label')
		Session.set('query', {});
		$tag.remove();
	},

});


Template.landing.helpers({

	posts: function() {
		var query = Session.get('query') || {};
		return collections.posts.find(query, {sort: {created: -1}});
	},

	activeSearch: function() {
		var query = Session.get('query') || {};
		return !!_.keys(query).length;
	},

	appliedTags: function(){
		var query = Session.get('query') || {};
		return collections.tags.find({'_id': {$in: [query.tags]}});
	},

	query: function() {
		return Session.get('query');
	},

});

