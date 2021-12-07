import React from "react";

function ProductItem({ product }) {
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "500px" }}>
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <img
              src={product.images[0].url}
              className="img-fluid rounded-start"
              alt="..."
              width="200px"
              height="200px"
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">
                {product.description.substring(0, 60)} ...
              </p>
              <h6 className="card-text text-danger">Rs. {product.price}</h6>
              {product.inStock > 0 ? (
                <p className="card-text text-danger">
                  In Stock. {product.inStock}
                </p>
              ) : (
                <p className="card-text">Out of stock</p>
              )}
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
              <div className="d-flex w-100 justify-content-between">
                <button className="btn btn-primary w-100 me-1">View</button>
                <button className="btn btn-success w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
