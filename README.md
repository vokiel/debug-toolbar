Little fork for debug-toolbar
-----------------------------
I've added some features and improved little problems.

Installation
------------
Copy all filest to `modules` directory

Enable module in `bootstrap.php` 
	
	Kohana::modules(array(
    	'debug-toolbar' => MODPATH.'debug-toolbar',
	));
	
Add this call in your `bootstrap.php` just before `echo Request::instance()->response`  or similar:
	Debugtoolbar::render();

Of course you can get Debug Toolbar by cust calling `echo Debugtoolbar::render();` somewhere in your view files. 

Tips &amp; Tricks
-----------------
In my default view file, I use this code to add the debug-toolbar or https://github.com/vokiel/profiler
	if (Kohana::$environment==Kohana::DEVELOPMENT){
		echo View::factory('profiler/stats');
		echo DebugToolbar::render();
	}

If you have your `application`, `modules` and `system` folders above the `DOCROOT`, you probably should copy the images from `debug-toolbar/images` folder to your `DOCROOT/images` directory and after that change the config. 

Example structure:
	- application
	- modules
	   - debug-toolbar
	- public_html
	   - images
	      - debug-toolbar
	- system
In `modules/debug-toolbar/config/debug_toolbar.php` change the `$config['icon_path']` to `'../images/debug-toolbar'`

Some changelog
--------------
CSS - show toolbar buttons in one row, next to Kohana logo

JS - in oryginal version, when you open a bar (for example `Benchmarks`) and then click on the Kohana logo, the debug-toolbar would slide left/right but the open bar is still open.
In my fork the bar is also hidded, and after you click again on Kohana logo to show debug-toolbar, the previous open bar is restored back.