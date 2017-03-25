import _ from 'lodash';
import $ from 'jquery';
import Auth0Lock from 'auth0-lock'
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

const STORAGE_USER_DATA = 'bookmooch-auth-userdata';
const STORAGE_LAST_SESSION = 'bookmooch-auth-last-session';

// https://auth0.com/docs/quickstart/spa/react/01-login
export default class AuthModel extends ProxyModel {

	constructor() {
		super();
    this._loginCallback;
		// Configure Auth0
    // https://auth0.com/docs/libraries/lock/v10/customization

		// if you use redirect:false, it won't redirect so that it can trigger this._lock.on - authenticated
		// http://stackoverflow.com/questions/40075483/angular2-auth0-token-not-being-stored-when-using-options-in-auth0lock-object/43019535
    this._lock = new Auth0Lock(Config.CLIENT_ID, Config.DOMAIN, {
      autoclose: true,
      socialButtonStyle: 'small',
      auth: {
      	redirect:false,
      	// NOTICE: this callback url return like http://localhost:8080/#access_token=<...>
        // Also, you need to go to settings at Allowed Callback URLs, and put this url into it.
        // redirectUrl: 'http://localhost:8080/',
        responseType: 'token'
      }
    });
    // Add callback for lock `authenticated` event
    this._lock.on('authenticated', this._doAuthentication.bind(this));
	}

	isLogin(){
    const data = this.getUserData();
    return data.isLogin;
	}

	getUserData(){
		return Util.store(STORAGE_USER_DATA, null, true);
	}

	login(callback){
    this._loginCallback = callback;
    // Call the show method to display the widget.
    this._lock.show();
  }

  logout() {
    var userData = Util.store(STORAGE_USER_DATA, null, true);
    // NOTICE: it actually logouts from other providers not the auth0 itself.
    // see https://auth0.com/docs/logout
    // https://ibio.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A8080&client_id=a6yJXzbUOYO6o4jC1Ccqg3beJik4cQLg
    // Clear user token and profile data from local storage
    userData.isLogin = false;
    userData.token = null;
    Util.store(STORAGE_USER_DATA, userData, true);
  }

  setLastSession(data){
    var session = Util.store(STORAGE_LAST_SESSION, null, true);
    Util.store(STORAGE_LAST_SESSION, data, true);
  }

  getLastSession(){
    return Util.store(STORAGE_LAST_SESSION, null, true);
  }

	/*
	 * private methods
	 */
	_doAuthentication(authResult) {
    var userData = {};
		this._lock.getProfile(authResult.idToken, this._parseUserProfile.bind(this));
    // Saves the user token
    userData.token = authResult.idToken;
    userData.isLogin = true;
    Util.store(STORAGE_USER_DATA, userData, true);
    this._loginCallback && this._loginCallback();
  }

  _parseUserProfile(error, profile){
    var userData = Util.store(STORAGE_USER_DATA, null, true);
    if (error){
      console.log('Error loading the Profile', error);
    } else {
      // console.log(profile);
      userData.id = profile.user_id;
      userData.email = profile.email;
      userData.picture = profile.picture;
      userData.nickname = profile.nickname;
      Util.store(STORAGE_USER_DATA, userData, true);
    }
  }

}
