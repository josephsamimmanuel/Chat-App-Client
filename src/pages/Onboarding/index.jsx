import React, { useState } from 'react'
import { onboardingRoute } from '../../apiCallls/onboardingRoute'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../../redux/loader'
import { uploadImage } from '../../apiCallls/uploadRoute'

function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user.data);
  const [nativeLanguages] = useState(['English', 'Hindi', 'Marathi', 'Kannada', 'Telugu', 'Tamil', 'Urdu', 'Punjabi', 'Bengali', 'Odia', 'Gujarati', 'Assamese', 'Nepali', 'Sanskrit', 'Arabic', 'Persian', 'Turkish', 'Korean', 'Japanese', 'Chinese', 'Kurdish', 'Hebrew', 'Greek', 'Romanian', 'Bulgarian', 'Croatian', 'Czech', 'Danish', 'Dutch', 'Estonian', 'Finnish', 'French', 'German', 'Hungarian', 'Icelandic', 'Italian', 'Latvian', 'Lithuanian', 'Macedonian', 'Maltese', 'Norwegian', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Slovak', 'Slovenian', 'Spanish', 'Swedish', 'Thai', 'Turkish', 'Ukrainian', 'Vietnamese', 'Welsh', 'Yiddish', 'Zulu']);
  const [learningLanguages] = useState(['English', 'Hindi', 'Marathi', 'Kannada', 'Telugu', 'Tamil', 'Urdu', 'Punjabi', 'Bengali', 'Odia', 'Gujarati', 'Assamese', 'Nepali', 'Sanskrit', 'Arabic', 'Persian', 'Turkish', 'Korean', 'Japanese', 'Chinese', 'Kurdish', 'Hebrew', 'Greek', 'Romanian', 'Bulgarian', 'Croatian', 'Czech', 'Danish', 'Dutch', 'Estonian', 'Finnish', 'French', 'German', 'Hungarian', 'Icelandic', 'Italian', 'Latvian', 'Lithuanian', 'Macedonian', 'Maltese', 'Norwegian', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Slovak', 'Slovenian', 'Spanish', 'Swedish', 'Thai', 'Turkish', 'Ukrainian', 'Vietnamese', 'Welsh', 'Yiddish', 'Zulu']);

  const [formData, setFormData] = useState({
    profilePicture: user.data.profilePicture || 'https://avatar.iran.liara.run/public/12',
    username: user.data.username || '',
    bio: user.data.bio || '',
    location: user.data.location || '',
    nativeLanguage: user.data.nativeLanguage || '',
    learningLanguage: user.data.learningLanguage || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      toast.loading('Onboarding...');
      const response = await onboardingRoute(formData);
      if (response) {
        dispatch(setIsLoading(false));
        toast.dismiss();
        toast.success('Onboarding completed');
        navigate('/');
      } else {
        dispatch(setIsLoading(false));
        toast.dismiss();
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(setIsLoading(false));
      toast.dismiss();
      toast.error('Something went wrong');
      console.log(error);
    }
  }

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!formData.profilePicture) {
      toast.error("Please select an image to upload");
      return;
    }

    try {
      toast.loading("Uploading image...");
      const response = await uploadImage(formData.profilePicture);
      if (response) {
        console.log(response);
        setFormData({
          ...formData,
          profilePicture: response.url
        });
        toast.dismiss();
        toast.success(response.message);
      } else {
        toast.dismiss();
        toast.error(response.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to upload image");
    }
  };

  const handleFileGenerate = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const imageUrl = `https://avatar.iran.liara.run/public/${randomNumber}`;
    console.log(imageUrl);
    setFormData({
      ...formData,
      profilePicture: imageUrl
    });
  }

  console.log(formData);

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8'>
            {user ? 'Edit Profile' : 'Complete your profile'}
          </h1>

          <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 space-y-6'>
            {/* Profile Picture Section */}
            <div className='flex flex-col items-center gap-6'>
              <div className='relative'>
                <img
                  src={formData.profilePicture}
                  className='rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover border-4 border-blue-100'
                  alt="Profile"
                />
              </div>

              <div className='w-full max-w-md'>
                <input
                  type="file"
                  className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, profilePicture: file });
                    }
                  }}
                />

                <div className='flex flex-col sm:flex-row gap-3 mt-4'>
                  <button
                    type="button"
                    className='flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
                    onClick={handleUploadImage}
                  >
                    Upload Picture
                  </button>
                  <button
                    type="button"
                    className='flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
                    onClick={handleFileGenerate}
                  >
                    Generate Avatar
                  </button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className='space-y-6'>
              {/* Username */}
              <div className='form-group'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="username">
                  Username
                </label>
                <input
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  type="text"
                  id="username"
                  required
                  value={formData.username}
                  placeholder='Enter your username'
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              {/* Bio */}
              <div className='form-group'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="bio">
                  Bio
                </label>
                <textarea
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px]'
                  id="bio"
                  required
                  value={formData.bio}
                  placeholder='Tell us about yourself'
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              {/* Language Selection */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Native Language */}
                <div className='form-group'>
                  <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="nativeLanguage">
                    Native Language
                  </label>
                  <select
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    id="nativeLanguage"
                    required
                    value={formData.nativeLanguage}
                    onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                  >
                    <option value="">Select Native Language</option>
                    {nativeLanguages.map((language, index) => (
                      <option key={index} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                {/* Learning Language */}
                <div className='form-group'>
                  <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="learningLanguage">
                    Learning Language
                  </label>
                  <select
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    id="learningLanguage"
                    required
                    value={formData.learningLanguage}
                    onChange={(e) => setFormData({ ...formData, learningLanguage: e.target.value })}
                  >
                    <option value="">Select Learning Language</option>
                    {learningLanguages.map((language, index) => (
                      <option key={index} value={language}>{language}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className='form-group'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="location">
                  Location
                </label>
                <input
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  placeholder='Enter your location'
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex flex-col sm:flex-row sm:justify-start gap-4">
              <button
                className="w-full sm:w-auto min-w-[200px] bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-base font-medium transition-colors duration-200"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-base font-medium transition-colors duration-200"
              >
                {user ? 'Edit Profile' : 'Complete Profile'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding;
