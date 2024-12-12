import React from 'react';
import clsx from 'clsx';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="form-label">
        {label}
      </label>
      <input
        {...props}
        className={clsx(
          'input',
          error && 'input-error',
          className
        )}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default FormInput;