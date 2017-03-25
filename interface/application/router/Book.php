<?php
namespace application\router;
use org\weemvc\core\Router as Router;
use org\weemvc\Pager as Pager;

class Book extends Router{

  public function getById($get, $post){
    $this->_controller->prepareDatabase();
    $model = $this->_controller->getDAO('BookModel');
    // getLatest
    Pager::output(0, $model->getById($get['id']), $model->error(), $this);
  }

  public function getLatest($get, $post){
    $this->_controller->prepareDatabase();
    $length = $this->getLength($get['length']);
    $model = $this->_controller->getDAO('BookModel');
    // getLatest
    Pager::output(0, $model->getLatest($length), $model->error(), $this);
  }

  public function get($get, $post){
    $this->_controller->prepareDatabase();
    $start = $this->getStart($get['start']);
    $length = $this->getLength($get['length']);
    //
    $model = $this->_controller->getDAO('BookModel');
    // get
    Pager::output(0, $model->get($start, $length), $model->error(), $this);
  }

  public function search($get, $post){
    $this->_controller->prepareDatabase();
    $start = $this->getStart($get['start']);
    $length = $this->getLength($get['length']);
    //
    $model = $this->_controller->getDAO('BookModel');
    // get
    Pager::output(0, $model->search($get['keyword'], $start, $length), $model->error(), $this);
  }

  public function searchByTag($get, $post){
    $this->_controller->prepareDatabase();
    $start = $this->getStart($get['start']);
    $length = $this->getLength($get['length']);
    //
    $model = $this->_controller->getDAO('BookModel');
    // get
    Pager::output(0, $model->searchByTag($get['keyword'], $start, $length), $model->error(), $this);
  }

  private function getStart($start){
    return isset($start) ? intval($start) : 0;
  }

  private function getLength($length, $max = 100){
    $result = $max;
    if(isset($length) && intval($length) < $max){
      $result = intval($length);
    }
    return $result;
  }


}
