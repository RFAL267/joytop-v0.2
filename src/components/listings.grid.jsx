import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../css/components/listings.grid.css";
import ListingCard from "./listing.card";
import { Skeleton } from "antd";

// Отображение одной скелетон-карточки
// Отображение одной скелетон-карточки
const ListingSkeleton = () => {
  return (
    <div className="listing_card skeleton_card">
      <Skeleton.Input 
        style={{ width: "100%", height: "100%" }} 
        className="poster"
        active 
      />

      <div className="listing_content">
        <Skeleton.Input 
          active 
          size="small" 
          className="location"
          style={{ height: "13.8px" }} 
        />
        <Skeleton.Input 
          active 
          size="default" 
          className="title"
        />
        <Skeleton.Input 
          style={{ margin: "0", height: "calc(1rem + 2.38px)" }} 
          active 
          size="small" 
          className="price"
        />
      </div>
    </div>
  );
};


const ListingsGrid = ({ arr }) => {
  const [loading, setLoading] = useState(true);
  const skeletonCount = 8;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="listings_grid">
      {loading
        ? Array.from({ length: skeletonCount }, (_, i) => <ListingSkeleton key={i} />)
        : arr.map((item) => (
            <ListingCard
              key={item.id}
              image={item.image}
              location={item.location}
              title={item.title}
              price={item.price}
            />
          ))}
    </div>
  );
};

ListingsGrid.propTypes = {
  arr: PropTypes.array.isRequired,
};

export default ListingsGrid;
