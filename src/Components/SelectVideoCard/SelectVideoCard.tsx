import PlaceHolderImage from "../../Assets/partials/placeholderImage.png";
import { Card, Image, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import classes from "./cardStyles.module.css";
import Landscape_dark from "../../Assets/Logo/Landscape_dark.png";
// import Portrait_dark from "../../Assets/partials/Portrait_dark.png";
// import ".";
import { VideoEntityType } from "../../Shared/Models/Playlist/playlist.type";

interface SelectVideoCardPropsTypes {
    cardData: VideoEntityType;
    cardDataArray: VideoEntityType[];
    setCardDataArray: () => void;
    selectType?: "add" | "remove";
    orientationOfCard?: string;
}

const SelectVideoCard = ({
    cardData,
    cardDataArray,
    setCardDataArray,
    selectType = "add",
    orientationOfCard,
}: SelectVideoCardPropsTypes) => {
    return (
        <div className={classes.rootContainer} onClick={() => setCardDataArray()}>
            {selectType === "add" ? (
                <FontAwesomeIcon
                    className={`${classes.iconContainer} ${classes.plus}`}
                    icon={faPlus}
                    color={"#fff"}
                    size={"sm"}
                />
            ) : selectType === "remove" ? (
                <FontAwesomeIcon
                    className={`${classes.iconContainer} ${classes.minus}`}
                    icon={faMinus}
                    color={"#fff"}
                    size={"sm"}
                />
            ) : null}

            <Card
                hoverable
                size={"small"}
                // onClick={()=>setCardDataArray()}
                cover={
                    <img
                        src={(cardData.poster && cardData.poster.urls.original) || PlaceHolderImage}
                        alt={cardData.caption}
                        style={{
                            borderRadius: "0.8rem 0.8rem 0 0",
                            objectFit: "cover",
                            // remove this when uncommenting the class
                            // aspectRatio: '2/2.5',
                        }}
                        className={`${
                            orientationOfCard === "landscape" ? "landscapeAspectRatio" : "PotraitAspectRatio"
                        }`}
                    />
                }
                style={{
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    position: "relative",
                }}
                bodyStyle={{ padding: "0.3rem" }}
            >
                <Card.Meta
                    title={
                        <Typography.Paragraph
                            ellipsis={{ rows: 1, expandable: false, tooltip: true }}
                            style={{ margin: 0, fontSize: "0.85rem" }}
                        >
                            {cardData.caption}
                        </Typography.Paragraph>
                    }
                />
            </Card>
            {orientationOfCard === "landscape" ? (
                <div
                    style={{
                        width: "14px",
                        position: "absolute",
                        top: "1%",
                        left: " 0%",
                        zIndex: "1111111111111",
                    }}
                >
                    <Image src={Landscape_dark} style={{ width: "40px", background: "#fff" }} />
                </div>
            ) : (
                <div className="outline">
                    {/* <Image src={Portrait_dark} style={{ width: "auto", height: "2.3rem", background: "#fff" }} /> */}
                </div>
            )}
        </div>
    );
};

export default SelectVideoCard;
