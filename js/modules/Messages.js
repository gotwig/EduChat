define(['jquery'], function($) {
			var template = ['<hr><ul class="module-messages span8">',
			                '	<div id="messagesarea">',
					           '</div>',
					           '<input id="entry" type="text" maxlength="180" placeholder="Your new message comes here =)">',
					           '<div id="whitespace">',
				    		   '</div>',
					        '</ul>'].join('');
	
	
			return {
				contentEl: undefined,
				options: undefined,
				
				start : function(options) {
					this.options = options;
					
					this.createUI();
					this.registerCallbacks();
					
					
				},

				stop : function() {

				},

				createUI: function() {
					$this = this;
					
					this.contentEl = template;
					
					this.options.containerEl.append(this.contentEl);					
					
	        		$("#entry").focus(function (event) {
	        			$(this).addClass("active");
	        		}).blur(function (event) {
	        			$(this).removeClass("active");
	        		});
	    	
	    	
	        		$('#entry').bind('keypress', function(e) {
	        			if(e.keyCode==13 && $('#entry').val().length > 0){
	    			
	        				$this.options.socket.send($('#entry').val());
	        				$('#entry').val("");
	        			}
	        		});
				},
				
				registerCallbacks: function() {
					var $this = this;
										
					this.options.socket.addListener('onmessage', function(data) {
						var obj = JSON.parse(data);
						switch (obj.event){
						
						case "message":
						$this.appendMessage(obj.user, obj.usercolor, obj.message, false);
						break;
						
						case "joined":
							$this.appendMessage(obj.user, 0, obj.user + "    joined the chat.", true);
							break;
						
						case "left":
							$this.appendMessage(obj.user, 0, obj.user + "    left the chat.", true);
							break;

						}
					});
				
					this.options.socket.addListener('onopen', function(data) {
						var obj = JSON.parse(data);
						$this.appendMessage("", 0, "open", true);
						$this.contentEl.find("#entry").attr("placeholder","blub");
					});
					
					this.options.socket.addListener('onclose', function(data) {
						var obj = JSON.parse(data);
						$this.appendMessage("", 0, "closed", true);
					});
					
				},
				
				appendMessage: function(user, usercolor, message, isSystemMessage) {
					var alertName, systemMessage;
					
					var messageType = isSystemMessage ? 'systemmessage' : 'usermessage';
					
					if (isSystemMessage){
						
						switch (message){
						
						case 'joined':
							alertName = 'alert-sucess';
							systemMessage = user + " joined the chat.";
							break;
						
						case 'open':
							alertName = 'alert-success';
							systemMessage = 'you sucessfuly joined the chat.';
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
		    		   			'<div class="messagetext">',
		    						message,
								'</div>',
		    		   '</li>'].join('')).hide().appendTo(messagesarea).fadeIn(300);
						
					}
					
					if (!isSystemMessage){
					
					$(['<li class="message well">',
	    		   		'<p class="', messageType ,' usercolorn', usercolor ,' ">',
	    					user,
	    		   			'<div class="messagetext">',
	    						message,
							'</div>',
	    		   '</li>'].join('')).hide().appendTo(messagesarea).fadeIn(300);
				   $("html, body").animate({ scrollTop: $(document).height() }, 1000);

					}
				}
			}
		})