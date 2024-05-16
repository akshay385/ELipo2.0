sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'assignrole/test/integration/FirstJourney',
		'assignrole/test/integration/pages/assignRoleList',
		'assignrole/test/integration/pages/assignRoleObjectPage'
    ],
    function(JourneyRunner, opaJourney, assignRoleList, assignRoleObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('assignrole') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheassignRoleList: assignRoleList,
					onTheassignRoleObjectPage: assignRoleObjectPage
                }
            },
            opaJourney.run
        );
    }
);