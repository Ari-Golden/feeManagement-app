import { Head } from '@inertiajs/react';
import React from 'react';

interface ChatbotPageProps {
    response: string;
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ response }) => {
    return (
        <div className="mx-auto mt-10 max-w-xl rounded bg-white p-6 shadow">
            <Head title="AI Chatbot" />
            <h1 className="mb-4 text-2xl font-bold">AI Chatbot</h1>
            <div className="rounded border bg-gray-50 p-4">
                <div dangerouslySetInnerHTML={{ __html: response }} />
            </div>
        </div>
    );
};

export default ChatbotPage;
