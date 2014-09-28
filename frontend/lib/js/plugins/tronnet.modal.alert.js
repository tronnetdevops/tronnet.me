// Controller
TronnetApp.modals.alert = Ember.Object.create({
	name: 'alert',
	description: 'This modal will cover the screen with a gray out mask and alert the user of pertenant information.',
	
	is_open: 0,
	show: function(title, message, custom){
		if (title){
			this.controller.set('title', title);
		}
		if (message){
			this.controller.set('message', message);
		}
		if (custom && typeof custom == "object"){
			this.controller.set('test', 'oookay');
			this.controller.setProperties( custom );
		}
		if (this.get('is_open')){
			this.hide();
		}
		this.view.appendTo('body');
		this.set('is_open', 1);
		
		return this;
	},
	hide: function(){
		// Make sure our view was actually appended before attempting to remove it.
		if (this.get('is_open'))
			this.view.remove();
		
		this.set('is_open', 0);
		return this;
	}
});

// Model
TronnetApp.modals.alert.set('controller', 
	Ember.Object.create({
		title: "There was an error",
		message: "It looks like there was an error somewhere along the way. Sorry buddy..."
	})
);

// View
TronnetApp.modals.alert.set('view', 
	Ember.View.create({
		templateName: 'tronnet-modal-alert',
		classNames: ['tn-modal-alert'],
		titleBinding: 'TronnetApp.modals.alert.controller.title',
		messageBinding: 'TronnetApp.modals.alert.controller.message',
		customViewBinding: 'TronnetApp.modals.alert.controller.customView',
		
		insideClick: function(e){
			e.stopPropagation();
			return true;
		},
		didInsertElement: function(){
			this.$().fadeIn();
		},
	})
);