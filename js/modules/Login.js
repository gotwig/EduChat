define(['jquery'], function($) {
		var template = ['<div class="module-login">',
		    				'<h1 class="removethestuff">Join the Chat.</h1>',
		    				'<p class="removethestuff">Enter your channel info.</p>',

		    			'<fieldset class="removethestuff">',
		    				'<legend>ENTER NOW</legend>',
		    				'<label>Your awesome Nickname</label>',
		    					'<input maxlength="16" id="username" type="text" placeholder="John Doe">',
		    				'<label>Choose a legendary channelname</label>',
		    					'<input maxlength="10" id="channelname" type="text" placeholder="idontevencare">', 
		    				'<br />',
		    				'<button id="enter" type="submit" class="btn">Enter a world of joy</button>',
		    			'</fieldset>',
		    			'<div id="messages">',
		    			'</div>',
		    			'<input id="entry" type="text" class="hidden" size="200" "Your new message comes here =)">',
		    			'</div>',
		    			
		    			].join('');
			return {
				contentEl: undefined,
				onLoginListeners : [],
				options: undefined,
				username: undefined,
				channelname: undefined,

				start : function(options) {
					this.options = options;		
					
					this.createUI();
				},
				
				createUI : function() {
					
					$this = this;
					
					this.contentEl = $(template);
					this.options.containerEl.append(this.contentEl);
					
	    			this.contentEl.find("#entry").focus();
	    			this.contentEl.find("#enter").click(function () {
		    			$this.contentEl.find(".removethestuff").addClass("hidden");
						$this.contentEl.find("#entry").removeClass('hidden');


						if ($this.contentEl.find('#username').length < 3 | $this.contentEl.find('#username') > 16){
							$this.username = "John Doe";
						}
						
						if($this.contentEl.find('#channelname').length < 4 | $this.contentEl.find('#channelname') > 12){
							$this.channelname = "idontevencare";
						}
						
						for ( var i = 0, len = $this.onLoginListeners.length; i < len; i++) {
							$this.onLoginListeners[i]($this.username, $this.channelname);
						}
		    		});
					
				},
				
				stop : function() {
					this.contentEl.remove();
					this.onLoginListeners = [];
					
				},

	    		


				addListener : function(event, callback) {
					switch (event) {
					case 'login':
						this.onLoginListeners.push(callback);
						break;
						
					default:
						break;
					}
				}
			};
		})