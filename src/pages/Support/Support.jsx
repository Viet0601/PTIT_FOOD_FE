import React, { useContext } from "react";
import "./Support.scss";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, HelpCircle, ShieldCheck, Send } from "lucide-react";
import { sendFeedbackResponse } from "../../service/apiService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const faqs = [
  { q: "Làm thế nào để theo dõi đơn hàng?", a: "Bạn có thể vào mục Đơn hàng trong tài khoản để xem trạng thái và chi tiết vận chuyển theo thời gian thực." },
  { q: "Tôi muốn đổi/trả món ăn?", a: "Vui lòng liên hệ trong vòng 30 phút kể từ khi nhận hàng. Chúng tôi sẽ hỗ trợ đổi trả trong các trường hợp phù hợp chính sách." },
  { q: "Các phương thức thanh toán hỗ trợ?", a: "Hỗ trợ thanh toán tiền mặt khi nhận hàng, ví điện tử và thẻ nội địa/ quốc tế." },
  { q: "Phí giao hàng được tính như thế nào?", a: "Phí giao hàng dựa trên khoảng cách và chương trình ưu đãi tại thời điểm đặt hàng." },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Support = () => {
  const {loading,setLoading}= useContext(StoreContext);
  const [openIdx, setOpenIdx] = React.useState(0);
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Vui lòng nhập họ và tên";
    if (!form.email.trim()) next.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email không hợp lệ";
    if (!form.message.trim()) next.message = "Vui lòng nhập nội dung";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit =async (e) => {
    if(loading ) return ;
    e.preventDefault();
    if (!validate()) return;
    // Submit: log to console as requested
      
    // You can replace this with API call later
    setLoading(true)
    const response = await sendFeedbackResponse({ name: form.name, email: form.email, subject: form.subject, message: form.message });
    if(response && response.ec===201)
    {
      
      toast.success(response.em);
      setForm({ name: "", email: "", subject: "", message: "" });

    }
    else 
    {
      toast.error(response.em)
    }
    setLoading(false)
    
  };

  return (
    <div className="support-page container">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-text">
          <h1>Hỗ trợ khách hàng</h1>
          <p>Chúng tôi luôn sẵn sàng giúp bạn 24/7. Tìm câu trả lời nhanh hoặc liên hệ đội ngũ hỗ trợ.</p>
          <div className="actions">
            <a className="btn primary" href="#contact">
              <Send size={18} /> Gửi yêu cầu
            </a>
            <a className="btn ghost" href="#faq">
              <HelpCircle size={18} /> Câu hỏi thường gặp
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden>
          <motion.div
            className="blob"
            initial={{ scale: 0.9, opacity: 0.85 }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="blob b2"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 0.92, 1], opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </motion.section>

      <motion.section className="quick-help" variants={container} initial="hidden" animate="show">
        <motion.div className="card" variants={item}>
          <Phone size={22} />
          <h3>Gọi hỗ trợ</h3>
          <p>Hotline: 1900 1234 (08:00 - 22:00)</p>
        </motion.div>
        <motion.div className="card" variants={item}>
          <Mail size={22} />
          <h3>Email</h3>
          <p>support@ptit-food.vn</p>
        </motion.div>
        <motion.div className="card" variants={item}>
          <MessageSquare size={22} />
          <h3>Chat nhanh</h3>
          <p>Phản hồi tức thì từ trợ lý của chúng tôi</p>
        </motion.div>
        <motion.div className="card" variants={item}>
          <ShieldCheck size={22} />
          <h3>Chính sách</h3>
          <p>Bảo vệ quyền lợi khách hàng tối đa</p>
        </motion.div>
      </motion.section>

      <section id="faq" className="faq">
        <h2>Câu hỏi thường gặp</h2>
        <div className="faq-list">
          {faqs.map((f, idx) => (
            <motion.details
              key={idx}
              open={openIdx === idx}
              onToggle={(e) => e.currentTarget.open && setOpenIdx(idx)}
              initial={false}
              animate={{}}>
              <summary>{f.q}</summary>
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{f.a}</motion.p>
            </motion.details>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Gửi phản hồi</h2>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="field">
              <label>Họ và tên</label>
              <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Nguyễn Văn A" required aria-invalid={Boolean(errors.name)} />
              {errors.name && <small style={{color:'#e11d48'}}>{errors.name}</small>}
            </div>
            <div className="field">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="email@domain.com" required aria-invalid={Boolean(errors.email)} />
              {errors.email && <small style={{color:'#e11d48'}}>{errors.email}</small>}
            </div>
          </div>
          <div className="field">
            <label>Chủ đề</label>
            <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Ví dụ: Vấn đề đơn hàng #1234" />
          </div>
          <div className="field">
            <label>Nội dung</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Mô tả chi tiết vấn đề của bạn..." required aria-invalid={Boolean(errors.message)} />
            {errors.message && <small style={{color:'#e11d48'}}>{errors.message}</small>}
          </div>
          <button className="btn primary mt-2" type="submit"><Send size={18} /> Gửi </button>
        </form>
      </section>
    </div>
  );
};

export default Support;


