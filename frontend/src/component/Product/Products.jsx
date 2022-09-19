import React from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../Actions/productActions";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/slider";

const categories = [
  "All",
  "Topwere",
  "Bottomwere",
  "Sports",
  "Indian & Festive",
];

const SubNav = ["All", "Men", "Women", "Kids"];

const shorting = [
  "price-Low-High",
  "price-High-Low",
  "A-Z",
  "Z-A",
  "rating-high-low",
  "rating-low-high",
  "remove-all",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 25000]);
  const [category, setCategory] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [sort, setSort] = React.useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const aplyFilter = (sh) => {
    setSort(sh);
    dispatch(
      getProduct(keyword, currentPage, price, category, gender, ratings, sort)
    );
  };
  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(
      getProduct(keyword, currentPage, price, category, gender, ratings, sort)
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    gender,
    ratings,
    alert,
    error,
    sort,
  ]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="productsHeading">Products</h1>

          <div className="mainSub">
            <div className="Sub">
              {SubNav.map((e) => (
                <h3
                  key={e}
                  onClick={() => setGender(e)}
                  className={gender === e ? "activeGen" : ""}
                >
                  {e}
                </h3>
              ))}
            </div>
          </div>

          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              arial-aria-labelledby="ranfe-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>

            <ul>
              {categories.map((cat) => (
                <li
                  className="category-link productfilter"
                  key={cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            <fildset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                arial-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              ></Slider>
            </fildset>
            <fildset>
              <Typography component="legend">shorting</Typography>
              <select
                className="shortingSelect"
                onChange={(e) => aplyFilter(e.target.value)}
              >
                <option value="">sortings</option>

                {shorting.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </fildset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
