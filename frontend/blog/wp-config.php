<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'iwilldie');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'zxw9(:Xz]D:%kG)ND)~Lo&dm)+h)w{[FyDF4y?{{^TVi5RPO.=,~={lIYPmT#~Y@');
define('SECURE_AUTH_KEY',  'Nt<-+(W@|iG_nzcz@9b-Wo-3|LL5DqN9]:a$*m;GV#|R`#@&PP-hHl+G|p?2)$i?');
define('LOGGED_IN_KEY',    'KU$YV+1{2|X{t @KvjlIK>l[9cf~~uKQ5caowl|+zJqnHNYBx%Rg-<3+KL:7vq>8');
define('NONCE_KEY',        'Q)f/A-yBrtI(7+vbW!>I*,78N/sGR2{{6$y=}8{qC|.Le*!lo?BU<=&{a49ud6wv');
define('AUTH_SALT',        'Gx*-9Nv|Ot~M6J^RJ)+f?qE(tzfET49sDv.UX-$I8HK{oSHT<axjMHnw_7Q&3$hn');
define('SECURE_AUTH_SALT', '1(zDq.c?@MgU2|gb.Sa!ek$m#v`o:P_@9IvMg&O+dw;#=-~RR4< %~Y^`n@_Py}*');
define('LOGGED_IN_SALT',   'szdm!&4opElb]E0NdJrBTu]ggnNk-MP,7:bDy?>6:S7oPXC%vG6| +LkoMS7`m[;');
define('NONCE_SALT',       'C??~Kgjv!x4A=U<9Fv@+5,d[op3r+J6~OUY(~ohwoqrXN2MvN-Z<C^Xv$k`4w36R');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

