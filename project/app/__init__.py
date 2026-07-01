from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os 

db = SQLAlchemy()

def create_app():

    app = Flask(__name__)
    CORS(app)
    app.config.from_object("app.config.Config")
    db.init_app(app)

    from .routes import main

    app.register_blueprint(main)

    return app