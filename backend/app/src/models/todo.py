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
    title = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    contact = db.Column(db.String(255), nullable=False)
    groupSize = db.Column(db.Integer, nullable=False)
    peopleWanted = db.Column(db.Integer, nullable=False)

    # Adds a ToDo instance as an entry in our database
    def save(self) -> None:
        db.session.commit()

    # Converts a ToDo object to a JSON object
    def to_json(self) -> [str, str]:
        to_return = {}
        to_return['category'] = self.category
        to_return['title'] = self.title
        to_return['id'] = self.id
        to_return['user_id'] = self.user_id
        to_return['description'] = self.description
        to_return['contact'] = self.contact
        to_return['groupSize'] = self.groupSize
        to_return['peopleWanted'] = self.peopleWanted
        return to_return

    # Takes in a user ID and a description and creates a ToDo belonging to the
    # user with this ID and having the given description
    @staticmethod
    def add(category: str, title: str, user_id: int, description: str, contact: str, groupSize: int, peopleWanted: int) -> ToDo:
        # Call ToDo constructor
        todo = ToDo(user_id=user_id, description=description, title=title, category=category, 
            contact=contact, groupSize=groupSize, peopleWanted=peopleWanted)

        # Save to database
        db.session.add(todo)
        todo.save()

        # Return the ToDo object
        return todo

    # Takes in an ID and returns the entries in the ToDo table with that ID.
    @staticmethod
    def get(user_id: int) -> [ToDo]:
        return ToDo.query.filter_by(user_id=user_id).all()

    @staticmethod
    def getAll() -> [ToDo]:
        return ToDo.query.all()

    @staticmethod
    def getCategory(category: str) -> [ToDo]:
        return ToDo.query.filter_by(category=category).all()