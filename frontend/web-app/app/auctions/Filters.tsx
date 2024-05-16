import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';
import React from 'react'
import { AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
    {
        label: 'Alphabétique',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'Date de fin',
        icon: AiOutlineSortAscending,
        value: 'endingSoon'
    },
    {
        label: 'Ajoutée récemment',
        icon: BsFillStopCircleFill,
        value: 'new'
    },
]

const filterButtons = [
    {
        label: 'Enchère en cours',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Fin < 6h',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Finies',
        icon: BsStopwatchFill,
        value: 'finished'
    },
]

export default function Filters() {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);

    return (
        <div className='flex justify-between items-center mb-4'>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Filtrer par :</span>
                <Button.Group>
                    {filterButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => setParams({ filterBy: value })}
                            color={`${filterBy === value ? 'red' : 'gray'}`}
                        >
                            <Icon className='mr-3 h-4 w-4' />
                            {label}
                        </Button>
                    ))}
                </Button.Group>
            </div>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Ordonner par</span>
                <Button.Group>
                    {orderButtons.map(({ label, icon: Icon, value }) => (
                        <Button
                            key={value}
                            onClick={() => setParams({ orderBy: value })}
                            color={`${orderBy === value ? 'red' : 'gray'}`}
                        >
                            <Icon className='mr-3 h-4 w-4' />
                            {label}
                        </Button>
                    ))}
                </Button.Group>
            </div>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Taille de page</span>
                <Button.Group>
                    {pageSizeButtons.map((value, i) => (
                        <Button key={i}
                            onClick={() => setParams({pageSize: value})}
                            color={`${pageSize === value ? 'red' : 'gray'}`}
                            className='focus:ring-0'
                        >
                            {value}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    )
}
