'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope, $state, $stateParams, Project )
{

	// This is a controller.
	$scope.stateParams = $stateParams;

	Project.get( { id: $stateParams.projectId } ).$promise.then( function( response )
	{
		$scope.activeProject = response;
	} );

	$scope.stateName = 'section-state.project-state';

	console.log( 'ProjectStateController active!' );
	console.log( $stateParams );

	$scope.dummyProject = {
		'id': 288,
		'title': 'Giant Interactive Group Corporate Headquarters',
		'overview': 'Emerging Organically from Complexity\r\n<br /><br />\r\nThe Giant Campus is a compact village that accommodates diverse programmatic functions in a flexible framework of architectural forms that move into and out of a sculpted landscape. An undulating office building and an augmented ground plane marry architecture to landscape and environment to site. Liberated from a primary ordering device such as figure-ground, competing layers disperse, fragment, and integrate. The once clear delineation of man-made and nature blurs into a wet palimpsest, and familiar distinctions between city and landscape, site and non-site, imagined and real bleed into one another. Landscape, once the blank canvas for architecture and urbanism, becomes an active tool, shaped by complex urban forces but also, reciprocally, shaping its context.',
		'description': '<p>The Giant Campus project is a compact village that accommodates diverse functions in a flexible framework of forms that move in and out of a folded landscape plane. Situated amid existing canals and a new man made lake, the undulating office building interacts with an augmented ground plane, joining architecture to landscape and environment to site. \r\nThe East Campus office building contains three zones: open, non-hierarchical office space; private offices, and executive suites, which cantilever dramatically over the lake. Additional program is integrated into the lifted landscape, including a library, an auditorium, an exhibition space, and a café on the east campus. On the West Campus, additional program space-submerged below an expansive, undulating green roof- includes a pool, a multi-purpose sports court, and additional relaxation and fitness spaces for employees. The landform culminates to the west at a company guest hotel where glass-floored private bedroom suites project over a wildlife pond. </p>\r\n\r\n<p>Several plazas, carved from the landscape, provide outdoor break and recreational spaces for employees.  At the south edge of the campus, a pedestrian plaza steps down to the water’s edge in a continuous outdoor walkway that provides pedestrian access to the lake. The main circulation spine, an enclosed walkway located outboard of the office building,  bridges over the street connecting the east and west campuses.</p>\r\n\r\n<p>A range of features on the project maximize both energy efficiency and occupant comfort. The West Campus’s landscaped green roof provides thermal mass that limits the heat gain and reduces cooling expenditures. The façade’s double skin and insulated glass curtain wall minimize solar heat gain and improve overall efficiency. The central circulation spine, along with the recreational amenities and plazas provide opportunities for chance encounters and places for employees to gather without the confines of cubicles or unnecessary divisions. The narrow profile of the office building combined with a system of skylights ensure that employees have continuous access to natural daylight.</p><em></em>\r\n',
		'program': 'Corporate headquarters office building, exhibition hall, conference rooms, auditorium, library, gymnasium, hotel, clubhouse, and pool  \r\n\r\n\r\n',
		'client': 'Giant Interactive Group',
		'size': 258300,
		'site_area': '7.9',
		'lat': '31.05757',
		'lon': '121.263031',
		'street_address': '',
		'zip': null,
		'design_sdate': '2005-01-01',
		'design_edate': '2006-01-01',
		'constr_sdate': '2006-01-01',
		'constr_edate': '2010-01-01',
		'open_date': null,
		'close_date': null,
		'created_at': '2009-02-22T00:00:00.000Z',
		'updated_at': '2016-01-27T21:09:08.790Z',
		'section_id': 1,
		'height': null,
		'hit': 125150,
		'city': 'Shanghai',
		'state': null,
		'country': 'China'
	};


} );
