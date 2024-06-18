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
                    ValueListProperty : 'emailId',
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
annotate service.rulesParent with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'All Rules',
    }
);
annotate service.emailNotification with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
        },{
            $Type : 'UI.DataField',
            Value : emailtocc.emailId,
            Label : 'CC.',
        },{
            $Type : 'UI.DataField',
            Value : mailSubject,
            Label : 'Mail Subject',
        },{
            $Type : 'UI.DataField',
            Value : mailBody,
            Label : 'Mail Body',
        },],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Email Notification',
    }
);
annotate service.emailNotification with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Email Notification',
            ID : 'EmailNotification',
            Target : '@UI.FieldGroup#EmailNotification',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : ' ',
            ID : '_',
            Target : '@UI.FieldGroup#_',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Mail Body',
            ID : '_2',
            Target : '@UI.FieldGroup#_2',
        },
    ],
    UI.FieldGroup #EmailNotification : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
            },{
                $Type : 'UI.DataField',
                Value : emailtocc.emailId,
                Label : 'CC.',
            },
          ],
    }
);
annotate service.emailNotification with @(
    UI.FieldGroup #_ : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : mailSubject,
                Label : 'Mail Subject',
            },],
    }
);
annotate service.emailNotification with @(
    UI.FieldGroup #_1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    }
);
annotate service.emailNotification with @(
    UI.FieldGroup #_2 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : mailBody,
                Label : 'Mail Body',
            },],
    }
);
annotate service.emailNotification with {
    mailBody @UI.MultiLineText : true
};
annotate service.emailNotification with {
    status @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'statusSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : status,
                    ValueListProperty : 'status',
                },
            ],
            Label : 'Status',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.emailNotification with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : status,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);

annotate service.cc with {
    emailId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'assignRole',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : emailId,
                    ValueListProperty : 'emailId',
                },
                {
                    $Type : 'Common.ValueListParameterOut',
                    ValueListProperty : 'name',
                    LocalDataProperty : name,
                },
            ],
            Label : 'cc.',
        },
        Common.ValueListWithFixedValues : true
)};

annotate service.emailNotification with {
    mailSubject @Common.FieldControl : #Mandatory
};
annotate service.emailNotification with {
    mailBody @Common.FieldControl : #Mandatory
};
annotate service.rulesChild with {
    value1 @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'value1Sh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : value1,
                    ValueListProperty : 'sh',
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'relatedTo',
                    LocalDataProperty : criteria,
                },
            ],
            Label : 'value1',
        },
        Common.ValueListWithFixedValues : false
)};
annotate service.value1Sh with {
    sh @Common.Text : {
            $value : description,
            ![@UI.TextArrangement] : #TextLast,
        }
};
annotate service.assignRole with {
    emailId @Common.Text : {
            $value : name,
            ![@UI.TextArrangement] : #TextFirst,
        }
};
