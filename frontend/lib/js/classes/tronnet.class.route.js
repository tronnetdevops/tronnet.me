TronnetApp.classes.Route = Ember.Route.extend({
	route: '/',
	name: 'index',
	loadPage: function(router,e){
		var section = $(e.currentTarget).data("goto");
		
		// Save some history
		TronnetApp.set("previousPage", TronnetApp.get("currentPage") );
		
		// Setting attributes used by template to determine current page
		var updatedCurrentPageObject = {};
		updatedCurrentPageObject["is_" + section ] = true;
		updatedCurrentPageObject["name"] = section;
		TronnetApp.set("currentPage", updatedCurrentPageObject);
				
		// Ping router to load new section
		TronnetApp.router.transitionTo( section );
	},
	
	loadBack: function(router, e){
		var section = (TronnetApp.get("previousPage")) ? TronnetApp.get("previousPage").name : "home";
		
		if (section == "underconstruction" || section == "" || !section)
			section = "home";
		
		// Save some history
		TronnetApp.set("previousPage", TronnetApp.get("currentPage") );
		
		// Setting attributes used by template to determine current page
		var updatedCurrentPageObject = {};
		updatedCurrentPageObject["is_" + section ] = true;
		updatedCurrentPageObject["name"] = section;
		TronnetApp.set("currentPage", updatedCurrentPageObject);
				
		// Ping router to load new section
		TronnetApp.router.transitionTo( section );
	},
	
	connectOutlets: function(router, event) {
		router.get('applicationController').connectOutlet( this.get("name") );
		this._super(router, event);
	}
});