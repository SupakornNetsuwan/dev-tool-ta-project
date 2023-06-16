import React from "react"
import { Session } from "next-auth"

export type NavbarContentWrapperType = (props: {
    children: (navbarItems: { name: string, path: string }[]) => JSX.Element[];
    onLoading: () => JSX.Element;
}) => JSX.Element

export type NavbarContentLoadingType = () => JSX.Element

export type NavbarContentListItemType = (items: { path: string, children: React.ReactNode }) => JSX.Element