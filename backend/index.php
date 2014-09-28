<?php
	// Primary Throughput for Webservices Proxy
	header('Content-Type: application/json');
	
	// xdebug_enable();
	
	require_once('./classes/tn.class.Storage.php');
	require_once('./classes/tn.class.WebServices.php');
	
	if (count($_GET) > count($_POST)){
		$method = "get";
		$call = $_GET['method'];
		unset( $_GET['method'] );
		$parameters = $_GET;
	} else {
		$method = "post";
		$call = $_POST['method'];
		unset( $_POST['method'] );
		$parameters = $_POST;
	}


	$ws = new WebServices($method, $call, $parameters);
	
	echo $ws->call();