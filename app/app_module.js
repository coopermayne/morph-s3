'use strict';

var morphopedia = angular.module( 'morphopedia',
	[
	'ngResource',

	'matchMedia',

	'angular-preload-image',

	'angular.filter',

	'root'
	] );

morphopedia.config( function( $urlRouterProvider, $locationProvider, $sceDelegateProvider )
{
	$urlRouterProvider.otherwise( '/' );
	$locationProvider.html5Mode( true );

	$urlRouterProvider.deferIntercept();

	// Whitelist AWS for asset-loading
	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.
		'https://morphmorphupdated2.s3.amazonaws.com/**'
	]);

} );


morphopedia.run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state)
{
	$rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl)
	{
		// Prevent $urlRouter's default handler from firing
		// e.preventDefault();
		$urlRouter.sync();

		// * 
		// * provide conditions on when to 
		// * sync change in $location.path() with state reload.
		// * I use $location and $state as examples, but
		// * You can do any logic
		// * before syncing OR stop syncing all together.
		

		// if ( !$state.params.sortingType ) {
		// 	// your stuff

		// 	$urlRouter.sync();
		// }
		// else
		// {
		// 	console.log($state.params.sortingType);
		// }
	});
    // Configures $urlRouter's listener *after* your custom listener
    $urlRouter.listen();

} ] );
<<<<<<< HEAD
=======

// morphopedia.run( [ '$rootScope', function( $rootScope )
// {
// 	$rootScope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams )
// 	{
// 		$rootScope.fromState = fromState;
// 		$rootScope.fromParams = fromParams;

// 		$rootScope.toState = toState;
// 		$rootScope.toParams = toParams;
// 	} );

// } ] );

>>>>>>> master
