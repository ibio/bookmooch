<?php
namespace application\helper;

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use \RuntimeException;
use \InvalidArgumentException;

// https://github.com/lcobucci/jwt/tree/3.2.1
class Authentication{

  public static function issue($audience, $uid){
  	$signer = new Sha256();
    $token = (new Builder())->setIssuer(HOST) // Configures the issuer (iss claim)
                        ->setAudience($audience) // Configures the audience (aud claim)
                        ->setIssuedAt(time()) // Configures the time that the token was issue (iat claim)
                        ->setNotBefore(time()) // Configures the time that the token can be used (nbf claim)
                        ->setExpiration(time() + VERITY_EXPIRE_TIME) // Configures the expiration time of the token (nbf claim)
                        ->set('uid', $uid) // Configures a new claim, called "uid"
                        ->sign($signer, ACCESS_TOKEN_KEY)
                        ->getToken(); // Retrieves the generated token
    return $token;
  }

  public static function verify($audience, $string){
  	$signer = new Sha256();
    $result = false;
    $token = null;
    try {
      $token = (new Parser())->parse((string) $string); // Parses from a string
    }catch(RuntimeException $e){
      // echo 'Caught exception: ',  $e->getMessage(), "\n";
    }catch(InvalidArgumentException $e){
      // echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
		//
		$data = new ValidationData(); // It will use the current time to validate (iat, nbf and exp)
		$data->setIssuer(HOST);
		$data->setAudience($audience);
		//
		if($token && $token->validate($data) && $token->verify($signer, ACCESS_TOKEN_KEY)){
			// if success, return current uid
			$result = $token->getClaim('uid'); // will print "1"
			// TODO: renew token automatically: save current Token on the local and check the old
			// one, if it's expired give a new one
			// inspired by: https://github.com/firebase/php-jwt/issues/83
		}
    // uid or false
    return $result;
  }

  public static function destroy($audience, $string){
    // http://stackoverflow.com/questions/21978658/invalidating-json-web-tokens
    // TODO: Create a token blacklist
    return true;
  }

}
