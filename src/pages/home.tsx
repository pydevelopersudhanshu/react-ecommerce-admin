import { Console } from 'console';
import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/pages.scss';
import DashboardCard from '../components/dashboard-card';
import Graph from '../components/graph';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from "../context/Provider";
import { ERROR_UNAUTHORIZED, INSUFFICIENT_PERMISSIONS } from '../context/actionTypes';

const Home = () => {
  const location = useLocation();
  const { authState, logOutNow } = useContext(GlobalContext);
  const navigate = useNavigate()
  const newParam = new URLSearchParams(location.search);


  const [state, setstate] = useState({
    total_products: "",
    total_categories: "",
    total_orders: "",
    total_sellers: "",
    total_users: "",
    total_brands: "",
    total_earnings: "",
    total_ratings: ""
  })
  const [salesData, setSalesData] = useState([])
  const [userdata, setUserData] = useState([])
  const [sellerdata, setSellerdata] = useState([])
  const [productdata, setProductdata] = useState([])
  const [type, settype] = useState('')
  const [type1, settype1] = useState('')
  const [type2, settype2] = useState('')
  const [type3, settype3] = useState('')
  const [loading, setLoading] = useState({
    sales: false,
    user: false,
    seller: false,
    product: false,
  })
  const USER_TYPE = "user"
  const SALES_TYPE = "sales"
  const PRODUCT_TYPE = "product"
  const SELLER_TYPE = "seller"
  let sale = newParam.get(SALES_TYPE)
  let user = newParam.get(USER_TYPE)
  let product = newParam.get(PRODUCT_TYPE)
  let seller = newParam.get(SELLER_TYPE)



  const selesdata = async (graph_type: string, type: string) => {
    if (graph_type && type) {
      newParam.set(graph_type, type)
    }
    let types = type === "DAILY" ? 'hour' : type === "WEEKLY" ? 'day' : type === "MONTHLY" ? 'date' : type === "YEARLY" ? 'month' : ''
    if (graph_type == "sales") {
      settype(types)

    } else if (graph_type == "user") {
      settype1(types)
    }
    else if (graph_type == "seller") {
      settype2(types)
    } else if (graph_type == "product") {
      settype3(types)
    }
    setLoading(state => {
      return {
        ...state,
        [graph_type]: true
      }
    })
    try {
      let apires = await henceforthApi.Graph.salesgraph(
        graph_type,
        type
      )
      if (graph_type == "user") {
        setUserData(apires?.data?.data)

      }
      else if (graph_type == "product") {
        setProductdata(apires?.data?.data)
      }
      else if (graph_type == "sales") {
        setSalesData(apires?.data?.data)
      }
      else if (graph_type == "seller") {
        setSellerdata(apires?.data?.data)
      }
      navigate({ search: newParam.toString() })
    } catch (error: any) {
      if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
        window.history.back()
      }
    } finally {
      setLoading(state => {
        return {
          ...state,
          sales: false,
          user: false,
          seller: false,
          product: false,
        }
      })
    }
  }

  const initaliseDashboard = async () => {
    try {
      let Apires = await henceforthApi.Dashboard.getPagnation("YEARLY")
      setstate(Apires.data)
    } catch (error: any) {
      if (error?.response?.body?.error == ERROR_UNAUTHORIZED) {
        logOutNow()
      }
      if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
        window.history.back()
      }
    }
  }
  useEffect(() => {
    initaliseDashboard()
    selesdata(SALES_TYPE, "WEEKLY")
    selesdata(USER_TYPE, "WEEKLY")
    selesdata(PRODUCT_TYPE, "WEEKLY")
    selesdata(SELLER_TYPE, "WEEKLY")
  }, [authState?.lang])



  return (
    <div className='page-spacing'>
      {/****************** Dashboard-Graph  *******************/}
      <section className='dashboard-graph'>
        <div className="container-fluid">
          <div className="row gy-4">
            {/* Sales Graph  */}
            <div className="col-md-12 mb-3 px-xs-0">
              <div className="common-card h-100">
                <div className="common-card-title d-flex flex-column flex-sm-row justify-content-between align-items-center">
                  <h5 className='mb-2 mb-sm-0'>Sales</h5>
                  <div className="btn-group">
                    <button className={`btn btn-white ${sale === 'DAILY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SALES_TYPE, "DAILY")} disabled={loading.sales}>Daily</button>
                    <button className={`btn btn-white ${sale === 'WEEKLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SALES_TYPE, "WEEKLY")} disabled={loading.sales}>Weekly</button>
                    <button className={`btn btn-white ${sale === 'MONTHLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SALES_TYPE, "MONTHLY")} disabled={loading.sales}>Monthly</button>
                    <button className={`btn btn-white ${sale === 'YEARLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SALES_TYPE, "YEARLY")} disabled={loading.sales}>Yearly</button>
                  </div>
                </div>
                <div className="common-card-content">
                  <Graph data={salesData} totalsales="total_orders" totalhours={type} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/****************** Dashboard-Stats  *******************/}
      <section className='dashboard-graph'>
        <div className="container-fluid">
          <div className="row gy-3">
            {/* Customer graph */}
            <div className="col-lg-6 px-xs-0">
              <div className="common-card h-100">
                <div className="common-card-title d-flex  flex-column flex-sm-row flex-lg-column flex-xl-row justify-content-between align-items-center">
                  <h5 className='mb-2 mb-sm-0 mb-lg-2'>Customer</h5>
                  <div className="btn-group">
                    <button className={`btn btn-white ${user === 'DAILY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(USER_TYPE, "DAILY")} disabled={loading.user}>Daily</button>
                    <button className={`btn btn-white ${user === 'WEEKLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(USER_TYPE, "WEEKLY")} disabled={loading.user}>Weekly</button>
                    <button className={`btn btn-white ${user === 'MONTHLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(USER_TYPE, "MONTHLY")} disabled={loading.user}>Monthly</button>
                    <button className={`btn btn-white ${user === 'YEARLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(USER_TYPE, "YEARLY")} disabled={loading.user}>Yearly</button>
                  </div>
                </div>
                <div className="common-card-content">
                  <Graph data={userdata} totalsales="total_users" totalhours={type1} />
                </div>
              </div>
            </div>
            {/* Seller  graph */}
            <div className="col-lg-6 px-xs-0">
              <div className="common-card h-100">
                <div className="common-card-title d-flex flex-column flex-sm-row flex-lg-column flex-xl-row justify-content-between align-items-center">
                  <h5 className='mb-2  mb-sm-0 mb-lg-2'>Seller </h5>
                  <div className="btn-group">
                    <button className={`btn btn-white ${seller === 'DAILY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SELLER_TYPE, "DAILY")} disabled={loading.seller}>Daily</button>
                    <button className={`btn btn-white ${seller === 'WEEKLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SELLER_TYPE, "WEEKLY")} disabled={loading.seller}>Weekly</button>
                    <button className={`btn btn-white ${seller === 'MONTHLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SELLER_TYPE, "MONTHLY")} disabled={loading.seller}>Monthly</button>
                    <button className={`btn btn-white ${seller === 'YEARLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(SELLER_TYPE, "YEARLY")} disabled={loading.seller}>Yearly</button>
                  </div>
                </div>
                <div className="common-card-content">
                  <Graph data={sellerdata} totalsales="total_sellers" totalhours={type2} />
                </div>
              </div>
            </div>
            {/* Product  graph */}
            <div className="col-md-12 px-xs-0">
              <div className="common-card h-100">
                <div className="common-card-title d-flex flex-column flex-sm-row  justify-content-between align-items-center">
                  <h5 className='mb-2 mb-sm-0 mb-lg-2'>Product </h5>
                  <div className="btn-group">
                    <button className={`btn btn-white ${product === 'DAILY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(PRODUCT_TYPE, "DAILY")} disabled={loading.product}>Daily</button>
                    <button className={`btn btn-white ${product === 'WEEKLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(PRODUCT_TYPE, "WEEKLY")} disabled={loading.product}>Weekly</button>
                    <button className={`btn btn-white ${product === 'MONTHLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(PRODUCT_TYPE, "MONTHLY")} disabled={loading.product}>Monthly</button>
                    <button className={`btn btn-white ${product === 'YEARLY' ? 'active-btn' : ''}`} type="button" onClick={() => selesdata(PRODUCT_TYPE, "YEARLY")} disabled={loading.product}>Yearly</button>
                  </div>
                </div>
                <div className="common-card-content">
                  <Graph data={productdata} totalsales="total_products" totalhours={type3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/****************** Dashboard-Stats  *******************/}
      <section className='dashboard-stats mt-3'>
        <div className="container-fluid">
          <div className="row gy-3 justify-content-center">
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >
              <DashboardCard
                loading={loading}
                title="Users"
                count={state.total_users}
                icon="fa fa-users"
                link="/users/1"
              />

            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Seller"
                count={state.total_sellers}
                icon="fa fa-laptop"
                link="/sellers/1"
              />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Category"
                count={state.total_categories}
                icon="fa fa-list-alt"
                link="/category/level-1/1"
              />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Brands"
                count={state.total_brands}
                icon="fa fa-building-o "
                link="/brands/1"
              />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Product"
                count={state.total_products}
                icon="fa fa-laptop"
                link="/products/1"
              />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Orders"
                count={state.total_orders}
                icon="fa fa-shopping-cart"
                link="/orders/1"
              />
            </div>

            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Rating & Reviews"
                count={state.total_ratings}
                icon="fa fa-star"
                link="/rating/1"
              />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 col-xxl-3 custom-dashboard-card px-xs-0" >

              <DashboardCard
                loading={loading}
                title="Earning"
                count={Number(state.total_earnings).toFixed(2)}
                icon="fa fa-dollar"
                link="/earning/1"
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
