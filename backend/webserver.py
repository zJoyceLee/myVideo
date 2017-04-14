import json
import subprocess
from flask import Flask, request, redirect, url_for, jsonify, Response
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    # subprocess.call(['which', 'python3'])
    out = subprocess.check_output(['ls', '-l'])
    print(type(out), out)
    return "hello, Flask"
'''
@app.route("/<name>")
def hello_name(name):
    return "hello, {}".format(name)
'''
@app.route('/test', methods=['GET'])
def test():
    print('get')
    # return jsonify({'url_lst': url_lst})

@app.route('/search', methods = ['POST'])
def search():
    if request.method == 'POST':
        url = request.json['url']
        print('get url from client post.', url)
        # handle url => real urls
        result = subprocess.check_output(['python3', './you-get/you-get', '-u', '--format=mp4', url])
        print(result)
        lst = result.split('\n')
        myindex = lst.index('Real URLs:')
        url_lst = lst[myindex+1:-1]
        infos =  []
        for item in lst[:myindex]:
            dic = {}
            itemlst = item.split(':')
            if len(itemlst) == 2:
                dic['key'] = itemlst[0].strip()
                dic['value'] = itemlst[1].strip()
            if len(dic) != 0 and dic['value'] != '' and dic['key'] != '# download-with' and dic['key'] != '- format':
                infos.append(dic)
        for x in infos:
            print x
        data = {}
        data['infos'] = infos
        data['urls'] = url_lst

        # return Response(json.dumps(url_lst),  mimetype='application/json')
        return Response(json.dumps(data),  mimetype='application/json')

if __name__ == "__main__":
    app.run()