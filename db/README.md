INSTALL:
    sudo apt update
    sudo apt install mysql-server
VERIFY
    mysql -v
START
    sudo systemctl start mysql
SECURE INSTALLATION
    sudo mysql_secure_installation
ACCESS MYSQL CLI
    sudo mysql
