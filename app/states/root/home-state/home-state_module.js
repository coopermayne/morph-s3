'use strict';

var homeState = angular.module( 'homeState',
[
	'ui.router'
] );


homeState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.home-state',
	{
		url: ':section',
		views:
		{
			'section-content':
			{
				templateUrl: 'states/root/home-state/home-state_template.html',
				controller: 'HomeStateController as homeState'
			}
		},
		activeTopNav: 'homeState'
	} );
} );
