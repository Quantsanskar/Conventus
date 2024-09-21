import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LearnMoreSection = () => {
    const router = useRouter();

    const sections = [
        {
            title: "ABOUT US",
            description: "Find out about the organization and mission of CONVENTUS.",
            image: "/images/coll1.png",
            route: "/aboutus"
        },
        {
            title: "COMMITTEES",
            description: "Learn about the committees being offered at CONVENTUS and explore Procedure.",
            image: "/images/coll2.png",
            route: "/committee"
        },
        {
            title: "REGISTRATION",
            description: "Registration for CONVENTUS is now open! Register yourself and Secure your spot!",
            image: "/images/coll3.png",
            route: "/registration"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-red-50 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-red-800">Learn More</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden border border-red-800 flex flex-col h-[500px]"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <motion.div
                                className="relative h-64 w-full overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </motion.div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-semibold mb-4 text-center text-red-800">{section.title}</h3>
                                <p className="text-gray-800 mb-6 text-center flex-grow">{section.description}</p>
                                <div className="flex justify-center">
                                    <motion.button
                                        className="bg-red-800 text-white px-3 py-3 rounded-full hover:bg-red-900 transition duration-300 text-sm font-semibold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => router.push(section.route)}
                                    >
                                        LEARN MORE
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearnMoreSection;