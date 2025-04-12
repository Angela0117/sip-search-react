import { React } from "react";

export default function Activity() {
  return (
    <div className="activity">
      <Title />
      <Filter />
      <Results />
      <PopularEvents />
    </div>
  );
}

function Title() {
  return (
    <div className="container">
      <section className="section-title">
        <h2 className="fs-md-4 text-primary-1">活動新知</h2>
      </section>
    </div>
  );
}

function Filter() {
  return (
    <div className="container-fluid">
      <section className="section-filter ">
        <div className="container">
          <h3 className="fs-md-5 text-primary-4 mb-6 text-center">
            尋找城市角落的精彩酒吧活動
          </h3>

          <div className="filter-field">
            <FilterItem title="地點" content="搜尋你的所在地" />
            <FilterItem title="地點與主題" content="選擇適合你的活動" />
            <FilterItem title="活動日期" content="選擇日期與時間" />
            <button className="btn btn-primary-3 fs-md-7">
              搜尋
              <span className="fs-md-7 material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
function FilterItem({ title, content }) {
  return (
    <div className="filter-item">
      <h4 className="fs-md-7">{title}</h4>
      <p className="fs-md-7 text-neutral-3">{content}</p>
    </div>
  );
}

function Results() {
  return (
    <div className="container">
      <section className="section-results">
        <div className="txt text-primary-1 d-flex align-items-center">
          <h3 className="fs-md-5 text-primary-1">篩選結果</h3>
          <span className="ms-6">共19筆</span>
        </div>

        <div className="resultsItems">
          <ResultsItem />
          <ResultsItem />
          <ResultsItem />
        </div>

        <div className="pages">
          <span className="active ">1</span>
          <span>2</span>
          <span>3</span>
          <span>{">"}</span>
        </div>
      </section>
    </div>
  );
}
function ResultsItem() {
  return (
    <div className="result-item">
      <div>
        <h4 className="fs-md-7 mb-3">四月餐酒館</h4>
        <span className="activity-date fs-md-9">2/1~2/14</span>
      </div>
      <div className="tags d-flex  gap-4">
        <span className="tag">台南市</span>
        <span className="tag">情人節</span>
      </div>
    </div>
  );
}

function PopularEvents() {
  return (
    <div className="container">
      <section className="section-popular-events">
        <div className="main-title">
          <h3 className="eng-font fs-md-5 mb-4">Popular Events</h3>
          <h3 className="fs-md-5">熱門活動</h3>
        </div>

        <div className="main-content">
          <PopularEventsItem />
          <PopularEventsItem />
          <PopularEventsItem />
        </div>
      </section>
    </div>
  );
}
function PopularEventsItem() {
  return (
    <div className="popular-event-item">
      <div className="pic">
        <img src="https://images.unsplash.com/photo-1618659525444-49206d11d0b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
      </div>
      <div className="txt">
        <span className="activity-date">7/1-8/31</span>
        <h4 className="fs-md-5 ">LEFT左派</h4>
        <div className="tags">
          <span className="tag">台中市</span>
          <span className="tag">奧運賽事播放</span>
          <span className="tag">最多人搜尋</span>
        </div>
      </div>
    </div>
  );
}
