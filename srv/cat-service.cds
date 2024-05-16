using elipodb as my from '../db/data-model';

service CatalogService {
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
}
