TronnetApp.RouteExtensions.add("matrix",
{
	current: "neutral",
	is_left_section_open: function(){
		return this.get("current") == "left";
	}.property('current'),
	is_middle_section_open: function(){
		return this.get("current") == "middle";
	}.property('current'),
	is_right_section_open: function(){
		return this.get("current") == "right";
	}.property('current'),
	

},
{
	loadSection: function( router, e ){
		var section = $(e.currentTarget).data("section");
		var current = router.matrixController.get("current")
		e.view.$('.matrix-section').addClass('matrix-' + section + '-open').removeClass('matrix-' + current + '-open');
		if (section == "neutral"){
			e.view.$('.matrix-sections').addClass('matrix-section-closed').removeClass('matrix-section-open');
		} else {
			e.view.$('.matrix-sections').addClass('matrix-section-open').removeClass('matrix-section-closed');
		}
		router.matrixController.set("current", section);
	},
});