import { MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">Project Information</h3>
              <p className="text-gray-400 leading-relaxed">
                An educational RSA cryptography demonstration developed by RUPP IT Engineering students 
                as part of their Discrete Mathematics curriculum.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">Academic Institution</h3>
              <div className="space-y-2 text-gray-400">
                <p>Royal University of Phnom Penh</p>
                <p>Information Technology Engineering</p>
                <p>Discrete Mathematics Course</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  RUPP Campus, Phnom Penh
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Academic Department
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 RUPP IT Engineering Students - Discrete Mathematics RSA Project
            </p>
          </div>
        </div>
        </footer>
  )
}
