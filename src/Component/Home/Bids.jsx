import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Authcontext/Authcontext';
import Swal from 'sweetalert2';

const Bids = () => {
    const { user } = use(AuthContext)
    const [bidest, setbidest] = useState([])
    // console.log('accesstoken',user.accessToken)
    //   jwt---token
    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //             headers: {
    //              authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //             .then(rest => rest.json())
    //             .then(data => {
    //                 // console.log(data)
    //                 setbidest(data)
    //             })
    //     }
    // }, [user?.email])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(rest => rest.json())
                .then(data => {
                    // console.log(data)
                    setbidest(data)
                })
        }
    }, [user])

    const removBidHandle = (_id) => {
        // console.log('hit me', _id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)

                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: "DELETE"
                })
                    .then(rest => rest.json())
                    .then(data => {
                        if (data.deletedCount)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bids has been deleted.",
                                icon: "success"
                            });
                        const remainigdata = bidest.filter(bid => bid._id !== _id)
                        setbidest(remainigdata)
                    })

            // console.log('delete')

        });

    }

    return (
        <div>
            <h2> my bids {bidest.length}</h2>
            {
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL. No
                                </th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Bid price</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bidest.map((bid, index) =>
                                    <tr key={bid._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Hart Hagerty</div>
                                                    <div className="text-sm opacity-50">United States</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Zemlak, Daniel and Leannon
                                            <br />
                                            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                        </td>
                                        <td>{bid.bid_price}</td>
                                        <td>{bid.status == 'pending' ?
                                            <div className="badge badge-warning">Warning</div> : <div className="badge badge-success">Success</div>

                                        }</td>
                                        <td>
                                            <button onClick={() => removBidHandle(bid._id)} className="btn ">Remove</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>


                    </table>
                </div>
            }
        </div>
    );
};

export default Bids;