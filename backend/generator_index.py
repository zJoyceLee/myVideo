# -*- coding: utf-8 -*-
import sys
import time
import requests
from bs4 import BeautifulSoup
import json

from pymongo import MongoClient

def uniq(mylst):
    ret = []
    for item in mylst:
        if item not in ret:
            ret.append(item)
    return ret

class Spider():
    def __init__(self):
        self.url = 'http://youku.com'
        try:
            self.url = sys.argv[1]
        except:
            self.url = 'http://youku.com'
            # print('[USAGE]:  python spider.py [url]')
            # print('Default url: {}'.format(self.url))
            # time.sleep(3)

    def parseYouku(self, collection):
        res = requests.get(self.url)
        soup = BeautifulSoup(res.content)
        content_lst = soup.find_all(attrs = {"target": "video"})

        lst = []
        for x in content_lst:
            dic = {}
            myimg = x.find_next_sibling("img")
            if not myimg:
                continue
            alt = myimg.get('alt')
            if alt[:2] == '//':
                alt = 'https:{}'.format(alt)
            dic['img'] = alt
            dic['title'] = x.get('title')
            dic['href'] = x.get('href')
            lst.append(dic)

        try:
            collection.insert(lst)
            print('insert records successful'.upper())
        except:
            print('collection insert error.'.upper())
            sys.exit()

try:
    client = MongoClient('172.17.0.1', 27017)
    db = client.myVideo
    coll = db.dataset
    s = Spider()
    s.parseYouku(coll)
    # for item in coll.find():
    #     print(item)
except:
    print('xxx'.upper())
    sys.exit()
