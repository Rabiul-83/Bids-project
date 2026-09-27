import React, { useEffect, useState } from 'react';
import Letestproduct from './Letestproduct';

const letestproduct=fetch("http://localhost:3000/recent-product").then(rest => rest.json());

const Home = () => {

    return (
        <div>
            <div className='max-w-full mx-auto flex flex-col items-center'>
                <div className='w-5/12 m-auto'>
                    <h1 className='font-extrabold text-5xl'>Deal your <span className='text-[#8B5CF6]'>product</span> In A <span className='text-[#8B5CF6]'>smart</span> ways</h1>

                </div>
                <p className='text-center mt-5 font-sans'>Smart Deals Help you sell resell and from trusted from local sellers --all one place</p>


                <div className="join ">
                    <div>
                        <label className="input validator join-item">
                            <svg className="h-[1em] opacity-50" xmlns=" " viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="search" name="" id="" />

                        </label>
                        <div className="validator-hint hidden"> </div>
                    </div>
                    <button className="btn btn-neutral join-item">Search</button>
                </div>

                <div className='flex mt-4 gap-3.5'>

                    <button className="btn bg-[#824bf3] text-white hover:bg-[#6d30e0] active:bg-[#521cb8] active:scale-95 transition-all border-none">
                        Primary
                    </button>
                    <button className="btn bg-gradient-to-r from-[#824bf3] to-[#6d30e0] text-white hover:from-[#6d30e0] hover:to-[#521cb8] active:scale-95 transition-all border-none">
                        Primary
                    </button>

                </div>
            </div>
            <Letestproduct letestproduct={letestproduct}></Letestproduct>
        </div>


    );
};

export default Home;