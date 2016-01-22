'use strict';


var projectResource = angular.module( 'projectResource' );

projectResource.factory( 'Project', function( $resource )
{
	return $resource( 'https://resplendent-torch-7409.firebaseio.com/architecture/:id.json' );

} );
