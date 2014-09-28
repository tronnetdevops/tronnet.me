<?php
	// This is the list of functions in association with basic webservice call
	
	class Basic_Call {
		var $index = array(
			'test' => array(
				'arguments' => array(
					'token' => array(
						'type'=>'string',
						'required'=>true
					),
					'extra' => array(
						'type'=>'string',
						'required'=>false
					)
				),
				'description' => "This function will be used to test that the current system is up."
			),
		);
		
		public static function test($args){
			return array(
				'verify' => $args['token'] . " ".$args['extra']." - OK - "
			);
		}
	}