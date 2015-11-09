'use strict';

var indexState = angular.module( 'indexState',
[
	'ui.router',
	
	'projectState'
] );


indexState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.index-state',
	{
		url: '/:indexType',
		views:
		{
			'content':
			{
				templateUrl: 'states/root/index-state/index-state_template.html',
				controller: 'IndexStateController as indexState'
			}
		},
		activeTopNav: 'index-state',
		abstract: false
	} );
} );
