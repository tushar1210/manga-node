# Manga
## A microservice for latest manga from various sources.

[![Heroku App Status](https://heroku-shields.herokuapp.com/manganode)](https://manganode.herokuapp.com)

## Services working :

```
- manga/0/hot-updates
- manga/0/latest-updates
- manga/0/get-all
- manga/0/search/?keyWord=<query>
```

## Sources:

`0:` https://mangasee123.com/


## POST api/signup

```curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com","password":"something"}' http://localhost:3000/api/signup```

## POST /api/login

```curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com","password":"something"}' http://localhost:3000/api/login```