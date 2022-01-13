# Import Flask dependencies

# CORS supports cross origin resource sharing, allowing the Backend and
# Frontend to be on separate servers
from flask_cors import CORS

# Blueprint allows the API to be visible on the server
# Request allows us to access the body of the request (arguments passed in)
# Jsonify allows us to convert simple objects (lists, dictionaries) into JSON
from flask import Blueprint, request, jsonify

# Import User model
from ..models.user import User

# Create the blueprint
user_api = Blueprint('user_api', __name__)
CORS(user_api, supports_credentials=True)


# Route used to add a user
@user_api.route('/add', methods=['POST'])
def add():
    # Get name from body
    name = request.json['name']

    # Call model method
    user = User.add(name=name)

    # Generate JSON response
    return jsonify({'reason': 'user added',
                    'result': user.to_json()}), 200


# Route used to retrieve users
@user_api.route('/get', methods=['GET'])
def get():
    # Call model method
    users = User.get()

    # Convert all users to JSON objects
    users = [user.to_json() for user in users]

    # Generate JSON response
    return jsonify({'reason': 'users retrieved',
                    'result': users}), 200
