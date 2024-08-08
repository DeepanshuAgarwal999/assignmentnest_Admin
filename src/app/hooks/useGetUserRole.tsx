"use client"

import { getCookie } from '@/lib/utils';
import { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export const useGetUserRole = (): { role: 'ADMIN' | 'MANAGER' | null, email: string, name: string } => {
    const [role, setRole] = useState<'ADMIN' | 'MANAGER' | null>(null);
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState("")
    useEffect(() => {
        const token = getCookie('token');

        if (token) {
            try {
                const decoded_token = jwtDecode(token) as JwtPayload;
                if (decoded_token) {
                    console.log(decoded_token)
                    setRole(decoded_token.scope)
                    setEmail(decoded_token.email)
                    setName(decoded_token.name)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }, [])
    return { role, email, name }
}
