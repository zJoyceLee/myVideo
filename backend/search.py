import json
import os
import subprocess

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/search', methods = ['POST'])
def search():
    if request.method == 'POST':
        url = request.json['url']
        print('get url from client post.', url)
        # handle url => real urls
        return Response(json.dumps(url_lst),  mimetype='application/json')

if __name__ == "__main__":
    app.run()