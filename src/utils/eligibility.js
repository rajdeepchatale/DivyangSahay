import { schemes } from '../data/schemes';

export function evaluateEligibility(profile) {
    const { age, income, disabilityPercent, disabilityType, state, education } = profile;
    const results = [];

    for (const scheme of schemes) {
        const criteria = scheme.eligibilityCriteria;
        const reasons = [];
        let eligible = true;

        // Check age
        if (age >= criteria.minAge && age <= criteria.maxAge) {
            reasons.push(`Your age (${age}) is within the eligible range (${criteria.minAge}–${criteria.maxAge} years)`);
        } else {
            eligible = false;
            continue;
        }

        // Check disability percentage
        if (disabilityPercent >= criteria.minDisabilityPercent) {
            reasons.push(`Your disability percentage (${disabilityPercent}%) meets the minimum requirement (${criteria.minDisabilityPercent}%)`);
        } else {
            eligible = false;
            continue;
        }

        // Check income
        if (income <= criteria.maxIncome) {
            if (criteria.maxIncome !== Infinity) {
                reasons.push(`Your income (₹${income.toLocaleString('en-IN')}) is below the limit (₹${criteria.maxIncome.toLocaleString('en-IN')})`);
            }
        } else {
            eligible = false;
            continue;
        }

        // Check education if required
        if (criteria.educationLevel) {
            if (criteria.educationLevel.includes(education)) {
                reasons.push(`Your education level (${education}) qualifies`);
            } else {
                eligible = false;
                continue;
            }
        }

        if (eligible) {
            results.push({
                ...scheme,
                qualificationReasons: reasons,
            });
        }
    }

    return results;
}

export function formatCurrency(amount) {
    if (amount === null || amount === undefined) return 'Varies';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

export function calculateTotalBenefits(results) {
    return results.reduce((total, scheme) => total + (scheme.yearlyAmount || 0), 0);
}
