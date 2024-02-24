<?php

define("APP_ROOT", realpath(dirname(dirname(dirname(dirname(__FILE__))))));
require APP_ROOT."/server/includes/runcmd.php";
define('PYTHON_INTERPRETTER', 'python3');
define('REQUEST_HANDLER',  APP_ROOT."/server/request_handler.py");

if(isset($_REQUEST)){
    $root = "python3 ~/htdocs/python-starter/request_handler/index.py --name=pam";
    $cmd = PYTHON_INTERPRETTER." ".REQUEST_HANDLER." --json=".escapeshellarg(json_encode($_REQUEST));

    header('Content-Type: application/json');
    try{
        $res = runcmd($cmd);
        if(!empty($res->stderr)){
			echo json_encode([
				"message" => $res->stderr,
				"response" => [],
				"success" => false
			]);
        } 
        echo $res->stdout;
    }catch(Exception $e){
        echo json_encode([
            "message" => $e->message,
            "response" => [],
            "success" => false
        ]);
        exit;
    }
}