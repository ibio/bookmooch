import _ from 'lodash';
import $ from 'jquery';
import Util from 'helper/util';
import Config from 'helper/config';
import BaseModel from 'model/base';

export default class ProxyModel extends BaseModel {

	constructor() {
		super();
	}

	put(url, data, token, success, failer, scope){
		const settings = {
			type : 'PUT',
			url : url,
		  beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			data: data,
		};
		this._send(settings, success, failer, scope);
	}

	delete(url, token, success, failer, scope){
		const settings = {
			type : 'DELETE',
			url : url,
		  beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
		};
		this._send(settings, success, failer, scope);
	}

	get(url, token, success, failer, scope){
		const settings = {
			type : 'GET',
			url : url,
		  beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			}
		};
		this._send(settings, success, failer, scope);
	}

	post(url, data, token, success, failer, scope){
		const settings = {
			type : 'POST',
			url : url,
		  beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			data: data,
		};
		this._send(settings, success, failer, scope);
	}

	_send(params, success, failer, scope){
		var settings = Util.clone(params);
		// http://api.jquery.com/jquery.ajax/
		// settings.contentType = 'application/json; charset=utf-8';
		// settings.dataType = 'json';
		// settings.withCredentials  = true;
		settings.complete = function(jqXHR, textStatus){
			var obj = JSON.parse(jqXHR.responseText);
			// 10.2 Successful 2xx
			// see https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
			if(jqXHR.readyState === 4 && jqXHR.status >= 200 && jqXHR.status < 300){
				success && success.call(scope, obj, textStatus, jqXHR);
			}else{
				failer && failer.call(scope, obj, textStatus, jqXHR);
			}
		};
		//
		$.ajax(settings);
	}

}
