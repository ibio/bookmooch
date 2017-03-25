<?php
namespace application\helper;

class HeaderFinder{

  public static function get($target){
    $result = null;
    //
  	foreach (getallheaders() as $name => $value) {
      if(strtolower($name) == strtolower($target)){
        $result = $value;
      }
    }
    return $result;
  }

  public static function token($string){
    $result = '';
    //
    if(isset($string) && !empty($string)){
      $list = explode(' ', $string);
      if(!isset($list)){
        $list = array();
      }
      $result = $list[1];
    }
    return $result;
  }

}
