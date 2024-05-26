sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'trackinvoices2/test/integration/FirstJourney',
		'trackinvoices2/test/integration/pages/trackInvoiceList',
		'trackinvoices2/test/integration/pages/trackInvoiceObjectPage'
    ],
    function(JourneyRunner, opaJourney, trackInvoiceList, trackInvoiceObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('trackinvoices2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThetrackInvoiceList: trackInvoiceList,
					onThetrackInvoiceObjectPage: trackInvoiceObjectPage
                }
            },
            opaJourney.run
        );
    }
);