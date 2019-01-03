var headers = {
    "GET": {
        "Accept": "application/json;odata=verbose"
    },
    "POST": {
        "Accept": "application/json;odata=verbose",
        "X-RequestDigest": "",
        "Content-Type": "application/json;odata=verbose"
    },
    "PUT": {
        "Accept": "application/json;odata=verbose",
        "X-RequestDigest": "",
        "Content-Type": "application/json;odata=verbose",
        "X-HTTP-Method": "PATCH",
        "If-Match": "*"
    },
    "DELETE": {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": "",
        "X-HTTP-Method": "DELETE",
        "If-Match": "*"
    }
}

function loadUserDetails(site) {
    return $.ajax({
        url: site + "/_api/web/currentuser",
        async: false,
        type: "GET",
        headers: headers["GET"]
    });
}

function loadGroupsFrom(site) {
	return $.ajax({
		url: site + "/_api/web/sitegroups",
		async: false,
        type: "GET",
        headers: headers["GET"]
	});
}

function simplifiedGetItems(uri) {
	return $.ajax({
		url: uri,
		async: false,
		type: "GET",
		headers: headers["GET"]
	});
}

function getAllListItems(webUrl, listName) {

    return $.ajax({
        url: webUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$top=5000",
        async: false,
        type: "GET",
        headers: headers["GET"]

    });

}

function getAllListItemsWithFilters(webUrl, listName, filters) {

    return $.ajax({
        url: webUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$top=5000" + filters,
        async: false,
        type: "GET",
        headers: headers["GET"]
    });

}
