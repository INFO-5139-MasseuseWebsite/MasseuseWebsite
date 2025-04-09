import { format } from 'date-fns';
import './CalendarThing.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

export default function CalendarThing({ date, setDate, rmtID }) {
    const { year, month, day, hour } = date
    const dateObject = new Date(year, month, day, hour)
    const maxDays = daysInMonth(year, month)
    const [available, setAvailable] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        // setAvailable({
        //     hourIndexOffset: 9,
        //     available: [
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [false, false, false, false, false, false, false, false],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [false, false, false, false, false, false, false, false],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //         [true, true, true, true, true, true, true, true],
        //     ]
        // })

        axios.post('/api/public/get-available-bookings', {
            rmtID: rmtID,
            year: year,
            month: month
        })
            .then(res => {
                if (res.status === 200) {
                    setAvailable(res.data)
                    setError(null)
                } else {
                    setAvailable(null)
                    setError(`Somethign went wrong (${res.status})`)
                }
            })
            .catch(err => setError('Something went wrong???'))
            .finally(() => console.log('something'))
    }, [year, month])

    const genBlanksStart = () => {
        const startOffset = new Date(year, month).getDay()
        const a = []
        for (let i = 0; i < startOffset; i++)
            a.push(<div className='day disabled'></div>)
        return a
    }
    const genDays = () => {
        const a = []
        for (let i = 1; i <= maxDays; i++) {
            const valid = (available && !available.empty && available.available[i - 1]) ? available.available[i - 1].filter(yes => yes).length > 0 : false
            // console.log(i, valid, available?.available[i - 1])
            a.push(<button className={valid ? 'day' : 'day disabled'} onClick={() => setDate({
                ...date,
                day: i
            })}>{i}</button>)
        }
        return a
    }
    const genBlanksEnd = () => {
        const startOffset = new Date(year, month).getDay()
        const fullGrid = Math.floor((maxDays + startOffset - 1) / 7 + 1) * 7
        const a = []
        for (let i = 0; i < (fullGrid - maxDays - startOffset); i++)
            a.push(<div className='day disabled'></div>)
        return a
    }
    const genAvailable = () => {
        console.log(available)
        if (!available || available.empty) return []
        const a = []
        console.log('aa')
        const aa = available.available?.[day - 1]
        if (!aa) return []
        for (let i = 0; i < aa.length; i++) {
            if (aa[i]) {
                a.push(<p style={hour == (i + available.hourIndexOffset) ? { border: '2px solid black' } : {}} onClick={() => setDate({ ...date, hour: i + available.hourIndexOffset })}>{i + available.hourIndexOffset}:00</p>)
            }
        }
        return a
    }

    return <div className='calendarthing'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <div className='spacer'></div>
            <button onClick={() => setDate({
                ...date,
                month: month - 1
            })}>&lt;</button>
            <div className='spacer'></div>
            <p className='month'>{format(dateObject, 'MMMM yyyy')}</p>
            <div className='spacer'></div>
            <button onClick={() => setDate({
                ...date,
                month: month + 1
            })}>&gt;</button>
            <div className='spacer'></div>
        </div>
        <div className='calendar'>
            {genBlanksStart()}
            {genDays()}
            {genBlanksEnd()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>{error ? error : format(dateObject, 'EEEE do')}</h2>
            {genAvailable()}
        </div>
    </div>
}