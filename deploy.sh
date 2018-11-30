#!/bin/bash -e

BUCKET=$1

if [ -z "$BUCKET" ]; then
  BUCKET=teemukoivisto.xyz
fi

# Copy the build into bucket with 30 day cache-control and delete all existing files
aws s3 sync ./public s3://"${BUCKET}"/ \
  --region eu-west-1 \
  --acl public-read \
  --cache-control max-age=2592000 \
  --delete

# Copy index.html the second time with decreased cache duration
aws s3 cp ./public/index.html s3://"${BUCKET}"/ \
  --region eu-west-1 \
  --acl public-read \
  --cache-control max-age=120
