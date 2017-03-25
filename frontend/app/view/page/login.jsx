import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import AuthModel from 'model/auth';
import Header from 'view/component/header';
import Footer from 'view/component/footer';
import Style from 'style/login.scss';

export default class Login extends React.Component{
	constructor(props){
    super(props);
    this._authModel = new AuthModel();
		//instead of return in getInitialState 
		this.state = {
			tip : 'Please use the popup to login...'
		};
	}

	componentDidMount(){
		$(window).scrollTop(0);
		this._authModel.login(this._onLoginCallback.bind(this));
  }

  _onLoginCallback(){
  	var data = this._authModel.getLastSession();
  	var url = data.lastUrl;
  	// console.log(this._authModel.isLogin());
  	this.setState({tip:'Redirect to dashboard...'});
  	if(!url){
  		url = [Config.DIR_RULE, Config.NAV_DASHBOARD].join('/');
  	}
  	document.location.href = url;
  }

	render(){
		return(
			<div>
				<header><Header {...this.props} /></header>
				<main className="container login">
					<h2 className="auth0-title">{this.state.tip}</h2>
				</main>
				<footer ref="footer"><Footer {...this.props} /></footer>
			</div>
		);
	}

}
