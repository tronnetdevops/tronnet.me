<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Tronnet</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
    </style>
    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">

	<?php
		// Less files
		foreach(glob("style/less/*.less") as $lessFile)  echo "<link rel=\"stylesheet/less\" type=\"text/css\" href=\"". $lessFile."\"/>";
		foreach(glob("style/less/plugins/*.less") as $lessFile)  echo "<link rel=\"stylesheet/less\" type=\"text/css\" href=\"". $lessFile."\"/>";
	?>
  </head>

  <body>
		<?php
			
			// Base files
			loadAssetFiles();
			
			// Asset JS
			foreach(glob("assets/js/*.js") as $jsFile)  echo "<script src=\"".$jsFile."\"></script>";
			
			
			// Local files
			foreach(glob("lib/js/constructs/*.js") as $jsFile)  echo "<script src=\"".$jsFile."\"></script>";
			
			foreach(glob("lib/js/classes/*.js") as $jsFile)  echo "<script src=\"".$jsFile."\"></script>";
			
			foreach(glob("lib/js/page/*.js") as $jsFile)  echo "<script src=\"".$jsFile."\"></script>";
			
			foreach(glob("lib/js/plugins/*.js") as $jsFile)  echo "<script src=\"".$jsFile."\"></script>";
			

			// Templates
			foreach(glob("templates/*.tmpl") as $templateFile)  include($templateFile);
		?>
  </body>
</html>
