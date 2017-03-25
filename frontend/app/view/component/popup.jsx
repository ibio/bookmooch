import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import GameCanvas from 'view/popup/gamecanvas';
import Style from 'style/component/popup.scss';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this._onCallback;
    //
    this.state = {
      title : '',
      btnSubmit : '',
      btnCancel : '',
      windowSize : '',
      bodyName : null,
      paymentId : null
    };
  }

  componentDidMount(){
    // $(this.refs.modal).modal();
    $(this.refs.modal).on('hide.bs.modal', this._handleModalHide.bind(this));
  }

  componentWillUnmount(){
    $(this.refs.modal).modal('hide');
    $(this.refs.modal).off();
  }

  //windowSize: modal-lg, modal-sm
  show(title, bodyName, bodyParams, onCallback, btnSubmit = 'Confirm', btnCancel = 'Cancel', windowSize = ''){
    this._onCallback = onCallback;
    //for view change
    this.setState({title, bodyName, bodyParams, btnSubmit, btnCancel, windowSize});
    //pop up modal
    $(this.refs.modal).modal({backdrop: 'static'});
  }

  _handleSubmitClick(){
    // by default, for confirm window
    var data = this.state.bodyParams;
    if(this.state.bodyName){
      // NOTICE: getData needed in the body view component.
      data = this.refs.bodyView.getData();
    }
    // this method is for making sure the popup is all-set and ready to dismiss
    if(this.refs.bodyView.isReadyDismiss()){
      $(this.refs.modal).modal('hide');
      this._onCallback && this._onCallback(data);  
    }
  }

  _handleModalHide(){
    this.setState({bodyName: ''});
  }

	render(){
    var bodyView = '';
    switch (this.state.bodyName){
      case 'GameCanvas':
        bodyView = <GameCanvas {...this.state.bodyParams} onSave={this._handleSubmitClick.bind(this)} ref="bodyView" />;
        break;
        
    }
    //
    return(
			<div className="modal popup" tabIndex="-1" role="dialog" ref="modal">
        <div className={Classnames("modal-dialog", this.state.windowSize)} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.state.title}</h4>
            </div>
            <div className="modal-body">
              {bodyView}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.btnCancel}</button>
              <button type="button" className="btn btn-primary" onClick={this._handleSubmitClick.bind(this)}>{this.state.btnSubmit}</button>
            </div>
          </div>
        </div>
      </div>
		);
	}

}