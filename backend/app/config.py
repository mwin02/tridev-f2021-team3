# File name: config.py
# Author: Queues Team
# Description: Includes the configuration for the database.

import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY')
    CORS_HEADERS = os.getenv('CORS_HEADERS')
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", 'sqlite://')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
