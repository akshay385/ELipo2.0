namespace elipodb;
using { managed } from '@sap/cds/common';


// @cds.persistence.journal
entity Files : managed{
    key id : UUID;
    fkey : UUID;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    filtoinv :Association to one invoiceCockpit on filtoinv.uuid = fkey;
}
entity internalOrderSh {
    key internalOrder:String;
    description : String;
}
entity costCenterSh {
    key costCenter:String;
    description : String;
}
entity glAccountSh {
    key glAccount:String;
    description : String;
}
entity companyCodeSh {
    key companyCode:String;
    description : String;
}
entity currencySh {
    key currency:String;
    description : String;
}
entity paymentMethodSh {
    key PaymentMethod:String;
    description : String;
}
entity vendorCodeSh {
    key VendorCode:String;
    description : String;
}
entity paymrntTermsSh {
    key paymrntTerms:String;
    description : String;
}
entity invoiceCockpitItems {
    key Itemid : UUID;
    invoiceNo:UUID;
    invoiceNoS : String;
    Item : String;
    Item_No : String;
    Material : String;
    HSN_Code : String;
    Qty : String;
    qc:Boolean;
    Unit_Price : String;
    GL_Acc : String;
    Plant : String;
    Cost_Center : String;
    Disc_Per : String;
    GST_Per : String;	
    Taxable_Amt : String;
    Tax_Amt : String;
    Total_Amt : String;	
    itemstoinv:Association to one invoiceCockpit on itemstoinv.uuid = invoiceNo;
}
entity invoiceCockpit : managed{
    key uuid:UUID;
   invoiceNo : String default ' ';
    RefInvoiceNo : String;
    supplierName : String;
    status:String;

    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    irn : String;
    refPoNum : String;
    gstin : String;
    DocumentType : String;
    RefInvoiceNo1 : String;
    invoiceDate : Date;
    postingDate : Date;
    baselineDate : Date;
    VendorCode : String;
    paymentTerms : String;
    paymentMethod : String;
    companyCode : String;
    currency : String;
    departmentName : String;
    glAccount : String;
    costCenter : String;
    internalOrder : String;
    taxableAmount : String;
    adjustment : String;
     amount : String;
    tcs : String;
    tdsPer : String;
    tdsTotAmt : String;
    discountPer : String;
    totalDiscountAmount : String;
    vatPer : String;
    fileLink : LargeString;
    value1 : Boolean;
    value : Integer;
     bool : Boolean;
    GstPerc  : String;
    IGST : Boolean;
     IGSTVal : String;
    CGST : String;
    SGST : String;
    invtoitems : Composition of many invoiceCockpitItems on invtoitems.itemstoinv = $self;
    invtofil : Composition of many Files on invtofil.filtoinv = $self;
}
entity emailNotification {
    key status:String;
    mailSubject:String;
    mailBody:String;
    emailtocc:Composition of many cc on emailtocc.cctoemail = $self;
}
entity cc {
    key emailId:String;
    key status:String;
    name:String;
    cctoemail:Association to one  emailNotification on cctoemail.status = status;
}
entity statusSh {
    key status:String;
}
entity  approvalTypeSh{
    key approvaltype:String;
}

entity conditionsSh{ 
    key uuid:UUID;
     relatedTo:String;
     sh:String;
    description:String;
}
entity criteriaSh {
    key criteria : String;
}
entity rulesParent {
    key uuid:UUID;
    approvalType:String;
    comments:LargeString;
    active:Boolean;
    dueDays:Int16;
    escalateTo:String;
    rulptorul :Composition of many rulesChild on rulptorul.rultorulp = $self;
    rulptoapp :Composition of many approversChild on rulptoapp.apptorulp = $self;
}
entity rulesChild{
    key uuidc1:UUID;
    uuid:UUID;
    concatCondition:String;
    criteria:String default ' ';
    condition:String;
    value1:String;
    value2:String;
    rultorulp:Association to one rulesParent on rultorulp.uuid = uuid;
}
entity approversChild{
    key uuidc1:UUID;
    uuid:UUID;
    level:String;
    apptoappm:Composition of many approversChildMembers on apptoappm.appmtoapp =$self;
    apptoappg:Composition of many approversChildGroups on apptoappg.appgtoapp =$self;
    apptorulp:Association to one rulesParent on apptorulp.uuid = uuid;
}
entity approversChildGroups {
    key uuidc2:UUID;
    uuidc1:UUID;
    groupName:String;
    appgtoapp:Association to one approversChild on appgtoapp.uuidc1 = uuidc1
}
entity approversChildMembers {
    key uuidc2:UUID;
    uuidc1:UUID;
    memberName:String;
    assignRoleUUID:UUID;
    appmtoapp:Association to one approversChild on appmtoapp.uuidc1 = uuidc1;
}

entity groups
{
    key groupName : String;
    description : String;
    grptomem : Composition of  many members on grptomem.memtogrp = $self;
}
// @cds.persistence.journal
entity members {
    key uuuid:UUID;
    key groupName:String;
    memberName:String;
    role : String;
    emailId:String;
    memtogrp:Association to one groups on memtogrp.groupName = groupName;
}

entity assignRole
{
    key UUID : UUID;
    key emailId : String;
    role : String;
    name : String;
    department : String;
    f2 : String;
    f3 : String;
    
}

entity departmentSh
{
    key departmentName : String;
    description:String;
}

entity roleSh
{
    key roleName : String;
}

entity Books
{
    key ID : Integer;
    title : String;
    stock : Integer;
}
