using elipodb as my from '../db/data-model';

service CatalogService {


    entity OverviewInvoice          as projection on my.OverviewInvoice;

    entity invoice_overview         as
        select from my.invoiceCockpit {
                // key test as

            key 'demo' as demoKey :           String,
                cast(
                    sum(
                        case
                            when
                                status = 'Draft'
                            then
                                1
                            else
                                0
                        end
                    ) as                      String
                )      as draft,
                cast(
                    sum(
                        case
                            when
                                status = 'In Approval'
                            then
                                1
                            else
                                0
                        end
                    ) as                      String
                )      as inApproval,
                cast(
                    sum(
                        case
                            when
                                status = 'In Approval'
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as inApprovalAmount,
                cast(
                    sum(
                        case
                            when
                                status = 'Draft'
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as draftAmount,
                cast(
                    sum(
                        case
                            when
                                status = 'New'
                            then
                                1
                            else
                                0
                        end
                    ) as                      String
                )      as new,
                cast(
                    sum(
                        case
                            when
                                status = 'New'
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as newAmount,
                cast(
                    sum(
                        case
                            when
                                status = 'Rejected'
                            then
                                1
                            else
                                0
                        end
                    ) as                      String
                )      as Rejected,
                cast(
                    sum(
                        case
                            when
                                status = 'Rejected'
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as RejectedAmount,
                cast(
                    sum(
                        case
                            when
                                status = 'Submitted to ERP'
                            then
                                1
                            else
                                0
                        end
                    ) as                      String
                )      as processed,
                cast(
                    sum(
                        case
                            when
                                status = 'Submitted to ERP'
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as processedAmount,
                cast(
                    sum(
                        case
                            when
                                status = 'Approved'
                            then
                                1
                            else
                                0
                        end
                    ) as                      String
                )      as Approved,
                cast(
                    sum(
                        case
                            when
                                status = 'Approved'
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as approvedAmount,


                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) > 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as overDueAmount,

                cast(
                    count(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) > 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                1
                            else
                                null
                        end
                    ) as                      String
                )      as overDue,

                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) > 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as currentPayableAmount,
                cast(
                    count(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) > 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                1
                            else
                                null
                        end
                    ) as                      String
                )      as currentPayable,


                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) > 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    )+sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) < 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as totalPayableAmount,
                cast(
                    count(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) > 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                1
                            else
                                null
                        end
                    )+count(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) < 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                1
                            else
                                null
                        end
                    ) as                      String
                )      as totalPayable,


                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) = 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as payableByTodayAmount,
                cast(
                    count(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) = 0
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                1
                            else
                                null
                        end
                    ) as                      String
                )      as payableByToday,

                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) between 1 and 7
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                            else
                                0
                        end
                    ) as                      Decimal(15, 2)
                )      as payableWithin7DaysAmount,
                cast(
                    count(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) between 1 and 7
                                )
                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                1
                            else
                                null
                        end
                    ) as                      String
                )      as payableWithin7Days


        };

    entity approvalWorkFlow         as projection on my.approvalWorkFlow;
    entity supplierFiles            as projection on my.supplierFiles;
    entity supplierItems            as projection on my.supplierItems;

    @odata.draft.enabled
    entity supplier                 as projection on my.supplier;

    @cds.redirection.target
    entity trackInvoice             as projection on my.invoiceCockpit;

    entity Files                    as projection on my.Files;
    entity internalOrderSh          as projection on my.internalOrderSh;
    entity costCenterSh             as projection on my.costCenterSh;
    entity glAccountSh              as projection on my.glAccountSh;
    entity companyCodeSh            as projection on my.companyCodeSh;
    entity currencySh               as projection on my.currencySh;
    entity paymentMethodSh          as projection on my.paymentMethodSh;
    entity vendorCodeSh             as projection on my.vendorCodeSh;
    entity paymrntTermsSh           as projection on my.paymrntTermsSh;
    entity invoiceCockpitItems      as projection on my.invoiceCockpitItems;

    @odata.draft.enabled
    entity invoiceCockpit           as projection on my.invoiceCockpit;

    entity statusSh                 as projection on my.statusSh;
    entity cc                       as projection on my.cc;

    @odata.draft.enabled
    entity emailNotification        as projection on my.emailNotification;

    entity approvalTypeSh           as projection on my.approvalTypeSh;
    entity criteriaSh               as projection on my.criteriaSh;
    entity conditionsSh             as projection on my.conditionsSh;
    entity value1Sh                 as projection on my.value1Sh;
    entity approversChildMembers    as projection on my.approversChildMembers;
    entity approversChildGroups     as projection on my.approversChildGroups;

    @Common.SideEffects: {
        $Type           : 'Common.SideEffectsType',
        SourceProperties: [
            'value1',
            'condition',
            'criteria',
            'value2'
        ],
        TargetProperties: [
            'concatCondition',
            'value1',
            'condition',
            'criteria'
        ],

    }
    entity rulesChild               as projection on my.rulesChild;

    @Common.SideEffects: {
        $Type           : 'Common.SideEffectsType',
        SourceProperties: [
            'apptoappg/uuidc2',
            'apptoappm/uuidc2'
        ],
        TargetProperties: ['level'],

    }
    entity approversChild           as projection on my.approversChild;

    @odata.draft.enabled
    entity rulesParent              as projection on my.rulesParent;

    entity members                  as projection on my.members;

    @odata.draft.enabled
    entity groups                   as projection on my.groups;

    entity departmentSh             as projection on my.departmentSh;
    entity roleSh                   as projection on my.roleSh;

    @odata.draft.enabled
    entity assignRole               as projection on my.assignRole;

    entity Books                    as projection on my.Books;
    function postattach(p : String)        returns String;
    function showFooterInv(p : String)        returns Boolean;
    function extract(p : String)           returns String;
    function deleteDrafts(p : String)      returns String;
    /***********Master******************************/
    entity MasterSearchHelp         as projection on my.MasterSearchHelp;
    entity Company_code             as projection on my.Company_code;
    entity Cost_center              as projection on my.Cost_center;
    entity Document_type            as projection on my.Document_type;
    entity Currency                 as projection on my.Currency;
    entity Default_master           as projection on my.Default_master;
    entity Dept_budget              as projection on my.Dept_budget;
    entity Department               as projection on my.Department;
    entity G_L_Account              as projection on my.G_L_Account;
    entity Internal_order           as projection on my.Internal_order;
    entity Item_category            as projection on my.Item_category;
    entity Jurisdiction_code        as projection on my.Jurisdiction_code;
    entity Material_master          as projection on my.Material_master;
    entity Plant                    as projection on my.Plant;
    entity Tax_code                 as projection on my.Tax_code;
    entity Unit_Measures            as projection on my.Unit_Measures;
    entity Vendor_master            as projection on my.Vendor_master;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

    /*****************************************Setting**********************************************/
    entity Setting                  as projection on my.Setting;
    //function import
    function getDynamicCol(sName : String) returns String;
    function getSettingData()              returns String;

    annotate OverviewInvoice with @UI.Chart #Overview_page: {
        ChartType          : #Donut,
        Measures           : [invoicevalue],
        MeasureAttributes  : [{
            Measure: invoicevalue,
            Role   : #Axis1
        }],
        Dimensions         : [invoicekey],
        DimensionAttributes: [{
            Dimension: invoicekey,
            Role     : #Category
        }]
    };

    //====================AKshay===================
    // entity Invoice1              as
    //     select from my.invoiceCockpit {
    //         key invoiceNo as Invoice_No : String,

    //     }

    entity Invoice1                 as
        select from my.invoiceCockpit as ic
        join my.approvalWorkFlow as aw
            on ic.invoiceNo = aw.invoiceNo
        join my.Vendor_master as vm
            on ic.supplierName = vm.vendor_name
        {
            ic.invoiceNo      as Invoice_No     : String,
            ic.supplierName   as Vendor_name    : String,
            ic.DocumentType   as Document_Type  : String,
            ic.status         as Invoice_Status : String,
            ic.amount         as Amount         : String,
            ic.invoiceDate    as Invoice_Date   : String,
            ic.baselineDate   as Days_to_Due    : String,
            ic.paymentTerms   as Payment_Terms  : String,
            ic.refPoNum       as Ref_Po_No      : String,
            ic.companyCode    as Comp_Code      : String,
            ic.apProcessor    as Ap_Processor   : String,
            aw.approversmails as Approvers      : String,
            vm.vendor_no      as Vendor_No      : String,

        };

    entity liabilitylist            as
        select from my.Vendor_master as vm
        join my.invoiceCockpit as ic
            on ic.supplierName = vm.vendor_name
        {
            vm.vendor_name as vendor_name    : String,
            vm.vendor_no   as vendor_no      : String,
            ic.companyCode as company_code   : String,
            count(
                ic.invoiceNo
            )              as total_invoices : Integer, 
        }
        group by
            vm.vendor_name,
            vm.vendor_no,
            ic.companyCode;


    entity invoiceComments          as projection on my.invoiceComments;

//chart
    entity donutchart1              as
        select from my.invoiceCockpit as ic {
            key ic.status as status,
                cast(
                    sum(
                        cast(
                            amount as Decimal(15, 2)
                        )
                    ) as              Decimal(15, 2)
                )         as totalAmount,
        }
        group by
            ic.status;

    entity donutchart2              as
        select from my.invoiceCockpit as ic {
            key 'demo' as demoKey :           String,
                cast(
                    sum(
                        case
                            when
                                status = 'Submitted to ERP'
                            then
                                1
                            else
                                0
                        end
                    ) as                      Decimal(10, 2)
                )      as processed,

                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        CURRENT_DATE, baselineDate
                                    ) > 0
                                )

                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                        end
                    ) as                      Decimal(15, 2)
                )      as currentPayableAMount,

                cast(
                    sum(
                        case
                            when
                                (
                                    DAYS_BETWEEN(
                                        baselineDate, CURRENT_DATE
                                    ) > 0
                                )

                                and (
                                    status    = 'New'
                                    or status = 'Draft'
                                    or status = 'In Approval'
                                )
                            then
                                cast(
                                    amount as Decimal(15, 2)
                                )
                        end
                    ) as                      Decimal(15, 2)
                )      as overDueAmount,
        }
//Aging report 
   
entity Aging_Overview_Comp_code as
        select from my.invoiceCockpit as ic {
             key 'key1' as demoKey :           String,
            cast(
                count(
                    case
                        when
                            ic.DocumentType =       'PO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               between 0 and 30
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as PO_0_30_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType =       'PO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               between 31 and 60
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as PO_31_60_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType =       'PO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               between 61 and 90
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as PO_61_90_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType = 'PO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               > 91
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as PO_GT_91_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType =       'NPO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               between 0 and 30
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as NPO_0_30_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType =       'NPO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               between 31 and 60
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as NPO_31_60_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType =       'NPO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               between 61 and 90
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as NPO_61_90_Days,
            cast(
                count(
                    case
                        when
                            ic.DocumentType = 'NPO'
                            and DAYS_BETWEEN(
                                ic.postingDate, CURRENT_DATE
                            )               > 91
                        then
                            1
                        else
                            null
                    end
                ) as Integer
            ) as NPO_GT_91_Days,

        }

   entity Aging_Overview_Vendor as
select from my.invoiceCockpit as ic
inner join my.Vendor_master as vm
on ic.supplierName = vm.vendor_name
{
   vm.vendor_no as vendor_no : String,
     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) between 0 and 30
               then 1
               else null
           end
       ) as Integer
   ) as v0_30Days,

     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) between 31 and 60
               then 1
               else null
           end
       ) as Integer
   ) as v31_60Days,
     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) between 61 and 91
               then 1
               else null
           end
       ) as Integer
   ) as v61_90Days,
     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) >  91
               then 1
               else null
           end
       ) as Integer
   ) as vGT_91Days

}
group by vm.vendor_no;

entity vendor as 
select from my.invoiceCockpit as ic 
inner join my.Vendor_master as vm
on ic.supplierName = vm.vendor_name
{
    vm.vendor_name as vendor_name : String,
    ic.invoiceNo as invoice_no :  String,
    ic.invoiceDate as invoice_date : String,


     cast(
       count(
           case
               when DAYS_BETWEEN( ic.postingDate,CURRENT_DATE) between 0 and 30
               then 1
               else null
           end
       ) as Integer
   ) as v30Days,
     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) between 31 and 60
               then 1
               else null
           end
       ) as Integer
   ) as v31_60Days,
     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) between 61 and 90
               then 1
               else null
           end
       ) as Integer
   ) as v61_90Days,
     cast(
       count(
           case
               when DAYS_BETWEEN(ic.postingDate,CURRENT_DATE) > 91
               then 1
               else null
           end
       ) as Integer
   ) as vGT_91Days,
}
group by vm.vendor_name,
ic.invoiceNo,
 ic.invoiceDate;

//key process analytics 
//process/in-processing invoices
entity progress as select from my.invoiceCockpit as ic
inner join my.approvalWorkFlow as aw 
on ic.invoiceNo = aw.invoiceNo
{
    key 'key2' as demoKey :           String,
    count(
        case
            when (aw.status = 'Approved' or aw.status = 'Rejected') and ic.DocumentType = 'PO'
            then 1
            else null
        end
    ) as PO_Processed : String,
    count(
        case
            when aw.status = 'Pending for Approval' and ic.DocumentType = 'PO'
            then 1
            else null
        end
    ) as PO_InProcess : String,
    count(
        case
            when (aw.status = 'Approved' or aw.status = 'Rejected') and ic.DocumentType = 'NPO'
            then 1
            else null
        end
    ) as NPO_Processed : String,
    count(
        case
            when aw.status = 'Pending for Approval' and ic.DocumentType = 'NPO'
            then 1
            else null
        end
    ) as NPO_InProcess : String,
    count(
        case
            when aw.status = 'Approved' or aw.status = 'Rejected'
            then 1
            else null
        end
    ) as Processed_ALL : String,
    count(
        case
            when aw.status = 'Pending for Approval'
            then 1
            else null
        end
    ) as In_Process_ALL : String,
}


//top 5 vendors by amount 
   entity key_process_list         as
        select from my.Vendor_master as vm
        join my.invoiceCockpit as ic
            on ic.supplierName = vm.vendor_name
        {
            vm.vendor_no        as vendor_no        : String,
            vm.vendor_name      as vendor_name      : String,
            vm.currency         as currency         : String,
            ic.amount           as amount           : String,
            vm.source_of_supply as source_of_supply : String
        }
function get_agingdata(ID:String) returns String;

}

