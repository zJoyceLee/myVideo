import json
from flask import Flask, request, redirect, url_for, jsonify, Response
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

url_lst = [
  'http://118.228.16.112/youku/655954D223A834301FE726B9/030008070058DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12',
  'http://118.228.16.117/youku/655BA9CC74583E4266433FA6/030008070158DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12',
  'http://118.228.16.113/youku/6961752F1348841018F5056F0/030008070258DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12',
  'http://118.228.16.107/youku/65610538C94583E42639B249F/030008070358DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12',
  'http://118.228.16.114/youku/6961BFC4493D836EF4A784397/030008070458DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12',
  'http://118.228.16.117/youku/65614FDBAF4583E42664339B7/030008070558DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12',
  'http://118.228.16.116/youku/6761BFC4A649841EBF38722ED/030008070658DB39993BCA32BA9DFCAF429C25-A0E6-5F85-00FC-3E02FA22D7CF.mp4?sid=04920051695741299b507_00&ctype=12'
]

@app.route("/")
def hello():
    return "hello, Flask"
'''
@app.route("/<name>")
def hello_name(name):
    return "hello, {}".format(name)
'''
@app.route('/test', methods=['GET'])
def test():
    print('get')
    return jsonify({'url_lst': url_lst})

@app.route('/search', methods = ['POST'])
def search():
    if request.method == 'POST':
        url = request.json['url']
        print(url)
        # handle url => real urls
        return Response(json.dumps(url_lst),  mimetype='application/json')



if __name__ == "__main__":
    app.run()