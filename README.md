# iamone v2

Nuxt 3 based web application for iamone platform

### Requirements
You need to install [Node.js 18](https://nodejs.org/en/download) in your system.

### Setup
Firstly clone repository into local system
```
git clone https://github.com/rajatxs/iamone-app-v2.git iamone-app
```

Change the current directory
```sh
cd iamone-app
```

Install required dependencies
```
npm install
```
or 
```
yarn install
```

Add a **.env** new file in the root of the project, and add the following variables to it
```sh
# iamone API URL (https://github.com/rajatxs/iamone-core)
VITE_APP_API_URL="<API URL>"
```

Start development server using following command
```
npm run dev
```
or 
```
yarn dev
```
