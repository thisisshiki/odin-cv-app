// import React from 'react';
// import ContentEditable from 'react-contenteditable';

// interface EditableFieldProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder: string;
//   className?: string;
// }

// export function EditableField({ value, onChange, placeholder, className = '' }: EditableFieldProps) {
//   const contentEditable = React.useRef<HTMLElement>(null);
//   const [html, setHtml] = React.useState(value || '');

//   React.useEffect(() => {
//     setHtml(value || '');
//   }, [value]);

//   const handleChange = (evt: React.ChangeEvent<HTMLDivElement>) => {
//     const newValue = evt.target.innerHTML;
//     setHtml(newValue);
//     onChange(newValue);
//   };

//   return (
//     <ContentEditable
//       innerRef={contentEditable}
//       html={html}
//       onChange={handleChange}
//       className={`min-h-[1.5em] p-2 rounded-md ${
//         !html ? 'bg-gray-50 text-gray-400' : 'bg-transparent'
//       } hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${className}`}
//       data-placeholder={placeholder}
//     />
//   );
// }

import React from 'react';
import ContentEditable from 'react-contenteditable';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export function EditableField({ value, onChange, placeholder, className = '' }: EditableFieldProps) {
  const contentEditable = React.useRef<HTMLElement>(null);
  const [html, setHtml] = React.useState(value || '');

  React.useEffect(() => {
    setHtml(value || '');
  }, [value]);

  const handleChange = (evt: React.ChangeEvent<HTMLDivElement>) => {
    const newValue = evt.target.innerHTML;
    setHtml(newValue);
    onChange(newValue);
  };

  return (
    <ContentEditable
      innerRef={contentEditable}
      html={html}
      onChange={handleChange}
      className={`min-h-[1.5em] p-2 rounded-md ${
        !html ? 'bg-gray-50 text-gray-400' : 'bg-transparent'
      } hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${className}`}
      data-placeholder={placeholder}
    />
  );
}