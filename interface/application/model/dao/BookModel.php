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
    $count = $this->count('id');
    $totalItems = $count;
    $totalPages = ceil($count / $length);

    if($length > 1){
      $list = $this->getItems($this->query('*', null, null, $start, $length));
    // if it's only one result
    }else{
      $list = [$this->formatItem($this->query('*', null, null, $start, $length))];
    }
    //
    return array('totalItems' => $totalItems, 
                 'totalPages' => $totalPages, 
                 'list' => $list,
                );
  }

  public function getById($id){
    $result = array();
    if(isset($id)){
      $id = intval($id);
      $result = $this->getItems($this->query('*', "`id`=$id"));
    }
    return $result;
  }

  public function getLatest($length){
    //
    if($length > 1){
      $list = $this->getItems($this->query('*', null, '`id` DESC', 0, $length));
    // if it's only one result
    }else{
      $list = [$this->formatItem($this->query('*', null, '`id` DESC', 0, $length))];
    }
    return $list;
  }

  public function search($keyword, $start, $length){
    $where = "(title LIKE '%$keyword%' OR summary LIKE '%$keyword%')";

    $count = $this->count('id', $where);
    $totalItems = $count;
    $totalPages = ceil($count / $length);

    if($length > 1){
      $list = $this->getItems($this->query('*', $where, null, $start, $length));
    // if it's only one result
    }else{
      $list = [$this->formatItem($this->query('*', $where, null, $start, $length))];
    }

    return array('totalItems' => $totalItems, 
                 'totalPages' => $totalPages, 
                 'list' => $list,
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

  public function searchByAuthor($keyword, $start, $length){
    $where = "author LIKE '%$keyword%'";
    
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
      array_push($result, $this->formatItem($row));
    }
    return $result;
  }

  protected function formatItem($row){
    // convertSubjects
    if(isset($row['subjects'])){
      $row['subjects'] = explode(',', ($row['subjects']));
    }
    return $row;
  }

}
