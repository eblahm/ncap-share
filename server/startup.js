

Meteor.startup(function () {

	_.each([
		'Freestyle', 'Backstroke', 'Breaststroke',
		'Butterfly', 'IM', 'Relay', 'Drill',
		'Kick', 'Pull', 'Motivational', 'Age Group',
		'Senior', 'High School', 'Test Set',
		'Distance', 'Sprint', 'Mid-Distance', 'Game'],
		function(tag) {
			collections.tags.upsert({name: tag}, {$set: {name: tag}});
		}
	);


	collections.teamUnifyUsers.upsert({id: 1391639}, {$set: {name:'Dory Halbe', id: 1391639}});
});
