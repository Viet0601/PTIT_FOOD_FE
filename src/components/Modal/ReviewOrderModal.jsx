// File: ReviewOrderModal.jsx
import React, { useEffect, useState, useRef, useContext } from "react";
import "./ReviewOrderModal.scss";
import { toast } from "react-toastify";
import { sendFeedBackService } from "../../service/apiService";
import { StoreContext } from "../../context/StoreContext";

function Star({ filled, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <button
      type="button"
      className={`rom-star ${filled ? "filled" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={filled ? "star filled" : "star"}
    >
      ★
    </button>
  );
}

export default function ReviewOrderModal({
  orderId,
  isOpen,
  onClose,
  items = [], // [{ id, name, image?, note? }]
  onSubmit, // async function(results) => void
}) {
  const {getMyOrder, refetchOrderPagenate,setLoading}=useContext(StoreContext)
  const [local, setLocal] = useState({});
  const [hoverStar, setHoverStar] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // initialize local states for items
      const init = {};
      items.forEach((it) => {
        init[it.id] = { rating: 0, comment: "" };
      });
      setLocal(init);
      setHoverStar({});
      // lock scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, items]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function updateItem(id, patch) {
    setLocal((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = items.map((it) => ({ foodId: it.id, ...local[it.id] }));
      //   await (onSubmit ? onSubmit(payload) : Promise.resolve());
      const invalid = payload.some(
        (r) => r.rating === 0 || r.comment.trim() === ""
      );

      if (invalid) {
        toast.error(
          "Vui lòng đánh giá đầy đủ số sao và lời nhận xét cho tất cả món ăn!"
        );
        setSubmitting(false);
        return;
      }

      // Nếu hợp lệ thì submit
      const data = {
        id: orderId,
        feedback: payload,
      };
      setLoading(true)
      const response = await sendFeedBackService(data);
      if(response && response.ec===201)
      {
        toast.success(response?.em);
        onClose()
         setSubmitting(false);
         refetchOrderPagenate(); 
      }
      else 
      {
        toast.error(response?.em);
      }
      setLoading(false);
     
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      // keep modal open so user can retry
    }
  }

  return (
    <div
      className="rom-backdrop"
      onMouseDown={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="rom-modal"
        onMouseDown={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <header className="rom-header">
          <h3>Đánh giá món đã mua</h3>
          <button className="rom-close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </header>

        <form className="rom-body" onSubmit={handleSubmit}>
          <p className="rom-intro">
            Chọn món để viết đánh giá, cho sao và nhập lời nhận xét cho từng
            món.
          </p>

          <ul className="rom-items">
            {items.map((item) => {
              const state = local[item.id] || { rating: 0, comment: "" };
              return (
                <li key={item.id} className="rom-item">
                  <div className="rom-item-left">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rom-thumb"
                      />
                    ) : (
                      <div className="rom-thumb rom-thumb--placeholder">
                        {item.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="rom-item-main">
                    <div className="rom-item-title">{item.name}</div>

                    <div
                      className="rom-rating"
                      onMouseLeave={() =>
                        setHoverStar((h) => ({ ...h, [item.id]: 0 }))
                      }
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          filled={(hoverStar[item.id] || state.rating) >= n}
                          onMouseEnter={() =>
                            setHoverStar((h) => ({ ...h, [item.id]: n }))
                          }
                          onMouseLeave={() =>
                            setHoverStar((h) => ({ ...h, [item.id]: 0 }))
                          }
                          onClick={() => updateItem(item.id, { rating: n })}
                        />
                      ))}
                      <span className="rom-rating-num">
                        {state.rating ? `${state.rating}.0` : "Chưa"}
                      </span>
                    </div>

                    <textarea
                      placeholder={"Viết đánh giá cho " + item.name}
                      value={state.comment}
                      onChange={(e) =>
                        updateItem(item.id, { comment: e.target.value })
                      }
                      className="rom-textarea"
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <footer className="rom-footer">
            <button
              type="button"
              className="rom-btn rom-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rom-btn rom-submit"
              disabled={submitting}
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
