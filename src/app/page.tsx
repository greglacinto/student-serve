'use client'
import React, { useEffect, useState } from 'react';
import acupunctureOptions from './data/acupunctureOptions.json';
import mentalTherapyOptions from './data/mentalTherapyOptions.json';
import chiropractorOptions from './data/chiropractorOptions.json';
import dentistOptions from './data/dentistOptions.json';

import Header from './components/Header';
import CalendlyWidget from './components/calendly';
import { useRouter } from 'next/navigation';

// style
import '../app/styles/global.css';
import Testimonial from './components/Testimonial';

const totalTiles = ['Acupuncture & Massage', 'Dentist Treatment'];

export default function Home() {
    const [visibleTiles, setVisibleTiles] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleTiles((prev) => {
                if (prev < totalTiles.length) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 400); // Interval time for showing tiles
        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = () => {
        setIsVisible(!isVisible);
        setTimeout(() => {
          const elements = document.querySelectorAll('.fade-in');
          elements.forEach((el:any, index) => {
            setTimeout(() => {
              el.style.opacity = '1';
            }, index * 400); // Adjust the delay (200ms here) as needed
          });
        }, 100); // Delay to ensure elements are visible before applying opacity change
      };

    const handleNextStep = (value: any) => {
        console.log(value);
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            setSelectedOption(value);
            console.log(selectedOption);
            handleButtonClick()
        }
    };
   

    const handleCalenderLoad = (value: string) => {
        window.open(value, '_blank');
    };

    const handleDone = () => {
        router.refresh();
    }

    const getOptionsForSelectedCategory = () => {
        switch (selectedOption) {
            case 'Acupuncture & Massage':
                return acupunctureOptions;
            case 'mentalTherapy':
                return mentalTherapyOptions;
            case 'chiropractor':
                return chiropractorOptions;
            case 'Dentist Treatment':
                return dentistOptions;
            default:
                return [];
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
           <Header />

            {/* Main Content */}
            <div className="flex md:flex-row gap-3 flex-col mx-3 py-8 mt-4">
                <div className="container md:w-4/6 mx-10 mx-auto bg-white rounded-lg shadow-lg p-8">
                    {/* Form */}
                    <form>
                        {/* Progress Bar */}
                        <div className="flex mb-4">
                            <div
                                className={`flex-1 ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'} h-2 rounded-full`}
                            ></div>
                            <div
                                className={`flex-1 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'} h-2 rounded-full mx-2`}
                            ></div>
                            {/* <div
                                className={`flex-1 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'} h-2 rounded-full`}
                            ></div> */}
                        </div>

                        {/* Form Steps */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-8">Step 1: Click a service </h2>
                                <div className="mb-4 flex gap-8 justify-center">
                                    {totalTiles.map((element, index) => (
                                        <div
                                            key={index}
                                            className={`p-10 bg-gray-800 text-white hover:cursor-pointer hover:bg-gray-900 transition-opacity duration-500 ${index < visibleTiles ? 'opacity-100' : 'opacity-0'}`}
                                            onClick={() => handleNextStep(element)}
                                        >
                                            {element}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className={isVisible ? 'visible' : 'hidden'}>
                                <h2 className="text-2xl font-bold mb-8">Step 2: Click to book appointment </h2>
                                <div className="mb-4 flex flex-wrap gap-8 justify-center">
                                    {getOptionsForSelectedCategory().map((element: any, index) => (
                                        <div
                                            key={index}
                                            className={`p-10 bg-gray-800 text-white hover:cursor-pointer hover:bg-gray-900 fade-in`}
                                            onClick={() => handleCalenderLoad(element.calender)}
                                        >
                                            {element.name}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        onClick={handleDone}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Step 3: Confirm Booking</h2>
                                <CalendlyWidget />
                                <div className="flex">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        onClick={handleDone}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )} */}
                    </form>
                </div>

                <Testimonial />
            </div>

            
        </div>
    );
}
