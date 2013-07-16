from tornado import websocket, web, ioloop
import tornado
import json
import datetime


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
 
class EchoWebSocket(websocket.WebSocketHandler):
        username = None
        usercolor = 0
        users = []
    
        def open(self):
            
            self.username = self.get_argument("username", "generic")
            self.channelname = self.get_argument("chatroomname", "generic")        
            
            self.usercolor = EchoWebSocket.usercolor + 1
            EchoWebSocket.usercolor += 1
                        
            if (len(self.username) < 3 or len(self.username) > 16 or len(self.username) == 0):
                self.username = "John Doe"          
                               
            if (len(self.channelname) < 3 or len(self.channelname) > 12 or len(self.username) == 0):
                self.channelname = "idontevencare"             
                        
            while(True):
                if self.username in EchoWebSocket.users:
                    self.username += "_"
                    
                else:
                    break

            print('{0} joined the channel {1} at {2}'.format(self.username, self.channelname, datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")))
            
            EchoWebSocket.connections.append(self)
            EchoWebSocket.users.append(self.username)
            for conn in EchoWebSocket.connections:
                if conn != self:
                    conn.write_message(json.dumps(dict(event='joined', user=self.username)))
                if conn == self:
                    for x in EchoWebSocket.users:
                        conn.write_message(json.dumps(dict(event='joined', user=x)))

        def on_message(self, message):
            for conn in EchoWebSocket.connections:
                conn.write_message(json.dumps(dict(event='message', user=self.username, usercolor=self.usercolor, message=message, time=datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y"))))


        def on_close(self):
            EchoWebSocket.connections.conn.write_message(json.dumps(dict(event='left', user=self.username)))

            for conn in EchoWebSocket.connections:
                if conn != self:
                    conn.write_message(json.dumps(dict(event='left', user=self.username)))

            
            
            EchoWebSocket.connections.remove(self)
            EchoWebSocket.users.remove(self.username)
            EchoWebSocket.usercolor = self.usercolor-1

EchoWebSocket.usercolor = 0
EchoWebSocket.connections = []

app = tornado.web.Application([

    (r'/', IndexHandler),
    (r'/ws', EchoWebSocket),
    (r'/js/(.*)', tornado.web.StaticFileHandler, {'path': 'js'}),
    (r'/(App.css)', tornado.web.StaticFileHandler, {'path': '.'}),
    (r'/(favicon.ico)', tornado.web.StaticFileHandler, {'path': '.'})
], debug=True)




if __name__ == '__main__':
    app.listen(8080)
    tornado.ioloop.IOLoop.instance().start()
    
    
