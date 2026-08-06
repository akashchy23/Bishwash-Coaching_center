import React from 'react';
import { 
  Quote, 
  Award, 
  Users, 
  BookOpen, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  Briefcase 
} from 'lucide-react';

// Import Images from Assets Folder
import chairmanImg from '../assets/ChaimanBashar.png';
import chairmanImg1 from '../assets/chairman.jpeg';
import directorImg from '../assets/MuazzemHossen.png';
import principalImg from '../assets/Sapna.png';
import trainer1Img from '../assets/NewTon.png';
import asstTrainer1Img from '../assets/Mirfat.png';
import asstTrainer2Img from '../assets/NokibulKawsar.png';
import labAsst1Img from '../assets/Ujjal.png';
import labAsst2Img from '../assets/Rayhan.png';

const About = () => {
  // Team members list mapped to imported local images
  const teamMembers = [
    {
      id: 1,
      name: 'জনাব মোঃ শফিউল বশর',
      role: 'প্রতিষ্ঠাতা ও চেয়ারম্যান',
      
      image: chairmanImg
    },
    {
      id: 2,
      name: 'মোঃ মোয়াজ্জেম হোসেন',
      role: 'পরিচালক',
      
      image: directorImg
    },
    {
      id: 3,
      name: 'স্বপ্না রানী দে',
      role: 'প্রিন্সিপাল',
      
      image: principalImg
    },
    {
      id: 4,
      name: 'নিউটন শীল',
      role: 'ট্রেইনার',
     
      image: trainer1Img
    },
    {
      id: 5,
      name: 'নকিবুল ইসলাম কাউসার',
      role: 'সহকারী ট্রেইনার',
     
      image: asstTrainer1Img
    },
    {
      id: 6,
      name: 'সাজ্জাদ হোসেন মিরফাত',
      role: 'সহকারী ট্রেইনার',
    
      image: asstTrainer2Img
    },
    {
      id: 7,
      name: 'উজ্জ্বল দে',
      role: 'ল্যাব সহকারী',
   
      image: labAsst1Img
    },
    {
      id: 8,
      name: 'মো: আবু রায়হান',
      role: 'ল্যাব সহকারী',
    
      image: labAsst2Img
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen relative z-0">
      {/* Inline Animation Styles for Infinite Left-to-Right Marquee */}
      <style>{`
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          display: flex;
          width: max-content;
          animation: customMarquee 28s linear infinite;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* SECTION 1: CHAIRMAN'S MESSAGE */}
      <section className="relative bg-white py-16 md:py-24 px-4 border-b border-slate-200/80 overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-100/80 rounded-full blur-2xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 flex justify-center z-0">
              <div className="relative group z-0">
                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 via-blue-400 to-sky-200 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm z-0"></div>
                
                <div className="relative z-0 w-72 sm:w-80 md:w-96 h-[400px] md:h-[460px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
                  <img
                    src={chairmanImg1}
                    alt="Md Shafiul Bashar"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent lg:hidden"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center lg:hidden">
                    <h3 className="text-xl font-bold text-white">Md Shafiul Bashar</h3>
                    <p className="text-xs text-blue-200 font-semibold tracking-wider uppercase">Chairman</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content / Quote Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest w-fit mb-6">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Chairman's Message
              </div>

              <div className="relative pl-2 sm:pl-4">
                <Quote className="absolute -top-6 -left-3 sm:-left-5 w-12 h-12 text-blue-100 rotate-180 -z-10" />
                <blockquote className="relative text-slate-700 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium italic">
                  “নিজেকে গড়ার জন্য যদি মাত্র ৩৬৫ দিন কষ্ট সহ্য করতে পারেন, তাহলে বাকি পুরো জীবনটা স্বপ্নের মতো কাটবে। আর যদি এই এক বছরের কষ্ট এড়িয়ে যান, তাহলে হয়তো সারা জীবন আপনাকে কষ্টেই কাটাতে হবে। তাই আজ থেকেই শুরু করুন — নিজের স্বপ্ন, ভবিষ্যৎ আর সাফল্যের জন্য।”
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/80">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Md Shafiul Bashar
                </h3>
                <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">
                  Chairman, Mobile Lab Training Center
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: HIGHLIGHT STATS */}
      <section className="bg-slate-100/60 border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center cursor-default">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Users className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">1,500+</h4>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-1">Trained Students</p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center cursor-default">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Award className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">10+ Years</h4>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-1">Industry Experience</p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center cursor-default">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">100%</h4>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-1">Practical Focused</p>
            </div>

            <div className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center cursor-default">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Target className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Level-3</h4>
              <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mt-1">Chip Mastery</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: INSTRUCTORS & MENTORS (AUTOMATIC INFINITE MARQUEE) */}
      <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
            Instructors & Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Meet Our Expert Team
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Learn directly from seasoned engineers dedicated to turning you into a skilled hardware specialist.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0,_black_64px,_black_calc(100%-64px),_transparent_100%)]">
          <div className="animate-custom-marquee gap-8">
            {/* Duplicated list to create a seamless looping effect */}
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div
                key={`${member.id}-${idx}`}
                className="w-72 shrink-0 group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                {/* Fixed Aspect Image Frame to prevent profile distortion */}
                <div className="relative w-full h-72 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                  </div>
                  
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MISSION & VALUES */}
      <section className="bg-white py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Empowering Youth Through Hands-On Practical Skill
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Our institution focuses on practical skill transfer. From beginner soldering to complex Level-3 double-decker CPU reballing, we supply you with real-world knowledge to establish your career.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Modern Workstation Setup</h4>
                    <p className="text-sm text-slate-600">Individual thermal cameras, digital microscopes, and power supplies for every trainee.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Shop Setup & Business Support</h4>
                    <p className="text-sm text-slate-600">Lifetime guidance on tool sourcing, client management, and starting your own repair business.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Container */}
            <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                To build a world-class training center that bridges technical gaps and turns tech enthusiasts into confident, highly paid hardware engineers.
              </p>
              
              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  “Consistent effort over time guarantees transformation. Invest in your skill set today.”
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;