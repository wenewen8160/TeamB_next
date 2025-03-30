"use client";
import "../../../styles/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../../styles/auth/member.module.css";
import { useAuth } from "../../../context/auth-context";
import Header from "../../../components/Header";
import moment from 'moment';
import "@/public/TeamB_Icon/style.css";
import OrderTable from "@/app/orderHistory/page";
import orderStyles from '@/app/orderHistory/OrderList.module.css'
// import {AVATAR_PATH} from '@/config/orders-api-path'

const OrderHistory = () => {
  const { auth } = useAuth(); // 獲取會員認證資料
  const [user, setUser] = useState(null); // 儲存用戶資料
 

  useEffect(() => {
    if (auth?.id) {
      setUser(auth); // 設置用戶資料
    }
  }, [auth]);


  if (!user) return <p>載入中...</p>;

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* 側邊欄 */}
        <div className={styles.sidebar}>
          <Link href="/auth/member" className={styles.menuItem}>會員中心</Link>
          <Link href="/auth/member-edit" className={styles.menuItem}>編輯個人檔案</Link>
          <Link href="/auth/member-account" className={styles.menuItem}>帳號管理</Link>
          <Link href="/auth/orderHistory" className={styles.menuItem}>我的訂單</Link>
          <Link href="/auth/member-likes" className={styles.menuItem}>收藏商品</Link>
        </div>

        {/* 右側內容 */}
        <div className={styles.content}>
          <div className={orderStyles.orderName}>訂單歷史記錄</div>
            {/* 根據選中的訂單狀態顯示訂單 */}
            <div className={styles.tabContent}>
              <OrderTable/>
            </div>
          </div>
      </div>
    </>
  );
};

export default OrderHistory;
