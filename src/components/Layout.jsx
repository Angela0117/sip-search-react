import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import images from "../images";
import { useUser } from "../contexts/UserContext";

function Layout() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg border-neutral-3 border-bottom">
          <div className="container">
            <h1>
              <NavLink className="navbar-brand ms-lg-9 ms-4" to="/">
                sip&search
              </NavLink>
            </h1>
            <button
              className="navbar-toggler me-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
                <li className="nav-item nav-custom-border">
                  <NavLink
                    to="/recipessearch"
                    className={({ isActive }) =>
                      `nav-link text-primary-1 fs-lg-8 px-lg-7 py-lg-0 navItem ${isActive ? "active" : ""
                      }`
                    }
                  >
                    找酒譜
                  </NavLink>
                </li>
                <li className="nav-item b nav-custom-border">
                  <NavLink
                    className="nav-link text-primary-1 fs-lg-8 px-lg-7 py-lg-0 navItem"
                    to="/barfinder"
                  >
                    找酒吧
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-primary-1 fs-lg-8 px-lg-7 py-lg-0 navItem"
                    to="/barsearch"
                  >
                    最新活動
                  </NavLink>
                </li>
              </ul>
              <div className="log-custom-border">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn  dropdown-toggle btn-no-bg text-primary-1 mx-lg-5 mx-2 fs-8 fs-md-6 fs-lg-8"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.nickname}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item  text-primary-1 " to={`/users/${user.id}`}>
                          會員中心
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-primary-1 "
                          onClick={handleLogout}
                        >
                          登出
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    className="px-lg-5 py-lg-6 text-primary-1 d-block navItem fs-8 ps-5"
                    to="/memberlogin"
                  >
                    註冊/登入
                    <i className="bi bi-search text-primary-1"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="section-f bg-neutral-3 mt-lg-14">
          <div className="container">
            <h3 className="text-white text-center mb-0 py-lg-5 py-2 fs-lg-5 fs-9">
              未滿18歲禁止飲酒
              <img
                className="ban"
                src={images["image-banned"]}
                alt="image-banned"
              />
              禁止酒駕
            </h3>
          </div>
        </div>
        <div className="section-f1 bg-neutral-4 border-neutral-3 border-bottom">
          <div className="container py-lg-11 py-3">
            <div className="row">
              <Link className="d-flex justify-content-center" to="#">
                <img className="pic1" src={images["image"]} alt="pic1" />
              </Link>
            </div>
          </div>
        </div>
        <div className="section-f2 bg-neutral-4 border-neutral-3 border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12 pb-lg-15 pb-8 pt-lg-15 ps-lg-12 border-line">
                <div className="mb-lg-11 d-md-none d-none d-lg-block">
                  <h5 className="text-primary-1 eng-font">
                    加入 Sip & Search 會員
                  </h5>
                  <h5 className="text-primary-1">解鎖每月專屬微醺體驗</h5>
                </div>
                <div className="d-lg-none mt-8 mb-3 mb-md-0 d-flex flex-column align-items-center">
                  <p className="text-primary-1 fs-7">加入會員</p>
                  <p className="text-primary-1 fs-7">解鎖每月專屬微醺體驗</p>
                </div>
                <div>
                  <form
                    className="d-flex align-items-center flex-lg-row flex-column"
                    action="index.html"
                  >
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control text-primary-1 input1 rounded-0"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label
                        className="text-primary-1 align-top"
                        htmlFor="floatingInput"
                      >
                        <span className="material-symbols-outlined align-top">
                          {" "}
                          mail{" "}
                        </span>
                        請輸入您的Email
                      </label>
                    </div>

                    <input
                      className="btn-rs-primary-4 border-0 rounded-0 ms-lg-9 py-lg-3 py-2 px-lg-9 px-3 mt-4 mt-lg-0 fs-lg-6 fs-8"
                      type="submit"
                      value="加入會員"
                    />
                  </form>
                </div>
              </div>

              <div className="col-lg-4 col-12 mt-lg-15 mb-lg-9 mb-5 ps-lg-11 mt-5">
                <div className="d-flex flex-column content1">
                  <Link className="navItem" to="/about">
                    <h5 className="text-primary-1 mb-lg-9 fs-8 fs-md-7">
                      關於我們
                    </h5>
                  </Link>
                  <Link className="navItem" to="#">
                    <h5 className="text-primary-1 mb-lg-9 fs-8 fs-md-7">
                      聯絡/追蹤我們
                    </h5>
                  </Link>
                </div>
                <div className="d-flex content2">
                  <Link className="navItem" to="#">
                    <img
                      className="pic-icon"
                      src={images["image-fb-light"]}
                      alt="fb"
                    />
                  </Link>
                  <Link className="navItem" to="#">
                    <img
                      className="pic-icon mx-lg-9 mx-3"
                      src={images["image-ig-light"]}
                      alt="ig"
                    />
                  </Link>
                  <Link className="navItem" to="#">
                    <img
                      className="pic-icon"
                      src={images["image-mail-light"]}
                      alt="mail"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-f3 bg-neutral-4 py-lg-11 py-5">
          <div className="container">
            <div className="col">
              <p className="fs-lg-7 fs-10 text-primary-1 text-center eng-font">
                Copyright @ Sip & Search 微醺指南
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
