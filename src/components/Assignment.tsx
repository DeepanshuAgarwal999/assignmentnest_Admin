'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { AdminTable, Assignment as AssignmentType } from './table/AdminTable'
import { axiosInstance } from '@/lib/axios.instance';
import Loader from './shared/Loader';
import { useSearchParams } from 'next/navigation';
import { AssignmentDetails } from './AssignmentDetail';

const Assignment = () => {

    const [data, setData] = useState<AssignmentType[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useSearchParams();

    const details = params.get('details')
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
    }, [details, assignmentID])

    if (isLoading) {
        return <Loader />
    }

    if (details === 'true' && assignmentID) {
        const assignment = data.find((assignment) => assignmentID === assignment.order_id);
        if (assignment) {
            return (
                <Suspense fallback={<Loader />}>
                    <AssignmentDetails assignment={assignment} />;
                </Suspense>
            )
        }
    }

    return (
        <Suspense fallback={<Loader />}>
            <>
                <AdminTable data={data} />
            </>
        </Suspense>

    )
}

export default Assignment