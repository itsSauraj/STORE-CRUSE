import { useEffect, useState } from 'react'

import Card from '../../components/shop/Card'
import { useLocation } from 'react-router-dom'

import PaperButton from '../../components/utilities/PaperButton'

const data = [
  {
    id: 1,
    title: 'Product 1 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate!',
    price: 100,
    image: 'https://picsum.photos/id/91/300/',
    category: ['mens', 'shirt']
  },
  {
    id: 2,
    title: 'Product 2',
    price: 200,
    image: 'https://picsum.photos/id/91/300/',
    category: ['womens', 'shirt']
  },
  {
    id: 3,
    title: 'Product 3',
    price: 300,
    image: 'https://picsum.photos/id/91/300/',
    category: ['hoodie', 'unisex']
  },
  {
    id: 4,
    title: 'Product 4',
    price: 400,
    image: 'https://picsum.photos/id/91/300/',
    category: ['hats', 'unisex']
  },
  {
    id: 5,
    title: 'Product 5',
    price: 500,
    image: 'https://picsum.photos/id/91/300/',
    category: ['mens', 'trousers']
  },
  {
    id: 6,
    title: 'Product 6',
    price: 600,
    image: 'https://picsum.photos/id/91/300/',
    category: ['womens', 'kurti']
  },
  {
    id: 7,
    title: 'Product 3',
    price: 300,
    image: 'https://picsum.photos/id/91/300/',
    category: ['hoodie', 'unisex']
  },
  {
    id: 8,
    title: 'Product 4',
    price: 400,
    image: 'https://picsum.photos/id/91/300/',
    category: ['hats', 'unisex']
  },
  {
    id: 9,
    title: 'Product 5',
    price: 500,
    image: 'https://picsum.photos/id/91/300/',
    category: ['mens', 'trousers']
  },
  {
    id: 10,
    title: 'Product 6',
    price: 600,
    image: 'https://picsum.photos/id/91/300/',
    category: ['womens', 'kurti']
  },
  {
    id: 11,
    title: 'Product 5',
    price: 500,
    image: 'https://picsum.photos/id/91/300/',
    category: ['mens', 'trousers']
  },
  {
    id: 12,
    title: 'Product 6',
    price: 600,
    image: 'https://picsum.photos/id/91/300/',
    category: ['womens', 'kurti']
  },
]

const filters = ['mens', 'womens', 'shirt', 'trousers', 'hoodie', 'unisex', 'hats', 'kurti']

const ShopPage = () => {

  const url = new URL(window.location.href)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const [activeFilters, setActiveFilters] = useState(['trousers'])

  const handleFilter = (e) => {
    const value = e.target.innerText
    if (activeFilters.includes(value)) {
      setActiveFilters(activeFilters.filter((filter) => filter !== value))
    } else {
      setActiveFilters([...activeFilters, value])
    }
  }

  useEffect(() => {
    console.log(activeFilters.join(','))
    url.searchParams.set('filters', activeFilters.join(','))
  }, [activeFilters])

  return (
    <>
      <h2 className='text-center text-3xl'>SHOP </h2>
      <div className='w-full overflow-x-auto flex justify-start lg:justify-center'>
        <div className='flex justify-center py-4 h-15 w-max'>
          {filters.map((filter) => (
            <PaperButton key={filter} 
              onClick={handleFilter}
              value={filter}
              className={`
                ${activeFilters.includes(filter.toUpperCase()) ? 'bg-primary dark:bg-secondary text-secondary dark:text-primary' : 'bg-secondary dark:bg-primary text-primary dark:text-secondary'} 
                uppercase w-max px-4 border-primary dark:border-secondary mx-2`}
            >
              {filter}
            </PaperButton>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>

  )
} 

export default ShopPage