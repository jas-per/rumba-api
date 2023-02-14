# rumba-api

Interactive Api documentation for the [rum.ba](https://rum.ba) jukebox server. Similar to [swagger](https://swagger.io/tools/swagger-ui/) but a bit more specialized in testing a jukebox and the idiosyncrasies of the [Subsonic Api](http://www.subsonic.org/pages/api.jsp).

<p align="center">
<img src="https://jas-per.github.io/rum.ba/raw/posts/210504-apidocs/rumba-api-help.jpg" alt="api with help text" style="width:640px;align:center;"/>
</p>

The whole thing got a bit over the top - there was an older rum.ba webapp that needs porting from react 13/alt.js flux and the idea was to try a new stack on a small project first ;) quite happy with preact hooks and mobx-state-tree - the new rum.ba webapp should be ready later this summer!

<p align="center">
<img src="https://jas-per.github.io/rum.ba/raw/posts/210504-apidocs/rumba-api-player.jpg" alt="api with video player" style="width:640px;align:center;"/>
</p>

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build at localhost:8080
npm run serve

# run linter
npm run lint
```

## ToDo

integrate response schema for reference as well
