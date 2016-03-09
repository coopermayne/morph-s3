'use strict';

var throbberDirective = angular.module( 'throbberDirective',
[ ] );

throbberDirective.directive( 'throbberDirective', function()
{
	return {

		restrict: 'E',
		replace: true,
		controller: 'ThrobberDirectiveController',
		templateUrl: 'common-components/directives/throbber-directive/throbber-directive_template.html'
	};
} );
