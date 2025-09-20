// File: src/components/ContactPage.jsx
import React from 'react';
import './ContactPage.scss';
import ptitLogo from "../../assets/assets/frontend_assets/ptitfood.webp"
import ptitLogo1 from "../../assets/assets/frontend_assets/ptit1.webp"
import ptitLogo2 from "../../assets/assets/frontend_assets/ptit2.webp"
import ptitLogo3 from "../../assets/assets/frontend_assets/ptit3.webp"
import ptitLogo4 from "../../assets/assets/frontend_assets/ptit4.webp"
const ContactPage = () => {
  return (
    <main className="contact-page container">
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-info">
              <h1 className="title">Quán Ăn Phố - Giao tận nơi</h1>
              <p className="subtitle">Hương vị gia truyền, phục vụ nhanh — tận tâm từng món.</p>

              <div className="contact-cards">
                <div className="card">
                  <h4>Địa chỉ</h4>
                  <p>Đ. Nguyễn Trãi, P. Mộ Lao, Hà Đông, Hà Nội</p>
                </div>
                <div className="card">
                  <h4>Điện thoại</h4>
                  <p>+84 342707510</p>
                </div>
                <div className="card">
                  <h4>Mở cửa</h4>
                  <p>08:00 — 22:00 (Tất cả các ngày)</p>
                </div>
              </div>

              <div className="actions">
                <a className="btn primary" href="tel:+84123456789">Gọi ngay</a>
                <a className="btn ghost" href="#map">Xem bản đồ</a>
              </div>
            </div>

            <div className="hero-image" aria-hidden>
              {/* replace with real images or a gallery component */}
              <div className="photo" style={{backgroundImage: `url(${ptitLogo})`}} />
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Về chúng tôi</h2>
              <p>
                Quán Ăn Phố là nơi giữ gìn hương vị truyền thống, kết hợp với nguyên liệu tươi
                ngon và phong cách phục vụ thân thiện. Chúng tôi chuyên các món ăn đường phố,
                cơm trưa văn phòng, và set gia đình.
              </p>
              <ul>
                <li>Nguyên liệu tươi — chế biến sạch</li>
                <li>Giao hàng nhanh trong khu vực</li>
                <li>Đặt tiệc &amp; phục vụ nhóm</li>
              </ul>
            </div>

            <div className="about-gallery">
              <div className="gallery-grid">
                <div className="thumb" style={{backgroundImage: `url(${ptitLogo1})`}} />
                <div className="thumb" style={{backgroundImage: `url(${ptitLogo2})`}} />
                <div className="thumb" style={{backgroundImage: `url(${ptitLogo3})`}} />
                <div className="thumb" style={{backgroundImage: `url(${ptitLogo4})`}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="map" className="map-section">
        <div className="container">
          <h3>Bản đồ</h3>
          <div className="map-wrap">
            {/* If you prefer, replace the iframe with an embedded map component */}
            <iframe
              title="Quán Ăn Phố - Bản đồ"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.7731668779847!2d105.78484157507951!3d20.980912980656417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad66e39eb1e5%3A0x76dd5e4d9a678a4e!2sP%20Coffee!5e1!3m2!1svi!2s!4v1756626494355!5m2!1svi!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
