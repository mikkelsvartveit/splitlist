# Splitlist

Splitlist is the fastest way to create, share and collaborate on to-do lists, shopping lists and more.

Visit website here: [splitlist.mikkelsvartveit.com](https://splitlist.mikkelsvartveit.com)

![Splitlist screen dump](https://imagehost.imageupload.net/2020/04/10/screenshot.png)

## What is Splitlist?

Splitlist is a web app that lets you create lists with the click of a button. After creating a list, you can share it with your friends, family members or coworkers. Anyone with the link can create and edit items on the list. The list is updated in real time, and changes you make will sync instantly and appear on all other devices in about a second. No need to refresh!

### Features

- No registration required
- Create lists with a single click
- Syncs instantly and automatically
- View and edit lists on your phone, tablet or computer
- Drag & drop to reorder list items
- Full-fledged dark mode

## Setup

If you want to check out the code for yourself, follow these instructions:

### 1. Clone the repository: 

Clone the repository to the **web root directory** of your web server. This folder is often called `htdocs` or `www`.

You can do this by running this command in your web root directory:

```
git clone https://github.com/mikkelsvartveit/splitlist.git .
```

### 2. Set up SQL database

Create a new database with `utf8mb4_unicode_ci` collation (or use an existing one) and run the SQL script located at config/splitlist.sql on the database. 

### 3. Set up MySQL config file

Create a new directory called `private` in the **parent directory** of the web root. Copy the file `config/db_config.ini` to the `private` directory you just created. Open the file with a text editor and input your MySQL credentials there. 

You can do this by running these commands in the web root directory:

```
mkdir ../private
cp config/db_config.ini ../private/db_config.ini
nano ../private/db_config.ini
```

To give you an idea, my `db_config.ini` file looks like this:

```
servername=localhost
username=root
password=root
dbname=splitlist
```

## Resources

- [SortableJS](https://github.com/SortableJS/Sortable) - JavaScript library for drag-and-drop sorting of HTML elements
- [Google Material Icons](https://material.io/resources/icons/) - collection of icons for UI elements
- [Open Sans](https://fonts.google.com/specimen/Open+Sans) - web font