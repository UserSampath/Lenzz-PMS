import React, { useState, useEffect } from "react";

import Bar from "./Bar";
import "./Circleprogress.css";
function CircleProgress() {
  const [percentage, setPercentage] = useState("");
  const createDate = async () => {
    const res = await fetch("/api/project/changepersentage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: "2023-02-20",
        endDate: "2023-02-22",
      }),
    });
    const data = await res.json();
    console.log(res);
    if (res.status === 200) {
      setPercentage(data.percentage);
      console.log(data.percentage);
      console.log(percentage);
    }
  };

  useEffect(() => {
    createDate();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="card shadow"
          style={{
            width: " 350px",
            height: " 350px",
            marginLeft: "85px",
            marginTop: "120px",
          }}
        >
          <div className="circle1">
            <label className="pname">ToDo</label>
            <Bar progress={50} />
          </div>
        </div>
        <div
          className="card shadow"
          style={{
            width: " 350px",
            height: " 350px",
            marginLeft: "50px",
            marginTop: "120px",
          }}
        >
          <div className="circle2">
            <label className="pname2">OverallProgress</label>
            <Bar progress={15} />
          </div>
        </div>
        <div
          className="card shadow"
          style={{
            width: " 350px",
            height: " 350px",
            marginLeft: "50px",
            marginTop: "120px",
          }}
        >
          <div className="circle3">
            <label className="pname3">DeadlineRemaing</label>
            <Bar progress={percentage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircleProgress;
