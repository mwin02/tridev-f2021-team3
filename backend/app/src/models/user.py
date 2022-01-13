# Allows us to reference the User type inside of the User class
from __future__ import annotations
# Imports reference to our database from setup.py
from ...setup import db


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
