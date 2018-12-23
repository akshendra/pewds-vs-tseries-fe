echo "Removing old dist directory"
rm -rf dist

echo "Buidling"
npm run build

cd dist

echo "Pushing on staging"
aws --profile pewds s3 sync --acl public-read --delete . "s3://pewdsvsts"

cd ..