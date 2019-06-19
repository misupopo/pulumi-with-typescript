#!/bin/bash

keyname=$1
env='home'
region='ap-northeast-1'

aws ec2 create-key-pair --key-name $keyname --profile $env --region $region \
| jq -r '.KeyMaterial' | tee $keyname'.pem'
aws s3 cp $keyname'.pem' 's3://custom-key-pair/' --region $region
chmod 600 $keyname'.pem'
mv $keyname'.pem' ~/.ssh/

