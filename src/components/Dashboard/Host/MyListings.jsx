import { useMutation, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import RoomDataRow from './RoomDataRow';
import Swal from 'sweetalert2';

const MyListings = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data : rooms = [], isLoading, refetch} = useQuery({
        queryKey : ['my-listings', user],
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/my-listings/${user?.email}`)
            return data;
        }
    })

    const {mutateAsync} = useMutation({
        mutationFn : async id => {
            const {data} = await axiosSecure.delete(`/my-listings/${id}`)
            return data;
        },
        onSuccess : () => {
            Swal.fire({
                title: "Deleted!",
                text: "Room has been deleted.",
                icon: "success"
            });
            refetch();
        }
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutateAsync(id);
            }
        });
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <>
        <Helmet>
            <title>My Listings</title>
        </Helmet>

        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                    <thead>
                    <tr>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        Title
                        </th>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        Location
                        </th>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        Price
                        </th>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        From
                        </th>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        To
                        </th>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        Delete
                        </th>
                        <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                        Update
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Room row data */}

                    {rooms.map(room => (
                    <RoomDataRow
                        key={room._id}
                        room={room}
                        handleDelete={handleDelete}
                    />
                ))}

                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default MyListings