<?php
// put this file in the root directory!
// https://awesometoast.com/cors/

// NOTICE: The reason it need this blank file is because when browser initiates an OPTIONS request,
// the .htaccess file will redirect it to here, so that it can return a 200 status and browser can
// go to the next. See .htaccess in the root directory for details.

// it is not required for now. 
// NOTICE: it need to send a request for that index.php! otherwise it will fail for OPTIONS request.

echo ' ';