import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ProductResponse } from '../../context/interfaces/InvoiceInterface';



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
const InvoiceTableCustomer = (props: any) => {
    console.log('dataInvoice', props.dataInvoice)
    return (
        <>
            <View style={styles.container}>
                {/* 1  */}
                <View style={{ width: '18%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Product</Text>
                </View>
                {/* 2  */}
                <View style={{ width: '27%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Title</Text>
                </View>
                {/* 3  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Qty</Text>
                </View>
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
                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Total </Text>
                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Price $</Text>
                </View>
            </View>

            <View style={{ borderBottom: '1px solid #000', margin: '10px 0 10px' }}></View>

            {/* Order Price  */}
            {props?.dataInvoice?.order_products?.map((res: ProductResponse) =>
                <View style={styles.container}>
                    {/* 1  */}
                    <View style={{ width: '18%' }}>
                        <Text>{res?.subcategory_name ? res?.subcategory_name : "Not Avaialble"}</Text>
                        <Text>{res?.brand_name ? res?.brand_name : 'Not Available'}</Text>
                    </View>
                    {/* 2  */}
                    <View style={{ width: '27%' }}>
                        <Text style={{ fontFamily: 'bold' }}>{res?.product_name ? res?.product_name : 'Not Available'}</Text>
                        {res?.services?.map((res: any) => <Text key={res?._id}>{res?.content}</Text>)}
                        <View style={[styles.container, { marginTop: 4 }]}>
                            <Text style={{ fontFamily: 'bold', marginRight: 3 }}>Tax:</Text>
                            <Text >{res?.tax_percentage}%</Text>
                        </View>
                    </View>
                    {/* 3  */}
                    <View style={{ width: '10%' }}>
                        <Text >{res?.quantity}</Text>
                    </View>
                    {/* 4  */}
                    <View style={{ width: '10%' }}>
                        <Text >{res?.price}</Text>
                    </View>
                    {/* 5  */}
                    <View style={{ width: '10%' }}>
                        <Text >{res?.coupon_discount}</Text>
                    </View>
                    {/* 6  */}
                    <View style={{ width: '10%' }}>
                        <Text >{(res?.total_price - res?.tax_amount)?.toFixed(2)}</Text>
                    </View>
                    {/* 7  */}
                    <View style={{ width: '10%' }}>
                        <Text >{res?.tax_amount?.toFixed(2)}</Text>
                    </View>
                    {/* 8  */}
                    <View style={{ width: '5%' }}>
                        <Text style={{ textAlign: 'right' }}>{res.total_price}</Text>
                    </View>
                </View>)}

            {/* Shipping And Convenience Charges */}
            <View style={[styles.container, { margin: '10px 0' }]}>
                {/* 1  */}
                <View style={{ width: '18%' }}></View>
                {/* 2  */}
                <View style={{ width: '27%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Shipping And Convenience Charges</Text>
                </View>
                {/* 3  */}
                <View style={{ width: '10%' }}>
                    <Text >{props.dataInvoice?.quantity ? props.dataInvoice?.quantity : 'Not Available'}</Text>
                </View>
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text >{props.dataInvoice?.delivery_price ? props.dataInvoice?.delivery_price : '0'}</Text>
                </View>
            </View>



            <View style={{ borderBottom: '1px solid #000', margin: '5px 0 10px' }}></View>

            <View style={styles.container}>
                <Text style={{ width: '18%' }}></Text>
                <Text style={{ width: '27%', fontFamily: 'bold' }}>Total</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props.dataInvoice?.quantity ? props.dataInvoice?.quantity : 'Not Available'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props.dataInvoice?.total_price ? props.dataInvoice?.total_price + props.dataInvoice?.delivery_price : '0'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props.dataInvoice?.coupon_discount ? -props.dataInvoice?.coupon_discount : '0'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{(props.dataInvoice?.total_price - props.dataInvoice?.tax_amount)?.toFixed(2)}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props.dataInvoice?.tax_amount?.toFixed(2)}</Text>
                <Text style={{ width: '5%', fontFamily: 'bold', textAlign: 'right' }}>{props.dataInvoice?.your_earning}</Text>
            </View>

            <View style={{ borderBottom: '1px solid #000', margin: '12px 0 12px' }}></View>
            <View style={[styles.container, {}]}>
                <View style={{ width: "75%" }}></View>
                <View style={{ width: "25%" }}>
                    <View style={[styles.container, {}]}>
                        <Text style={{ fontSize: 10, width: '50%', fontFamily: 'medium' }}>Grand Total Price</Text>
                        <Text style={{ fontSize: 10, width: '50%', textAlign: 'right', fontFamily: 'bold' }}>$ {props.dataInvoice?.total_price + (props.dataInvoice?.delivery_price ? props.dataInvoice?.delivery_price : 0) - props.dataInvoice?.coupon_discount}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={[styles.w_100, { textAlign: 'right', fontFamily: 'medium', marginTop: 5 }]}>{props.dataInvoice?.seller_id?.company ? props.dataInvoice?.seller_id?.company : 'Not Available'}</Text>
            </View>
        </>
    )
}


export default InvoiceTableCustomer