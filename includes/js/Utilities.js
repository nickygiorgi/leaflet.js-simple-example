function isEmptyJSObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

function getBaseUrl() {
	var tokens = window.location.href.split('/');
	var baseUrl = '';
	for (var i = 0; i < tokens.length - 1; i++) {
		baseUrl += tokens[i] + '/';
	}
	return baseUrl;
}