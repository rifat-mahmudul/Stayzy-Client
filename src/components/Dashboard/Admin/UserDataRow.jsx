import PropTypes from 'prop-types'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const UserDataRow = ({ user, refetch }) => {

    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user: loggedInUser } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async role => {
            const { data } = await axiosSecure.patch(
                `/users/update/${user?.email}`,
                role
            )
            return data
        },
        onSuccess: data => {
            refetch()
            console.log(data)
            toast.success('User role updated successfully!')
            setIsOpen(false)
        },
    })
    
    const modalHandler = async selected => {
        if (user?.role === 'admin' && loggedInUser?.role !== 'admin') {
            toast.error('Action Not Allowed')
            return setIsOpen(false)
        }
    
        const userRole = {
            role: selected,
            status: 'Verified',
        }
    
        try {
            await mutateAsync(userRole)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    return (
    <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
            <p
            className={`${
                user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
            >
            {user.status}
            </p>
        ) : (
            <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
        </td>

        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button 
        disabled={user?.role === 'admin'}
        onClick={() => setIsOpen(true)} 
        className='  relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight bg-green-200 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed'>
            <span
            aria-hidden='true'
            className='absolute inset-0 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        user={user}
        modalHandler={modalHandler}
        ></UpdateUserModal>
        </td>
    </tr>
    )
    }

    UserDataRow.propTypes = {
    user: PropTypes.object,
    refetch: PropTypes.func,
    }

export default UserDataRow