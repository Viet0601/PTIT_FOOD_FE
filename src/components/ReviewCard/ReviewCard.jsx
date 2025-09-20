import React from "react";
import "./ReviewCard.scss";
import { Star } from "lucide-react";
import moment from "moment";

export default function ReviewCard({ review }) {
  const { name, star, feedback, createdAt } = review ?? {};
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user">
          <div className="avatar">{name.charAt(0).toUpperCase()}</div>
          <div>
            <h4 className="username">{name}</h4>
            <p className="date">{createdAt ? moment(createdAt).format("dddd/DD/MM/YYYY") : "22222222222222222"}</p>
          </div>
        </div>
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < star ? "star filled" : "star"}
            />
          ))}
        </div>
      </div>
      <div className="review-body">
        <p>{feedback}</p>
      </div>
    </div>
  );
}
