export interface OrderResponse {
    "_id": string,
    "order_id": string,
    "user_id": {
        "_id": string,
        "profile_pic": string,
        "name": string
    },
    "seller_id": {
        "_id": string,
        "name": string,
        "image": string
    },
    "product_id": {
        "_id": string,
        "name": string,
        "description": string,
        "images": Array<string>,
        "category_id": {
            "_id": string,
            "name": string,
            "design_type": number,
            "is_deleted": boolean,
            "updated_at": string,
            "created_at": string,
        }
    },
    "total_price": number,
    "total_earnings": number,
    "order_status": string,
    "updated_at": string,
    "created_at": string,
    openFor?: string
    index:number
}
export interface OrderListResponse {
    data: {
        "total_count": number,
        "data"?: Array<OrderResponse>
    },
    message?: string,
    success?: boolean
}