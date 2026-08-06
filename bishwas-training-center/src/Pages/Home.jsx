import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

// Asset Imports
import image1 from '../assets/photo1.jpeg';
import image2 from '../assets/photo2.jpeg';
import image3 from '../assets/photo3.jpeg';
import image4 from '../assets/photo4.jpeg';
import image5 from '../assets/photo5.jpeg';

const Home = () => {
  const slides = [
    {
      id: 1,
      title: "Master Smartphone Repairing & Hardware",
      subtitle: "Hands-on practical training with industry experts and advanced diagnostic tools.",
      image: image1,
    },
    {
      id: 2,
      title: "Master Smartphone Repairing & Hardware",
      subtitle: "Hands-on practical training with industry experts and advanced diagnostic tools.",
      image: image2,
    },
    {
      id: 3,
      title: "Master Smartphone Repairing & Hardware",
      subtitle: "Hands-on practical training with industry experts and advanced diagnostic tools.",
      image: image3,
    },
    {
      id: 4,
      title: "Master Smartphone Repairing & Hardware",
      subtitle: "Hands-on practical training with industry experts and advanced diagnostic tools.",
      image: image4,
    },
    {
      id: 5,
      title: "Master Smartphone Repairing & Hardware",
      subtitle: "Hands-on practical training with industry experts and advanced diagnostic tools.",
      image: image5,
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    course: 'Level-3 Chip Level Repair',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-play slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Connect your submission logic/API call here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', course: 'Level-3 Chip Level Repair', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen relative z-0">
      
      {/* SECTION 1: HEADER & CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-20">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">
            Training Lab Showcase
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Inside Our Professional Training Center
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-base md:text-lg">
            Take a visual tour of our state-of-the-art repair workstation, modern diagnostic machinery, and practical student environments.
          </p>
        </div>

        {/* Carousel Wrapper - Kept low z-index so sticky navbar stays on top */}
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl z-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-end justify-start ${
                index === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

              {/* Slide Details */}
              <div className="relative z-10 p-6 md:p-10 max-w-3xl">
                <span className="bg-blue-600/30 text-blue-200 border border-blue-400/40 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  Module 0{slide.id} Focus
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-white mt-3 drop-shadow-sm">
                  {slide.title}
                </h2>
                <p className="text-slate-200 text-sm md:text-base mt-2 drop-shadow-sm">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Indicators */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-8 bg-blue-500 shadow-md" 
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: COURSE OVERVIEW & ADMISSION CTA (Full-width section style) */}
      <section className="bg-white py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">
                Comprehensive Mobile Engineering Course
              </span>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 leading-tight">
                Transform Into a Certified Repair Specialist.
              </h2>

              <p className="text-slate-600 text-base md:text-lg mt-6 leading-relaxed">
                Our complete mobile technician program covers everything from foundational circuit theory to complex double-decker CPU reballing and modern iOS/Android firmware flashing. Designed specifically for beginners and practicing technicians looking to upgrade to Level-3 chip-level mastery.
              </p>

              {/* Key Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-sm font-medium text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  100% Practical Lab Classes
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  Schematic Diagrams & Tracing
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  Live Customer Device Troubleshooting
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  Lifetime Alumni Support & Shop Setup
                </div>
              </div>

              {/* Admission CTA Button */}
              <div className="mt-10">
                <Link to="/admission">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base md:text-lg px-8 py-4 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                    Apply for Admission &rarr;
                  </button>
                </Link>
              </div>
            </div>

            {/* Side Feature Highlights */}
            <div className="lg:col-span-5 bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Why Students Choose Us
              </h3>
              
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h4 className="font-semibold text-slate-900">Modern Workstations</h4>
                  <p className="text-slate-600 text-sm mt-1">Individual microscopes, thermal cameras, and digital power supplies for every student.</p>
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <h4 className="font-semibold text-slate-900">Expert Instructors</h4>
                  <p className="text-slate-600 text-sm mt-1">Learn directly from senior hardware engineers with 10+ years of shop experience.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">Flexible Batch Timing</h4>
                  <p className="text-slate-600 text-sm mt-1">Morning, evening, and weekend batches tailored for full-time workers and students.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section className="bg-slate-100/70 py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-5">
              <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Have Questions? Talk to Our Admissions Team
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Whether you want to visit our lab, inspect our tools, or ask about upcoming batch dates, drop us a message or call us directly.
              </p>

              <div className="mt-8 space-y-5 text-slate-700 font-medium">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold">Training Center Location</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Main Lab Complex, Chittagong, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold">Phone & WhatsApp</h4>
                    <p className="text-sm text-slate-600 mt-0.5">+880 1800-000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold">Email Support</h4>
                    <p className="text-sm text-slate-600 mt-0.5">info@mobilelabtraining.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-slate-200/80 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-lg">Thank You!</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    Your inquiry has been received. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Tanvir Hasan"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-slate-800 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone Number or Email *
                      </label>
                      <input
                        type="text"
                        name="contact"
                        required
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="017xxxxxxxx or email"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-slate-800 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Course Interest
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-slate-800 text-sm transition-all"
                    >
                      <option value="Level-3 Chip Level Repair">Level-3 Chip Level Repair</option>
                      <option value="Basic to Advanced Micro-Soldering">Basic to Advanced Micro-Soldering</option>
                      <option value="Software Unlocking & Flashing">Software Unlocking & Flashing</option>
                      <option value="Custom Consultation">Custom Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ask about batch timings, fee structure, or lab equipment..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-slate-800 text-sm transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;