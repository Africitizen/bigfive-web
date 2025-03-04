# bigfive-web

<img src="https://github.com/rubynor/bigfive-web/blob/master/static/icon.png?raw=true" width="160" height="160" alt="Bigfive logo" align="right">

Prod: https://hypatie.africitizen.co

Website for five factor model of personality based on work from [IPIP-NEO-PI](https://github.com/kholia/IPIP-NEO-PI).

Tests and evaluation is gathered from [ipip.ori.org](http://ipip.ori.org).

See it live @ [hypatie.africitizen.co](https://hypatie.africitizen.co)

The frontend is written in [nodejs](https://nodejs.org) using the
[Nuxt.js](https://nuxtjs.org/) framework.

## Preview

![Preview](https://media4.giphy.com/media/MWsRzFD3hrsXi9tKzu/giphy.gif)

## Installation

Download and install [nodejs](https://nodejs.org),
[git](https://git-scm.com/downloads) and [vercel-cli](https://vercel.com/download)

Make sure nodejs version is equal or greater than 12

The results are saved to a [mongodb](https://www.mongodb.com/) database, so for a full test you either need a running mongodb or an instance at [mlab](https://mlab.com/)

## Development

add .env file

```
MONGODB_URI=mongodb://<your-mongodb-url>
MONGODB_COLLECTION=results
BASE_URL=http://localhost:3000
```
Run the setup script to install all dependencies

```
yarn run setup
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Run your unit tests
```
yarn test
```

### Lint

```
yarn lint
yarn lintfix
```

## Deploy using [vercel-cli](https://vercel.com/download)

Add a secret with the mongodb connection. Example:
```
vc secrets add mongodb_uri mongodb://<username>:<password>@domain.com:53659/bigfive
```

Update [now.json](now.json) to match your environment.
You will need to change the properties `scope`, `alias` and `env.BASE_URL`

Update [nuxt.config.js](nuxt.config.js) to match your environment.
You will need to change the `base_url` and `env.API_URL` and the ids for analytics and amplitude.

Run to deploy
```
vc --confirm
```

## Deploy using [Docker Compose](https://docs.docker.com/compose/)

```bash
cd docker
docker-compose up
```

## Related

- [b5-johnson-120-ipip-neo-pi-r](https://github.com/Alheimsins/b5-johnson-120-ipip-neo-pi-r) - Module for returning Big Five [Johnson 120 IPIP-NEO-PI-R](http://ipip.ori.org/30FacetNEO-PI-RItems.htm) items
- [b5-result-text](https://github.com/Alheimsins/b5-result-text) - Text for big five results score generated by b5-calculate-score
- [bigfive-calculate-score](https://github.com/Alheimsins/bigfive-calculate-score) - Calculate score for big five tests
- [b5-translation-web](https://github.com/Alheimsins/b5-translation-web) - Translate without using GitHub

## Help wanted

If you want to help by translating the items to other languages [this](https://github.com/Alheimsins/b5-johnson-120-ipip-neo-pi-r/blob/master/README.md#help-wanted) is how you do it.

## License

[MIT](LICENSE)

## About

TODO
