

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

	collections.teamUnifyUsers.upsert({id: 1391639}, {$set: {name:'Dory Halbe', id: 1391639}});

	if (!collections.posts.find().count()) {
		var tags = _.map(collections.tags.find({name : {$in: ['Drill', 'Age Group']}}).fetch(), function(doc) {
			return doc._id
		});
		var dory = collections.teamUnifyUsers.findOne({id: 1391639});
		var post = {
			creator: dory._id,
			creator_name: dory.name,
			title: '',
			created: moment().toDate(),
			last_updated: moment().toDate(),
			content: '2 x 35 Fly \n 50 back / 75 Breast \n 2 x 100 IM for time \n off th blocks for time \n',
			tags: tags,
			attachments: []
		}
		collections.posts.upsert(post, {$set: post})
	}

});
