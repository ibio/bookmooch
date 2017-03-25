<?php
namespace application\router;
use org\weemvc\core\Router;
use org\weemvc\Pager;
use application\helper\HeaderFinder;

class Order extends Router{
  
  public function save($get, $post){
    $this->_controller->prepareDatabase();
    $userModel = $this->_controller->getDAO('UserModel');
    $token = HeaderFinder::token(HeaderFinder::get('Authorization'));
    $uid = $userModel->check($token);
    if(!isset($post['grandTotal']) || !isset($post['content'])){
      Pager::output(998, 'grandTotal or content is null', null, $this);
    }else if(!$uid){
      Pager::output(998, 'you need to login', $userModel->error(), $this);
    }else{
      //get
      $model = $this->_controller->getDAO('OrderModel');
      if(isset($post['id'])){
        $result = $model->updateById($post['id'], $uid, $post['grandTotal'],$post['content']);
      }else{
        $result = $model->add($uid,$post['grandTotal'],$post['content']);
      }
      Pager::output(0, $result, $model->error(), $this);
    }
  }

  public function delete($get, $post){
    $this->_controller->prepareDatabase();
    $userModel = $this->_controller->getDAO('UserModel');
    $token = HeaderFinder::token(HeaderFinder::get('Authorization'));
    $uid = $userModel->check($token);
    if(!isset($post['id'])){
      Pager::output(998, 'id is null', null, $this);
    }else if(!$uid){
      Pager::output(998, 'you need to login', $userModel->error(), $this);
    }else{
      //get
      $model = $this->_controller->getDAO('ExpenseModel');
      $result = $model->deleteById($post['id'], $uid);
      Pager::output(0, $result, $model->error(), $this);
    }
  }

  public function getByUser($get, $post){
    $this->_controller->prepareDatabase();
    $userModel = $this->_controller->getDAO('UserModel');
    $token = HeaderFinder::token(HeaderFinder::get('Authorization'));
    $uid = $userModel->check($token);
    //
    if(!$uid){
      Pager::output(998, 'you need to login', $userModel->error(), $this);
    }else{
      $model = $this->_controller->getDAO('OrderModel');
      $result = $model->getByUid($uid);
      Pager::output(0, $result, $model->error(), $this);  
    }
  }

}
