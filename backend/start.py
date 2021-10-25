from flask import Flask, render_template, make_response, request
import firebase_admin
from firebase_admin import credentials, firestore
import os

app = Flask(__name__)

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/')
def home():
    return "Welcome"

@app.route('/post', methods=['GET', 'POST']) 
def newPost():
    if request.method == 'POST':
        title = request.form.get('title')
        interest = request.form.get('interest')
        post = request.form.get('post')
        post_info = {
        u'Interest' : interest,
        u'Post' : post,
        u'Title' : title
        }
        doc_posts = db.collection(u'posts').add(post_info)
    return "idk"


    