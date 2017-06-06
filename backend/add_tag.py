# -*- coding: utf-8 -*-
import sys
import time
import requests
from bs4 import BeautifulSoup
import json
import datetime
import random

from pymongo import MongoClient

client = MongoClient('172.17.0.1', 27017)
db = client.myVideo
coll = db.dataset
dest = db.testdate

# def output(myset， *args):
def output(myset, *args, **kwargs):
    counter = 0
    for x in myset:
        print(x)
        if len(args) != 0 and isinstance(args[0], int):
            counter = counter + 1
            if counter == args[0]:
                break

def getVideoTag(myurl):
    res =  requests.get(myurl)
    soup = BeautifulSoup(res.content)
    tag = soup.find(attrs={"name": "irCategory"})
    return tag.get('content')

def add_tag_for_dataset():
    for x in coll.find():
        url = x.get('href')
        coll.update(
            {'href': url},
            {
                "$set": {
                    'tag': getVideoTag(url)
                }
            }
        )

def add_counter_for_dataset():
    for x in coll.find():
        url = x.get('href')
        coll.update(
            {'href': url},
            {
                "$set": {
                    'counter': random.randint(0, 1000)
                }
            }
        )

def insert_testdate(reset = False):
    if reset:
        print('reset table: testdate')
        dest.drop()
    for x in coll.find():
        url = x.get('href')
        title = x.get('title')
        dest.insert({'title': title, 'date': datetime.datetime.utcnow()})

def add_date_for_dataset(mydate):
    for x in coll.find():
        url = x.get('href')
        coll.update(
            {'href': url},
            {
                "$set": {
                    'date': mydate
                }
            }
        )

# insert_testdate(True)
# add_date_for_dataset(datetime.datetime(2017, 4, 18))

end = datetime.datetime.utcnow()
start = datetime.datetime(end.year, end.month, end.day)

tmp = dest.find({'date': {'$gte': start, '$lt': end}})
output(tmp, 2)

add_counter_for_dataset()
