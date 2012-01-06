#!/bin/bash

rm -rf dist
mkdir dist
play dist
cd `dirname "$0"`/dist
ZIP=`ls -1 | grep .zip`
UNZIP_DIR=`echo $ZIP | sed 's/\(.*\)\.zip*/\1/'`
DIST_ZIP=`echo $ZIP | sed 's/\(.*\)-.*/\1.zip/'`

unzip $ZIP
rm $ZIP
mv $UNZIP_DIR/* .
rmdir $UNZIP_DIR
mv lib lib-web
rm start
cp -r ../bin .
mv conf bin

zip -r $DIST_ZIP *

cd -
