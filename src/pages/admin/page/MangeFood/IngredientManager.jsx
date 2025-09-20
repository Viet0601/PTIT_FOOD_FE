import { Select } from 'antd';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../../context/StoreContext';


const IngredientManager = ({ingredients, setIngredients , isUpdate=false}) => {
  const {ingredient,getIngredient}= useContext(StoreContext);
 const onChange = (id,field,value) => {
 setIngredients(ingredients.map(ingredient => 
      ingredient.boxId === id 
        ? { ...ingredient, [field]: value }
        : ingredient
    ));
  };
  const onSearch = (value) => {
  };
  
  const addIngredient = () => {
    const newIngredient = {
      boxId:Date.now(),
      id: '',
     amount:''
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ingredient => ingredient.boxId !== id));
    }
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ingredient => 
      ingredient.boxId === id 
        ? { ...ingredient, [field]: value }
        : ingredient
    ));
  };
   const getAllIngredient=()=>{
    let ingredients=[]
    if(ingredient && ingredient.length>0)
    {
        for(let i=0;i<ingredient.length;i++)
        {
            let item={
                value:ingredient[i]?.id,
                label:ingredient[i].name
            }
            ingredients.push(item)
        }
    }
    
    return ingredients;
  }

  return (
    <div className="ingredient-manager">
      <h2 className="title">Quản lý Nguyên liệu</h2>
      
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="ingredient-row">
            <div className="ingredient-number">
              {index + 1}
            </div>
            
            <div className="input-group">
              <label>Tên nguyên liệu</label>
                <Select style={{width:"100%",padding:"0px"}}
                 value={ingredient.id || undefined}  
                disabled={isUpdate}
               getPopupContainer={(triggerNode) => triggerNode.parentNode}
              showSearch
              placeholder="Chọn nguyên liệu"
              
              optionFilterProp="label"
              onChange={(e) => onChange(ingredient.boxId, 'id', e)}
              onSearch={onSearch}
              options={getAllIngredient()}/>
              
            </div>
            
            <div className="input-group">
              <label>Định lượng</label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="text"
                  placeholder={"gram,ml,..."}
                  value={ingredient.amount}
                  onChange={(e) => updateIngredient(ingredient.boxId, 'amount', e.target.value)}
                  className="quantity-input"
                  style={{ flex: 1 }}
                />
                <span style={{ minWidth: "40px", color: "#888", fontSize: "14px" }}>
                  {ingredient.unit || ""}
                </span>
              </div>
            </div>
            
           {!isUpdate &&  <button
              onClick={() => removeIngredient(ingredient.boxId)}
              className="remove-btn"
              disabled={ingredients.length === 1}
              title="Xóa nguyên liệu"
            >
              ✕
            </button>}
          </div>
        ))}
      </div>
      
     {!isUpdate &&  <button onClick={addIngredient} className="add-btn">
        <span className="add-icon">+</span>
        Thêm nguyên liệu
      </button>}
    </div>
  );
};

// SCSS Styles
const scssStyles = `

.ingredient-manager {
    & .ingredient-row {
        & .input-group {
            input {
                width: 100%;
                padding: 5px 10px;
                border: 2px solid #e1e8ed;
                border-radius: 8px !important;
                font-size: 15px;
                transition: all 0.2s ease;
                background: white;
            }
        }
    }
}
.ingredient-manager {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  margin: 20px auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .title {
    color: #2c3e50;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    text-align: center;
  }

  .ingredients-list {
    margin-bottom: 20px;
  }

  .ingredient-row {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 16px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
    animation: slideIn 0.3s ease-out;

    &:hover {
      background: #f1f3f4;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .ingredient-number {
      background: #3498db;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .input-group {
      flex: 1;
      display: flex;
      flex-direction: column;

      label {
        font-size: 13px;
        color: #5a6c7d;
        margin-bottom: 6px;
        font-weight: 500;
      }

      input {
        
        border: 2px solid #e1e8ed;
        border-radius: 8px;
        font-size: 15px;
        transition: all 0.2s ease;
        background: white;

        &:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          transform: translateY(-1px);
        }

        &::placeholder {
          color: #a0a9b8;
        }
      }
    }

    .remove-btn {
      background: #e74c3c;
      color: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
      font-weight: bold;
      flex-shrink: 0;

      &:hover:not(:disabled) {
        background: #c0392b;
        transform: scale(1.05);
      }

      &:disabled {
        background: #bdc3c7;
        cursor: not-allowed;
        transform: none;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
  
  .add-btn {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);

    .add-icon {
      font-size: 18px;
      font-weight: bold;
    }

    &:hover {
      background: linear-gradient(135deg, #27ae60, #229954);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin: 10px;

    .ingredient-row {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;

      .ingredient-number {
        align-self: flex-start;
      }

      .input-group {
        margin: 0;
      }

      .remove-btn {
        align-self: flex-end;
        width: 40px;
        height: 40px;
      }
    }
  }
}
`;

// Inject SCSS styles
const styleElement = document.createElement('style');
styleElement.textContent = scssStyles;
document.head.appendChild(styleElement);

export default IngredientManager;