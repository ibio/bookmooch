import React from 'react';
import ReactDOM from 'react-dom';
// https://github.com/flatiron/director/issues/349#issuecomment-286476621
import {Router} from 'director/build/director';
import Config from  'helper/config';
import Util from   'helper/util';
import AuthModel from 'model/auth';
import Home from 'view/page/home';
import Book from 'view/page/book';
import Search from 'view/page/search';
import Author from 'view/page/author';
import Login from 'view/page/login';
import Dashboard from 'view/page/dashboard';

var _router;
var _authoMode = new AuthModel();

function init(debug){
	var routes = {};
	var url;
	//https://github.com/flatiron/director#wildcard-routes
	routes['/((\w|.)*)'] = render.bind(this);
	_router = Router(routes);
	// default: home
	_router.init(['', Config.NAV_HOME].join('/'));
}

function render(){
	var obj = Util.getNav(Config.DIR_RULE + '/');
	var node = null;
	document.title = Config.MENU[obj.navs[0]];
	//
	switch(obj.navs[0]){
		case Config.NAV_HOME:
			node = <Home title={document.title} navs={obj.navs} nid={obj.nid} />;
			break;
		case Config.NAV_BOOK:
			if(obj.navs[1] === ''){
				document.location.href = [Config.DIR_RULE, Config.NAV_HOME].join('/');
			}else{
				node = <Book title={document.title} navs={obj.navs} nid={obj.nid} />;
			}
			break;
		case Config.NAV_SEARCH:
			node = <Search title={document.title} navs={obj.navs} nid={obj.nid} />;
			break;
		case Config.NAV_AUTHOR:
			node = <Author title={document.title} navs={obj.navs} nid={obj.nid} />;
			break;
		case Config.NAV_LOGIN:
			if(_authoMode.isLogin()){
				document.location.href = [Config.DIR_RULE, Config.NAV_DASHBOARD].join('/');
			}else{
				node = <Login title={document.title} navs={obj.navs} nid={obj.nid} />;
			}
			break;
		case Config.NAV_DASHBOARD:
			if(_authoMode.isLogin()){
				node = <Dashboard title={document.title} navs={obj.navs} nid={obj.nid} />;
			}else{
				document.location.href = [Config.DIR_RULE, Config.NAV_LOGIN].join('/');				
			}
			break;
		default:
			// default to home
			document.location.href = [Config.DIR_RULE, Config.NAV_HOME].join('/');
	}
	//
	if(node){
		ReactDOM.render(node, document.getElementById('app'));
	}
	
}


init();