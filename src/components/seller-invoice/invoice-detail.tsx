import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import moment from 'moment';

Font.register({
    family: 'bold',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
    fontWeight: 'bold'
});

Font.register({
    family: 'italic',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-mediumitalic-webfont.ttf",
});
Font.register({
    family: 'italic-regular',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});

Font.register({
    family: 'medium',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});


// Create styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // flexGrow: 1,
    },
    w_20: {
        width: '20%'
    },
    w_30: {
        width: '30%'
    }
});
const InvoiceDetail = (dataInvoice:any) => {
    console.log(dataInvoice.dataInvoice);
    
    return (
        <>
           <View style={styles.container}>
                {/* Order Detail  */}
                <View style={styles.w_30}>
                    {/* Order id  */}
                    <Text style={[{ fontFamily: 'bold', marginBottom: 5 }]}>Order ID: {dataInvoice.dataInvoice?.order_id?dataInvoice.dataInvoice?.order_id:'Not Available'}</Text>
                    <View style={[styles.container, { marginBottom: 5 }]}>
                        {/* Order date  */}
                        <Text style={[{ fontFamily: 'bold', marginRight: 3 }]}>Order Date:</Text>
                        <Text>{dataInvoice.dataInvoice?.created_at?moment(+dataInvoice.dataInvoice?.created_at).format('DD-MM-YYYY'):"Not Available"}</Text>
                    </View>
                    {/* Invoice date  */}
                    <View style={[styles.container, { marginBottom: 5 }]}>
                        <Text style={[{ fontFamily: 'bold', marginRight: 3 }]}>Invoice Date: </Text>
                        <Text>{dataInvoice.dataInvoice?.created_at?moment(+dataInvoice.dataInvoice?.created_at).format('DD-MM-YYYY'):"Not Available"}</Text>
                    </View>
                    {/* Pan Number  */}
                    {/* <View style={styles.container}>
                        <Text style={[{ fontFamily: 'bold', marginRight: 3 }]}>PAN:</Text>
                        <Text>AAECB1611P</Text>
                    </View> */}
​
                    {/* <Text></Text> */}
                </View>
                {/* Bill To  */}
                <View style={styles.w_30}>
                    <Text style={[{ fontFamily: 'bold' }]}>Bill To</Text>
                    <Text style={[{ fontFamily: 'bold', marginBottom: 4 }]}>{dataInvoice.dataInvoice?.user_id?.name?dataInvoice.dataInvoice?.user_id?.name:'Not Available'}</Text>
                    <Text  style={[{ width: '80%'}]}>{dataInvoice.dataInvoice?.address_id?.full_address?dataInvoice.dataInvoice?.address_id?.full_address:'Not Avaialble'}</Text>
                    {/* <Text>Square, Sector 74, Sahibzada</Text>
                    <Text>Ajit Singh Nagar, Mohali,</Text>
                    <Text>Punjab Mohali 160071 Punajb</Text> */}
                    {/* <Text>Phone: {dataHolder?.user_id?.phone_number?dataHolder?.user_id?.phone_number:'Not Available'}</Text> */}
                    <Text> {dataInvoice.dataInvoice?.user_id?.phone_no?`Phone:${dataInvoice.dataInvoice?.user_id?.phone_no}`:'Not Available'}</Text>
​
                </View>
                {/* Ship To  */}
                <View style={styles.w_20}>
                    <Text style={[{ fontFamily: 'bold' }]}>Ship To</Text>
                    <Text style={[{ fontFamily: 'bold', marginBottom: 4 }]}>{dataInvoice.dataInvoice?.user_id?.name?dataInvoice.dataInvoice?.user_id?.name:'Not Available'}</Text>
                    <Text>{dataInvoice.dataInvoice?.address_id?.full_address?dataInvoice.dataInvoice?.address_id?.full_address:'Not Avaialble'}</Text>
                    {/* <Text>{dataHolder.user_id?.name?dataHolder.user_id?.name:'Not Available'}</Text> */}
                    {/* <Text>Square, Sector 74, Sahibzada</Text>
                    <Text>Ajit Singh Nagar, Mohali,</Text>
                    <Text>Punjab Mohali 160071 Punajb</Text> */}
                    <Text> {dataInvoice.dataInvoice?.user_id?.phone_no?`Phone:${dataInvoice.dataInvoice?.user_id?.phone_no}`:'Not Available'}</Text>
                </View>
                {/* Warranty Text  */}
                <View style={styles.w_20}>
                    <Text style={[{ textAlign: 'right', fontFamily: 'italic-regular', marginBottom: 13 }]}></Text>
                    <Text style={[{ textAlign: 'right', fontFamily: 'italic-regular' }]}>*Keep this invoice and</Text>
                    <Text style={[{ textAlign: 'right', fontFamily: 'italic-regular' }]}> manufacturer box for </Text>
                    <Text style={[{ textAlign: 'right', fontFamily: 'italic-regular' }]}> warranty purpose.</Text>
                </View>
            </View>
            {/* Total Items  */}
            <View style={styles.container}>
                <Text style={{ fontFamily: 'medium', marginTop: '20px' }}>Total items: 1</Text>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '0px 0 10px' }}></View>
        </>
    )
}

export default InvoiceDetail;