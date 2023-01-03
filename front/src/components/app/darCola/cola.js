import React from 'react';

const Cola = (props) => {
    return ( 
        <div>
            <input type="checkbox" id={props.id} name={props.name} checked={props.isChecked}
            onChange={props.handleOnChange} value={props.id}/>
            {props.id}
        </div>
     );
}
 
export default Cola;