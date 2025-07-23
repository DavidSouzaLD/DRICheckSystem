import React, { useState } from 'react';

interface ChecklistActionsProps {
    onCopy: () => void;
    onGoBack: () => void;
}

export const ChecklistActions: React.FC<ChecklistActionsProps> = ({ onCopy, onGoBack }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    }

    return (
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={handleCopyClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md disabled:bg-green-400"
                disabled={isCopied}
            >
                {isCopied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Copiado!</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
                        </svg>
                        <span>Copiar Relatório</span>
                    </>
                )}
            </button>
             <button
                onClick={onGoBack}
                className="w-full sm:w-auto px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors"
            >
                Nova Verificação
            </button>
        </div>
    );
}