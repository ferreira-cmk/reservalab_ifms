from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from config import Config
from models import db, bcrypt  
from routes.users import users_bp
from routes.labs import labs_bp
from routes.bookings import bookings_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)

CORS(app, supports_credentials=True, origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://172.16.0.2:3000"
], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

app.register_blueprint(users_bp, url_prefix='/users')
app.register_blueprint(labs_bp, url_prefix='/labs')
app.register_blueprint(bookings_bp, url_prefix='/bookings')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
