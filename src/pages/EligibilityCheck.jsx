import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { indianStates, disabilityTypes, educationLevels } from '../data/states';
import { evaluateEligibility } from '../utils/eligibility';
import LoadingSpinner from '../components/LoadingSpinner';

const initialFormState = {
    age: '',
    income: '',
    disabilityPercent: 40,
    disabilityType: '',
    state: '',
    education: '',
};

export default function EligibilityCheck() {
    const navigate = useNavigate();
    const { dispatch, addToast } = useApp();
    const { t } = useLanguage();
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const firstErrorRef = useRef(null);
    const formRef = useRef(null);

    const validateField = (name, value) => {
        switch (name) {
            case 'age':
                if (!value || value === '') return 'Age is required';
                if (value < 0 || value > 120) return 'Please enter a valid age (0-120)';
                return '';
            case 'income':
                if (!value || value === '') return 'Annual family income is required';
                if (value < 0) return 'Income cannot be negative';
                return '';
            case 'disabilityPercent':
                if (value < 0 || value > 100) return 'Disability percentage must be between 0 and 100';
                return '';
            case 'disabilityType':
                if (!value) return 'Please select your disability type';
                return '';
            case 'state':
                if (!value) return 'Please select your state';
                return '';
            case 'education':
                if (!value) return 'Please select your education level';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSliderChange = (e) => {
        setForm(prev => ({ ...prev, disabilityPercent: parseInt(e.target.value, 10) }));
    };

    const validateAll = () => {
        const newErrors = {};
        let firstError = null;

        for (const field of Object.keys(initialFormState)) {
            const error = validateField(field, form[field]);
            if (error) {
                newErrors[field] = error;
                if (!firstError) firstError = field;
            }
        }

        setErrors(newErrors);

        if (firstError) {
            const element = formRef.current?.querySelector(`[name="${firstError}"]`);
            if (element) {
                element.focus();
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll()) {
            addToast('Please fix the errors in the form before submitting.', 'error');
            return;
        }

        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const profile = {
            age: parseInt(form.age, 10),
            income: parseInt(form.income, 10),
            disabilityPercent: form.disabilityPercent,
            disabilityType: form.disabilityType,
            state: form.state,
            education: form.education,
        };

        const results = evaluateEligibility(profile);

        dispatch({ type: 'SET_USER_PROFILE', payload: profile });
        dispatch({ type: 'SET_ELIGIBILITY_RESULTS', payload: results });
        dispatch({ type: 'SET_CONSENT', payload: true });

        setIsSubmitting(false);

        if (results.length > 0) {
            addToast(`Great news! You qualify for ${results.length} benefit(s).`, 'success');
        } else {
            addToast('No exact matches found. Check suggestions on the results page.', 'warning');
        }

        navigate('/results');
    };

    const renderField = (name, label, description, children) => (
        <div className="mb-6">
            <label htmlFor={name} className="form-label">
                {label} <span className="text-danger" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
            </label>
            {children}
            {description && !errors[name] && (
                <p id={`${name}-description`} className="form-helper">
                    {description}
                </p>
            )}
            {errors[name] && (
                <p id={`${name}-error`} className="form-error" role="alert">
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    return (
        <div className="py-8 sm:py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Agent Badge */}
                <div className="text-center mb-4">
                    <span className="agent-badge core">
                        <i className="fas fa-brain" aria-hidden="true"></i>
                        ⭐ Agent 1 — {t('eligibility.agent')}
                    </span>
                </div>

                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="section-title">
                        {t('eligibility.title').split(' ').length > 2
                            ? <>{t('eligibility.title').split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t('eligibility.title').split(' ').slice(-1)}</span></>
                            : <>Check Your <span className="text-gradient">Eligibility</span></>
                        }
                    </h1>
                    <p className="section-subtitle">
                        {t('eligibility.subtitle')}
                    </p>
                </div>

                {/* Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="card border-2 border-gray-100"
                    noValidate
                    aria-label="Eligibility check form"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        {/* Age */}
                        {renderField(
                            'age',
                            'Age',
                            'Your current age in years',
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-field"
                                min="0"
                                max="120"
                                placeholder="e.g., 35"
                                aria-label="Your age in years"
                                aria-describedby={errors.age ? 'age-error' : 'age-description'}
                                aria-invalid={!!errors.age}
                                aria-required="true"
                                required
                            />
                        )}

                        {/* Income */}
                        {renderField(
                            'income',
                            'Annual Family Income (₹)',
                            'Total annual family income in Indian Rupees',
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                <input
                                    type="number"
                                    id="income"
                                    name="income"
                                    value={form.income}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-field pl-8"
                                    min="0"
                                    placeholder="e.g., 200000"
                                    aria-label="Annual family income in rupees"
                                    aria-describedby={errors.income ? 'income-error' : 'income-description'}
                                    aria-invalid={!!errors.income}
                                    aria-required="true"
                                    required
                                />
                            </div>
                        )}

                        {/* Disability Type */}
                        {renderField(
                            'disabilityType',
                            'Disability Type',
                            'Select the type of disability as per your certificate',
                            <select
                                id="disabilityType"
                                name="disabilityType"
                                value={form.disabilityType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-field"
                                aria-label="Type of disability"
                                aria-describedby={errors.disabilityType ? 'disabilityType-error' : 'disabilityType-description'}
                                aria-invalid={!!errors.disabilityType}
                                aria-required="true"
                                required
                            >
                                <option value="">-- Select disability type --</option>
                                {disabilityTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        )}

                        {/* State */}
                        {renderField(
                            'state',
                            'State of Residence',
                            'Select the state or UT where you currently reside',
                            <select
                                id="state"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-field"
                                aria-label="Your state of residence"
                                aria-describedby={errors.state ? 'state-error' : 'state-description'}
                                aria-invalid={!!errors.state}
                                aria-required="true"
                                required
                            >
                                <option value="">-- Select state --</option>
                                {indianStates.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        )}

                        {/* Education */}
                        {renderField(
                            'education',
                            'Education Level',
                            'Select your highest completed education level',
                            <select
                                id="education"
                                name="education"
                                value={form.education}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-field"
                                aria-label="Highest education level"
                                aria-describedby={errors.education ? 'education-error' : 'education-description'}
                                aria-invalid={!!errors.education}
                                aria-required="true"
                                required
                            >
                                <option value="">-- Select education level --</option>
                                {educationLevels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Disability Percentage — Full Width */}
                    <div className="mb-8">
                        <label htmlFor="disabilityPercent" className="form-label">
                            Disability Certification Percentage: <strong className="text-primary-600">{form.disabilityPercent}%</strong>
                        </label>
                        <input
                            type="range"
                            id="disabilityPercent"
                            name="disabilityPercent"
                            value={form.disabilityPercent}
                            onChange={handleSliderChange}
                            className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-primary-500"
                            min="0"
                            max="100"
                            step="5"
                            aria-label={`Disability percentage: ${form.disabilityPercent}%`}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={form.disabilityPercent}
                            aria-valuetext={`${form.disabilityPercent} percent`}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                        <p id="disabilityPercent-description" className="form-helper">
                            As mentioned on your disability certificate (most schemes require ≥40%)
                        </p>
                    </div>

                    {/* Submit */}
                    {isSubmitting ? (
                        <LoadingSpinner text="🧠 AI is evaluating your eligibility..." />
                    ) : (
                        <button
                            type="submit"
                            className="btn-secondary w-full text-lg py-4 rounded-xl shadow-md hover:shadow-lg"
                            id="submit-eligibility"
                        >
                            <i className="fas fa-search" aria-hidden="true"></i>
                            🔍 Find My Benefits
                        </button>
                    )}
                </form>

                {/* Privacy Note */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <i className="fas fa-shield-alt text-secondary-500" aria-hidden="true"></i>
                        Your data is processed locally on your device. We never share your personal information.
                    </p>
                </div>
            </div>
        </div>
    );
}
