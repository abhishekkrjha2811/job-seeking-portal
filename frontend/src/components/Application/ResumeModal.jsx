import { FiX } from 'react-icons/fi';

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <FiX className="w-6 h-6 text-gray-700" />
        </button>
        <div className="p-6">
          <img 
            src={imageUrl} 
            alt="Resume" 
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
