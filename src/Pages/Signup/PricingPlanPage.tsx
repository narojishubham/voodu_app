import React from "react";
import PricingCard from "../../Components/PricingCard/PricingCard";
function PricingPlanPage() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <PricingCard
                PricingDetails={{
                    DefaultSelectedPlan: true,
                    PricingHeader: "Basic",
                    PricinHeadeDesction: " Lorem ipsum dolor sit amet, consectetur",
                    PricingType: "Free",
                    FeatureList: [
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                    ],
                }}
            />
            <PricingCard
                PricingDetails={{
                    PricingHeader: "Enterprise",
                    PricinHeadeDesction: " Lorem ipsum dolor sit amet, consectetur",
                    PricingType: "$99 per month",
                    FeatureList: [
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: false,
                        },
                    ],
                }}
            />
            <PricingCard
                PricingDetails={{
                    PricingHeader: "Custom",
                    PricinHeadeDesction: " Lorem ipsum dolor sit amet, consectetur",
                    PricingType: "Contact for Pricing",
                    FeatureList: [
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                        {
                            feature: "Feature Name Placeholder Text",
                            included: true,
                        },
                    ],
                }}
            />
        </div>
    );
}

export default PricingPlanPage;
