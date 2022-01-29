import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const formatSpots = function (spots) {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return `${spots} spot remaining`;
  } else {
    return `${spots} spots remaining`;
  }
};

export default function DayListItem({ name, spots, selected, setDay }) {
  const daylistItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li onClick={setDay} className={daylistItemClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
