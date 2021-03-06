var shouldWeFetchNotification = {
	id: "shouldFetchNoty",
	content: "YASGUI just tried to <a href='http://laurensrietveld.nl/yasgui/help.html#autocompletionmethods' target='_blank'>extract</a> properties and classes from your query, allowing you to autocomplete such URIs.<br>" +
			"However, the YASGUI server failed to reache your endpoint. This either means the endpoint is installed on your local computer, or running in an intranet.<br>" +
			"To support autocompletions for localhost endpoints, log in to YASGUI and configure localhost autocompletions.",
	draw: function() {
		noty({
			text: this.content,
			layout: 'bottomLeft',
			type: 'alert',
			id: this.id,
			closeWith: ["button"],
			buttons: [
			          {text: 'Login and configure autocompletions', onClick: function($noty) {
			              $noty.close();
			              setUriFetcherNotificationShown();
			              addToLoginStack("drawAutocompletionConfig();");
			              login();
			            },
			          },
			          {text: 'Ask me later', onClick: function($noty) {
			              $noty.close();
			            }
			          },
			          {text: 'Don\'t ask me again', onClick: function($noty) {
			              $noty.close();
			              setUriFetcherNotificationShown();
			            }
			          }
			        ]
		});
	},
};
var loginAndConfigureAutocompletions = function() {
	//first set callback for logging in
	
};

/*
 * CORS ajax calls and firefox are not a good match: firefox is buggy in this respect.
 * Use patch below to be able to get the content type
 * http://bugs.jquery.com/ticket/10338
 */
var _super = $.ajaxSettings.xhr;
$.ajaxSetup({
        xhr : function() {
                var xhr = _super();
                var getAllResponseHeaders = xhr.getAllResponseHeaders;

                xhr.getAllResponseHeaders = function() {
                        var allHeaders = getAllResponseHeaders.call(xhr);
                        if (allHeaders) {
                                return allHeaders;
                        }
                        allHeaders = "";
                        $(
                                        [ "Cache-Control", "Content-Language",
                                                        "Content-Type", "Expires", "Last-Modified",
                                                        "Pragma" ])
                                        .each(
                                                        function(i, header_name) {
                                                                if (xhr.getResponseHeader(header_name)) {
                                                                        allHeaders += header_name
                                                                                        + ": "
                                                                                        + xhr
                                                                                                        .getResponseHeader(header_name)
                                                                                        + "\n";
                                                                }
                                                        });
                        return allHeaders;
                };
                return xhr;
        }
});

var fetchCompletions = function(endpoint, type, successCallback, failCallback) {
	var completions = [];
	var pagedCount = 0;
	var pagedIterator = 0;
	var queries = {
		"property": { 
			simple: function() {
				return "" + 
					"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
					"SELECT DISTINCT ?property WHERE {?property rdf:type rdf:Property} " +
					"LIMIT 5" +
					"";
			},
			paged: function(iterator, count) {
				return "" +
					"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n " +
					"SELECT DISTINCT ?property WHERE {?property rdf:type rdf:Property}\n " +
					"ORDER BY ?property\n " +
					"LIMIT " + count + "\n " + 
					"OFFSET " + (iterator * count);
					
			}
		},
		"class": {
			simple: function() {
				return "" +
					"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
					"SELECT DISTINCT ?class WHERE {[] rdf:type ?class} " +
					"LIMIT 100" +
					"";
			},
			paged: function(iterator, count) {
				return "" +
					"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n " +
					"SELECT DISTINCT ?class WHERE {[] rdf:type ?class}\n " +
					"ORDER BY ?class\n " +
					"LIMIT " + count + "\n " + 
					"OFFSET " + (iterator * count);
					
			}
		}
	};
	var simpleCallback = function(data) {
		console.log("simple callback");
		if (needPaging(data)) {
			//hmm, guess we need paging
			pagedCount = getResultsetSize(data);
			fetchPaged();
		} else {
			getCompletionsFromResultset(data);
			successCallback(completions);
		}
	};
	var pagedCallback = function(data) {
		console.log("paged callback");
		getCompletionsFromResultset(data);
		
		if (pagedIterator == 1) {
			console.log("reached iteration 3. just stop now");
			successCallback(completions);
			return;
		}
		if (needPaging(data)) {
			pagedIterator++;
			fetchPaged();
		} else {
			//we are done! send completions to server
			successCallback(completions);
		}
	};
	var getCompletionsFromResultset = function(data) {
		$( data ).find("uri").each(function() {
			completions.push($(this).text());
		});
	};
	
	var getResultsetSize = function(data) {
		var size = $( data ).find("binding[name='" + type + "']").length;
		console.log("resultset size: " + size);
		return size;
	};
	var needPaging = function(data) {
		var size = getResultsetSize(data);
		var needPaging = (size > 0 && size % 100 == 0);
		console.log("needpaging: " + needPaging);
		return needPaging;
	};
	
	this.execQuery = function(queryStr, callback) {
		
        var acceptHeader = "application/sparql-results+xml";
        var ajaxData = [{name: "query", value: queryStr}];
        
        if (!corsEnabled[endpoint]) {
        	//console.log("trying to fetch completions from js on a cors disabled endpoint!");
        }
        $.ajax({
            url : endpoint,
            type : "GET",
            headers : {
                    Accept : acceptHeader
            },
            data : ajaxData,
            beforeSend : function(xhr) {
                    //nothing
            },
            success : function(data, textStatus, jqXHR) {
            	callback(data);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                    if (textStatus != "abort") {
                        //if query is cancelled, textStatus will be 'abort'. No need to show error window then
                        var errorMsg;
                        if (jqXHR.status == 0 && errorThrown.length == 0) {
                                checkIsOnline();
                                errorMsg = "Error querying endpoint: empty response returned";
                        } else {
                                errorMsg = "Error querying endpoint: "
                                                + jqXHR.status + " - " + errorThrown;
                        }
                        failCallback(errorMsg);
                    }
            },
        });
	};
	var fetchSimple = function() {
		//first try simple
		console.log("fetching simple");
		execQuery(queries[type].simple(), simpleCallback);
	};
	
	var fetchPaged = function() {
		console.log("fetching paged. i: " + pagedIterator);
		var query = queries[type].paged(pagedIterator, pagedCount);
		execQuery(query, pagedCallback);
	};
	fetchSimple();
};


var sendCompletionsToServer = function(endpoint, type, completions, successCallback, failCallback) {
	var data = {
    	endpoint: endpoint,
    	type: type,
    	completions: completions
    };
	$.ajax({
        url : "Yasgui/autocompleteSaver",
        type : "POST",
        dataType: 'json',
        data: JSON.stringify(data),
        
        success : function(data, textStatus, jqXHR) {
        	successCallback();
        },
        error : function(jqXHR, textStatus, errorThrown) {
                if (textStatus != "abort") {
                    //if query is cancelled, textStatus will be 'abort'. No need to show error window then
                    var errorMsg;
                    if (jqXHR.status == 0 && errorThrown.length == 0) {
                            checkIsOnline();
                            errorMsg = "Error querying endpoint: empty response returned";
                    } else {
                            errorMsg = "Error querying endpoint: "
                                            + jqXHR.status + " - " + errorThrown;
                    }
                    failCallback(errorMsg);
                }
        },
    });
};

var fetchAndStoreCompletions = function(endpoint) {
	//do this for both types of completions
	noty({
		text: "Fetching completions from endpoint " + endpoint,
		layout: 'bottomLeft',
		type: 'alert',
		closeWith: ["button", "click"],
	});
};

var fetchAndStoreCompletions = function(endpoint, type, skipFirstNotification) {
	if (skipFirstNotification == undefined) {
		noty({
			text: "Fetching " + (type == null? "": type + " ") + " completions from endpoint " + endpoint,
			layout: 'bottomLeft',
			type: 'alert',
			closeWith: ["button", "click"],
		});
	}
	if (type == null) {
		fetchAndStoreCompletions(endpoint, "class", true);
		fetchAndStoreCompletions(endpoint, "property", true);
		return;
	}
	fetchCompletions(
		endpoint, 
		type, 
		function(data) {
			if (data.length == 0) {
				noty({
					text: "Could not find any "+ type + " completions completions for endpoint " + endpoint,
					layout: 'bottomLeft',
					type: 'alert',
					closeWith: ["button", "click"],
				});
				return;
			}
			noty({
				text: "Fetched " + data.length + " "+ type + " completion" + (data.length > 1? "s":"") + " successfully. Now sending the completions to the server",
				layout: 'bottomLeft',
				type: 'alert',
				closeWith: ["button", "click"],
			});
			//fetch success
			sendCompletionsToServer(endpoint, type, data, function() {
				noty({
					text: "Successfully stored " + type + " completions on the YASGUI server!",
					layout: 'bottomLeft',
					type: 'alert',
					closeWith: ["button", "click"],
				});
				},
				function(msg) {
					onError("Failed sending " + type + " completions to the YASGUI server: " + msg);
				}
			);
		},
		function(msg) {
			onError("Failed fetching " + type + " completions from the endpoint: " + msg);
		}
	);
};

var fetchCompletionsSize = function(endpoint, type) {
	
};
