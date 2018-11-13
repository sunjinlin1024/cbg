import json
import sys
import chardet
from operator import itemgetter, attrgetter


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    
    parser.add_argument("--source", help="source")
    args = parser.parse_args()

    if not args.source:
        pass
    resPath=args.source
    resFile=open(resPath,"r")
    resText=resFile.read()
    resFile.close()
    resData=json.loads(resText)
    print resData
    
    # for a in range(1,62):
    #     if resData.has_key(str(a)):
    #         serverlist=resData[str(a)][1]
    #         for i in range(0,len(serverlist)):
    #             print serverlist[i][0],serverlist[i][1],a