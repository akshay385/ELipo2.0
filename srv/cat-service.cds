using elipodb as my from '../db/data-model';

service CatalogService {
    entity approvalWorkFlow as projection on my.approvalWorkFlow;
    entity supplierFiles as projection on my.supplierFiles;
    entity supplierItems as projection on my.supplierItems;
    @odata.draft.enabled
    entity supplier as projection on my.supplier;
     @cds.redirection.target
     entity trackInvoice as projection on my.invoiceCockpit;
     entity Files as projection on my.Files;
     entity internalOrderSh as projection on my.internalOrderSh;
     entity costCenterSh as projection on my.costCenterSh;
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
}
