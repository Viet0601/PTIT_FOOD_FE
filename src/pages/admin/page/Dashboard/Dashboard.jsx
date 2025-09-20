
import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Users,
  Star,
  Filter,
  ChevronDown,
} from "lucide-react";
import "./AdminDashboard.scss";

const kpiVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.05, duration: 0.45, ease: "easeOut" },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const mockSales = {
  week: [
    { day: "Mon", revenue: 3.2, orders: 120 },
    { day: "Tue", revenue: 3.8, orders: 134 },
    { day: "Wed", revenue: 4.1, orders: 141 },
    { day: "Thu", revenue: 4.7, orders: 156 },
    { day: "Fri", revenue: 6.2, orders: 201 },
    { day: "Sat", revenue: 7.9, orders: 247 },
    { day: "Sun", revenue: 5.4, orders: 182 },
  ],
  month: Array.from({ length: 30 }).map((_, i) => ({
    day: i + 1,
    revenue: +(3 + Math.sin(i / 2) * 2 + Math.random()).toFixed(2),
    orders: Math.floor(90 + Math.random() * 140),
  })),
};

const mockCategories = [
  { name: "Trà sữa", value: 38 },
  { name: "Ăn vặt", value: 27 },
  { name: "Cà phê", value: 21 },
  { name: "Nước trái cây", value: 14 },
];

const topDishes = [
  { id: "sp1", name: "Khoai tây lắc", sold: 412, rating: 4.7 },
  { id: "sp2", name: "Trà sữa trân châu", sold: 389, rating: 4.8 },
  { id: "sp3", name: "Bánh tráng trộn", sold: 341, rating: 4.6 },
  { id: "sp4", name: "Xoài lắc", sold: 298, rating: 4.5 },
];

export default function AdminDashboard() {
  const [range, setRange] = useState("week");

  const { revenueTotal, ordersTotal, customersTotal, ratingAvg } = useMemo(() => {
    const list = range === "week" ? mockSales.week : mockSales.month;
    const revenue = list.reduce((s, i) => s + i.revenue, 0);
    const orders = list.reduce((s, i) => s + i.orders, 0);
    const customers = Math.round(orders * 0.6);
    const rating = 4.72;
    return {
      revenueTotal: revenue,
      ordersTotal: orders,
      customersTotal: customers,
      ratingAvg: rating,
    };
  }, [range]);

  const lineData = useMemo(() => {
    return (range === "week" ? mockSales.week : mockSales.month).map((d) => ({
      name: d.day,
      DoanhThu: d.revenue,
      Don: d.orders,
    }));
  }, [range]);
const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"];
  return (
    <div className="admindash">
      <header className="admindash__header">
        <div className="admindash__title">
          <ShoppingBag size={22} />
          <h1>Dashboard quán ăn vặt</h1>
        </div>
        <div className="admindash__actions">
          <div className="select">
            <Filter size={18} />
            <select value={range} onChange={(e) => setRange(e.target.value)}>
              <option value="week">7 ngày gần nhất</option>
              <option value="month">30 ngày gần nhất</option>
            </select>
            <ChevronDown size={16} />
          </div>
          <button className="primary">Xuất báo cáo</button>
        </div>
      </header>

      <section className="grid kpis">
        {[{
          icon: <DollarSign />, label: "Doanh thu", value: `${revenueTotal.toFixed(1)} triệu` },
          { icon: <ShoppingBag />, label: "Đơn hàng", value: ordersTotal.toLocaleString() },
          { icon: <Users />, label: "Khách hàng", value: customersTotal.toLocaleString() },
          { icon: <Star />, label: "Đánh giá TB", value: ratingAvg.toFixed(2) }]
          .map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="card kpi"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={kpiVariants}
            >
              <div className="kpi__icon">{kpi.icon}</div>
              <div className="kpi__meta">
                <span className="kpi__label">{kpi.label}</span>
                <span className="kpi__value">{kpi.value}</span>
              </div>
            </motion.div>
          ))}
      </section>

      <motion.section className="grid charts" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="card chart">
          <div className="card__head">
            <h3>Doanh thu & Đơn hàng</h3>
            <span className="muted">Theo {range === "week" ? "ngày" : "ngày trong tháng"}</span>
          </div>
          <div className="chart__body">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData} margin={{ top: 8, right: 12, bottom: 8, left: -8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone"  stroke="#3b82f6" dataKey="DoanhThu" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone"  stroke="#10b981" dataKey="Don" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart">
          <div className="card__head">
            <h3>Tỉ trọng doanh thu theo nhóm</h3>
            <span className="muted">Top nhóm sản phẩm</span>
          </div>
          <div className="chart__body">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={mockCategories} dataKey="value" nameKey="name" outerRadius={100} innerRadius={60}>
                  {mockCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <ul className="legend">
              {mockCategories.map((c, i) => (
                <li key={c.name}><span className="dot" />{c.name} · {c.value}%</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section className="grid list" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="card">
          <div className="card__head">
            <h3>Món bán chạy</h3>
            <span className="muted">Theo 30 ngày</span>
          </div>
          <div className="tablewrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Món</th>
                  <th>Đã bán</th>
                  <th>Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {topDishes.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.sold.toLocaleString()}</td>
                    <td>{d.rating.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3>Hoạt động gần đây</h3>
            <span className="muted">Cập nhật tức thời</span>
          </div>
          <ul className="activity">
            <li><span className="dot"/> Đơn #10234 đã được giao</li>
            <li><span className="dot"/> Khách hàng mới: Minh T.</li>
            <li><span className="dot"/> Đã thêm món mới: Bạch tuộc viên</li>
            <li><span className="dot"/> Hết hàng: Xúc xích hồ lô</li>
          </ul>
        </div>
      </motion.section>

      <footer className="admindash__footer">© {new Date().getFullYear()} Snacky Admin</footer>
    </div>
  );
}


