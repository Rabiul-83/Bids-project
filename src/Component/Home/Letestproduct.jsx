import React, { use } from 'react';
import Productitem from './Productitem';

const Letestproduct = ({ letestproduct }) => {
    const letestproducts = use(letestproduct)
    // console.log('letestproducts)
    return (
        <div className='bg-blue-100 p-4 mt-4'>
            <h1 className='text-4xl text-center '>Recent <span className='text-[#8B5CF6] '>Product</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    letestproducts.map(letest=> <Productitem key={letest._id} letest={letest}></Productitem>
                    )
                }
            </div>
        </div>
    );
};

export default Letestproduct;