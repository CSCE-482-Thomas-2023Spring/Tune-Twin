from __main__ import app
from flask import Flask, request, jsonify

@app.route("/Music", methods=['GET'])
def GetSongRecommendations():
    return jsonify({"Msg" : request.args.get("message")})