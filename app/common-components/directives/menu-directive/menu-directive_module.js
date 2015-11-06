// take a list of menu items
// when the user clicks one, set it to active
	// when the active state is architecture, fetch architecture.json

'use strict';

var menuDirective = angular.module( 'menuDirective', [] );

menuDirective.directive( 'menuDirective', function(  )
{
	return {

		restrict: 'E',
		controller: 'MenuDirectiveController',
		templateUrl: 'common-components/directives/menu-directive/menu-directive_template.html'

	};
} );
