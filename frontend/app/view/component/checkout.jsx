import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Config from 'helper/config';
import Util from 'helper/util';
import Classnames from 'classnames';
import AuthModel from 'model/auth';
import CheckoutModel from 'model/checkout';
import StickySide from 'view/component/stickyside';
import Style from 'style/component/checkout.scss';

export default class Checkout extends StickySide{
  constructor(props) {
    super(props);
    this.setTopPoint(20, 60);
    this._authModel = new AuthModel();
    this._grandTotal = 0;
    this._checkoutModel = new CheckoutModel(this._authModel.getUserData());
    // this._checkoutModel.getPaymentMenthods();
    this._checkoutModel.subscribe(function(){
      this.setState({cartItemList : this._checkoutModel.cartItemList});
    }, this);
    this.state = {
      cartItemList : this._checkoutModel.cartItemList
    };
  }

  componentDidMount(){
    super.componentDidMount();
    // update cart to outside once initialized
    // this.props.onCartUpdate(this._getCartQuantity(), this._checkoutModel.cartItemList);
  }

  // for outside call
  emptyCart(){
    this._checkoutModel.removeAll();
  }

  // for outside call
  updateCart(index, product){
    const self = this;
    var productIndex;
    if(index >= 0){
      this._checkoutModel.updateItem(index, product);
    }else{
      this._checkoutModel.addItem(product);
    }
    //
    productIndex = _.findIndex(this._checkoutModel.cartItemList, function(item){return item.product.id === product.id});
    setTimeout(function(){
      var $element = $(self.refs.stickySide).find('.dot').eq(productIndex);
      // play addition animation
      $element.addClass('dot-out');
    }, 10);
  }

  _getCartQuantity(){
    var totalItems = 0;
    this._checkoutModel.cartItemList.forEach(function(item){
      totalItems += item.quantity;
    }, this);
    return totalItems;
  }

  _handleItemClick(item, index, e){
    //remove btn
    if($(e.target).hasClass('btn-remove')){
      // this.props.onItemRemove(index);
      this._checkoutModel.removeItem(index);
    }else{
      this._checkoutModel.updateItem(index, item);
    }
  }

  _handleCheckoutClick(e){
    if(this._authModel.isLogin()){
      if(this.state.cartItemList.length > 0){
        this._checkoutModel.saveOrder({productList:this.state.cartItemList, grandTotal:this._grandTotal, quantity:this._getCartQuantity()}, function(response){
          if(response.data){
            this.emptyCart();
            document.location.href = [Config.DIR_RULE, Config.NAV_DASHBOARD].join('/');
          }else{
            console.log(response);
          }
        }, this);
      }
    }else{
      document.location.href = [Config.DIR_RULE, Config.NAV_LOGIN].join('/');
    }
  }

	render(){
    var btnView;
    var subAmount = 0;
    var checkoutItemListView = this.state.cartItemList.map(function (item, index) {
      const quantity = item.quantity > 9 ? item.quantity : '0' + item.quantity;
      subAmount += item.product.price * item.quantity;
      //
      return(
        <h3 key={Util.uuid()} className="item" title={item.product.title} onClick={this._handleItemClick.bind(this, item, index)}>
          <div className="dot"><span>{quantity}X</span></div>
          <span>{quantity}X</span>
          <b className="ellipsis item-title">{item.product.title}</b>
          <em>{item.product.price}</em>
          <button type="button" className="btn btn-remove" aria-label="Remove">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </h3>
      )
    }, this);

    // round
    subAmount = Util.roundNumber(subAmount);
    // TODO: add tax, discount and shipping fees ...
    this._grandTotal = subAmount;
    // if it's empty
    if(this.state.cartItemList.length === 0){
      checkoutItemListView = (<img src="res/shopping-cart.jpg" className="img-responsive" alt={this.props.name} />);
    }

    //
    if(this._authModel.isLogin()){
      btnView = 'Checkout';
    }else{
      btnView = 'Login to checkout';
    }
    //
    return(
			<div className="stickyside checkout" ref="stickySide">
        <h2 className="cart-title">Cart</h2>
        <section className="item-list">
          {checkoutItemListView}
        </section>
        <footer>
          <h5>Subtotal: <b>${subAmount}</b></h5>
        </footer>
        <button className="btn btn-primary btn-block btn-checkout" onClick={this._handleCheckoutClick.bind(this)}>{btnView}</button>
      </div>
		);
	}

}