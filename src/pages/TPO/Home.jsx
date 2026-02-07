import React, { useEffect } from "react";
import NoticeBox from "../../components/NoticeBox";
import NotificationBox from "../../components/NotificationBox";

function Home() {
  useEffect(() => {
    document.title = "CPMS | TPO Dashboard";
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <NotificationBox />
        <NoticeBox />
      </div>
    </div>
  );
}

export default Home;