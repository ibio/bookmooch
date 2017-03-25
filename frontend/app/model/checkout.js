import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

const STORAGE_CART 		= 'bookmooch-cart-items';

export default class Checkout extends ProxyModel{

	constructor(userData){
		var cartItems = Util.store(STORAGE_CART, null);
		super();
		this._userData = userData;
		//initial public data
		this.cartItemList = _.isArray(cartItems) ? cartItems : [];
		this.userOrderList = [];
	}

	/**
	 * product:
	 * <id>
	 * <price>
	 */
	addItem(product, silent){
		var newItem = true;
		//item {product, quantity, discount}
		this.cartItemList.forEach(function (item){
			//already exists
			//TODO: in the future, it needs to be use mixins as id
			if(item.product.id === product.id){
				item.quantity++;
				newItem = false;
				return;
			}
		});
		if(newItem){
			this.cartItemList.push({product:_.cloneDeep(product), quantity:1});
		}
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}
	}

	removeItem(index, silent){
		if(index >= 0 && index < this.cartItemList.length){
			this.cartItemList.splice(index, 1);
		}
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}
	}

	removeAll(silent){
		this.cartItemList = [];
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}	
	}

	updateItem(index, item, silent){
		if(this.cartItemList[index]){
			this.cartItemList[index] = _.cloneDeep(item);
		}
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}
	}

	saveOrder(cart, callback, scope){
		var requestData = {
			content:JSON.stringify(cart.productList),
			quantity:cart.quantity,
			grandTotal : cart.grandTotal,
			discountAmount : cart.discount,
			taxAmount: cart.tax,
		};
		// success
		this.post(Config.URL_SAVE_ORDER, requestData, this._userData.token, function(response){
			callback && callback.call(scope, response);
		// failed
		}, function(response){
			callback && callback.call(scope, response);
		}, this);
	}

	getOrder(silent, callback, scope){
		// success
		this.get(Config.URL_GET_ORDER, this._userData.token, function(response){
			this.userOrderList = response.data;
			if(!silent){
				this.notify();
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
	 _saveCheckoutItemList(){
		Util.store(STORAGE_CART, this.cartItemList);
	}

}
