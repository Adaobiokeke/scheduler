import React from "react";
import DayListItem from "./DayListItem";
const DayList = ({ days, day: propsDay, setDay }) => {
  console.log("this is propsday",propsDay)
  return (
    <div>
      <ul>
        {days.map((day, key) => (
          <DayListItem
            key={key}
            name={day.name}
            spots={day.spots}
            selected={day.name === propsDay}
            setDay={(event) => setDay(day.name)}
          />
        ))}
        ,
      </ul>
    </div>
  );
};

export default DayList;
