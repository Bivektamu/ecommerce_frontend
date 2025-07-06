import BreadCrumbs from "../../components/ui/BreadCrumbs"
import PageWrapper from "../../components/ui/PageWrapper"
import SubNav from "./SubNav"

const Account = () => {
  return (
    <PageWrapper>
      <section id="breadcrums" className="">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">My Account</h2>
          <BreadCrumbs alias='My Account' rootLink="Ecommerce" />
        </div>
      </section>
      
      <section className='w-full bg-white  py-36'>
        <div className="container mx-auto flex justify-between">
        <SubNav />
        <div className="w-[384px] max-w-full bg-white pt-8 pb-12 px-8 rounded-lg">
          adsf
</div>
         
        </div>
      </section>
    </PageWrapper>
  )
}

export default Account