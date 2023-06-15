import React from "react"
import { Session } from "next-auth"

export type NavbarContentType = {
    Wrapper: NavbarContentWrapperType,
    Loading: NavbarContentLoadingType,
    List: NavbarContentListItemType,
}

export type NavbarContentWrapperType = (props: {
    children: (navbarItems: NavbarContentListItemProps[]) => JSX.Element[];
    onLoading: () => JSX.Element;
}) => JSX.Element

export type NavbarContentLoadingType = () => JSX.Element

type NavbarContentListItemProps = { name: string, path: string }
export type NavbarContentListItemType = (items: NavbarContentListItemProps) => JSX.Element