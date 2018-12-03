#!/bin/bash

for i in $(seq -f "%02g" 1 25)
do
  dir="day$i"
  mkdir -v $dir
  touch $dir/day$i.js
  touch $dir/input.txt
  touch $dir/README.md
done
