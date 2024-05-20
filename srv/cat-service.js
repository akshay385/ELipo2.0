module.exports = async function (params) {
    this.before('CREATE','invoiceCockpit',async (req)=>{
        debugger
        let inn = await SELECT.from('elipodb_conditionsSh').where`RELATEDTO = 'InvoiceNo'`;
        let innn = await SELECT.from('CatalogService_invoiceCockpit_drafts');
        let inNo = inn[0].SH;
        let inNoi = parseInt(inNo);
        inNoi++;
        inNo = inNoi.toString();
        req.data.invoiceNo = inNo;
        req.data.status = 'New';
        let k = inn[0].UUID;
        await UPDATE`elipodb_conditionsSh`.where`UUID = ${k}`.with({SH : inNo});
        console.log("hhhhhh");
        return req;
    })
}