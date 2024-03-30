import { Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Fragment } from 'react';
import logo from '../../assets/images/logo/ecommerce-logo.png'
Font.register({
    family: 'bold',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
    fontWeight: 'bold'
});
Font.register({
    family: 'medium',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});
// Create styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    w_100: {
        width: '100%',
    },
    logo: {
        maxWidth: '100px',
        // height: '100%',
        objectFit: 'contain',
    }
});
const InvoiceFooter = ({data}:any) => {
    console.log(data);
    
    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={[styles.w_100, { textAlign: 'right', margin: '20px 0 0' }]}>Authorized Signatory</Text>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '5px 0 10px' }}></View>
            <View style={[styles.container, { margin: '40px 0' }]}>
                <View style={{ width: '80%' }}>
                    <Image src={logo} style={styles.logo}></Image>
                    <Text style={{ marginTop: 5 }}>Contact Henceforth E-commerce: 1800 200 9000 || www.henceforthsolutions.com</Text>
                </View>
                <View style={{ width: '20%' }}>
                    <Text style={{ textAlign: 'right', fontSize: 13}}>Thank You!</Text>
                    <Text style={{ textAlign: 'right', marginTop: 5 }}>for shopping with us</Text>
                </View>
            </View>
        </Fragment>
    )
}
​
​
​
​
​
​
​
​
export default InvoiceFooter;