'use client'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Navigation: [
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' }
        ],
        Social: [
            { name: 'GitHub', href: 'https://github.com/yogeshthapa-7' },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/yogesh-thapa' },
        ]
    }

    return (
        <footer className="relative bg-black border-t border-white/10 text-sm">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            <div className="container py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Y</span>
                            </div>
                            <span
                                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight"
                            >
                                Yogesh Thapa
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Creating digital experiences that blend aesthetics with functionality.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.Navigation.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-500 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 tracking-wide">Connect</h3>
                        <ul className="space-y-3">
                            {footerLinks.Social.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs md:text-sm">
                        <p>
                            &copy; {currentYear} Yogesh Thapa. All rights reserved.
                        </p>
                        <p>
                            Built with <span className="text-purple-400">Next.js</span> & <span className="text-blue-400">Tailwind CSS</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
