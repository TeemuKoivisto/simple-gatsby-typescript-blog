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

# TODO: actually this copies only public/index.html BUT luckily the edge lambda
# that handles origin responses sets max-age=0 for all HTML-file requests, yey?
# Copy the HTML pages the second time with decreased cache duration
# since they'll be the ones to load the new assets.
aws s3 cp ./**/index.html s3://"${BUCKET}"/ \
  --region eu-west-1 \
  --acl public-read \
  --cache-control max-age=120
