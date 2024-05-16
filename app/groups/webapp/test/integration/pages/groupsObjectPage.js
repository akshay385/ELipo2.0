sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'groups',
            componentId: 'groupsObjectPage',
            contextPath: '/groups'
        },
        CustomPageDefinitions
    );
});