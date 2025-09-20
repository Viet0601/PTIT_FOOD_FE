import React from "react";
import "./CustomerPolicy.scss";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const CustomerPolicy = () => {
  return (
    <div className="policy container">
      <motion.div
        className="policy-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Chính sách khách hàng</h1>
        <p>Cam kết mang đến trải nghiệm đặt món an toàn, nhanh chóng và minh bạch.</p>
      </motion.div>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>1. Phạm vi dịch vụ</h2>
        <p>
          Chúng tôi cung cấp nền tảng đặt đồ ăn trực tuyến, kết nối người dùng với các nhà hàng đối tác.
          Dịch vụ bao gồm tìm kiếm món ăn, đặt hàng, thanh toán và theo dõi đơn hàng.
        </p>
      </motion.section>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <h2>2. Tài khoản và bảo mật</h2>
        <ul>
          <li>Người dùng chịu trách nhiệm bảo mật thông tin đăng nhập.</li>
          <li>Thông tin cá nhân được bảo vệ theo chính sách quyền riêng tư của chúng tôi.</li>
          <li>Phát hiện truy cập trái phép, vui lòng liên hệ hỗ trợ ngay.</li>
        </ul>
      </motion.section>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2>3. Đặt hàng và thanh toán</h2>
        <ul>
          <li>Giá hiển thị đã bao gồm thuế và phụ phí (nếu có).</li>
          <li>Hỗ trợ nhiều phương thức thanh toán: tiền mặt, thẻ, ví điện tử.</li>
          <li>Đơn hàng có thể bị từ chối nếu vi phạm điều khoản sử dụng.</li>
        </ul>
      </motion.section>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2>4. Giao hàng</h2>
        <ul>
          <li>Thời gian giao hàng phụ thuộc vào khoảng cách, nhà hàng và lưu lượng.</li>
          <li>Vui lòng cung cấp địa chỉ chính xác để tránh chậm trễ.</li>
          <li>Trong trường hợp bất khả kháng, chúng tôi sẽ thông báo kịp thời.</li>
        </ul>
      </motion.section>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>5. Đổi trả và hoàn tiền</h2>
        <ul>
          <li>Hỗ trợ đổi trả khi đơn sai món, thiếu món, hoặc chất lượng không đạt.</li>
          <li>Yêu cầu hỗ trợ phải gửi trong vòng 2 giờ từ khi nhận hàng.</li>
          <li>Hoàn tiền theo quy trình của cổng thanh toán và ngân hàng.</li>
        </ul>
      </motion.section>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h2>6. Quyền riêng tư</h2>
        <p>
          Chúng tôi chỉ thu thập thông tin cần thiết để cung cấp dịch vụ tốt nhất. Dữ liệu được mã hoá và lưu trữ an toàn.
        </p>
      </motion.section>

      <motion.section
        className="policy-section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2>7. Liên hệ hỗ trợ</h2>
        <p>
          Tổng đài 24/7: 1900-xxxx | Email: support@ptit-food.vn
        </p>
      </motion.section>
    </div>
  );
};

export default CustomerPolicy;


