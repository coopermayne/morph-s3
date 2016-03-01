'use strict';

var morphopedia = angular.module( 'morphopedia',
[
	'ngResource',

	'matchMedia',

	'uiGmapgoogle-maps',

	'angular-preload-image',

	'angular.filter',

	'root'
] );

morphopedia.config( function( uiGmapGoogleMapApiProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider )
{
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAiQruCxCWU7L42ksmExtvJ10b3QkowUjY',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });

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
