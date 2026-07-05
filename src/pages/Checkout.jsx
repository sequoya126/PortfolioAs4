import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';

// Steps for indicator
const STEPS = ['Cart Review', 'Personal Info', 'Payment', 'Confirmation'];

function Checkout() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(0);

  // Form states for personal info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postal: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Payment state (just for simulation)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Redirect if cart is empty (but only after initial load)
  if (cart.length === 0 && currentStep === 0) {
    // Optionally redirect to shop, but we'll show a message
    // Actually let's handle it in the UI
  }

  const nextStep = () => {
    if (currentStep === 0) {
      // Cart review – no validation needed
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Validate personal info
      const errors = {};
      if (!formData.name.trim()) errors.name = 'Name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.postal.trim()) errors.postal = 'Postal code is required';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Payment validation (basic)
      const errors = {};
      if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        errors.cardNumber = 'Card number must be 16 digits';
      }
      if (!paymentData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        errors.expiry = 'Use MM/YY format';
      }
      if (!paymentData.cvv.match(/^\d{3}$/)) {
        errors.cvv = 'CVV must be 3 digits';
      }
      if (Object.keys(errors).length > 0) {
        // We'll display these in a simple alert for now; could add inline later
        alert('Please fix payment details:\n' + Object.values(errors).join('\n'));
        return;
      }
      // Process order – clear cart and go to confirmation
      clearCart();
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : value;
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="checkout-step">
            <h2>Review Your Cart</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <button className="continue-shopping" onClick={() => navigate('/')}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-emoji">{item.emoji}</span>
                        <div>
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-price">${item.price.toFixed(2)} × {item.quantity}</div>
                        </div>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="next-btn" onClick={nextStep}>
                  Proceed to Personal Info
                </button>
              </>
            )}
          </div>
        );

      case 1:
        return (
          <div className="checkout-step">
            <h2>Personal Information</h2>
            <form className="info-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                  className={formErrors.address ? 'error' : ''}
                />
                {formErrors.address && <span className="error-message">{formErrors.address}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ottawa"
                    className={formErrors.city ? 'error' : ''}
                  />
                  {formErrors.city && <span className="error-message">{formErrors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="postal">Postal Code</label>
                  <input
                    type="text"
                    id="postal"
                    name="postal"
                    value={formData.postal}
                    onChange={handleInputChange}
                    placeholder="K1A 0A1"
                    className={formErrors.postal ? 'error' : ''}
                  />
                  {formErrors.postal && <span className="error-message">{formErrors.postal}</span>}
                </div>
              </div>
            </form>
            <div className="step-actions">
              <button className="prev-btn" onClick={prevStep}>Back</button>
              <button className="next-btn" onClick={nextStep}>Next: Payment</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="checkout-step">
            <h2>Payment</h2>
            <p className="payment-note">This is a simulation — no real charges will be made.</p>
            <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\s/g, '');
                    if (raw.length <= 16) {
                      handlePaymentChange({
                        target: { name: 'cardNumber', value: formatCardNumber(raw) },
                      });
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={paymentData.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length >= 2) val = val.slice(0,2) + '/' + val.slice(2,4);
                      handlePaymentChange({ target: { name: 'expiry', value: val } });
                    }}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 3) {
                        handlePaymentChange({ target: { name: 'cvv', value: val } });
                      }
                    }}
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>
            </form>
            <div className="step-actions">
              <button className="prev-btn" onClick={prevStep}>Back</button>
              <button className="next-btn" onClick={nextStep}>Place Order</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="checkout-step confirmation">
            <div className="confirmation-icon">✅</div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order. Your assets will be available in your library shortly.</p>
            <p className="confirmation-message">You will receive a confirmation email at <strong>{formData.email}</strong>.</p>
            <button className="next-btn" onClick={() => navigate('/')}>
              Return to Shop
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="checkout-container">
      {/* Step Indicator */}
      <div className="step-indicator">
        {STEPS.map((label, index) => (
          <div key={index} className={`step-item ${index <= currentStep ? 'active' : ''}`}>
            <div className="step-circle">{index + 1}</div>
            <span className="step-label">{label}</span>
            {index < STEPS.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="checkout-content">
        {renderStepContent()}
      </div>
    </div>
  );
}

export default Checkout;