'use strict';

var sortingState = angular.module( 'sortingState',
[
	'ui.router',

	'projectState'

] );

sortingState.config( function( $stateProvider )
{
	$stateProvider.state( 'root.section-state.sorting-state',
	{
		url: ':sortingType?q'
	} );
} );
