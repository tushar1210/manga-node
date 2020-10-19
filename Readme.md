# Manga
## A microservice for latest manga from various sources.

[![Heroku App Status](https://heroku-shields.herokuapp.com/manganode)](https://manganode.herokuapp.com)

## Services working :

```
- manga/[source-index]/hot-updates
- manga/[source-index]/latest-updates
- manga/[source-index]/manga-data?chapterURL=<url>
- manga/[source-index]/search/?keyWord=<query>
- manga/[source-index]/chaps/<manga-name>

```

## Sources:

`0:` https://mangasee123.com/  
`1:` https://mangakakalot.com/


## POST /api/signup

```curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com","password":"something"}' http://localhost:3000/api/signup```

## POST /api/login

```curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com","password":"something"}' http://localhost:3000/api/login```