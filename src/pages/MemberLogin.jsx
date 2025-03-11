import React, { useEffect,  useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;


function MemberLogin() {

const [account, setAccount] = useState({
    email: "",
    password:"",
});

const navigate = useNavigate();

const handleInputChange = (e) => {
  const { value, name } = e.target;

  setAccount({
    ...account,
    [name]: value,
  });
};

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${baseUrl}/login`, account);
    console.log(res.data);
    // 將使用者資訊存到 localStorage
    localStorage.setItem('user', JSON.stringify(res.data.user));
    // 重新導向到首頁
    navigate('/');
  } catch (error) {
    alert("登入失敗");
    console.error(error);
    
  }
}

useEffect(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  axios.defaults.headers.common["Authorization"] = token;
}, []);

  return (
    <>
      <div className="section-ml-1 mt-13">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-ml-left mt-lg-13 mb-lg-8 me-lg-10">
                <h2 className="text-primary-1 eng-font mb-lg-8 mt-12 mt-lg-0">
                  Log in to sip&search
                </h2>
                <hr className="text-primary-1" />
                <h6 className="text-primary-1 mt-8 mb-lg-12 mb-10">
                  已有帳號，使用註冊信箱登入
                </h6>

                <form onSubmit={handleLogin} className="text-primary-1 mb-lg-12">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fs-lg-6"
                    >
                      信箱
                    </label>
                    <input
                      type="email"
                      className="form-control text-primary-1"
                      id="exampleInputEmail1"
                      name="email"
                      aria-describedby="emailHelp"
                      value={account.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label fs-lg-6 mt-lg-8"
                    >
                      密碼
                    </label>
                    <input
                      type="password"
                      className="form-control text-primary-1 mb-10"
                      id="exampleInputPassword1"
                      name="password"
                      value={account.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-index-primary1 px-lg-8 me-6"
                  >
                    登入
                  </button>
                  <a className="text-primary-1 fs-lg-9 align-bottom" href="#">
                    忘記您的密碼？
                  </a>
                </form>
              </div>
            </div>
            <div className="col-lg-5 mt-12 mt-lg-0">
              <div className="section-ml-right mt-lg-13 mb-lg-8 ms-lg-10">
                <h4 className="text-primary-1 mb-lg-10">新用戶</h4>
                <hr className="text-primary-1" />
                <h6 className="text-primary-1 mt-8 mb-3">免費註冊您的帳號</h6>
                <p className="text-primary-1 fs-9 mb-lg-13 mb-12">
                  更快速掌握網站的各種功能消息！
                </p>
                <Link
                  className="btn btn-index-primary1 px-lg-8 mb-13 mb-lg-0"
                  to="/membersignup"
                >
                  創立一個新帳號
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberLogin;
