import React from "react";

const dropdown = (props) => {
  const { items } = props;
  const options = items.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });

  return (
    <div>
      <select multiple onChange={props.onChange}>
        {options}
      </select>
    </div>
  );
};

export default dropdown;
