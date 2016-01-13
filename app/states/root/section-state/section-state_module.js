'use strict';

var sectionState = angular.module( 'sectionState',
[
	'ui.router',
	
	'projectState',

	'projectResource'

] );


sectionState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.section-state',
	{
		url: ':sectionType?decade?alph?loc?query?type/',
		views:
		{
			'section-content':
			{
				templateUrl: 'states/root/section-state/section-state_template.html',
				controller: 'SectionStateController as sectionState'
			}
		},
		activeTopNav: 'section-state',
		abstract: false
	} );
} );
