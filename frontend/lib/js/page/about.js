TronnetApp.RouteExtensions.add("about",
	{
		current: "biophilia",
		is_technophilia_open: function(){
			return this.get("current") == "technophilia";
		}.property('current'),
		is_audiophilia_open: function(){
			return this.get("current") == "audiophilia";
		}.property('current'),
		is_philosophia_open: function(){
			return this.get("current") == "philosophia";
		}.property('current'),
		is_biophilia_open: function(){
			return this.get("current") == "biophilia";
		}.property('current'),
		getCurrentAge: function(){
			var birth = new Date('11/22/1989');
			var today = new Date();
			var differential  = today.getMonth() - birth.getMonth();
			var bdayThisMonth = (differential && ( differential / Math.abs( differential ) ) < 0) ? 1 : 0;
			return today.getYear() - birth.getYear() - bdayThisMonth;
		}.property(),
	},
	{
		loadSection: function( router, e ){
			var section = $(e.currentTarget).data("section");
			router.aboutController.set("current", section);
		},
	},
	{
		// didInsertElement: function(){
		// 	
		// 	// Show the about sections after CSS3 animations have complete initial run
		// 	// Ember.run.later(this, function(){
		// 	// 	this.$(".about-me-section.hide").removeClass("hide");
		// 	// }, 2000);
		// 	
		// 	return this._super();
		// }
	}
);