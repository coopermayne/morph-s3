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

	if( !$scope.mobile )
	{	
		$scope.mobile = screenSize.on( 'xs', function( match )
		{
			$scope.mobile = match;
		});
	}


	$scope.$watch('mobile', function()
	{
		console.log('mobile?',$scope.mobile)
	})

	$scope.$watch('showMobileMenuVar', function()
	{
		console.log('watching mobileMenuVar:',$scope.showMobileMenuVar)
	})

	$scope.resolveMobileSortingClick = function( string )
	{
		if ( $scope.mobile )
		{
			switch( string )
			{
				case 'Location':
				case 'People':
				case 'Contact':
				case 'News':
				$scope.showMobileMenuVar = false;
				break;

				default:
				$scope.showMobileMenuVar = true;
			}
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
		switch( $scope.state.current.name )
		{
			case 'root':
			case 'root.section-state':
			$scope.showMobileMenuVar = true;
			break;

			default:
			$scope.showMobileMenuVar = false;
		}

		console.log('set mobile menu var to', $scope.showMobileMenuVar)
	}

	$scope.setMobileMenuVar(  );

	$scope.closeMobileMenu = function(  )
	{
		$scope.showMobileMenuVar = false;
		$scope.$apply();
	};

	$scope.toggleMobileMenu = function(  )
	{
		$scope.showMobileMenuVar = !$scope.showMobileMenuVar;
	}

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
		if ($rootScope.fromState.name === 'root.section-state.project-state')
		{
			$scope.setMobileMenuVar(  );
		}
	} );

} );
