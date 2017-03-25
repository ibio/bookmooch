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
			tip : ''
		};
	}

	componentDidMount(){
		$(window).scrollTop(0);
  }

  _handleLoginClick(e){
  	this.setState({tip: 'Waiting...'});
  	$('#btn-login').prop('disabled', true);
  	this._authModel.login($('#inputEmail').val(), $('#inputPassword').val(), function(response){
  		$('#btn-login').prop('disabled', false);
  		//
  		if(response.data && response.data.isLogin){
  			this.setState({tip: 'You have logged in successfully...'});
  			document.location.href = [Config.DIR_RULE, Config.NAV_DASHBOARD].join('/');
  		}else{
  			this.setState({tip: response.data.message});
  		}
  	}, this);
  }

	render(){
		
		return(
			<div>
				<header><Header {...this.props} /></header>
				<main className="container login">
					<div className="form-signin">
		        <h2 className="form-signin-heading">Please sign in</h2>
		        <label htmlFor="inputEmail" className="sr-only">Email address</label>
		        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
		        <label htmlFor="inputPassword" className="sr-only">Password</label>
		        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
		        <h4 className="text-center">{this.state.tip}</h4>
		        <button id="btn-login" className="btn btn-lg btn-primary btn-block" onClick={this._handleLoginClick.bind(this)} type="button">Login</button>
		      </div>
				</main>
				<footer ref="footer"><Footer {...this.props} /></footer>
			</div>
		);
	}

}
