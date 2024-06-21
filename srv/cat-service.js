
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
const cds = require('@sap/cds');
const FormData = require('form-data');
const axios = require('axios');
// const { Blob } = require('blob');
// const Blob = require('fetch-blob').Blob;


module.exports = async function (params) {
    let {
        invoiceCockpit, invoiceCockpitItems,rulesChild,approversChild,Files,supplierFiles
    } = this.entities;
    let BpaDest = await cds.connect.to("BpaDest");

    // var vcap = JSON.parse(process.env.VCAP_SERVICES);

    // let test =await DocInfoExt_dest.get("/document/jobs");

    function reverseFormatCompanyCode(formattedCompanyCode) {
        // Replace spaces with underscores
        var originalCompanyCode = formattedCompanyCode.replace(/ /g, '_');

        // Convert the title case back to lowercase
        originalCompanyCode = originalCompanyCode.toLowerCase();

        return originalCompanyCode;
    }

    // var rawdata = await cds.db.run(`SELECT COLUMN_NAME FROM TABLE_COLUMNS where TABLE_NAME= 'ELIPODB_TAX_CODE' ;`)

    this.before('CREATE','approvalWorkFlow',async (req)=>{
        debugger
    });
    this.before('CREATE', 'invoiceCockpit', async (req) => {
        debugger
        let inn = await SELECT.from('elipodb_conditionsSh').where`RELATEDTO = 'InvoiceNo'`;
        let innn = await SELECT.from('CatalogService_invoiceCockpit_drafts');
        let inNo = inn[0].SH;
        let inNoi = parseInt(inNo);
        inNoi++;
        inNo = inNoi.toString();
        req.data.invoiceNoN = inNoi;
        req.data.invoiceNo = inNo;
        req.data.criticality = 0;
        req.data.status = 'New';
        req.data.editable = false;
        let k = inn[0].UUID;
        await UPDATE`elipodb_conditionsSh`.where`UUID = ${k}`.with({ SH: inNo });
        console.log("hhhhhh");
        return req;
    });
    this.on('READ',approversChild.drafts,async (req,next)=>{
        debugger
        if(req.data.uuid){
           let sel1 = await SELECT.from(approversChild.drafts).where({uuid : req.data.uuid})
           let newApp= sel1.filter(fil => fil.level == null);
           await cds.update(approversChild.drafts).set({level : sel1.length.toString()}).where({uuidc1 : newApp[0].uuidc1});
        }
        return next();
    });
    this.on('READ', rulesChild.drafts, async (req,next) => {
        debugger
        if(req.data.uuidc1){
            if(req.data.criteria){
                if(req.data.criteria == 'Default'){
                let con = 'Default';
                await cds.update(rulesChild.drafts)
                .set({value1:null,condition:null,value2:null,concatCondition:null ,concatCondition:con}) 
                .where({ uuidc1 : req.data.uuidc1});
                }else {
                await cds.update(rulesChild.drafts)
                .set({value1:null,condition:null,value2:null,concatCondition:null }) 
                .where({ uuidc1 : req.data.uuidc1});
                }
            }else if(req.data.condition){
                await cds.update(rulesChild.drafts)
                .set({value1:null,value2:null,concatCondition:null }) 
                .where({ uuidc1 : req.data.uuidc1});
            }else if(req.data.value1){
                var sel1 = await SELECT.from(rulesChild.drafts).where({uuidc1 : req.data.uuidc1});
                console.log(sel1);
                let con = sel1[0].criteria+" "+sel1[0].condition+" "+sel1[0].value1;
                await cds.update(rulesChild.drafts)
                .set({concatCondition:con }) 
                .where({ uuidc1 : req.data.uuidc1});
            }else if(req.data.value2){
                var sel1 = await SELECT.from(rulesChild.drafts).where({uuidc1 : req.data.uuidc1});
                let con = sel1[0].criteria+" "+sel1[0].condition+" "+sel1[0].value1+" "+"&"+" "+sel1[0].value2;
                await cds.update(rulesChild.drafts)
                .set({concatCondition:con }) 
                .where({ uuidc1 : req.data.uuidc1});
            }
        }
        return next();
    });
    this.after('CREATE', 'approvalWorkFlow', async (req) => {
        debugger
        if(req.level == '1'){
        let BpaDest = await cds.connect.to("BpaDest");
        let body = {
            "definitionId": "us10.da7813aatrial.elipoapproval.elipoapproval",
            "context": {
                "invoiceuuid": req.invoiceuuid,
                "emails": req.approversmails,
                "invoiceno": req.invoiceNo,
                "level": 1
            }
        };
        let stringBody = JSON.stringify(body);
        try {
            var response = await BpaDest.post('/workflow/rest/v1/workflow-instances', stringBody);
            let updateData={workflowId:response.id,status:"In Approval",editable:true};
            await UPDATE(invoiceCockpit, req.invoiceuuid).with(updateData);
        } catch (error) {
            debugger
        }
    }
    });

    this.after('CREATE', 'invoiceCockpit', async (req) => {
        debugger
        // let a =  await DELETE.from(invoiceCockpit.drafts).where({uuid:req.uuid});  
        try {
            debugger
       let a =  await DELETE.from(invoiceCockpit.drafts).where({uuid:req.uuid});     
        } catch (error) {
            debugger
        }
        try {
            debugger
       let a =  await DELETE.from(Files.drafts).where({fkey:req.uuid});     
        } catch (error) {
            debugger
        }
        try {
        let b = await DELETE.from(invoiceCockpitItems.drafts).where({invoiceNo : req.uuid});    
        } catch (error) {
            debugger
        }
        
    });
    this.after('UPDATE', 'invoiceCockpit', async (req) => {
        debugger
        // let a =  await DELETE.from(invoiceCockpit.drafts).where({uuid:req.uuid});  
        try {
            debugger
       let a =  await DELETE.from(invoiceCockpit.drafts).where({uuid:req.uuid});     
        } catch (error) {
            debugger
        }
        try {
            debugger
       let a =  await DELETE.from(Files.drafts).where({fkey:req.uuid});     
        } catch (error) {
            debugger
        }
        try {
        let b = await DELETE.from(invoiceCockpitItems.drafts).where({invoiceNo : req.uuid});    
        } catch (error) {
            debugger
        }
    });
    this.before('CREATE', 'supplier', async (req) => {
        debugger
        let inn = await SELECT.from('elipodb_conditionsSh').where`RELATEDTO = 'InvoiceNo'`;
        let innn = await SELECT.from('CatalogService_supplier_drafts');
        let inNo = inn[0].SH;
        let inNoi = parseInt(inNo);
        inNoi++;
        inNo = inNoi.toString();
        req.data.invoiceNoN = inNoi;
        req.data.invoiceNo = inNo;
        req.data.criticality = 0;
        req.data.status = 'Draft';
        req.data.editable = false;
        let k = inn[0].UUID;
        await UPDATE`elipodb_conditionsSh`.where`UUID = ${k}`.with({ SH: inNo });
        console.log("hhhhhh");
        return req;
    });
    this.before('CREATE', 'supplierFiles.drafts', async (req) => {
        debugger
        req.data.url = `/supplierFiles(id=${req.data.id},IsActiveEntity=true)/content`;
        return req;
    })
    this.before('UPDATE', 'invoiceCockpit', async (req) => {
        debugger
        console.log("before update invoice")
        req.data.status = 'Draft';
        await DELETE.from('CATALOGSERVICE_FILES_DRAFTS').where`FKEY = ${req.data.uuid}`;
        // await DELETE.from('CatalogService_invoiceCockpit_drafts').where`UUID = ${req.data.uuid}`;
        // await DELETE.from('CATALOGSERVICE_INVOICECOCKPITITEMS_DRAFTS').where`FKEY = ${req.data.uuid}`;
        
        console.log("ddddddddd");
        return req;
    });
    this.before('UPDATE', 'supplier', async (req) => {
        debugger
        await DELETE.from('CATALOGSERVICE_FILES_DRAFTS').where`FKEY = ${req.data.uuid}`;
        console.log("ddddddddd");
        return req;
    });
    this.on('extract', async (req) => {

        debugger

        try {
            // let innn = await SELECT.from(supplier);
            var vcap = JSON.parse(process.env.VCAP_SERVICES);
            var docinfodest;

            if (vcap['document-information-extraction-trial'] && Array.isArray(vcap['document-information-extraction-trial'])) {
                // Iterate over the services to find the required destination
                vcap['document-information-extraction-trial'].forEach((dest) => {
                    // if (dest.name && dest.name === "default_document-information-extraction-trial") { //uncomment for deployment
                    docinfodest = dest;
                    // }//uncomment for deployment
                });

                if (docinfodest) {
                    console.log('Destination found:', docinfodest);

                    // Access the credentials
                    let { clientid, clientsecret, url } = docinfodest.credentials.uaa;
                    let requestUrl = docinfodest.credentials.url + docinfodest.credentials.swagger + "document/jobs";
                    url += "/oauth/token";
                    console.log(`Client ID: ${clientid}`);
                    console.log(`Client Secret: ${clientsecret}`);
                    console.log(`Token url: ${url}`);
                    console.log(`Request url: ${requestUrl}`);
                    const basicAuth = Buffer.from(`${clientid}:${clientsecret}`).toString('base64');

                    // Perform the GET request
                    const accessToken = await axios.get(url, {
                        headers: {
                            'Authorization': `Basic ${basicAuth}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            grant_type: 'client_credentials' // Or another type of grant as required
                        }
                    });






                    const content = await SELECT`content`.from(invoiceCockpit.drafts).where({ uuid: `${req.data.p}` });
                    // let content1 = await SELECT`CONTENT`.from('CatalogService_invoiceCockpit_drafts').where`UUID = ${req.data.p}`;

                    if (!content[0] || !content[0].content) {
                        throw new Error('Content not found for the specified UUID');
                    }

                    let options = { clientId: "default", documentType: "invoice", schemaId: "f3395f73-946c-49a3-97e4-2fc197c9cff8", templateId: "2a40f027-20f7-4957-9385-b3d89a8605bc" };
                    let option = JSON.stringify(options);
                    let form = new FormData();


                    form.append('options', option);
                    let cont = content[0].content;
                    // let buff = Buffer.from(cont,'binary'); // Assuming CONTENT is base64 encoded

                    // const blob = new Blob([buff], { type: 'application/pdf' });
                    // Append buffer directly

                    form.append('file', cont, 'demo.pdf');

                    console.log("before dest call")
                    let formHeaders = form.getHeaders();




                    const config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: requestUrl,
                        headers: {
                            'Authorization': `Bearer ${accessToken.data.access_token}`,
                            ...formHeaders
                        },
                        data: form
                    };

                    // const response = await axios.request(config);//uncomment for document extraction
                    requestUrl += `/${response.data.id}`;
                    console.log(response.data.id);
                    async function checkStatus(requestUrl, accessToken) {
                        return new Promise((resolve, reject) => {
                            const interval = setInterval(async () => {
                                try {
                                    const response = await axios.get(requestUrl, {
                                        headers: {
                                            'Authorization': `Bearer ${accessToken.data.access_token}`
                                        },
                                    });
                                    const status = response.data.status; // Adjust based on your response structure

                                    console.log('Checking status:', status);

                                    if (status === 'DONE') { // Replace 'desiredStatus' with the actual status you're looking for
                                        let resultH = response.data.extraction.headerFields.reduce((acc, field) => {
                                            acc[field.name] = field.value;
                                            return acc;
                                        }, {});
                                        let LineItems = [];
                                        var drafttest = await SELECT.from(invoiceCockpit.drafts).where({ uuid: req.data.p });
                                        if (response.data.extraction.lineItems) {
                                            response.data.extraction.lineItems.forEach(async element => {
                                                let resultI = element.reduce((acc, field) => {
                                                    acc[field.name] = field.value;
                                                    return acc;
                                                }, {});

                                                resultI = { DraftAdministrativeData_DraftUUID: drafttest[0].DraftAdministrativeData_DraftUUID, invoiceNo: `${req.data.p}`, ...resultI }
                                                console.log(resultI);
                                                LineItems.push(resultI);
                                            });
                                            resultH = { invtoitems: LineItems, ...resultH }
                                            // await INSERT (LineItems) .into ('CATALOGSERVICE_INVOICECOCKPITITEMS_DRAFTS');
                                            // await INSERT.into (invoiceCockpitItems.drafts) .entries (
                                            //     LineItems
                                            //  )
                                        }




                                        await UPDATE(invoiceCockpit.drafts, req.data.p).with(resultH);
                                        resolve(status);
                                        // setTimeout(() => { resolve(status); }, 500);
                                        clearInterval(interval);


                                    }
                                } catch (error) {
                                    debugger
                                    reject(error);
                                    clearInterval(interval);
                                    
                                }
                            }, 3000); // 3000 milliseconds = 3 seconds

                        });
                    }
                    const status = await checkStatus(requestUrl, accessToken);

                } else {
                    console.log('Destination not found.');
                }
            } else {
                console.log('Destination service not configured properly.');
            }


        } catch (error) {
            console.error('Error:', error);
            req.error(500, 'Failed to send form data');
        }
    });

    console.log("after dest call")
    this.on('showFooterInv', async (req) => {
        debugger
        let bool = await SELECT.from(invoiceCockpit).where`uuid = ${req.data.p}`;
        return bool[0].editable;
    });
    this.on('postattach', async (req) => {
        // debugger
        // let regex = "/uuid=([0-9a-fA-F-]+)/";
        let match = req.data.p.match(/uuid=([0-9a-fA-F-]+)/);
        await DELETE.from('CATALOGSERVICE_SUPPLIERFILES_DRAFTS').where`FKEY = ${match[1]}`;
        await DELETE.from('CATALOGSERVICE_FILES_DRAFTS').where`FKEY = ${match[1]}`;
        debugger
        // let a =  await DELETE.from(invoiceCockpit.drafts).where({uuid:req.uuid});  
        try {
            debugger
       let a =  await DELETE.from(invoiceCockpit.drafts).where({uuid:match[1]});     
        } catch (error) {
            debugger
        }
        try {
        let b = await DELETE.from(invoiceCockpitItems.drafts).where({invoiceNo :match[1]});    
        } catch (error) {
            debugger
        }
    });

    this.before('CREATE', 'Files.drafts', async (req) => {
        debugger
        req.data.url = `/Files(id=${req.data.id},IsActiveEntity=true)/content`;
        return req;
    })


    this.on('getDynamicCol', async (req) => {
        debugger
        console.log("Inside getDynamic function")
        var serive = req.data.sName;
        var tablename = `elipodb_${serive}`;
        tablename = tablename.toUpperCase();
        // var rawdata = await cds.db.run(`PRAGMA table_info(${tablename});`)
        var rawdata = await cds.db.run(`SELECT COLUMN_NAME FROM TABLE_COLUMNS where TABLE_NAME= '${tablename}';`)

        var returnData = [];

        for (let i = 0; i < rawdata.length; i++) {
            returnData.push(rawdata[i].COLUMN_NAME.toLowerCase())
        }


        return JSON.stringify(returnData);
    })
    this.on('PUT', 'Setting', async (req, next) => {
        debugger
        var filename = req.headers?.slug;
        if (filename) {
            req.data.filename = filename
        }
        return next();
    });
    this.on('PUT', 'ExcelUpload', async (req, next) => {
        if (req.data.excel) {
            debugger
            var entity = req.headers.slug;
            req.headers.slug == '';
            const stream = new PassThrough();
            var buffers = [];
            req.data.excel.pipe(stream);
            return await new Promise((resolve, reject) => {
                stream.on('data', dataChunk => {
                    buffers.push(dataChunk);
                });
                stream.on('end', async () => {
                    var buffer = Buffer.concat(buffers);
                    var workbook = XLSX.read(buffer, { type: "buffer", cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', cellNF: true, rawNumbers: false });
                    let data = []
                    const sheets = workbook.SheetNames
                    for (let i = 0; i < sheets.length; i++) {
                        // Read the sheet with explicit headers
                        const temp = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]], {
                            header: 1, // Output data as arrays with the first row being headers
                            raw: true
                        });
                        var header_without_formating = temp[0];
                        var headers = header_without_formating.map(reverseFormatCompanyCode);


                        // The first row as headers

                        // Process all rows starting from the second row
                        for (let j = 1; j < temp.length; j++) {
                            const row = temp[j];
                            let rowData = {};
                            headers.forEach((header, index) => {
                                rowData[header] = String(row[index]);
                            });
                            data.push(rowData);
                        }
                    }
                    if (data) {
                        const responseCall = await CallEntity(entity, data);

                        if (responseCall == -1)
                            return reject(req.error(400, JSON.stringify(data)));
                        else {
                            resolve(req.notify({
                                message: 'Upload Successful',
                                status: 200
                            }));
                        }
                    }
                });
            });
        } else {
            return next();
        }
    });
    async function CallEntity(entity, data) {
        try {


            // Insert data into the specified entity table
            const insertQuery = await INSERT.into('elipodb_' + entity).entries(data);

            // Execute the insert query (if needed, customize the behavior based on entity type)
            // let srv = await cds.connect.to('StudentsSrv');
            // const insertResult = await srv.run(insertQuery);

            // Select data from the specified entity table for verification or other purposes
            let query = await SELECT.from('elipodb_' + entity);
            // await srv.run(query);

            // Return the insert query result as the response
            return insertQuery;

        } catch (error) {
            console.error('Error during entity processing:', error);
            // You can customize the error response or rethrow the error
            // 
            return '-1';
        }
    }
}