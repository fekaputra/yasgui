(function(){
	this.Yasgui = this.Yasgui || {};
	this.Yasgui.widgets = this.Yasgui.widgets || {};
	
	
	this.Yasgui.widgets.Help = function(parent, tabSettings) {
		
		var draw = function() {
			parent.append($("<div>about</div>"));
		};
		var store = function() {
			console.log("store");
		};
		draw();
		
		return {
			store: store
		};
	};
}).call(this);