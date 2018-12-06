#!/usr/bin/python  
#-*-coding:utf-8-*-
#环境：python2.7.x
#windows已安装TortoiseSVN，命令svn info 不可用的问题，请参考：https://www.cnblogs.com/guanking19/p/7908244.html
#使用例子：python PublishCmd.py -p html5 -m release 
#//如果要指定版本名 -version 2_0

import sys
import getopt
import optparse
from ctypes import *
import os
import os.path
import functools
import thread
import array
import re
import shutil 
import time, datetime
import fileinput
import datetime
import json
import ConfigParser
import codecs
import struct
import math
import traceback
from zlib import crc32
reload(sys)
sys.setdefaultencoding('utf-8')

TYPE_MAP_DIR = {'native': 'native', 'html5': 'web'};

def getFileCrc32(filename): 
    f=open(filename, 'rb')
    crc=crc32(f.read())
    f.close()
    ver=hex(crc&0xffffffff)+""
    return ver[2:len(ver)-1]

def getPathCrc32(path,rootHead=None,filt=None,output=None):
    count=0
    output=output or {}
    if os.path.isdir(path):
        if filt and len(filt)>0:
            filt=filt.split(",")
        else:
            filt=None
        for root,dirs,files in os.walk(path):
            # if filt:
            #     found=None
            #     for d in dirs:
            #         found=False
            #         for fd in filt:
            #             if fd.endwith("/") and d.find(fd):
            #                 found=True
            #                 break
            #         if found:
            #             break

            for f in files:
                if filt :
                    _,ext=os.path.splitext(f)
                    ext=ext[1:]
                    found=False 
                    for fi in filt:
                        if fi==ext:
                            found=True
                            break
                    if found:
                        continue
                fullPath=os.path.join(root,f)
                key=fullPath.replace(path,rootHead or "").replace("\\","/")
                output[key]=getFileCrc32(fullPath)
                count=count+1
                # print key,output[key]
                # print fullPath.replace(path,rootHead or "").replace("\\","/"),output[fullPath]
    else:
        output[path]=getFileCrc32(path)
    print "~~~~ get root crc32 count:[%s] from::%s~~~~"%(count,path)
    return output


# #获取脚本文件的当前路径
def curFileDir():
    #获取脚本路径
    path = sys.path[0]
    #判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
    if os.path.isdir(path):
        return path
    elif os.path.isfile(path):
        return os.path.dirname(path)

#修改当前工作目录
os.chdir(curFileDir())
WORK_DIR = os.getcwd()

def copyFiles(source_dir,  target_dir, filter=".svn"):
    if source_dir.find(filter) > 0: 
        return
    for file in os.listdir(source_dir): 
        source_file = os.path.join(source_dir,  file) 
        target_file = os.path.join(target_dir,  file) 
        if os.path.isfile(source_file): 
            if not os.path.exists(target_dir):  
                os.makedirs(target_dir)  
            # if not os.path.exists(target_file) or(os.path.exists(target_file) and (os.path.getsize(target_file) != os.path.getsize(source_file))):  
            open(target_file, "wb").write(open(source_file, "rb").read()) 
        if os.path.isdir(source_file): 
            First_Directory = False 
            copyFiles(source_file, target_file);

def replaceAllStr(path, sstr, rstr):
    # print path;
    for line in fileinput.input(path,inplace=True):
        print line.rstrip().replace(sstr,rstr);

def removeFileInFirstDir(target_dir): 
    for file in os.listdir(target_dir): 
        target_file = os.path.join(target_dir,  file) 
        if os.path.isfile(target_file): 
            os.remove(target_file)

def removeAllFileAndDir(target_dir):         
    filelist=[]    
    filelist=os.listdir(target_dir)  
    for f in filelist:  
        filepath = os.path.join( target_dir, f )  
        if os.path.isfile(filepath):  
            os.remove(filepath)  
            print filepath+" removed!"  
        elif os.path.isdir(filepath):  
            shutil.rmtree(filepath,True)  
            print "dir "+filepath+" removed!"           
 

def coverFiles(source_dir,  target_dir): 
    for file in os.listdir(source_dir): 
        source_file = os.path.join(source_dir,  file);
        target_file = os.path.join(target_dir,  file);
        #cover the files 
        if os.path.isfile(source_file): 
            open(target_file, "wb").write(open(source_file, "rb").read());

def moveFileto(source_dir,  target_dir): 
    shutil.copy(source_dir,  target_dir)

def writeVersionInfo(target_dir): 
    open(target_dir, "wb").write("Revison:")

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5 (except OSError, exc: for Python <2.5)
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else: raise





#   将参数转化成字典形式
def getArgvDict(argv):
    optd = {}
    while argv:
        if argv[0][0] == '-':#字符串的第一个字符
            optd[argv[0]] =argv[1]
            argv = argv[2:]#将argv切片得到新的argv，再while循环
        else:
            argv = argv[1:]
    return optd


def getAllFiles(target_dir, ret_list = []):
    for tailpath in os.listdir(target_dir):
        fullpath = os.path.join(target_dir,  tailpath) 
        # print tailpath
        if os.path.isfile(fullpath): 
            ret_list.append(fullpath)
        if os.path.isdir(fullpath): 
            if tailpath!=".svn":
                First_Directory = False 
                getAllFiles(fullpath, ret_list);   
    return ret_list

    

def zip_dir(dirname,zipfilename):
    import zipfile
    filelist = []
    if os.path.isfile(dirname):
        filelist.append(dirname)
    else :
        for root, dirs, files in os.walk(dirname):
            for name in files:
                # print "full file",os.path.join(root, name)
                filelist.append(os.path.join(root, name))
          
    zf = zipfile.ZipFile(zipfilename, "w", zipfile.zlib.DEFLATED)
    for tar in filelist:
        arcname = tar[len(dirname):]
        # print arcname
        zf.write(tar,arcname)
    zf.close()

def zip_files(filelist,dirname,zipfilename):
    import zipfile
    rootDir=os.path.dirname(zipfilename)
    if not os.path.exists(rootDir):
        os.makedirs(rootDir)
    zf = zipfile.ZipFile(zipfilename, "w", zipfile.zlib.DEFLATED)
    for tar in filelist:
        arcname = tar[len(dirname):]
        zf.write(tar,arcname)
        if os.path.isdir(tar):
            for root,dirs,files in os.walk(tar):
                for dir in dirs:
                    zf.write(os.path.join(root,dir),os.path.join(root,dir))
                for file in files:
                    fullPath=os.path.join(root,file)
                    zf.write(fullPath,fullPath)
            
    zf.close()

def publishEgret(options):
    plat_type = options["plat_type"];
    version_name = options["version_name"];
    
    build_cmd = "egret publish --runtime %s --version %s" % (plat_type, version_name);
    print build_cmd
    status = os.system(build_cmd);
    print "publish result",status

    build_dir = "%s/bin-release/%s/%s" % (WORK_DIR,TYPE_MAP_DIR[plat_type], version_name);

    return build_dir

def main():
    option = getArgvDict(sys.argv);
    
    # releaseDir="./../publish"
    # if option.has_key("-releasePath"):
    #     releaseDir=option["-releasePath"]


    # debug=True
    # if option.has_key('-m'):
    #      debug=option['-m']!="release"

    plat_type="html5"
    if option.has_key("-p"):
        plat_type=option["-p"]           

    # isTest=debug==True
    # if option.has_key("-istest"):
    #     isTest=option["-istest"]=="1"

    version="1.0"
    if option.has_key("-version"):
        version=option["-version"]
    
    # option["istest"]=isTest
    # option['isDebug']=debug
    # option['releaseDir']=releaseDir
    option.clear()
    option["version_name"]=version
    option["plat_type"]=plat_type

    print "~~~~~~~~~~~~~~~~core publish start~~~~~~~~~~~~~~~~"
    build_dir=publishEgret(option);
    print "~~~~~~~~~~~~~~~~core publish complete~~~~~~~~~~~~~~~~"

    confighPath=os.path.join(WORK_DIR,"web.config")
    if os.path.exists(confighPath):
        shutil.copy(confighPath,os.path.join(build_dir,"web.config")) 
    print build_dir

    

    


if __name__ == '__main__':
    main();