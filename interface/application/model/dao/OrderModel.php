<?php
namespace application\model\dao;
use org\weemvc\core\DAO;

class OrderModel extends DAO{
  /**
   * Every model needs a database connection, passed to the model
   * @param object $db A PDO database connection
   */
  function __construct($db) {
    $fields = array(
      'id' => 'INT',
      'uid' => 'VARCHAR',
      'phone' => 'VARCHAR',
      'name' => 'VARCHAR',
      'address' => 'VARCHAR',
      'quantity' => 'INT',
      'tax' => 'FLOAT',
      'grand_total' => 'FLOAT',
      'express_cost' => 'FLOAT',
      'content' => 'TEXT',
      'memo' => 'TEXT',
      'date' => 'DATETIME',
    );
    $this->assembleDateBase($db, 'order', $fields);
  }

  
  public function add($uid, $grandTotal, $content){
    $fields = array(
      'uid' => $uid,
      'grand_total' => floatval($grandTotal),
      'content' => $content,
      'date' => 'now()'
    );
    return $this->insert($fields, array('content' => true));
  }
  
  public function updateById($id, $uid, $grandTotal, $content){
    $id = $this->filterXSS($id);
    $fields = array(
      'grand_total' => floatval($grandTotal),
      'content' => $content,
    );
    return $this->update($fields, '`id`='.intval($id)." AND `uid`='$uid'", array('content' => true));
  }

  public function deleteById($id, $uid){
    $id = $this->filterXSS($id);
    return $this->delete('`id`='.intval($id)." AND `uid`='$uid'");
  }

  public function getByUid($uid){
    return $this->formatItem($this->query(null, "`uid`='$uid'", '`id` DESC'));
  }

  protected function formatItem($row){
        $item = $row;
        if(isset($row['grand_total'])){
            $item['grandTotal'] = $row['grand_total'];
            unset($item['grand_total']);    
        }
        if(isset($row['express_cost'])){
            $item['expressCost'] = $row['express_cost'];
            unset($item['express_cost']);
        }
        return $item;
    }

}
