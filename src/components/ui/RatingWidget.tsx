import { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from 'react-icons/fa'

type Props = {
    maxStars: number,
    setStars: Dispatch<SetStateAction<number | null>>,
    stars: number | null
}

export const RatingWidget = ({ maxStars, setStars, stars }: Props) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="block">

            {[...Array(maxStars)].map((_, i) => {
                const ratingValue = i + 1;

                return (
                    <fieldset className="inline-block pr-1" key={ratingValue}>
                        <input
                            id={`ratingStar${ratingValue}`}
                            type="radio"
                            name="starRating"
                            value={ratingValue}
                            style={{ display: "none" }}
                            onClick={() => setStars(ratingValue)} />

                        <label htmlFor={`ratingStar${ratingValue}`}>
                            <FaStar
                                onMouseOver={() => { setHoverRating(ratingValue) }}
                                onMouseOut={() => { setHoverRating(0) }}
                                className="cursor-pointer w-6"
                                color={ratingValue <= (hoverRating || stars) ? "#5C5F6A" : "#e4e5e9"}
                                size={50} />
                        </label>
                    </fieldset>
                )
            })}
        </div>
    )
}