import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa'

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <nav className="w-full h-12 flex justify-end">
                <section className="h-full pr-4 flex items-center space-x-4">
                    <a href="https://github.com/jonoh89" aria-label="Github Link">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/jonathanholmlund/" aria-label="LinkedIn Link">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="mailto:jonoh89@gmail.com" aria-label="Email Link" >
                        <FaEnvelope size={20} />
                    </a>
                </section>
            </nav>
            <main className="flex items-center justify-between md:p-10 flex-col lg:flex-row">
                <section className="p-12">
                    <h1 className="text-8xl min-w-fit">Hi</h1>
                    <p>{"I'm Jonathan, a developer who specialises in Web Frontend / React Native."}</p>
                    <p>With over 10 years of experience I enjoy making complex applications with simple, maintainable,
                        testable code.</p>
                </section>
                <section className="p-12 min-w-fit lg:w-full">
                    <h2>Recent work:</h2>
                    <br />
                    <ul>
                        <li>* React Native Apps</li>
                        <li>* React Websites</li>
                        <li>* Vue JS Websites</li>
                        <li>* Adobe AEM CMS Websites</li>
                        <li>* Pixi.js Slot/Scratchcards Games</li>
                        <li>* Node.js Slot server engine</li>
                        <li>* React Blackjack/Roulette Games</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}
