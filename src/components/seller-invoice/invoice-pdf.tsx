import { PDFViewer, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import BillDetail from './invoice-detail';
import InvoiceHeader from './invoice-header';
import InvoiceFooter from './invoice-footer';
import InvoiceTableSeller from './invoice-table-seller';
import henceofrthEnums from '../../utils/henceofrthEnums';
import InvoiceTableCustomer from './invoice-table-customer';
import InvoiceTable from './invoice-table';

Font.register({
    family: 'regular',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    fontWeight: 'regular'
});

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'regular',
        fontSize: 9,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 24,
        paddingRight: 24,
        lineHeight: 1.5,
        flexDirection: 'column',
        color: '#000'
    },
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

});

// Create Document Component
const InvoicePdf = (props: any) => (
    <PDFViewer style={styles.viewer}>
        <Document>
            {/* <Page size="A4" style={styles.page} orientation="landscape"> */}
            <Page size="A4" style={styles.page} orientation="portrait">
                <InvoiceHeader {...props} />
                <BillDetail dataInvoice={props} />
                <InvoiceTable {...props} />
                {/* {invoiceType === henceofrthEnums.Invoice.SELLER ?
                    <InvoiceTableSeller dataInvoice={props} /> :
                    <InvoiceTableCustomer dataInvoice={props} />
                } */}
                <InvoiceFooter dataInvoice={props} />
            </Page>
        </Document>
    </PDFViewer>
);

export default InvoicePdf;