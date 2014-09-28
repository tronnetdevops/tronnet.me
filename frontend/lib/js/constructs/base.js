	window.TronnetApp = Ember.Application.create({
		ready: function () {
			TronnetApp.initialize();
			this._super();
		},
		
		ApplicationController: Ember.Controller.extend({
			menu: Em.View.extend({
				templateName: "tronnet-menu-main"
			}),			
		}),	
		ApplicationView: Em.View.extend({
			templateName: "tronnet-main",
		}),
		
		Router: Ember.Router.extend({
			enableLogging: true,
		    location: Ember.Location.create({
		        implementation: 'hash'
		    }),
			root: Ember.Route.extend({
				index: Ember.Route.extend({
					route: '/',
					redirectsTo: (function(){
						// Check to see if we're already on a specific page in the hash
						var currentSection = location.hash.substr(2, location.hash.length-1 );
						return currentSection || 'home';
					})()
				}),
			})
		}),
		
		RouteExtensions: {
			add: function addRouteExtension( pageName, data, methods, view ){
				// Capitalize pageName
				var PageName = pageName[0].toUpperCase() + pageName.substr(1, pageName.length-1 );

				// Controller
				TronnetApp[ PageName + "Controller"] = Ember.Controller.extend( data || {} );

				// View
				TronnetApp[ PageName + "View"] = Ember.View.extend(
					$.extend( view || {}, {
						templateName: "tronnet-main-section-" + pageName,
						pageName: pageName
					})
				);

				// Route Extension
				var PageRoute = {};
				PageRoute[ pageName ] = TronnetApp.classes.Route.extend(
					$.extend( methods || {}, {
						route: '/' + pageName,
						name: pageName
					})
				);
				TronnetApp.Router.reopen( PageRoute );
				
				return true
			}
		},
		
		currentPage: (function(){
			// Check to see if we're already on a specific page in the hash
			var currentSection = location.hash.substr(2, location.hash.length-1 ) || 'home';
			var currentPageObject = {};
			currentPageObject["is_" + currentSection ] = true;
			return currentPageObject;
		})(),
		
		classes: {},
		modals: {},
		tmp: {},
	});