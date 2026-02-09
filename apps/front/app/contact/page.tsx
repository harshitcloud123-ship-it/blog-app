import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-700 min-h-screen flex flex-col pt-20">
      <div className="container mx-auto px-6 py-12 md:py-20 grow">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-12">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Email Card */}
            <a
              href="mailto: harshitcloud123@gmail.com"
              className="flex flex-col items-center p-8 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-300 group cursor-pointer border border-blue-100"
            >
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                <EnvelopeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Email Us
              </h3>
              <p className="text-slate-600 text-center mb-4">
                Send us a direct message and we'll get back to you shortly.
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                harshitcloud123@gmail.com
              </span>
            </a>

            {/* Location Card */}
            <div className="flex flex-col items-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <MapPinIcon className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Visit Us
              </h3>
              <p className="text-slate-600 text-center mb-4">
                Our office is located in the heart of the city.
              </p>
              <span className="text-slate-900 font-semibold">
                New Delhi, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <p className="text-lg font-medium text-white mb-2">
                Developed By <span className="text-blue-400"> : Harshit</span>
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <a
                  href="https://wa.me/918307845693"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-green-400 transition-colors duration-200"
                >
                  +91 83078 45693
                </a>
              </div>
            </div>
            <div className="w-12 h-1 bg-blue-600 rounded-full opacity-50"></div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} My Modern Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
