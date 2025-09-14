import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RatingWidget } from '../ui/RatingWidget'
import { FormError, Review, ReviewInput, ValidateSchema } from '../../store/types'
import { useAuth } from '../../store/slices/authSlice'
import validateForm from '../../utils/validate'
import { addReview } from '../../store/slices/reviewSlice'
import { useStoreDispatch } from '../../store'

type Props = {
  productId: string
}
const AddReviewForm = ({ productId }: Props) => {

  const dispatch = useStoreDispatch()
  const { authUser } = useAuth()

  const [formData, setFormData] = useState<ReviewInput>({
    productId: productId,
    userId: authUser?.id,
    rating: null,
    review: '',
  } as Review)

  const [formErrors, setFormErrors] = useState<FormError>({})

  const [stars, setStars] = useState<number | null>(null)

  // const {rating, review} = formData
  useEffect(() => {
    if (stars) {

      setFormData({ ...formData, rating: stars })

    }
  }, [stars])

  // code to remove error info when fields are typed
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      Object.keys(formData).map(key => {
        if (formData[key as keyof ReviewInput]) {
          setFormErrors(prev => ({ ...prev, [key]: '' }))
        }
      })
    }
  }, [formData])


  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault
    setFormData({ ...formData, review: e.target.value })
  }
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    // console.log(formData);

    const validateSchema: ValidateSchema<unknown>[] =
      [
        {
          name: 'rating',
          type: 'number',
          value: formData.rating,
          msg: 'Please select rating'
        },
        {
          name: 'review',
          type: 'text',
          value: formData.review,
          msg: 'Please provide review'
        },
      ]

    const errors = validateForm(validateSchema)
    if (Object.keys(errors).length > 0) {
      return setFormErrors(prev => ({ ...prev, ...errors }))
    }

    console.log(formData)

    dispatch(addReview(formData))
  }
  return (
    <div className="bg-white rounded-lg">
      <p className="px-8 py-2 border-b-[1px] font-semibold">Create Review</p>
      <div className=" px-8 py-12  max-w-[800px]">
        <form
          className=""
          onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">
            <div className="">
              <p className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">Overall rating</p>
              <RatingWidget maxStars={5} setStars={setStars} stars={stars} />
              {formErrors.rating && <span className='text-red-500 text-xs'>{formErrors.rating}</span>}

            </div>

            <fieldset className="col-span-2">
              <label htmlFor="description" className=" font-medium text-slate-600 text-sm block mb-4 w-full">Add a written review</label>
              <textarea
                onChange={onChangeHandler}
                id="description" name="description" className="border-[1px] outline-none text-sm block px-4 py-2 rounded w-full max-w-full h-40"></textarea>

              {formErrors.review && <span className='text-red-500 text-xs'>{formErrors.review}</span>}

            </fieldset>
            <button type="submit" className="w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer">Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddReviewForm