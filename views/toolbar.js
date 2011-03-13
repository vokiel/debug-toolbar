var debugToolbar = {

	// current toolbar section thats open
	current: null,
	
	// current vars and config section open
	currentvar: null,
	
	// current config section open
	currentli: null,
	
	// toggle state 
	currentstate : 'visible',
	
	// toggle a toolbar section
	show : function(obj) {
		if (obj == debugToolbar.current) {
			debugToolbar.off(obj);
			debugToolbar.current = null;
		} else {
			debugToolbar.off(debugToolbar.current);
			debugToolbar.on(obj);
			debugToolbar.current = obj;
		}
	},
	
	// toggle a vars and configs section
	showvar : function(li, obj) {
		if (obj == debugToolbar.currentvar) {
			debugToolbar.off(obj);
			debugToolbar.currentli.className = '';
			debugToolbar.currentli = null;
			debugToolbar.currentvar = null;
		} else {
			debugToolbar.off(debugToolbar.currentvar);
			if (debugToolbar.currentli)
				debugToolbar.currentli.className = '';
			debugToolbar.on(obj);
			debugToolbar.currentvar = obj;
			debugToolbar.currentli = li;
			debugToolbar.currentli.className = 'active';
		}
	},
	
	// turn an element on
	on : function(obj) {
		if (document.getElementById(obj) != null)
			document.getElementById(obj).style.display = '';
	},
	
	// turn an element off
	off : function(obj) {
		if (document.getElementById(obj) != null)
			document.getElementById(obj).style.display = 'none';
	},
	
	// toggle an element
	toggle : function(obj) {
		if (typeof obj == 'string')
			obj = document.getElementById(obj);
			
		if (obj)
			obj.style.display = obj.style.display == 'none' ? '' : 'none';
	},
	
	// close the toolbar
	close : function() {
		document.getElementById('kohana-debug-toolbar').style.display = 'none';
	},
	
	swap: function() {
		var toolbar = document.getElementById('debug-toolbar');
		if (toolbar.className == 'debug-toolbar-align-center') {
			toolbar.className = 'debug-toolbar-align-left';
		} else if (toolbar.className == 'debug-toolbar-align-left') {
			toolbar.className = 'debug-toolbar-align-right';
		} else {
			toolbar.className = 'debug-toolbar-align-center';
		}
	},
	
	getElementsByClassName : function(className, elm, tag){
		var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var tag = tag || "*";
		var elm = elm || document;
		var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var returnElements = [];
		for(var i=0, length = elements.length; i<length; i++){
			if(testClass.test(elements[i].className)){
				returnElements.push(elements[i]);
			}
		}
		return returnElements;
	},
	
	toggleByClass : function(className){
		var cont = document.getElementById('debug-toolbar-blocks');
		var debug = debugToolbar.getElementsByClassName(className,cont,'div');
		for (var i=0, ln = debug.length; i < ln; i++){
			if (debugToolbar.currentstate === 'hidden' && debug[i].getAttribute('id') == debugToolbar.current){
				debug[i].style.display = '';
			}else{
				debug[i].style.display = 'none';
			}
		}
		
		debugToolbar.currentstate = (debugToolbar.currentstate === 'visible') ? 'hidden' : 'visible';
	},
	
	collapse: function() {
		debugToolbar.toggle('debug-toolbar-menu');
		debugToolbar.toggleByClass('top');
	},
	toggleClass : function(obj,className){
		if (obj.className.indexOf(className)< 0){
			obj.className += ' '+className;
		}else{
			var eReg = new RegExp("(^|\\s)"+className+"(\\s|$)");
			obj.className = obj.className.replace(eReg,'');
		}
	},
	toggleNext : function(elm,tag,className){
		debugToolbar.toggleClass(elm,'less');
		elm.innerHTML = (elm.innerHTML=='more')? 'less' : 'more';  
		var elements = debugToolbar.getElementsByClassName(className,elm.parentNode,tag);
		for(var i=0, length = elements.length; i<length; i++){
			debugToolbar.toggleClass(elements[i],'hide');
		}
	}
};

/*
 * Test for javascript libraries
 * (only supports jQuery at the moment
 */
if (typeof jQuery != 'undefined') {

	$(document).ready(function(){
		
		// display ajax button in toolbar
		$('#toggle-ajax').css({display: 'inline'});
		
		// bind ajax event
		$('#debug-ajax').bind("ajaxComplete", function(event, xmlrequest, ajaxOptions){ 
			
			// add a new row to ajax table
			$('#debug-ajax table').append(
				'<tr class="even">' +
					'<td>' + $('#debug-ajax table tr').size() +'<\/td>' + 
					'<td>jQuery ' + jQuery.fn.jquery + '<\/td>' + 
					'<td>' + xmlrequest.statusText + ' (' + xmlrequest.status + ')<\/td>' +
					'<td>' + ajaxOptions.url + '<\/td>' +
				'<\/tr>'
			);
			
			// stripe table
			$('#debug-ajax table tbody tr:nth-child(even)').attr('class', 'odd');	
			
			// update count in toolbar
			$('#toggle-ajax span').text($('#debug-ajax table tr').size()-1);
			
		});
	});
}
	