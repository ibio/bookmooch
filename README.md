# bookmooch
An online bookstore prototype with multiple users login and JWT RESTful api implementation. 

* use scrapy to crawl worldcat book pages
* use php to show those book data
* Users can login (RESTful non-cookie)
* User can submit book orders

Online Demo: http://us.ypseek.com/labs/2017/bookmooch/


Test accounts:
* zhxm68@gmail.com zz
* kyoneda@fordham.edu abc123456
* ytan25@fordham.edu abc123456
* ken.yoneda92@gmail.com abc123456

Run locally
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
```

### python crawler
see python-worldcat/readme.txt for details

## Main features:
* ajax json api to get backend RESTful Data
* use Access-Control-Allow-Origin in .htaccess file to do cross-domain
* standard JWT RESTFul token API architecture
* scrapy for crawling web pages
* responsive design (mobile friendly)
* React JS single page application with MVC architecture 


### Browser Compatibility:
* Chrome: Version 56.0.2924.87 (64-bit)
* Safari: Version 10.0.3 (12602.4.8)
* Firefox: 51.0.1 (64-bit)
* iPHone 6


__NOTICE__: this is just a fullstack project for my course CISC6345 Advanced Database Systems. Also, BookMooch is an trademark, and here it's just for study purpose only. In this small project, I just developed it for demonstrating my ability 1) to learn new things very fast, and 2) my coding philosophy -- get it done, and then progressive enhancement. I used total around 30 hours to get this done.

