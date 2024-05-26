using CatalogService as service from '../../srv/cat-service';
annotate service.invoiceCockpit with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Invoice No',
                Value : invoiceNo,
            },
            {
                $Type : 'UI.DataField',
                Value : invoiceDate,
                Label : 'Invoice Date',
            },
            {
                $Type : 'UI.DataField',
                Value : postingDate,
                Label : 'Posting Date',
            },
            {
                $Type : 'UI.DataField',
                Value : refPoNum,
                Label : 'Ref PO Num',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentTerms,
                Label : 'PaymentTerms',
            },
            {
                $Type : 'UI.DataField',
                Value : baselineDate,
                Label : 'Baseline Date',
            },
            {
                $Type : 'UI.DataField',
                Value : VendorCode,
                Label : 'Vendor Code',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentMethod,
                Label : 'Payment Method',
            },
            {
                $Type : 'UI.DataField',
                Value : currency,
                Label : 'Currency',
            },
            {
                $Type : 'UI.DataField',
                Value : companyCode,
                Label : 'Company Code',
            },
            {
                $Type : 'UI.DataField',
                Value : glAccount,
                Label : 'G / L Account',
            },
            {
                $Type : 'UI.DataField',
                Value : costCenter,
                Label : 'Cost Center',
            },
            {
                $Type : 'UI.DataField',
                Value : discountPer,
                Label : 'Discount %',
            },
            {
                $Type : 'UI.DataField',
                Value : tdsPer,
                Label : 'Tds %',
            },
            {
                $Type : 'UI.DataField',
                Value : taxableAmount,
                Label : 'Taxable Amount',
            },
            {
                $Type : 'UI.DataField',
                Value : adjustment,
                Label : 'Adjustment',
            },
            {
                $Type : 'UI.DataField',
                Value : totalDiscountAmount,
                Label : 'Amount (Total)',
            },
            {
                $Type : 'UI.DataField',
                Value : departmentName,
                Label : 'Department Name',
            },
            {
                $Type : 'UI.DataField',
                Value : internalOrder,
                Label : 'Internal Order',
            },
            {
                $Type : 'UI.DataField',
                Value : tcs,
                Label : 'TCS Amount',
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
            Label : 'Items',
            ID : 'Items',
            Target : 'invtoitems/@UI.LineItem#Items',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Comments (Optional)',
            ID : 'CommentsOptional',
            Target : '@UI.FieldGroup#CommentsOptional',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Invoice No.',
            Value : invoiceNo,
        },
        {
            $Type : 'UI.DataField',
            Value : RefInvoiceNo,
            Label : 'Ref-Invoice No.',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : 'Supplier Name',
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            Label : 'Date',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
            Label : 'Modified Date-Time',
        },
    ],
);

annotate service.invoiceCockpitItems with @(
    UI.LineItem #Items : [
        {
            $Type : 'UI.DataField',
            Value : Material,
            Label : 'Material',
        },{
            $Type : 'UI.DataField',
            Value : Qty,
            Label : 'QTY',
        },
        {
            $Type : 'UI.DataField',
            Value : qc,
            Label : 'QC',
        },{
            $Type : 'UI.DataField',
            Value : Unit_Price,
            Label : 'Unit Price',
        },{
            $Type : 'UI.DataField',
            Value : GL_Acc,
            Label : 'G/L Acc.',
        },{
            $Type : 'UI.DataField',
            Value : Cost_Center,
            Label : 'Cost Center',
        },{
            $Type : 'UI.DataField',
            Value : Plant,
            Label : 'Plant',
        },{
            $Type : 'UI.DataField',
            Value : Disc_Per,
            Label : 'Disc %',
        },{
            $Type : 'UI.DataField',
            Value : GST_Per,
            Label : 'GST %',
        },{
            $Type : 'UI.DataField',
            Value : Taxable_Amt,
            Label : 'Taxable Amount',
        },{
            $Type : 'UI.DataField',
            Value : Tax_Amt,
            Label : 'Tax Amount',
        },{
            $Type : 'UI.DataField',
            Value : Total_Amt,
            Label : 'Total Amount',
        },]
);
annotate service.invoiceCockpit with {
    invoiceNo @Common.FieldControl : #ReadOnly
};
annotate service.invoiceCockpit with {
    paymentMethod @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'paymentMethodSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : paymentMethod,
                    ValueListProperty : 'PaymentMethod',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.paymentMethodSh with {
    PaymentMethod @Common.Text : description
};
annotate service.invoiceCockpit with {
    paymentTerms @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'paymrntTermsSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : paymentTerms,
                    ValueListProperty : 'paymrntTerms',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.paymrntTermsSh with {
    paymrntTerms @Common.Text : description
};
annotate service.invoiceCockpit with {
    VendorCode @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'vendorCodeSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : VendorCode,
                    ValueListProperty : 'VendorCode',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.vendorCodeSh with {
    VendorCode @Common.Text : description
};
annotate service.invoiceCockpit with {
    currency @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'currencySh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : currency,
                    ValueListProperty : 'currency',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.currencySh with {
    currency @Common.Text : description
};
annotate service.invoiceCockpit with {
    companyCode @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'companyCodeSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : companyCode,
                    ValueListProperty : 'companyCode',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.companyCodeSh with {
    companyCode @Common.Text : description
};
annotate service.invoiceCockpit with {
    glAccount @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'glAccountSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : glAccount,
                    ValueListProperty : 'glAccount',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.glAccountSh with {
    glAccount @Common.Text : description
};
annotate service.invoiceCockpit with {
    costCenter @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'costCenterSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : costCenter,
                    ValueListProperty : 'costCenter',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.costCenterSh with {
    costCenter @Common.Text : description
};
annotate service.invoiceCockpit with {
    departmentName @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'departmentSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : departmentName,
                    ValueListProperty : 'departmentName',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.departmentSh with {
    departmentName @Common.Text : description
};
annotate service.invoiceCockpit with {
    internalOrder @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'internalOrderSh',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : internalOrder,
                    ValueListProperty : 'internalOrder',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.internalOrderSh with {
    internalOrder @Common.Text : description
};
annotate service.invoiceCockpit with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : invoiceNo,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.invoiceCockpit with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : invoiceNoN,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'New',
                        },
                    ],
                },],
        },
        Text : 'New',
    },
    UI.LineItem #tableView : [
         {
            $Type : 'UI.DataField',
            Label : 'Invoice No.',
            Value : invoiceNo,
        },
        {
            $Type : 'UI.DataField',
            Value : RefInvoiceNo,
            Label : 'Ref-Invoice No.',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : 'Supplier Name',
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            Label : 'Date',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
            Label : 'Modified Date-Time',
        },],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : invoiceNoN,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Draft',
                        },
                    ],
                },],
        },
        Text : 'Draft',
    }
);
annotate service.invoiceCockpit with @(
    UI.LineItem #tableView1 : [
         {
            $Type : 'UI.DataField',
            Label : 'Invoice No.',
            Value : invoiceNo,
        },
        {
            $Type : 'UI.DataField',
            Value : RefInvoiceNo,
            Label : 'Ref-Invoice No.',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : 'Supplier Name',
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            Label : 'Date',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
            Label : 'Modified Date-Time',
        },],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : invoiceNoN,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },],
        },
        Text : 'Rejected',
    }
);
annotate service.invoiceCockpit with @(
    UI.LineItem #tableView2 : [
         {
            $Type : 'UI.DataField',
            Label : 'Invoice No.',
            Value : invoiceNo,
        },
        {
            $Type : 'UI.DataField',
            Value : RefInvoiceNo,
            Label : 'Ref-Invoice No.',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : 'Supplier Name',
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            Label : 'Date',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
            Label : 'Modified Date-Time',
        },],
    UI.SelectionPresentationVariant #tableView3 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView2',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : invoiceNoN,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'In Approval',
                        },
                    ],
                },],
        },
        Text : 'In Approval',
    }
);
annotate service.invoiceCockpit with @(
    UI.LineItem #tableView3 : [
         {
            $Type : 'UI.DataField',
            Label : 'Invoice No.',
            Value : invoiceNo,
        },
        {
            $Type : 'UI.DataField',
            Value : RefInvoiceNo,
            Label : 'Ref-Invoice No.',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : 'Supplier Name',
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            Label : 'Date',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
            Label : 'Modified Date-Time',
        },],
    UI.SelectionPresentationVariant #tableView4 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView3',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : invoiceNoN,
                    Descending : true,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Submitted to ERP',
                        },
                    ],
                },],
        },
        Text : 'Submitted to ERP',
    }
);
annotate service.invoiceCockpit with @(
    UI.DeleteHidden : true,
    UI.UpdateHidden:{$value: editable}
);
annotate service.invoiceCockpit with @(
    UI.FieldGroup #CommentsOptional : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : comments,
            },],
    }
);

