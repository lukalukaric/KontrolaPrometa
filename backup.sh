#!/bin/bash
TIME=`date +%b-%d-%y`
tar -cvf backup/$TIME-Frontend.tar.gt ./frontend
tar -cvf backup/$TIME-Backend.tar.gt ./backend
tar -cvf backup/$TIME-lib.tar.gt ./lib
