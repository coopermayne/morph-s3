'use strict';

var projectState = angular.module( 'projectState',
[
	'ui.router',

	'htmlParseFilter',

	'throbberDirective',

	'ngBaguette',
	
	'ngToggleClass',

	'reverseFilter',

	'recGroupFilter'
] );


projectState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.section-state.project-state',
	{
		url: '/:projectId/',
		views:
		{
			'project-content':
			{
				templateUrl: 'states/root/section-state/project-state/project-state_template.html',
				controller: 'ProjectStateController as projectState'
			}
		},
		abstract: false
	} );
} );
