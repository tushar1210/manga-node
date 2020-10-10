[manga](README.md) › [Globals](globals.md)

# manga

# Manga
## A microservice for latest manga from various sources.

[![Heroku App Status](https://heroku-shields.herokuapp.com/manganode)](https://manganode.herokuapp.com)

## Services working :

```
- manga/0/hot-updates
- manga/0/latest-updates
- manga/0/manga-data?chapterURL=<url>
- manga/0/search/?keyWord=<query>
- manga/0/chaps/<manga-name>
- manga/1/hot-updates
```

## Sources:

`0:` https://mangasee123.com/
`1:` https://mangakakalot.com/

## POST /api/signup

```curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com","password":"something"}' http://localhost:3000/api/signup```

## POST /api/login

```curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com","password":"something"}' http://localhost:3000/api/login```
