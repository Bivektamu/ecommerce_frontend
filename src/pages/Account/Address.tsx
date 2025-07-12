import ShippingForm from "../../components/forms/ShippingForm"

const Address = () => {
  return (
    <>
      <h2 className="font-bold mb-16">Shipping Address</h2>
      <div className="mb-8 w-[620px]">
        <ShippingForm />
      </div>
    </>)
}

export default Address