using CatalogService as service from '../../srv/cat-service';
annotate service.groups with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'groupName',
                Value : groupName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'description',
                Value : description,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Members',
            ID : 'Members',
            Target : 'grptomem/@UI.LineItem#Members',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'groupName',
            Value : groupName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'description',
            Value : description,
        },
    ],
);


annotate service.members with @(
    UI.LineItem #Members : [
        {
            $Type : 'UI.DataField',
            Value : memberName,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : role,
            Label : 'Position',
        },
        {
            $Type : 'UI.DataField',
            Value : emailId,
            Label : 'Email Id',
        },]
);
annotate service.members with {
    memberName @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'assignRole',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : memberName,
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'role',
                    LocalDataProperty : role,
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'emailId',
                    LocalDataProperty : emailId,
                },
            ],
            Label : 'Add Members',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.members with {
    memberName @Common.FieldControl : #Mandatory
};
