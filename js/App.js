requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery-2.0.3'
    }
});

requirejs(['jquery', 'libs/scaleApp', 'modules/Socket', 'js/modules/Messages.js', 'js/modules/Login.js'], function   ($, scaleApp, SocketModule, MessageModule, LoginModule) {
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
    			
        		$("#entry").focus(function (event) {
        			$(this).addClass("active");
        		}).blur(function (event) {
        			$(this).removeClass("active");
        		});
    	
    	
        		$('#entry').bind('keypress', function(e) {
        			if(e.keyCode==13 && $('#entry').val().length > 0){
    			
        				SocketModule.send($('#entry').val());
        				$('#entry').val("");
        			}
        		});
    			
    		})
    			
    			
    		SocketModule.addListener("onopen", function(){
					MessageModule.start({
						containerEl: $("#messages"),
						socket: SocketModule
						
					});
			});
    			
    		
    		
	

    });
});

