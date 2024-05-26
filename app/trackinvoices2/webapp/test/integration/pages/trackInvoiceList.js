sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'trackinvoices2',
            componentId: 'trackInvoiceList',
            contextPath: '/trackInvoice'
        },
        CustomPageDefinitions
    );
});