import { PlaylistLayoutType } from "../playlist"


export const playlistLayoutsEmbedCode:((integrationId: string, integrationType: PlaylistLayoutType) => string) =
    (integrationId) => {



  return `
    <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
    <link
          rel="stylesheet"
          type="text/css"
          href="https://d36zfc83ckw6gr.cloudfront.net/index.theboom_v1.css"
        />
      <theboom-video-element
        id="video-page"
        integrationid="${integrationId}"
      ></theboom-video-element>
      <script src="https://d36zfc83ckw6gr.cloudfront.net/index.theboom_v1.js"></script>`
}
