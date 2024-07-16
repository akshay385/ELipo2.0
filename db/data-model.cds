namespace elipodb;

using {managed} from '@sap/cds/common';


// @cds.persistence.journal
entity supplierFiles : managed {
    key id        : UUID;
        fkey      : UUID;

        @Core.MediaType  : mediaType
        content   : LargeBinary;

        @Core.IsMediaType: true
        mediaType : String;
        fileName  : String;
        size      : Integer;
        url       : String;
        filtoinv  : Association to one supplier
                        on filtoinv.uuid = fkey;
}

entity supplierItems {
      key Itemid      : UUID;
        invoiceNo   : UUID;
        invoiceNoS  : String;
        Item        : String;
        Item_No     : String;
        Material    : String;
        HSN_Code    : String;
        Qty         : String;
        qc          : Boolean;
        Unit_Price  : String;
        GL_Acc      : String;
        Plant       : String;
        Cost_Center : String;
        Disc_Per    : String;
        GST_Per     : String;
        Taxable_Amt : String;
        Tax_Amt     : String;
        Total_Amt   : String;
        itemstoinv  : Association to one supplier
                          on itemstoinv.uuid = invoiceNo;
}

entity supplier : managed {
     key uuid                : UUID;
        invoiceNo           : String default ' ';
        RefInvoiceNo        : String;
        supplierName        : String;
        status              : String default'Draft';
        editable            : Boolean;
        comments            : LargeString;
        supplieruserid      : String;
        section             : String;
        criticality         : Int16;
        workflowId          :String;

        @Core.MediaType  : mediaType
        content             : LargeBinary;

        @Core.IsMediaType: true
        mediaType           : String default 'application/pdf';
        apProcessor         : String;
        fileName            : String;
        size                : Integer;
        url                 : String;
        irn                 : String;
        refPoNum            : String;
        gstin               : String;
        DocumentType        : String;
        RefInvoiceNo1       : String;
        invoiceDate         : Date;
        postingDate         : Date;
        baselineDate        : Date;
        VendorCode          : String;
        paymentTerms        : String;
        paymentMethod       : String;
        companyCode         : String;
        currency            : String;
        departmentName      : String;
        glAccount           : String;
        costCenter          : String;
        internalOrder       : String;
        taxableAmount       : String;
        adjustment          : String;
        amount              : String;
        invoiceNoN          : Int32;
        tcs                 : String;
        tdsPer              : String;
        tdsTotAmt           : String;
        discountPer         : String;
        totalDiscountAmount : String;
        vatPer              : String;
        fileLink            : LargeString;
        value1              : Boolean;
        value               : Integer;
        bool                : Boolean;
        GstPerc             : String;
        IGST                : Boolean;
        IGSTVal             : String;
        CGST                : String;
        SGST                : String;
        invtoitems          : Composition of many supplierItems
                                  on invtoitems.itemstoinv = $self;
        invtofil            : Composition of many supplierFiles
                                  on invtofil.filtoinv = $self;
}

entity approvalWorkFlow : managed {
    //  uuid           : UUID;
        key invoiceNo      : String;
        key level          : String;
        invoiceuuid    : UUID;
        status         : String;
        approversmails : String;
        members        : String;
        groups         : String;
        actionBy :            String;

}

entity Files : managed {
    key id        : UUID;
        fkey      : UUID;

        @Core.MediaType  : mediaType
        content   : LargeBinary;

        @Core.IsMediaType: true
        mediaType : String;
        fileName  : String;
        size      : Integer;
        url       : String;
        filtoinv  : Association to one invoiceCockpit
                        on filtoinv.uuid = fkey;
        
}

entity internalOrderSh {
    key internalOrder : String;
        description   : String;
}

entity costCenterSh {
    key costCenter  : String;
        description : String;
}

entity glAccountSh {
    key glAccount   : String;
        description : String;
}

entity companyCodeSh {
    key companyCode : String;
        description : String;
}

entity currencySh {
    key currency    : String;
        description : String;
}

entity paymentMethodSh {
    key PaymentMethod : String;
        description   : String;
}

entity vendorCodeSh {
    key VendorCode  : String;
        description : String;
}

entity paymrntTermsSh {
    key paymrntTerms : String;
        description  : String;
}

entity invoiceCockpitItems {
    key Itemid      : UUID;
        invoiceNo   : UUID;
        invoiceNoS  : String;
        Item        : String;
        Item_No     : String;
        Material    : String;
        HSN_Code    : String;
        Qty         : String;
        qc          : Boolean;
        Unit_Price  : String;
        GL_Acc      : String;
        Plant       : String;
        Cost_Center : String;
        Disc_Per    : String;
        GST_Per     : String;
        Taxable_Amt : String;
        Tax_Amt     : String;
        Total_Amt   : String;
        itemstoinv  : Association to one invoiceCockpit
                          on itemstoinv.uuid = invoiceNo;
        itemstosup  : Association to one supplier
                          on itemstosup.uuid = invoiceNo;
}

entity invoiceCockpit : managed {
    key uuid                : UUID;
        invoiceNo           : String default ' ';
        RefInvoiceNo        : String;
        supplierName        : String;
        status              : String;
        editable            : Boolean;
        comments            : LargeString;
        supplieruserid      : String;
        section             : String;
        criticality         : Int16;
        workflowId          :String;

        @Core.MediaType  : mediaType
        content             : LargeBinary;

        @Core.IsMediaType: true
        mediaType           : String default 'application/pdf';
        apProcessor         : String;
        fileName            : String;
        size                : Integer;
        url                 : String;
        irn                 : String;
        refPoNum            : String;
        gstin               : String;
        DocumentType        : String;
        RefInvoiceNo1       : String;
        invoiceDate         : Date;
        postingDate         : Date;
        baselineDate        : Date;
        VendorCode          : String;
        paymentTerms        : String;
        paymentMethod       : String;
        companyCode         : String;
        currency            : String;
        departmentName      : String;
        glAccount           : String;
        costCenter          : String;
        internalOrder       : String;
        taxableAmount       : String;
        adjustment          : String;
        amount              : String;
        invoiceNoN          : Int32;
        tcs                 : String;
        tdsPer              : String;
        tdsTotAmt           : String;
        discountPer         : String;
        totalDiscountAmount : String;
        vatPer              : String;
        fileLink            : LargeString;
        value1              : Boolean;
        value               : Integer;
        bool                : Boolean;
        GstPerc             : String;
        IGST                : Boolean;
        IGSTVal             : String;
        CGST                : String;
        SGST                : String;
        invtoitems          : Composition of many invoiceCockpitItems
                                  on invtoitems.itemstoinv = $self;
        invtofil            : Composition of many Files
                                  on invtofil.filtoinv = $self;
}

entity emailNotification {
    key status      : String;
        mailSubject : String;
        mailBody    : String;
        emailtocc   : Composition of many cc
                          on emailtocc.cctoemail = $self;
}

entity cc {
    key emailId   : String;
    key status    : String;
        name      : String;
        cctoemail : Association to one emailNotification
                        on cctoemail.status = status;
}

entity statusSh {
    key status : String;
}

entity approvalTypeSh {
    key approvaltype : String;
}

entity conditionsSh {
    key uuid        : UUID;
        relatedTo   : String;
        sh          : String;
        description : String;
}
entity value1Sh {
    key uuid        : UUID;
        relatedTo   : String;
        sh          : String;
        description : String;
}

entity criteriaSh {
    key criteria : String;
}

entity rulesParent {
    key uuid         : UUID;
        approvalType : String default 'Series';
        comments     : LargeString;
        active       : Boolean;
        dueDays      : Int16;
        escalateTo   : String;
        rulptorul    : Composition of many rulesChild
                           on rulptorul.rultorulp = $self;
        rulptoapp    : Composition of many approversChild
                           on rulptoapp.apptorulp = $self;
}

entity rulesChild {
    key uuidc1          : UUID;
        uuid            : UUID;
        concatCondition : String;
        criteria        : String default ' ';
        condition       : String;
        value1          : String;
        value2          : String;
        rultorulp       : Association to one rulesParent
                              on rultorulp.uuid = uuid;
}

entity approversChild {
    key uuidc1    : UUID;
        uuid      : UUID;
        level     : String;
        apptoappm : Composition of many approversChildMembers
                        on apptoappm.appmtoapp = $self;
        apptoappg : Composition of many approversChildGroups
                        on apptoappg.appgtoapp = $self;
        apptorulp : Association to one rulesParent
                        on apptorulp.uuid = uuid;
}

entity approversChildGroups {
    key uuidc2    : UUID;
        uuidc1    : UUID;
        groupName : String;
        appgtoapp : Association to one approversChild
                        on appgtoapp.uuidc1 = uuidc1
}

entity approversChildMembers {
    key uuidc2         : UUID;
        uuidc1         : UUID;
        memberName     : String;
        assignRoleUUID : UUID;
        appmtoapp      : Association to one approversChild
                             on appmtoapp.uuidc1 = uuidc1;
}

entity groups {
    key groupName   : String;
        description : String;
        grptomem    : Composition of many members
                          on grptomem.memtogrp = $self;
}

// @cds.persistence.journal
entity members {
    key uuuid      : UUID;
    key groupName  : String;
        memberName : String;
        role       : String;
        emailId    : String;
        memtogrp   : Association to one groups
                         on memtogrp.groupName = groupName;
}

entity assignRole {
    key UUID       : UUID;
    key emailId    : String;
        role       : String;
        name       : String;
        department : String;
        f2         : String;
        f3         : String;

}

entity departmentSh {
    key departmentName : String;
        description    : String;
}

entity roleSh {
    key roleName : String;
}

entity Books {
    key ID    : Integer;
        title : String;
        stock : Integer;
}

entity OverviewInvoice {

    invoicekey   : String         @Analytics.Dimension;
    invoicevalue : Decimal(10, 2) @Analytics.Measure;
}

annotate OverviewInvoice with @Aggregation.ApplySupported: {
    $Type               : 'Aggregation.ApplySupportedType',
    PropertyRestrictions: true,

};


/*****************************************master**************************/
entity MasterSearchHelp {
    mastervalue : String;
    masterkey   : String;
}

entity Company_code {
    key code          : String;
        description   : String;
        tax_treatment : String;
}

entity Cost_center {
    key code        : String;
        description : String;
        master_name : String;
}

entity Document_type {
    key code        : String;
        description : String;
        master_name : String;
}

entity Currency {
    key code        : String;
        description : String;
        master_name : String;
}

entity Default_master {
    key company_code      : String;
        country           : String;
        currency          : String;
        document_type     : String;
        gl_account_header : String;
        payment_method    : String;
        plant             : String;
        vendor_code       : String;
        tax_per           : String;
        tds_per           : String;
}

entity Dept_budget {
        budget          : Integer;
    key department_id   : String;
        department_name : String;
        limit_per       : Integer;
        valid_from      : Date;
        valid_to        : Date;
        warning_per     : Integer;
}


entity Department {
        cost_center          : String;
        default_master_check : Boolean;
        department_id        : String;
        department_name      : String;
        email                : String;
        gl_account           : String;
        internal_order       : String;
        userid               : String;
        member_name          : String;
    key sr_no                : String;
}

entity G_L_Account {
    key code        : String;
        description : String;
        master_name : String;
}

entity Internal_order {
    key code        : String;
        description : String;
        master_id   : Integer;
        master_name : String;
}

entity Item_category {
    key code        : String;
        description : String;
        master_id   : Integer;
        master_name : String;
}

entity Jurisdiction_code {
    key code        : String;
        description : String;
        master_id   : Integer;
}

entity Material_master {
        gl_account      : String;
        gst_per         : String;
        hsn_code        : String;
        material_name   : String;
    key material_no     : String;
        unit_price      : String;
        uom             : String;
        uom_description : String;
}

entity Plant {
    key code        : String;
        description : String;
        master_name : String;
}

entity Tax_code {
    key company_code : String;
        country      : String;
        description  : String;
    key tax_code     : String;
        tax_per      : String;
}

entity Unit_Measures {
    key code        : String;
        description : String;
        master_name : String;
}

entity Vendor_master {
        currency           : String;
        email              : String;
        gst_per            : String;
        gst_treatment      : String;
        gstin_uin          : String;
        international_code : String;
        jurisdiction_code  : String;
        member_id          : String;
        member_name        : String;
        pan                : String;
        payment_terms      : String;
        source_of_supply   : String;
        email1             : String;
        email2             : String;
        email3             : String;
        tds                : String;
        vendor_name        : String;
    key vendor_no          : String;
}


/**************************setting******************************************************/

entity Setting {
    key id                                       : UUID;
        sap_or_zoho                              : String;
        url_to_post_invoice                      : String;
        url_to_fetch_po_detail                   : String;
        url_to_fetch_payment_status              : String;
        login_id                                 : String;
        login_password                           : String;
        enable_invoice_posting_integration       : Boolean;
        enable_po_validation_integration         : Boolean;
        enable_po_validation_3way_match          : Boolean;
        send_attachments_to_erp                  : Boolean;
        post_npo_invoice_to                      : String;
        enable_supplier_enquiries                : Boolean;
        enable_assignment_rules                  : Boolean;
        enable_version_control_revised_invoices  : Boolean;
        enable_approval_rules                    : Boolean;
        enable_manual_qc_check                   : Boolean;
        set_tolerance_limit_departmental_budgets : Boolean;
        auto_schedule_ocr                        : Boolean;
        use_aws_textract_or_paper_ai_for_ocr     : String;
        process_invoice_or_po                    : String;
        get_payment_status_from_erp              : Boolean;
        sync_master_data                         : Boolean;
        notification_days_before_due_date        : Integer;
        auto_trigger_approval_if_error_free      : Boolean;
        enable_accuracy_parameters               : Boolean;
        enable_user_activity_tracking            : Boolean;
        select_country                           : String;
        set_notification_email_id                : String;
        enter_company_gstin                      : String;
        set_ocr_centralized_email_id             : String;
        upload_company_logo                      : String;

        @Core.MediaType  : mediaType
        content                                  : LargeBinary;

        @Core.IsMediaType: true
        mediaType                                : String;
        filename                                 : String;
}

// entity donutchart1{
// key id : String;
// val1 : Integer;
// val2 : Integer;
// val3 : Integer;
// val4 : Integer;
// }

//Aging Report list
// entity Aging_Overview_Comp_Code
// {
//     key CoCd : String;
//     Day1 : String;
//     Day2 : String;
//     Day3 : String;
//     Day4 : String;
// }

// entity Aging_Overview_Vendor
// {
//     key Vendor_No : String;
//     Day1 : String;
//     Day2 : String;
//     Day3 : String;
//     Day4 : String;
// }

// entity vendor {
//     key vendor : String;
//     invoice_no : String;
//     Date : String;
//     Amt_Due : String;
//     days_outstanding : String;
//     Day1 : String;
//     Day2 : String;
//     Day3 : String;
//     Day4 : String
// }

// //aging report chart

// entity age {
//     key ID        : UUID;
//         dimension : String;
//         measure   : Integer;
//         measure1 : Integer;
//         none : Integer;
// }
// entity age1 {
//     key ID        : UUID;
//         dimension : String;
//         measure   : Integer;
//         measure1 : Integer;
//         none : Integer;
//         dimension2 : String;
// }

// //key process analyticsv report
// entity key_process
// {
//    key ID : UUID;
//     dimension : String;
//     measure : Integer;
//     measure1 : Integer;
// }

// entity vendor_based_amt 
// {
//      key ID : UUID;
//     dimension : String;
//     measure : Integer;
// }
// entity vendor_based_amt2
// {
//      key ID : UUID;
//     dimension : String;
//     measure : Integer;
// }

// //produtivity report

// entity linechart
// {
//     key id : String;
//     dimension : String;
//     measure : Integer;
//     measure1 : Integer;
//     measure2 : Integer;
//     measure3 : Integer;
// }

// entity productivity_bar
// {
//     key id : String;
//     dimension : String;
//     measure : Integer;
//     measure1 : Integer;
// }


entity invoiceComments:managed{
  key idd : UUID;
  key invoiceNo : String;
  user :String;
  Comments : LargeString; 
  status:String;
}
