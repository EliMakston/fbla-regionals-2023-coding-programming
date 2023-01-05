# fbla-regionals-2023-coding-programming

- [Installation](#installation)
- [API](#api)
- [Web App](#web-app)

## Installation

If you are already familiar with and have the command line, node, and npm installed, feel free to skip to the [Start the Server](#4-start-the-server) section. If not, continue reading below.

This installation will use the command line. To access the command line on your machine, look for and launch an application named "Terminal", "Console", "Konsole", "Command Prompt" or something similar.

### 1. Install Node Version Manager

To install Node and npm, we will use a script to make the process easier. Install the script using the command below.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### 2. Installing Node using nvm 

Using the nvm script, we can now install the latest version of Node with the following command.

```
nvm install node
```

*If the terminal returns an error, try reopening the console application and inputting the command again.*

### 3. Downloading the repository

Using git, clone this repository to your machine.

```
git clone https://github.com/mackrusing/fbla-regionals-2023-coding-programming.git
```

Now, move into the newly created folder "fbla-regionals-2023-coding-programming.git" with the `cd` command.

```
cd fbla-regionals-2023-coding-programming
```


### 4. Start the Server

Once installed and in the project directory, use the command below to start the server.

```
npm start
```

While running in development, the API and Web App are hosted on
http://localhost:3000/api and http://localhost:3000/app respectivly.

## API

The API consists of all the logic for creating, reading, updating, and deleting application data. It handles the validation, reading, and writing of student and event data stored in json files.

By default, the API is avalible on http://localhost:3000/api.

### Endpoints

|                  | GET | POST | PUT | PATCH | DELETE |
|------------------|-----|------|-----|-------|--------|
| /api/students    | ✓   | ✓    | ✗   | ✗     | ✗      |
| /api/events      | ✓   | ✓    | ✗   | ✗     | ✗      |
| /api/logActivity | ✗   | ✓    | ✗   | ✗     | ✗      |

For a complete overview of the API's functionality and a list of it's endpoints, check the [API Docs](./api/docs/index.md). 

## Web App

The Web Application gives administrators and students an easy way to track
participation in school events. The application consists of forms (for adding students, events, and completed activities) and reports of all students and events.

By default, it is avalible on http://localhost:3000/app.

### Site Map

-   [/app](http://localhost:3000/app): home page
-   [/app/admin](http://localhost:3000/app/admin): page for administrators to
    add students, add events, and log completed activities
-   [/app/events](http://localhost:3000/app/events): a complete list of all
    events
-   [/app/students](http://localhost:3000/app/students): a complete report of
    students and their logged points, organized by grade
