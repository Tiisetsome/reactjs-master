import React from "react";
import styles from "./Filter.module.css";

interface FilterProps {
  filters: {};
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  return (
    <form className={styles.form}>
      <label htmlFor="environment">Choose Environment : </label>
      <select
        name="environment"
        id="environment"
        onChange={(e) =>
          setFilters({
            ...filters,
            environment: e.target.value,
          })
        }
      >
        <option value="all">All</option>
        <option value="production">Production</option>
        <option value="testing">Testing</option>
      </select>
    </form>
  );
};

export default Filter;
