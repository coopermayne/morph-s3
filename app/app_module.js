'use strict';

var morphopedia = angular.module( 'morphopedia',
[
	'ngResource',

	'matchMedia',

	'angular.filter',

	'reverseFilter',

	'root'
] );

morphopedia.config( function( $urlRouterProvider, $locationProvider )
{
	$urlRouterProvider.otherwise( '/' );
	$locationProvider.html5Mode( true );
} );


morphopedia.run( [ '$rootScope', function( $rootScope )
{
	$rootScope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams )
	{
		$rootScope.fromState = fromState;
		$rootScope.fromParams = fromParams;

		$rootScope.toState = toState;
		$rootScope.toParams = toParams;
	} );

} ] );


// morphopedia.controller('MorphopediaController', ['$state, $scope', function( $state, $scope ) {
//   $scope.a = 1;
//   $scope.b = 2;
//   debugger;
// }])
