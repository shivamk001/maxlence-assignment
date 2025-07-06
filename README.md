# maxlence assignment
## To Run Client and Server

### Step 1. Clone the repo
    git clone https://github.com/shivamk001/maxlence-assignment.git
    cd maxlence-assignment

### Step 2. Create env files 
    Server
        cd server
        touch env/prod.env

        Add the following in the env file:
            APP_PORT=8080
            NODE_ENV=dev
            JWT_KEY=some_secret
            MYSQL_DATABASE=your_db
            MYSQL_USERNAME=your_username
            MYSQL_PASSWORD=your_password
            MYSQL_HOST=your_host
            MAILER_USER=your_email
            MAILER_PASS=your_password
            BASE_URL=your_base_url
            CLIENT_URL=your_client_url

    Client:
        cd ../client
        touch env/prod.env

        Add the following in the env file:
            VITE_API_URL=your_server_url

### Step 3. Run Migrations
    cd server/migration
    npx sequelize-cli db:migrate

### Step 2. Run the Server
    cd ..
    nvm use 20
    npm i   
    npm run server

### Step 3. Run the Client
    cd ../client
    nvm use 20
    npm i
    npm run dev
