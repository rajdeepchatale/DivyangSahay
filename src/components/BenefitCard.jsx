import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/eligibility';

export default function BenefitCard({ benefit, index }) {
    return (
        <article
            className="card border-l-4 border-l-secondary-500 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
            aria-label={`Benefit: ${benefit.name}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <i className="fas fa-check-circle text-secondary-500" aria-hidden="true"></i>
                        <h3 className="font-heading font-bold text-lg text-gray-900">{benefit.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <i className="fas fa-landmark" aria-hidden="true"></i>
                        {benefit.ministry}
                    </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-50 text-secondary-700 border border-secondary-200">
                    {benefit.category}
                </span>
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                    <i className="fas fa-coins text-accent-500 text-xl" aria-hidden="true"></i>
                    <div>
                        <p className="text-sm text-gray-600">Annual Benefit Value</p>
                        <p className="text-2xl font-heading font-bold text-primary-600">
                            {formatCurrency(benefit.yearlyAmount)}
                            {benefit.monthlyAmount && (
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({formatCurrency(benefit.monthlyAmount)}/month)
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{benefit.description}</p>

            {/* Qualification Reasons */}
            {benefit.qualificationReasons && benefit.qualificationReasons.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1">
                        <i className="fas fa-clipboard-check text-secondary-500" aria-hidden="true"></i>
                        Why You Qualify
                    </h4>
                    <ul className="space-y-1">
                        {benefit.qualificationReasons.map((reason, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                <i className="fas fa-check text-secondary-400 mt-1 flex-shrink-0" aria-hidden="true"></i>
                                {reason}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <Link
                    to={`/application?schemeId=${benefit.id}`}
                    className="btn-secondary text-sm py-2 px-4"
                >
                    <i className="fas fa-file-alt" aria-hidden="true"></i>
                    Generate Application
                </Link>
                <Link
                    to="/csc-locator"
                    className="btn-outline text-sm py-2 px-4"
                >
                    <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                    Find Help Center
                </Link>
            </div>
        </article>
    );
}
