using elipodb as my from '../db/data-model';

service CatalogService {
    

entity OverviewInvoice as projection on my.OverviewInvoice;
       entity invoice_overview as select from my.invoiceCockpit {
        // key test as
        
         key 'demo' as demoKey : String,
         cast(sum(case when status = 'Draft' then 1 else 0 end) as String) as draft,
         cast(sum(case when status = 'In Approval' then 1 else 0 end) as String) as inApproval,
               cast(sum(
        CASE 
            WHEN status = 'In Approval' 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS inApprovalAmount,
          cast(sum(
        CASE 
            WHEN status = 'Draft' 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS draftAmount,
        cast(sum(case when status = 'New' then 1 else 0 end) as String) as new,
          cast(sum(
        CASE 
            WHEN status = 'New' 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS newAmount,
        cast(sum(case when status = 'Rejected' then 1 else 0 end) as String) as Rejected,
          cast(sum(
        CASE 
            WHEN status = 'Rejected' 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS RejectedAmount,
    cast(sum(case when status = 'Submitted to ERP' then 1 else 0 end) as String) as processed,
      cast(sum(
        CASE 
            WHEN status = 'Submitted to ERP' 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS processedAmount,
        cast(sum(case when status = 'Approved' then 1 else 0 end) as String) as Approved,
          cast(sum(
        CASE 
            WHEN status = 'Approved' 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS approvedAmount,

         
         cast(sum(
    CASE 
        WHEN (DAYS_BETWEEN(baselineDate, CURRENT_DATE) > 0) 
        AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
        THEN cast(amount as Decimal(15,2)) 
        ELSE 0 
    END
) as Decimal(15, 2)) AS overDueAmount,
         
         cast(count(
    CASE 
        WHEN (DAYS_BETWEEN(baselineDate, CURRENT_DATE) > 0) 
        AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
        THEN 1
        ELSE null
    END
) as String) AS overDue,

cast(sum(
    CASE 
        WHEN (DAYS_BETWEEN(CURRENT_DATE,baselineDate) > 0) 
        AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
        THEN cast(amount as Decimal(15,2)) 
        ELSE 0 
    END
) as Decimal(15, 2)) AS currentPayableAmount,
cast(count(
    CASE 
        WHEN (DAYS_BETWEEN(CURRENT_DATE,baselineDate) > 0) 
        AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
        THEN 1
        ELSE null
    END
) as String) AS currentPayable,


  cast(
        sum(
            CASE 
                WHEN (DAYS_BETWEEN(baselineDate, CURRENT_DATE) > 0) 
                AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
                THEN cast(amount as Decimal(15,2)) 
                ELSE 0 
            END
        ) + 
        sum(
            CASE 
                WHEN (DAYS_BETWEEN(baselineDate, CURRENT_DATE) < 0) 
                AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
                THEN cast(amount as Decimal(15,2)) 
                ELSE 0 
            END
        )
    as Decimal(15, 2)) AS totalPayableAmount,
cast(
        count(
            CASE 
                WHEN (DAYS_BETWEEN(baselineDate, CURRENT_DATE) > 0) 
                AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
                THEN 1
                ELSE null
            END
        ) + 
        count(
            CASE 
                WHEN (DAYS_BETWEEN(baselineDate, CURRENT_DATE) < 0) 
                AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
                THEN 1
                ELSE null
            END
        )
    as String) AS totalPayable,



      cast(sum(
        CASE 
            WHEN (DAYS_BETWEEN(CURRENT_DATE, baselineDate) = 0)
            AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS payableByTodayAmount,
          cast(count(
        CASE 
            WHEN (DAYS_BETWEEN(CURRENT_DATE, baselineDate) = 0)
            AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
            THEN 1
            ELSE null 
        END
    ) as String) AS payableByToday,

    cast(sum(
        CASE 
            WHEN (DAYS_BETWEEN(CURRENT_DATE, baselineDate) BETWEEN 1 AND 7)
            AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
            THEN cast(amount as Decimal(15,2)) 
            ELSE 0 
        END
    ) as Decimal(15, 2)) AS payableWithin7DaysAmount,
        cast(count(
        CASE 
            WHEN (DAYS_BETWEEN(CURRENT_DATE, baselineDate) BETWEEN 1 AND 7)
            AND (status = 'New' OR status = 'Draft' OR status = 'In Approval') 
            THEN 1
            ELSE null 
        END
    ) as String) AS payableWithin7Days


    };
    entity approvalWorkFlow as projection on my.approvalWorkFlow;
    entity supplierFiles as projection on my.supplierFiles;
    entity supplierItems as projection on my.supplierItems;
    @odata.draft.enabled
    entity supplier as projection on my.supplier;
     @cds.redirection.target
     entity trackInvoice as projection on my.invoiceCockpit;
     entity Files as projection on my.Files;
     entity internalOrderSh as projection on my.internalOrderSh;
     entity costCenterSh as projection on my.costCenterSh ;
     entity glAccountSh as projection on my.glAccountSh;
     entity companyCodeSh as projection on my.companyCodeSh;
     entity currencySh as projection on my.currencySh;
     entity paymentMethodSh as projection on my.paymentMethodSh;
     entity vendorCodeSh as projection on my.vendorCodeSh;
     entity paymrntTermsSh as projection on my.paymrntTermsSh;
     entity invoiceCockpitItems as projection on my.invoiceCockpitItems;
     @odata.draft.enabled
     entity invoiceCockpit as projection on my.invoiceCockpit;
     entity statusSh as projection on my.statusSh;
     entity cc as projection on my.cc;
     @odata.draft.enabled
     entity emailNotification as projection on my.emailNotification;
     entity approvalTypeSh as projection on my.approvalTypeSh;
     entity criteriaSh as projection on my.criteriaSh;
     entity conditionsSh as projection on my.conditionsSh;
     entity approversChildMembers as projection on my.approversChildMembers;
     entity approversChildGroups as projection on my.approversChildGroups;
     entity rulesChild as projection on my.rulesChild;
     entity approversChild as projection on my.approversChild;
     @odata.draft.enabled
     entity rulesParent as projection on my.rulesParent;
     entity members as projection on my.members;
     @odata.draft.enabled
     entity groups as projection on my.groups;
     entity departmentSh as projection on my.departmentSh;
     entity roleSh as projection on my.roleSh;
     @odata.draft.enabled
     entity assignRole as projection on my.assignRole;
     entity Books as projection on my.Books;


         function postattach(p:String) returns String;
         function deleteDrafts(p:String) returns String;


/***********Master******************************/
    entity MasterSearchHelp  as projection on my.MasterSearchHelp;
    entity Company_code      as projection on my.Company_code;
    entity Cost_center       as projection on my.Cost_center;
    entity Document_type     as projection on my.Document_type;
    entity Currency          as projection on my.Currency;
    entity Default_master    as projection on my.Default_master;
    entity Dept_budget       as projection on my.Dept_budget;
    entity Department        as projection on my.Department;
    entity G_L_Account       as projection on my.G_L_Account;
    entity Internal_order    as projection on my.Internal_order;
    entity Item_category     as projection on my.Item_category;
    entity Jurisdiction_code as projection on my.Jurisdiction_code;
    entity Material_master   as projection on my.Material_master;
    entity Plant             as projection on my.Plant;
    entity Tax_code          as projection on my.Tax_code;
    entity Unit_Measures     as projection on my.Unit_Measures;
    entity Vendor_master     as projection on my.Vendor_master;
     @cds.persistence.skip
     @odata.singleton
     entity ExcelUpload {
          @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          excel : LargeBinary;
     };
    /*****************************************Setting**********************************************/
    entity Setting           as projection on my.Setting;
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
    


}
