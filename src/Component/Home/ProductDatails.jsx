import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Authcontext/Authcontext';
import Swal from 'sweetalert2';
// import { json } from 'express';

const ProductDatails = () => {
    const { user } = use(AuthContext)
    const { _id: productID } = useLoaderData();
    // console.log('details.... ',details)
    const [bid, setbid] = useState([])
    // console.log(bid)

    //   useeffect
    useEffect(() => {
        fetch(`http://localhost:3000/product/bids/${productID}`)
            .then(rest => rest.json())
            .then(data => {
                // console.log(data)
                setbid(data)
            })
    }, [productID])

    const modalref = useRef(null)
    const modalhandle = () => {
        modalref.current.showModal()

    }
    const bidssubmithandle = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const name = e.target.name.value
        const bids = e.target.bids.value

        // console.log(productID, email, name, bids,)

        const newBidData = {
            photo: user?.image,
            productId: productID,
            buyer_name: name,
            buyer_email: email,
            bid_price: bids,
            status: 'pending',
        }
        fetch('http://localhost:3000/bids', {
            method: "Post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newBidData)
        }).then(rest => rest.json()).then(data => {
            // console.log('after data',data)
            if (data.insertedId) {
                modalref.current.close()

                Swal.fire({
                    title: "successfuly your bids",
                    showClass: {
                        popup: `
                   animate__animated
                   animate__fadeInUp
                   animate__faster
                 ` },
                    hideClass: {
                        popup: `
                   animate__animated
                   animate__fadeOutDown
                   animate__faster
                ` }
                });
                   newBidData._id=data.insertedId
                   const  newBidDatas=[...bid, newBidData]
                   newBidDatas.sort((a,b)=>b.bid_price - a.bid_price)
                   setbid(newBidDatas)
            //    const addedBid = { ...newBidData, _id: data.insertedId};
            //     setbid(prevBids => [...prevBids, addedBid]);

            }

        })
    }

    return (
        <div>
            {/* product info */}
            <div>
                <div></div>
                <div>
                    <button onClick={modalhandle} className="btn btn-primary w-35"> Button</button>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog ref={modalref} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">

                            <form onSubmit={bidssubmithandle}>
                                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                                    <legend className="fieldset-legend">Give Seller Your Offered Price</legend>

                                    <label className="label">Name</label>

                                    <input type="text" className="input" name='name' readOnly defaultValue={user?.displayName} placeholder=" your name" />

                                    <label className="label">email</label>
                                    <input type="email" name="email"
                                        readOnly defaultValue={user?.email}
                                        className="input" placeholder='Enter your Email' />

                                    <label className="label">Bit</label>

                                    <input type="number" name="bids" id="" className="input" required placeholder='bids' />

                                    <button className='btn btn-primary'>Submit</button>
                                </fieldset>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* bids info  */}

            <div>
                <h2 className='font-bold text-3xl'>Bids for product: <span className='font-bold text-3xl text-fuchsia-500'> {bid.length}</span></h2>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL.NO
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>bids</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bid.map((biddata, index) => <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={biddata.photo} alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{biddata.buyer_name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>{biddata.bid_price}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </td>
                                </tr>)
                            }
                            {/* row 2 */}

                            {/* row 3 */}

                            {/* row 4 */}

                        </tbody>
                        {/* foot */}

                    </table>
                </div>

            </div>

        </div>
    );
};

export default ProductDatails;