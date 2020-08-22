[![Build Status](https://travis-ci.com/huxaiphaer/getir-api.svg?branch=master)](https://travis-ci.com/huxaiphaer/getir-api)

# GETIR API
 
### Requirements for this Project :
1. Node.js
2. Eslint
3. Mongo DB

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


### Run tests locally.

Running the tests of the project :

```
npm run test
```
Running with coverage :

```
npm run coverage
```

### Contributors.

* [Lutaaya Idris](https://github.com/huxaiphaer)