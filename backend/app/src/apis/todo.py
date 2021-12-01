# Import Flask dependencies

# CORS supports cross origin resource sharing, allowing the Backend and
# Frontend to be on separate servers
from flask_cors import CORS

# Blueprint allows the API to be visible on the server
# Request allows us to access the body of the request (arguments passed in)
# Jsonify allows us to convert simple objects (lists, dictionaries) into JSON
from flask import Blueprint, request, jsonify

# Import ToDo and User model
from ..models.todo import ToDo
from ..models.user import User
from ..models.todo import JoinRequest

# Create the blueprint
todo_api = Blueprint('todo_api', __name__)
CORS(todo_api, supports_credentials=True)


# Route used to add a a given user
@todo_api.route('/add', methods=['POST'])
def add():
    # Get ID of user todo is for and description of to do from body
    category = request.json['category']
    title = request.json['title']
    user_id = int(request.json['user_id'])
    description = request.json['description']
    contact = request.json['contact']
    groupSize = request.json['groupSize']
    peopleWanted = request.json['peopleWanted']


    # Call ToDo model method to add todo
    todo = ToDo.add(user_id=user_id, description=description, title=title, category=category, contact=contact, groupSize=groupSize, peopleWanted=peopleWanted)

    # Call User model method to get name of user whose ID is passed in
    name = User.get_by_id(id=user_id).name

    # Generate JSON response
    return jsonify({'Status': 'Successfully posted for %s' % name,
                    'Post': todo.to_json()}), 200


# Routeused to retrieve todo's for a given user
@todo_api.route('/get', methods=['GET', 'POST'])
def get():
    # Retrieve ID of user from parameters
    user_id = request.args.get('user_id', type=int)

    # Call ToDO model method to retrieve To Do
    todos = ToDo.get(user_id=user_id)

    # Convert todo's to JSON objects
    todos = [todo.to_json() for todo in todos]

    # Call User model method to get name of user whose ID is passed in
    name = User.get_by_id(id=user_id).to_json()['name']

    # Generate JSON response
    return jsonify({'reason': 'todo\'s retrieved for %s' % name,
                    'result': todos}), 200

@todo_api.route('/get/all', methods=['GET', 'POST'])
def getAll():
    todos = ToDo.getAll()
    todos = [todo.to_json() for todo in todos]

    # Generate JSON response
    return jsonify({'result': todos}), 200

@todo_api.route('/get/category', methods=['GET', 'POST'])
def getCategory():
    category = request.args.get('category', type=str)
    todos = ToDo.getCategory(category=category)
    todos = [todo.to_json() for todo in todos]

    # Generate JSON response
    return jsonify({'result': todos}), 200

@todo_api.route('/join/request', methods=['GET','POST'])
def join():
    # Get ID of user todo is for and description of to do from body
    postId = int(request.json['postId'])
    name = request.json['name']
    description = request.json['description']
    contact = request.json['contact']

    # Call ToDo model method to add todo
    todo = JoinRequest.requestToJoin(postId=postId, name=name, description=description, contact=contact)
    # Generate JSON response
    return jsonify({'Status': 'Successfully requested for %s' % postId,
                    'Join Request': todo.to_json()}), 200

@todo_api.route('/post/requests', methods=['GET'])
def getJoinRequestsById():
    postId = request.args.get('postId', type=int)
    requests = JoinRequest.getJoinRequests(postId=postId)
    requests = [request.to_json() for request in requests]
    # Generate JSON response
    return jsonify({'result': requests}), 200

@todo_api.route('/post/accept', methods=['GET', 'POST'])
def acceptJoinRequest():
    requestId = request.args.get('id', type=int)
    requests = JoinRequest.acceptJoinRequest(id=requestId)
    return ({'accepted join request id:' : requestId})