

$ngEnvironment=prod

cd deploy

echo === start lightmessageservice
echo --- deploy lightmessageservice

cd lightmessageservice
git pull
rm -rf *
cp -r ../../API/ .
git add .
git commit -am"new deploy"
git push
cd ..

echo === finished lightmessageservice

echo

echo === start lightmessage
echo --- build lightmessage

cd ../UI
ng build --environment=$ngEnvironment
cd ../deploy

echo --- deploy lightmessage

cd lightmessage
git pull
rm -rf *
cp -r ../../UI/dist/ .
git add .
git commit -am"new deploy"
git push
cd ..

echo === finished lightmessage
