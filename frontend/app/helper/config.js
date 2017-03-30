//
//output
var data = {};
const _info = window.config || {};

data.ROOT = _info.root;
data.HOME = _info.home;
data.STATIC_ROOT = _info.staticRoot;
data.FEATURED_TAG = _info.featuredTag;
data.IS_LOCALSHOT = data.ROOT === '';
data.CLIENT_ID = 'a6yJXzbUOYO6o4jC1Ccqg3beJik4cQLg';
data.DOMAIN = 'ibio.auth0.com';

data.URL_LATEST_BOOKS = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/book/get_latest';
data.URL_BOOKS = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/book/get';
data.URL_GET_BOOK = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/book/get_by_id';
data.URL_SEARCH_BOOKS = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/book/search';
data.URL_SEARCH_BOOKS_BY_TAG = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/book/search_by_tag';
data.URL_SEARCH_BOOKS_BY_AUTHOR = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/book/search_by_author';
data.URL_SAVE_ORDER = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/secured/order/save';
data.URL_GET_ORDER = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '/secured/order/get_by_user';

data.DIR_RULE = '#';

data.NAV_LOGIN 			= 'login';
data.NAV_DASHBOARD 	= 'dashboard';

// first nav
data.NAV_HOME 			= 'home';
data.NAV_BOOK 			= 'book';
data.NAV_SEARCH 		= 'search';
data.NAV_AUTHOR 		= 'author';

data.SECOND_NAV = {};


// menu text mapping
data.MENU = {};
data.MENU[data.NAV_HOME] 				= 'Home - BookMooch';
data.MENU[data.NAV_BOOK]				= 'Article - BookMooch';
data.MENU[data.NAV_SEARCH]			= 'Search - BookMooch';
data.MENU[data.NAV_AUTHOR]			= 'Author - BookMooch';
data.MENU[data.NAV_LOGIN]				= 'Login - BookMooch';
data.MENU[data.NAV_DASHBOARD]		= 'Dashboard - BookMooch';



export default data;
