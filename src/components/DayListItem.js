import React from "react";
import classnames from "classnames";
import 'components/DayListItem.scss'


export default function DayListItem({name,spots,selected,setDay}) {
    const formatSpots = function(spots){
        if(spots === 0) {
          return 'no spots remaining';
        }
        else if(spots === 1){
          return `${spots} spot remaining`;
        }
        else{
          return `${spots} spots remaining`;
        }
      }
    
      const daylistItemClass  = classnames("day-list__item",
        {
          "day-list__item--selected": selected,
          'day-list__item--full': spots=== 0
        }
      );
    
      return (

          <li 
          onClick={setDay} 
          className={daylistItemClass}
          >
          <h2 className = "text--regular">{name}</h2>
          <h3 className = "text--light">{formatSpots(spots)}</h3>
        </li>
      )
    }
