
Template.registerHelper('eq', function(item1, item2) {
	return item1 === item2;
});

Template.registerHelper('dateFormat', function(dateObj, stringFormat) {
	return moment(dateObj).format(stringFormat);
});
