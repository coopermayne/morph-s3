'use strict';


var projectResource = angular.module( 'projectResource' );

projectResource.factory( 'Project', function( $resource )
{
	return $resource( 'https://morphosisapi.herokuapp.com/projects/:id.json' );

} );
