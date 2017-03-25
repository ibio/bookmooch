<?php
namespace application\router;
use org\weemvc\core\Router;
use org\weemvc\Pager;

class Auth0Order extends Router{
  
  public function save($uid){
    $this->_controller->prepareDatabase();
    if(!isset($_POST['grandTotal']) || !isset($_POST['content'])){
      Pager::output(998, 'grandTotal or content is null', null, $this);
    }else if(!$uid){
      Pager::output(998, 'you need to login', $userModel->error(), $this);
    }else{
      //get
      $model = $this->_controller->getDAO('OrderModel');
      if(isset($_POST['id'])){
        $result = $model->updateById($_POST['id'], $uid, $_POST['grandTotal'],$_POST['content']);
      }else{
        $result = $model->add($uid, $_POST['grandTotal'], $_POST['content']);
      }
      Pager::output(0, $result, $model->error(), $this);
    }
  }

  public function delete($uid){
    $this->_controller->prepareDatabase();
    if(!isset($_POST['id'])){
      Pager::output(998, 'id is null', null, $this);
    }else if(!$uid){
      Pager::output(998, 'you need to login', $userModel->error(), $this);
    }else{
      //get
      $model = $this->_controller->getDAO('ExpenseModel');
      $result = $model->deleteById($_POST['id'], $uid);
      Pager::output(0, $result, $model->error(), $this);
    }
  }

  public function getByUser($uid){
    $this->_controller->prepareDatabase();
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
