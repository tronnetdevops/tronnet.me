<?php

	// This will be the Storage class which will handle calls to the database
	
	class Storage{
		private $databases = array(
			'mysql' => array(
				'host' => 'localhost',
				'name' => 'tronnet',
				'user' => 'root',
				'pw' => ''
			)
		);
		var $db = 'Uninitialized';
		
		function __construct($type){
			
			$creds = $this->databases[ $type ];
			
			switch($type){
				case 'mysql':
					$link = new PDO(
						'mysql:host='.$creds['host'].';dbname='.$creds['name'], 
						$creds['user'], 
						$creds['pw']
					);
					$this->db = $link;
					break;
			}
			
			return $this;
		}
		
		function done(){
			$this->db = null;
			return true;
		}
		
		function query($string){
			$STH = $this->db->prepare( mysql_real_escape_string( $string ) );  
			$STH->execute();
			return 1;
		}
		
	}