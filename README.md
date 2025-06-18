# 團隊專題 - Sip&Search 微醺指南

## 專案簡介
一個提供使用者搜尋各式酒譜與全台酒吧資訊的互動式網站。支援酒類分類與地點篩選，並具備會員登入、留言評論、個人檔案與收藏清單等功能，讓使用者更輕鬆規劃每一次微醺時光。
此專案為前端團隊實作作品，以 React 為核心技術，模擬開發一套具備完整搜尋、互動與會員管理功能的酒類資訊平台。除資料檢索外，亦支援使用者留言與收藏，並導入 RWD 響應式設計，提供良好的桌機與手機使用體驗。
  
## 核心功能

- 🔎 **酒譜與酒吧搜尋功能**：支援依「酒類類別」與「地點」進行篩選  
- 👤 **使用者註冊／登入**：可登入查看個人檔案與管理收藏內容  
- 💬 **評論系統**：可針對酒譜與酒吧發表留言、查閱其他使用者評價  
- 📱 **RWD 響應式設計**：支援桌機與手機瀏覽介面，搭配 Swiper 套件優化行動體驗

## 🛠 使用技術

### 前端技術
- React
- JavaScript (ES6+)
- SCSS、Bootstrap
- Swiper（行動裝置切換效果）

### 開發與工具
- Vite（專案建構工具）
- Axios（API 串接）
- JSON Server（模擬後端 API）
- Git & GitHub（版本控制）
- Render（雲端部署）
- Miro（流程與畫面規劃）

---

## 🌐 專案連結

- 🔗 [網站 Demo 頁面](https://angela0117.github.io/sip-search-react/)
- 💻 [GitHub Repo](https://github.com/Angela0117/sip-search-react)


## 指令列表
- `npm install` - 初次下載該範例專案後，需要使用 npm install 來安裝套件
- `npm run dev` - 執行開發模式
  - 若沒有自動開啟瀏覽器，可嘗試手動在瀏覽器上輸入
    `http://localhost:5173/<專案名稱>/pages/index.html`
- `npm run build` - 執行編譯模式（不會開啟瀏覽器）
- `npm ru deploy` - 自動化部署

## 資料夾結構
  - assets # 靜態資源放置處
    - images # 圖片放置處
    - scss # SCSS 的樣式放置處

  - layout # ejs 模板放置處
  - pages # 頁面放置處

- JavaScript 程式碼可寫在 main.js 檔案

### 注意事項
- 已將 pages 資料夾內的 index.html 預設為首頁，建議不要任意修改 index.html 的檔案名稱
- .gitignore 檔案是用來忽略掉不該上傳到 GitHub 的檔案（例如 node_modules），請不要移除 .gitignore

## 開發模式的監聽
vite 專案執行開發模式 `npm run dev` 後即會自動監聽，不需要使用 `Live Sass Compiler` 的 `Watch SCSS` 功能


## 部署 gh-pages 流程說明
### Windows 版本
1. 在 GitHub 建立一個新的 Repository

2. 部署前請務必先將原始碼上傳到 GitHub Repository 也就是初始化 GitHub，因此通常第一步驟會在專案終端機輸入以下指令
```cmd
git init # 若已經初始化過就可以不用輸入
git add .
git commit -m 'first commit'
git branch -M main
git remote add origin [GitHub Repositories Url]
git push -u origin main // 僅限第一次輸入，往後只需要輸入 git push
```

3. 初始化完畢後，執行 `npm run deploy` 指令進行自動化部署
