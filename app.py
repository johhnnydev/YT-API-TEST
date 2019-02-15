from flask import Flask, render_template, jsonify
from dotenv import load_dotenv
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os

# setup
app = Flask(__name__)
app.config["FLASK_APP"] = os.getenv("FLASK_APP")
app.config["FLASK_ENV"] = os.getenv("FLASK_ENV")
load_dotenv()

# build('youtube', 'v3', developerKey=os.getenv("YT_API_KEY"))

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/list/<playlist>", methods=["GET"])
def playlist(playlist):
    service = build('youtube', 'v3', developerKey=os.getenv("YT_API_KEY"))
    response = service.playlistItems().list(part='snippet,contentDetails', maxResults=5, playlistId=playlist).execute()
    # print(response)
    return jsonify(response)