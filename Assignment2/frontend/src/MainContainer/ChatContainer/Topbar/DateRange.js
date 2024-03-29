import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DatePicker from 'react-datepicker';
import "./DateRange.scss";
import {Controller, useForm, useFormContext} from "react-hook-form";

const DateButton = ({Range, value, onClick}) => (
    <div className="range-container" onClick={onClick}>
        <label htmlFor="date" className={"calendar-label"}>{Range}</label>
        {/*<li className="date-picker-item" onClick={onClick}>*/}
        <div className={"range-label"}>
            <FontAwesomeIcon icon={['far', 'calendar-alt']} color={"#4c8bf5"} className={"calendar"}/>
            {/*{console.log(value)}*/}
            {value}
        </div>
        {/*</li>*/}
    </div>
);


const DateRange = (props) => {
    const {to,setTo,from, setFrom} = props;
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="calendar">

            {<DatePicker selected={from}
                         // onChange={date => setStartDate(date)}
                         onChange={date => setFrom(date)}
                         customInput={<DateButton Range={"From"}/>}
                         timeInputLabel="Time:"
                         dateFormat="dd.MM.yyyy h:mm aa"
                         showTimeInput
                         selectsStart
                         startDate={from}
                         endDate={to}
                         popperModifiers={{
                             preventOverflow: {
                                 enabled: true,
                             },
                         }}
            />}

            <hr/>

            {<DatePicker selected={to}
                         onChange={date => setTo(date)}
                         customInput={<DateButton Range={"To"}/>}
                         timeInputLabel="Time:"
                         dateFormat="dd.MM.yyyy h:mm aa"
                         showTimeInput
                         selectsEnd
                         startDate={from}
                         endDate={to}
                         minDate={from}
                         popperModifiers={{
                             preventOverflow: {
                                 enabled: true,
                             },
                         }}
            />}


        </div>
    );
}

export default DateRange;