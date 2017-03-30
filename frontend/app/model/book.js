import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

// http://us.ypseek.com/labs/2017/bookmooch/interface/?controller=book&action=get
export default class BookModel extends ProxyModel {

	constructor(userData) {
		super();
		// public
		this.latestBookList = [];
		this.latestBooks = 0;
		this.latestBookPages = 0;
		// TODO: this name needs to change
		this.authorBookList = [];
		this.authorBooks = 0;
		this.authorBookPages = 0;
		this.bookDetail = {};
	}

	getLatestBookList(limit, silent, callback, scope){
		const url = Config.URL_LATEST_BOOKS + '?length=' + limit;
		this.get(url, null, function(response){
			response = response || {};
			this.latestBookList = this._createBookList(response.data);
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}, function(response){
			// "status":false,"code":401,
		}, this);
	}

	// NOTICE: start starts from 0; page start from 1
	getBookList(limit, page, silent, callback, scope){
		const start = (page - 1) * limit;
		const url = Config.URL_BOOKS + '?length=' + limit + '&start=' + start;
		this.get(url, null, function(response){
			var list;
			response = response || {};
			list = response.list || [];
			this.latestBookList = this._createBookList(list);
			this.latestBookPages = response.totalPages;
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}, function(response){
			// "status":false,"code":401,
		}, this);
	}

	searchBookList(keyword, limit, page, silent, callback, scope){
		const start = (page - 1) * limit;
		const url = Config.URL_SEARCH_BOOKS + '?keyword=' + keyword + '&length=' + limit + '&start=' + start;
		this.get(url, null, function(response) {
			var data, list;
			response = response || {};
			data = response.data || {};
			list = data.list || [];
			this.latestBookList = this._createBookList(list);
			this.latestBooks = data.totalItems || 0;
			this.latestBookPages = data.totalPages || 0;
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}, function(response){
			// "status":false,"code":401,
		}, this);
	}

	searchBookListByTag(tag, limit, page, silent, callback, scope){
		const start = (page - 1) * limit;
		const url = Config.URL_SEARCH_BOOKS_BY_TAG + '?tag=' + tag + '&length=' + limit + '&start=' + start;
		this.get(url, null, function(response) {
			var data, list;
			response = response || {};
			data = response.data || {};
			list = data.list || [];
			// ...
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}, function(response){
			// "status":false,"code":401,
		}, this);
	}

	searchBookListByAuthor(author, limit, page, silent, callback, scope){
		const start = (page - 1) * limit;
		const url = Config.URL_SEARCH_BOOKS_BY_AUTHOR + '?author=' + author + '&length=' + limit + '&start=' + start;
		this.get(url, null, function(response){
			var data, list;
			response = response || {};
			data = response.data || {};
			list = data.list || [];
			this.authorBookList = this._createBookList(list);
			this.authorBooks = data.totalItems || 0;
			this.authorBookPages = data.totalPages || 0;
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}, function(response){
			// "status":false,"code":401,
		}, this);
	}

	getBookDetail(id, silent, callback, scope){
		const url = Config.URL_GET_BOOK + '?id=' + id;
		this.get(url, null, function(response) {
			var list;
			response = response || {};
			list = response.data || [];
			this.bookDetail = this._createBook(list[0] || {});
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}, function(response){
			// "status":false,"code":401,
		}, this);
	}

	/*
	 * private methods
	 */
	_createBookList(list){
		var results = [];
		// filter out 0-item category
		list.forEach(function(item, index){
			results.push(this._createBook(item));
		}, this);
		return results;
	}

	_createBook(obj){
		// empty
		// http://coverart.oclc.org/ImageWebSvc/oclc/+-+260225879_140.jpg%3FSearchOrder=+-+OT,OS,TN,GO,FA
		// this actually doesn't work because every empty picture is different.		
		if(obj.cover && obj.cover.indexOf('78652657_140.jpg') > -1){
			obj.cover = Config.STATIC_ROOT + '/res/empty.jpg';
		}
		//
		return obj;
	}
}
