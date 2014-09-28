<?php
	// This is the list of functions in association with basic webservice call
	
	class Basic_Call {
		var $index = array(
			'sign_guestbook' => array(
				'arguments' => array(
					'id' => array(
						'type'=>'string',
						'required'=>false
					)
				),
				'description' => "This function will help keep track of visitors."
			),
			'contact' => array(
				'arguments' => array(
					'name' => array(
						'type'=>'string',
						'required'=>true
					),
					'email' => array(
						'type'=>'string',
						'required'=>true
					),
					'subject' => array(
						'type'=>'string',
						'required'=>true
					),
					'message' => array(
						'type'=>'string',
						'required'=>true
					)
				),
				'description' => "This function will allow users to contact the administrator."
			),
		);
		
		public static function sign_guestbook(){
			$user_ip = $_SERVER['REMOTE_ADDR'];
			$query = "INSERT INTO guestbook (ip, visited) ".
				"VALUES ('" . $user_ip . "', 1) ".
				"ON DUPLICATE KEY UPDATE visited = visited + 1;";
			$db = new Storage('mysql');
			error_log('Making query baby: '.$query);
			$db->query($query);
			$db->done();
			return array();
		}
			
		public static function contact($args){
			error_log('About to send an email from '.$args['name'].' ... ');
			mail(
				'Sean Murray <smurraysb@gmail.com>',
				$args['subject'],
				wordwrap($args['message']),
				'From: '.$args['name'].' <'.$args['email'].'>'
			);
			error_log('... sent!');
			return array();
		}
	}