sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'invoicecockpit/test/integration/FirstJourney',
		'invoicecockpit/test/integration/pages/invoiceCockpitList',
		'invoicecockpit/test/integration/pages/invoiceCockpitObjectPage'
    ],
    function(JourneyRunner, opaJourney, invoiceCockpitList, invoiceCockpitObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('invoicecockpit') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheinvoiceCockpitList: invoiceCockpitList,
					onTheinvoiceCockpitObjectPage: invoiceCockpitObjectPage
                }
            },
            opaJourney.run
        );
    }
);