define(function() {
			return {

				messages : undefined,

				start : function() {

				},

				

				stop : function() {

				},

				writeToScreen: function(username, op, usernamenumber, message, time) {
			    	
					if(op){
			    		$('<li class="message"> <p class="username usernamen'+usernamenumber+'">' + removebutton + ' <span class="usernameposition">' + username + '</span> <span class="entrydate"> <date>'+time+'</date></span> </p><span class="messagetext">'+message+'</span></li>').hide().appendTo(messagearea).fadeIn(300);
					}
					
			    	if  (username=="system" ){
			        	messagearea.append('<li style="color:gray;color: gray;font-size: 80%;margin-left: 2%;">'+message+' at '+ time + '</li>');
			    	}
			    	
			    	else {
			    		$('<li class="message"> <p class="username usernamen'+usernamenumber+'">' + removebutton + ' <span class="usernameposition">' + username + '</span> <span class="entrydate"> <date>'+time+'</date></span> </p><span class="messagetext">'+message+'</span></li>').hide().appendTo(messagearea).fadeIn(400);
			    	}
			    	
			    },
				
			    removeEntry: function(){
					$(this).parent().parent().remove();	
			    },
			    	
			    	
				addListener : function(event, callback) {
					switch (event) {
					case 'system':
						writeToScreen("system", false, 0, "This is an important system message. Please take notice.", "12:30");
						break;

					case 'user':
						writeToScreen(obj.username, false, obj.usernamenumber, message, "12:30");
						break;

					case 'operator':
						writeToScreen(obj.username, true, obj.usernamenumber, message, "12:30");
						break;

					default:
						break;
					}
				}
			};
		})