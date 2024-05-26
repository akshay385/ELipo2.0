sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'supplier/test/integration/FirstJourney',
		'supplier/test/integration/pages/supplierList',
		'supplier/test/integration/pages/supplierObjectPage'
    ],
    function(JourneyRunner, opaJourney, supplierList, supplierObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('supplier') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThesupplierList: supplierList,
					onThesupplierObjectPage: supplierObjectPage
                }
            },
            opaJourney.run
        );
    }
);