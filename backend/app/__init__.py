# File name: __init__.py
# Author: @nouryehia
# Description: Creates API endpoints by importing the routes and registering
# the blueprints.

# Flask import
from .setup import app

# Import routes
from .src.apis.user import user_api
from .src.apis.todo import todo_api

# Register blueprints
app.register_blueprint(user_api, url_prefix='/api/user')
app.register_blueprint(todo_api, url_prefix='/api/todo')
