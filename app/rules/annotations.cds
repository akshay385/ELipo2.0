using CatalogService as service from '../../srv/cat-service';
annotate service.rulesParent with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'approvalType',
                Value : approvalType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'comments',
                Value : comments,
            },
            {
                $Type : 'UI.DataField',
                Label : 'active',
                Value : active,
            },
            {
                $Type : 'UI.DataField',
                Label : 'dueDays',
                Value : dueDays,
            },
            {
                $Type : 'UI.DataField',
                Label : 'escalateTo',
                Value : escalateTo,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Rules',
            ID : 'Rules',
            Target : 'rulptorul/@UI.LineItem#Rules',
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Approval',
            ID : 'Approval',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : ' ',
                    ID : '_',
                    Target : '@UI.FieldGroup#_',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : ' ',
                    ID : '_1',
                    Target : 'rulptoapp/@UI.LineItem#_',
                },],
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Escalation Options',
            ID : 'EscalationOptions',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : ' ',
                    ID : '_2',
                    Target : '@UI.FieldGroup#_2',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Comments',
                    ID : '_3',
                    Target : '@UI.FieldGroup#_3',
                },],
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : rulptorul.concatCondition,
            Label : 'Rule',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Approval Type',
            Value : approvalType,
        },
        {
            $Type : 'UI.DataField',
            Value : rulptoapp.level,
            Label : 'Approver Groups',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Comments',
            Value : comments,
        },
    ],
);

annotate service.rulesChild with @(
    UI.LineItem #Rules : [
        {
            $Type : 'UI.DataField',
            Value : criteria,
            Label : 'Criteria',
        },{
            $Type : 'UI.DataField',
            Value : condition,
            Label : 'Condition',
        },{
            $Type : 'UI.DataField',
            Value : value1,
            Label : 'Value1',
        },{
            $Type : 'UI.DataField',
            Value : value2,
            Label : 'Value2',
            ![@UI.Hidden]: {$edmJson: {$Ne: [
                {$Path: 'condition'},
                'In Between'
            ]}},
        },
        {
            $Type : 'UI.DataField',
            Value : concatCondition,
            Label : 'concatCondition',
        },]
);
annotate service.rulesParent with @(
    UI.FieldGroup #_ : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : approvalType,
                Label : 'Approval Type',
            },],
    }
);
annotate service.approversChild with @(
    UI.LineItem #_ : [
        {
            $Type : 'UI.DataField',
            Value : level,
            Label : 'Approver Level',
        },{
            $Type : 'UI.DataField',
            Value : apptoappg.groupName,
            Label : 'Group(s)',
        },{
            $Type : 'UI.DataField',
            Value : apptoappm.memberName,
            Label : 'Member(s)',
        },]
);
annotate service.rulesParent with @(
    UI.FieldGroup #_1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : escalateTo,
                Label : 'Escalate To',
            },{
                $Type : 'UI.DataField',
                Value : dueDays,
                Label : 'if not within day(s).',
            },],
    }
);
annotate service.rulesParent with @(
    UI.FieldGroup #EscalationOptions : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : escalateTo,
                Label : 'Escalate To',
            },{
                $Type : 'UI.DataField',
                Value : dueDays,
                Label : 'if not within day(s).',
            },],
    }
);
annotate service.rulesParent with {
    comments @UI.MultiLineText : true
};
annotate service.rulesParent with @(
    UI.FieldGroup #_2 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : escalateTo,
                Label : 'Escalate To',
            },{
                $Type : 'UI.DataField',
                Value : dueDays,
                Label : 'if not within day(s).',
            },],
    }
);
annotate service.rulesParent with @(
    UI.FieldGroup #_3 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : comments,
                Label : 'Comments',
            },],
    }
);
annotate service.rulesParent with @(
    UI.HeaderInfo : {
        TypeImageUrl : '',
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.rulesChild with {
    criteria @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'criteriaSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : criteria,
                    ValueListProperty : 'criteria',
                },
            ],
            Label : 'Criteria',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.conditionsSh with {
    sh @Common.Text : description
};
annotate service.rulesChild with {
    condition @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'conditionsSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : condition,
                    ValueListProperty : 'sh',
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'relatedTo',
                    LocalDataProperty : criteria,
                },
            ],
            Label : 'condition',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.rulesParent with {
    escalateTo @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'groups',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : escalateTo,
                    ValueListProperty : 'groupName',
                },
            ],
            Label : 'Escalate To',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.approversChildGroups with {
    groupName @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'groups',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : groupName,
                    ValueListProperty : 'groupName',
                },
            ],
            Label : 'Add Groups',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.approversChildMembers with {
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
                    ValueListProperty : 'UUID',
                    LocalDataProperty : assignRoleUUID,
                },
            ],
            Label : 'Add Members',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.assignRole with {
    name @Common.Text : role
};
annotate service.rulesParent with {
    approvalType @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'approvalTypeSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : approvalType,
                    ValueListProperty : 'approvaltype',
                },
            ],
            Label : 'Type',
        },
        Common.ValueListWithFixedValues : true
)};
