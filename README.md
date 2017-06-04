# bookmooch
An online bookstore prototype with Auth0 login implementation. 

* use scrapy to crawl worldcat book pages
* use php to show those book data
* Users can login (auth0 integration)
* User can submit book orders

More: https://ibio.github.io/#/bookmooch


## Run locally
### frontend
```
git clone https://github.com/ibio/bookmooch.git
cd bookmooch/frontend
npm install
grunt (you may need to install grunt first)
```
Or use any local http server to visit it.

### backend
```
git clone https://github.com/ibio/expense-tracker.git
cd bookmooch/interface
composer install (you may need to install composer first)

php -S localhost:3001

curl --request GET \
  --url http://localhost:3001/book/get
```

### python crawler
see python-worldcat/readme.txt for details

## Main features
* ajax json api to get backend RESTful Data
* use Access-Control-Allow-Origin to do CORS
* auth0 login integration (standard JWT RESTFul token API architecture)
* scrapy for crawling web pages
* responsive design (mobile friendly)
* React JS single page application with MVC architecture 


### Browser Compatibility:
* Chrome: Version 56.0.2924.87 (64-bit)
* Safari: Version 10.0.3 (12602.4.8)
* Firefox: 51.0.1 (64-bit)
* iPHone 6


## About this hands-on project
__NOTICE__: this is a fullstack project for my course CISC6345 Advanced Database Systems. Also, BookMooch is an trademark, and here it's for study purpose only. In this small project, I just developed it for demonstrating my ability 1) to learn new things very fast, and 2) my coding philosophy -- get it done first, and then do progressive enhancement. 

### Developing time distribution
I used total around 38 hours to get this done.
* frontend: 12hr
* crawling: 6hr
* backend: 12hr
* auth0: 8hr

