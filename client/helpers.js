

Template.registerHelper('dateFormat', function(dateObj, stringFormat) {
	return moment(dateObj).format(stringFormat);
});
