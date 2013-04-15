/* Simple Breadcrumbs
licensed under MIT.

by Evan Myller (emyller＠7ws.co)
*/

+function ($) {
'use strict';

function reset(item) {
	if (!item)
		item = $('ul.simplebreadcrumb');

	// hide all subitems
	$('ul', item).hide();

	// unset items' 'selected' state
	$('li', item).show().removeClass('selected');

	// reset style values
	$('ul,li', item).css({height: 'auto', width: 'auto'});
}


//add a class to identify dead end entries
$('ul.simplebreadcrumb li').addClass('_has_no_subitems');

$('ul.simplebreadcrumb li:has(ul)')  // items with submenus

	// add a class to identify them
	.removeClass('_has_no_subitems')
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

		// determine which axis do the folding based on subitems' display
		var folding = !$('li', item).css('display').indexOf('inline')
			? {width: 'toggle'}
			: {height: 'toggle'};

		item.children('ul').animate(
			folding,
			{
				queue: false,
				duration: 250,
				done: function () {
					item.siblings().animate(
						folding,
						{queue: false}
					);

					!item.is('.selected') && reset(item);
				}
			});
	});

// reset items by default
reset();

}(jQuery);
