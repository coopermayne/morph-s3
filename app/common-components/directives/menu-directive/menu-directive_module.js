'use strict';

var menuDirective = angular.module( 'menuDirective',
[
	'menuResource',
	
	'slideshowDirective',

	'ngEnter'
] );

menuDirective.directive( 'menuDirective', function(  )
{
	return {

		restrict: 'E',
		controller: 'MenuDirectiveController',
		templateUrl: 'common-components/directives/menu-directive/menu-directive_template.html'

	};
} );
