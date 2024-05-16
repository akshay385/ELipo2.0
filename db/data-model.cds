namespace elipodb;
// @cds.persistence.journal

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
