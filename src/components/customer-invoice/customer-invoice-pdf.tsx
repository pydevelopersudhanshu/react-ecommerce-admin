import { PDFViewer, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import BillDetail from './invoice-detail';
import BillTable from './invoice-table';
import InvoiceHeader from './invoice-header';
import InvoiceFooter from './invoice-footer';
// import { dataType } from '../../pages/order/orderInterface';
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
const CustomerInvoicePdf = ({ dataHolder }:any) => (
    
    <PDFViewer style={styles.viewer}>
        <Document>
            {/* <Page size="A4" style={styles.page} orientation="landscape"> */}
            <Page size="A4" style={styles.page} orientation="landscape">
                <InvoiceHeader dataHolder={dataHolder} />
                <BillDetail dataHolder={dataHolder} />
                <BillTable dataHolder={dataHolder} />
                <InvoiceFooter dataHolder={dataHolder} />
            </Page>
        </Document>
    </PDFViewer>
);
export default CustomerInvoicePdf;