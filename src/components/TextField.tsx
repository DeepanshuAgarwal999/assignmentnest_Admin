import React from 'react'
import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'


type InputProps = {
    label?: string,
    name: string,
    control: Control<any>,
    placeholder?: string,
    type?: string
}

const TextField = ({ control, name, placeholder, label, ...props }: InputProps) => {
    return (
        <FormField control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor={name}>{label}</Label>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} {...props} className='shad-input' />
                    </FormControl>
                    <FormMessage className='shad-error' />
                </FormItem>
            )}

        />
    )
}

export default TextField