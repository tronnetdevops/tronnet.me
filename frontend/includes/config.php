<?php
	
	function loadAssetFiles(){
		$onloadFiles = array(
			"jquery-1.8rc1.js",
			"handlebars-1.0.0.beta.6.js",
			"ember-1.0.pre.min.js",
			"less-1.3.0.min.js",
		);
		
		foreach($onloadFiles as $jsFile){
			echo "<script src=\"assets/".$jsFile."\"></script>";
		}
	}

?>