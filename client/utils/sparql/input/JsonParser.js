(function(){
	this.Yasgui = this.Yasgui || {};
	this.Yasgui.parsers = this.Yasgui.parsers || {};
	
	var JsonParser = function(json, actualResponseString) {
		var metaInfo = $.grep(Yasgui.sparql.acceptHeaders.select, function( element, index ) {
			  return element.extension == "json";
		})[0];
		var getVariables = function() {
			if ("head" in json) {
				return json.head.vars;
			} else {
				return null;
			}
		};
		
		var getBindings = function() {
			if ("results" in json) {
				return json.results.bindings;
			} else {
				return null;
			}
		};
		
		var getBoolean = function() {
			if ("boolean" in json) {
				return json.boolean;
			} else {
				return null;
			}
		};
		var getResponse = function() {
			return actualResponseString;
		};
		
		var getCmMode = function() {
			return {
				name: "javascript",
				json: true
			};
		};
		return {
			getVariables: getVariables,
			getBindings: getBindings,
			getBoolean: getBoolean,
			getResponse: getResponse,
			getCmMode: getCmMode,
			getMetaInfo: metaInfo
		};
	};
	
	Yasgui.parsers.JsonParser = JsonParser;
})(this);