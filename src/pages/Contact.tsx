export default function Contact() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl uppercase tracking-[0.1em] mb-12 text-center">Contact</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-xl uppercase tracking-widest mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors resize-none" />
              </div>
              <button className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-semibold mt-8 hover:bg-gray-200 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-xl uppercase tracking-widest mb-6">Headquarters</h2>
              <p className="text-white/70 font-light leading-relaxed mb-4">
                124 Dark Avenue<br/>
                Fashion District<br/>
                New York, NY 10012
              </p>
              <p className="text-white/70 font-light">support@blackx.store</p>
              <p className="text-white/70 font-light">+1 (800) 123-4567</p>
            </div>
            
            <div className="w-full h-64 bg-[#111] relative overflow-hidden">
              <iframe
                title="BlackX HQ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2386820524823!2d-74.00160272365287!3d40.734796336214346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598d1a1b3be5%3A0x63152011116c4f82!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700684672659!5m2!1sen!2sus"
                className="w-full h-full border-0 rounded-sm filter contrast-125 opacity-80"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
