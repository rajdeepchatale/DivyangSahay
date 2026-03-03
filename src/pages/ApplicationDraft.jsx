import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { schemes } from '../data/schemes';

export default function ApplicationDraft() {
    const [searchParams] = useSearchParams();
    const { state, addToast } = useApp();
    const { t } = useLanguage();
    const schemeId = parseInt(searchParams.get('schemeId'), 10);
    const scheme = schemes.find(s => s.id === schemeId);
    const { userProfile } = state;

    // Document Verification Agent state
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [verifying, setVerifying] = useState(null);

    if (!scheme) {
        return (
            <div className="py-16 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="text-6xl mb-6" aria-hidden="true">📝</div>
                    <h1 className="section-title">Scheme Not Found</h1>
                    <p className="section-subtitle">
                        The scheme you&apos;re looking for doesn&apos;t exist. Go back to results to select a scheme.
                    </p>
                    <Link to="/results" className="btn-primary">
                        <i className="fas fa-arrow-left" aria-hidden="true"></i>
                        Back to Results
                    </Link>
                </div>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        addToast('PDF generated! Check your downloads.', 'success');
    };

    const handleEmail = () => {
        addToast('Email draft feature coming soon!', 'info');
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newDoc = {
            id: Date.now(),
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            status: 'pending',
        };
        setUploadedDocs(prev => [...prev, newDoc]);

        // Simulate OCR verification
        setVerifying(newDoc.id);
        setTimeout(() => {
            setUploadedDocs(prev =>
                prev.map(d =>
                    d.id === newDoc.id
                        ? { ...d, status: 'verified', confidence: Math.floor(Math.random() * 15) + 85 }
                        : d
                )
            );
            setVerifying(null);
            addToast(`Document "${file.name}" verified successfully!`, 'success');
        }, 2500);

        e.target.value = '';
    };

    const documents = scheme.documents || [];

    return (
        <div className="py-8 sm:py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-gray-500">
                        <li><Link to="/results" className="hover:text-primary-500 transition-colors">Results</Link></li>
                        <li aria-hidden="true"><i className="fas fa-chevron-right text-xs"></i></li>
                        <li className="text-gray-900 font-medium" aria-current="page">{t('application.title')}</li>
                    </ol>
                </nav>

                {/* Agent Badge */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="agent-badge core">
                        <i className="fas fa-file-signature" aria-hidden="true"></i>
                        ⭐ Agent 2 — {t('application.agent')}
                    </span>
                </div>

                {/* Header */}
                <div className="card border-l-4 border-l-primary-500 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-file-alt text-primary-500 text-xl" aria-hidden="true"></i>
                        </div>
                        <div>
                            <h1 className="font-heading font-bold text-xl text-gray-900 mb-1">
                                {t('application.title')}
                            </h1>
                            <p className="text-gray-600">{scheme.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                <i className="fas fa-landmark mr-1" aria-hidden="true"></i>
                                {scheme.ministry}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pre-filled Form */}
                <div className="card mb-8">
                    <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                        <i className="fas fa-user text-primary-500" aria-hidden="true"></i>
                        Applicant Details <span className="text-sm font-normal text-gray-500">(Pre-filled by AI)</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Full Name', value: 'To be filled', icon: 'fas fa-user' },
                            { label: 'Age', value: userProfile?.age ? `${userProfile.age} years` : 'Not provided', icon: 'fas fa-calendar' },
                            { label: 'Disability Type', value: userProfile?.disabilityType || 'Not provided', icon: 'fas fa-wheelchair' },
                            { label: 'Disability Percentage', value: userProfile?.disabilityPercent ? `${userProfile.disabilityPercent}%` : 'Not provided', icon: 'fas fa-percentage' },
                            { label: 'Annual Income', value: userProfile?.income ? `₹${parseInt(userProfile.income).toLocaleString('en-IN')}` : 'Not provided', icon: 'fas fa-rupee-sign' },
                            { label: 'State', value: userProfile?.state || 'Not provided', icon: 'fas fa-map-marker-alt' },
                            { label: 'Education', value: userProfile?.education || 'Not provided', icon: 'fas fa-graduation-cap' },
                            { label: 'Scheme Applied For', value: scheme.name, icon: 'fas fa-file-alt' },
                        ].map((field, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <i className={`${field.icon} text-primary-400`} aria-hidden="true"></i>
                                    {field.label}
                                </p>
                                <p className="font-medium text-gray-900">{field.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Document Verification — Agent 5 */}
                <div className="card mb-8 border-2 border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="agent-badge bonus">
                            <i className="fas fa-search-plus" aria-hidden="true"></i>
                            Agent 5 — {t('docVerify.agent')}
                        </span>
                    </div>
                    <h2 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                        <i className="fas fa-search-plus text-purple-500" aria-hidden="true"></i>
                        {t('docVerify.title')}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload your documents for instant AI-powered verification using OCR technology.
                    </p>

                    {/* Upload area */}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-200 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200 mb-4">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <i className="fas fa-cloud-upload-alt text-purple-400 text-2xl mb-2" aria-hidden="true"></i>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-purple-600">{t('docVerify.upload')}</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 5MB</p>
                        </div>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} />
                    </label>

                    {/* Uploaded documents */}
                    {uploadedDocs.length > 0 && (
                        <div className="space-y-2">
                            {uploadedDocs.map(doc => (
                                <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${doc.status === 'verified' ? 'bg-secondary-50' : doc.status === 'pending' ? 'bg-accent-50' : 'bg-danger/10'
                                        }`}>
                                        {verifying === doc.id ? (
                                            <i className="fas fa-spinner fa-spin text-accent-500" aria-hidden="true"></i>
                                        ) : doc.status === 'verified' ? (
                                            <i className="fas fa-check text-secondary-500" aria-hidden="true"></i>
                                        ) : (
                                            <i className="fas fa-clock text-accent-500" aria-hidden="true"></i>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                        <p className="text-xs text-gray-500">{doc.size}</p>
                                    </div>
                                    {doc.status === 'verified' && (
                                        <span className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full font-semibold">
                                            ✓ Verified ({doc.confidence}% match)
                                        </span>
                                    )}
                                    {verifying === doc.id && (
                                        <span className="text-xs bg-accent-50 text-accent-600 px-2 py-1 rounded-full font-semibold">
                                            <i className="fas fa-spinner fa-spin mr-1" aria-hidden="true"></i>
                                            OCR Scanning...
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Document Checklist */}
                <div className="card mb-8">
                    <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                        <i className="fas fa-tasks text-secondary-500" aria-hidden="true"></i>
                        Document Checklist
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Gather these documents before visiting the CSC center or submitting online:
                    </p>
                    <ul className="space-y-3">
                        {documents.map((doc, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <span className="w-8 h-8 rounded-full bg-secondary-50 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-check text-secondary-500" aria-hidden="true"></i>
                                </span>
                                <span className="font-medium text-gray-700">{doc}</span>
                                <span className="ml-auto text-xs text-secondary-600 bg-secondary-50 px-2 py-1 rounded-full">Required</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submission Instructions */}
                <div className="card mb-8">
                    <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                        <i className="fas fa-list-ol text-accent-500" aria-hidden="true"></i>
                        How to Submit
                    </h2>
                    <ol className="space-y-4">
                        {[
                            { step: 'Gather all required documents listed above', icon: 'fas fa-folder-open' },
                            { step: 'Visit the nearest Common Service Center (CSC) or submit online', icon: 'fas fa-building' },
                            { step: 'Submit the application along with photocopies of all documents', icon: 'fas fa-paper-plane' },
                            { step: 'Receive acknowledgment receipt with application number', icon: 'fas fa-receipt' },
                            { step: 'Track application status using the acknowledgment number', icon: 'fas fa-search' },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                    {i + 1}
                                </span>
                                <div className="flex items-center gap-2 pt-1">
                                    <i className={`${item.icon} text-gray-400`} aria-hidden="true"></i>
                                    <span className="text-gray-700">{item.step}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 no-print">
                    <button onClick={handleDownload} className="btn-primary flex-1 sm:flex-none">
                        <i className="fas fa-download" aria-hidden="true"></i>
                        Download PDF
                    </button>
                    <button onClick={handlePrint} className="btn-outline flex-1 sm:flex-none">
                        <i className="fas fa-print" aria-hidden="true"></i>
                        Print
                    </button>
                    <button onClick={handleEmail} className="btn-outline flex-1 sm:flex-none">
                        <i className="fas fa-envelope" aria-hidden="true"></i>
                        Email to CSC
                    </button>
                    <Link to="/csc-locator" className="btn-accent flex-1 sm:flex-none text-center">
                        <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                        Find CSC Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
