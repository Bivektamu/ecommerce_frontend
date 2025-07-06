import BreadCrumbs from "../../components/ui/BreadCrumbs"
import PageWrapper from "../../components/ui/PageWrapper"

const Account = () => {
  return (
    <PageWrapper>
      <section id="breadcrums" className="">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">My Account</h2>
          <BreadCrumbs alias='My Account' rootLink="Ecommerce" />
        </div>
      </section>
    </PageWrapper>
  )
}

export default Account