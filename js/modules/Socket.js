define(function() {
			return {

				onMessageListeners : [],
				onOpenListeners : [],
				onCloseListeners : [],
				socket : undefined,

				start : function() {

				},

				connect : function(domain, port, username, chatroomname) {
					var $this = this;

					this.socket = new WebSocket([ 'ws://', domain, ':', port,
							'/ws?username=', username, '&chatroomname=',
							chatroomname ].join(''));
					
					this.socket.onmessage = function(dataevent) {
						for ( var i = 0, len = $this.onMessageListeners.length; i < len; i++) {
							$this.onMessageListeners[i](dataevent.data);
						}

					};
					this.socket.onopen = function(data) {
						for ( var i = 0, len = $this.onOpenListeners.length; i < len; i++) {
							$this.onOpenListeners[i](data);
						}
					};

					this.socket.onclose = function() {
						for ( var i = 0, len = $this.onCloseListeners.length; i < len; i++) {
							$this.onCloseListeners[i](data);
						}
					};

				},

				
				stop : function() {

				},

				send : function(message) {
					if (this.socket instanceof WebSocket) {
						this.socket.send(message);
					}

					else {
						throw new Error("Can't send message,  Socket is not an WebSocket object.");
					}

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