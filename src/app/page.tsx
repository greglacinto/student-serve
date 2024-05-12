'use client'
import React, { useState } from 'react';
import acupunctureOptions from './data/acupunctureOptions.json';
import mentalTherapyOptions from './data/mentalTherapyOptions.json'
import chiropractorOptions from './data/chiropractorOptions.json'
import Calendly from './components/calendly';
import CalendlyWidget from './components/calendly';
import { useRouter } from 'next/navigation';



export default function Home() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');

    const handleNextStep = () => {
        if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        }
    };

    const handleOptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(e.target.value);
    };

    const isNextDisabled = () => {
        return currentStep === 1 && selectedOption === '';
    };

    const handleDone = () => {
        router.refresh()
    }

    const getOptionsForSelectedCategory = () => {
        switch (selectedOption) {
        case 'accupuncture':
            return acupunctureOptions;
        case 'mentalTherapy':
            return mentalTherapyOptions;
        case 'chiropractor':
            return chiropractorOptions;
        default:
            return [];
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
        {/* Top Navbar */}
        <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
            <div className='flex gap-2'>
                <h2>StudentServe</h2>
                {/* <img src="/logo.svg" alt="Logo" className="h-8" /> */}
            </div>
            <div>
            {/* Add your navigation links here */}
            <a href="#" className="text-white ml-4">Home</a>
            <a href="#" className="text-white ml-4">About</a>
            <a href="#" className="text-white ml-4">Contact</a>
            </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto py-8 mt-4">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Form */}
            <form>
                {/* Progress Bar */}
                <div className="flex mb-4">
                <div
                    className={`flex-1 ${
                    currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'
                    } h-2 rounded-full`}
                ></div>
                <div
                    className={`flex-1 ${
                    currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'
                    } h-2 rounded-full mx-2`}
                ></div>
                <div
                    className={`flex-1 ${
                    currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'
                    } h-2 rounded-full`}
                ></div>
                </div>

                {/* Form Steps */}
                {currentStep === 1 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Step 1: Choose an option </h2>
                    {/* Add fields for personal information */}
                    <div className="mb-4">
                        <label htmlFor="serviceType" className="block text-lg font-medium mb-2">
                            What service do you want?
                        </label>
                        <select 
                            id="serviceType" 
                            name="serviceType" 
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                            onChange={handleOptionChange}
                            required
                        >   
                            <option value="">Choose one</option>
                            <option value="accupuncture">Accupuncture</option>
                            <option value="mentalTherapy">Mental Therapy</option>
                            <option value="chiropractor">Chiropractor</option>
                        </select>
                    </div>
                    <button
                    type="button"
                    onClick={handleNextStep} 
                    disabled={isNextDisabled()}
                    className={isNextDisabled() ? 'bg-blue-400 text-white px-4 py-2 rounded-lg' : 'bg-blue-500 text-white px-4 py-2 rounded-lg'}
                    >
                    Next
                    </button>
                </div>
                )}
                {currentStep === 2 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Step 2: Select Service Provider</h2>
                    {/* Add fields to select massage type */}
                    {selectedOption && (
                    <div className='mb-4'>
                        <label htmlFor="serviceProvider" className="block text-lg font-medium mb-2">
                            What service provider do you want?
                        </label>
                        <select 
                            id="serviceProvider" 
                            name="serviceProvider" 
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                            // onChange={handleProviderChange}
                        >   
                            <option value="">Choose one</option>
                            {getOptionsForSelectedCategory().map((option: any, index: any) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                        </select>
                    </div>
                    )}
                    <div className="flex">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                        onClick={handlePrevStep}
                        >
                        Previous
                    </button>
                    <button
                    type="button"
                    onClick={handleNextStep}
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                    >
                        Next
                    </button>
                    </div>
                </div>
                )}
                {currentStep === 3 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Step 3: Confirm Booking</h2>
                    {/* Add fields to confirm booking */}
                    < CalendlyWidget />
                    <div className="flex">
                    {/* <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                        onClick={handlePrevStep}
                    >
                        Previous
                    </button> */}
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
            </form>
            </div>
        </div>
        </div>
    );
}
