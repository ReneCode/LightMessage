
gitCommitMessage="travis CI"

echo === start azure deploy

gitRepo="https://${AZURE_WA_USERNAME}:${AZURE_WA_PASSWORD}@${AZURE_WA_SITE}.scm.azurewebsites.net:443/${AZURE_WA_SITE}.git"

git clone $gitRepo 

echo a1
cd ${AZURE_WA_SITE}
# remove old files inside the repo
rm -rf *

git config user.email "myself.r@eath.com"
git config user.name "travis deploy script"

git config --list

echo a2

# copy new files
cp -r ../dist/. .

echo a3
git add .

echo a4
git commit -am"${gitCommitMessage}"

echo a5
git push

cd ..


echo === finished azure deploy

