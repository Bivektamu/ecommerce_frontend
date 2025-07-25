import { useSelector } from "react-redux"
import Hero from "../components/Hero"
import Grids from "../components/ui/Grids"
import { getProducts, useProduct } from "../store/slices/productSlice"
import { useEffect } from "react"
import { useStoreDispatch } from "../store"
import HeroImg from '../assets/hero-2.png'


import Arrow from "../components/ui/Arrow"
import { Link } from "react-router-dom"
import GridLoader from "../components/ui/GridLoader"
import { Status } from "../store/types"
import FeaturedLatest from "../components/FeaturedLatest"
import ProductCard from "../components/ui/ProductCard"
import PageWrapper from "../components/ui/PageWrapper"

const Home = () => {
  const dispatch = useStoreDispatch()
  const { products, status } = useSelector(useProduct)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <PageWrapper>
      <Hero />
      <section className="bg-white pt-24 pb-36">
        <Grids cssClass='container mx-auto grid-cols-3 grid gap-24 mb-36'>
          <div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="24" fill="#F6F6F6" />
              <path d="M27.7007 28.7309V17.0985C27.7007 16.1517 26.9332 15.3842 25.9864 15.3842H14.9184C13.9716 15.3842 13.2041 16.1517 13.2041 17.0985V28.4568C13.2041 29.4036 13.9716 30.171 14.9184 30.171H16.2041M34.7959 23.4969H27.7031M32.489 29.8512H33.0799C34.0267 29.8512 34.7942 29.0837 34.7942 28.1369V22.9924L32.4072 18.1052C32.1197 17.5166 31.5219 17.1433 30.8667 17.1433H28.0099M26.7037 30.1707H21.668M16.2891 30.2226C16.2891 30.8573 16.5413 31.4661 16.9901 31.9149C17.4389 32.3637 18.0476 32.6158 18.6823 32.6158C19.317 32.6158 19.9257 32.3637 20.3745 31.9149C20.8233 31.4661 21.0754 30.8573 21.0754 30.2226C21.0754 29.5879 20.8233 28.9792 20.3745 28.5304C19.9257 28.0816 19.317 27.8295 18.6823 27.8295C18.0476 27.8295 17.4389 28.0816 16.9901 28.5304C16.5413 28.9792 16.2891 29.5879 16.2891 30.2226ZM27.1526 30.2226C27.1526 30.8573 27.4047 31.4661 27.8535 31.9149C28.3023 32.3637 28.911 32.6158 29.5457 32.6158C30.1804 32.6158 30.7891 32.3637 31.2379 31.9149C31.6867 31.4661 31.9389 30.8573 31.9389 30.2226C31.9389 29.5879 31.6867 28.9792 31.2379 28.5304C30.7891 28.0816 30.1804 27.8295 29.5457 27.8295C28.911 27.8295 28.3023 28.0816 27.8535 28.5304C27.4047 28.9792 27.1526 29.5879 27.1526 30.2226Z" stroke="#0E1422" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-8 mb-4 font-semibold">Free Shipping</p>
            <p className="text-slate-600">Upgrade your style today and get FREE shipping on all orders! Don't miss&nbsp;out.</p>
          </div>
          <div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="24" fill="#F6F6F6" />
              <path d="M18.0517 25.2695L15 30.5764L18.2975 29.6893L19.181 33L21.8289 28.3955M29.9483 25.2695L33 30.5764L29.7025 29.6893L28.819 33L26.1712 28.3955M30.8587 21.8899C30.8587 25.6951 27.7862 28.7799 23.9962 28.7799C20.2062 28.7799 17.1338 25.6951 17.1338 21.8899C17.1338 18.0847 20.2062 15 23.9962 15C27.7862 15 30.8587 18.0847 30.8587 21.8899ZM24.277 18.1491L25.2223 20.0582C25.2434 20.1065 25.277 20.1483 25.3194 20.1793C25.3619 20.2104 25.4119 20.2295 25.4641 20.2348L27.5635 20.5549C27.6236 20.5627 27.6801 20.5875 27.7266 20.6265C27.7731 20.6654 27.8076 20.7168 27.826 20.7747C27.8444 20.8326 27.8461 20.8945 27.8308 20.9533C27.8154 21.0121 27.7837 21.0653 27.7394 21.1066L26.1896 22.5854C26.1665 22.6297 26.1544 22.6789 26.1544 22.7289C26.1544 22.7789 26.1665 22.8281 26.1896 22.8724L26.4864 24.9692C26.499 25.0298 26.4939 25.0928 26.4716 25.1505C26.4493 25.2082 26.4108 25.2582 26.3608 25.2945C26.3108 25.3307 26.2513 25.3515 26.1897 25.3545C26.1281 25.3575 26.067 25.3425 26.0137 25.3113L24.1451 24.318C24.0968 24.2961 24.0443 24.2848 23.9912 24.2848C23.9382 24.2848 23.8857 24.2961 23.8373 24.318L21.9688 25.3113C21.9155 25.3425 21.8543 25.3575 21.7927 25.3545C21.7311 25.3515 21.6717 25.3307 21.6217 25.2945C21.5716 25.2582 21.5331 25.2082 21.5109 25.1505C21.4886 25.0928 21.4835 25.0298 21.4961 24.9692L21.8479 22.8724C21.863 22.8237 21.8659 22.772 21.8563 22.722C21.8467 22.6719 21.8249 22.625 21.7929 22.5854L20.2431 21.0956C20.202 21.0538 20.1731 21.0014 20.1597 20.9443C20.1462 20.8871 20.1487 20.8273 20.1669 20.7714C20.1851 20.7156 20.2182 20.6658 20.2626 20.6276C20.3071 20.5894 20.3612 20.5643 20.4189 20.5549L22.5183 20.2458C22.5706 20.2405 22.6205 20.2214 22.663 20.1904C22.7055 20.1594 22.739 20.1176 22.7602 20.0693L23.7055 18.1601C23.7307 18.106 23.7706 18.0602 23.8205 18.0277C23.8704 17.9952 23.9283 17.9774 23.9878 17.9762C24.0473 17.9751 24.1059 17.9906 24.157 18.0212C24.2081 18.0517 24.2497 18.096 24.277 18.1491Z" stroke="#0E1422" strokeWidth="1.43" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-8 mb-4 font-semibold">Satisfaction Guarantee</p>
            <p className="text-slate-600">Shop confidently with our Satisfaction Guarantee: Love it or get a&nbsp;refund.</p>
          </div>
          <div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="24" fill="#F6F6F6" />
              <path d="M27.7272 20.279L22.7633 25.8604L20.2813 23.9999M24.443 31.9176C24.1579 32.0275 23.842 32.0275 23.5569 31.9176C21.332 31.0638 19.4186 29.5557 18.0693 27.5921C16.7201 25.6287 15.9986 23.3024 16 20.9204V17.2301C16 16.9039 16.1297 16.591 16.3605 16.3603C16.5913 16.1296 16.9044 16 17.2308 16H30.7692C31.0956 16 31.4087 16.1296 31.6395 16.3603C31.8703 16.591 32 16.9039 32 17.2301V20.9204C32.0014 23.3024 31.2799 25.6287 29.9307 27.5921C28.5814 29.5557 26.6679 31.0638 24.443 31.9176Z" stroke="#0E1422" strokeWidth="1.43" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <p className="mt-8 mb-4 font-semibold">Secure Payment</p>
            <p className="text-slate-600">Your security is our priority. Your payments are secure with&nbsp;us.</p>
          </div>
        </Grids>


        {/* Best Selling Products */}
        <p className="text-slate-400 text-sm mb-4 text-center uppercase tracking-wide">Shop Now</p>
        <h2 className="font-bold text-2xl mb-24 text-center">Best Selling</h2>

        {(status === Status.PENDING) ? <GridLoader col='4' /> : products.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no products.</h2> :

          <Grids cssClass='container mx-auto grid-cols-4 grid gap-12'>

            {
              products.slice(0, 4).map(product =>
                <ProductCard key={product.id} item={product} />
              )
            }
          </Grids>

        }
      </section>

      <section id="">
        <div className="container flex justify-between items-center mx-auto pb-12">
          <div className="flex flex-col items-start ">
            <h1 className='mb-4 text-4xl font-semibold'>Browse Our Fashion Paradise!</h1>
            <span className='mb-14'>Step into a world of style and explore our diverse collection of clothing categories.</span>
            <Link to="/collections" className='bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm flex gap-x-2 items-center'>Start Browsing <Arrow /></Link>
          </div>
          <img src={HeroImg} alt="" className=' w-[225px]' />
        </div>
      </section>

      <FeaturedLatest products={products} status={status} />

    </PageWrapper>
  )
}

export default Home