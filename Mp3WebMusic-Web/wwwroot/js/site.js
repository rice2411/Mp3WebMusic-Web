// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$('#navbarContent .navbar-nav a').on('click', function () {
	$('#navbarContent .navbar-nav').find('li.active').removeClass('active');
	$(this).parent('li').addClass('active');
});