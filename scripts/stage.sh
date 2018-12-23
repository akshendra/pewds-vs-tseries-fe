echo "Removing old dist directory"
rm -rf dist

old=$(npm version | grep frontend | awk -F "'" '$0=$2')
echo "Got npm version ${old}"

echo "Archiving current staging code"
aws --profile pewds s3 cp --recursive "s3://pewdsvsts" "s3://pewds-archives/staging/$old"

echo "Pushing on staging"
aws --profile pewds s3 sync --acl public-read --delete . "s3://pewdsvsts"
