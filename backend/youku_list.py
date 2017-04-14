# -*- coding: utf-8 -*-
import sys
import time
import requests
from bs4 import BeautifulSoup
import json
import subprocess

class Spider():
    def __init__(self):
        self.url = ''
        try:
            self.url = sys.argv[1]
        except:
            self.url = 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html'
            # print('[USAGE]:  python spider.py [url]')
            # print('Default url: {}'.format(self.url))
            # time.sleep(3)


    def get_a_href_title(tag):
        return tag.tag.has_attr('href') and tag.has_attr('title')

    def parse(self):
        res = requests.get(self.url)
        soup = BeautifulSoup(res.content)
        content_lst = soup.find_all(attrs = {"class": "sn"})

        lst = []
        for x in content_lst:
            dic = {}
            dic['title'] = x.get('title')
            dic['hlef'] = x.get('href')
            dic['text'] = x.get_text()
            lst.append(dic)

        data = json.dumps(lst)
        # print(type(json.dumps(lst)))

        with open('./.tmp/lst.json', 'w') as f:
            f.write(data)

s = Spider()
s.parse()

