TronnetApp.RouteExtensions.add("contact", {
		// User must complete atleast 3 human like actions before submitting this form
		likely_human: -6,

		moved_mouse: false,
		keystrokes_in_form: false,
		scrolled_the_page: false,
		valid_email: false,
		looks_like_a_real_message: false,
		clicked_submit_button: false,
		has_name: false,
		has_subject: false,
		true_strings: function(){
			return !!(this.get('has_subject') && this.get('looks_like_a_real_message') && this.get('has_name'));
		}.property('has_subject','looks_like_a_real_message', 'has_name').volatile(),
		
		message_sent: false,
		message_sending: false,
		
		name: "",
		email: "",
		subject: "",
		message: "",
		
		validate_humanity: function(action, invalidate){
			if (!invalidate && !this.get(action)){
				this.toggleProperty(action);
				this.incrementProperty('likely_human');
			} else if (invalidate && this.get(action) ){
				this.toggleProperty(action);
				this.decrementProperty('likely_human');
			}
		},
		
		nameInput: Ember.TextField.extend({
			valueBinding: "TronnetApp.router.contactController.name",
			keyUp: function( e ){
				var controller = TronnetApp.router.contactController;
				controller.validate_humanity('keystrokes_in_form');
			},
			focusOut: function( e ){
				var controller = TronnetApp.router.contactController;
				var name = this.get('value');
				
				if (name && (name.match(/^\w{3}$/) || name.match(/^\w+\W*\w{2,}$/))){
					controller.validate_humanity('has_name');
				} else {
					controller.validate_humanity('has_name', true);
				}
			}
		}),
		
		emailInput: Ember.TextField.extend({
			valueBinding: "TronnetApp.router.contactController.email",
			keyUp: function( e ){
				var controller = TronnetApp.router.contactController;
				var email = this.get('value');
				
				controller.validate_humanity('keystrokes_in_form');
				
				// Really week email validator...
				if (email && email.match(/^[^@\W]{2,}@[^\.\W]{2,}\.(\w{2,3}|\w{2,3}\.\w{2,3})$/)){
					controller.validate_humanity('valid_email');
				} else {
					controller.validate_humanity('valid_email', true);
				}
			}
		}),
		
		subjectInput: Ember.TextField.extend({
			valueBinding: "TronnetApp.router.contactController.subject",
			keyUp: function( e ){
				var controller = TronnetApp.router.contactController;
				controller.validate_humanity('keystrokes_in_form');
			},
			focusOut: function( e ){
				var controller = TronnetApp.router.contactController;
				var subject = this.get('value');
				
				if (subject != ""){
					controller.validate_humanity('has_subject');
				} else {
					controller.validate_humanity('has_subject', true);
				}
			}
		}),
		
		messageInput: Ember.TextArea.extend({
			valueBinding: "TronnetApp.router.contactController.message",
			keyUp: function( e ){
				var controller = TronnetApp.router.contactController;
				var message = this.get('value');
				
				if (!controller.get('keystrokes_in_form')){
					controller.validate_humanity('keystrokes_in_form');
				}
				
				if (message && !controller.get('looks_like_a_real_message')){
					var words = (message.match(/\b/gi).length / 2) + 2;
					var characters = message.length;
					
					// Arbitrary limits, but they seem feesible
					if (characters > 20 && words > 6){
						controller.validate_humanity('looks_like_a_real_message');
					} else {
						controller.validate_humanity('looks_like_a_real_message', true);
					}
				}
			}
		}),
	}, {
	
		allowed_to_contact: function(){
			var controller =  TronnetApp.router.contactController;
			
			if (controller.get('valid_email') && controller.get('true_strings')){
				if (controller.get('likely_human')){
					return true;
				} else {
					TronnetApp.modals.alert.show('Nice try!', null, {
						customView: Ember.View.extend({
							templateName: 'tronnet-modal-alert-custom-captcha',
							question: function(){
								return "what is seven plus two";
							}.property().volatile(),
							wtf: "uuuuh"
						})
					});
				}
			} else {
				var jeer = 'bro';
				var reason = null;
				if (!controller.get('true_strings') && !controller.get('looks_like_a_real_message')){
					jeer = "this barely makes any sense at all";
					reason = "Coherence";
				} if (!controller.get('has_name')){
					jeer = "at least give me your name";
					reason = "Name";
				} else if (!controller.get('has_subject')){
					jeer = "what&apos;s this all about anyways, come on";
					reason = "Subject";
				} else if (!controller.get('valid_email')){
					jeer = "I mean, how do you expect me to get ahold of ya, come on..";
					reason = "Email";
				}
				
				TronnetApp.modals.alert.show('Finish the job' + ((reason) ? " - "+reason: ""), 'Looks like you&apos;re missing a few of the required fields, '+jeer+'.', {
					customView: Ember.View.extend({templateName: 'tronnet-modal-alert-custom-captcha'})
				});
			}
			
			return false;
		}.property().volatile(),
	
		contactMe: function( router, e ){
			var controller =  TronnetApp.router.contactController;
			
			controller.validate_humanity('clicked_submit_button');
			controller.set('message_sending', true);
			
			if (this.get('allowed_to_contact')){
				var spinner = new Spinner({}).spin( 
					e.view.$('.tn-contact-form-fields')[0]
				);
				
				$.post("api/", {
						method: "contact", 
						email: controller.get('email'),
						name: controller.get('name'), 
						subject: controller.get('subject'), 
						message: controller.get('message')
					}
				).success(function(data){
					spinner.stop();
					$.post("api/",{
						method: "sign_guestbook", 
					});
					spinner.stop();
					controller.set('message_sent', true);
					console.log("Message was sent succesfully!");
				}).error(function(data){
					spinner.stop();
					controller.set('message_sending', false);
				});
			} else {
				controller.set('message_sending', false);
			}

		},
		
		infoOnABD: function( router, e  ){
			TronnetApp.modals.alert.show('Quack, quack, quack', 'Walks like a bot...talks like a bot...must be a bot! '+
				'This will check on a few basic things from movement of your mouse to coherence of your inputs to prove '+
				'that you are truely of the human race. All hail the humans.');
		}
	}, {
		bindMouseProperties: function( callback ){
			TronnetApp.tmp.validateMouseMovement = function(){
				callback();
			}
			$(window).bind('mousemove', TronnetApp.tmp.validateMouseMovement);
		},
		unbindMouseProperties: function(){
			$(window).unbind('mousemove', TronnetApp.tmp.validateMouseMovement);
			delete TronnetApp.tmp.validateMouseMovement;
			return true;
		},
		
		bindScrollProperties: function( callback ){
			TronnetApp.tmp.validateScrollMovement = function(){
				callback();
			}
			$(window).bind('scroll', TronnetApp.tmp.validateScrollMovement);
		},
		unbindScrollProperties: function(){
			$(window).unbind('scroll', TronnetApp.tmp.validateScrollMovement);
			delete TronnetApp.tmp.validateScrollMovement;
			return true;
		},
		
		didInsertElement: function(){
			var _this = this;
			this.bindMouseProperties(function(){
				var controller =  TronnetApp.router.contactController;
				controller.validate_humanity('moved_mouse');
				_this.unbindMouseProperties();
			});
			this.bindScrollProperties(function(){
				var controller =  TronnetApp.router.contactController;
				controller.validate_humanity('scrolled_the_page');
				_this.unbindScrollProperties();
			});
		},
		
		destroyElement: function(){
			this.unbindMouseProperties();
			this.unbindScrollProperties();
			this._super();
		}
	}
);
