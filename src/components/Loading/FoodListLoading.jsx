// FoodListLoading.tsx
// React component (TypeScript) — skeleton loader for a food list
// Usage: import FoodListLoading from './FoodListLoading';
// <FoodListLoading count={8} />

import React from 'react';
import './FoodListLoading.scss';

export default function FoodListLoading({ count = 6 }) {
  const items = new Array(count).fill(null);

  return (
    <div className='loading-food-list-component'>

      <div className="food-loading" aria-busy="true" aria-label="Đang tải danh sách món ăn">
      <div className="food-loading__grid">
        {items.map((_, i) => (
          <article className="card-skel" key={i}>
            <div className="card-skel__img" />
            <div className="card-skel__body">
              <div className="line title" />
              <div className="line subtitle" />
              <div className="meta">
                <div className="pill" />
                <div className="pill small" />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="food-loading__caption">Đang tải... Xin đợi một chút</div>
    </div>
    </div>
    
  );
}
