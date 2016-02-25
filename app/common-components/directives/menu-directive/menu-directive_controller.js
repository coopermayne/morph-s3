'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu, screenSize )
{

	// Fetch Menu from API and set video slides
	Menu.get(  ).$promise.then( function( response )
	{
		$scope.menuItems = response;

		$scope.homePageSlides = $scope.menuItems.landing.slides;
	} );


	$scope.stateParams = $stateParams;

	$scope.state = $state;

	$scope.isMobile = function(  )
	{
		return screenSize.is( 'xs', 'sm' );
	};

	$scope.showMobileMenuVar = false;

	$scope.toggleMobileMenu = function(  )
	{
		$scope.showMobileMenuVar = !$scope.showMobileMenuVar;
	};

	$scope.searchText;

	// Update route with search query
	$scope.updateSearch = function( text )
	{
		$state.go( 'root.section-state', { section: "search", sortingType: '', q: text } );
	}

	$scope.viewSorting = function( sortingType, q )
	{

		sortingType = sortingType.toLowerCase(  );

		q = q || null;

		if ( q ) { q = q.toLowerCase() };

		$state.transitionTo( 'root.section-state',
			{
				section: $state.params.section,
				sortingType: sortingType,
				q: q
			},
			{
				notify: true
			} );
	}

	console.log( 'MenuDirectiveController active!' );

} );
