
// import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container';
import React, {useState, useEffect, Fragment, useLayoutEffect} from 'react';
import TodayIcon from '@material-ui/icons/Today';
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Typography} from '@material-ui/core';
import Calendar from '../components/calendar/Calendar'
import Head from '../components/Head'
import Box from '@material-ui/core/Box';
import axios from '../components/axios/axios-booking'



const obj = {
  2021 : {
    5: {
      1: {
        Vanix: {
          start: "07:30",
          end: "08:00",
        },
        Dima: {
          start: "08:30",
          end: "20:00",
        },
      },
      2: {
        Vanix: null,
        Dima: {
          start: "08:30",
          end: "20:00",
        }
      }
    },
    6: {
        10: {
          Vanix: null,
          Dima: {
            start: "08:30",
            end: "19:00",
          }
        },
        20: {
          Dima: {
            start: "07:30",
            end: "19:00",
          }
        }
    }
  },
  2022 : {
    5: {
      3: {
        Vanix: null,
        Dima: {
          start: "07:30",
          end: "19:00",
        }
      },
      4: {
        Vanix: null,
        Dima: {
          start: "07:30",
          end: "19:00",
        }
      }
    },
    6: {
        20: {
          Vanix: null,
          Dima: {
            start: "07:30",
            end: "19:00",
          }
        },
        10: {
          Vanix: null,
          Dima: {
            start: "07:30",
            end: "19:00",
          }
        }
    }
  }
}
const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]
const arrDays = [1, 2, 3, 4, 5, 6, 0]
const days_of_the_week = [
  'Понедельник', 
  'Вторник', 
  'Среда', 
  'Четверг', 
  'Пятница', 
  'Суббота', 
  'Воскресенье'
]

const defaultValue = {
  Vanix: {
    start: "",
    end: "",
  },
  Dima: {
    start: "",
    end: "",
  }}
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 0,
    // [theme.breakpoints.down(645)]: {
    //   justifyContent: 'center',
    // }

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginTop: 10
  },
  boxField: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5
  },
  boxButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 10
  },
  btnChangeUser: {
    position: 'absolute',
    right: 10,
    top: 10 
  }
}));


const Main = (props) => {
  const [user, setUser] = useState()
  const classes = useStyles();
  const [startValue, setStartValue] = useState('07:30')
  const [endValue, setEndValue] = useState('07:30')
  const [value, setValue] = useState(false)
  const [error, setError] = useState({
    Vanix: false,
    Dima: false
  })
  const [dataCell, setDataCell] = useState(false)
  const [userError, setUserError] = useState(false)

  function startValueHandler(e_value, item) {
    const newValue = {...value}
    if (value[item]) {
      const newValue = {...value}
      newValue[item].start = e_value
    } else {
        newValue[user] = {
        start: e_value,
        end: e_value
      }
    }
    setValue(newValue)
  }
  function endValueHandler(e_value, item) {
    const newValue = {...value}
    if (value[item]) {
      newValue[item].end = e_value
    } else {
        newValue[user] = {
        start: e_value,
        end: e_value
      }
    }
    setValue(newValue)
  }
  function onHandleCell(date, data) {
    const newValue = {...data}
    date.push(days_of_the_week[arrDays.indexOf(new Date(date[2], date[1]-1, date[0]).getDay())])
    setDataCell(date)
    setValue(newValue)
  }
  function fullButtonHandler() {
    const newValue = {...value}
    newValue[user] = {
      start: '00:00',
      end: '23:59'
    }
    setValue(newValue)
  }
  async function deleteButtonHandler() {
    if (confirm('Удалить бронь?')) {
      const response = await axios.delete(`${dataCell[2]}/${dataCell[1]}/${dataCell[0]}/${user}.json`)
      setValue(false)
    }
  }
  async function sendButtonHandler() {
    if (confirm('Сохранить бронь?')) {
      const response = await axios.put(`${dataCell[2]}/${dataCell[1]}/${dataCell[0]}.json`, value)
      setValue(false)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('user') 
    if (token === 'WdYMWlOG1Y') {
      setUser('Dima')
    } else if (token === 'zefMrK82GM') {
      setUser('Vanix')
    }

  })
  useEffect(() => {
      if (Object.keys(value).length === 0) {
        setError({
          Vanix: false,
          Dima: false
        })
        setUserError(true)
      } else {
        const newError = {...error}
        Object.keys(value).map((item) => {
          if (value[item]) {
            if (Number(value[item].start.substr(0,2)) === Number(value[item].end.substr(0,2))) {
              if (Number(value[item].start.substr(3,2)) >= Number(value[item].end.substr(3,2))) {
                newError[item] = true
              } else {
                newError[item] = false
              }
            } else if((Number(value[item].start.substr(0,2)) > Number(value[item].end.substr(0,2)))) {
              newError[item] = true
            } else {
              newError[item] = false
            }
            if (value[user] && user !== item) {
              if (Number(value[user].start.substr(0,2)) === Number(value[item].end.substr(0,2))) {
                if (Number(value[user].start.substr(3,2)) <= Number(value[item].end.substr(3,2))) {
                  setUserError(true)
                } else {
                  setUserError(false)
                }
              } else if (Number(value[user].end.substr(0,2)) === Number(value[item].start.substr(0,2))) {
                if (Number(value[user].end.substr(3,2)) >= Number(value[item].start.substr(3,2))) {
                  setUserError(true)
                } else {
                  setUserError(false)
                }
              }
              else if((Number(value[user].start.substr(0,2)) > Number(value[item].end.substr(0,2)) && 
              Number(value[user].end.substr(0,2)) > Number(value[item].end.substr(0,2))) 
              ||
              (Number(value[user].start.substr(0,2)) < Number(value[item].start.substr(0,2)) && 
              Number(value[user].end.substr(0,2)) < Number(value[item].start.substr(0,2)))) {
                setUserError(false)
              } else {
                setUserError(true)
              }
            } else {
              setUserError(false)
            }
          }
        })
        setError(newError)
      }
  }, [value])
  function changeUserHandler() {
    const token = prompt('Введите токен')
    if (token === 'WdYMWlOG1Y') {
      localStorage.setItem('user', 'WdYMWlOG1Y')
      setUser('Dima')
    } else if (token === 'zefMrK82GM') {
      localStorage.setItem('user', 'zefMrK82GM')
      setUser('Vanix')
    }
  }
  return (
    <Fragment>
    <Head/>
    <Container>
      <Container fixed className={classes.container}>
          {value && 
            <Box style={{width: '100%', textAlign: 'center'}}>
              <h3>{dataCell[3]}</h3>
              <h3>{`${dataCell[0]} ${months[dataCell[1]-1]} ${dataCell[2]}`}</h3>
            </Box>
          }
          { value && 
          Object.keys(defaultValue).map((item, index)=>(
            // value[item] ?
              <Box className={classes.boxField} key={index}>
                <Typography>
                  {item}
                </Typography>
                <TextField
                  id="time"
                  label="Начало бронирования"
                  type="time"
                  disabled={user !== item ? true: false}
                  className={classes.textField}
                  value = {value[item] && value[item].start || defaultValue[item].start}
                  onChange = {(e)=>startValueHandler(e.target.value, item)}
                  error = {user === item && userError}
                  helperText = {clsx((userError && user === item) && 'Пересечение времени аренды')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <TextField
                  id="time"
                  label="Окончание бронирования"
                  // error = {(error && user === item) && userError}
                  error = {user === item && (userError || error.Vanix)}
                  helperText = {clsx((error[item] && item === user) && 'Время окончания бронирования должно быть позже',
                  (userError && user === item) && 'Пересечение времени аренды')}
                  type="time"
                  disabled={user !== item ? true: false}
                  className={classes.textField}
                  value = {value[item] && value[item].end || defaultValue[item].end}
                  onChange = {(e)=>endValueHandler(e.target.value, item)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Box>
             
          ))}      
        { value && <Box className={classes.boxButton}>
          <Button variant="contained" 
            color="primary" 
            onClick={fullButtonHandler}
            endIcon={<TodayIcon>Full</TodayIcon>}
          >
            Full day
          </Button>
          <Button
            variant="contained"
            color="secondary" 
            // style={{background: 'red'}}
            onClick={deleteButtonHandler}
            disabled={!value[user]}
            endIcon={<DeleteForeverIcon>Delete</DeleteForeverIcon>}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={sendButtonHandler}
            disabled={!!user ? error[user] || userError : true}
            endIcon={<SendIcon>Send</SendIcon>}
          >
            Send
          </Button>
        </Box>}
        <Calendar 
          // obj={obj}
          value = {value === false? false : null}
          onHandleCell = {onHandleCell}
        />
      </Container>
      <Button
        variant="contained"
        color="primary"
        className={classes.btnChangeUser}
        onClick={changeUserHandler}
      >
        <MenuIcon>Menu</MenuIcon>
      </Button> 
    </Container>
    </Fragment>
  )
}


export default Main
