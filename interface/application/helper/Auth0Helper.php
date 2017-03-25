<?php

namespace application\helper;

use Auth0\SDK\JWTVerifier;
use Auth0\SDK\Auth0Api;

class Auth0Helper {
  protected $token;
  protected $tokenInfo;

  public function setCurrentToken($token) {
    try {
      // HS256 token by default
      $verifier = new JWTVerifier([
        'valid_audiences' => [getenv('AUTH0_CLIENT_ID')],
        // NOTICE: you need to base64 encode here, maybe it's because frontend client is too old (encoded before)?
        // https://auth0.com/forum/t/api-check-jwt-signature-verification-failed/4802/3
        'client_secret' => base64_encode(getenv('AUTH0_CLIENT_SECRET')),
      ]);
      //
      $this->token = $token;
      $this->tokenInfo = $verifier->verifyAndDecode($token);
    }
    catch(\Auth0\SDK\Exception\CoreException $e) {
      throw $e;
    }
  }

  public function getUserInfo(){
    $auth0Api = new Auth0Api($this->token, getenv('AUTH0_DOMAIN'));
    $userData = $auth0Api->users->get($this->tokenInfo->sub);
    return $userData;
  }

}
