// import React from "react";
// import "./style.css";
// import CheckBox from "./Checkbox";
// const filters = [
//   { name: "Digital", id: 1 },
//   { name: "Painting", id: 2 },
// ];
// const Item = ({
//   imageSrc,
//   altText,
//   captionContent,
//   price,
//   rating,
//   onBuyClick,
//   onFavouriteClick,
//   title,
// }) => {
//   return (
//     <div className="page-container">
//       <div className="left-div">
//         <div className="title">{title}</div>
//         <div className="image-caption">{captionContent}</div>
//         <div className="others"></div>
//         <div>Price: </div>
//         <div className="price">{price}</div>
//       </div>
//       <div className="center-content">
//         <div className="image-container">
//           <img src={imageSrc} alt={altText} />
//           <div className="col">
//             <button onClick={onBuyClick}>Buy</button>
//             <button onClick={onFavouriteClick}>Favourite</button>
//           </div>
//         </div>
//       </div>
//       <div className="right-div">
//         <div>
//           {filters.map((filter) => (
//             <CheckBox key={filter.id} id={filter.id} name={filter.name} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Item;

import React, { useState } from "react";
import "./style.css";
import CheckBox from "./Checkbox";

const filters = [
  { name: "Digital", id: 1 },
  { name: "Painting", id: 2 },
];

const Item = ({
  imageSrc,
  altText,
  captionContent,
  price,
  rating,
  onBuyClick,
  onFavouriteClick,
  title,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterSelect = (filterName) => {
    if (!selectedFilters.includes(filterName)) {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

  const handleFilterRemove = (filterName) => {
    const updatedFilters = selectedFilters.filter(
      (filter) => filter !== filterName
    );
    setSelectedFilters(updatedFilters);
  };

  return (
    <div className="page-container">
      <div className="left-div">
        <div className="title">{title}</div>
        <div className="image-caption">{captionContent}</div>
        <div className="others"></div>
        <div>Price: </div>
        <div className="price">{price}</div>
      </div>
      <div className="center-content">
        <div className="image-container">
          <img src={imageSrc} alt={altText} />
          <div className="col">
            <button onClick={onBuyClick}>Buy</button>
            <button onClick={onFavouriteClick}>Favourite</button>
          </div>
        </div>
      </div>
      <div className="right-div">
        <div>
          {filters.map((filter) => (
            <div key={filter.id}>
              <CheckBox
                id={filter.id}
                name={filter.name}
                onChange={() => handleFilterSelect(filter.name)}
              />
              {selectedFilters.includes(filter.name) && (
                <div>
                  <input type="text" value={filter.name} readOnly />
                  <button onClick={() => handleFilterRemove(filter.name)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Item;
