export interface sublistApiResponse {
    data: Array<any>,
    for_homepage: boolean,
    total_count: number,

}
export interface listApiResponse {
    data: sublistApiResponse,
    limit: number,
    page?: number,
    _id: "",
    loading?: boolean,
    for_homepage: boolean

}
export interface sellerlist {
    data: {
        data: Array<any>,
        total_count: number
    }
}

export interface sellerdetails {

    data: {
        email: string,
        name: string,
        image: string,
        phone_number: number,
        _id: "",
        loading: false,
        account_status: string,
        is_blocked: Boolean,
        is_deleted: Boolean
    }

}
export interface dealsofday {
    start_date: null

    _id: "",
    is_enable: boolean,
    data: Array<any>,
    total_count: number

}
export interface content {
    data: Array<any>
}
export interface brands {
    data: Array<any>,
    total_count: number
}
export interface userorder {
    data: {
        data: Array<any>
        order_id: String,
        total_price: number,
        seller_id: {
            name: string,
            image: any
        },
        product_id: {
            name: string,
            images: any,
        }
    }

}
export interface sellerProduct {
    images: "",
    name: "",
    _id: "",
    category_id: {
        name: ""
    },
    subcategory_id: {
        name: ""
    },
    brand_id: {
        name: ""
    },
    sub_subcategory_id: {
        name: ""
    },
    tax_percentage: '',
    discount_percantage: '',
    prodct_id: "",
    product_highlights: [],
    productdetails: [],
    product_services: [],
    product_variations: [],
    delivery_locations: [],
    faqs_products: [],
    price: number,
    discount: number,
    ratings: ""
}

export interface orderInvoice {
    address_id: {
        full_address: string
    },
    coupon_discount: number,
    created_at: string,
    delivery_date: null | string,
    delivery_price: number,
    order_id: string,
    invoice_id: string,
    order_object_id: string,
    order_status: string,
    price: number
    product_id: {
        brand_id: {
            created_at: string,
            is_deleted: boolean,
            name: string,
            updated_at: string,
            __v: number,
            _id: string,
        },
        subcategory: {
            name: string
        },
        services: { _id: string, content: string }[],
        description: string,
        prod_id: string,
        images: Array<string>,
        name: string,
        _id: string
    }
    quantity: number,
    reviews: null | string,
    seller_id: {
        country: null | string,
        country_code: string,
        full_address: string,
        company: string,
        image: string,
        name: string,
        phone_number: number,
        pin_code: string,
        state: string,
        _id: string,
    }
    shippo_data: null | string,
    total_price: number,
    tax_amount: number,
    tax_percantage: number,
    tax_no: string,
    updated_at: string,
    user_id: {
        country_code: string,
        email: string,
        name: string,
        phone_no: number,
        profile_pic: string,
        _id: string
    }
    _id: string,
    your_earning: number
}
export interface innerCatType {
    name: string
}
export interface innerCatType2 {
    name: string
    image: string
}
export interface nameType {
    category_id: innerCatType,
    name: string,
    _id: string,
    images: Array<string>,
    reviews: any
}
export interface userProfileType {
    profile_pic: string,
    name: string
}
export interface listingType {
    _id: string,
    order_id: string,
    user_id: userProfileType,
    total_price: number,
    order_status: string,
    total_earnings: number,
    product_id: nameType,
    seller_id: innerCatType2
    total_ratings: number,
    cancel_requested: boolean,
    ord_id: string
}
export interface orderListType {
    total_count: number,
    data: Array<listingType>
}
export interface dataType {
    dataHolder: orderInvoice
}
export interface orderDetails {
    price: 0,
    quantity: 0,
    total_price: 0,
    coupon_discount: 0,
    order_id: "",
    order_status: any,
    order_object_id: "",
    _id: "",
    product_id: {
        name: "",
        description: "",
        images: "",
        _id: "",
        brand_id: {
            name: ""
        },

    },
    reviews: [{}],
    seller_id: {
        _id: '',
        name: "",
        image: "",
        full_address: '',
        phone_number: Number,
        country_code: Number
    },
    user_id: {
        _id: "",
        name: "",
        profile_pic: ""
    },
    address_id: {
        phone_no: 0,
        full_address: "",
        country_code: ""
    },
    tax_amount: "",
    product_discount_percentage: '',
    actual_product_price: '',
    admin_commision: "",
    seller_earnings: '',
    tax_percentage: 0,
    product_discount_price: any,
    other_order_items: []
}

interface breadCrumb {

    name: any, url: string, active: string
}
export interface breadcrumArray {
    pathNameDeclare: Array<breadCrumb>
}
export interface dataInvoice {
    data: {
        address_id: {
            name: ""
        }
    }
}
export interface editDeals{
    image: "",
    title: "",
    price: "",
    discount: "",
    brand_id: {
        _id: "",
        name: ""
    },
    category_id: {
        _id: "",
        name: ""
    },
    subcategory_id: {
        id: "",
        name: ""
    },
    sub_subcategory_id: {
        _id: "",
        name: ""
    }
}
export interface brands{
   _id:string,
   name:string
}
export interface category{
    _id:string,
    name:string
}
