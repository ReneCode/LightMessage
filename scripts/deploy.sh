

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
cp -r API/ $deployFolder
cd $deployFolder
git add .
git commit -am"${gitCommitMessage}"
git push
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

