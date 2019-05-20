

# https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
create-iam-role:
		aws iam create-role --role-name CWLtoKinesisRole --assume-role-policy-document file://TrustPolicyForCWL.json


permission-iam-role:
		aws iam put-role-policy  --role-name CWLtoKinesisRole  --policy-name Permissions-Policy-For-CWL  --policy-document file://PermissionsForCWL.json
