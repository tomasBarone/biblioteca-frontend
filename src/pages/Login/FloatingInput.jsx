
import React from 'react';

const FloatingInput = ({ id, label, type = 'text', value, onChange, required }) => {
  return (
    <div className="floating-group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" " /* IMPORTANTE: Deja un espacio en blanco */
        className="floating-input"
      />
      <label htmlFor={id} className="floating-label">
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;