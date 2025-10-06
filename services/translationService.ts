import { GoogleGenAI, Type } from "@google/genai";
import type { PageContent, Language } from '../types';
import { ENGLISH_CONTENT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLanguageName = (lang: Language): string => {
    switch (lang) {
        case 'fr': return 'French';
        case 'kn': return 'Kannada';
        default: return 'English';
    }
};

const pageContentSchema = {
    type: Type.OBJECT,
    properties: {
        pageTitle: { type: Type.STRING },
        quickLinksTitle: { type: Type.STRING },
        registrationLink: { type: Type.STRING },
        resetLink: { type: Type.STRING },
        welcomeMessage: { type: Type.STRING },
        mainLink: { type: Type.STRING },
        pageCanBeUsedTo: { type: Type.STRING },
        useCases: { type: Type.ARRAY, items: { type: Type.STRING } },
        allTasksMessage: { type: Type.STRING },
        requirementMessage: { type: Type.STRING },
        notRegisteredMessage: { type: Type.STRING },
        clickHereLink: { type: Type.STRING },
        videoTutorialsMessage: { type: Type.STRING },
        queriesMessage: { type: Type.STRING },
        remoteWorkTitle: { type: Type.STRING },
        remoteWorkSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
    }
};

export const translateContent = async (
    targetLanguage: Language
): Promise<PageContent> => {
    if (targetLanguage === 'en') {
        return ENGLISH_CONTENT;
    }

    const languageName = getLanguageName(targetLanguage);
    const prompt = `Translate the values in the following JSON object from English to ${languageName}. Return ONLY the translated JSON object with the same keys and structure. Do not add any explanation or markdown formatting. \n\n${JSON.stringify(ENGLISH_CONTENT, null, 2)}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: pageContentSchema,
            },
        });

        const jsonText = response.text.trim();
        const translated = JSON.parse(jsonText);
        return translated as PageContent;

    } catch (error) {
        console.error(`Error translating content to ${languageName}:`, error);
        // Fallback to English content on error
        alert(`Failed to translate content to ${languageName}. Please check the console for details.`);
        return ENGLISH_CONTENT;
    }
};