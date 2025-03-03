import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa'

type Props = {
    stars: number
}

export const RatingWidget = ({ stars }: Props) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        console.log(rating);
    }, [rating])
    return (
        <div className="block">

            {[...Array(stars)].map((_, i) => {
                const ratingValue = i + 1;

                return (
                    <fieldset className="inline-block pr-1" key={ratingValue}>
                        <input
                            id={`ratingStar${ratingValue}`}
                            type="radio"
                            name="starRating"
                            value={ratingValue}
                            style={{ display: "none" }}
                            onClick={() => setRating(ratingValue)} />

                        <label htmlFor={`ratingStar${ratingValue}`}>
                            <FaStar
                                onMouseOver={() => { setHoverRating(ratingValue) }}
                                onMouseOut={() => { setHoverRating(0) }}
                                className="cursor-pointer w-6"
                                color={ratingValue <= (hoverRating || rating) ? "#5C5F6A" : "#e4e5e9"}
                                size={50} />
                        </label>
                    </fieldset>
                )
            })}
        </div>
    )
}