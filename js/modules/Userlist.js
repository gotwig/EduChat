define(function() {
		var template = ['<div id="userlist">',
		                
		                '</div>'].join('');
	
			return {

				onMessageListeners : [],
				onOpenListeners : [],
				onCloseListeners : [],
				socket : undefined,

				start : function() {

				},
				
				stop : function() {

				},

				addListener : function(event, callback) {
					switch (event) {
					case 'onmessage':
						this.onMessageListeners.push(callback);
						break;

					case 'onopen':
						this.onOpenListeners.push(callback);
						break;

					case 'onclose':
						this.onCloseListeners.push(callback);
						break;
						
					default:
						break;
					}
				}
			};
		})