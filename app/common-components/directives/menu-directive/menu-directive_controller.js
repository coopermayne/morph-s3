'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu, screenSize, $timeout )
{

	// Fetch Menu from API and set video slides
	Menu.get(  ).$promise.then( function( response )
	{
		$scope.menuItems = response;
	} );

	$scope.stateParams = $stateParams;

	$scope.state = $state;

	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if ( w < 500 )
	{
		$scope.mobile = true;
	}

	$scope.$watch('mobile', function()
	{
		console.log('mobile?', $scope.mobile);
	})

	$scope.$watch('showMobileMenuVar', function()
	{
		console.log('showMobileMenuVar:', $scope.showMobileMenuVar)
	})

	$scope.resolveMobileSortingClick = function( string )
	{
		if( $scope.mobile )
		{
			switch( string )
			{
				// case 'Location':
				// case 'People':
				// case 'Contact':
				// case 'News':
				// case 'Now Institute':
				// $scope.showMobileMenuVar = false;
				// break;

				case 'Morphosis':
				case 'Architecture':
				case 'A-Z':
				case 'Year':
				case 'Type':
				case 'Planning':
				case 'Tangents':
				case 'Research':
				case 'Media':
				$rootScope.showMobileMenuVar = true;
				break;

				default:
				$rootScope.showMobileMenuVar = false;
				break;
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
		switch( $state.current.name )
		{
			case 'root':
			case 'root.section-state':
			switch( $state.params.section )
			{
				case 'news':
				case 'search':
				$rootScope.showMobileMenuVar = false;
				return false;
				break;

				default:
				$rootScope.showMobileMenuVar = true;
				return true;
				break;
			}
			break;

			case 'root.section-state.project-state':
			$rootScope.showMobileMenuVar = false;
			return false;
			break;

			case 'root.section-state.sorting-state':
			$rootScope.showMobileMenuVar = false;
			return false;
			break;
		}
	}

	$scope.setMobileMenuVar();

	$scope.closeMobileMenu = function(  )
	{
		return $rootScope.showMobileMenuVar = false;
	};

	$scope.openMobileMenu = function(  )
	{
		return $rootScope.showMobileMenuVar = true;
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

	// $scope.$watch('showMobileMenuVar', function()
	// {
	// 	console.log('showMobileMenuVar:', $scope.showMobileMenuVar, 'setMobileMenuVar:', $scope.setMobileMenuVar());
	// })

$scope.$on( '$stateChangeSuccess', function( event )
{
		// $scope.showMobileMenuVar = null;
		// console.log('showMobileMenuVar:', $scope.showMobileMenuVar, 'setMobileMenuVar:', $scope.setMobileMenuVar());
		// $scope.showMobileMenuVar = $scope.setMobileMenuVar();
		if ($rootScope.fromState.name === 'root.section-state.project-state')
		{
			$scope.setMobileMenuVar();
		}
	} );

} );
