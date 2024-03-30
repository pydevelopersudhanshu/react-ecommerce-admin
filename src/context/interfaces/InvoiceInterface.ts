interface ServiceResponse {
    "_id": string,
    "product_id": string,
    "content": string,
    "updated_at": string,
    "created_at": string
}

export interface ProductResponse {
    "_id": string,
    "name": string,
    "prod_id": string,
    "tax_no": string,
    "tax_percantage": string,
    "invoice_id": string,
    "product_id": string,
    "product_name": string,
    "description": string,
    "category_name": string,
    "subcategory_name": string,
    "subcategory": {
        "_id": string,
        "category_id": string,
        "name": string,
        "is_deleted": boolean,
        "updated_at": string,
        "created_at": string
    },
    "brand_name": string,
    "seller_name": string,
    "seller_country_code": string,
    "seller_phn_no": number,
    "seller_pincode": string,
    "seller_company": string,
    "seller_city": string,
    "seller_state": string,
    "seller_country": any,
    "seller_full_address": string,
    "quantity": number,
    "price": number,
    "delivery_price": number,
    "coupon_discount": number,
    "total_price": number,
    "tax_percentage": number,
    "tax_amount": number,
    "invoice_date": string,
    "services": Array<ServiceResponse>
}