


"use client";



// import PrivateHeader from "../components/privateHeader";

import React from 'react'
import { LuArrowDownRight, LuCheck, LuShieldCheck, LuRefreshCw, LuUsers } from 'react-icons/lu'
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/footer';
import PrivateHeader from '@/components/privateHeader';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">
              {/* <PrivateHeader dashboard="/dashboard/sign_to_text" /> */}
              <PrivateHeader />

              {/* MAIN Section with Background Image */}
            
            {/* MAIN CONTENT */}
            <div className="flex-grow">
                {/* hero section */}
                <section
                    className="min-h-[80vh] flex items-center bg-cover bg-center px-7"
                    style={{ backgroundImage: "url('/banner.png')" }}
                >
                    <div className="max-w-3xl px-6 flex flex-col mt-36">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1E63D0] mb-6">
                            About SignSpeek
                        </h1>

                        <p className="text-lg md:text-xl leading-relaxed text-[#3C4043] mb-6">
                            SignSpeek is an AI-powered sign language translator designed to bridge the
                            communication gap between the deaf and hearing communities through
                            accessible and real-time translation.
                        </p>

                        <Link
                            href="/"
                            className="group bg-[#1E63D0] text-white font-bold px-6 py-3 w-52 rounded-xl shadow-md hover:bg-white hover:text-[#1E63D0] hover:border hover:border-[#1E63D0] transition duration-300 flex items-center justify-center gap-2"
                        >
                            Get Started
                            <LuArrowDownRight
                                size={18}
                                className="transition-transform duration-300 group-hover:rotate-[316deg]"
                            />
                        </Link>
                    </div>
                </section>

 {/* SignSpeek in Numbers */}
            <section className=" p-10 py-16 bg-[#fbfbfb]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    <div className="text-[#2B3B4F] font-bold text-center flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl p-6 h-[200px]">
                        <h1 className="text-5xl mb-2 text-[#1E63D0]">95%</h1>
                        <p className="text-gray-600 font-medium">Model Accuracy</p>
                    </div>
                    <div className="text-[#2B3B4F] font-bold text-center flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl p-6 h-[200px]">
                        <h1 className="text-5xl mb-2 text-[#1E63D0]">1000+</h1>
                        <p className="text-gray-600 font-medium">Dataset Signs</p>
                    </div>
                    <div className="text-[#2B3B4F] font-bold text-center flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl p-6 h-[200px]">
                        <h1 className="text-5xl mb-2 text-[#1E63D0]">2</h1>
                        <p className="text-gray-600 font-medium">Languages (EN/UR)</p>
                    </div>
                    <div className="text-[#2B3B4F] font-bold text-center flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl p-6 h-[200px]">
                        <h1 className="text-5xl mb-2 text-[#1E63D0]">24/7</h1>
                        <p className="text-gray-600 font-medium">AI Assistance</p>
                    </div>
                </div>
            </section>


                {/* Our Mission */}
                 <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="inline-block text-4xl font-bold text-[#2B3B4F] border-b-4 border-[#155ABF] pb-2">
                                Our Mission
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                At SignSpeek, our mission is to eliminate the communication barriers
                                that isolate the deaf and mute community from the hearing world.
                                We believe that every individual deserves to be understood.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-[#1E63D0] rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <p className="text-gray-700"><strong>Independence:</strong> Reducing reliance on human interpreters.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-[#1E63D0] rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <p className="text-gray-700"><strong>Bilingual Support:</strong> Bridging gaps in both English and Urdu.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-[#1E63D0] rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <p className="text-gray-700"><strong>Real-time AI:</strong> Delivering instant translation for seamless flow.</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 bg-[#f0f7ff] rounded-3xl p-1 border-2 border-dashed border-[#1E63D0]/20 flex items-center justify-center h-80">
                            <img src="/about2.png" className="w-full h-full rounded-3xl object-cover" alt="People talking" />
                        </div>
                    </div>
                </div>
            </section>
                {/* Why Choose Us */}

                     <section className="py-16 px-6 md:px-20 bg-gray-50">
                <div className="max-w-6xl mx-auto  mb-12">
                    <h2 className="inline-block text-4xl font-bold text-[#2B3B4F] border-b-4 border-[#155ABF] pb-2">Why Choose SignSpeek</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border-b-4 border-[#155ABF]">
                        <LuCheck size={48} className="text-[#1E63D0]" />
                        <h3 className="text-xl font-semibold text-[#3C4043]">Two-Way Translation</h3>
                        <p className="text-gray-600 text-sm">
                            Our platform bridges the gap between different communication styles by offering a seamless two-way  translation system. It utilizes advanced computer vision to capture and translate physical sign language gestures into real-time text and speech, and also providing a reverse module that converts typed or spoken input into high-quality, 3D animated sign language representations for a truly inclusive experience.
                        </p>
                    </div>


                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border-b-4 border-[#155ABF]">
                        <LuShieldCheck size={48} className="text-[#1E63D0]" />
                        <h3 className="text-xl font-semibold text-[#3C4043]">Accessible AI Chatbot</h3>
                        <p className="text-gray-600 text-sm">
                            SignSpeek features a specialized assistant designed to streamline the user experience. By handling structured queries and providing instant navigation guidance, the chatbot ensures that users can efficiently switch between Sign-to-Text and Text-to-Sign modules without technical confusion.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border-b-4 border-[#155ABF]">
                        <LuRefreshCw size={48} className="text-[#1E63D0]" />
                        <h3 className="text-xl font-semibold text-[#3C4043]">Inclusive Design</h3>
                        <p className="text-gray-600 text-sm">
                            Built with a deep focus on the deaf and mute community, SignSpeek prioritizes natural human interaction. By supporting both English and Urdu dialects, we ensure that our technology caters to local cultural needs while promoting equal opportunities in global education and workplaces.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border-b-4 border-[#155ABF]">
                        <LuUsers size={48} className="text-[#1E63D0]" />
                        <h3 className="text-xl font-semibold text-[#3C4043]">Reliable & User-Friendly</h3>
                        <p className="text-gray-600 text-sm">
                            Engineered for high-performance and ease of use, the platform offers a seamless experience across web and mobile devices. It is specifically optimized to be a dependable tool for students, medical professionals, and educators to facilitate daily communication without barriers.                            </p>
                    </div>
                </div>
            </section>
                {/* Meet Our Team */}
                 <section className="py-20 px-5 bg-[#f5f5f5]">
                <div className="max-w-7xl mx-auto">

                    <div className="max-w-6xl mx-auto  mb-12">
                        <h2 className="inline-block text-4xl font-bold text-[#2B3B4F] border-b-4 border-[#155ABF] pb-2">Meet Our Team</h2>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/*  Zujaja */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md text-center border border-gray-100">
                            <div className="relative h-80 w-full bg-gray-200">
                                <Image
                                    src="/img1.png"
                                    alt="Zujaja Rasheed Abbasi"
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#2B3B4F]">Zujaja Rasheed Abbasi</h3>
                                <p className="text-[#1E63D0] font-semibold text-xs mt-1 uppercase">Full Stack AI Developer</p>
                            </div>
                        </div>

                        {/*  Wajeeha */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md text-center border border-gray-100">
                            <div className="relative h-80 w-full bg-gray-200">
                                <Image
                                    src="/img3.png"
                                    alt="Wajeeha Nawaz Khan"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#2B3B4F]">Wajeeha Nawaz Khan</h3>
                                <p className="text-[#1E63D0] font-semibold text-xs mt-1 uppercase">Full Stack AI Developer</p>
                            </div>
                        </div>

                        {/* Wania */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md text-center border border-gray-100">
                            <div className="relative h-80 w-full bg-gray-200">
                                <Image
                                    src="/img2.png"
                                    alt="Wania Imran Khan"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#2B3B4F]">Wania Khan</h3>
                                <p className="text-[#1E63D0] font-semibold text-xs mt-1 uppercase">Full Stack AI Developer</p>
                            </div>
                        </div>

                        {/* Supervisor */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md text-center border border-gray-100">
                            <div className="relative h-80 w-full bg-gray-200">
                                <Image
                                    src="/img4.png"
                                    alt="Ma'am Saima Nadeem"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#2B3B4F]">Ma'am Saima Nadeem</h3>
                                <p className="text-[#1E63D0] font-semibold text-xs mt-1 uppercase">Project Supervisor</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
             
            </div>

            {/* FOOTER — always at bottom */}
            <Footer />
        </div>
    )
}

export default About