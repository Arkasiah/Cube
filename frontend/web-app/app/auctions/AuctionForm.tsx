'use client'

import { Button, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { createAuction, updateAuction } from '../actions/auctionActions';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Auction } from '@/types';

type Props = {
    auction?: Auction
}

export default function AuctionForm({ auction }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { control, handleSubmit, setFocus, reset,
        formState: { isSubmitting, isValid } } = useForm({
            mode: 'onTouched'
        });

    useEffect(() => {
        if (auction) {
            const { make, model, color, mileage, year } = auction;
            reset({ make, model, color, mileage, year });
        }
        setFocus('make');
    }, [setFocus])

    async function onSubmit(data: FieldValues) {
        try {
            let id = '';
            let res;
            if (pathname === '/auctions/create') {
                res = await createAuction(data);
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id);
                    id = auction.id;
                }
            }
            if (res.error) {
                throw res.error;
            }
            router.push(`/auctions/details/${id}`)
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }
    }

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input label='Marque' name='make' control={control}
                rules={{ required: 'La marque est requise' }} />
            <Input label='Modèle' name='model' control={control}
                rules={{ required: 'Le modèle est requis' }} />
            <Input label='Couleur' name='color' control={control}
                rules={{ required: 'La couleur est requise' }} />

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Année' name='year' control={control} type='number'
                    rules={{ required: 'L\'année est requise' }} />
                <Input label='Kilométrage' name='mileage' control={control} type='number'
                    rules={{ required: 'Le kilométrage est requis' }} />
            </div>

            {pathname === '/auctions/create' &&
            <>
                <Input label='Image URL' name='imageUrl' control={control}
                    rules={{ required: 'L\'URL est requise' }} />

                <div className='grid grid-cols-2 gap-3'>
                    <Input label='Prix de réserve'
                        name='reservePrice' control={control} type='number'
                        rules={{ required: 'Le prix de réserve est requis' }} />
                    <DateInput
                        label='Date fin enchère'
                        name='auctionEnd'
                        control={control}
                        dateFormat='dd MMMM yyyy h:mm a'
                        showTimeSelect
                        rules={{ required: 'La date de fin est requise' }} />
                </div>
            </>}


            <div className='flex justify-between'>
                <Button outline color='gray'>Annuler</Button>
                <Button
                    isProcessing={isSubmitting}
                    disabled={!isValid}
                    type='submit'
                    outline color='success'>Valider</Button>
            </div>
        </form>
    )
}
