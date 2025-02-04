# big7backend

Repository for the Back-end Task.

# install the node modules with the below comand

npm install --force

# add an env file and add below variables

PORT // in which the api is going to run
DATABASE_URL // from supabase
SECRET_KEY // the secret key for the jwt token

# update the drizzle.config.json

inside the json file update the "connectionString" and "url" key of the postgresql url that we can find in the supabase application

# run the watch command to create dist

npx tsc -watch

# run the migration generate command

npm run migration:generate

# run the migration to create table

npm run migration:push

# run the application in separate terminal using

npm run start
