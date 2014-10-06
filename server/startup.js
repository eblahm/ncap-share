

Meteor.startup(function () {

	var defaultTags = [
		'Freestyle', 'Backstroke', 'Breaststroke',
		'Butterfly', 'IM', 'Relay', 'Drill',
		'Kick', 'Pull', 'Motivational', 'Age Group',
		'Senior', 'High School', 'Test Set',
		'Distance', 'Sprint', 'Mid-Distance', 'Game'];
	_.each(defaultTags, function(tag, i) {
			var color = collections.tagColors[i % collections.tagColors.length];
			collections.tags.upsert({name: tag}, {$set: {name: tag, color: color}});
		}
	);

});
