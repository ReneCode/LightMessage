
gitCommitMessage="travis-deploy"

echo === start azure deploy

gitRepo="https://${AZURE_WA_USERNAME}:${AZURE_WA_PASSWORD}@${AZURE_WA_SITE}.scm.azurewebsites.net:443/${AZURE_WA_SITE}.git"

git clone $gitRepo 

git config user.email "langner.r@eplan.de"
git config user.name "travis deploy script"

cd ${AZURE_WA_SITE}
# remove old files inside the repo
rm -rf *


# copy new files
cp -r ../dist/. .
git add .
git commit -am"${gitCommitMessage}"
git push

cd ..


echo === finished azure deploy

