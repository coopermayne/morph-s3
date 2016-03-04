'use strict';

var morphopedia = angular.module( 'morphopedia',
[
	'ngResource',

	'matchMedia',

	'angular-preload-image',

	'leaflet-directive',

	'angular.filter',

	'root'

] );

morphopedia.config( function(  $urlRouterProvider, $locationProvider, $sceDelegateProvider )
{

	$urlRouterProvider.otherwise( '/' );
	$locationProvider.html5Mode( true );

	// Whitelist AWS for asset-loading
	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.
		'https://morphmorphupdated2.s3.amazonaws.com/**'
		]);

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