import _superagent from "superagent";
const superagentPromise = require("superagent-promise");
const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = `https://${(window.origin.includes('demo') || window.origin.includes('localhost')) ? `demo.` : window.origin.includes('production') ? `production.` : ``}sharedecommerce.henceforthsolutions.com:3004/`;
const API_ROOT = window.origin.includes('demo') ? `https://demo.ecommerce.henceforthsolutions.com:3006/` : `https://sharedecommerce.henceforthsolutions.com:3004/`
// const API_ROOT = `https://demo.ecommerce.henceforthsolutions.com:3006/`
const API_ROOT_IMAGEUPLOAD = `https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/`
const BUCKET_ROOT = `https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/`;

const API_FILE_ROOT_MEDIUM = `${BUCKET_ROOT}medium/`;
const API_FILE_ROOT_ORIGINAL = `${BUCKET_ROOT}original/`;
const API_FILE_ROOT_SMALL = `${BUCKET_ROOT}small/`;
// const API_FILE_ROOT_AUDIO = `${BUCKET_ROOT}audio/`;
// const API_FILE_ROOT_VIDEO = `${BUCKET_ROOT}video/`;
// const API_FILE_ROOT_DOCUMENTS = `${BUCKET_ROOT}documents/`;

const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;
let Language = ''
const languageChange = (req: any) => {
  // debugger
  Language = req
};

let token: any = null;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set("token", `${token}`);
  }
};

const requests = {
  del: (url: any) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: any) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: any, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  put1: (url: any) =>
    superagent
      .put(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url: any, body: any) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: any, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  file: (url: any, key: any, file: any) =>
    superagent.post(`${API_ROOT}${url}`)
      .attach(key, file)
      .use(tokenPlugin)
      .then(responseBody)
};

const Auth = {
  login: (info: any) => requests.post("Admin/login", info),
  signup: (info: any) => requests.post("Seller/signup", info),
  forgotPassword: (info: any) => requests.post("password/forgot", info),
  checkOtp: (info: any) => requests.post("check-email-otp", info),
  resetPassword: (info: any) => requests.post("reset/password", info),
  changePassword: (info: any) => requests.put("admin/change-password", info),
};


const Dashboard = {
  getPagnation: (type: any) =>
    requests.get(
      `Admin/dashboard?language=${Language}&type=${String(
        type ? type : "MONTHLY"
      ).toUpperCase()}`
    ),
};
const ProductList = {
  getProductList: (pagination: number, limit: number, q: string,) => {
    return requests.get(
      `Admin/products?language=${Language}&pagination=${pagination}&limit=${limit}${q ? `&${q}` : ''}`
    );
  },
  getProductFilter: (q: any) => requests.get(`Admin/products?${q ? `&${q}` : ''}&language=${Language}`),

  export: (start_date: Number, end_date: number) =>
    requests.get(
      `Admin/products?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`
    ),
  getProductDetail: (id: any) => {
    return requests.get(
      `Admin/product_details?_id=${id}&language=${Language}`
    );
  },
}
const Order = {
  getOrder: (pagination: number, limit: any, q: string) => requests.get(
    `Admin/orders?language=${Language}&pagination=${pagination}&limit=${limit}${q ? `&${q}` : ``}`
  ),
  orderDetails: (id: any) => requests.get(`Admin/orders/${id}?language=${Language}`),
  cancelOorder: (value: any) => requests.put(`Admin/orders/cancel`, value),

  export: (start_date: number, end_date: number) => requests.get(`Admin/orders?${start_date ? `start_date=${start_date}` : ''}${end_date ? `&end_date=${end_date}` : ''}&language=${Language}`)
}
const Rating = {
  RatingReview: (pagination: number, limit: any, q: any) => requests.get(
    `Admin/order/reviews?language=${Language}&pagination=${pagination}&limit=${limit}${q ? `&${q}` : ``}`
  ),
}
const Facility = {
  getApprovalPagnation: (page: any, limit: any, filter: any) =>
    requests.get(
      `admin/facility/approvals?page=${page}&limit=${limit ? limit : 10}${filter ? filter : ""
      }`
    ),
  getPagnation: (page: any, limit: any, filter: any) =>
    requests.get(
      `admin/facilities?page=${page}&limit=${limit ? limit : 10}${filter ? filter : ""
      }`
    ),
  approvalAccept: (facility_id: any) =>
    requests.put("admin/facility/approval", {
      facility_id: facility_id,
      status: 1,
    }),
  approvalDecline: (facility_id: any) =>
    requests.put("admin/facility/approval", {
      facility_id: facility_id,
      status: 4,
    }),
  updateFee: (item: any) => requests.put("admin/facility/fees", item),
};

const Transaction = {
  getPagnation: (page: any, limit: any, filter: any) =>
    requests.get(
      `admin/transactions?page=${page}&limit=${limit ? limit : 10}${filter ? filter : ""
      }`
    ),
};

const PromoCode = {
  getPagnation: (page: any, limit: any, filter: any) =>
    requests.get(
      `admin/transactions?page=${page}&limit=${limit ? limit : 10}${filter ? filter : ""
      }`
    ),
  createEndUser: (item: any) => requests.post("admin/promo_code", item),
};



const Seller = {

  getsellerlisting: (search: any, q: any, pagination: any, limit: any) =>
    requests.get(
      `Admin/sellers?language=${Language}${search ? `&search=${search}` : q ? `&filter=${q}` : ""}&pagination=${pagination}&limit=${limit}`
    ),
  orders: (pagination: any, limit: any, q: any, search: any) =>
    requests.get(
      `Admin/orders?language=${Language}${search ? `&search=${search}` : ""}&pagination=${pagination}&limit=${limit}${q ? `&${q}` : ''}`
    ),
  export: (start_date: any, end_date: any) =>
    requests.get(
      `Admin/sellers?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`
    ),
  sellerdelete: (_id: any) => requests.del(`Admin/seller/${_id}`),

  details: (id: any) => {
    return requests.get(
      `Admin/seller_details?language=${Language}&_id=${id}`
    )
  },
  getsellerProductList: (id: any, pagination: number, limit: number, q: string, search: string, start_date: number, end_date: number) => {
    return requests.get(
      `Admin/products?seller_id=${id}&language=${Language}&pagination=${pagination}&limit=${limit}${search ? `&search=${search}` : ''}${q ? `&${q}` : ''}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ''}`
    );
  },
  invoice: (invoice_type: string, order_id: string, _id: string) => requests.get(`Admin/order/invoice?order_id=${order_id}&_id=${_id}&invoice_type=${invoice_type}`),

  manageSeller: (values: any) =>
    requests.put("Admin/seller/manage_sellers", {
      type: values.type,
      _id: values._id,
      is_blocked: values.is_blocked,
      is_deleted: values.is_deleted,
      account_status: values.account_status,
      language: values.language,
      admin_verified: values.admin_verified ? values.admin_verified : false,
    }),
}
const Graph = {
  salesgraph: (graph_type: string, type: any) => {

    return requests.get(
      `Admin/graph/${graph_type}?type=${type ? type : "WEEKLY"}&language=${Language}`
    )
  },

}
const commission = {
  getCommission: () => requests.get(`Admin/fees?language=${Language}`),
  editCommission: (value: any) => requests.put(`Admin/fees`, value),
  addCommission: (value: any) => requests.post(`Admin/fees`, value)
}



const User = {
  getlisting: (search: any, q: any, pagination: any, limit: any,) =>
    requests.get(
      `Admin/users/listing?language=${Language}${search ? `&search=${search}` : q ? `&filter=${q}` : ""}&pagination=${pagination}&limit=${limit}`
    ),
  notificationUser: (search: string) =>
    requests.get(
      `Admin/list_users_sellers?language=${Language}${search ? `&search=${search}` : ``}`
    ),
  getexport: (start_date: any, end_date: any) =>
    requests.get(
      `Admin/users/listing?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`
    ),

  getListingdetails: (id: any) => {
    return requests.get(
      `Admin/users/details?_id=${id}&language=${Language}`
    );
  },

  getTips: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/tip_history?language=${Language}&_id=${_id}&pagination=${pagination}&limit=10`
    ),

  getUserDetails: (_id: any) => requests.get(`Seller/product/details?_id=${_id}&language=${Language}`),
  userDelete: (_id: any) => requests.del(`Admin/users/${_id}`),
  getUserOrderDetails: (pagination: number, limit: Number, q: any, _id: string) => requests.get(`Admin/users/orders?_id=${_id}&language=${Language}${q ? `&${q}` : ""}&pagination=${pagination}${limit ? `&limit=${limit}` : ''}`),
  getUserOrderExport: (id: any, start_date: number, end_date: number) =>
    requests.get(`Admin/users/orders?_id=${id}${start_date ? `&start_date=${start_date}` : ''}${end_date ? `&end_date=${end_date}` : ""}&language=${Language}`),
  manageUsers: (values: any) =>
    requests.put("Admin/users/manage_users", {
      type: values.type,
      _id: values._id,
      is_blocked: values.is_blocked,
      is_deleted: values.is_deleted,
      account_status: values.account_status,
      language: values.language,
      admin_verified: values.admin_verified ? values.admin_verified : false,
    }),

  sendCredit: (info: any) => requests.put("admin/credit", info),
  delete: (info: any) => requests.del("admin/user"),
  getVaultNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=VAULT&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  // getResaleNfts: (_id:any, pagination:any) =>
  //   requests.get(
  //     `Admin/users/nfts?language=${Language}&type=ON_SALE&user_id=${_id}&pagination=${pagination}&limit=10`
  //   ),
  getOwnNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=OWNED&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getSoldNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=SOLD&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getCreatedNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=CREATED&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getBidNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=BIDS&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getFavNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=FAVOURITE&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getActivityNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=ACTIVITY&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getCollectionsNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=COLLECTION&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getDividendsNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=DIVIDENDS&user_id=${_id}&pagination=${pagination}&limit=10`
    ),
};
const Notification = {
  getNotification: (pagination: any, limit: any) => requests.get(`Admin/notifications?language=${Language}&pagination=${pagination}&limit=${limit}`),
  markAllAsRead: (value: any) => requests.put(`Admin/notifications?language=${Language}`, value),
  clearAllNotification: (value: any) => requests.put(`Admin/notifications/clear?language=${Language}`, value),
  markAsRead: (info: any, id: string) => requests.put(`Admin/notifications/read/${id}?language=${Language}`, info),

  orderDetails: (_id: any) => requests.get(`Admin/order/detail/${_id}?language=${Language}`)

}
const Booking = {
  list: (pagination: any, limit: any, search: any) => {
    requests.get(`Admin/bookings?pagination=${pagination}&limit=${limit}${search ? `&search=${search}` : ''}`)
  },

  getBookingDetails: (_id: any) => requests.get(`Admin/bookings/${_id}&language=${Language}`),
}

const CarListing = {
  getCarDetails: (_id: any) => requests.get(`Admin/user_vehicles?driver_id=${_id}`),
}
const Coupons = {
  create: (info: any) => requests.post(`Admin/coupon`, info),
  put: (info: any) => requests.put(`Admin/coupon`, info),
  byid: (_id: string) => requests.get(`Admin/coupon/${_id}`),
  get: (pagination: number, q: any, limit?: number) => requests.get(`Admin/coupon?language=${Language}&pagination=${pagination}&limit=${limit ? limit : 10}${q ? `&${q}` : ''}`),
  delete: (id: any) => requests.del(`Admin/coupon/${id}`),
  promotionaget: () => requests.get(`Admin/coupon?language=${Language}`),
  homeCoupon: (_id: any, value: any, ishome: boolean) => requests.put(`Admin/homepage/coupon/${_id}?for_homepage=${ishome}`, value),
  showCoupon: () => requests.get(`Homepage/coupon`)
}

const Creator = {
  export: (start_date: any, end_date: any, timezone: any) =>
    requests.get(
      `Admin/creator?language=${Language}&start_date=${start_date}&end_date=${end_date}&timezone=${timezone}`
    ),
  reported: (_id: any, pagination: any) =>
    requests.get(
      `Admin/creator/reported?language=${Language}&_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getListing: (search: any, pagination: any) =>
    requests.get(
      `Admin/nfts?language=${Language}${search ? `&search=${search}` : ""
      }&pagination=${pagination}&limit=10`
    ),
  getCreatorDetails: (_id: any) =>
    requests.get(`Admin/nfts/details?${_id}&language=${Language}`),
  getTips: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/tip_history?language=${Language}&_id=${_id}&pagination=${pagination}&limit=10`
    ),
  getCreatedNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/nfts/creator?language=${Language}&type=CREATED&created_by=${_id}&pagination=${pagination}&limit=10`
    ),
  getOwnNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/nfts/creator?language=${Language}&type=OWNED&created_by=${_id}&pagination=${pagination}&limit=10`
    ),
  getSoldNfts: (_id: any, pagination: any) =>
    requests.get(
      `Admin/users/nfts?language=${Language}&type=SOLD&created_by=${_id}&pagination=${pagination}&limit=10`
    ),
  verifyProfile: (_id: any, admin_verified: any) =>
    requests.put("Admin/creator", {
      _id,
      type: "VERIFY/UNVERIFY",
      admin_verified: !admin_verified,
      language: "ENGLISH",
    }),
  manageCreators: (values: any) =>
    requests.put("Admin/creator", {
      type: values.type,
      _id: values._id,
      is_blocked: values.is_blocked,
      is_deleted: values.is_deleted,
      admin_verified: values.admin_verified,
      account_status: values.account_status,
      language: values.language,
    }),

  getMediaList: (_id: any, graph_type: any, timezone: any) =>
    requests.get(
      `Admin/nfts/details?language=${Language}&_id=${_id}&graph_type=YEARLY&timezone=${timezone}`
    ),

  sendCredit: (info: any) => requests.put("admin/credit", info),
  delete: (info: any) => requests.del("admin/user"),
};

const BookingListing = {
  getPagnation: (page: any, limit: any, filter: any) =>
    requests.get(
      `Admin/bookings?page=${page}&limit=${limit ? limit : 10}${filter ? filter : ""
      }`
    ),
  getBookingDetails: (_id: any) => requests.get(`Admin/bookings/${_id}`),
};

const ManageTransaction = {
  getPagnation: (limit: any, page: any) => requests.get(`Admin/manage_transactions?limit=${limit}&pagination=${page}`)

}

const ForgotPassword = {
  forgotPassword: (info: any) => requests.put("Seller/forgot_password", info)
}

const Vechicle = {
  getListing: (pagination: any, limit: any, id: any, search: any) => {
    return requests.get(
      `Admin/vehicles?pagination=${pagination}&limit=${limit}&language=${Language}&${search ? `&search=${search}` : ""}`
    )

  },

  getVehicleDetails: (_id: any) => requests.get(`Admin/user_vehicles/${_id}`),
  addVehicle: (_id: any, data: any) => requests.get(`Admin/user_vehicles/${_id}`)
}
const Riding = {
  getRideDetails: (_id: any, pagination: any, limit: any) => requests.get(`Admin/publish/rides?_id=${_id}&pagination=${pagination}&limit=${limit}`),
}
const Administrator = {
  getStaffMemberDetail: (id: any) =>
    requests.get(`Admin/staff_members/details?_id=${id}&language=${Language}`),

  addStaffMembers: (values: any) => {
    return requests.post(`Seller/products`, values);
  },
  blockOrDeleteStaff: (values: any) => requests.put("Admin/staff_members/block_delete", values),

  getStaffMembers: (values: any) =>
    requests.get(
      `Admin/staff_members?language=${values.language}&search=${values.search}&pagination=${values.page}&limit=${values.limit}`
    ),

  getPagnation: (page: any, limit: any, filter: any) =>
    requests.get(
      `admin/administration?page=${page}&limit=${limit ? limit : 10}${filter ? filter : ""
      }`
    ),
  changeRole: (info: any) => requests.put("admin/role", info),

  changePassword: (values: any) =>
    requests.put("Admin/change_password", {
      old_password: values.oldPass,
      new_password: values.newPass,
      language: values.language,
    }),
  editImgProfile: (info: any) => requests.put('Admin/profile', info),

  editProfile: (values: any) =>
    requests.put(`Admin/profile`, values),

  sendNotifications: (values: any) => requests.post(`Admin/notification/broadcast`, values),
};

const Staff = {
  staffpagination: (page: number, search: any, role: any) =>
    requests.get(
      `Admin/staff_members/listing?language=${Language}${search ? `&search=${search}` : ""
      }${role !== "all" ? `&role=${role}` : ""}&pagination=${Number(page) - 1
      }&limit=10`
    ),
  add: (values: any) => requests.post(`Admin/staff_members/add`, values),
  edit: (values: any) => requests.put(`Admin/staff_members/edit`, values),
  get: (_id: string) => requests.get(`Admin/staff_members/details?_id=${_id}&language=${Language}`),
  delete: (value: any) => requests.put(`Admin/staff_members/block_delete`, value),
  export: (start_date: number, end_date: number) => requests.get(`Admin/staff_members/listing?language=${Language}&start_date=${start_date}&end_date=${end_date}`),
};

const password = {
  changepassword: (values: any) => requests.put(`Admin/change_password`, values)
}

const Category = {
  exportCategory: (start_date: Number, end_date: number) => requests.get(`Admin/category?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`),
  listCategory: (q?: string, pagination?: number, limit?: number) => requests.get(`Admin/category?language=${Language}${q ? `&${q}` : ''}${pagination ? `&pagination=${pagination}` : ''}${limit ? `&limit=${limit}` : ''}`),
  addCategory: (info: any) => requests.post(`Admin/category`, info),
  editCategory: (value: any) => requests.put(`Admin/category`, value),
  categoryDelete: (value: any) => requests.put(`Admin/category`, value),

  exportSubCategory: (start_date: Number, end_date: number) => requests.get(`Admin/subcategory?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`),
  listSubCategory: (search?: string, pagination?: number, limit?: number) => requests.get(`Admin/subcategory?language=${Language}${search ? `&search=${search}` : ''}${pagination ? `&pagination=${pagination}` : ''}${limit ? `&limit=${limit}` : ''}`),
  addSubCategory: (info: any) => requests.post(`Admin/subcategory`, info),
  detailsSubCategory: (_id: any) => requests.get(`Admin/subcategory/${_id}`),
  editSubCategory: (value: any) => requests.put(`Admin/subcategory`, value),
  subCategoryDelete: (value: any) => requests.put(`Admin/subcategory`, value),

  exportSubSubCategory: (start_date: Number, end_date: number) => requests.get(`Admin/sub_subcategory?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`),
  listSubSubCategory: (search?: string, pagination?: number, limit?: number) => requests.get(`Admin/sub_subcategory?language=${Language}${search ? `&search=${search}` : ''}${pagination ? `&pagination=${pagination}` : ''}${limit ? `&limit=${limit}` : ''}`),
  addSubSubCategory: (info: any) => requests.post(`Admin/sub_subcategory`, info),
  detailsSubSubCategory: (_id: any) => requests.get(`Admin/sub_subcategory/${_id}`),
  editSubSubCategory: (value: any) => requests.put(`Admin/sub_subcategory`, value),
  subSubCategoryDelete: (value: any) => requests.put(`Admin/sub_subcategory`, value),

  filterSubCategory: (_id: any) => requests.get(`Product/subcategories?&language=${Language}${_id ? `&category_id=${_id}` : ""}`),
  filterSubSubCategory: (_id: any) => requests.get(`Product/sub_subcategories?&language=${Language}${_id ? `&subcategory_id=${_id}` : ""}`),



}



const Policies = {
  all: () => requests.get(`Admin/content/listing?language=${Language}`),
  do_spaces_file_upload: (key: any, file: any) =>
    requests.file(`Upload/do_spaces_file_upload`, key, file),
  byType: (type: any) =>
    requests.get(`Admin/content/listing?type=${type}&language=${Language}`),
  editPolicy: (values: any) => requests.post(`Admin/content/add_edit`, values),
  delete: (id: any) => requests.del(`Admin/policies/${id}`),
  detail: (id: string) => requests.get(`Admin/content/${id}`),
};

const ContactUs = {
  pagination: (page: any, search: any) =>
    requests.get(
      `Admin/contact_us/listing?language=${Language}${search ? `&${search}` : ""
      }&pagination=${Number(page)}&limit=6`
    ),
  fetchContacts: (values: any) =>
    requests.get(
      `Admin/contact_us?language=${values.language}&search=${values.search}&pagination=${values.page}&limit=${values.limit}`
    ),

  deleteContact: (values: any) => requests.put(`Admin/contact_us/resolve_delete`, values),

  resolveContact: (values: any) => requests.put(`Admin/contact_us/resolve_delete`, values),
};

const Profile = {
  get: () => requests.get(`admin/profile`),
  getById: (id: any) => requests.get(`profile?id=${id}`),
  update: (info: any) => requests.put(`admin/profile`, info),
};
const Divident = {
  release: (info: any) => requests.post(`Admin/dividents/release`, info),
};

const Faq = {
  addFaq: (values: any) => requests.post(`Admin/faqs`, values),
  editFaq: (values: any) => requests.post(`Admin/faqs`, values),
  getFaqList: () => requests.get(`Admin/faqs?language=${Language}`),
  deleteFaq: (id: any) => requests.del(`Admin/faqs/delete/${id}`),

};
const Reports = {
  pagination: (pagination: any) =>
    requests.get(
      `Admin/reported?language=${Language}&pagination=${pagination}&limit=10`
    ),
  getFaqById: (values: any) =>
    requests.get(`Admin/reported?language=${Language}&_id=${values._id}`),
};

const Common = {

  do_spaces_file_upload_multiple: (key: any, file: any) =>
    requests.file(`Upload/do_spaces_file_upload_multiple`, key, file),
  do_spaces_file_upload: (key: any, file: any) =>
    requests.file(`Upload/do_spaces_file_upload`, key, file),
  ethusd: () =>
    superagent.get(
      `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD`
    ),
  allUsers: (search: any) =>
    requests.get(
      `Admin/users?language=${Language}${search ? `&search=${search}` : ""
      }&pagination=0&limit=10`
    ),
  staticData: () => requests.get(`static-data`),
  getSales: (pagination: any, search: any) =>
    requests.get(
      `Admin/nfts/orders/trade?language=${Language}&${search ? `&search=${search}` : ""
      }&pagination=${pagination}&limit=10`
    ),
  export: (start_date: any, end_date: any, timezone: any) =>
    requests.get(
      `Admin/nfts/orders/trade?language=${Language}&start_date=${start_date}&end_date=${end_date}`
    ),
  getSalesDetails: (_id: any, pagination: any) =>
    requests.get(
      `Admin/sales?language=${Language}&_id=${_id}&pagination=${pagination}&limit=10`
    ),
  all_languages: () => requests.get(`admin/all_languages`),
  all_counrties: () => requests.get(`admin/all_counrties`),
  addCountries: (name: any) => requests.post(`admin/countries`, { name: name }),
  addLanguage: (name: any) => requests.post("admin/languages", { name: name }),
  backupDb: (bodyData: any) =>
    requests.post("Admin/backup-database", bodyData),
  nested: () => {
    return requests.get(
      `User/nested`
    );
  },
};
const Message = {
  send: (items: any) => requests.post("admin/message", items),
};
const HomeManagemnt = {
  bannerlisting: (position: string, pagination: number, limit: number) =>
    requests.get(`Homepage/admin/banner?language=${Language}&position=${position}&pagination=${pagination ? pagination : 0}&limit=${limit}`),
  addbanner: (value: any) => requests.post(`Homepage/admin/banner`, value),
  viewbanner: (_id: any) => requests.get(`Homepage/admin/banner/${_id}`),
  deletebanner: (_id: any) => requests.del(`Homepage/admin/banner/${_id}`),
  categoylist: () => requests.get(`Product/categories?language=${Language}`),
  subcategorylist: () => requests.get(`Product/subcategories?language=${Language}`),
  Brands: () => requests.get(`Product/brands`),
  viewenableDisable: (value: any) => requests.put(`Homepage/admin/banner/enable-disable`, value),
  editbanner: (value: any) => requests.put(`Homepage/admin/banner`, value),
  styleforlist: () => requests.get(`Homepage/admin/style_for?language=${Language}`),
  styleMenCategory: (id: string) => requests.get(`Homepage/admin/style_for_categories?style_for_id=${id}&language=${Language}`),
  styleCategoryList: (id: string, styleId: string) => requests.get(`Homepage/admin/style_for_categories?_id=${id}&style_for_id=${styleId}&language=${Language}`),
  addstyleCategory: (value: any) => requests.post(`Homepage/admin/style_for_categories`, value),
  editstyleCategory: (value: any) => requests.put(`Homepage/admin/style_for_categories`, value),
  deletestyleCategory: (id: any) => requests.del(`Homepage/admin/style_for_categories/${id}`),
  enableDisableBanner: (value: any) => requests.put(`Homepage/admin/style_for_categories/enable-disable`, value)
}


const StyleFor = {
  listing: () => requests.get(`Homepage/admin/style_for?language=${Language}`),
}

const enableDisable = {
  enableDisableBanner: (value: any) => requests.put(`Homepage/admin/banners/enable-disable`, value)
}
const Dealsofday = {
  Dealslist: (pagination: any, limit: any) =>
    requests.get(`Homepage/user/deal_of_the_day?language=${Language}&pagination=${pagination}&limit=${limit}`),
  Adddeals: (value: any) => requests.post(`Homepage/admin/deal_of_the_day`, value),
  viewdeals: (_id: any) => requests.get(`Homepage/admin/deal_of_the_day/${_id}`),
  editDeals: (value: any) => requests.put(`Homepage/admin/deal_of_the_day`, value),
  deletedeals: (_id: any) => requests.del(`Homepage/admin/deal_of_the_day/${_id}`),
  enableDisableDeals: (value: any) => requests.put(`Homepage/admin/deals_of_the_day/enable-disable`, value)

}
const DealsTimer = {
  Timer: (value: any) => requests.post(`Homepage/admin/deals_day/timer`, value),
  getTime: () => requests.get(`Homepage/user/deals_day/timer`)
}
const Topdeals = {
  Toplist: (pagination: any, limit: any) => requests.get(`Homepage/admin/top_deals?language=${Language}&pagination=${pagination}&limit=${limit}`),
  Addtop: (value: any) => requests.post(`Homepage/admin/top_deals`, value),
  deleteTop: (_id: any) => requests.del(`Homepage/admin/top_deals/${_id}`),
  detailsTopDeals: (_id: any) => requests.get(`Homepage/admin/top_deals/${_id}`),
  updateTopDeals: (value: any) => requests.put(`Homepage/admin/top_deals`, value),
  EnableDisable: (value: any) => requests.put(`Homepage/admin/top_deals/enable-disable`, value)
}
const FashionDeals = {
  Fashionlist: (pagination: any, limit: any) => requests.get(`Homepage/admin/fashion_deals?language=${Language}&pagination=${pagination}&limit=${limit}`),
  Addfashion: (value: any) => requests.post(`Homepage/admin/fashion_deals`, value),
  deleteFshion: (_id: any) => requests.del(`Homepage/admin/fashion_deals/${_id}`),
  detailsFshion: (_id: any) => requests.get(`Homepage/admin/fashion_deals/${_id}`),
  updateFashion: (value: any) => requests.put(`Homepage/admin/fashion_deals`, value),
  isEnableDisable: (value: any) => requests.put(`Homepage/admin/fashion_deals/enable-disable`, value)
}
const FeaturedCategories = {
  FeaturedLIST: (pagination: any, limit: any) => requests.get(`Homepage/admin/featured_categories?language=${Language}&pagination=${pagination}&limit=${limit}`),
  Featuredadd: (value: any) => requests.post(`Homepage/admin/featured_categories`, value),
  deletFeatured: (_id: any) => requests.del(`Homepage/admin/featured_categories/${_id}`),
  detailsFeatured: (_id: any) => requests.get(`Homepage/admin/featured_categories/${_id}`),
  updateFeatured: (value: any) => requests.put(`Homepage/admin/featured_categories`, value),
  isEnableDisable: (value: any) => requests.put(`Homepage/admin/featured_categories/enable-disable`, value)

}
const Shopwith = {
  shoplist: (pagination: any, limit: any) => requests.get(`Homepage/admin/shop_with_us?language=${Language}&pagination=${pagination}&limit=${limit}`),
  shopadd: (value: any) => requests.post(`Homepage/admin/shop_with_us`, value),
  deleteShop: (_id: any) => requests.del(`Homepage/admin/shop_with_us/${_id}`),
  detailsShop: (_id: any) => requests.get(`Homepage/admin/shop_with_us/${_id}`),
  updateShopwith: (value: any) => requests.put(`Homepage/admin/shop_with_us`, value),
  isEnableDisable: (value: any) => requests.put(`Homepage/admin/shop_with_us/enable-disable`, value)

}
const Ecommerce = {
  Ecommercelist: (pagination: any, limit: any) => requests.get(`Homepage/admin/best_on_ecom?language=${Language}&pagination=${pagination}&limit=${limit}`),
  Ecommereceadd: (value: any) => requests.post(`Homepage/admin/best_on_ecom`, value),
  deleteEcommerce: (_id: any) => requests.del(`Homepage/admin/best_on_ecom/${_id}`),
  detailsEcommerce: (id: any) => requests.get(`Homepage/admin/best_on_ecom/${id}`),
  editEcommerce: (value: any) => requests.put(`Homepage/admin/best_on_ecom`, value),
  isEnableDisable: (value: any) => requests.put(`Homepage/admin/best_on_ecom/enable-disable`, value)
}
const Content = {
  AboutusList: () => requests.get(`Admin/content/listing?language=${Language}`)
}
const Brands = {
  export: (start_date: Number, end_date: number) => requests.get(`Admin/brand?language=${Language}${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`),
  get: (pagination: number, limit: number, q: string) => requests.get(`Admin/brand?language=${Language}&pagination=${pagination}&limit=${limit}${q ? `&${q}` : ''}`),
  add: (value: any) => requests.post(`Admin/brand`, value),
  edit: (items: any) => requests.put(`Admin/brand`, items)
}

const Lang = {
  get: (id: any) => requests.get(`Admin/main-keys/${id}`),
  add: (value: any) => requests.post(`Admin/key-values`, value),
  edit: (id: any, items: any) => requests.patch(`Admin/key-values/${id}`, items),
  getKeys: (type: any) => requests.get(`Admin/main-keys?type=${type ? type : "WEBSITE"}`),
  addKeys: (value: any) => requests.post(`Admin/main-keys`, value)
}
const Nfts = {
  export: (start_date: any, end_date: any, timezone: any) =>
    requests.get(
      `Admin/nfts?language=${Language}&start_date=${start_date}&end_date=${end_date}&timezone=${timezone}`
    ),

  pagination: (pagination: any, search: any) =>
    requests.get(
      `Seller/products?language=${Language}${search ? `&search=${search}` : ""
      }&pagination=${pagination}&limit=12`
    ),

  streamingPartner: () =>
    requests.get(
      `Admin/stream_partner?language=${Language}`
    ),
  addeditStreamingPartner: (values: any) =>
    requests.post(
      `Admin/stream_partner`, values
    ),


  deletePartner: (_id: any) => requests.del(`Admin/stream_partner/${_id}`),

  nftStreaming: (pagination: any) =>
    requests.get(
      `Admin/streaming?language=${Language}&pagination=0&limit=9`
    ),
  getstreamingPending: (pagination: any) =>
    requests.get(
      `Admin/streaming?language=${Language}&status=PENDING&pagination=0&limit=10`
    ),
  getstreamingAccept: (_id: any, pagination: any) =>
    requests.get(
      `Admin/streaming?language=${Language}&status=ACCEPT&pagination=${pagination}&limit=10`
    ),
  getstreamingReject: (pagination: any) =>
    requests.get(
      `Admin/streaming?language=${Language}&status=REJECT&pagination=0&limit=10`
    ),

  nftStreamingDetails: (_id: any) =>
    requests.get(
      `Admin/streaming/${_id}?language=${Language}`
    ),
  dividents: () =>
    requests.get(
      `Admin/dividents?language=${Language}`
    ),
  payDividents: (values: any) =>
    requests.post(
      `Admin/dividents`, values
    ),

  dividentsDetails: (_id: any) =>
    requests.get(
      `Admin/dividents/${_id}?language=${Language}`
    ),
  dividentsUserTransaction: (_id: any, user_id: any) =>
    requests.get(
      `Admin/dividents/user_transaction?_id=${_id}&user_id=${user_id}&language=${Language}`
    ),
  collectionlisting: (pagination: any) =>
    requests.get(
      `collection/hot?language=${Language}&limit=9&pagination=${pagination}`
    ),
  collectionDetails: (_id: any) =>
    requests.get(
      `collection/${_id}`
    ),
  collectionNftDetails: (_id: any) =>
    requests.get(
      `Nft/explore?collection_id=${_id}&language=${Language}`
    ),



  editStreaming: (values: any) => requests.put(`Admin/streaming`, values),

  UpdateProduct: (_id: any) =>
    requests.get(
      `Product/details?_id=${_id}&language=${Language}`
    ),


  reports: (_id: any) =>
    requests.get(`Admin/nfts/reported?language=${Language}&nft_id=${_id}`),
  allReports: (_id: any) => requests.get(`Admin/nfts/reported?language=${Language}`),
  details: (_id: any) =>
    requests.get(
      `Seller/product/details?&language=${Language}&_id=${_id}`
    ),
  Brandlisting: (_id: any) =>
    requests.get(
      `Product/brands`
    ),
  categorylisting: (_id: any) =>
    requests.get(
      `Product/categories?language=${Language}`

    ),
  subCategorylisting: (_id: any) =>
    requests.get(
      `Product/subcategories?language=${Language}`
    ),
  subSubCategorylisting: (_id: any) =>
    requests.get(
      `Product/sub_subcategories?language=${Language}`
    ),
  delete: (info: any) => requests.put(`Admin/nfts`, info),
  recovery: (info: any) => requests.put(`Admin/nfts/recovery`, info),
};
const FILES = {
  // audio: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_AUDIO}${filename}`,
  // video: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_VIDEO}${filename}`,
  imageOriginal: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_ORIGINAL}${filename}`,
  imageMedium: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_MEDIUM}${filename}`,
  imageSmall: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_SMALL}${filename}`,
}

export default {
  Auth,
  Booking,
  ContactUs,
  token,
  Divident,
  Faq,
  Reports,
  Category,
  StyleFor,
  Brands,
  Lang,
  Graph,
  Administrator,
  Staff,
  Common,
  Content,
  DealsTimer,
  enableDisable,
  Rating,
  Ecommerce,
  Profile,
  commission,
  Topdeals,
  FeaturedCategories,
  password,
  Dealsofday,
  Seller,
  Shopwith,
  Notification,
  Order,
  ForgotPassword,
  CarListing,
  Dashboard,
  Facility,
  BookingListing,
  Vechicle,
  Transaction,
  PromoCode,
  HomeManagemnt,
  FashionDeals,
  User,
  Riding,
  Policies,
  Creator,
  ManageTransaction,
  Message,
  Coupons,
  Nfts,
  ProductList,
  FILES,
  API_ROOT,
  API_ROOT_IMAGEUPLOAD,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_ORIGINAL,
  // API_FILE_ROOT_VIDEO, 
  languageChange,
  setToken: (_token: any) => {
    token = _token;
  },
};