

gitUsername=$1
gitPassword=$2

gitCommitMessage="travis-deploy"

ngEnvironment=prod
deployFolder=deploy

gitRepo="lightmessageservice.scm.azurewebsites.net:443/lightmessageservice.git"


echo === start lightmessageservice
echo --- deploy lightmessageservice


gitRepo="https://${gitUsername}:${gitPassword}@${gitRepo}"

git clone $gitRepo $deployFolder

#git config user.email "abc@travis.com"
#git config user.name "travis deploy script"

cd $deployFolder
# remove old files inside the repo
rm -rf *

# copy new files
echo copy API
ls -na ../API/
cp -r ../API/ .
ls -na
#git add .
#git commit -am"${gitCommitMessage}"
#git status

#git push
cd ..


#cd lightmessageservice
#git pull
#rm -rf *
#cp -r ../../API/ .
#git add .
#git commit -am"new deploy"
#git push
#cd ..

echo === finished lightmessageservice

