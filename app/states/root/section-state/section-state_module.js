'use strict';

var sectionState = angular.module( 'sectionState',
[
	'ui.router',

	'projectState',

	'projectResource',

	'sortingTypeFilter'

] );

sectionState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.section-state',
	{
		url: ':section/:sortingType?q',
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
