'use client'
import React, { useEffect, useState } from 'react'
import { AdminTable, Assignment as AssignmentType } from './table/AdminTable'
import { axiosInstance } from '@/lib/axios.instance';
import Loader from './shared/Loader';
import { useSearchParams } from 'next/navigation';
import { AssignmentDetails } from './AssignmentDetail';

const Assignment = () => {

    const [data, setData] = useState<AssignmentType[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useSearchParams();

    const showAssignmentDetails = params.get('details')
    const assignmentID = params.get('id')

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/admin/get-quoted')
                if (data) {
                    setData(data.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        })()
    }, [])
    if (isLoading) {
        return <Loader />
    }
    if (showAssignmentDetails === 'true' && assignmentID) {
        const assignment = data.find((assignment) => assignmentID === assignment.order_id);
        if (assignment)
            return <AssignmentDetails assignment={assignment} />;
    }


    return (
        <div className=''>
            <AdminTable data={data} />
        </div>
    )
}

export default Assignment