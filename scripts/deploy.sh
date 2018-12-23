
old=$(npm version | grep frontend | awk -F "'" '$0=$2')
echo "Got npm version ${old}"

cd dist

echo "Archiving current code"
aws --profile pewds s3 cp --recursive "s3://pewdiepievstseries.net" "s3://pewds-archives/prod/$old"

echo "Pushing on production"
aws --profile pewds s3 sync --acl public-read --delete . "s3://pewdiepievstseries.net"

cd ..