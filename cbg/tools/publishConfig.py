import sys
import os
import re
import shutil
import pandas

def genXlsx2Ts(source_dir,out_file):
    outDir,fileName=os.path.split(out_file)
    if not os.path.exists(outDir):
        os.makedirs(outDir)
    f=open(out_file,"w")
    for root,dirs,files in os.walk(source_dir):
        for tmpfile in files:
            name,ext=os.path.splitext(tmpfile)
            if ext==".xlsx":

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