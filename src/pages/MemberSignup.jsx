import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useNavigate, useLocation } from "react-router-dom";


const baseUrl = import.meta.env.VITE_API_URL;

function MemberSignup() {
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const modalRef = useRef(null);
  const [emailInput, setEmailInput] = useState("");  
  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    nickname: '',
    email: '',
    password: ''
  });


   //每次跳轉都在頁面上方
    useEffect(() => {
      window.scrollTo(0, 0); // 轉跳到這個頁面時，視窗回到頂部
    }, []);
  


  useEffect(() => {
    // 從 URL 參數中獲取 email 並設置到表單
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmailInput(emailParam);
    }
  }, [location]);


  const Signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/signup`, {
        email : emailInput,
        password,
        nickname,
      });
      console.log(res.data);
      const modal = new Modal(modalRef.current);
      modal.show();

       // 設置定時器，在跳轉前移除 modal 相關元素
    setTimeout(() => {
      // 移除 modal backdrop
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }

      // 移除 body 上的 modal 相關 class 和樣式
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // 跳轉到首頁
      navigate("/");
    }, 3000);
  } catch (error) {
    console.error(error);
    alert(error.response?.data || '註冊失敗');
  }
  };

  //密碼驗證
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value.length === 0) {
      setErrors(prev => ({...prev, password: '請輸入密碼'}));
    } else if (value.length < 6) {
      setErrors(prev => ({...prev, password: '密碼長度至少需要 6 個字元'}));
    } else if (!/^[A-Za-z0-9]*$/.test(value)) {
      setErrors(prev => ({...prev, password: '密碼只能包含英文字母和數字'}));
    } else {
      setErrors(prev => ({...prev, password: ''}));
    }
  };

  return (
    <>
      <div className="section-ms-1 mt-13">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-ms-left mt-lg-13 mb-lg-8 me-lg-10">
                <h2 className="text-primary-1 eng-font mb-lg-8 mt-12 mt-lg-0">
                  Sign up to sip&search
                </h2>
                <hr className="text-primary-1" />
                <h6 className="text-primary-1 mt-8">免費註冊您的帳號</h6>
                <p className="text-primary-1 fs-9 mb-lg-12 mb-10 mt-3 mt-lg-0">
                  更快速掌握網站的各種功能消息！
                </p>

                <form className="text-primary-1 mb-lg-12" onSubmit={Signup}>
                  <div className="mb-3">
                    <label htmlFor="nickname" className="form-label fs-lg-6">
                      綽號
                    </label>
                    <input
                      type="text"
                      className="form-control text-primary-1"
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fs-lg-6 mt-lg-8"
                    >
                      信箱
                    </label>
                    <input
                      type="email"
                      className="form-control text-primary-1"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="inputPassword5"
                      className="form-label fs-lg-6 mt-lg-8"
                    >
                      密碼
                    </label>
                    <input
                      type="password"
                      id="inputPassword5"
                      className={`form-control text-primary-1 ${
                        password && (errors.password ? 'is-invalid' : 'is-valid')
                      }`}
                      aria-describedby="passwordHelpBlock"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    {errors.password ? (
                      <div className="invalid-feedback">
                        {errors.password}
                      </div>
                    ) : (
                      <div className="valid-feedback">
                        密碼格式正確
                      </div>
                    )}
                    {/* <div id="passwordHelpBlock" className="form-text text-primary-1">
                      Your password must be 8-20 characters long, contain
                      letters and numbers, and must not contain spaces, special
                      characters, or emoji.
                    </div> */}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-index-primary1 px-lg-8 mb-13 mb-lg-0 mt-6"
                  >
                    創立一個新帳號
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body modal-border-primary-1">
              <div className="decoration">
                <div className="wrap-1"></div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <h4 className="text-primary-1 mb-lg-8 mt-lg-13">會員註冊成功</h4>
                <span className="material-symbols-outlined ml-check text-primary-1 ">task_alt</span>
                <div className="d-flex mt-lg-8 mb-lg-13">
                  <p className="fs-8 text-primary-1 ">正在跳轉至首頁 5...</p>
                  <span className="material-symbols-outlined text-primary-1 ">progress_activity</span>
                </div>
              </div>
              <div className="decoration">
                <div className="wrap-2 ms-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberSignup;
