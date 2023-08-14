import React, {useState} from "react";

import HeaderMain from "../components/HeaderMain";
import HeaderSubComm from "../components/HeaderSubComm";
import HeaderSubShop from "../components/HeaderSubShop";
import Contents from "../components/Contents";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";

const Home = () => {
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <div className={styles.Home}>
      <HeaderMain isCommunityHovered={setIsCommunityHovered} isShoppingHovered={setIsShoppingHovered} />
      {isCommunityHovered && <HeaderSubComm />}
      {isShoppingHovered && <HeaderSubShop />}
      <Contents />
      <Footer />
    </div>
  );
};

export default Home;
