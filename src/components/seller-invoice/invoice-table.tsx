import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import henceofrthEnums from '../../utils/henceofrthEnums';



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
    },

    w_10: {
        width: '10%',
    },
    w_15: {
        width: '15%'
    },
    w_25: {
        width: '24%'
    },
    w_5: {
        width: '5%'
    },
    w_6: {
        width: '6%'
    },
    w_8: {
        width: '8%'
    },
    w_9: {
        width: '9%'
    },
    w_20: {
        width: '20%',
    },
    w_100: {
        width: '100%',
    },

});
const InvoiceTable = (props: any) => {
    return (
        <>
            <View style={styles.container}>
                {/* 1  */}
                <View style={{ width: '18%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Product</Text>
                </View>
                {/* 2  */}
                <View style={{ width: '37%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Title</Text>
                </View>
                {/* 3  */}
                {/* <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Qty</Text>
                </View> */}
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Gross</Text>
                    <Text style={{ fontFamily: 'bold' }}>Amount $</Text>
                </View>
                {/* 5  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Discount</Text>
                    <Text style={{ fontFamily: 'bold' }}>/Coupons $</Text>
                </View>
                {/* 6  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Taxable</Text>
                    <Text style={{ fontFamily: 'bold' }}>Value $</Text>
                </View>
                {/* 7  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Tax $</Text>
                </View>
                {/* 8  */}
                <View style={{ width: '5%' }}>
                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Total</Text>
                    {props.invoiceType === henceofrthEnums.Invoice.SELLER ?
                        <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Earning $</Text> :
                        <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Price $</Text>}
                </View>
            </View>

            <View style={{ borderBottom: '1px solid #000', margin: '10px 0 10px' }}></View>

            {/* Order Price  */}
            <View style={styles.container}>
                {/* 1  */}
                <View style={{ width: '18%' }}>
                    <Text>{props?.product_id?.subcategory?.name ? props?.product_id?.subcategory?.name : "Not Avaialble"}</Text>
                    <Text>{props?.product_id?.prod_id ? props?.product_id?.prod_id : 'Not Available'}</Text>
                </View>
                {/* 2  */}
                <View style={{ width: '37%' }}>
                    <Text style={{ fontFamily: 'bold' }}>{props?.product_id?.name ? props?.product_id?.name : 'Not Available'}</Text>
                    {props?.product_id?.services.map((res: any) => <Text style={{}} key={res?._id}>{res?.content}</Text>)}
                    <View style={[styles.container, { marginTop: 4 }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 3 }}>Tax:</Text>
                        <Text style={{}}>{props?.tax_percantage ? `${props?.tax_percantage}%` : 'Not Applicable'}</Text>
                    </View>
                </View>
                {/* 3  */}
                {/* <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.quantity ? props?.quantity : 'Out of Stock'}</Text>
                </View> */}
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.total_price ? props?.total_price : '0'}</Text>
                </View>
                {/* 5  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.coupon_discount ? -props?.coupon_discount : '0'}</Text>
                </View>
                {/* 6  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{(props?.total_price - props?.tax_amount)?.toFixed(2)}</Text>
                </View>
                {/* 7  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.tax_amount?.toFixed(2)}</Text>
                </View>
                {/* 8  */}
                {props.invoiceType === henceofrthEnums.Invoice.SELLER ?
                    <View style={{ width: '5%' }}>
                        <Text style={{ textAlign: 'right' }}>{props?.your_earning ? props?.your_earning : '0'}</Text>
                    </View> : <View style={{ width: '5%' }}>
                        <Text style={{ textAlign: 'right' }}>{props?.total_price}</Text>
                    </View>}
            </View>

            {/* Shipping And Convenience Charges */}
            <View style={[styles.container, { margin: '10px 0' }]}>
                {/* 1  */}
                <View style={{ width: '18%' }}></View>
                {/* 2  */}
                <View style={{ width: '37%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Shipping And Convenience Charges</Text>
                </View>
                {/* 3  */}
                {/* <View style={{ width: '10%' }}>
                    <Text style={{}}>qty</Text>
                </View> */}
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.delivery_price ? props?.delivery_price : '0'}</Text>
                </View>
            </View>



            <View style={{ borderBottom: '1px solid #000', margin: '5px 0 10px' }}></View>

            <View style={styles.container}>
                <Text style={{ width: '18%' }}></Text>
                <Text style={{ width: '37%', fontFamily: 'bold' }}>Total</Text>
                {/* <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.quantity ? props?.quantity : 'Not Available'}</Text> */}
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.total_price ? props?.total_price + props?.delivery_price : '0'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.coupon_discount ? -props?.coupon_discount : '0'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{(props?.total_price - props?.tax_amount)?.toFixed(2)}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.tax_amount?.toFixed(2)}</Text>
                {props.invoiceType === henceofrthEnums.Invoice.SELLER ?
                    <Text style={{ width: '5%', fontFamily: 'bold', textAlign: 'right' }}>{props?.your_earning}</Text> :
                    <Text style={{ width: '5%', fontFamily: 'bold', textAlign: 'right' }}>{props?.total_price}</Text>}
            </View>

            <View style={{ borderBottom: '1px solid #000', margin: '12px 0 12px' }}></View>
            <View style={[styles.container, {}]}>
                <View style={{ width: "75%" }}></View>
                <View style={{ width: "25%" }}>
                    {props.invoiceType === henceofrthEnums.Invoice.SELLER &&
                        <View style={[styles.container, {}]}>
                            <Text style={{ fontSize: 10, width: '50%', fontFamily: 'medium' }}>Grand Total Earnings</Text>
                            <Text style={{ fontSize: 10, width: '50%', textAlign: 'right', fontFamily: 'bold' }}>$ {props?.your_earning}</Text>
                        </View>}
                    <View style={[styles.container, {}]}>
                        <Text style={{ fontSize: 10, width: '50%', fontFamily: 'medium' }}>Grand Total Price</Text>
                        <Text style={{ fontSize: 10, width: '50%', textAlign: 'right', fontFamily: 'bold' }}>$ {props?.total_price + props?.delivery_price - props?.coupon_discount}</Text>
                    </View>
                </View>
            </View>
            {props.invoiceType === henceofrthEnums.Invoice.USER &&
                <View style={styles.container}>
                    <Text style={[styles.w_100, { textAlign: 'right', fontFamily: 'medium', marginTop: 5 }]}>{props?.seller_id?.company ? props?.seller_id?.company : 'Not Available'}</Text>
                </View>}
        </>
    )
}


export default InvoiceTable