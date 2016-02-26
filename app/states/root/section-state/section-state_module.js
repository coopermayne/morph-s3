'use strict';

var sectionState = angular.module( 'sectionState',
[
	'ui.router',

	'projectState',

	'sortingState',

	'projectResource',

	'sortingTypeFilter'

] );

sectionState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.section-state',
	{
		url: ':section?s',
		views:
		{
			'section-view':
			{
				templateUrl: 'states/root/section-state/section-state_template.html',
				controller: 'SectionStateController as sectionState'
			}
		}
	} );
} );
