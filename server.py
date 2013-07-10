from tornado import websocket, web, ioloop
import tornado
import json

connections = []

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")
        
class EchoWebSocket(websocket.WebSocketHandler):
        
        username = None
    
        def open(self):
            self.username = self.get_argument("username", "generic")
            global connections
            connections.append(self)
            
            for conn in connections:
                if conn != self:
                    conn.write_message(json.dumps(dict(event='joined', user=self.username)))

        def on_message(self, message):
            global connections
            
            for conn in connections:
                conn.write_message(json.dumps(dict(event='message', user=self.username, message=message)))

        def on_close(self):
            global connections
            
            for conn in connections:
                if conn != self:
                    conn.write_message(json.dumps(dict(event='left', user=self.username)))
            
            connections.remove(self)
            

app = tornado.web.Application([
    (r'/', IndexHandler),
    (r'/ws', EchoWebSocket),
    (r'/js/(.*)', tornado.web.StaticFileHandler, {'path': 'js'}),
    (r'/(App.css)', tornado.web.StaticFileHandler, {'path': '.'})
], debug=True)




if __name__ == '__main__':
    app.listen(8080)
    tornado.ioloop.IOLoop.instance().start()
    
    
