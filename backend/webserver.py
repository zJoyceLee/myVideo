from pymongo import MongoClient
import json
import random
import re
import subprocess
from flask import Flask, request, redirect, url_for, jsonify, Response
from flask_cors import CORS
import os

# UPLOAD_FOLDER  = '/media/joyce/Joyce/Download'
# ALLOWED_EXTENSIONS = set(['mp4', 'flv'])

app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# from flask_login import LoginManager
#
# login_manager = LoginManager()
# login_manager.init_app(app)
#
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     # Here we use a class of some kind to represent and validate our
#     # client-side form data. For example, WTForms is a library that will
#     # handle this for us, and we use a custom LoginForm to validate.
#     form = LoginForm()
#     if form.validate_on_submit():
#         # Login and validate the user.
#         # user should be an instance of your `User` class
#         login_user(user)
#
#         flask.flash('Logged in successfully.')
#
#         next = flask.request.args.get('next')
#         # is_safe_url should check if the url is safe for redirects.
#         # See http://flask.pocoo.org/snippets/62/ for an example.
#         if not is_safe_url(next):
#             return flask.abort(400)
#
#         return flask.redirect(next or flask.url_for('index'))
#     return flask.render_template('login.html', form=form)



def parseRelUrl(mystr):
    ret = {}
    ret['haveMP4'] = True
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
        # result = subprocess.check_output(['python3', './you-get/you-get', '-u', '--format=mp4', url])
        result = subprocess.check_output(['python3', './you-get/you-get', '--json', url])
        info = json.loads(result)
        mystream = info.get('streams')

        if 'mp4' in mystream:
            result = subprocess.check_output(['python3', './you-get/you-get', '-u', '--format=mp4', url])
            return Response(json.dumps(parseRelUrl(result)), mimetype='application/json')
        else:
            return jsonify({'haveMP4': False, 'infos': 'Do not have MP4 source.'})

import requests
from bs4 import BeautifulSoup

class Serie():
    def __init__(self, myurl):
        self.url = myurl
    def get_have_href_and_title(self, tag):
        return tag.has_attr('href') and tag.has_attr('title')
    def parse(self):
        ret = []
        # print('self.url', self.url)
        res = requests.get(self.url)
        soup = BeautifulSoup(res.content)
        # series = soup.find(id='vpofficiallistv5_wrap')
        series = soup.find(id="Drama")
        if (isinstance(series, type(None))):
            return ret
        print('child----------start')
        counter = 0
        for child in series.children:
            print(child)
            if counter == 0:
                mylst_link = child
            counter = counter + 1
            if counter == 2:
                serie = child
                break

        content_lst = serie.find_all('a')
        # print(type(content_lst))
        if len(content_lst) == 0:
            a_of_mylst = mylst_link.find('a')
            if (not isinstance(a_of_mylst, type(None))):
                mylst = 'http:' + a_of_mylst.get('href')

                playlst_res = requests.get(mylst)
                playlst_soup = BeautifulSoup(playlst_res.content)
                playlst = playlst_soup.find(id="playList")
                content_lst = playlst.find_all('a')

        for x in content_lst:
            dic = {}
            dic["title"] = x.get('title')
            href = x.get('href')
            if (not isinstance(href, type(None))):
                if href[:5] == 'http:':
                    dic["href"] = href
                else:
                    dic["href"] = 'http:' + href
            dic["text"] = x.get_text()

            if not dic.get('text'):
                dic["text"] = dic.get('title')
            if not self.isDicInLst(dic, ret):
                ret.append(dic)
        return ret
    def isDicInLst(self, dic, lst):
        assert dic.has_key('href')
        href = dic.get('href')
        tmp = [x.get('href') for x in lst]
        if href in tmp:
            return True
        return False


@app.route('/serie', methods = ['POST'])
def serie():
    if request.method == 'POST':
      url = request.json['url']
      print(url)
      s = Serie(url)
      lst = s.parse()
      print(lst)
      return jsonify({'serie':lst})


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
        ret = [lst[i] for i in random.sample(range(len(lst)), 30)]
        return jsonify({'videos': ret})
    except:
        pass
    if request.method == 'GET':
        print('get'.upper())


@app.route('/infos', methods=['POST'])
def info():
    if request.method == 'POST':
        url = request.json['url']
        print('{}, [URL]{}'.format('get url from client post'.upper(), url))

        result = subprocess.check_output(['python3', './you-get/you-get', '--json', url])
        client = MongoClient('172.17.0.1', 27017)
        db = client.myVideo
        coll = db.cache
        record = coll.find_one({'url': url})
        cached = None
        if not isinstance(record, type(None)):
            cached = coll.find_one({'url': url}).get('media')
        return jsonify({'infos': result, 'record': json.dumps(cached)})


@app.route('/cache', methods=['POST'])
def cache():
    if request.method == 'POST':
        url = request.json['url'].encode('utf-8')
        videoFormat = request.json['format'].encode('utf-8')
        videoExt = request.json['ext'].encode('utf-8')
        videoName = request.json['name'].encode('utf-8')
        addr = '/media/joyce/Joyce/Download'
        result = subprocess.check_output(['python3', './you-get/you-get', '-o', addr, '--format={}'.format(videoFormat), url])
        print(result)

        client = MongoClient('172.17.0.1', 27017)
        db = client.myVideo
        coll = db.cache
        record = coll.find_one({'url': url})
        if isinstance(record, type(None)):
            dic = {
                videoFormat :  {
                    'addr': addr,
                    'name': '{}.{}'.format(videoName, videoExt)
                }
            }
            coll.insert({
                'url': url,
                'media': dic
            })
        else:
            print(record)
            dic = record.get('media')
            dic[videoFormat] = {
                'addr': addr,
                'name': '{}.{}'.format(videoName, videoExt)
            }
            coll.update(
                {'url': url},
                {
                    "$set": {
                        'media': dic
                    }
                }
            )
        return jsonify({'data': dic})

@app.route('/download', methods=['POST'])
def download():
    if request.method == 'POST':
        url = request.json['url'].encode('utf-8')
        videoFormat = request.json['format'].encode('utf-8')
        addr = request.json['addr'].encode('utf-8')
        name = request.json['name'].encode('utf-8')
        ext = request.json['ext'].encode('utf-8')
        print(url, videoFormat, addr, name)
        path =  '{}/{}'.format(addr, name)
        print(path)
        def generate():
            with open(path, 'rb') as f:
                data = f.readlines()
                for line in data:
                    yield line
        if ext == 'mp4':
            return  Response(generate(), mimetype="video/mp4")
        elif ext == 'flv':
            return Response(generate(), mimetype="video/x-flv")
        # return jsonify({'data': 'hello'})


if __name__ == "__main__":
    app.run()
