from pymongo import MongoClient
import json
import random
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


def parseRelUrl(mystr):
    ret = {}
    lst = mystr.split('\n')
    assert 'Real URLs:' in lst
    myindex = lst.index('Real URLs:')
    url_lst = lst[myindex+1:-1]
    infos =  []
    for item in lst[:myindex]:
        dic = {}
        itemlst = item.split(':')
        if len(itemlst) == 2:
            dic['key'] = itemlst[0].strip()
            dic['value'] = itemlst[1].strip()
        if len(dic) != 0 and dic['value'] !='' and dic['key'] != '# download-with' and dic['key'] != '- format':
            infos.append(dic)

    ret['infos'] = infos
    ret['urls'] = url_lst
    return ret

@app.route('/search', methods = ['POST'])
def search():
    if request.method == 'POST':
        url = request.json['url']
        print('{}, [URL]{}'.format('get url from client post'.upper(), url))
        # handle url => real urls

        result = subprocess.check_output(['python3', './you-get/you-get', '-u', '--format=mp4', url])
        print(result)
        data = parseRelUrl(result)

        print('{}'.format('get real url and info failed'.upper()))

        return Response(json.dumps(data),  mimetype='application/json')

@app.route('/videoLst', methods=['GET'])
def videoLst():
    try:
        client = MongoClient('172.17.0.1', 27017)
        db = client.myVideo
        coll = db.dataset
        "db.dataset.aggregate([{$sample:{size:3}}])"
        lst = []
        for item in coll.find():
            del item['_id']
            lst.append(item)
        ret = [lst[i] for i in random.sample(range(len(lst)), 24)]
        return jsonify({'videos': ret})
    except:
        pass
    if request.method == 'GET':
        print('get'.upper())

if __name__ == "__main__":
    app.run()
