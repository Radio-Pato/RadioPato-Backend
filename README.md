# RadioPato-Backend

Web application to manage the community of neighbors

This project will hold all the packages for the backend.

## Structure of Project

### Schema

```text
/
| api
| | controllers
| |  |--users.controller.js
| | middlewares
| |  |--authenticated.js
| | models
| |  |--users.models.js
| | routes
| |  |--users.routes.js
| index.js
| server.js
| package.json
| package-lock.json
```

## Directories

**Note**: the files .js on schema are examples

### `/`

"`/`" is the root of project and only contain `four files` and `api` directory:

- `index.js` contain configurations about conections with database server and general configurations

- `app.js` contain configurations of node express and imports of routes
- `package.json and package-lock.json` both containt scripts and informations about dependencies and libraries.

### `api`

"`api`" is the directory where is a majority of configurations of project containe three folders:

- `controllers` contains files where the code for database actions such as getting users is written.

- `middelwares` contain files with configurations necessary between controllers and database such as autentications

- `routes` containe all files of configuration of routes
