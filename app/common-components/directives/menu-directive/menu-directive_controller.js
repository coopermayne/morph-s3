'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu, screenSize, $timeout, $http)
{

	// Fetch Menu from API and set video slides
	Menu.get(  ).$promise.then( function( response )
	{
		response.sections[2].sorting[1].items.unshift("2020-2029")
		$scope.menuItems = response;
	} );

	$scope.stateParams = $stateParams;

	$scope.state = $state;

	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if ( w < 500 )
	{
		$scope.mobile = true;
	}

	$scope.$watch('showMobileMenuVar', function()
	{
		// Android keyboard-handling functions
		$timeout(function()
		{
			var ua = navigator.userAgent.toLowerCase();
			var isAndroid = ua.indexOf("android") > -1;
			if(isAndroid && $scope.showMobileMenuVar && $state.current.name === 'root.section-state.sorting-state')
			{
				var search = document.getElementsByClassName('search');
				search[0].addEventListener('focus', function(e)
				{
					var container = document.getElementsByClassName('menu-directive-wrapper'),
					scrollTo = document.querySelectorAll('.search form');

					container.scrollTop = scrollTo.offset().top - container.offset().top + container.scrollTop()


				}, true);
			}
		})
	});

	$scope.scrollSortToTop = function(  )
	{
		$timeout( function(  )
		{
			return window.scrollTo( 0, 0 )
		}, 100 );
	}

  var formValid = function(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //send error info back to view
    $scope.emailError = !re.test($scope.email)
    $scope.firstNameError = !($scope.firstName && $scope.firstName.length > 0)
    $scope.lastNameError =  !($scope.lastName && $scope.lastName.length > 0)
    $scope.affiliationError = !($scope.affiliation && $scope.affiliation.length > 0)

    $scope.formErrors = [$scope.emailError, $scope.firstNameError, $scope.lastNameError, $scope.affiliationError].filter(function(v){return v === true}).length

    return !( $scope.emailError || $scope.firstNameError || $scope.lastNameError || $scope.affiliationError )
  }

  $scope.formSubmitted = false
  $scope.hideForm = true

  $timeout( function(  ){
    $scope.hideForm = false
  }, 1500)

  $scope.formErrors = 0

	$scope.processForm = function(email, firstName, lastName, affiliation){
    //bring in scope from view
    $scope.email = email
    $scope.firstName = firstName
    $scope.lastName = lastName
    $scope.affiliation = affiliation

    if(formValid()){
      //if valid -- submit form clear fields and notify user
      $scope.formSubmitted = true

      $http({
        method: 'GET',
        url: $rootScope.apiUrl + 'press_list',
        params : {
          email: $scope.email,
          first: $scope.firstName,
          last: $scope.lastName,
          affiliation: $scope.affiliation
        }
      }).success(function(data){

      })
    }
	}

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

	// console.log( 'MenuDirectiveController active!' );

	$scope.$on( '$stateChangeSuccess', function( event )
	{
		// if ($rootScope.toState.name === 'root.section-state' || 'root')
		// {
		// 	$scope.setMobileMenuVar();
		// }

		if ($rootScope.fromState.name === 'root.section-state.project-state')
		{
			$scope.setMobileMenuVar();
		}

		if ($rootScope.toState.name === 'root.section-state.project-state')
		{
			$rootScope.showMobileMenuVar = false;
		}
	} );

} );
