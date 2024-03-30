import React, { useContext } from "react";
import clockImg from "../../../assets/images/clock.svg"
import { GlobalContext } from "../../../context/Provider";
const DealsTimer = (getTime: any) => {
    const { authState } = useContext(GlobalContext);
    const [timerCount, setTimerCount] = React.useState({
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0",
        title: ""
    } as any);
    var countdownTimer: any;
    const initialiseInterval = (end_date: number) => {
        console.log(end_date);
        if (end_date) {
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var end: any = new Date(Number(end_date))
            const timer = () => {
                var now: any = new Date();
                var distance = end - now;
                if (distance < 0) {
                    clearInterval(countdownTimer);
                    return;
                }
                var days = Math.floor(distance / _day);
                var hours = Math.floor((distance % _day) / _hour);
                var minutes = Math.floor((distance % _hour) / _minute);
                var seconds = Math.floor((distance % _minute) / _second);
                setTimerCount({
                    ...timerCount,
                    days,
                    hours,
                    minutes,
                    seconds,
                })
            }
            countdownTimer = setInterval(() => timer(), 1000);
        }
    }
    React.useEffect(() => {
        initialiseInterval(getTime.valid_till)
    }, [getTime.valid_till, authState?.lang])
    return <div className="deal-time">
        <ul className='list-unstyled mb-0 ps-0 d-flex align-items-center'><img src={clockImg} className="me-2" alt="img" />
            {String(timerCount.days).length == 1 ? `0${timerCount.days}`
                : timerCount.days} :  {String(timerCount.hours).length == 1
                    ? `0${timerCount.hours}`
                    : timerCount.hours} : {String(timerCount.minutes).length == 1
                        ? `0${timerCount.minutes}`
                        : timerCount.minutes}: {String(timerCount.seconds).length == 1
                            ? `0${timerCount.seconds}`
                            : timerCount.seconds} Left</ul>
    </div>
}
export default DealsTimer
