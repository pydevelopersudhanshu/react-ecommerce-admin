import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'bold',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
    fontWeight: 'bold'
});

Font.register({
    family: 'italic',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});
Font.register({
    family: 'italic-regular',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});


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

const InvoiceHeader = (props: any) => {

    return (
        <>
            {/* Title  */}
            <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>Tax Invoice</Text>
            </View>
            <View style={styles.container}>
                {/* Sold By and Sold from  */}
                <View style={{ width: '70%' }}>
                    <Text style={[styles.font10, { fontFamily: 'bold', marginBottom: 10 }]}>Sold By:&nbsp; 
                        {props.type === "SELLER" ? props?.seller_id?.company : props?.seller_id?.company && props.type === "USER" ? props?.address?.company : 'Not Avaiable'}</Text>
                    <View style={styles.container}>
                        <Text style={{ width: '12%', fontFamily: 'italic' }}>Ship-from Address:</Text>
                        <Text style={{ width: '88%', fontFamily: 'italic-regular' }}>
                            {props.type === "SELLER" ? props?.seller_id?.full_address : props?.address?.full_address}</Text>
                    </View>
                </View>
                {/* Invoice and tax number  */}
                <View style={{ width: '30%' }}>
                    <View style={[styles.font10, styles.container, { width: '100%', justifyContent: 'flex-end', marginBottom: 10 }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 5, textAlign: 'right' }}>Invoice Number</Text>
                        <Text style={{ textAlign: 'right' }}>{props?.invoice_id ? props?.invoice_id : "Not Available"}</Text>
                    </View>
                    <View style={[styles.container, { width: '100%', justifyContent: 'flex-end' }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 5, textAlign: 'right' }}>Tax Number -</Text>
                        <Text style={{ textAlign: 'right' }}>{props?.tax_no ? props?.tax_no : "Not Available"}</Text>
                    </View>
                </View>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '15px 0 10px' }}></View>
        </>
    )
}

export default InvoiceHeader;