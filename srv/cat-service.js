
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
const cds = require('@sap/cds');
const FormData = require('form-data');

module.exports = async function (params) {
    let DocInfoExt_dest = await cds.connect.to("DocInfoExt_dest");
    // let test =await DocInfoExt_dest.get("/document/jobs");
    // console.log(test);  
    function reverseFormatCompanyCode(formattedCompanyCode) {
        // Replace spaces with underscores
        var originalCompanyCode = formattedCompanyCode.replace(/ /g, '_');

        // Convert the title case back to lowercase
        originalCompanyCode = originalCompanyCode.toLowerCase();

        return originalCompanyCode;
    }

    var rawdata = await cds.db.run(`SELECT COLUMN_NAME FROM TABLE_COLUMNS where TABLE_NAME= 'ELIPODB_TAX_CODE' ;`)


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
        req.data.status = 'Draft';
        await DELETE.from('CATALOGSERVICE_FILES_DRAFTS').where`FKEY = ${req.data.uuid}`;
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
        // let innn = await SELECT.from(supplier);
        let content =await SELECT`CONTENT`.from('CatalogService_invoiceCockpit_drafts').where`UUID = ${req.data.p}`;
       
        let options={clientId:"default",documentType:"invoice",schemaId:"32f35cd4-0571-47de-9815-82de84d98015",templateId:"ebbccbfc-e020-4ae4-bd39-6f9d5e7212d1"};
        let option=JSON.stringify(options);
        let form = new FormData();
    form.append('options', option);
    form.append('file',  content[0].CONTENT, {
        filename: `${req.data.p}.pdf`, // Specify the filename
        contentType: 'application/pdf' // Specify the content type
    });
    let test =await DocInfoExt_dest.post("/document/jobs",form);
        console.log(option);
    });
    this.on('postattach', async (req) => {
        // debugger
        // let regex = "/uuid=([0-9a-fA-F-]+)/";
        let match = req.data.p.match(/uuid=([0-9a-fA-F-]+)/);
        await DELETE.from('CATALOGSERVICE_SUPPLIERFILES_DRAFTS').where`FKEY = ${match[1]}`;
        await DELETE.from('CATALOGSERVICE_FILES_DRAFTS').where`FKEY = ${match[1]}`;
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