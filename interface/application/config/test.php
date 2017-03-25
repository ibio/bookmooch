<?php
/**
 * Configuration
 *
 * For more info about constants please @see http://php.net/manual/en/function.define.php
 * If you want to know why we use "define" instead of "const" @see http://stackoverflow.com/q/2447791/1114320
 */
$root = preg_replace("!{$_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']);

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 1);
ini_set('log_errors', 0);

//turn off
// error_reporting(0);
// ini_set('display_errors', 0);
// ini_set('log_errors', 1);

/**
 * Configuration for: Project URL
 * Put your URL here, for local development "127.0.0.1" or "localhost" (plus sub-folder) is fine
 */
define('ROOT', $root . '/');
define('HOST', 'http://us.ypseek.com/');
define('URL',  'http://us.ypseek.com/labs/2017/bookmooch/interface/index.php');
define('VERITY_EXPIRE_TIME', 60 * 60);
define('ACCESS_TOKEN_KEY', 'dfd34#@#%%^3vdddGSD@S@1a!~');

/**
 * Configuration for: Database
 * This is the place where you define your database credentials, database type etc.
 */
define('DB_TYPE', 'mysql');
define('DB_PREFIX', 'wc_');
//
define('DB_HOST', 'localhost');
define('DB_NAME', '');
define('DB_USER', '');
define('DB_PASS', '');


