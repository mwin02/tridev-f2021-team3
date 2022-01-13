# Backend Walkthrough

This walkthrough will take you through building the bakend for our To Do app. The
app is pretty simple, so it should hopefully not take too long to complete. We
recommend going through all of it, but if there are some parts you are already
familiar with, then feel free to copy paste the relevant code from the `Backend`
folder.

## Setting up

These are the tools and software you may need to complete this walkthrough:

1. **VSCode**: This is the text editor that we will use for development.
   Technically, you can use any text editor you would like, but we found that it
   has been the most useful and that it helps when all of us use the same text
   editor. Download it [here](https://code.visualstudio.com/download).

2. **Docker**: This allows us to run our app in a container, providing two main
   advantages. Firstly, as you will see in this tutorial, we will be able to add
   any dependency we may need to the container, which means that we do not all
   need to have the same local set up in order to collaborate. Secondly, it makes
   it easy to host our backend and our database, which allows us to interact
   directly with our data when working on the Frontend. Download it [here](https://www.docker.com/products/docker-desktop).

2. **Postman**: This app allows us to simulate cURL requests in order to test the
   routes that we write. You could also technically do that from your terminal,
   but Postman makes it easier to send the requests and to debug them. Personally,
   it is one of my favorite programming tools. 10/10 recommend. Download it [here](https://www.postman.com/downloads/).

3. **Flake8**: This is a linter that enforces strict style guidlines, so make
   sure to keep it happy and our code will look beautiful. Disclaimer: It is
   extremely picky, and sometimes I wish that it never existed. You will
   undoubtebly hate it throughout the course of the development. However, it is
   pretty important in that it allows us to make sure that all of our code is
   clean and consistent. You can install it by running `pip3 install flake8` in
   your terminal.

4. **vscode-icons** (OPTIONAL): Brings icons to VSCode making your sidebar look
   nice and pretty. Download it [here](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons).

5. **Visual Studio IntelliCode** (OPTIONAL): Saves you time when coding by moving
   what you are most likely to use at the top of your auto-complete list.
   Download it [here](https://visualstudio.microsoft.com/services/intellicode/).

## Getting Started

Before you start this tutorial, make sure to go through the files already present
in `Backend - Empty`. Comments have been provided in most files to explain what
they do. If they do not fully make sense, don't worry! Everything you need to
know will be explained in this walkthrough and a lot of these files are template
files that will be already present in our working repo.

## The Database

The first step in creating our backend is to design our database. For this
project, we will be using a PostgreSQL database, as this is what will be used
throughout the development of Autograder. For our todo list, we only need a
simple database with only two tables: `User` and `ToDo`. You can see the database
schema below:

![DB Schema](../db_schema.png)

As you can see, our `User` table only has two fields: `id` (the id of the entry)
and `name` (the name of the user). Our `ToDo` table only has three fields: `id`
(the id of the entry), `user_id` (the id of the user who added that to do), and
`description` (the description of the to do). Note that there is a foreign key
between `user_id` in the `ToDo` table and `id` in the `User` table. 

Let's go ahead and code these tables:

1. Create a file called `todo.sql` in the `data` directory inside of 
   `Backend - Empty`.

2. Create the `User` table by adding the code below. Note that, in this project,
   the name of the user is denoted as `UNIQUE`, meaning that no two users can have
   the same name. The `NOT NULL` anotation indicates that a particular field
   cannot be empty.
    ``` sql
    CREATE TABLE "User" (
        "id" serial NOT NULL,
        "name" varchar(255) NOT NULL UNIQUE,
        CONSTRAINT "User_pk" PRIMARY KEY ("id")
    ) WITH (
        OIDS=FALSE
    );
    ```

3. Similarly, let us create the `ToDo` table by adding the following code:
    ``` sql
    CREATE TABLE "ToDo" (
        "id" serial NOT NULL,
        "user_id" bigserial NOT NULL,
        "description" varchar(255) NOT NULL,
        CONSTRAINT "ToDo_pk" PRIMARY KEY ("id")
    ) WITH (
      OIDS=FALSE
    );
    ```

4. Once both tables are added, we need to add our foreign key by adding the 
   following line at the end of our file:
    ``` sql
    ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id");
    ```
5. Finally, let us add two test users, which will help us test our code later
   down the road. At the end of the file, add the following two lines:
    ```sql
    INSERT INTO "User" (name) VALUES ('Gary');
    INSERT INTO "User" (name) VALUES ('Tracker');
    ```

## Initial Requirements

Now that we are done with coding our database, let us try to fire up Docker

1. In your terminal, navigate to your `Backend - Empty` directory.

2. Launch Docker and run `docker-compose up --build`.

3. If everything went smoothly in the previous steps, you should see a bunch of 
   log messages being printed by the `db` container with the last one being 
   `LOG:  database system is ready to accept connections`. You should then see
   the following error in the `ag-backend` container:
    ```
    ag-backend    | Traceback (most recent call last):
    ag-backend    |   File "runner.py", line 5, in <module>
    ag-backend    |     from app.setup import cli
    ag-backend    |   File "/usr/src/app/app/setup.py", line 6, in <module>
    ag-backend    |     from flask_api import FlaskAPI
    ag-backend    | ModuleNotFoundError: No module named 'flask_api'
    ag-backend exited with code 1
    ```
   This is because, in `app/setup.py`, we import `FlaskAPI` from `flask_api` but
   we did not install the `flask-api` dependency. Once you see this, enter 
   `CTRL + C` followed by `docker-compose down --volumes` to shut down the container.

4. To fix this, add the following line to `requirements.txt` inside of
   `Backend - Empty`:
    ```
    flask-api
    ```
   This is where you will add all the dependencies you need during development.
   As a general rule of thumb, anything you need to pip install will go in 
   `requirements.txt`.

5. Next, go ahead and add the following extra dependencies that are also used by
   the template code to `requirements.txt`:
    ```
    Flask
    flask-login
    flask_sqlalchemy
    flask_cors
    python-dotenv
    psycopg2-binary
    ```

6. Once done, the output of your `ag-backend` container should look like this:
    ```
    ag-backend    |  * Tip: There are .env or .flaskenv files present. Do "pip install python-dotenv" to use them.
    ag-backend    | Traceback (most recent call last):
    ag-backend    |   File "/usr/local/lib/python3.8/site-packages/flask/cli.py", line 556, in list_commands
    ag-backend    |     rv.update(info.load_app().cli.list_commands(ctx))
    ag-backend    |   File "/usr/local/lib/python3.8/site-packages/flask/cli.py", line 388, in load_app
    ag-backend    |     app = locate_app(self, import_name, name)
    ag-backend    |   File "/usr/local/lib/python3.8/site-packages/flask/cli.py", line 257, in locate_app
    ag-backend    |     return find_best_app(script_info, module)
    ag-backend    |   File "/usr/local/lib/python3.8/site-packages/flask/cli.py", line 97, in find_best_app
    ag-backend    |     raise NoAppException(
    ag-backend    | flask.cli.NoAppException: Failed to find Flask application or factory in module "app". Use "FLASK_APP=app:name to specify one.
    ag-backend    | Usage: runner.py [OPTIONS] COMMAND [ARGS]...
    ag-backend    | 
    ag-backend    | Options:
    ag-backend    |   --version  Show the flask version
    ag-backend    |   --help     Show this message and exit.
    ag-backend    | 
    ag-backend    | Commands:
    ag-backend    |   routes  Show the routes for the app.
    ag-backend    |   run     Run a development server.
    ag-backend    |   shell   Run a shell in the app context.
    ag-backend    |  * Tip: There are .env or .flaskenv files present. Do "pip install python-dotenv" to use them.
    ag-backend    |  * Serving Flask app "app/__init__.py" (lazy loading)
    ag-backend    |  * Environment: development
    ag-backend    |  * Debug mode: on
    ag-backend    |  * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
    ag-backend    |  * Restarting with stat
    ag-backend    |  * Tip: There are .env or .flaskenv files present. Do "pip install python-dotenv" to use them.
    ag-backend    |  * Debugger is active!
    ag-backend    |  * Debugger PIN: 281-173-387
    ```
   Ignore the error displayed at the top for now, and hit `CTRL + C` followed 
   by `docker-compose down --volumes` to shut down the container.

## Creating the Models

Next we will move on to creating our models. Remember that a model is a layer in
which we access the database directly. What we want to do is create a model for
each table in our database in order to represent it in code. Hence, this app
will have two models: The `User` model and the `ToDo` model.

### The User Model
   
1. Start by creating a file called `user.py` inside of `app/src/models` in
   `Backend - Empty`.

2. Define the `User` class by adding the following:
    ```python
    class User(db.Model):
        __tablename__ = 'User'  # Name of the table associated with model
        # Fields of an entry
        id = db.Column(db.Integer, primary_key=True, nullable=False)
        name = db.Column(db.String(255), unique=True, nullable=False)

        # Adds a User instance as an entry in our database
        def save(self) -> None:
        db.session.commit()

        # Converts a User object to a JSON object
        def to_json(self) -> [str, str]:
            to_return = {}
            to_return['id'] = self.id
            to_return['name'] = self.name

            return to_return
    ```
   We indicate that class is a database model by making it inherit from 
   `db.Model`. We then give it the same fields that can be seen in our
   database schema, and add a method that allows us to save an instance as an
   entry in our database. Finally, we add a method that converts a `User`
   instance to a JSON object, which will be helpful when we write our API's.

3. In our `User` model, we will need three methods. One to add a new user, one
   to retieve all the users, and one to retrieve a single user. Go ahead and use
   the code below to add these methods to the `User` class. Make sure to read over
   the code and its comments to understand how these methods work. Notice how
   methods that are not binded to a specific instance (such as the methods below)
   are static, while the ones that are (such as `to_json`) are not.
    ```python
    # Takes in a name and create a user with that name
    @staticmethod
    def add(name: str) -> User:
        # Call User constructor
        user = User(name=name)

        # Save to database
        db.session.add(user)
        user.save()

        # Return the user object
        return user

    # Queries all the users in the table and returns it in a list
    @staticmethod
    def get() -> [User]:
        return User.query.all()

    # Takes in an ID and returns the entry in the User table with that ID.
    @staticmethod
    def get_by_id(id: int) -> User:
        # Query the entry wanted
        query = User.query.filter_by(id=id).all()

        # Take the first element of the array returned (there should only be 1)
        return query[0]
    ```

5. In order for this file to be error free, we need two imports. Go ahead and
   add the two lines below at the top of your file. Go ahead and read the
   comments to understand what they do.
    ```python
    # Allows us to reference the User type inside of the User class
    from __future__ import annotations
    # Imports reference to our database from setup.py
    from ...setup import db
    ```

4. Once this is done, check that Flake is not yelling at you. To do so, open
   your terminal and check that there are no errors under `Problems`. If there are
   none, then you are done with the `User` model. If there are any errors, go 
   ahead and fix them before moving on.

### The ToDo Model

1. Start by creating a file called `todo.py` inside of `app/src/models` in
   `Backend - Empty`.

2. The logic behind this model is very similar to the `User` one except that we
   only need two methods: One to add a todo and one to get all the todo's for
   a user. Go ahead and add the following to `todo.py` in order to create the
   `Todo` model. Make sure to read the code and its comments to understand what
   everything does. Once again, its logic is very similar to the `User` model.
    ```python
    # Allows us to reference the ToDo type inside of the ToDo class
    from __future__ import annotations
    # Imports reference to our database from setup.py
    from ...setup import db


    class ToDo(db.Model):
        __tablename__ = 'ToDo'  # Name of the table associated with model
        # Fields of an entry
        id = db.Column(db.Integer, primary_key=True, nullable=False)
        user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
        description = db.Column(db.String(255), nullable=False)

        # Adds a ToDo instance as an entry in our database
        def save(self) -> None:
            db.session.commit()

        # Converts a ToDo object to a JSON object
        def to_json(self) -> [str, str]:
            to_return = {}
            to_return['id'] = self.id
            to_return['user_id'] = self.user_id
            to_return['description'] = self .description

            return to_return

        # Takes in a user ID and a description and creates a ToDo belonging to the
        # user with this ID and having the given description
        @staticmethod
        def add(user_id: int, description: str) -> ToDo:
            # Call ToDo constructor
            todo = ToDo(user_id=user_id, description=description)

            # Save to database
            db.session.add(todo)
            todo.save()

            # Return the ToDo object
            return todo

        # Takes in an ID and returns the entries in the ToDo table with that ID.
        @staticmethod
        def get(user_id: int) -> [ToDo]:
            return ToDo.query.filter_by(user_id=user_id).all()
    ```

3. Make sure that you do not have any Flake errors or warnings. If you do, go
   ahead and fix them. If you do not, you are done with the `ToDo` model!

This completes the two models that we need for our project. Now, we will write
their correspondings controllers.

## Creating the Controllers

The controller is the layer in between our models and our views. It calls
methods from the model and prepares the data to be sent from the Frontend. A
controller should never access the database. Remember that any database
manipulation should be made in the model. Usually, each model will have its own
controller. Hence, in this project we will need two controllers, or API's. Note
that controller and API are two terms that, in this context, can be used
interchangeably. We tend to use API more, because it is shorter to write in
code. With this in mind, let us create the `User` API

### The User API

1. Start by creating a file called `user.py` inside of `app/src/apis` in
   `Backend - Empty`. As a general rule, we want the names of the API's to
   match the name of the model for clarity.

2. Add necessary dependencies to the file by copying the code below. You will
   need those dependencies for every API you create. Read the comments for a
   brief overview of what each one does.
    ```python
    # Import Flask dependencies

    # CORS supports cross origin resource sharing, allowing the Backend and
    # Frontend to be on separate servers
    from flask_cors import CORS

    # Blueprint allows the API to be visible on the server
    # Request allows us to access the body of the request (arguments passed in)
    # Jsonify allows us to convert simple objects (lists, dictionaries) into JSON
    from flask import Blueprint, request, jsonify
    ```

3. Since this is the `User` API, we will be calling methods from the `User`
   model. Import the model by adding the code below to your file.
    ```python
    # Import User model
    from ..models.user import User
    ```

4. The next step is to declare the Blueprint for the API. The Blueprint is
   how the API becomes visible on the Backend server. Remember the name of
   this Blueprint as we will need to register it in a later step. Declare it
   by adding the code below
    ```python
    # Create the blueprint
    user_api = Blueprint('user_api', __name__)
    CORS(user_api, supports_credentials=True)
    ```

5. Now that we have all the Flask business out of the way, let us write our
   first route. The first piece of functionality we will need from this API is
   to add a user. Hence let us add a route for that. Copy the code below to your
   file to add the add route.
    ```python
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
    ```
   Now, there is a lot going on here so let's break it down. There are three
   important things going on in the very first line. The first one is the
   `user_api.route` part. This means that we are declaring a route belonging to
   the `user_api` Blueprint that we declared earlier. The second one, is the
   `'/add'` part. This is the endpoint of our route. This means that this route
   will be accessible via the following URL: `http://localhost:4200/api/user/add`.
   The `localhost:4200` comes from the fact that we are accessing port 4200 on
   our local machine (This is defined on line 13 of `docker-compose.yml` in
   `Backend - Empty`). The `/add` is what we just defined in our code. The
   `/api/user` comes from the fact that this route is part of the `User` API.
   We will explicitely define this in Step #8. The third important thing in the
   first line is the `methods=['POST']`. This defines the fact that this route
   can be accessed via a `POST` request. As a rule of thumb, we want a `POST`
   request when we are editing the database and a `GET` request when we are
   retrieving from the database. Since this routes adds a user, we are editing
   the database.

   Now that we are past the first line, let us look at the body of this route.
   The first thing we want to do is get any argument from the body of the
   request (we will look more into what a body is when we test our API, but for
   now think of it as an argument). In this case, the only argument we need is
   the name of the user. Then, we use this name to add the user to the database
   by calling the appropriate model method. Once this is done, we returned a
   JSON response that can later be used by the Frontend. The `200` signal
   is code for success. Go ahead and look at the comments in this route to see on
   which lines all this happens.

6. Now, let's write our second route. The second (and last) piece of
   functionality we need from this API is to retrieve the users. The route to
   do so can be implemented as such:
    ```python
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
    ```
   This route is pretty similar in logic than the previous one, so we won't get
   into too much detail about it. However, we still want to note a couple
   differences. The first one is that the endpoint of this route is `/get` and
   the second one is that it is a `GET` request (the two are unrelated, the 
   enpoint could have been anything). This route must be a `GET` request as we are
   retrieving from the database. Make sure to read over the code and not just
   copy paste it to understand what each line does.

7. Check your console for any Flake issues. If you have any, fix them. If not,
   you are done with this file!

8. The last step to complete our `User` API is to register the Blueprint that
   we declared. Do that by opening up `app/__init__.py` in `Backend - Empty` and 
   adding the following lines where indicated:
    ```python
    from .src.apis.user import user_api # Import

    app.register_blueprint(user_api, url_prefix='/api/user') # Registration
    ```
   Note that the `url_prefix='/api/user'` part defines the last bit of the
   route URL from Step #5.

9. Your first API is now done! Go ahead and run `docker-compose up --build` in 
   `Backend - Empty`. If everything works properly, you should not have any
   errors! Go ahead and hit `CTRL + C` followed by `docker-compose down --volumes`
   to exit out.

### The ToDo API

1. Start by creating a file called `todo.py` inside of `app/src/apis` in
   `Backend - Empty`.

2. Here is the code for the `ToDo` API, so go ahead and add it to the file.
    ```python
    # Import Flask dependencies
    from flask_cors import CORS
    from flask import Blueprint, request, jsonify

    # Import ToDo and User model
    from ..models.todo import ToDo
    from ..models.user import User

    # Create the blueprint
    todo_api = Blueprint('todo_api', __name__)
    CORS(todo_api, supports_credentials=True)


    # Route used to add a a given user
    @todo_api.route('/add', methods=['POST'])
    def add():
        # Get ID of user todo is for and description of to do from body
        user_id = int(request.json['user_id'])
        description = request.json['description']

        # Call ToDo model method to add todo
        todo = ToDo.add(user_id=user_id, description=description)

        # Call User model method to get name of user whose ID is passed in
        name = User.get_by_id(id=user_id).name

        # Generate JSON response
        return jsonify({'reason': 'todo added for %s' % name,
                        'result': todo.to_json()}), 200


    # Routeused to retrieve todo's for a given user
    @todo_api.route('/get', methods=['GET'])
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
    ```
    Make sure you read through the code and understand all that it does. As you
    can see, the logic is very similar than for the `User` API. There are a
    couple things worth nothing out, however. The first one is that this API
    imports both the `ToDo` model and the `User` model. This is okay, an API
    can call methods from different models. It should at least call methods
    from its own model (otherwise it is useless), but can definitely call methods
    from more. The second thing worth noting is that, we access arguments
    differently in the second route than in the first one. This is because we
    cannot send a body through `GET` requests. Hence, we access parameters
    instead, which requires slightly different syntax (more on parameters and body
    in testing section). Note that this was not an issue in the `User` API because
    the `GET` route there did not have any parameters.

3. Lastly, do not forget to register the Blueprint for the `ToDo` API in 
   `__init__.py` by adding the following lines where appropriate:
    ```python
    from .src.apis.todo import todo_api # Import

    # Register blueprints
    app.register_blueprint(todo_api, url_prefix='/api/todo') # Registration
    ```

4. Take care of any Flake issues and run `docker-compose up --build` to make sure
   there are no errors there. If there are none, congratulations! You finished
   the backend. Go ahead and hit `CTRL + C` followed by `docker-compose down --volumes`
   to stop Docker and take a much needed break before going over our last section: 
   Testing.

## Testing

In this section, we will show you how to test the routes in the `ToDo` API only for
two reasons. Firstly, this walkthrough is already way longer than originally planned,
and, secondly, all the knowledge you need to test the `User` API will be demonstrated
when testing the `ToDo` API. To test, go ahead and follow the following steps.

1. In your terminal, run `docker-compose down --volumes` in `Backend - Empty` to
   shut down the container and wipe the database.

2. Then, run `docker-compose up --build` to restart the container and database.

4. Launch Postman

5. On the left sidebar, click `New Collection`, name it `Autograder Demo` or 
   whatever name you like and click `Create`. We will use this collection to
   save all of the tests we write.

6. Let's begin by testing our `/get` route. Make sure Docker is running and
   create a new request by clicking the `+` tab at the top of the screen. Make
   sure the request is a `GET` request (at the left of the URL panel) and enter
   the URL of our request: `http://localhost:4200/api/todo/get`. Refer to Step #5
   in the "User API" section if you are unclear as to how we got this URL.

7. Next under the URL field, click `Params`. Enter `user_id` as the key and `1`
   as the value. This means that we we will be getting the todo's of the first
   entry in our database.

9. Hit `Send`. You should get the output below. Take a look at your `ToDo` API,
   to make sure you understand where this output comes from.
    ```json
    {
        "reason": "todo's retrieved for Gary",
        "result": []
    }
    ```
   This makes sense, since the first user we inserted has name `Gary` and we
   are yet to add any todo's for him.

10. Go ahead and press `[CMD OR CTRL] + S` to save that request to the collection
    we created earlier we will use it again shortly.

11. We will now try to add a todo. Once again, press the `+` tab at the top of
    your screen to start a new request. Since our `/add` route is a `POST` route,
    make sure to change the request type. Then, enter the following request URL:
    `http://localhost:4200/api/todo/add`.

12. Next, we want to pass in our arguments. Since this is a `POST` request, we
    will be passing in a body as opposed to parameters. Under the request URL
    text field, click on `Body`. Then click on `raw` and change `Text` to `JSON`
    on the right of the radio buttons. Our `/add` route in the `ToDo` API takes
    two arguments: a user ID and a description. Let us add a todo for Gary,
    reminding him to post CSE 12 grades. To do that, pass in the following body
    in the text field under the radio buttons:
    ```json
    {
        "user_id": 1,
        "description": "Post CSE 12 grades"
    }
    ```
    Hit `Send` and you should should see the output below, as we coded in our
    `ToDo` API.
    ```json
    {
        "reason": "todo added for Gary",
        "result": {
            "description": "Post CSE 12 grades",
            "id": 1,
            "user_id": 1
        }
    }
    ```

13. To make sure everything works correctly. Let us retrieve the todo's for Gary
    one more time. Pull up the `GET` request that you previously saved in your
    collection. Press `Send` and you should see the following output:
    ```json
    {
        "reason": "todo's retrieved for Gary",
        "result": [
            {
                "description": "Post CSE 12 grades",
                "id": 1,
                "user_id": 1
            }
        ]
    }
    ```
    As you can see, one todo was added for Gary meaning that both of our routes
    seem to work correctly. Yay!

14. If you want to get some extra practice with Postman, try to test the `User`
    API routes. The process should be similar to testing the `Todo` API routes.

## Final Thoughts

Congratulations, you made it through this quite tedious walkthrough! Hopefully,
you have a better understanding of how Backend works with Python and Flask. This
codebase is very similar to the one we use for the actual Autograder Backend.
In fact, most of the files are identical! We hope that this was useful, and, as
always, please let us know if you have any questions!
