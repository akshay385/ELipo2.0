sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        send: async function(oEvent) {
            debugger
            let objUrl = oEvent.oModel.getServiceUrl() + oEvent.sPath.substring(1);
            let rulesUrl = oEvent.oModel.getServiceUrl() + "rulesParent?$expand=rulptoapp($expand=apptoappm,apptoappg),rulptorul&$filter=active%20eq%20true";
            var invoice, activeRules;

            // Fetch invoice
            await $.ajax({
                url: objUrl,
                type: 'GET',
                success: function(res) {
                    debugger
                    invoice = res;
                }
            });

            // Fetch active rules
            await $.ajax({
                url: rulesUrl,
                type: 'GET',
                success: function(res) {
                    debugger
                    activeRules = res.value;
                }
            });

            let matchedRuleKey;
            for (let i = 0; i < activeRules.length; i++) {
                let matchCount = 0;
                for (let j = 0; j < activeRules[i].rulptorul.length; j++) {
                    switch (activeRules[i].rulptorul[j].criteria) {
                        case 'Amount':
                            switch (activeRules[i].rulptorul[j].condition) {
                                case 'In Between':
                                    if (invoice.totalDiscountAmount) {
                                        if (parseInt(invoice.totalDiscountAmount) >= parseInt(activeRules[i].rulptorul[j].value1) &&
                                            parseInt(invoice.totalDiscountAmount) <= parseInt(activeRules[i].rulptorul[j].value2)) {
                                            matchCount++;
                                        } else {
                                            matchCount = -1;
                                        }
                                    }
                                    break;
                                case '=':
                                    if (invoice.totalDiscountAmount) {
                                        if (parseInt(invoice.totalDiscountAmount) == parseInt(activeRules[i].rulptorul[j].value1)) {
                                            matchCount++;
                                        } else {
                                            matchCount = -1;
                                        }
                                    }
                                    break;
                                case '>':
                                    if (invoice.totalDiscountAmount) {
                                        if (parseInt(invoice.totalDiscountAmount) > parseInt(activeRules[i].rulptorul[j].value1)) {
                                            matchCount++;
                                        } else {
                                            matchCount = -1;
                                        }
                                    }
                                    break;
                                case '<':
                                    if (invoice.totalDiscountAmount) {
                                        if (parseInt(invoice.totalDiscountAmount) < parseInt(activeRules[i].rulptorul[j].value1)) {
                                            matchCount++;
                                        } else {
                                            matchCount = -1;
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case 'Cost Center':
                            if (invoice.costCenter) {
                                if (invoice.costCenter == activeRules[i].rulptorul[j].value1)
                                    matchCount++;
                                else
                                    matchCount = -1;
                            }
                            break;
                        case 'Department':
                            if (invoice.departmentName) {
                                if (invoice.departmentName == activeRules[i].rulptorul[j].value1)
                                    matchCount++;
                                else
                                    matchCount = -1;
                            }
                            break;
                        case 'Document Type':
                            break;
                        case 'G/L Account':
                            if (invoice.glAccount) {
                                if (invoice.glAccount == activeRules[i].rulptorul[j].value1)
                                    matchCount++;
                                else
                                    matchCount = -1;
                            }
                            break;
                        case 'Item Category':
                            break;
                        case 'Jurisdiction Code':
                            break;
                        case 'PO Type':
                            break;
                        case 'Vendor':
                            if (invoice.VendorCode) {
                                if (invoice.VendorCode == activeRules[i].rulptorul[j].value1)
                                    matchCount++;
                                else
                                    matchCount = -1;
                            }
                            break;
                        case 'Currency':
                            if (invoice.currency) {
                                if (invoice.currency == activeRules[i].rulptorul[j].value1)
                                    matchCount++;
                                else
                                    matchCount = -1;
                            }
                            break;
                        default:
                            break;
                    }
                    if (matchCount == -1)
                        break;
                }
                if (matchCount == activeRules[i].rulptorul.length) {
                    matchedRuleKey = activeRules[i];
                    break;
                }
            }

            if (!matchedRuleKey) {
                let defaultRule = activeRules.filter(rule => rule.rulptorul[0].criteria == 'Default');
                matchedRuleKey = defaultRule[0];
            }
            console.log(matchedRuleKey);

            let approvalWorkFlowEntries = [];
            for (const level of matchedRuleKey.rulptoapp) {
                debugger;
                let levels = level.level.toString();
                levels += ".0";
                let statusval = null;
                let approversmailss = "";
                let memberss = "";
                let groupss = "";

                if (level.level == "1")
                    statusval = "Pending for Approval";

                for (const member of level.apptoappm) {
                    approversmailss += ", " + member.memberName;
                    memberss += ", " + member.memberName;
                }

                // Using a for loop with promises to ensure proper execution order
                for (const grp of level.apptoappg) {
                    debugger;
                    let rulesUrl = oEvent.oModel.getServiceUrl() + `groups(groupName='${grp.groupName}',IsActiveEntity=true)?$expand=grptomem`;

                    await new Promise((resolve, reject) => {
                        $.ajax({
                            url: rulesUrl,
                            type: "GET",
                            success: function(result) {
                                debugger;
                                for (const member of result.grptomem) {
                                    approversmailss += ", " + member.emailId;
                                }
                                resolve(); // Resolve the promise after processing all members
                            },
                            error: function(err) {
                                reject(err); // Reject the promise in case of an error
                            }
                        });
                    });

                    groupss += ", " + grp.groupName;
                }

                approversmailss = approversmailss.substring(2);
                memberss = memberss.substring(2);
                groupss = groupss.substring(2);

                let approvalWorkFlowEntry = {
                    level: levels,
                    invoiceNo: invoice.invoiceNo,
                    invoiceuuid: invoice.uuid,
                    status: statusval,
                    approversmails: approversmailss,
                    members: memberss,
                    groups: groupss
                };

                approvalWorkFlowEntries.push(approvalWorkFlowEntry);
            }
            console.log(approvalWorkFlowEntries);
            let approvalWorkFlowUrl = oEvent.oModel.getServiceUrl() + "approvalWorkFlow";

            for (let i=0;i<approvalWorkFlowEntries.length;i++) {
                // Insert Workflow
                let postBody= JSON.stringify(approvalWorkFlowEntries[i]);
               
            await $.ajax({
                url: approvalWorkFlowUrl,
                type: 'POST',
                contentType: 'application/json',
                data: postBody,
                success: function(res) {
                    debugger
                    
                }
            });
            }
            
        }
    };
});
