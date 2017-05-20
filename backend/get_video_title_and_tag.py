# -*- coding:utf-8 -*-  

import requests
from bs4 import BeautifulSoup
import unittest

def getVideoTitleAndTag(url):
    '''Get video title and tag from Youku
    Keyword arguments:
    url -- the url part
    Return: dict {'title': str, 'tag': str}
    '''
    ret = {}
    if isinstance(url, type(None)) or (url == ''):
        return ret

    res =  requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')

    title = soup.title.text
    ret['title'] = title

    tag = soup.find(attrs={"name": "irCategory"})
    if isinstance(tag, type(None)):
        ret['tag'] = 'No'
        return ret

    ret['tag'] = tag.get('content')

    return ret



class TestGetVideoTitleAndTag(unittest.TestCase):

    def test_empty_url(self):
        self.assertEqual(getVideoTitleAndTag(''), {})

    def test_None_url(self):
        self.assertEqual(getVideoTitleAndTag(None), {})

    def test_No_tag(self):
        url = 'https://sports.youku.com/fishing'
        self.assertEqual(
            getVideoTitleAndTag(url),
            {
                'title': '钓鱼频道'.decode('utf-8'),
                'tag': 'No'.decode('utf-8')
            }
        )

    def test_normal(self):
        url = 'http://v.youku.com/v_show/id_XMjc3MjQ0MjEwMA==.html'
        self.assertEqual(
            getVideoTitleAndTag(url),
            {
                'title': '择天记 40—在线播放—《择天记 TV版》—电视剧—优酷网，视频高清在线观看'.decode('utf-8'),
                'tag': '电视剧'.decode('utf-8')
            }
        )

if __name__ == '__main__':
    unittest.main()
