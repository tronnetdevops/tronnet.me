<?php
	
	// This is the primary Web Services class.
	// It will be responsible for accumulating resources and constructing the methods required in a specified call.
	
	class WebServices {
		var $types = array('auth','user','media');
		var $call;
		var $method;
		var $parameters;
		var $wsdl;
			
		function __construct($method, $call, $parameters){
			$this->call = $call;
			$this->parameters = $parameters;
			$this->method = $method;
			// Import our wsdl files
			
			// Basic function set based on webservice method requested
			require_once('./functions/'. $method.'.php');
			$this->wsdl = new Basic_Call;
			
			// Add further checks to extend into wsdl
			
			return $this;
		}
		
		function extend( $node ){
			$this->wsdl = (object) array_merge( (array) $this->wsdl, (array) $node );
			return true;
		}
		
		function call(){
			$arguments_definition = $this->wsdl->index[ $this->call ]['arguments'];
			$failed = $this->validate_arguments( $arguments_definition, $this->parameters );
			if ( !$failed ){
				$data = call_user_func( 
					array(
						$this->wsdl, 
						$this->call
					), 
					$this->parameters
				);
				
				return $this->json_wrap($data);
			} else {
				return $this->json_wrap( null, 404, "Arguments are missing or are the wrong type." );
			}
		}
		
		function json_wrap($data, $code = 0, $message = "Success."){
			return json_encode(
				array(
					'data' => $data,
					'status' => array(
						'code' => $code,
						'message' => $message
					)
				)
			);
		}
		
		function validate_arguments( $valid, &$contingent, $strict = 0 /* if strict, no extra arguments */ ){
			$failed = array();
			
			// Add another function to keep record of missing arguments too
			foreach( $valid as $name => $field){
				$original = $contingent[ $name ];
				$typecast = settype($contingent[ $name ], $field['type']);
				if ( $field['required'] && $typecast && ($original !== (string) $contingent[ $name ] || gettype( $contingent[ $name ] ) != $field['type'] ) ){
					$failed[$name] = $contingent[ $name ];
				}
			}
			if ( $strict && count( $valid ) != count( $contingent ) ){
				return 1;
			}
			
			return count($failed) && $failed || 0;
		}
	}