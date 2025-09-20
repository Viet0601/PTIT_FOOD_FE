import React from "react";
import "./NotFound.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LINK } from "../../utils/constant";

const NotFound = () => {
  return (
    <div className="notfound container">
      <motion.div
        className="art"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="code"
          initial={{ scale: 0.95 }}
          animate={{ scale: [0.95, 1, 0.98, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          404
        </motion.h1>
        <p>Ôi! Trang bạn tìm không tồn tại hoặc đã bị di chuyển.</p>
        <div className="actions">
          <Link className="btn primary" to={LINK.HOME}>Về trang chủ</Link>
          <Link className="btn ghost" to={LINK.FOOD_COLLECTION}>Xem menu</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;


