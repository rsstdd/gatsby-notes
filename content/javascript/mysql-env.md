---
title: "Setting MySQL Environment Mac OSX"
cover: "https://s3.amazonaws.com/rsstdd-portfolio/bierdstadt.png"
date: "02/02/2018"
category: "tech"
tags:
    - programming
    - mysql
    - mac osx
---

# Setting MySQL Environment Mac OSX

1. Install MySQL with Homebrew:
```bash
brew install mysql
```

2. Fix Path (if on Zsh):
```bash
atom ~/.zshrc
```

In .zshrc:
```bash
export MYSQL_PATH=/usr/local/Cellar/mysql/5.6.27
export PATH=$PATH:$MYSQL_PATH/bin
```

3. Start Service w/Homebrew:
brew services start mysql

MySQL REPL:
```bash
mysql -u root -p
```

4. Create DB:
```bash
CREATE DATABASE hummingtree_backend_dev;
```

5. Create Dev User:
```bash
CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'dev_user_password';
```

6. Grant Permissions:
```bash
GRANT ALL PRIVILEGES ON * . * TO 'dev_user'@'localhost';
```

7. Migrate Tables: (from hummingtree root dir )
npm run knex --knexfile=./api/knex/knexfile.js migrate:latest

8. Seed DB:
```bash
npm run knex --knexfile=./api/knex/knexfile.js seed:run
```


## In the event that you need to uninstall MySQL completely:

* Open the Terminal:
* Use mysqldump to backup your databases
* Check for MySQL processes with: `ps -ax | grep mysql`
* Stop and kill any MySQL processes
* Analyze MySQL on HomeBrew:

```bash
$ brew remove mysql
$ brew cleanup
```
* Remove the following files:
```bash
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/var/mysql
sudo rm -rf /usr/local/mysql*
sudo rm ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
```
* Unload previous MySQL Auto-Login:
```bash
launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```
* Remove previous MySQL Configuration:
* Remove previous MySQL Preferences:
```bash
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
```
* Restart your computer just to ensure any MySQL processes are killed. Try to run mysql, it shouldn't work.
