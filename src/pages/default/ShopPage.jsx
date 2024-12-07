import Card from '../../components/shop/Card'

const data = [
  {
    id: 1,
    title: 'Product 1',
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
    category: ['hoodie', 'bisexual']
  },
  {
    id: 4,
    title: 'Product 4',
    price: 400,
    image: 'https://picsum.photos/id/91/300/',
    category: ['hats', 'bisexual']
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
    category: ['hoodie', 'bisexual']
  },
  {
    id: 8,
    title: 'Product 4',
    price: 400,
    image: 'https://picsum.photos/id/91/300/',
    category: ['hats', 'bisexual']
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

const ShopPage = () => {

  return (
    <>
      <h2 className='text-center'>SHOP </h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4'>
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>

  )
}   

export default ShopPage