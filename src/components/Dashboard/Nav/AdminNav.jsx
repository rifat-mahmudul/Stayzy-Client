import { MdHomeWork } from "react-icons/md"
import { NavLink } from "react-router-dom"

const AdminNav = () => {
    return (
        <div>
            <NavLink
            to='manage-users'
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                }`
            }
            >
            <MdHomeWork className='w-5 h-5' />

            <span className='mx-4 font-medium'>Manage Users</span>
            </NavLink>
        </div>
    )
}

export default AdminNav
