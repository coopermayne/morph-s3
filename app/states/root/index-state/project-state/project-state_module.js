'use strict';

var projectState = angular.module( 'projectState',
[
	'ui.router'
] );


projectState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.index-state.project-state',
	{
		url: '/:projectId',
		views:
		{
			'project-content':
			{
				templateUrl: 'states/root/index-state/project-state/project-state_template.html',
				controller: 'ProjectStateController as projectState'
			}
		},
		activeTopNav: 'index-state',
		activeChildNav: 'project-state'
	} );
} );
