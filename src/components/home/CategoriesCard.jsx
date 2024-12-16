import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const CategoriesCard = ({ category }) => {
	return (
		<div key={category.id} className={`relative bg-primary border-2 border-primary dark:border-secondary overflow-hidden h-[200px] md:h-[300px] flex-grow
	`}>
			<div className="overflow-hidden w-full h-full">
				<div className='opacity-90 dark:opacity-60  hover:scale-105 transition-all duration-200 ease-in'
					style={{
						backgroundImage: `url(${category.image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						height: '100%',
						width: '100%'
					}}
				></div>
			</div>
			<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] bg-secondary/80 hover:bg-secondary/60 transition-all duration-200 ease-in p-1">
				<div className="border-[1px] border-primary flex flex-col justify-center items-center gap-1 p-1 text-primary text-[0.9rem] font-bold">
					<h2 className="">{category.title}</h2>
					<Link to={`/shop?filter=${category.title.toUpperCase()}`}
						className="text-[0.8rem] hover:underline font-thin"
					>
						Shop Products
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CategoriesCard

CategoriesCard.propTypes = {
	category: PropTypes.object.isRequired,
	itemCount: PropTypes.number.isRequired
}