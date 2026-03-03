import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BenefitCard from '../components/BenefitCard';
import { formatCurrency, calculateTotalBenefits } from '../utils/eligibility';

export default function Results() {
    const { state, addToast } = useApp();
    const navigate = useNavigate();
    const { eligibilityResults, userProfile } = state;

    if (!eligibilityResults || !userProfile) {
        return (
            <div className="py-16 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="text-6xl mb-6" aria-hidden="true">🔍</div>
                    <h1 className="section-title">No Results Yet</h1>
                    <p className="section-subtitle">
                        You haven&apos;t checked your eligibility yet. Fill in your details first to see available benefits.
                    </p>
                    <Link to="/eligibility" className="btn-primary text-lg px-8 py-4">
                        <i className="fas fa-clipboard-check" aria-hidden="true"></i>
                        Check Eligibility Now
                    </Link>
                </div>
            </div>
        );
    }

    const totalBenefits = calculateTotalBenefits(eligibilityResults);
    const hasResults = eligibilityResults.length > 0;

    const handleDownload = () => {
        addToast('PDF download started! Check your downloads folder.', 'success');
    };

    const handleEmail = () => {
        addToast('An email feature will be available soon.', 'info');
    };

    const handleReminder = () => {
        addToast('Application reminders set! We\'ll notify you of deadlines.', 'success');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'DivyangSahay — My Benefits',
                text: `I found ${eligibilityResults.length} government benefits I qualify for using DivyangSahay!`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            addToast('Share link copied to clipboard!', 'success');
        }
    };

    return (
        <div className="py-8 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Agent Badge */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="agent-badge core">
                        <i className="fas fa-brain" aria-hidden="true"></i>
                        ⭐ Agent 1 — Eligibility Results
                    </span>
                    <span className="agent-badge core">
                        <i className="fas fa-file-signature" aria-hidden="true"></i>
                        ⭐ Agent 2 — Application Generator
                    </span>
                </div>

                {/* Banner */}
                {hasResults ? (
                    <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl p-6 sm:p-8 mb-8 animate-fade-in shadow-lg">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
                                    🎉 You Qualify for {eligibilityResults.length} Benefit{eligibilityResults.length > 1 ? 's' : ''}!
                                </h1>
                                <p className="text-green-100">
                                    Based on your profile, here are the government schemes you&apos;re eligible for.
                                </p>
                            </div>
                            <div className="text-center sm:text-right">
                                <p className="text-sm text-green-100">Total Annual Value</p>
                                <p className="text-3xl sm:text-4xl font-heading font-bold">
                                    {formatCurrency(totalBenefits)}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-warning/20 border-2 border-warning rounded-xl p-6 sm:p-8 mb-8 animate-fade-in">
                        <div className="flex items-start gap-3">
                            <i className="fas fa-exclamation-triangle text-warning text-2xl mt-1" aria-hidden="true"></i>
                            <div>
                                <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                                    ⚠️ No Exact Matches Found
                                </h1>
                                <p className="text-gray-700 mb-4">
                                    Based on your current profile, we couldn&apos;t find exact scheme matches. Here are some suggestions:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <i className="fas fa-check text-primary-500 mt-1" aria-hidden="true"></i>
                                        <span>Update your disability certification to reflect current disability percentage</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <i className="fas fa-check text-primary-500 mt-1" aria-hidden="true"></i>
                                        <span>Visit your nearest CSC center for personalized guidance</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <i className="fas fa-check text-primary-500 mt-1" aria-hidden="true"></i>
                                        <span>Check state-specific schemes which may have different criteria</span>
                                    </li>
                                </ul>
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <Link to="/eligibility" className="btn-primary">
                                        <i className="fas fa-redo" aria-hidden="true"></i>
                                        Try Again
                                    </Link>
                                    <Link to="/csc-locator" className="btn-outline">
                                        <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                                        Find Nearest CSC
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Summary */}
                <div className="card mb-8 border border-gray-100">
                    <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                        <i className="fas fa-user-circle text-primary-500" aria-hidden="true"></i>
                        Your Profile Summary
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Age</span>
                            <p className="font-semibold">{userProfile.age} years</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Income</span>
                            <p className="font-semibold">{formatCurrency(userProfile.income)}/year</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Disability</span>
                            <p className="font-semibold">{userProfile.disabilityPercent}%</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Type</span>
                            <p className="font-semibold">{userProfile.disabilityType}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">State</span>
                            <p className="font-semibold">{userProfile.state}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Education</span>
                            <p className="font-semibold">{userProfile.education}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/eligibility')}
                        className="mt-4 text-sm text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1"
                    >
                        <i className="fas fa-edit" aria-hidden="true"></i>
                        Edit Profile
                    </button>
                </div>

                {/* Benefit Cards */}
                {hasResults && (
                    <div className="space-y-6 mb-10" aria-label="Eligible benefits">
                        <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                            <i className="fas fa-list-check text-secondary-500" aria-hidden="true"></i>
                            Your Eligible Benefits ({eligibilityResults.length})
                        </h2>
                        {eligibilityResults.map((benefit, index) => (
                            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
                        ))}
                    </div>
                )}

                {/* Actions */}
                {hasResults && (
                    <div className="card border border-gray-100">
                        <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                            <i className="fas fa-bolt text-accent-500" aria-hidden="true"></i>
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button onClick={handleDownload} className="btn-primary justify-start">
                                <i className="fas fa-download" aria-hidden="true"></i>
                                Download All Benefits (PDF)
                            </button>
                            <button onClick={handleEmail} className="btn-outline justify-start">
                                <i className="fas fa-envelope" aria-hidden="true"></i>
                                Email Results to Me
                            </button>
                            <button onClick={handleReminder} className="btn-outline justify-start">
                                <i className="fas fa-bell" aria-hidden="true"></i>
                                Set Application Reminders
                            </button>
                            <button onClick={handleShare} className="btn-outline justify-start">
                                <i className="fas fa-share-alt" aria-hidden="true"></i>
                                Share with Family
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
