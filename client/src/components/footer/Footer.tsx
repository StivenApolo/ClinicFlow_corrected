import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Stethoscope
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight italic">Clinic<span className="text-blue-500 font-extrabold not-italic underline decoration-2 underline-offset-4">Flow</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Transforming healthcare with a digital-first approach. We eliminate long hospital queues through smart, real-time management systems.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/StivenApolo/ClinicFlow_corrected" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="Project repository">
                <Facebook className="w-5 h-5" />
              </a>
              <Link href="/works" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="How it works">
                <Twitter className="w-5 h-5" />
              </Link>
              <a href="mailto:contact@clinicflow.com" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="Contact support">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/works" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/departments" className="hover:text-blue-400 transition-colors">Find a Doctor</Link></li>
              <li><Link href="/departments" className="hover:text-blue-400 transition-colors">Book Appointment</Link></li>
              <li><Link href="/departments" className="hover:text-blue-400 transition-colors">Departments</Link></li>
            </ul>
          </div>

          {/* Column 3: Policy & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/works" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/works" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/works" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><a href="mailto:contact@clinicflow.com" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>123 Medical Avenue, Healthcare City,<br /> Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>contact@clinicflow.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} <span className="font-bold">ClinicFlow</span>. Built for efficiency.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span>Designed with ❤️ for Hackathons</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
