import React from "react";

function SearchField(props) {
    return (
        <div className="SearchField">
            <form onSubmit={props.handleSubmitSearch}>
                <input type="text" name="search" value={props.search} onChange={props.handleInputSearch} placeholder="type here!"></input>
                <button type="submit">SEARCH</button>
            </form>
        </div>
    )
};

export default SearchField;
