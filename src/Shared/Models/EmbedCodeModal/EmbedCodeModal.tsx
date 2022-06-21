import React, { useState } from "react";
import { Card, Col, Input, Modal, Row, Steps, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import CMS_graphic from "../../Assets/graphics/cms-graphic.jpg";
import CMS_graphic from "../../../Assets/graphics/cms-graphic.jpg";
import { PlaylistItemType } from "../Playlist/playlist.type";
import { PlaylistLayoutType } from "../enums/playlist";
import { playlistLayoutsEmbedCode } from "../enums/helpers/PlaylistLayoutsEmbedCode";
import Button from "../../../Components/Partials/Button";
import { copyToClipboard } from "../enums/helpers";
import Carousel from "../../../Assets/PlaylistLayouts/carousel.png";
import FloatingPlayer from "../../../Assets/PlaylistLayouts/floating_player.png";
import Grid from "../../../Assets/PlaylistLayouts/grid.png";
import StoryBlock from "../../../Assets/PlaylistLayouts/story_block.png";

interface EmbedCodeModalPropType {
    modalOpenState: boolean;
    closeModalFn: () => void;
    playlistData: PlaylistItemType;
}

const EmbedCodeModal = ({ modalOpenState, closeModalFn, playlistData }: EmbedCodeModalPropType) => {
    const [playlistLayout, setPlaylistLayout] = useState<PlaylistLayoutType>(PlaylistLayoutType.carousel);
    const imagesList = [Carousel, FloatingPlayer, Grid, StoryBlock];
    const SelectLayout = () => {
        const layoutArray = Object.keys(PlaylistLayoutType).map((e, i) => {
            return { element: e, image: imagesList[i] };
        });
        return (
            <>
                {console.log("playlistData", playlistData.integrationType)}
                <Typography.Paragraph>
                    This is the selected layout. To change it, go to edit playlist.
                </Typography.Paragraph>
                <Row style={{ marginBottom: "1rem" }}>
                    <Col flex="auto" className="site-card-wrapper" style={{ borderRadius: "0.5rem", margin: 0 }}>
                        <Row gutter={16} justify="center" wrap={false}>
                            {layoutArray.map((el: any, i) => (
                                <Col key={i}>
                                    {/* {console.log("el", el)} */}
                                    <Card
                                        bordered
                                        hoverable={el.element === playlistData.integrationType}
                                        cover={
                                            <img
                                                alt={el}
                                                // src={require(`../../Assets/PlaylistLayouts/${el}.png`)}
                                                src={el.image}
                                                style={{
                                                    aspectRatio: "3/2.2",
                                                    objectFit: "cover",
                                                    height: 100,
                                                    filter: "hue-rotate(46deg)",
                                                }}
                                            />
                                        }
                                        // onClick={() => {
                                        //   if (el === PlaylistLayoutType.carousel)
                                        //     setPlaylistLayout(el);
                                        // console.log('test')
                                        // }}
                                        style={{
                                            width: 120,
                                            opacity: el.element === playlistData.integrationType ? 1 : 0.5,
                                            border:
                                                el.element === playlistData.integrationType
                                                    ? "0.3rem double #F2994A"
                                                    : "0.3rem double #ececec",
                                        }}
                                        bodyStyle={{
                                            textAlign: "center",
                                            padding: "0.4rem 0.2rem",
                                        }}
                                    >
                                        <Card.Meta
                                            title={el.element.split("_").join(" ")}
                                            style={{ textTransform: "capitalize" }}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </>
        );
    };
    const CopyEmbedCode = () => {
        const [copyClicked, setCopyClicked] = useState(false);
        const handleCopyEmbedCodeOnClick = () => {
            copyToClipboard(playlistLayoutsEmbedCode(playlistData.integrationId, playlistLayout)).then(() => {
                setCopyClicked(true);
                setTimeout(() => setCopyClicked(false), 1500);
            });
        };
        return (
            <>
                <Typography.Paragraph>Copy the the html code by clicking the button.</Typography.Paragraph>
                <Input.TextArea
                    rows={10}
                    value={playlistLayoutsEmbedCode(playlistData.integrationId, playlistLayout)}
                    onChange={() => null}
                    style={{ background: "#ececec", border: "none" }}
                />
                <Button
                    block={false}
                    style={{ margin: "1rem 0 0.5rem", width: "10rem" }}
                    onClick={handleCopyEmbedCodeOnClick}
                >
                    {!copyClicked ? "Copy Embed Code" : <FontAwesomeIcon icon={faCheck} color={"#FFF"} size={"lg"} />}
                </Button>
            </>
        );
    };
    const PasteIntoCMS = () => {
        return (
            <>
                <Typography.Paragraph>
                    Paste the above copied code into a custom HTML widget on your desired CMS or website.
                </Typography.Paragraph>
                <img style={{ width: "20rem", filter: "hue-rotate(160deg)" }} src={CMS_graphic} alt={"CMS_graphic"} />
                <span style={{ display: "none" }}>
                    <a href="https://www.freepik.com/vectors/cms">Cms vector created by freepik - www.freepik.com</a>
                </span>
            </>
        );
    };

    const stepsData = [
        {
            title: (
                <Typography.Text>
                    Select a <span style={{ color: "#f2994a", fontWeight: 600 }}>LAYOUT</span>
                </Typography.Text>
            ),
            component: <SelectLayout />,
        },
        {
            title: (
                <Typography.Text>
                    Copy <span style={{ color: "#f2994a", fontWeight: 600 }}>EMBED</span> code
                </Typography.Text>
            ),
            component: <CopyEmbedCode />,
        },
        {
            title: (
                <Typography.Text>
                    Display on your <span style={{ color: "#f2994a", fontWeight: 600 }}>WEBSITE</span>
                </Typography.Text>
            ),
            component: <PasteIntoCMS />,
        },
    ];

    return (
        <div>
            <Modal
                title="Embed Playlist into your website"
                centered
                visible={modalOpenState}
                width={800}
                style={{ margin: "2rem 0" }}
                onOk={closeModalFn}
                onCancel={closeModalFn}
                footer={null}
            >
                <Steps direction="vertical" current={-1}>
                    {stepsData.map((e, k) => (
                        <Steps.Step key={k} title={e.title} description={e.component} />
                    ))}
                </Steps>
            </Modal>
        </div>
    );
};

export default EmbedCodeModal;
