import { Head } from '@inertiajs/react';

export default function ChatbotPage({ response }) {
    return (
        <div className="mx-auto mt-10 max-w-xl rounded bg-white p-6 shadow">
            <Head title="AI Chatbot" />
            <h1 className="mb-4 text-2xl font-bold">AI Chatbot</h1>
            <div className="rounded border bg-gray-50 p-4">
                <div dangerouslySetInnerHTML={{ __html: response }} />
            </div>
        </div>
    );
}
