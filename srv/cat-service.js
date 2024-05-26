module.exports = async function (params) {
    this.before('CREATE','invoiceCockpit',async (req)=>{
        debugger
        let inn = await SELECT.from('elipodb_conditionsSh').where`RELATEDTO = 'InvoiceNo'`;
        let innn = await SELECT.from('CatalogService_invoiceCockpit_drafts');
        let inNo = inn[0].SH;
        let inNoi = parseInt(inNo);
        inNoi++;
        inNo = inNoi.toString();
        req.data.invoiceNoN=inNoi;
        req.data.invoiceNo = inNo;
        req.data.criticality = 0;
        req.data.status = 'New';
        req.data.editable = false;
        let k = inn[0].UUID;
        await UPDATE`elipodb_conditionsSh`.where`UUID = ${k}`.with({SH : inNo});
        console.log("hhhhhh");
        return req;
    });
    this.before('CREATE','supplier',async (req)=>{
        debugger
        let inn = await SELECT.from('elipodb_conditionsSh').where`RELATEDTO = 'InvoiceNo'`;
        let innn = await SELECT.from('CatalogService_supplier_drafts');
        let inNo = inn[0].SH;
        let inNoi = parseInt(inNo);
        inNoi++;
        inNo = inNoi.toString();
        req.data.invoiceNoN=inNoi;
        req.data.invoiceNo = inNo;
        req.data.criticality = 0;
        req.data.status = 'Draft';
        req.data.editable = false;
        let k = inn[0].UUID;
        await UPDATE`elipodb_conditionsSh`.where`UUID = ${k}`.with({SH : inNo});
        console.log("hhhhhh");
        return req;
    });
    this.before('CREATE','supplierFiles.drafts',async(req)=>{
        debugger
        req.data.url = `/odata/v4/catalog/supplierFiles(id=${req.data.id},IsActiveEntity=true)/content`;
        return req;
    })
    this.before('UPDATE','invoiceCockpit',async(req)=>{
        debugger
        req.data.status = 'Draft';
        console.log("ddddddddd");
        return req;
    });
    this.on('postattach',async(req)=>{
        debugger
    });
    this.before('CREATE','Files.drafts',async(req)=>{
        
        req.data.url = `/odata/v4/catalog/Files(id=${req.data.id},IsActiveEntity=true)/content`;
        return req;
    })
}