import React, { createContext, ReactNode, SetStateAction, useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from './reducers/auth';
import logoutSuccess from "./actions/auth/logoutSuccess";
import henceforthApi from '../utils/henceforthApi';
// import authInitialStaticData from "./initialStates/authInitialStaticData";
import { DASHBOARD, USERS, CONTACT, CONTENT, HOME_MANAGEMENT, DB_BACKUP, FAQ, SELLER, PRODUCTS, ORDER, COUPONS, CATEGORY, BRAND, NOTIFICATION, STAFF_MEMBER } from '../context/actionTypes'
import { category } from './interfaces';
import Swal from 'sweetalert2';
import henceofrthEnums from '../utils/henceofrthEnums';
import loginSuccess from './actions/auth/loginSuccess';
interface CommonContextType {
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    LanguageChange1: any
    authState: {
        full_address: any; access_token: String, lang: string, name: String, email: String, phone_number: number, country_code: number, image: String, super_admin: string, roles: Array<string>
    };
    authDispatch: any;
    logOutNow: any;
    onChangeBack: any;
    handleSearch: any,
    onFilterPriceHandler: any
    numericValue: any,
    onChangePagination: any,
    downloadFile: any
    staffMembers: any,
    brand: Array<string>,
    category: any,
    categoryId: any,
    setCategoryId: any,
    subCategory: Array<string>,
    subCategoryId: any,
    setSubCategoryId: any,
    subSubCategory: Array<string>,
    subSubCategoryId: any
    setSubSubcategoryId: any,
    brandID: any,
    setbrandID: any,
    language: any,
    setLanguage: any,
    nestedData: Array<string>
}


export const GlobalContext = createContext({} as CommonContextType);
export const handleError = (error: any) => toast.error((typeof error?.response?.body?.error_description === "string") ? error?.response?.body?.error_description : JSON.stringify(error?.response?.body?.error_description))


export const downloadFile = (file_path: String) => {
    var a: any = document.createElement('a') as HTMLElement;
    a.href = file_path;
    a.target = "_blank";
    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
// export const onChangeBack = () => {
//     window.history.back()
// }
export const MetamaskResource = {
    icon: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    name: 'Metamask',
    title: 'Connect with metamask'
}
export const WalletConnectResource = {
    icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg',
    name: 'WalletConnect',
    title: 'Connect with walletConnect'
}
type GlobleContextProviderProps = {
    children: ReactNode;
}

function GlobalProvider(props: GlobleContextProviderProps) {
    const location = useLocation()
    const newParam = new URLSearchParams(location.search);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [brand, setbrand] = useState([])
    const [brandID, setbrandID] = useState("")
    const [language, setLanguage] = useState("")
    const [category, setCategory] = useState<Array<category>>([])
    const [categoryId, setCategoryId] = useState("")

    const [subCategory, setSubCategory] = useState([])
    const [subCategoryId, setSubCategoryId] = useState("")

    const [subSubCategory, setSubSubCategory] = useState([])
    const [subSubCategoryId, setSubSubcategoryId] = useState("")

    const [nestedData, setNestedData] = useState([])
    const [authState, authDispatch] = useReducer(auth, {}, () => {
        const localAuthState = localStorage.getItem("authState");
        let parsedObject = JSON.parse(localAuthState as any)
        henceforthApi.languageChange(parsedObject?.lang ? parsedObject?.lang : 'ENGLISH')
        henceforthApi.setToken(parsedObject?.access_token)
        return localAuthState ? parsedObject : {}
    })

    const scrollToTop = () => {
        if (window) {
            window.scrollTo(0, 0);
        }
    }
    const LanguageChange1 = (value: any) => {
        loginSuccess({ lang: value })(authDispatch)
    }
    useEffect(() => {
        henceforthApi.languageChange(authState?.lang)
    }, [authState.lang])

    const logOutNow = () => {
        try {
            logoutSuccess({})(authDispatch);
            // let apiRes = await henceforthApi.Category.categoryDelete(data)
            // toast.success(apiRes.message)
            // initialise()
        } catch (error) {
            handleError(error)
        }
        // logoutSuccess(authInitialStaticData)(staticDataDispatch);
        navigate("/", { replace: true });
    };
    const onChangeBack = () => {
        window.history.back()
    }
    const numericValue = (e: any) => {

        if (!/[0-9]/.test(e)) {
            e.preventDefault();
        }

    }
    const handleSearch = (name: string, value: string) => {
        if (value) {
            if (name === "product_id") newParam.delete("search")
            if (name === "search") newParam.delete("product_id")
            if (name === "order_status") newParam.delete("payment_status")
            if (name === "payment_status") newParam.delete("order_status")
            if (name === 'start_date') newParam.delete('end_date')
            if (name === 'stock') newParam.delete('order_status'); newParam.delete('payment_status')
            if (name === 'order_status') newParam.delete('stock'); newParam.delete('payment_status')
            if (name === 'payment_status') newParam.delete('order_status'); newParam.delete('stock')
            if (name === "product_id") {
                newParam.delete("search")
            }
            if (name === "search") {
                newParam.delete("product_id")
            }
            if (name === "order_status") {
                newParam.delete("payment_status")
            }
            if (name === "payment_status") {
                newParam.delete("order_status")
            }
            if (name === 'start_date') {
                newParam.delete('end_date')
            }
            newParam.set(name, value)
        } else {
            if (newParam.has(name)) {
                newParam.delete(name)
            }
            if (name === 'start_date') {
                newParam.delete('end_date')
            }
        }
        if (location.pathname.startsWith('/orders')) {
            navigate({
                pathname: "/orders/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/order/cancellation/requests')) {
            navigate({
                pathname: "/order/cancellation/requests/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/rating')) {
            navigate({
                pathname: "/rating/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/earning')) {
            navigate({
                pathname: "/earning/1",
                search: newParam.toString()
            })
        } else {
            navigate({
                pathname: "/products/1",
                search: newParam.toString()
            })
        }
    }

    const onChangePagination = (page: number) => {
        if (location.pathname.startsWith('/orders')) {
            navigate({
                pathname: `/orders/${page}`,
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith(`/users`)) {
            navigate({
                pathname: `/users/${page}`,
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith(`/sellers`)) {
            navigate({
                pathname: `/sellers/${page}`,
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith(`/products`)) {
            navigate({
                pathname: `/products/${page}`,
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/coupons')) {
            navigate({
                pathname: `/coupons/${page}`,
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/brands')) {
            navigate({
                pathname: `/brands/${page}`,
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/order/cancellation/requests')) {
            navigate({
                pathname: "/order/cancellation/requests/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/ratings')) {
            navigate({
                pathname: "/ratings/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/earning')) {
            navigate({
                pathname: "/earning/1",
                search: newParam.toString()
            })
        } else {
            navigate({
                pathname: `/products/${page}`,
                search: newParam.toString()
            })
        }
    }
    const onFilterPriceHandler = (min_price: string, max_price: string) => {

        if (min_price && max_price) {
            newParam.set("min_price", min_price)
            newParam.set("max_price", max_price)
        } else {
            if (newParam.has("min_price") && newParam.has("max_price")) {
                newParam.delete("min_price")
                newParam.delete("max_price")
            }
        }
        if (location.pathname.startsWith('/orders')) {
            navigate({
                pathname: "/orders/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/order/cancellation/requests')) {
            navigate({
                pathname: "/order/cancellation/requests/1?order_status=CANCELLED",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/rating')) {
            navigate({
                pathname: "/rating/1",
                search: newParam.toString()
            })
        } else if (location.pathname.startsWith('/earning')) {
            navigate({
                pathname: "/earning/1",
                search: newParam.toString()
            })
        } else {
            navigate({
                pathname: "/products/1",
                search: newParam.toString()
            })
        }
    }

    const initialiseBrand = async () => {
        try {
            let apiRes = await henceforthApi.HomeManagemnt.Brands()
            setbrand(apiRes?.data.data)
        } catch (error) {

        }

    }
    const initialiseCategoryLevel1 = async () => {
        try {
            let apiRes = await henceforthApi.Category.listCategory()
            setCategory(apiRes?.data.data)
        } catch (error) {

        }

    }
    const initialiseCategoryLevel12 = async () => {
        try {
            let apiRes = await henceforthApi.Category.filterSubCategory(categoryId)
            setSubCategory(apiRes?.data.data)

        } catch (error) {

        }
        // finally{
        //     setSubCategory(['']as any)
        // }
    }
    const initialiseCategoryLevel3 = async () => {
        try {
            const apiRes = await henceforthApi.Category.filterSubSubCategory(subCategoryId)
            setSubSubCategory(apiRes?.data.data)
        } catch (error) {
            handleError(error)
        }
    }
    const staffMembers = [
        STAFF_MEMBER, DASHBOARD, USERS, CONTACT, CONTENT, HOME_MANAGEMENT, DB_BACKUP, FAQ, SELLER, PRODUCTS, ORDER, COUPONS, CATEGORY, BRAND, NOTIFICATION

    ]
    const nested = async () => {
        try {
            let apiRes = await henceforthApi.Common.nested()
            setNestedData(apiRes.data.data)
        } catch (error) {
        }
    }
    const BrandData = async () => {
        try {
            let apires = await henceforthApi.HomeManagemnt.Brands()
            setbrand(apires?.data.data)
        } catch {
            console.log("error")
        }
    }

    useEffect(scrollToTop, [location.pathname])
    useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(authState))
    }, [authState]);
    useEffect(() => {
        initialiseBrand()
    }, [])
    useEffect(() => {
        initialiseCategoryLevel1()
    }, [])
    useEffect(() => {
        if (categoryId) {
            initialiseCategoryLevel12()
        } else {
            setSubCategoryId('')
            setSubSubcategoryId('')
            setSubCategory([])
            setSubSubCategory([])
        }
    }, [categoryId])
    useEffect(() => {
        if (subCategoryId) {
            initialiseCategoryLevel3()
        } else {
            setSubSubcategoryId('')
            setSubSubCategory([])
        }
    }, [subCategoryId])
    useEffect(() => {
        nested()
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                loading, setLoading, language, setLanguage,
                brand, category, authState,
                authDispatch, logOutNow, onChangeBack, numericValue,
                staffMembers, categoryId, onChangePagination,
                setCategoryId, subCategory, subCategoryId, setSubCategoryId,
                subSubCategory, subSubCategoryId, setSubSubcategoryId,
                brandID, setbrandID, nestedData, handleSearch, onFilterPriceHandler,
                downloadFile, LanguageChange1
            }}>
            {props.children}
            <ToastContainer autoClose={2000} />
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
function swal(arg0: { title: string; text: string; icon: string; buttons: boolean; dangerMode: boolean; }) {
    throw new Error('Function not implemented.');
}

