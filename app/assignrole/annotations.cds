using CatalogService as service from '../../srv/cat-service';
annotate service.assignRole with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Role',
                Value : role,
            },
            {
                $Type : 'UI.DataField',
                Value : department,
                Label : 'Department',
            },
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email Id',
                Value : emailId,
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'User Role',
            Value : role,
        },
        {
            $Type : 'UI.DataField',
            Value : department,
            Label : 'Department',
        },
        {
            $Type : 'UI.DataField',
            Label : 'User Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Email Id',
            Value : emailId,
        },
    ],
);

annotate service.assignRole with {
    emailId @Common.FieldControl : #ReadOnly
};
annotate service.assignRole with {
    role @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'roleSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : role,
                    ValueListProperty : 'roleName',
                },
            ],
            Label : 'Roles',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.assignRole with {
    department @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'departmentSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : department,
                    ValueListProperty : 'departmentName',
                },
            ],
            Label : 'Departments',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.assignRole with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : emailId,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.assignRole with {
    name @Common.FieldControl : #Mandatory
};
annotate service.assignRole with {
    role @Common.FieldControl : #Mandatory
};
