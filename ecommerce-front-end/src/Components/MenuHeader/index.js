import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions/category.action";
import "./style.css";

export default function MenuHeader() {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCategory());
  // });

  //This function is show the categories inside the frontend navbar and navigate to the relavant category after click that relavant category.
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category__ of categories) {
      myCategories.push(
        <li key={category__.name}>
            {
                category__.parentId ? <a 
                href={`/${category__.slug}?cid=${category__._id}&type=${category__.type}`}>
                {category__.name}
                </a> :
                <span>{category__.name}</span>
            }
          {category__.children.length > 0 ? (
            <ul>{renderCategories(category__.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
  <div className="MenuHeader">
      <ul>
          { category.categories.length > 0 ? renderCategories(category.categories):null}
      </ul>
  </div>
  );
}
