//
//output
var data = {};
const _info = window.config || {};

data.ROOT = _info.root;
data.HOME = _info.home;
data.STATIC_ROOT = _info.staticRoot;
data.FEATURED_TAG = _info.featuredTag;
data.IS_LOCALSHOT = data.ROOT === '';

data.URL_LATEST_BOOKS = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=book&action=get_latest';
data.URL_BOOKS = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=book&action=get';
data.URL_GET_BOOK = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=book&action=get_by_id';
data.URL_SEARCH_BOOKS = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=book&action=search';
data.URL_LOGIN = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=auth&action=login';
data.URL_LOGOUT = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=auth&action=logout';
data.URL_SAVE_ORDER = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=order&action=save';
data.URL_GET_ORDER = data.IS_LOCALSHOT ? 'res/posts.json' : data.ROOT + '?controller=order&action=get_by_user';


data.DIR_RULE = '#';

data.NAV_LOGIN 			= 'login';
data.NAV_DASHBOARD 	= 'dashboard';

// first nav
data.NAV_HOME 			= 'home';
data.NAV_BOOK 			= 'book';
data.NAV_SEARCH 		= 'search';

data.SECOND_NAV = {};


// menu text mapping
data.MENU = {};
data.MENU[data.NAV_HOME] 				= 'Home - BookMooch';
data.MENU[data.NAV_BOOK]				= 'Article - BookMooch';
data.MENU[data.NAV_SEARCH]			= 'Search - BookMooch';
data.MENU[data.NAV_LOGIN]				= 'Login - BookMooch';
data.MENU[data.NAV_DASHBOARD]		= 'Dashboard - BookMooch';



export default data;
