
gitCommitMessage="travis-deploy"


echo === start 


gitRepo="https://${AZURE_WA_USERNAME}:${AZURE_WA_PASSWORD}@${AZURE_WA_SITE}.scm.azurewebsites.net:443/${AZURE_WA_SITE}.git"

git clone $gitRepo 

git config user.email "abc@abc.com"
git config user.name "travis deploy script"

cd ${AZURE_WA_SITE}
# remove old files inside the repo
rm -rf ${AZURE_WA_SITE}


# copy new files
cd ${AZURE_WA_SITE}
cp -r ../dist/. .
git add .
git commit -am"${gitCommitMessage}"

git push

echo === finished 

