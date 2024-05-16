sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'groups/test/integration/FirstJourney',
		'groups/test/integration/pages/groupsList',
		'groups/test/integration/pages/groupsObjectPage'
    ],
    function(JourneyRunner, opaJourney, groupsList, groupsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('groups') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThegroupsList: groupsList,
					onThegroupsObjectPage: groupsObjectPage
                }
            },
            opaJourney.run
        );
    }
);