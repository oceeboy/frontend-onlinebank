"use client";

import { Eye, EyeClosed } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  label?: string;
  rules?: Partial<{
    required: string | boolean;
    maxLength: number;
    minLength: number;
  }>;
  multiline?: boolean;
  errorMessage?: string;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  required?: boolean;
  secureTextEntry?: boolean;
  textParseInt?: boolean; // Corrected typo
}

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  rules,
  multiline = false,
  errorMessage,
  inputStyle,
  containerStyle,
  required = false,
  secureTextEntry = false,
  textParseInt = false,
}: FormFieldProps<TFieldValues>): React.ReactElement {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [height, setHeight] = useState(48); // Default height for input fields
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle textarea auto-expansion
  useEffect(() => {
    if (textareaRef.current) {
      const resizeTextarea = () => {
        textareaRef.current!.style.height = "auto"; // Reset height to auto to measure scroll height
        textareaRef.current!.style.height = `${
          textareaRef.current!.scrollHeight
        }px`; // Set new height
      };

      if (textareaRef.current) {
        resizeTextarea();
      }
    }
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        ...(required && { required: "This field is required" }),
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div style={{ ...styles.container, ...containerStyle }}>
          {label && (
            <div style={styles.labelContainer}>
              <label style={styles.label}>
                {label} {required && <span style={styles.required}>*</span>}
              </label>
            </div>
          )}

          <div style={styles.inputContainer}>
            {multiline ? (
              <textarea
                ref={textareaRef}
                style={{
                  ...styles.input,
                  ...inputStyle,
                  height: height,
                  resize: "none", // Prevent resize of textarea
                  transition: "height 0.2s ease", // Smooth height transition
                }}
                placeholder={placeholder}
                value={value || ""}
                onChange={(e) => {
                  onChange(e.target.value);
                  setHeight(e.target.scrollHeight); // Update height based on content
                }}
                onBlur={onBlur}
                rows={3} // You can adjust the number of rows as necessary
                aria-label={label || placeholder}
                aria-required={required}
              />
            ) : (
              <input
                style={{
                  ...styles.input,
                  ...inputStyle,
                }}
                type={
                  secureTextEntry
                    ? isPasswordVisible
                      ? "text"
                      : "password"
                    : textParseInt
                    ? "number"
                    : "text"
                }
                placeholder={placeholder}
                value={value || ""}
                onChange={(e) =>
                  onChange(
                    textParseInt
                      ? parseInt(e.target.value || "0", 10)
                      : e.target.value
                  )
                }
                onBlur={onBlur}
                aria-label={label || placeholder}
                aria-required={required}
              />
            )}

            {secureTextEntry && (
              <button
                type="button"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIconContainer}
              >
                {isPasswordVisible ? (
                  <Eye width={20} height={20} />
                ) : (
                  <EyeClosed width={20} height={20} />
                )}
              </button>
            )}
          </div>

          {(error || errorMessage) && (
            <p style={styles.errorText}>
              {error?.message || errorMessage || "Invalid input"}
            </p>
          )}
        </div>
      )}
    />
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    marginBottom: "1rem",
  },
  labelContainer: {
    marginBottom: "0.5rem",
  },
  label: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#333",
  },
  required: {
    color: "#f60000",
    marginLeft: "0.25rem",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "0.5rem",
    height: "auto", // Allow auto-height adjustment
    minHeight: "48px", // Minimum height for input
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  eyeIconContainer: {
    marginLeft: "0.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  errorText: {
    color: "#f60000",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
  },
};
