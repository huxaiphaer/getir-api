[![Build Status](https://travis-ci.com/huxaiphaer/getir-api.svg?branch=develop)](https://travis-ci.com/huxaiphaer/getir-api)

# GETIR API
 
### Requirements/Tools used for this Project :
1. Node.js
2. Express
3. Eslint
4. MongoDB
5. Travis (CI/CD)
6. Mocha & Chai
7. Heroku


## Installation.

1. First clone the project with the command below :

```
https://github.com/huxaiphaer/getir-api.git
```

2. Add the following variables in your `.env` file, create one in the root folder.

```
MONGODB_URL
PORT
```

3. Then run the project after setting all the above.

```
npm run start
```

After running the command , then test the endpoint below with the port number you configured e.g :

```
http://localhost:8090/v1/api/data
```

The above endpoint uses a **POST** method.

### Accessing the heroku link :

This is where the api is hosted

```
https://getir-app-huxy.herokuapp.com
```

and below are the remote endpoints :

| HTTP Method   | End Point               | Action          |
| ------------- | ---------------------   |-----------------|
| POST          | /v1/api/data            |Filter Records   |
| GET          | /v1/api/allData          |Get all Records   |

### Run tests locally.

Running the tests of the project :

```
npm test
```

### Contributors.

* [Lutaaya Idris](https://github.com/huxaiphaer)