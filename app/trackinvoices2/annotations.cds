using CatalogService as service from '../../srv/cat-service';
annotate service.trackInvoice with @(
    UI.DeleteHidden : true,
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'invoiceNo',
                Value : invoiceNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RefInvoiceNo',
                Value : RefInvoiceNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'supplierName',
                Value : supplierName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'editable',
                Value : editable,
            },
            {
                $Type : 'UI.DataField',
                Label : 'comments',
                Value : comments,
            },
            {
                $Type : 'UI.DataField',
                Label : 'content',
                Value : content,
            },
            {
                $Type : 'UI.DataField',
                Label : 'mediaType',
                Value : mediaType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fileName',
                Value : fileName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'size',
                Value : size,
            },
            {
                $Type : 'UI.DataField',
                Label : 'url',
                Value : url,
            },
            {
                $Type : 'UI.DataField',
                Label : 'irn',
                Value : irn,
            },
            {
                $Type : 'UI.DataField',
                Label : 'refPoNum',
                Value : refPoNum,
            },
            {
                $Type : 'UI.DataField',
                Label : 'gstin',
                Value : gstin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DocumentType',
                Value : DocumentType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RefInvoiceNo1',
                Value : RefInvoiceNo1,
            },
            {
                $Type : 'UI.DataField',
                Label : 'invoiceDate',
                Value : invoiceDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'postingDate',
                Value : postingDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'baselineDate',
                Value : baselineDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'VendorCode',
                Value : VendorCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'paymentTerms',
                Value : paymentTerms,
            },
            {
                $Type : 'UI.DataField',
                Label : 'paymentMethod',
                Value : paymentMethod,
            },
            {
                $Type : 'UI.DataField',
                Label : 'companyCode',
                Value : companyCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'currency',
                Value : currency,
            },
            {
                $Type : 'UI.DataField',
                Label : 'departmentName',
                Value : departmentName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'glAccount',
                Value : glAccount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'costCenter',
                Value : costCenter,
            },
            {
                $Type : 'UI.DataField',
                Label : 'internalOrder',
                Value : internalOrder,
            },
            {
                $Type : 'UI.DataField',
                Label : 'taxableAmount',
                Value : taxableAmount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'adjustment',
                Value : adjustment,
            },
            {
                $Type : 'UI.DataField',
                Label : 'amount',
                Value : amount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'invoiceNoN',
                Value : invoiceNoN,
            },
            {
                $Type : 'UI.DataField',
                Label : 'tcs',
                Value : tcs,
            },
            {
                $Type : 'UI.DataField',
                Label : 'tdsPer',
                Value : tdsPer,
            },
            {
                $Type : 'UI.DataField',
                Label : 'tdsTotAmt',
                Value : tdsTotAmt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'discountPer',
                Value : discountPer,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalDiscountAmount',
                Value : totalDiscountAmount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'vatPer',
                Value : vatPer,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fileLink',
                Value : fileLink,
            },
            {
                $Type : 'UI.DataField',
                Label : 'value1',
                Value : value1,
            },
            {
                $Type : 'UI.DataField',
                Label : 'value',
                Value : value,
            },
            {
                $Type : 'UI.DataField',
                Label : 'bool',
                Value : bool,
            },
            {
                $Type : 'UI.DataField',
                Label : 'GstPerc',
                Value : GstPerc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IGST',
                Value : IGST,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IGSTVal',
                Value : IGSTVal,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CGST',
                Value : CGST,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SGST',
                Value : SGST,
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
            Label : 'Invoice No',
            Value : invoiceNo,
            Criticality : criticality,
            CriticalityRepresentation : #WithIcon,
            
        },
        {
            $Type : 'UI.DataField',
            Label : 'Ref.Invoice No',
            Value : RefInvoiceNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Supplier Name',
            Value : supplierName,
        },
        {
            $Type : 'UI.DataField',
            Value : invoiceDate,
            Label : 'Invoice Date',
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Invoice Status',
            Value : status,
            Criticality : criticality,
        },
    ],
);



annotate service.trackInvoice with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
            SortOrder : [
                {
                    $Type : 'Common.SortOrderType',
                    Property : invoiceNo,
                    Descending : false,
                },
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
