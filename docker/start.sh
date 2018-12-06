#!/bin/bash
set -ev

docker run -d -v=${PWD}:/workdir -p=9999:9002 apisguru/graphql-faker ./docker/remoteSchema.graphql
