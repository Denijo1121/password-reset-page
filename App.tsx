import React, { useState, useCallback } from 'react';
import type { Language, PageContent } from './types';
import { ENGLISH_CONTENT, FRENCH_CONTENT, KANNADA_CONTENT } from './constants';
import Header from './components/Header';

// --- Helper Components defined outside the main App to prevent re-creation on re-renders ---

interface SidebarProps {
    quickLinksTitle: string;
    registrationLink: string;
    resetLink: string;
}

const Sidebar: React.FC<SidebarProps> = ({ quickLinksTitle, registrationLink, resetLink }) => (
    <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-purple-400">{quickLinksTitle}</h2>
        <a href="#" className="text-purple-300 hover:underline">{registrationLink}</a>
        <a href="#" className="text-purple-300 hover:underline">{resetLink}</a>
    </div>
);

interface ContentProps {
    content: PageContent;
}

const Content: React.FC<ContentProps> = ({ content }) => (
    <div className="flex flex-col space-y-6 text-gray-300">
        <p>{content.welcomeMessage}</p>
        <p><a href="#" className="text-blue-400 hover:underline">{content.mainLink}</a></p>
        <p>{content.pageCanBeUsedTo}</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
            {content.useCases.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p>{content.allTasksMessage}</p>
        <p className="font-bold">{content.requirementMessage}</p>
        <p>
            {content.notRegisteredMessage}{' '}
            <a href="#" className="text-blue-400 hover:underline">{content.clickHereLink}</a>.
        </p>
        <p>{content.videoTutorialsMessage}</p>
        <p>{content.queriesMessage}</p>
        <div>
            <p>{content.remoteWorkTitle}</p>
            <ol className="list-decimal list-inside space-y-2 ml-4 mt-2">
                {content.remoteWorkSteps.map((item, index) => <li key={index}>{item}</li>)}
            </ol>
        </div>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
    const [translations] = useState<Record<Language, PageContent>>({
        en: ENGLISH_CONTENT,
        fr: FRENCH_CONTENT,
        kn: KANNADA_CONTENT,
    });
    const [currentLang, setCurrentLang] = useState<Language>('en');

    const handleLanguageChange = useCallback((lang: Language) => {
        setCurrentLang(lang);
    }, []);

    const content = translations[currentLang];

    return (
        <div className="bg-[#1e1e1e] text-gray-300 min-h-screen font-sans">
            <Header onLanguageChange={handleLanguageChange} currentLang={currentLang} />
            
            <div className="bg-[#0000ff] text-white text-2xl md:text-3xl font-bold p-6 shadow-lg">
                <h1>{content.pageTitle}</h1>
            </div>

            <main className="container mx-auto p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <aside className="w-full md:w-1/4">
                        <Sidebar
                            quickLinksTitle={content.quickLinksTitle}
                            registrationLink={content.registrationLink}
                            resetLink={content.resetLink}
                        />
                    </aside>
                    <section className="w-full md:w-3/4">
                        <Content content={content} />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default App;