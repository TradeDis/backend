echo
echo
echo "Compiling..."
yarn compile

echo "Configuring..."
echo
echo "Setting the Heroku variables"
heroku config:set \
  NODE_ENV="production" \
  MONGODB_URI="mongodb+srv://tradedis:tradedis2020@cluster0.ieu4n.mongodb.net/development?retryWrites=true&w=majority" \
  -a "tradis"

echo
echo "Pushing.."
git add .
git commit -m "chore: build"
git push heroku feat/push_noti:main



