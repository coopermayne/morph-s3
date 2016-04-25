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

	console.log($state)

	$scope.mobile = screenSize.on( 'xs', function( match )
	{
		$scope.mobile = match;
	});

	$scope.resolveMobileSortingClick = function( string )
	{
		switch( string )
		{
			case 'Location':
			case 'News':
			$scope.showMobileMenuVar = false;
			break;

			default:
			$scope.showMobileMenuVar = true;
			break;
		}
	}

	$scope.activeAbout = function( string )
	{
		if( window.location.hash === '#' + string )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	$scope.scrollToAboutSection = function( section )
	{
		// $location.hash( section );
		anchorSmoothScrollService.scrollTo( section );
		// var element = document.getElementById( section );
		// var aboutWrapper = document.getElementsByClassName('menu-about-text' );
		// var elScr = element.offsetTop;
		console.log( elScr );
	}

	$scope.showSubSections = function( title, children )
	{
		var returnVar;

		if ( title.toLowerCase(  ) === $scope.stateParams.q )
		{
			returnVar = true;
		}

		angular.forEach( children, function( child )
		{
			if ( child.title.toLowerCase(  ) === $scope.stateParams.q )
			{
				returnVar = true;
			}
		} );

		return returnVar;
	}

	$scope.setMobileMenuVar = function(  )
	{
		if ( $scope.mobile )
		{
			switch( $scope.state.current.name )
			{
				case 'root':
				case 'root.section-state':
				$scope.showMobileMenuVar = true;
				break;

				default:
				$scope.showMobileMenuVar = false;
				break;
			}

			if( $scope.stateParams.section === "news" )
			{
				$scope.showMobileMenuVar = false;
			}
		}

		console.log( 'mobileMenuVar:', $scope.showMobileMenuVar );
	}

	$scope.setMobileMenuVar(  );

	$scope.toggleMobileMenu = function(  )
	{
		$scope.showMobileMenuVar = !$scope.showMobileMenuVar;
	};

	$scope.searchText = $stateParams.s;

	// Update route with search query
	$scope.updateSearch = function( text )
	{
		if( text.length > 2 )
		{
			$state.go( 'root.section-state', { section: "search", s: text } );
		}
	}

	console.log( 'MenuDirectiveController active!' );

	$scope.$on( '$stateChangeSuccess', function( event )
	{
		// console.log( $rootScope.fromState, $rootScope.toState )
		if ($rootScope.toState.name === 'root.section-state')
		{
			console.log( 'switching to', $rootScope.toState.name );
			$scope.setMobileMenuVar(  );
		}
	} );

} );
