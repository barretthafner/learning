import socket
 
 
address = 'localhost'
port = 9000


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((address, port))

s.send("Hello from python!")

s.close()