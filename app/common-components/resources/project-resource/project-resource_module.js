'use strict';


var projectResource = angular.module( 'projectResource' );

projectResource.factory( 'Project', function( $resource, $rootScope )
{
	return $resource( $rootScope.apiUrl + 'projects/:id.json' );

} );
