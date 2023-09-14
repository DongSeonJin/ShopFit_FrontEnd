import React from "react";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // 챗봇 아이콘 import
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // 마이페이지

const HomeIcons = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '5% 0'}}>
      <div style={{textAlign: 'center'}}>
        <Link to="/shopping/wishlist">
          <StarIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        </Link>
        <div>
          찜목록
        </div>
      </div>

      <div>
        <Link to="/shopping/cart">
          <ShoppingCartIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        </Link>
        <div style={{textAlign: 'center'}}>
          장바구니
        </div>
      </div>

      <div>
        <Link to="/chatbot">
          <ChatBubbleOutlineIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        </Link>
        <div style={{textAlign: 'center'}}>
          챗봇
        </div>
      </div>

      <div>
        <Link to="/mypage/info">
          <AccountCircleIcon style={{ width: "60px", height: "60px", margin: "0 10px", color: 'white' }} />
        </Link>
        <div style={{textAlign: 'center'}}>
          내정보
        </div>
      </div>
    </div>
  );
};

export default HomeIcons;
