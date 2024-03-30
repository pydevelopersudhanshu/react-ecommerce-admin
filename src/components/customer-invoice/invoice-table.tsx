import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Fragment } from 'react';
// import { dataType } from '../../pages/order/orderInterface';
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
    w_100: {
        width: '100%',
    },
});
const InvoiceTable = ({ dataHolder }: any) => {
    return (
        <Fragment>
            {/* Table Heading  */}
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
                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Total</Text>
                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Earning $</Text>
                </View>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '10px 0 10px' }}></View>
            {/* Order Price  */}
            <View style={styles.container}>
                {/* 1  */}
                <View style={{ width: '18%' }}>
                    <Text>{dataHolder?.product_id?.subcategory?.name ? dataHolder?.product_id?.subcategory?.name : "Not Avaialble"}</Text>
                    <Text>{dataHolder?.product_id?.prod_id ? dataHolder?.product_id?.prod_id : 'Not Available'}</Text>
                </View>
                {/* 2  */}
                <View style={{ width: '27%' }}>
                    <Text style={{ fontFamily: 'bold' }}>{dataHolder?.product_id?.name ? dataHolder?.product_id?.name : 'Not Available'}</Text>
                   {dataHolder?.product_id?.services.map((res:any) => <Text style={{}} key={res?._id}>{res?.content}</Text>)}
                    <View style={[styles.container, { marginTop: 4 }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 3 }}>Tax:</Text>
                        <Text style={{}}>{dataHolder?.tax_percantage?`${dataHolder?.tax_percantage}%`:'Not Applicable'}</Text>
                    </View>
                </View>
                {/* 3  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{dataHolder?.quantity ? dataHolder?.quantity : 'Out of Stock'}</Text>
                </View>
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{dataHolder?.total_price?dataHolder?.total_price:'0'}</Text>
                </View>
                {/* 5  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{dataHolder?.coupon_discount?dataHolder?.coupon_discount:'0'}</Text>
                </View>
                {/* 6  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{dataHolder?.total_price-dataHolder?.tax_amount}</Text>
                </View>
                {/* 7  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{dataHolder?.tax_amount}</Text>
                </View>
                {/* 8  */}
                <View style={{ width: '5%' }}>
                    <Text style={{ textAlign: 'right' }}>{dataHolder?.your_earning?dataHolder?.your_earning:'0'}</Text>
                </View>
            </View>
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
                    <Text style={{}}>{dataHolder?.quantity ? dataHolder?.quantity : 'Not Available'}</Text>
                </View>
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{dataHolder?.delivery_price ? dataHolder?.delivery_price : '0'}</Text>
                </View>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '5px 0 10px' }}></View>
            <View style={styles.container}>
                <Text style={{ width: '18%' }}></Text>
                <Text style={{ width: '27%', fontFamily: 'bold' }}>Total</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{dataHolder?.quantity ? dataHolder?.quantity : 'Not Available'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{dataHolder?.total_price?dataHolder?.total_price+ dataHolder?.delivery_price:'0'}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>-{dataHolder?.coupon_discount}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{dataHolder?.total_price-dataHolder?.tax_amount}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{dataHolder?.tax_amount}</Text>
                <Text style={{ width: '5%', fontFamily: 'bold', textAlign: 'right' }}>{dataHolder?.your_earning}</Text>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '12px 0 12px' }}></View>
            <View style={[styles.container, {}]}>
                <View style={{ width: "75%" }}></View>
                <View style={{ width: "25%" }}>
                    <View style={[styles.container, {}]}>
                        <Text style={{ fontSize: 10, width: '50%', fontFamily: 'medium' }}>Grand Total Earnings</Text>
                        <Text style={{ fontSize: 10, width: '50%', textAlign: 'right', fontFamily: 'bold' }}>$ {dataHolder?.your_earning}</Text>
                    </View>
                    <View style={[styles.container, {}]}>
                        <Text style={{ fontSize: 10, width: '50%', fontFamily: 'medium' }}>Grand Total Price</Text>
                        <Text style={{ fontSize: 10, width: '50%', textAlign: 'right', fontFamily: 'bold' }}>$ {dataHolder?.total_price+ dataHolder?.delivery_price-dataHolder?.coupon_discount}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={[styles.w_100, { textAlign: 'right', fontFamily: 'medium', marginTop: 5 }]}>{dataHolder?.seller_id?.company?dataHolder?.seller_id?.company:'Not Available'}</Text>
            </View>
        </Fragment>
    )
}
export default InvoiceTable;