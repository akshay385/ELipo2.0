sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'rules/test/integration/FirstJourney',
		'rules/test/integration/pages/rulesParentList',
		'rules/test/integration/pages/rulesParentObjectPage'
    ],
    function(JourneyRunner, opaJourney, rulesParentList, rulesParentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('rules') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTherulesParentList: rulesParentList,
					onTherulesParentObjectPage: rulesParentObjectPage
                }
            },
            opaJourney.run
        );
    }
);