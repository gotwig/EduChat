from tornado import websocket, web, ioloop
import tornado
import json
import datetime


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
 
class EchoWebSocket(websocket.WebSocketHandler):
        username = None
        usernamenumber = 0
    
        def open(self):
            
            self.username = self.get_argument("username", "generic")
            self.channelname = self.get_argument("chatroomname", "generic")
            
            self.usernamenumber = EchoWebSocket.usernamenumber + 1
            EchoWebSocket.usernamenumber += 1
            
            print('{0} joined the channel {1} at {2}'.format(self.username, self.channelname, datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")))
            
            EchoWebSocket.connections.append(self)
            for conn in EchoWebSocket.connections:
                if conn != self:
                    conn.write_message(json.dumps(dict(event='joined', user=self.username)))

        def on_message(self, message):
            for conn in EchoWebSocket.connections:
                conn.write_message(json.dumps(dict(event='message', user=self.username, usernamenumber=self.usernamenumber, message=message, time=datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y"))))

        def on_close(self):
            for conn in EchoWebSocket.connections:
                if conn != self:
                    conn.write_message(json.dumps(dict(event='left', user=self.username)))
            
            EchoWebSocket.connections.remove(self)
            EchoWebSocket.usernamenumber = self.usernamenumber-1

EchoWebSocket.usernamenumber = 0
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
    
    
