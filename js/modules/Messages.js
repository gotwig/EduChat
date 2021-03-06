define(['jquery'], function($) {
			var template = ['<ul class="module-messages span6">',
			                '	<div id="messagesarea">',
					           '</div>',
					           '<input id="entry" type="text" maxlength="180" placeholder="Your new message comes here =)">',
					           '<button id="entrybutton" class="btn">Send</button>',
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
	        			        		
	        		$('#entrybutton').click(function () {
	        			if($('#entry').val().length > 0){
	    			
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
							$this.appendMessage(obj.user, obj.message, false, false);
							break;
						
						case "memessage":
							$this.appendMessage(obj.user, obj.message, false, true);
							break;
							
						case "joined":
							$this.appendMessage(obj.user, obj.user + "    joined the chat.", true, false);
							break;
						
						case "left":
							$this.appendMessage(obj.user, obj.user + "    left the chat.", true, false);
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
				
				appendMessage: function(user, message, isSystemMessage, isMeMessage) {
					var messageType = isSystemMessage ? 'systemmessage' : 'usermessage';
					
					if (isSystemMessage){
						
						
						$(['<li>',
	    		   			'<h6>',
	    		   				message,
	    		   			'</h6>',	
		    		   '</li>'].join('')).hide().appendTo(messagesarea).fadeIn(500);
					}
						
					if (isMeMessage){
						$(['<li>',
	    		   			'<h5>',
	    		   				message,
	    		   			'</h5>',	
		    		   '</li>'].join('')).hide().appendTo(messagesarea).fadeIn(300);
					}
					
					if (!isSystemMessage && !isMeMessage){
					
					message = message.replace(/(http?:\/\/?\S+)/g, "<a href='$1' target='_blank'>$1</a>");
													
					$(['<li>',
	    		   		'<h4>',
	    					user,
	    				'</h4>',	
	    		   		'<p>',
	    					message,
						'</p>',
	    		   '</li>'].join('')).hide().appendTo(messagesarea).fadeIn(300);
				   $("html, body").animate({ scrollTop: $(document).height() }, 1000);

					}
				}
			}
		})