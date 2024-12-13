import React from "react";

function SearchField(props) {
    return (
        <form onSubmit={props.handleSubmitSearch}>
            <input type="text" name="search" value={props.search} onChange={props.handleInputSearch}></input>
            <button type="submit">SEARCH</button>
        </form>
    )
};

export default SearchField;
