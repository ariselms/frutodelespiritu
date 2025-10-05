import React from "react"

export interface ContentAndTwoImagesProps {
    title: string,
    description: React.ReactNode,
    firstImgUrl: string,
    secondImgUrl: string,
    firstImgUrlAlt?: string,
    secondImgUrlAlt?: string
}

export interface BtnLinkBtnTextProps {
    firstParagraph: string,
    secondParagraph: string,
    btnLink: string,
    btnText: string
}

export interface JumbotronSectionProps {
    section: string,
    description?: string
}