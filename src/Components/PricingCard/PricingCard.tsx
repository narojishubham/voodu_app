// import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import "./pricingPage.css";

interface IFeature {
    feature: string;
    included?: boolean;
}

interface IPricingProps {
    PricingDetails: {
        PricingHeader: string;
        PricinHeadeDesction: string;
        PricingType: string;
        FeatureList: IFeature[];
        DefaultSelectedPlan?: boolean;
    };
}

function PricingCard({ PricingDetails }: IPricingProps) {
    return (
        <>
            <Card className={`pricingPageCard ${PricingDetails.DefaultSelectedPlan ? "Selected" : "disableCard"}`}>
                <h2 className="pricingHeaderText">{PricingDetails.PricingHeader}</h2>
                <div className="pricingHeaderTextSubtext">{PricingDetails.PricinHeadeDesction}</div>
                <h2 className="pricingCategory">{PricingDetails.PricingType}</h2>
                {PricingDetails.FeatureList.map((item: IFeature) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className={`iconClass ${!item.included && "disabled"} `}>
                            {/* <FontAwesomeIcon icon={faCheckCircle} style={{ width: "10px" }} /> */}
                        </div>

                        <div className={`PricingPageFeature ${!item.included && "disabledFeature"}`}>
                            {item.feature}
                        </div>
                    </div>
                ))}
            </Card>
        </>
    );
}

export default PricingCard;
