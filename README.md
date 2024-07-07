# React + NestJS dockerized fullstack Typescript template

This template is based on Vite React Typescript default configuration for web and NestJS Typescript default configuration for server.

The point of this configuration is to keep api server and static server as separated services with own instances. To achieve that NestJS is used as API service and NGINX is used as statics and proxy server. 

### Additions for web (React):

- React-i18next (multi language support)
- TailwindCSS
- ESLint configuration adjustments
- /api/ requests proxy to independent server
- Dockerfile with NGINX configuration to support requests proxy and statics hosting

### Extra features added for NestJS

- ESLint configuration adjustments
- Dockerfile to build and run the server in container
- Husky and lint-staged pre-commit hooks configured with Prettier and ESLint

# How to setup
The best way to use this architecture is to initialize git repositories in all 3 folders (root as main, web and core as git submodules). With this more independence in version control for each service will be achieved.

# How to run
## Development
In this mode services are running in dev mode, independently and with HMR support.

0. Install dependencies for web and api services.
  ```
    cd template-web
    npm install
  ```
  ```
    cd template-core
    npm install
  ```
1. Run api service (NestJS): 
  ```
    cd template-core 
    npm run start:dev
  ```
2. Run web service (Vite): 
  ```
    cd template-web 
    npm run dev
  ```

## Production (or production mode testing)
### docker-compose
Run from root folder:
```
docker-compose up -d
```
This creates all containers and shared network for services to communicate and also sets ENV variables and checks if services are healthy. Check [docker-compose.yml](https://github.com/obozhe/fullstack-react-nestjs-dockerized-template/blob/main/docker-compose.yml) file for more details.

### Dockerfiles
Each service has its own Dockerfile that can be used to create independent service container instead of creating multi-container application with docker-compose.
