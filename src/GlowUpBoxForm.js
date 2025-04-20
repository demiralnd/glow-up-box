import React, { useState } from 'react';
import { UserIcon, MailIcon, CameraIcon, AlertCircleIcon } from 'lucide-react';

export default function GlowUpBoxForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    skinConcern: ''
  });

  const [generatedImage, setGeneratedImage] = useState(null);
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);
  const [showLogoAnimation, setShowLogoAnimation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [careType, setCareType] = useState('face');

  const faceOptions = [
    { value: 'scar', label: 'Sivilce İzi Karşıtı' },
    { value: 'acne', label: 'Sivilce Karşıtı' },
    { value: 'blackhead', label: 'Siyah Nokta' },
    { value: 'dry', label: 'Kuru Cilt' },
    { value: 'oily', label: 'Yağlı Cilt' },
    { value: 'antiaging', label: 'Yaşlanma Karşıtı' },
    { value: 'sensitive', label: 'Hassas Cilt' }
  ];

  const bodyOptions = [
    { value: 'normal', label: 'Normal Cilt' },
    { value: 'dry', label: 'Kuru Cilt' },
    { value: 'verydry', label: 'Çok Kuru Cilt' },
    { value: 'sensitive', label: 'Hassas Ciltler' }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData({ ...formData, image: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image || formData.image.length === 0) return;
    const dummyImageUrl = URL.createObjectURL(formData.image[0]);
    setGeneratedImage(dummyImageUrl);
    setShowLogoAnimation(true);
    setShowGeneratedImage(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setShowLogoAnimation(false);
      setShowGeneratedImage(true);
    }, 10000);
  };

  const currentOptions = careType === 'face' ? faceOptions : bodyOptions;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl px-6 lg:px-10 py-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-10">Glow Up Box Automation</h1>
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-500" /> Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 appearance-none"
                  placeholder="Simge Ekiz"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <MailIcon className="w-5 h-5 text-gray-500" /> E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-800 appearance-none"
                  placeholder="isim@mail.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <CameraIcon className="w-5 h-5 text-gray-500" /> Fotoğraf
                </label>
                <label className="flex items-center justify-center w-full px-4 py-2 bg-neutral-800 text-white rounded-lg cursor-pointer hover:bg-neutral-900 transition-colors">
                  Fotoğraf Yükle
                  <input
                    type="file"
                    name="image"
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                </label>
                {formData.image && (
                  <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                    {formData.image.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <AlertCircleIcon className="w-5 h-5 text-gray-500" /> Ne tarz ürünler istersiniz?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCareType('face')}
                    className={`flex-1 py-2 rounded-lg border ${careType === 'face' ? 'bg-neutral-800 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    Yüz Bakımı
                  </button>
                  <button
                    type="button"
                    onClick={() => setCareType('body')}
                    className={`flex-1 py-2 rounded-lg border ${careType === 'body' ? 'bg-neutral-800 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    Vücut Bakımı
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <AlertCircleIcon className="w-5 h-5 text-gray-500" /> Cilt Problemi
                </label>
                <select
                  name="skinConcern"
                  value={formData.skinConcern}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                  required
                >
                  <option value="">Cilt probleminizi seçin</option>
                  {currentOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input type="hidden" name="skinConcern" value={formData.skinConcern} required />
              </div>
              {showLogoAnimation ? (
                <div className="w-full flex justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 border-4 border-white border-t-neutral-800 rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 mt-1">Hazırlanıyor...</p>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-neutral-800 hover:bg-neutral-900 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Oluştur
                </button>
              )}
            </form>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center border rounded-xl px-4 py-6">
            {showLogoAnimation && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Neutrogena_logo.svg/2560px-Neutrogena_logo.svg.png"
                alt="Neutrogena Logo"
                className="w-60 animate-pulse"
              />
            )}
            {!isSubmitted && !showLogoAnimation && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Neutrogena_logo.svg/2560px-Neutrogena_logo.svg.png"
                alt="Neutrogena Logo"
                className="w-60"
              />
            )}
            {showGeneratedImage && (
              <img
                src={generatedImage}
                alt="Generated Result"
                className="w-full rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
