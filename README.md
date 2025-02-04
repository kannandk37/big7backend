# big7backend

Repository for the Back-end Task.

# install the node modules with the below comand

npm install --force

# add an env file and add below variables

PORT // in which the api is going to run if it port is not specified it will run on 3000
DATABASE_URL // from supabase database url
SECRET_KEY // the secret key for the jwt token

# update the drizzle.config.json

inside the json file update the "connectionString" and "url" key of the postgre supabase database url that we can find in the supabase application

# run the watch command in separate terminal using to create dist

npx tsc -watch

# run the migration generate command in separate terminal using

npm run migration:generate

# run the migration to create table in separate terminal using

npm run migration:push

# run the application in separate terminal using

npm run start
