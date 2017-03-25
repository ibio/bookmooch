import _ from 'lodash';
import $ from 'jquery';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

const STORAGE_USER_DATA = 'auth-userdata';

export default class AuthModel extends ProxyModel {

	constructor() {
		super();
	}

	isLogin(){
		const data = this.getUserData();
		return data.isLogin;
	}

	getUserData(){
		return Util.store(STORAGE_USER_DATA, null, true);
	}

	// NOTICE: the token is subject to change on every login , store switch and shift start/stop
	login(email, password, callback, scope){
		var userData = Util.store(STORAGE_USER_DATA, null, true);
		var requestData = {
			email : email,
			password : password,
		};
		// console.log('login', Config.URL_LOGIN, requestData);
		// success
		this.post(Config.URL_LOGIN, requestData, userData.token, function(response, status, xhr){
			var userData = {};
			var temp = xhr.getResponseHeader('Authorization') || '';
			temp = temp.split(' ') || [];
			if(response.data){
				userData = response.data;
				userData.token = temp[1];
			}
			Util.store(STORAGE_USER_DATA, userData, true);
			callback && callback.call(scope, response);
		// failed
		}, function(response){
			callback && callback.call(scope, response);
		}, this);
	}

	logout(callback, scope){
		var userData = Util.store(STORAGE_USER_DATA, null, true);
		var requestData = {
			// email : userData.email,
			// password : userData.password,
		};
		// success
		this.post(Config.URL_LOGOUT, requestData, userData.token, function(response){
			if(response.data){
				userData.isLogin = false;
				userData.token = null;
				Util.store(STORAGE_USER_DATA, userData, true);
			}
			callback && callback.call(scope, response);
		// failed
		}, function(response){
			callback && callback.call(scope, response);
		}, this);
	}

	/*
	 * private methods
	 */
	

}
