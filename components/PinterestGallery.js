import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * A reusable Pinterest-style gallery component with image filtering capabilities
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image objects to display
 * @param {Array} props.tabs - Tab options for filtering
 * @param {String} props.defaultTab - Default active tab
 * @param {Function} props.filterFunction - Function used to filter images by tab
 * @param {Boolean} props.showTabs - Whether to show filtering tabs
 */
const PinterestGallery = ({ 
    images, 
    tabs = [], 
    defaultTab = 'all', 
    filterFunction = null,
    showTabs = true
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState(defaultTab);
    
    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };
    
    const filteredImages = filterFunction 
        ? filterFunction(images, activeTab) 
        : images;

    return (
        <section className="w-full">
            {showTabs && tabs.length > 0 && (
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-8 flex-wrap">
                    {tabs.map((tab) => (
                        <button 
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-3 sm:px-5 py-2 rounded-full font-medium transition-all duration-300 m-1 sm:m-2 text-sm sm:text-base ${
                                activeTab === tab.value 
                                    ? 'bg-red-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="break-inside-avoid mb-4 relative overflow-hidden rounded-lg cursor-pointer shadow-md"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => openModal(image)}
                            >
                                <div className="relative">
                                    <img
                                        src={typeof image === 'string' ? image : image.src}
                                        alt={image.alt || `Gallery image ${index + 1}`}
                                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                        loading={index < 12 ? "eager" : "lazy"}
                                    />
                                    {image.badge && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                            <span className="text-white text-xs sm:text-sm font-medium m-2 sm:m-3 px-2 py-1 bg-red-600 rounded-full">{image.badge}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-screen-lg max-h-screen overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative flex items-center justify-center">
                                <img
                                    src={typeof selectedImage === 'string' ? selectedImage : selectedImage.src}
                                    alt={selectedImage.alt || "Expanded gallery image"}
                                    className="max-h-[85vh] max-w-full object-contain"
                                />
                                <motion.button
                                    className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 z-10"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeModal}
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PinterestGallery;