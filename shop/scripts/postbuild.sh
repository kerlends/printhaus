#!/bin/bash

PROJECT_DIR=$PWD
BUILD_DIR=$PROJECT_DIR/public

WWW_DIR=/www/printhaus

sudo rm -rf $WWW_DIR
sudo cp -rf $BUILD_DIR $WWW_DIR
sudo chown -R www:www $WWW_DIR
