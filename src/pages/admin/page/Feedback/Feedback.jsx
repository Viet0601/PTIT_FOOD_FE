import React, { useContext } from "react";
import "./Feedback.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../../../queryKey/queryKey";
import { getAllResponseFeedbackService } from "../../../../service/apiService";
import { StoreContext } from "../../../../context/StoreContext";
import { Pagination } from "antd";



const Feedback = () => {
  const [query, setQuery] = React.useState("");
  const {limit,setLoading}= useContext(StoreContext);
  const [page,setPage]=React.useState(1);
  const handleChangePage=(e)=>{
    setPage(e);
  }
  const {data:items,isPending,isError,error,refetch:refetchItems}=useQuery({
    queryKey:queryKey.fetchAllResponseFeedback(page),
    queryFn:async()=>{
       setLoading(true);
        const response= await getAllResponseFeedbackService(page,limit);
        if(response && response.ec===200)
        {
           setLoading(false);
            return response.dt; 
        }
         setLoading(false);
        return [];
    }
  })
  React.useEffect(() => {
    const handler = () => setItems(loadFromStorage());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items &&  items.list || [];
    const q = query.toLowerCase();
    return items &&   items.list.filter((f) =>
      f.name.toLowerCase().includes(q) ||
      f.email.toLowerCase().includes(q) ||
      f.subject.toLowerCase().includes(q) ||
      f.message.toLowerCase().includes(q)
    );
  }, [items && items.list, query]);

  return (
    <div className="admin-feedback container">
      <div className="af-header">
        <div className="af-title">
          <h2>Phản hồi khách hàng</h2>
          <span className="af-count">{items && items.total} phản hồi</span>
        </div>
        <input
          className="af-search"
          placeholder="Tìm theo tên, email, chủ đề..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="af-empty">
          <div className="af-empty-art">💬</div>
          <h4>Không có phản hồi phù hợp</h4>
          <p>Thử thay đổi từ khóa tìm kiếm.</p>
        </div>
      ) : (
        <div style={{minHeight:"400px"}}>
        <AnimatePresence mode="popLayout">
          <motion.ul
           
            className="af-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((f) => (
              <motion.li
                key={f.id}
                className="af-item"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                layout
              >
                <div className="af-head">
                  <div className="af-user">
                    <div className="af-avatar">{f.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="af-name">{f.name}</div>
                      <div className="af-email">{f.email}</div>
                    </div>
                  </div>
                  <div className="af-subject">{f.subject}</div>
                </div>
                <p className="af-message">{f.message}</p>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
        </div>
      )}
      {filtered && filtered.length>0 && <Pagination onChange={(e)=>handleChangePage(e)} className="mt-4" align="center" current={page} total={!isNaN(items && items.totalPage) ? items &&  items.totalPage*10 : "1"} />}
    </div>
  );
};

export default Feedback;


