import React from "react";

// Helper functions for generating height options
export const generateFeetOptions = () => {
  const options = [];
  for (let feet = 4; feet <= 7; feet++) {
    options.push({ value: feet.toString(), label: `${feet} ft` });
  }
  return options;
};

export const generateInchesOptions = () => {
  const options = [];
  for (let inches = 0; inches <= 11; inches++) {
    options.push({ value: inches.toString(), label: `${inches} in` });
  }
  return options;
};

export const parseHeight = (heightString) => {
  if (!heightString) return { feet: "5", inches: "0" }; // Default height if not provided
  const match = heightString.match(/(\d+)'(\d+)"/);
  return match ? { feet: match[1], inches: match[2] } : { feet: "5", inches: "0" };
};

// Height Dropdowns Component
export function HeightDropdowns({ value, onChange, isEditing }) {
  if (!value) return null;

  if (isEditing) {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Height
        </label>
        <div className="flex gap-2">
          <select
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="height.feet"
            value={value.feet || ""}
            onChange={onChange}
          >
            <option value="">Feet</option>
            {generateFeetOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="height.inches"
            value={value.inches || ""}
            onChange={onChange}
          >
            <option value="">Inches</option>
            {generateInchesOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Height
        </label>
        <p className="text-gray-600">
          {`${value.feet || ""}' ${value.inches || ""}"`}
        </p>
      </div>
    );
  }
}

// InfoRow Component
export function InfoRow({
  label,
  value,
  isEditing,
  name,
  onChange,
  type = "text",
  options,
  isPassword,
}) {
  const getDisplayValue = () => {
    if (type === "select" && options) {
      // Handle different types of values
      if (typeof value === "boolean") {
        return value ? "Yes" : "No";
      }
      if (value === undefined || value === null || value === "") {
        return "";
      }
      const option = options.find((opt) => opt.value === value.toString());
      return option ? option.label : value;
    }
    if (isPassword) {
      return "••••••••";
    }
    return value;
  };

  if (name === "height") {
    return (
      <HeightDropdowns
        value={value}
        onChange={onChange}
        isEditing={isEditing}
      />
    );
  }

  if (isEditing) {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        {type === "select" ? (
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name={name}
            value={value}
            onChange={onChange}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={label}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <p className="text-gray-600">{getDisplayValue()}</p>
      </div>
    );
  }
}

// Section Container
export function SectionContainer({ title, children, isLoading }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg md:text-xl text-[#111111] mb-4">{title}</h3>
      {isLoading ? <p className="text-gray-600">Loading...</p> : children}
    </div>
  );
}

// Edit Buttons
export function EditButtons({ isEditing, onSave, onCancel, onEdit, isSaving }) {
  if (isEditing) {
    return (
      <div className="mt-6 flex space-x-4">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={onEdit}
      className="mt-6 px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
    >
      Edit
    </button>
  );
}

export default {
  InfoRow,
  HeightDropdowns,
  SectionContainer,
  EditButtons,
  generateFeetOptions,
  generateInchesOptions,
  parseHeight
};