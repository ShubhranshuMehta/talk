import React from 'react'
import User from './User'
import useGetAllUser from '../../context/useGetAllUser'

function Users() {
    const [allUsers, loading] = useGetAllUser();
    console.log(allUsers);
    return (
        <div>
            <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Messages</h1>
            <div className='py-2 flex-1 overflow-auto' style={{ maxHeight: "calc(84vh - 10vh)" }}>
                {allUsers.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div >
    )
}

export default Users