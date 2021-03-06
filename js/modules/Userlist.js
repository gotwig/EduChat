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
					this.contentEl = $('<ul class="module-userlist well span2"></ul>');
					
					this.options.containerEl.prepend(this.contentEl);
					
				},
				
				addUser: function(user, colornumber){
					this.options.containerEl.find(".module-userlist").append("<li><span class='usercolorn" + colornumber + "'>" + user + "</span> // </li>");
					
				},
				
				removeUser: function(user){
					this.options.containerEl.find(".module-userlist").children().filter(function() {
					    return $.trim($(this).find('span').text()) === user;
					}).remove();
				},

				registerCallbacks: function() {
					$this = this;
					
					this.options.socket.addListener('onmessage', function(data) {
						
						var obj = JSON.parse(data);

						if (obj.event=="joined"){
							$this.addUser(obj.user, obj.usercolor);
						}
						
						if (obj.event=="left"){
							$this.removeUser(obj.user);
						}
						
					});
					
				},
				
				
			};
		})