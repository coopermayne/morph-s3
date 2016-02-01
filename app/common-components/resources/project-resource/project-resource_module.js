'use strict';


var projectResource = angular.module( 'projectResource' );

projectResource.factory( 'Project', function( $resource )
{
	return $resource( 'https://ancient-peak-41402.herokuapp.com/projects/:id.json' );

} );
