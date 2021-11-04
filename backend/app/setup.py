# File name: __init__.py
# Author: Queues Team
# Description: Configures the FlaskAPI instance that allows us to create our
# routes.

from flask_api import FlaskAPI
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask.cli import FlaskGroup
from flask_cors import CORS

app = FlaskAPI(__name__)
CORS(app)
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)
db.init_app(app)
cli = FlaskGroup(app)
login_manager = LoginManager()
login_manager.init_app(app)
