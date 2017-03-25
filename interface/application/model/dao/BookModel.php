<?php
namespace application\model\dao;
use org\weemvc\core\DAO;

class BookModel extends DAO{
  /**
   * Every model needs a database connection, passed to the model
   * @param object $db A PDO database connection
   */
  function __construct($db) {
    $fields = array(
      'id' => 'INT',
      'isbn' => 'VARCHAR',
      'oclc' => 'INT',
      'title' => 'VARCHAR',
      'author' => 'VARCHAR',
      'cover' => 'VARCHAR',
      'publisher' => 'VARCHAR',
      'edition' => 'VARCHAR',
      'summary' => 'TEXT',
      'rating' => 'INT',
      'subjects' => 'VARCHAR',
      'price' => 'FLOAT',
      'description' => 'VARCHAR',
      'url' => 'VARCHAR',
    );
    $this->assembleDateBase($db, 'book', $fields);
  }

  /*
  public function add($title, $products, $description, $link, $forTotal, $forQuantity, $images){
    $fields = array(
      'title' => $title,
      'products' => $products,
      'description' => $description,
      'link' => $link,
      'for_total' => $forTotal,
      'for_quantity' => $forQuantity,
      'images' => $images,
      'date' => 'now()'
    );
    return $this->insert($fields, array('link' => true));
  }*/

  /*
  public function updateById($id, $title, $products, $description, $link, $forTotal, $forQuantity, $images){
    $id = $this->filterXSS($id);
    $fields = array(
      'title' => $title,
      'products' => $products,
      'description' => $description,
      'link' => $link,
      'for_total' => $forTotal,
      'for_quantity' => $forQuantity,
      'images' => $images
    );
    return $this->update($fields, '`id`=' . $id, array('link' => true));
  }*/

  public function get($start, $length){
    //
    $count = $this->count('id');
    $totalItems = $count;
    $totalPages = ceil($count / $length);

    //
    return array('totalItems' => $totalItems, 
                 'totalPages' => $totalPages, 
                 'list' => $this->getItems($this->query('*', null, null, $start, $length)),
                );
  }

  public function getById($id){
    $this->convertSubjects($row['subjects']);
    $result = array();
    if(isset($id)){
      $id = intval($id);
      $result = $this->getItems($this->query('*', "`id`=$id"));
    }
    return $result;
  }

  public function getLatest($length){
    //
    return $this->getItems($this->query('*', null, '`id` DESC', 0, $length));
  }

  public function search($keyword, $start, $length){
    $where = "(title LIKE '%$keyword%' OR summary LIKE '%$keyword%')";

    $count = $this->count('id', $where);
    $totalItems = $count;
    $totalPages = ceil($count / $length);

    return array('totalItems' => $totalItems, 
                 'totalPages' => $totalPages, 
                 'list' => $this->getItems($this->query('*', $where, null, $start, $length)),
                );
  }

  public function searchByTag($keyword, $start, $length){
    $where = "subjects LIKE '%$keyword%'";
    
    $count = $this->count('id', $where);
    $totalItems = $count;
    $totalPages = ceil($count / $length);

    return array('totalItems' => $totalItems, 
                 'totalPages' => $totalPages, 
                 'list' => $this->getItems($this->query('*', $where, null, $start, $length)),
                );
  }

  /*
  public function deleteById($id){
    $id = $this->filterXSS($id);
    return $this->delete('`id`=' . $id);
  }*/

  protected function getItems($list){
    $result = array();
    if(!is_array($list)){
      $list = array();
    }
    foreach($list as $row) {
      $row['subjects'] = $this->convertSubjects($row['subjects']);
      array_push($result, $row);
    }
    return $result;
  }

  protected function convertSubjects($subjects){
    $list = array();
    if(isset($subjects)){
      $list = explode(',', $subjects);
    }
    return $list;
  }

}
