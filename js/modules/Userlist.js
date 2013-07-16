define(function() {
			return {
				socket : undefined,

				start : function(options) {
					this.options = options;
					
					this.createUI();
					this.registerCallbacks();
					
				},
				
				stop : function() {

				},
				
				createUI: function(){
					this.contentEl = $('<ul class="module-userlist span4"></ul>');
					
					this.options.containerEl.prepend(this.contentEl);
					
				},
				
				addUser: function(user){
					this.options.containerEl.find(".module-userlist").append("<span>" + user + " // </span>")
					
				},

				registerCallbacks: function() {
					$this = this;
					
					this.options.socket.addListener('onmessage', function(data) {
						
						var obj = JSON.parse(data);

						if (obj.event=="joined"){
							$this.addUser(obj.user);
						}
						
						if (obj.event=="left"){
							$this.removeUser(obj.user);
						}
						
					});
					
				},
				
				
			};
		})