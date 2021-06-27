// import classes from './Calendar.module.scss'
import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, Box} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import Cell from './cell/Cell'
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx'
import axios from '../axios/axios-booking'



const arrDays = [1, 2, 3, 4, 5, 6, 0]
const objMonth = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
}
const days_of_the_week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']


const useStyles = makeStyles({
    title: {
        textAlign: 'center'
    },
    arrowLeft: {
        position: 'relative',
        right: 5,
        top: 2
    },
    arrowRigth: {
        position: 'relative',
        left: 5,
        top: 2,

        
    },
    Calendar: {
        width: 600
    },
    CalendarCell: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
    },

    Progress: {
        width: '100%',
    }
})
const Calendar = (props) => {
    const [month, setMonth] = useState(0)
    const [serverData, setServerData] = useState(false)
    const [progress, setProgress] = useState(false)
    const MUclasses = useStyles()
    const date = new Date()
    const days_in_month = 32 - new Date(date.getFullYear(), date.getMonth() + month, 32).getDate();
    const current_year = new Date(date.getFullYear(), date.getMonth() + month, 1).getFullYear();
    const current_month = new Date(date.getFullYear(), date.getMonth() + month, 1).getMonth()+1;
    const first_day = new Date(date.getFullYear(), date.getMonth() + month, 1).getDay();


    function currentDay(day) {
        if (current_year === date.getFullYear() 
            && current_month === date.getMonth() + 1
            && day === date.getDate()) {
                return true
            }
    }
    useEffect(async () => {
        setProgress(false)
        const response = await axios.get(`${current_year}/${current_month}.json`)
        setServerData(response)
        setProgress(true)
    }, [month, props.value])


    
    // getServerData()
    const num = arrDays.indexOf(first_day)
    let count = 1
    return (
        <Box className={MUclasses.Calendar}>
            <Typography className = {MUclasses.title}>
                <Button onClick = {() => setMonth(month-1)}>
                    <ArrowBackIosIcon 
                        fontSize="small"
                        className = {MUclasses.arrowLeft}
                    />
                </Button>
                <Button onClick={() => setMonth(0)}>
                    <Typography variant="h6" gutterBottom>
                        {`${objMonth[current_month-1]} ${current_year}`}
                    </Typography>
                </Button>
                <Button onClick = {() => setMonth(month+1)}>
                    <ArrowForwardIcon 
                        fontSize="small"
                        className = {MUclasses.arrowRigth}
                    />
                </Button>
            </Typography>
            <Box className={MUclasses.CalendarCell}>
                
                {
                    days_of_the_week.map((item, index) => (
                        <Cell 
                            key={index} 
                            disabled="true"
                        >
                            {item}
                        </Cell>
                    ))
                }
                {   
                    serverData && progress ? 
                    [...new Array(days_in_month + num)].map((_, index) => (
                        (index >= num) ?
                            serverData.data && serverData.data[count] ? 
                                <Cell 
                                    key={index} 
                                    style = {{background: serverData.data[count].Vanix && serverData.data[count].Dima ? 'linear-gradient(25deg, #6f74dd, #e53935)' 
                                    : serverData.data[count].Vanix ? '#6f74dd': '#e53935',
                                    border: currentDay(count) ? '2px solid black' : 'none'
                                }}
                                    data = {{Vanix: serverData.data[count].Vanix,
                                            Dima: serverData.data[count].Dima}}
                                    date = {[count, current_month, current_year]}
                                    onHandleCell = {props.onHandleCell}
                                >   
                                    {count++}
                                </Cell>
                            :    <Cell 
                                    key={index}
                                    date = {[count, current_month, current_year]}
                                    onHandleCell = {props.onHandleCell}
                                    style = {{border: currentDay(count) ? '1px solid black' : 'none'}}
                                >
                                    {count++}
                                </Cell>
                        : <Cell key={index} disabled="true">
                            
                         </Cell>
                    )) 
                    : 
                    <LinearProgress 
                    className = {MUclasses.Progress} 
                    />
                }
            </Box>
        </Box>
    )
}

export default Calendar   