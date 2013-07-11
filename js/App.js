requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery-2.0.3'
    }
});

requirejs(['jquery', 'libs/scaleApp', 'modules/Socket', 'js/modules/Messages.js'], function   ($, scaleApp, SocketModule, MessageModule) {
    $(document).ready(function() {
    
    var core = new scaleApp.Core();
    	
    var messagearea = $('#messages'),
    	websocket,
    	entry = $("#entry"),
    	username = "John Doe";
    	channelname = "idontevencare";
    	removebutton = '<a class="removemessage"><img class="removemessage_icon" title="Remove this chat entry" alt="Remove chat entry" src="http://cdn3.iconfinder.com/data/icons/interface/100/close_button-512.png"></img></a>';
    	
    
    
	$("#enter").click(function () {
			if ($("#username").val().length > 0 && $("#username").val().length < 16){
				username = $("#username").val();
			}
			
			if ($("#channelname").val().length > 0 && $("#channelname").val().length < 12){
				channelname = $("#channelname").val();
			}
			
			SocketModule.connect("10.11.12.139", "8080", username, channelname)
			
		entry.removeClass('hidden');
		$(".removethestuff").addClass("hidden")
		entry.focus();
	});
	
	entry.focus(function (event) {
		$(this).addClass("active");
	});
	entry.blur(function (event) {
		$(this).removeClass("active");
	});
	
	
	$('#entry').bind('keypress', function(e) {
		if(e.keyCode==13 && entry.val().length > 0 && entry.val().length < 18){
			
			SocketModule.send(entry.val());
			entry.val("");
		}
	});
    
	
	$(document).on("click", ".removemessage", function() {
		MessageModule.remove();
	 });
	
    
    });
});

