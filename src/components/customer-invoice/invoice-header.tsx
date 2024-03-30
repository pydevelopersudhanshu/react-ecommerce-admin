import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Fragment } from 'react';
// import { orderInvoice } from '../../pages/order/orderInterface';
​
Font.register({
    family: 'bold',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
    fontWeight: 'bold'
});
​
Font.register({
    family: 'italic',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});
Font.register({
    family: 'italic-regular',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});
​
​
// Create styles
const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 10,
        marginBottom: 30,
    },
    reportTitle: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'bold'
    },
    container: {
        flexDirection: 'row',
    },
    font10: {
        fontSize: 10,
        color: '#000'
    }
});
type dataType = {
    // dataHolder: orderInvoice
}
const InvoiceHeader = ({ dataHolder }: any) => {
    return (
        <Fragment>
            {/* Title  */}
            <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>Tax Invoice</Text>
            </View>
            <View style={styles.container}>
                {/* Sold By and Sold from  */}
                <View style={{ width: '80%' }}>
                    <Text style={[styles.font10, { fontFamily: 'bold', marginBottom: 10 }]}>Sold By: {dataHolder?.seller_id?.company?dataHolder?.seller_id?.company:'Not Available'}</Text>
                    <View style={styles.container}>
                        <Text style={{ width: '12%', fontFamily: 'italic' }}>Ship-from Address:</Text>
                        <Text style={{ width: '88%', fontFamily: 'italic-regular' }}>{dataHolder?.seller_id?.full_address ? dataHolder?.seller_id?.full_address : 'Not Available'}</Text>
                    </View>
                </View>
                {/* Invoice and tax number  */}
                <View style={{ width: '20%' }}>
                    <View style={[styles.font10, styles.container, { width: '100%', justifyContent: 'flex-end', marginBottom: 10 }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 5, textAlign: 'right' }}>Invoice Number</Text>
                        <Text style={{ textAlign: 'right' }}>{dataHolder?.invoice_id?dataHolder?.invoice_id:"Not Available"}</Text>
                    </View>
                    <View style={[styles.container, { width: '100%', justifyContent: 'flex-end' }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 5, textAlign: 'right' }}>Tax Number -</Text>
                        <Text style={{ textAlign: 'right' }}>{dataHolder?.tax_no?dataHolder?.tax_no:"Not Available"}</Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '15px 0 10px' }}></View>
        </Fragment>
    )
}
​
export default InvoiceHeader;