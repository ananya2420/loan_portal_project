//Application For Structure
//add react-hook-form 
//add form progress bar

//Application For Structure


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import incomeproof from "../assets/incomeproof.png";

const UpdatedPicture = () => {
  const [preview, setPreview] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("File submitted:", data.updatedPicture[0]);
    // Handle upload or form data processing here
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-center">Upload Updated Picture</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          {...register("updatedPicture", { required: "Image is required" })}
          onChange={handleImagePreview}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        {errors.updatedPicture && (
          <p className="text-red-500 text-sm">{errors.updatedPicture.message}</p>
        )}

        <div className="text-center mt-4">
          <h4 className="font-medium mb-2">Preview</h4>
          <img
            src={preview || incomeproof}
            alt="Updated Preview"
            className="w-52 h-auto mx-auto rounded-md border"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedPicture;
