'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { AdminTable, Assignment as AssignmentType } from './table/AdminTable'
import { axiosInstance } from '@/lib/axios.instance';
import Loader from './shared/Loader';
import { useSearchParams } from 'next/navigation';
import { AssignmentDetails } from './AssignmentDetail';

const Assignment = () => {

    const [data, setData] = useState<AssignmentType[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useSearchParams();

    const details = params.get('details');
    const orderID = params.get('id');

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get('/admin/get-quoted');
                if (data) {
                    setData(data.data);
                    console.log(data.data)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (details === 'true' && orderID) {
        const assignment = data.find((assignment) => orderID === assignment.order_id);
        if (assignment) {
            return <AssignmentDetails assignment={assignment} />;
        }
    }

    return <AdminTable data={data} />;
};

export default function SuspenseWrapper() {
    return (
        <Suspense fallback={<Loader />}>
            <Assignment />
        </Suspense>
    );
}
