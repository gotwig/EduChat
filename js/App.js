requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery-2.0.3'
    }
});

requirejs(['jquery', 'libs/scaleApp', 'modules/Socket', 'js/modules/Messages.js', 'js/modules/Login.js', 'js/modules/Userlist.js'],
		 function   ($, scaleApp, SocketModule, MessageModule, LoginModule, UserlistModule) {
    
	$(document).ready(function() {
    
    	var core = new scaleApp.Core();
    	
    	var messagearea = $('#messages'),
    		websocket,
    		username = "John Doe";
    		channelname = "idontevencare";
    	
    
    		LoginModule.start({
				containerEl: $("#containerEl")
			});
    
    		LoginModule.addListener("login", function(userName, channelName){
    			SocketModule.connect("10.11.12.139", "8080", userName, channelName);
        		    			
    		})
    			
    			
    		SocketModule.addListener("onopen", function(){
					MessageModule.start({
						containerEl: $("#containerEl"),
						socket: SocketModule
						
					});
					
					UserlistModule.start({
	    				containerEl: $("#containerEl"),
	    				socket: SocketModule
	    			});
			});
    			
    		
    		
	

    });
});

