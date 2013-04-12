/* Simple Breadcrumbs
licensed under MIT.

by Evan Myller (emyller＠7ws.co)
*/

+function ($) {
'use strict';

// hide all subitems by default
$('ul.simplebreadcrumb ul').hide();

$('ul.simplebreadcrumb li:has(ul)')  // items with submenus

	// add a class to identify them
	.addClass('_has_subitems')

	.on('click', function (e) {
		// prevent any activation
		e.preventDefault();

		var item = $(this),
		    handle = item.children(':first');

		// do nothing if the click wasn't fired on the handle
		if (!(handle[0] === e.target || $.contains(handle, e.target)))
			return;

		item.toggleClass('selected');
		item.children('ul').animate(
			{width: 'toggle'},
			{
				queue: false,
				duration: 250,
				done: function () {
					item.siblings().animate(
						{width: 'toggle'},
						{queue: false})
				}
			});
	});




}(jQuery);
