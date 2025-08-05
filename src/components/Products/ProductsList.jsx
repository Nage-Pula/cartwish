import './ProductsList.css';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
// import Skeleton from './../../../node_modules/react-loading-skeleton/dist/index.d';
import useData from '../../hooks/useData';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSearchParams } from 'react-router-dom';
import { set } from 'zod';
import Pagination from './../Common/Pagination';
import React, { use, useEffect, useState} from 'react';


const ProductsList = () => {
  const [sortBy, setSortBy] = useState('');
  const [ sortedProducts, setSortedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useSearchParams('');
  const category = search.get('category');
  const searchQuery = search.get('search');

  const { data, error, isLoading } = useData('/products',{
    params: {
      search: searchQuery,
      category,
      perPage:10,
      page,
    },
  },[searchQuery,category, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  const skeletons =[1,2,3,4,5,6,7,8];
  const handlePageChange = (page) => {
    const currentParams=Object.fromEntries([...search]);
    setSearch({
      ...currentParams,page:parseInt( currentParams.page)+1,
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data && page < data.totalPages) {
        // Load more products
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [data, isLoading]);
  useEffect(() => {
    if (data && data.products) {
      let products = [...data.products];
      if (sortBy === 'price desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'price asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'rating desc' || sortBy === 'rate desc') {
        products.sort((a, b) => (b.reviews?.rate || 0) - (a.reviews?.rate || 0));
      } else if (sortBy === 'rating asc' || sortBy === 'rate asc') {
        products.sort((a, b) => (a.reviews?.rate || 0) - (b.reviews?.rate || 0));
      }
      setSortedProducts(products);
    }
  }, [data, sortBy]);

  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
          <h2>Products</h2>
          <select name="sort" id="" className='products_sorting'
          onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Relevance</option>
            <option value="price desc">Price High to Low</option>
            <option value="price asc">Price Low to High</option>
            <option value="rating desc">Rate High to Low</option>
            <option value="rating asc">Rate Low to High</option>
          </select>
        </header>
        <div className="products_list">
          {error && <em className="form_error"> {error}</em>}

          {data?.products && sortedProducts.map((product,index) => (
               <ProductCard
            key={`${product._id}-${index}`}
           product={product} />
          ))}
          {isLoading && skeletons.map((n) => (
            <ProductCardSkeleton key={n} />
          ))}
          {/* {data && (
            <Pagination
              totalPosts={data.totalProducts}
              postsPerPage={8}
              onClick={handlePageChange}
              currentPage={page}
            />
          )} */}
        </div>
      </section>
  )
}

export default ProductsList
