
$(function() {
	$("#tags").select2({
		maximumSelectionSize: 3,
		width: 'resolve'
	});

	window.addEventListener('message', function(event) {
		if (/teamunify\.com/.test(event.origin)) {
			var data = JSON.parse(event.data);
			Session.set('name', data.name);
		}
	}, false);

});

Template.landing.events({
});

Template.landing.helpers({
	name: function() {
		return Session.get('name');
	}

});

