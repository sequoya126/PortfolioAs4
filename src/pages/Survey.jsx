import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';

function Survey() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
    // Simulate submission
    setSubmitted(true);
    // Optionally log data (for assignment, this is enough)
    console.log({ rating, comment });
  };

  const resetSurvey = () => {
    setRating(0);
    setComment('');
    setSubmitted(false);
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        {!submitted ? (
          <>
            <h2>Your Feedback Matters</h2>
            <p className="survey-subtext">
              Help us improve Fraye — it only takes a moment.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Rating */}
              <div className="form-group">
                <label>How would you rate your experience?</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      className={`star ${num <= (hoverRating || rating) ? 'active' : ''}`}
                      onClick={() => setRating(num)}
                      onMouseEnter={() => setHoverRating(num)}
                      onMouseLeave={() => setHoverRating(0)}
                      role="button"
                      aria-label={`Rate ${num} stars`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {rating > 0 && (
                  <span className="rating-label">
                    {rating === 1 && 'Needs improvement'}
                    {rating === 2 && 'Okay'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Great'}
                    {rating === 5 && 'Excellent!'}
                  </span>
                )}
              </div>

              {/* Comment */}
              <div className="form-group">
                <label htmlFor="comment">Any additional comments?</label>
                <textarea
                  id="comment"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you think..."
                />
              </div>

              <div className="survey-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
                  Skip & Return
                </button>
                <button type="submit" className="submit-btn">
                  Send Feedback
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="survey-thanks">
            <div className="thanks-icon">🎉</div>
            <h2>Thank You!</h2>
            <p>Your feedback helps us make Fraye better for everyone.</p>
            <div className="thanks-actions">
              <button className="submit-btn" onClick={() => navigate('/')}>
                Back to Shop
              </button>
              <button className="cancel-btn" onClick={resetSurvey}>
                Submit Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Survey;