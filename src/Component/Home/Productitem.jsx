import React from 'react';
import { Link } from 'react-router';

const Productitem = ({ letest }) => {
    const {_id,image, name } = letest;
    // console.log(_id)
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions w-full">
                    <Link to={`/productdetails/${_id}`} className="btn btn-primary w-full">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Productitem;