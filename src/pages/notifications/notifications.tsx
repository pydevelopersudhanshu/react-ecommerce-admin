import '../../assets/styles/pages.scss'
import { Link } from 'react-router-dom'
import { ChipButton } from '../../components/text-editor'
import React, { useState, useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import henceforthApi from '../../utils/henceforthApi';
import { GlobalContext } from '../../context/Provider';
import Spinner from '../../components/BootstrapCompo';
import BreadCrumb from '../../components/common/BreadCrumb';
interface notificaton {
  type: string,
  send_to: string,
  user_ids: number[],
  list_user: { _id: number, name: string }[],
  find_user: { _id: string, email: string }[],
  selectedUser: { [key: string]: any },
}
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
const ALL_USERS = "ALL_USERS";
const SELECTED_USERS = "SELECTED_USERS";
const EMAIL = "EMAIL";
const PUSH = "PUSH";
const Notifications = () => {


  let breadCrumbPath = [
    { name: 'Home', url: `/`, active: '' },
    { name: 'Notifications', url: ``, active: 'not-allowed' }
  ]

  const { authState } = React.useContext(GlobalContext)

  const [description, setDesciption] = useState<string>("");
  // const [comment, setComment] = useState<string>("");
  const [emailBtn, setEmailBtn] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [showUl, setShowUl] = useState(false)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    type: EMAIL,
    send_to: ALL_USERS,
    user_ids: [],
    list_user: [],
    find_user: [],
    selectedUser: new Map(),
  } as notificaton);
  let searchDrop: any = useRef(null)
  let val: any = useRef(null)



  const radioHandler = (send_to: string) => {
    setState({
      ...state,
      send_to,
    });
  };
  const radioHandlerType = (type: string) => {
    setState({
      ...state,
      type,
    });
    setDesciption("")
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (state.send_to === SELECTED_USERS) {

      if (!state.list_user.length) {
        return toast.warn("please enter email")
      }
    }
    if (!subject) {
      return toast.warn("Please enter subject");
    }
    if (!description) {
      return toast.warn("please enter description")
    }
    const items = {
      type: state.type == EMAIL ? 1 : 2,
      send_to: state?.send_to == ALL_USERS ? 1 : 2,
      user_ids: state?.user_ids,
      subject: subject,
      message: description,
      language: "ENGLISH",
    };
    try {
      setLoading(true)
      let apiRes = await henceforthApi.Administrator.sendNotifications(items)
      toast.success(apiRes.data)
      setDesciption("");
      setSubject("");
      setState({
        ...state,
        user_ids: state?.user_ids,
        list_user: [],
      });

    } catch (error) {

    } finally {
      setLoading(false)
    }

  }
  const handleFIlter = async (value: string) => {
    setInputValue(value);
    try {
      let apiRes = await henceforthApi.User.notificationUser(value);
      setState({
        ...state,
        find_user: apiRes.data,
        // find_user: apiRes.data,

      });
      setShowUl(true)
    } catch (error: any) {
      setState({
        ...state,
        find_user: [],
      });
    }

  };
  const handleClickOutside = (e: any) => {
    if (searchDrop.current && !searchDrop.current.contains(e.target)) {
      setShowUl(false)
      setInputValue("")
    }
  }
  const onClickChip = (_id: string, name: string) => {
    const { selectedUser } = state;
    if (selectedUser.has(_id)) {
      selectedUser.delete(_id);
    } else {
      selectedUser.set(_id, name);
    }
    let rowDataId = [] as Array<number>;
    let rowData = [] as Array<{ _id: number, name: string }>;
    selectedUser.forEach((res: string, key: number) => {
      rowDataId.push(key);
      rowData.push({ _id: key, name: res });
    });
    setState({
      ...state,
      list_user: rowData,
      selectedUser,
      user_ids: rowDataId,
      find_user: [],
    });
    setInputValue("");
  };
  const onEditorStateChange = (e: string) => {
    setDesciption(e);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authState?.lang]);
  return (
    <>
      {/* breadcrum  */}

      <BreadCrumb pathNameDeclare={breadCrumbPath} />
      {/* page  */}
      <div className='page-spacing'>
        <section className='product-listing'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 px-xs-0">
                <div className="common-card">
                  <div className="common-card-title">
                    <h5>Notifications</h5>
                  </div>
                  <div className="common-card-content">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4 form-radio-box">
                        <label className="mb-2 d-block">Select users by Email</label>
                        <div className="d-flex align-items-sm-center flex-column flex-sm-row gap-2">
                          <div onClick={(e) => radioHandler(ALL_USERS)}
                            className="radio-btn-notif d-flex align-items-sm-center me-3">
                            <input type="radio" name="user" className="me-2 form-check-input shadow-none" checked={state?.send_to === ALL_USERS} />
                            <label htmlFor="all" className='text-nowrap'>All Users</label>
                          </div>
                          <div onClick={(e) => radioHandler(SELECTED_USERS)} className=" radio-btn-notif d-flex align-items-center">
                            <input type="radio" name="user" className="me-2 form-check-input shadow-none" checked={state?.send_to === SELECTED_USERS} />
                            <label htmlFor="selected">Only Selected Users</label>
                          </div>
                        </div>
                        {state?.send_to === SELECTED_USERS ? (
                          <>
                            <div className="form-fields-box my-3" ref={searchDrop} >
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Select user by email"
                                ref={val}
                                value={inputValue}
                                onChange={(e) => handleFIlter(e.target.value)}
                              />
                              <ul className="list-group user-email-list" >
                                {showUl && state.find_user.map((res) => {
                                  return (
                                    <li
                                      className="list-group-item"
                                      onClick={() =>
                                        onClickChip(res._id, `${res.email}`)
                                      }
                                    >

                                      {res.email ? res.email : "Anonymous Users"}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            {state?.list_user?.length ? (
                              <>
                                <div className="form-group">
                                  <label className="mb-2">Selected User</label>
                                  <div className=" d-flex ">
                                    {state?.list_user.map((res) => {
                                      return (
                                        <ChipButton
                                          key={res._id}
                                          {...res}
                                          onClick={onClickChip}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label className="mb-2">Subject</label>
                        <div className='form-fields-box mb-3'  >
                          <input
                            name="subject"
                            type="text"
                            className="form-control"
                            value={subject}

                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </div>

                      </div>
                      <div className="mb-4">
                        <label className="mb-2 d-block">Select users by type</label>
                        <div className="d-flex align-items-center">
                          <div
                            onClick={(e) => { radioHandlerType(EMAIL); setEmailBtn(false) }}
                            className="radio-btn-notif theme d-flex align-items-center me-3 "
                          >
                            <input
                              type="radio"
                              name="type"
                              className="me-2 form-check-input shadow-none"
                              checked={state.type === EMAIL}
                            />
                            <label htmlFor="all">Email</label>
                          </div>
                          <div
                            onClick={(e) => { radioHandlerType(PUSH); setEmailBtn(true) }}
                            className=" radio-btn-notif d-flex align-items-center"
                          >
                            <input
                              type="radio"
                              name="type"
                              className="me-2 form-check-input shadow-none"
                              checked={state.type === PUSH}
                            />
                            <label htmlFor="selected">Push</label>
                          </div>
                        </div>
                      </div>

                      {emailBtn ? <div className="form-floating">
                        <textarea className="form-control" value={description} onChange={(e: any) => onEditorStateChange(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea" ></textarea>
                        <label >Write your content</label>
                      </div> :
                        (<div
                          style={{
                            background: "white",
                          }}
                        >
                          <ReactQuill
                            theme="snow"
                            onChange={onEditorStateChange}
                            placeholder={`Write your content`}
                            value={description}
                          />
                        </div>)

                      }
                      <div className="form-group mt-4">
                        <button
                          type="submit"
                          className="btn btn-theme px-5"
                          disabled={loading}
                        >{loading ? <Spinner /> : 'Send Notification'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <DownloadFileModal /> */}
    </>
  )
}
export default Notifications;