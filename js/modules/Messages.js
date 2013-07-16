define(['jquery'], function($) {
			return {
				contentEl: undefined,
				options: undefined,
				
				start : function(options) {
					this.options = options;
					
					this.createUI();
					this.registerCallbacks();
					
					this.contentEl.find(".close").click(function () {
		    			console.log("bluber");
		    		});
					
				},

				stop : function() {

				},

				createUI: function() {
					this.contentEl = $('<ul id="messages"></ul>');
					
					this.options.containerEl.append(this.contentEl);					
					
				},
				
				registerCallbacks: function() {
					var $this = this;
										
					this.options.socket.addListener('onmessage', function(data) {
						var obj = JSON.parse(data);
						$this.appendMessage(obj.user, obj.usercolor, obj.message, false);
					});
				
					this.options.socket.addListener('onopen', function(data) {
						var obj = JSON.parse(data);
						$this.appendMessage("", "open", true);
					});
					
					this.options.socket.addListener('onclose', function(data) {
						var obj = JSON.parse(data);
						$this.appendMessage("", "closed", true);
					});
					
				},
				
				appendMessage: function(user, usercolor, message, isSystemMessage) {
					var alertName, systemMessage;
					
					var messageType = isSystemMessage ? 'systemmessage' : 'usermessage';
					
					if (isSystemMessage){
						
						switch (message){
						
						case 'open':
							alertName = 'alert-success';
							systemMessage = 'joined the chat.';
							break;
						
						case 'closed':
							alertName = 'alert-error';
							systemMessage = 'The server is not reachable. Try to rejoin later.'
							break;
						
						default:
							alertName = 'alert-info'
							systemMessage = 'Something unexpected happened. Try to rejoin.'
						}
						
						$(['<li class="message">',
		    		   		'<p class="', messageType ,'">',
		    		   			'<button class="close removemessage">',
		    		   				'&times;',
		    					'</button>',
		    		   			'<div class="messagetext">',
		    						message,
								'</div>',
		    		   '</li>'].join('')).hide().appendTo(messages).fadeIn(300);
						
					}
					
					if (!isSystemMessage){
					
					$(['<li class="message well">',
	    		   		'<p class="', messageType ,' usercolorn', usercolor ,' ">',
	    		   			'<button class="close removemessage">',
	    		   				'&times;',
	    					'</button>',
	    					user,
	    		   			'<div class="messagetext">',
	    						message,
							'</div>',
	    		   '</li>'].join('')).hide().appendTo(messages).fadeIn(300);
				   $("html, body").animate({ scrollTop: $(document).height() }, 1000);

					}
				}
			}
		})