import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PaperButton from "../utilities/PaperButton";

const FiltersContainer = ({ filters, originalData, setFilteredData }) => {
	const location = useLocation();
	const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
		
	const urlFilter = queryParams.get("filter");
	const initialFilters = urlFilter ? urlFilter.split("+") : [];

	const [activeFilters, setActiveFilters] = useState(initialFilters);

	useEffect(() => {
		const filterItems = () => {
			if (activeFilters.length === 0) {
				setFilteredData(originalData);
			} else {
				setFilteredData(
					originalData.filter((item) =>
						activeFilters.every((filter) =>
							item.category.includes(filter.toLowerCase())
						)
					)
				);
			}
		};

		const handleFilterChange = () => {
			const value = activeFilters.join("+");
			queryParams.set("filter", value);
			window.history.pushState({}, "", "?" + queryParams.toString());
		};

		handleFilterChange();
		filterItems();
	}, [activeFilters, originalData, setFilteredData, queryParams]);

	const handleFilter = (e) => {
		const value = e.target.innerText;
		setActiveFilters((prevFilters) =>
			prevFilters.includes(value)
				? prevFilters.filter((filter) => filter !== value)
				: [...prevFilters, value]
		);
	};

	return (
		<div className="w-full overflow-x-auto flex justify-start lg:justify-center">
			<div className="flex justify-center py-4 h-15 w-max">
				{filters.map((filter) => (
					<PaperButton
						key={filter}
						onClick={handleFilter}
						value={filter}
						className={`
						uppercase w-max px-4 mx-2 border-color-primary dark:border-secondary
						${activeFilters.includes(filter.toUpperCase()) 
						? "bg-primary dark:bg-secondary text-secondary dark:text-primary border-primary dark:border-secondary"
						: "bg-secondary dark:bg-primary text-primary dark:text-secondary"
					}`}
					>
						{filter}
					</PaperButton>
				))}
			</div>
		</div>
	);
};

FiltersContainer.propTypes = {
	filters: PropTypes.array.isRequired,
	originalData: PropTypes.array.isRequired,
	setFilteredData: PropTypes.func.isRequired,
};

export default FiltersContainer;
