"use client";
import { useEffect, useState } from "react";
import Styles from "@/styles/city-area/city-area.module.css";
import { COURT_LIST } from "@/config/court-api-path";

export default function CourtList({
  selectedCity,
  selectedArea,
  selectedSport,
  onSelectCourt,
  selectedCourtId,
}) {
  const [courtList, setCourtList] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch(COURT_LIST);
        const obj = await r.json();
        if (obj.success) {
          setCourtList(obj.rows);
          // console.log("✅ CourtList 資料載入成功，共：", obj.rows.length, "筆");
        }
      } catch (error) {
        console.warn("❌ 載入場地失敗：", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("📦 所有原始場地資料：", courtList);
  // }, [courtList]);

  useEffect(() => {
    // console.log("🔍 篩選條件：", {
    //   selectedCity,
    //   selectedArea,
    //   selectedSport,
    // });

    if (
      Number(selectedCity) &&
      Number(selectedArea) &&
      Number(selectedSport)
    ) {
      const filtered = courtList.filter(
        (court) =>
          Number(court.city_id) === Number(selectedCity) &&
          Number(court.area_id) === Number(selectedArea) &&
          Number(court.sport_type_id) === Number(selectedSport)
      );

      const uniqueCourts = Array.from(
        new Map(filtered.map((court) => [court.court_id, court])).values()
      );

      // console.log("✅ 篩選後場地筆數：", uniqueCourts.length);
      setFilteredCourts(uniqueCourts);
    } else {
      // console.log("⛔ 條件不完整，清空場地清單");
      setFilteredCourts([]);
    }
  }, [selectedCity, selectedArea, selectedSport, courtList]);

  return (
    <div>
      {filteredCourts.length > 0 ? (
        <select
          className={Styles.borderWidth}
          value={selectedCourtId || ""}
          onChange={(e) => {
            const courtId = Number(e.target.value);
            if (!isNaN(courtId)) {
              // console.log("🎯 選擇了場地 ID：", courtId);
              onSelectCourt && onSelectCourt(courtId);
            }
          }}
        >
          <option value="">請選擇運動場地</option>
          {filteredCourts.map((court) => (
            <option key={court.court_id} value={court.court_id}>
              {court.court_name}（{court.sport_name}）
            </option>
          ))}
        </select>
      ) : (
        <p className={Styles.borderWidth}>請選擇縣市、區域與球類以顯示可用運動場地。</p>
      )}
    </div>
  );
}