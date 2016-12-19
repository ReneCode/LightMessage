
cp ./toazure.sh ../..

$ngEnvironment=prod

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

pwd

echo ===start lightmessage
echo --- build lightmessage

cd ../UI
ng build --environment=$ngEnvironment
cd ../deploy

