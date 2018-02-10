#!/usr/bin/python3

import datetime
import json

data = None
CATEGORIES = ["System", "Software", "Hardware", "External"]

with open('./solutions.txt', 'r', encoding='utf8') as f:
    data = f.read().strip()

data = data.split("\n")
validData = []

for line in data:
    if line.strip():
        validData.append(line.strip())


jsonData = {}
for cate in CATEGORIES:
    jsonData[cate] = {
        "count": 0,
        "data": []
    }

for i in range(len(validData)):
    if "title:" in validData[i] and \
       "content:" in validData[i+1] and \
       "cate:" in validData[i+2]:
        newData = {
            "title": validData[i][6:].strip(),
            "content": validData[i+1][8:].strip(),
            "date": str(datetime.date.today())
        }
        cate = CATEGORIES[int(validData[i+2][5:].strip())]
        jsonData[cate]["count"] += 1
        jsonData[cate]["data"].append(newData)

with open('./solutions-' + str(datetime.date.today()) + '.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(jsonData).encode('utf-8').decode('unicode_escape'))
