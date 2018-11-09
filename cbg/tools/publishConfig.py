# -*- coding:utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('UTF-8')

import os
import re
import shutil
import pandas as pd
import math



typeDic={
    "number":"number",
    "int":"number",
    "float":"number",
    "string":"string",
}

def formatValue(v,t):
    if t=="int":
        # print v,type(v),str(v)
        if (not v) or str(v)=="" or str(v)=="nan":
            return 0,True
        return int(math.floor(int(v))) or 0,False
    elif t=="float" or t=="number":
        if (not v) or str(v)=="" or str(v)=="nan":
            return 0,True
        return float(v) or 0,False
    else:
        if (not v) or str(v)=="" or str(v)=="nan":
            return '""',True
        return '"'+str(v)+'"',False

def genXlsx2Ts(source_dir,out_file):
    print "gen xlsx to ts",os.getcwd(),source_dir,out_file
    outDir,fileName=os.path.split(out_file)
    if not os.path.exists(outDir):
        os.makedirs(outDir)
    f=open(out_file,"w")
    f.write("module config{\n")
    for root,dirs,files in os.walk(source_dir):
        for tmpfile in files:
            name,ext=os.path.splitext(tmpfile)
            if ext==".xlsx" or ext==".xls":
                fullPath=os.path.join(source_dir,tmpfile)
                print "  ",fullPath
                dframe=pd.read_excel(fullPath)
                f.write('\tinterface _%s{'%name)
                colNum=dframe.columns.size
                for col in range(0,len(dframe.columns)):
                    key=dframe.columns[col]
                    keyType= typeDic[dframe.values[0][col]]
                    f.write('"%s":%s,'%(key,keyType))
                f.write('}\n\texport let %s:{[key:%s]:_%s}={}\n'%(name,keyType,name))
                rowNum=dframe.iloc[:,0].size
                for i in range(2,rowNum):
                    rowEmpty=True
                    val,_=formatValue(dframe.values[i][0],dframe.values[0][0])
                    f.write('\t%s[%s]={'%(name,val))
                    for j in range(0,colNum):
                        colV,colEmpty=formatValue(dframe.values[i][j],dframe.values[0][j])
                        f.write('"%s":%s,'%(dframe.columns[j],colV))
                        if not colEmpty:
                            rowEmpty=False
                    f.write('}\n')
                    if rowEmpty:
                        print "[WARN]rowEmpty %s<%s %s"%(i,rowNum,fullPath)
                        break
                f.write("\n")
                    
    f.write("}")               
    f.close()


def main():

    import argparse
    parser = argparse.ArgumentParser()
    
    parser.add_argument("--source", help="source dir")
    parser.add_argument("--out",help="out file")
    
    args = parser.parse_args()

    inDir=args.source or "../xlsx"
    outPath=args.out or "./src/config/config.ts"
    genXlsx2Ts(inDir,outPath)


if __name__ == "__main__":
    main()