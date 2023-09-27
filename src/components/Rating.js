import React, { useState } from 'react';

function Rating({ onRate }) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        onRate(newRating); // Appeler la fonction de notation parent avec la nouvelle note
    };

    return (
        <div>
            <p>Noter cet événement :</p>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? 'star active' : 'star'}
                    onClick={() => handleRatingChange(star)}
                >
          &#9733;
        </span>
            ))}
        </div>
    );
};

export default Rating;