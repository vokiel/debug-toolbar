Little fork for debug-toolbar
=============================
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
In my default view file, I use this code to add the debug-toolbar or [profiler](https://github.com/vokiel/profiler)
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

2011-03-13

In SQL Queries table there is new feature - shows line number and file, where query (or model) was invoked.  

Requires [profiler](https://github.com/vokiel/profiler), with [last changes] (https://github.com/vokiel/profiler/commit/883161caa52e4066ab2ad5d3e4cfb0f0076a9641)

Screenshot
----------
![Debug-Toolbar](http://img406.imageshack.us/img406/7311/kohana31debugtoolbar.png "Kohana 3.1 Debug-Toolbar")

2011-03-13

![Debug-Toolbar](http://img847.imageshack.us/img847/4726/kohana31dtqueries.png "Kohana 3.1 Debug-Toolbar")