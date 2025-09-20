// Footer.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Footer.scss";

import { assets } from '../../assets/assets/frontend_assets/assets'
import { LINK } from "../../utils/constant";
import { Link } from "react-router-dom";

export default function Footer({
  logoSrc,
  storeName = "PTIT FOOD",
  phone = "+84 123 456 789",
  email = "store@example.com",
  address = "Đ. Nguyễn Trãi, P. Mộ Lao, Hà Đông, Hà Nội",
  contactLinks = [
    { label: "Liên hệ", href: "/contact" },
    { label: "Hỗ trợ", href: "/support" },
    { label: "Chính sách", href: LINK.CUSTOMER_POLICY },
  ],
}) {
  
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="brand">
          {assets.logo ? (
            <img src={assets.logo}  alt={`${storeName} logo`} className="logo" />
          ) : (
            <div className="logo placeholder" aria-hidden>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="90" height="90" rx="18" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle">S</text>
              </svg>
            </div>
          )}

          <div className="brand-text">
            <h3 className="store-name">{storeName}</h3>
            <p className="tagline">Chất lượng — Uy tín — Nhiệt tình</p>
          </div>
        </div>

        <div className="contacts">
          <h4>Thông tin liên hệ</h4>
          <ul>
            <li>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} aria-label={`Gọi ${phone}`}>
                <span className="label">Điện thoại:</span>
                <span className="value">{phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} aria-label={`Email ${email}`}>
                <span className="label">Email:</span>
                <span className="value">{email}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Bản đồ ${address}`}
              >
                <span className="label">Địa chỉ:</span>
                <span className="value">{address}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="links">
          <h4>Liên kết nhanh</h4>
          <nav aria-label="Footer links">
            <ul>
              {contactLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="socials" aria-hidden>
            <a href="#" className="social" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8.1v-2.9h2.4V9.1c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .07 2 .07v2.3h-1.2c-1.2 0-1.6.76-1.6 1.6v1.9h2.8l-.45 2.9H14.2v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="#" className="social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.3A4.7 4.7 0 1016.7 13 4.7 4.7 0 0012 8.3zm6.5-2.8a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} {storeName}. Bảo lưu mọi quyền.</small>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  logoSrc: PropTypes.string,
  storeName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  contactLinks: PropTypes.array,
};

