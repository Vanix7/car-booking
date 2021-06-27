import classes from './Cell.module.scss'
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cslx from 'clsx'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme)=>({
    cell: {
        minWidth: 'auto',
        margin: '0 0 5px 5px',
        width: 80,
        [theme.breakpoints.down(645)]: {
            flexBasis: 70
        },
        [theme.breakpoints.down(560)]: {
            flexBasis: 65,
        },
        [theme.breakpoints.down(525)]: {
            flexBasis: 60,
        },
        [theme.breakpoints.down(490)]: {
            flexBasis: 55,
            margin: '0 0 3px 3px',
        },
        [theme.breakpoints.down(440)]: {
            flexBasis: 50,
        },
        [theme.breakpoints.down(405)]: {
            flexBasis: 45,
        },
        [theme.breakpoints.down(370)]: {
            flexBasis: 40,
        },
        [theme.breakpoints.down(335)]: {
            flexBasis: 35,
        },      
    },
    label: {
        color: 'black',
        // fontSize: 2
    },
    text: {
        // fontSize: 2
        // color: 'black'
    }
}))
const Cell = ({children, style, disabled, onHandleCell, data, date}, {...props}) => {
    const MUclasses = useStyles()
    return (
        <Button 
            // className={MUclasses.cell} 
            disabled = {Boolean(disabled)}
            style = {style}
            classes = {{
                root: MUclasses.cell, 
                label: MUclasses.label,
                text: MUclasses.text
            }}
            onClick = {onHandleCell ? () => onHandleCell(date, data) : null}
        >
            {children}
        </Button>
    )
}

export default withWidth()(Cell)