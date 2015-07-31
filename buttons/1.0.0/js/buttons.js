/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * buttons
 *
 * JS for toggling dropdown classes, aria-hidden attr and ESC button listener
 *
 **************************************************************************************************************************************************************/


/*!
Copyright (c) 2011, 2012 Julien Wajsberg <felash@gmail.com>
All rights reserved.

Official repository: https://github.com/julienw/jquery-trap-input
License is there: https://github.com/julienw/jquery-trap-input/blob/master/LICENSE
This is version 1.2.0.
*/
(function(a,b){function d(a){if(a.keyCode===9){var b=!!a.shiftKey;e(this,a.target,b)&&(a.preventDefault(),a.stopPropagation())}}function e(a,b,c){var d=i(a),e=b,f,g,h,j;do{f=d.index(e),g=f+1,h=f-1,j=d.length-1;switch(f){case-1:return!1;case 0:h=j;break;case j:g=0}c&&(g=h),e=d.get(g);try{e.focus()}catch(k){}}while(b===b.ownerDocument.activeElement);return!0}function f(){return this.tabIndex>0}function g(){return!this.tabIndex}function h(a,b){return a.t-b.t||a.i-b.i}function i(b){var c=a(b),d=[],e=0;return m.enable&&m.enable(),c.find("a[href], link[href], [draggable=true], [contenteditable=true], :input:enabled, [tabindex=0]").filter(":visible").filter(g).each(function(a,b){d.push({v:b,t:0,i:e++})}),c.find("[tabindex]").filter(":visible").filter(f).each(function(a,b){d.push({v:b,t:b.tabIndex,i:e++})}),m.disable&&m.disable(),d=a.map(d.sort(h),function(a){return a.v}),a(d)}function j(){return this.keydown(d),this.data(c,!0),this}function k(){return this.unbind("keydown",d),this.removeData(c),this}function l(){return!!this.data(c)}var c="trap.isTrapping";a.fn.extend({trap:j,untrap:k,isTrapping:l});var m={};a.find.find&&a.find.attr!==a.attr&&function(){function e(a){var d=a.getAttributeNode(c);return d&&d.specified?parseInt(d.value,10):b}function f(){d[c]=d.tabIndex=e}function g(){delete d[c],delete d.tabIndex}var c="tabindex",d=a.expr.attrHandle;m={enable:f,disable:g}}()})(jQuery);


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.lastFocus = {};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: open / close a dropdown
	//
	// @param   _isOpen  [boolen]         Whether to open or close the dropdown
	// @param   $parent  [jquery object]  The parent element
	// @param   $menu    [jquery object]  The dropdown menu element
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function toggelDropdown(_isOpen, $parent, $menu) {
		GUI.debugging( 'buttons: ' + ( _isOpen ? 'Closing' : 'Opening' ) + ' dropdown menu', 'report' );

		if( !_isOpen ) { //opening dropdown
			GUI.buttons.lastFocus = $(':focus');

			$parent.addClass('is-open');
			$menu
				.attr('aria-hidden', 'false')
				.focus()
				.trap();
		}
		else { //closing dorpdown
			GUI.buttons.lastFocus.focus();

			$parent.removeClass('is-open');
			$menu
				.attr('aria-hidden', 'true')
				.untrap();
		}

	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function buttonsInit() {
		GUI.debugging( 'buttons: Initiating', 'report' );


		if( $('.js-button-dropdown').length ) {
			GUI.debugging( 'buttons: Found instances', 'report' );

			$('.dropdown-menu').attr('aria-hidden', 'true');

			$('.js-button-dropdown').on('click', function toggelDropdownButton() {
				GUI.debugging( 'buttons: dropdown button clicked', 'interaction' );

				var $this = $(this);
				var $parent = $this.parent('div');
				var $menu = $this.next('.dropdown-menu');
				var _isOpen = $parent.hasClass('is-open');

				toggelDropdown(_isOpen, $parent, $menu);

			});

			//ESC button listener
			$(document).keyup(function escapeKey(e) {
				if(e.keyCode == 27) {
					GUI.debugging( 'buttons: Esc button clicked', 'interaction' );

					toggelDropdown(true, $('.btn-dropdown'), $('.dropdown-menu'));
				}
			});
		}
	};


	GUI.buttons = module;


	// run module
	GUI.buttons.init();

}(GUI));