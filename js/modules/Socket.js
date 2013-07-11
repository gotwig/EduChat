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
					this.socket.onmessage = function(data) {
						for ( var i = 0, len = $this.onMessageListeners.length; i < len; i++) {
							$this.onMessageListeners[i](data);
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
					var $this = this;

					if (typeof this.socket === 'object') {
						this.socket.send(message);
					}

					else {
						console.log("Can't send message: " + message);
					}

				},

				addListener : function(event, callback) {
					switch (event) {
					case 'message':
						this.onMessageListeners.push(callback);
						break;

					case 'open':
						this.onOpenListeners.push(callback);
						break;

					case 'close':
						this.onCloseListeners.push(callback);
						break;

					default:
						break;
					}
				}
			};
		})