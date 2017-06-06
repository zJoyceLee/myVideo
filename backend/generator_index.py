# -*- coding: utf-8 -*-
import sys
import re
import requests
from bs4 import BeautifulSoup
import json
import datetime

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
        self.res = requests.get(self.url)
        self.soup = BeautifulSoup(self.res.content, 'html.parser')

    def getVideoTag(self, myurl):
        res =  requests.get(myurl)
        soup = BeautifulSoup(res.content, 'html.parser')
        tag = soup.find(attrs={"name": "irCategory"})
        if isinstance(tag, type(None)):
            return 'No'
        return tag.get('content')

    def parseUrl(self, url):
        ret = url
        if len(url) > 0:
            if url[:2] == '//':
                ret = 'https:' + url
            elif url[:6] == 'https:':
                pass
        return ret

    def parseYouku(self, collection):
        content_lst = self.soup.find_all(attrs = {"target": "video"})
        for x in content_lst:
            dic = {}
            myimg = x.find_next_sibling("img")
            if not myimg:
                continue
            alt = self.parseUrl(myimg.get('alt'))
            href = self.parseUrl(x.get('href'))
            dic['img'] = alt
            dic['title'] = x.get('title')

            dic['tag'] = self.getVideoTag(href)
            dic['date'] = datetime.datetime.utcnow()

            print(dic.get('title'))
            print(dic.get('img'))

            try:
                collection.update({'href': href},{"$set": dic}, upsert=True)
                print('insert records successful\n'.upper())
            except:
                print('collection insert error.\n'.upper())
                # sys.exit()
                continue

    def parseSymbol(self, s):
        ret = s.replace('&amp;quot;', '"')
        ret = ret.replace('&amp;lt;', '')
        ret = ret.replace('"&gt;&lt;/a&gt;&lt;', '')
        ret = ret.replace('&amp;gt;', '>')
        if ret[-1] == '"' or ret[-1] == 'i':
            ret = ret[:-1]
        return ret

    def parseLazyContent(self, collection):
        content_lst = self.soup.find_all(attrs = {"class": "lazyContent"})
        for x in content_lst:
            print(type(x))
            mystr = str(x)
            print(type(mystr))
            lst = mystr.split('&lt;a')
            print(len(lst))
            for record in lst:
                newlst = list(set(record.split(' ')))
                dic = {}
                for item in newlst:
                    if len(item) > 5:
                        if item[:4] == 'href':
                            dic['href'] = item[6: -1]
                        if item[:5] == 'title':
                            dic['title'] = self.parseSymbol(item[7:])
                        if item[:3] == 'alt':
                            dic['img'] = self.parseUrl(item[5: -1])

                if not (isinstance(dic.get('img'), type(None)) or isinstance(dic.get('href'), type(None))):
                    url = dic.get('href')
                    try:
		        dic['tag'] = self.getVideoTag(url)
                    except requests.exceptions.MissingSchema as e:
                        print('[url={}][exception={}]: exception raised'.format(url, e))
                        continue

		    dic['date'] = datetime.datetime.utcnow()
		    href = dic.get('href')
		    key = {'href': href}
		    dic.pop(href, None)

		    print(dic.get('title'))
		    print(dic.get('img'))
                    try:
                        collection.update(key,{"$set":dic}, upsert=True)
                        print('insert records successful\n'.upper())
                    except:
                        print('collection insert error.\n'.upper())
                        # sys.exit()
                        continue

def foo():
    client = MongoClient('172.17.0.1', 27017)
    db = client.myVideo
    coll = db.dataset
    s = Spider()
    s.parseYouku(coll)
    s.parseLazyContent(coll)
    client.close()

foo()
