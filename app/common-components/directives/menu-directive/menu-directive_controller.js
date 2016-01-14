'use strict';

var menuDirective = angular.module( 'menuDirective' );

menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams )
{

	$scope.menuItems = [
		{
			title: 'Architecture',
			url: 'architecture',
			filter: [
				{
					title: 'Alphabetical',
					items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
				},
				{
					title: 'Year',
					items: ['1970 - 1979', '1980 - 1989', '1990 - 1999', '2000 - 2009', '2010 - 2019']
				},
				{
					title: 'Type',
					items: ['Commercial', 'Office', 'Culture', 'Education & Health', 'Residential', 'Multi-Family', 'Private Residence', 'Government']
				}
			]
		},
		{
			title: 'Urban Design',
			url: 'urban-design'
		},
		{
			title: 'Tangents',
			url: 'tangents'
		},
		{
			title: 'Research',
			url: 'research'
		},
		{
			title: 'Media',
			url: 'media'
		},
		{
			title: 'News',
			url: 'news'
		}
	];

	$scope.stateParams = $stateParams;

	// Initialize as false
	$scope.displayFilter = false;

	$scope.toggleFilter = function( input ) {
		if ( $scope.displayFilter ) {
			$scope.displayFilter = false;
			// $stateParams.q = null;
		} else {
			$scope.displayFilter = input;
			$stateParams.filterType = input.toLowerCase();
		}
	}


	console.log( 'MenuDirectiveController active!' );

} );
