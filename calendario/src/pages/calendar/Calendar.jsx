// import { useEffect, useState } from "react";
// import moment from "moment";
// import "./Calendar.scss";
// export default function Calendar() {
//   const [currentYear, setCurrentYear] = useState(2021);

//   const month = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   moment.updateLocale("pt", {
//     months: [
//       "Janeiro",
//       "Fevereiro",
//       "Março",
//       "Abril",
//       "Maio",
//       "Junho",
//       "Julho",
//       "Agosto",
//       "Setembro",
//       "Outubro",
//       "Novembro",
//       "Dezembro",
//     ],
//   });

//   return (
//     <div id="calendar-page">
//       <div className="header-page"></div>
//       <div className="content">
//         {month.map((value) => (
//           <MonthCard key={value} month={value} currentYear={currentYear} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function MonthCard(props) {
//   const [value, setValue] = useState(
//     moment().locale("pt").month(props.month).year(props.currentYear)
//   );

//   //   const [calendar, setCalendar] = useState([]);

//   //   const startDay = value.clone().startOf("month").startOf("week");
//   //   useEffect(() => {
//   //     const endDay = value.clone().endOf("month").endOf("week");
//   //   }, [value]);

//   //   return <h1>{startDay.format("DD/MM")}</h1>;
//   // }

//   const [calendar, setCalendar] = useState([]);
//   const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

//   useEffect(() => {
//     const startDay = value.clone().startOf("month").startOf("week");

//     const endDay = value.clone().endOf("month").endOf("week");

//     const day = startDay.clone().subtract(1, "day");

//     while (day.isBefore(endDay, "day")) {
//       calendar.push(
//         Array(7)
//           .fill(0)
//           .map(() => day.add(1, "day").clone())
//       );
//     }
//   }, [value]);

//   return (
//     <div id="moth-card">
//       <div className="header">{value.format("MMMM")}</div>
//       <div className="week-days">
//         {weekDays.map((value) => (
//           <div className="week-day">{value}</div>
//         ))}
//       </div>
//       {calendar.map((week) => (
//         <div className="week" key={week}>
//           {week.map((day) => (
//             <DayCard
//               key={day._d.getTime() + props.month}
//               day={day}
//               month={props.month}
//               year={props.currentYear}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// function DayCard(props) {
//   return <p>{props.day.format("DD").toString()}</p>;
// }

import { useEffect, useState } from "react";
import moment from "moment";
import "./Calendar.scss";
import { Days } from "./CalendarStyled";
import calendarBuild from "./CalendarBuild";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Calendar() {
  const [currentYear, setCurrentYear] = useState(2021);
  const [dateSelected, setDateSelected] = useState([]);

  console.log(dateSelected);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  moment.updateLocale("pt", {
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  });
  return (
    <div id="calendar-page">
      <div className="header-page">
        <IconButton
          size="small"
          onClick={() => setCurrentYear(currentYear - 1)}
        >
          <KeyboardArrowLeftIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
        {currentYear}
        <IconButton
          size="small"
          onClick={() => setCurrentYear(currentYear + 1)}
        >
          <KeyboardArrowRightIcon style={{ color: "#143296", fontSize: 40 }} />
        </IconButton>
      </div>
      <div className="content">
        {month.map((value) => (
          <MonthCard
            key={value}
            month={value}
            currentYear={currentYear}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
        ))}
      </div>
    </div>
  );
}

function MonthCard(props) {
  const [value, setValue] = useState(
    moment().locale("pt").month(props.month).year(props.currentYear)
  );
  const [calendar, setCalendar] = useState([]);
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  useEffect(() => {
    setValue(value.year(props.currentYear));
    setCalendar(calendarBuild(value));
  }, [value, props.currentYear]);

  return (
    <div id="month-card">
      <div className="header">{value.format("MMMM")}</div>
      <div className="week-days">
        {weekDays.map((value, index) => (
          <div className="week-day" key={index}>
            {value}
          </div>
        ))}
      </div>
      {calendar.map((week) => (
        <div className="week" key={week}>
          {week.map((day) => (
            <DayCard
              key={day._d.getTime() + props.month}
              day={day}
              month={props.month}
              year={props.currentYear}
              dateSelected={props.dateSelected}
              setDateSelected={props.setDateSelected}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function DayCard(props) {
  const [state, setState] = useState("");

  const day = props.day._d;

  useEffect(() => {
    const currentMonth = new Date(props.month + ",01," + props.year);

    if (day.getMonth() !== currentMonth.getMonth()) {
      setState("nonPertenceMonth");
      return;
    }

    if (props.dateSelected.find((value) => value.getTime() === day.getTime())) {
      setState("selected");
    } else {
      setState("");
    }
  }, [day, props.month, props.year, props.dateSelected]);

  const handleClickDate = () => {
    if (state !== "nonPertenceMonth")
      if (
        props.dateSelected.find((value) => value.getTime() === day.getTime())
      ) {
        setState("");
        props.setDateSelected(
          props.dateSelected.filter(
            (value) => value.getTime() !== day.getTime()
          )
        );
      } else {
        setState("selected");
        props.setDateSelected([...props.dateSelected, day]);
      }
  };

  return (
    <Days state={state} onClick={handleClickDate}>
      {props.day.format("DD").toString()}
    </Days>
  );
}
