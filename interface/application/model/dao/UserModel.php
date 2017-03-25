<?php
namespace application\model\dao;
use org\weemvc\core\DAO;
use application\helper\Authentication;

class UserModel extends DAO{
  /**
   * Every model needs a database connection, passed to the model
   * @param object $db A PDO database connection
   */
  function __construct($db) {
    $fields = array(
      'id' => 'INT',
      'role' => 'INT',
      'status' => 'INT',
      'count' => 'INT',
      'token' => 'TEXT',
      'email' => 'VARCHAR',
      'name' => 'VARCHAR',
      'address' => 'VARCHAR',
      'password' => 'VARCHAR',
      'phone' => 'VARCHAR',
      'avatar' => 'VARCHAR',
      'description' => 'TEXT',
      'last_login' => 'DATETIME',
      'date' => 'DATETIME',
    );
    $this->assembleDateBase($db, 'user', $fields);
  }

  public function login($email, $password){
    $email = strtolower($this->filterXSS($email));
    $password = $this->filterXSS($password);
    $audience = 'http://'.$_SERVER['HTTP_HOST'];
    //
    $result = $this->query(null, "`email`='$email'", null, 0, 1);
    $result['isLogin'] = false;
    if(isset($result['status']) && $result['status'] > 0){
      // http://php.net/manual/en/faq.passwords.php 
      // TODO: needs to add salt in the future
      if($result['password'] == md5($password)){
        $result['isLogin'] = true;
        $result['token'] = Authentication::issue($audience, $result['id']);
        //update
        $fields = array(
          'count' => $result['count'] + 1,
          'last_login' => 'now()',
          'token' => $result['token'],
        );
        $this->update($fields, '`id`=' . $result['id']);
      }else{
        $result['message'] = 'email or password was incorrect';
      }
    }else{
      $result['message'] = 'The account has not been approved the account yet or does not exist';
    }
    //delete password
    if(isset($result['password'])){
      unset($result['password']);
    }
    return $result;
  }

  public function getRole($uid){
    if(!isset($uid) || empty($uid)){
      $uid = -1;
    }
    return $this->query('role', "`id`=$uid", null, 0, 1);
  }

  public function getAll(){
    return $this->query('id,role,status,email'); 
  }

  public function check($token){
    $audience = 'http://'.$_SERVER['HTTP_HOST'];
    // uid or false
    return Authentication::verify($audience, $token);
  }

  public function logout($uid){
    $result = false;
    if($uid){
      $result = Authentication::destroy($audience, $token);
      $fields = array(
        'token' => '',
      );
      $this->update($fields, '`id`=' . $uid);
    }
    return $result;
  }

}
