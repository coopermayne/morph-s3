'use strict';

var root = angular.module( 'root',
[
	'ui.router',

	'menuDirective',

	'sectionState',

	'homeState'
] );

root.config( function( $stateProvider )
{
	$stateProvider.state( 'root',
	{
		url: '/',
		views:
		{
			'root':
			{
				templateUrl: 'states/root/root_template.html',
				controller: 'RootController as root'
			}
		},
		abstract: false
	} );
} );
