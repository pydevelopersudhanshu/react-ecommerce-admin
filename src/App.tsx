// configured via editor.maxTokenizationLineLength.
import { Fragment, useContext } from 'react';
import './App.css'
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home'
import Signin from './pages/auth/signin'
import TermsActivity from './element/TermsActivity';
import TheLayout from './layouts/TheLayout';
import ChangePassword from './pages/auth/change-password';
import EditProfile from './pages/auth/edit-profile';

import { GlobalContext } from './context/Provider';
import Profile from './pages/auth/profile';

import StaffListing from './pages/staff/staff-listing';
import ViewStaff from './pages/staff/view-staff';
import AddStaff from './pages/staff/add-staff';
import EditStaff from './pages/staff/edit-staff';
import UserListing from './pages/user/UserListing';
import UserDetails from './pages/user/UserDetails';
import SellerListing from './pages/seller/SellerListing';
import SellerDetails from './pages/seller/SellerDetails';
import EditProduct from './pages/seller/edit-product';
import ViewProduct from './pages/seller/view-product';
import ViewProductDetail from './pages/product/product-detail';
import CouponListing from './pages/coupon/coupon-listing';
import AddCoupon from './pages/coupon/add-coupon';
import EditCoupon from './pages/coupon/edit-coupon';
import BannerSection from './pages/home-page-management/banner-1/banner-section';
import ViewBanner from './pages/home-page-management/banner-1/view-banner';
import EditBanner from './pages/home-page-management/banner-1/edit-banner';
import AddBanner from './pages/home-page-management/banner-1/Add-banner';
import DealOfDay from './pages/home-page-management/deal-of-the-day/deal-of-day';
import EditDealOfDay from './pages/home-page-management/deal-of-the-day/edit-deal-of-day';
import TopDeal from './pages/home-page-management/top-deal/top-deal';
import EditTopDeal from './pages/home-page-management/top-deal/edit-top-deal';
import FashionDeal from './pages/home-page-management/fashion-deal/fashion-deal';
import EditFashionDeal from './pages/home-page-management/fashion-deal/edit-fashion-deal';
import FeaturedCategories from './pages/home-page-management/featured-categories/featured-categories';
import EditFeaturedCategories from './pages/home-page-management/featured-categories/edit-featured-categories';
import ShopWithUs from './pages/home-page-management/shop-with-us/shop-with-us';
import EditShopWithUs from './pages/home-page-management/shop-with-us/edit-shop-with-us';
import Database from './pages/database/database';
import ContactUs from './pages/contact-us/contact-us';
import Notifications from './pages/notifications/notifications';
import FAQ from './pages/faq/faq';
import EditFAQ from './pages/faq/edit-faq';
import AddFAQ from './pages/faq/add-faq';
import Content from './pages/content/content';
import EditContent from './pages/content/edit-content';
import ViewContent from './pages/content/view-content';
import ProductListing from './pages/product/product-listing';
import OrderListing from './pages/order/OrderListing';
import ViewOrderDetail from './pages/order/OrderDetails';
import SellerInvoice from './pages/order/seller-invoice';
import AddCategoryLeve1 from './pages/Category/level1/AddCategoryLevel1';
import AddCategoryLevel2 from './pages/Category/level2/AddCategoryLevel2';
import AddDeals from './pages/home-page-management/deal-of-the-day/Add-deals';
import Addtop from './pages/home-page-management/top-deal/Add-top-deal';
import AddCategoryLevel3 from './pages/Category/level3/AddCategoryLevel3';
import CategoryLevel2Listing from './pages/Category/level2/CategoryLevel2Listing';
import CategoryLevel3Listing from './pages/Category/level3/CategoryLevel3Listing';
import CategoryLevel1Listing from './pages/Category/level1/CategoryLevel1Listing';
import Addfashion from './pages/home-page-management/fashion-deal/Add-fashion';
import Addfeaturedcategory from './pages/home-page-management/featured-categories/Add-categories';
import Addshop from './pages/home-page-management/shop-with-us/Add-shop-us';
import BestOfEcommerce from './pages/home-page-management/best-of-commerce/best-of-Ecommerce';
import EditBestOfEcommerce from './pages/home-page-management/best-of-commerce/edit-best-of-Ecommerce';
import Addcommerce from './pages/home-page-management/best-of-commerce/Add-Ecommerce';
import BrandsListing from './pages/Brands/Brands-listing';
import AddBrands from './pages/Brands/Add-Brands';
import CategoryEdit from './pages/Category/level1/Category-edit';
import EditBrands from './pages/Brands/EditBrands';
import AddStyleFor from './pages/home-page-management/styles/AddStyleFor';
import EditStyleFor from './pages/home-page-management/styles/EditStyleFor';
import StyleForList from './pages/home-page-management/styles/StyleForList';
import AllTransaction from './pages/transaction/transaction';
import Reating from './pages/Rating&Review/Rating';
import SubCategoryEdit from './pages/Category/level2/SubCategory-edit';
import SubSubCategoryEdit from './pages/Category/level3/SubSubCategory';
import EarningPage from './pages/Earning/EarningPage';
import CouponPromotional from './pages/coupon/coupon-promotional';
import PrintInvoice from './pages/order/seller-invoice';
import EditCommission from './pages/auth/edit-commission';
import AddCommission from './pages/auth/add-commission';
import NotificationOrderList from './pages/notifications/notification-order-list';
import Setting from './pages/setting/Setting';
import SettingPage from './pages/setting/Setting';
import TermsCondition from './pages/Terms&Condition/TermsCondition';
import ModuleList from './pages/language/ModuleList'
import LanguageList from './pages/language/LanguageList'

function App() {
  const { authState } = useContext(GlobalContext);

  return (
    <>
      <Routes>
        {authState.access_token ?
          <Fragment>
            <Route path="*" element={<TheLayout />}>
              <Route index element={<Home />} />
              {/***************** Profile ****************/}
              <Route path='profile' element={<Profile />} />
              <Route path='change-password' element={<ChangePassword />} />
              <Route path='edit-profile' element={<EditProfile />} />
              <Route path='edit-commission/:fee' element={<EditCommission />} />
              {/* <Route path='add-commission' element={<AddCommission />} /> */}

              <Route path="terms" element={<TermsActivity />} />
              {/***************** Transactions ****************/}
              <Route path="transactions" element={<AllTransaction />} />
              {/***************** Staff ****************/}
              <Route path="staff/add" element={<AddStaff />} />
              <Route path="staffs/:page" element={<StaffListing />} />
              <Route path="staff/:_id/edit" element={<EditStaff />} />
              <Route path="staff/:_id" element={<ViewStaff />} />
              {/***************** User ****************/}

              <Route path="users/:page" element={<UserListing />} />
              <Route path="user/:id" element={<UserDetails />} />
              {/***************** Category Section ****************/}
              <Route path="category/level-1/:page" element={<CategoryLevel1Listing />} />
              <Route path="category/level-1/add" element={<AddCategoryLeve1 />} />
              <Route path="category/level-1/edit/:name/:type/:_id" element={<CategoryEdit />} />


              <Route path="category/level-2/:page" element={<CategoryLevel2Listing />} />
              <Route path="category/level-2/add" element={<AddCategoryLevel2 />} />
              <Route path="category/level-2/edit/:name/:_id" element={<SubCategoryEdit />} />

              <Route path="category/level-3/:page" element={<CategoryLevel3Listing />} />
              <Route path="category/level-3/add" element={<AddCategoryLevel3 />} />
              <Route path="category/level-3/edit/:name/:_id" element={<SubSubCategoryEdit />} />

              {/***************** Seller Section ****************/}
              <Route path="sellers/:page" element={<SellerListing />} />
              <Route path="seller/:id" element={<SellerDetails />} />
              <Route path={`seller/:_id/edit-product`} element={<EditProduct />} />
              <Route path={`seller/view-product/:_id`} element={<ViewProduct />} />
              {/***************** Product ****************/}
              <Route path="products/:page" element={<ProductListing />} />
              <Route path="product/:id" element={<ViewProductDetail />} />
              {/***************** Invoices ****************/}
              {/***************** Order ****************/}
              <Route path="orders/:page" element={<OrderListing />} />
              <Route path="ordersdetails/:id" element={<ViewOrderDetail />} />
              {/***************** Coupon Section ****************/}
              <Route path="coupons/add" element={<AddCoupon />} />
              <Route path="coupons/:_id/edit" element={<EditCoupon />} />
              <Route path="coupons/:page" element={<CouponListing />} />
              <Route path="coupons/promotional" element={<CouponPromotional />} />

              {/***************** Banner Section ****************/}
              <Route path="management/banner/:type/:page" element={<BannerSection />} />
              <Route path="management/banner/:type/add" element={<AddBanner />} />

              <Route path="management/banner/:type/:_id/view" element={<ViewBanner />} />
              <Route path="management/banner1/:type/:_id/edit" element={<EditBanner />} />
        
              {/***************** Deal Of day ****************/}
              <Route path="management/deals/add" element={<AddDeals />} />
              <Route path="management/deals/:page" element={<DealOfDay />} />
              <Route path="management/deals/:_id/edit" element={<EditDealOfDay />} />
              {/***************** Top Deal ****************/}
              <Route path="management/top-deal/:page" element={<TopDeal />} />
              <Route path="management/top-deal/add" element={<Addtop />} />
              <Route path="management/edit-top/:_id" element={<EditTopDeal />} />
              {/***************** Fashion Deal ****************/}
              <Route path="management/fashion-deal/:page" element={<FashionDeal />} />
              <Route path="management/fashion-deal/add" element={<Addfashion />} />
              <Route path="management/fashion/:_id/edit" element={<EditFashionDeal />} />
              {/***************** Featured Categories ****************/}
              <Route path="management/featured-categories/:page" element={<FeaturedCategories />} />
              <Route path="management/featured-categories/add" element={<Addfeaturedcategory />} />
              <Route path="management/featured/:_id/edit" element={<EditFeaturedCategories />} />
              {/***************** Shop With Us ****************/}
              <Route path="management/shop-with-us/:page" element={<ShopWithUs />} />
              <Route path="management/shop-with-us/add" element={<Addshop />} />
              <Route path="management/shop/:_id/edit" element={<EditShopWithUs />} />
              {/***************** Best Of Electroniscs ****************/}
              <Route path="management/best-of-ecommerce/:page" element={<BestOfEcommerce />} />
              <Route path="management/best-of-ecommerce/add" element={<Addcommerce />} />
              <Route path="management/ecommerce/:_id/edit" element={<EditBestOfEcommerce />} />
              {/***************** Styles for Men ****************/}
              <Route path="management/style-for/:name/:_id/:page" element={<StyleForList />} />
              <Route path="management/style-for/:name/:_id/add" element={<AddStyleFor />} />

              <Route path="management/style-for/:name/:style_id/:_id/edit" element={<EditStyleFor />} />

              {/***************** Brands ****************/}
              <Route path="brands/:page" element={<BrandsListing />} />
              <Route path="brands/add" element={<AddBrands />} />
              <Route path="brands/:id/edit" element={<EditBrands />} />

              {/***************** Database ****************/}
              <Route path="database" element={<Database />} />
              {/***************** Contact Us ****************/}
              <Route path="contact-us/:page" element={<ContactUs />} />
              {/***************** Rating & Review ****************/}
              <Route path="rating/:page" element={<Reating />} />

              {/***************** Earning ****************/}
              <Route path="earning/:page" element={<EarningPage />} />


              {/***************** Notifications ****************/}
              <Route path="notifications" element={<Notifications />} />
              <Route path="order/:id" element={<NotificationOrderList />} />

              {/***************** FAQ ****************/}
              <Route path="faq" element={<FAQ />} />
              <Route path={`edit-faq/:id`} element={<EditFAQ />} />
              <Route path="add-faq" element={<AddFAQ />} />
              {/***************** Content ****************/}
              <Route path="content" element={<Content />} />
              <Route path="edit-content/:type" element={<EditContent />} />
              <Route path="view-content/:id" element={<ViewContent />} />
              {/***************** Terms&Condition ****************/}
              <Route path="terms-conditions" element={<TermsCondition/>} />

              {/* setting */}
              <Route path="setting" element={<SettingPage />} />
              <Route path="main-key/:type" element={<ModuleList />} />
              <Route path="language/:page/:type/:id" element={<LanguageList />} />
            </Route>

            {/* <Route path={'invoice/:object_id/:id/:type'} element={<SellerInvoice />} />
            <Route path="invoice/:object_id/:id/:type" element={<SellerInvoice />} /> */}

            <Route path="invoice/:object_id/:id/:type" element={<PrintInvoice />} />
          </Fragment>
          :

          <Route path="*" element={<Signin />} />
        }
      </Routes>
    </>
  )
}

export default App


