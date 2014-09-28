TronnetApp.RouteExtensions.add("resume", {}, {}, {
	didInsertElement: function(){
		$.post("http://tronnet.me/api/",{
			method: "sign_guestbook", 
		});
	}
});
TronnetApp.RouteExtensions.add("sheet", {}, {}, {
	didInsertElement: function(){
		$.post("http://tronnet.me/api/",{
			method: "sign_guestbook", 
		});
	}
});