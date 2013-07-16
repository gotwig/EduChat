define(function() {
			return {

				onMessageListeners : [],
				onOpenListeners : [],
				onCloseListeners : [],
				socket : undefined,

				start : function(options) {
					this.options = options;
					
					this.createUI();
					this.registerCallbacks();
				},
				
				stop : function() {

				},
				
				createUI: function(){
					this.contentEl = $('<ul id="module-userlist"></ul>');
					
					this.options.containerEl.append(this.contentEl);		
				},

				registerCallbacks: function() {
					$this = this;
					
					this.options.socket.addListener('onmessage', function(data) {
						console.log("someone joined the chat");
					});
					
				},
				
				
			};
		})