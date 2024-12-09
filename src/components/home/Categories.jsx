import { useEffect, useState, Fragment } from "react";
import CategoriesCard from "./CategoriesCard";

import PropTypes from "prop-types";

const Categories = ({ categories }) => {

    let currentIndex = 0;
    const [rowsConfig, setRowsConfig] = useState([3, 2]);

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setRowsConfig([1, 1, 1, 1, 1]);
            } else if (window.innerWidth <= 768) {
                setRowsConfig([2, 2, 2, 2, 2]);
            } else if (window.innerWidth <= 1024) {
                setRowsConfig([2, 2, 2, 2]);
            } else {
                setRowsConfig([3, 2]);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                {rowsConfig.map((numItems, rowIndex) => {
                    const rowItems = categories.slice(currentIndex, currentIndex + numItems);
                    currentIndex += numItems;

                    if (rowItems.length === 0) {
                        return (<Fragment key={rowIndex}></Fragment>);
                    }
                    return (
                        <div key={rowIndex} className={`flex gap-4`}>
                            {rowItems.map((item) => (
                                <CategoriesCard key={item.id} category={item} itemCount={numItems} />
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Categories



Categories.propTypes = {
    categories: PropTypes.array.isRequired
}
