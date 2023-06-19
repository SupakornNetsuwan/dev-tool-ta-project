import React from "react"
import { Session } from "next-auth"

export type NavbarContentWrapperType = (props: {
    children: (navbarItems: { name: string, path: string }[]) => JSX.Element[];
    onLoading: () => JSX.Element;
    openDrawer: () => void;
}) => JSX.Element

export type NavbarContentMobileDrawer = (props: {
    children: (navbarItems: { name: string, path: string }[]) => JSX.Element[];
    closeDrawer: () => void;
    isDrawerOpen: boolean;
}) => JSX.Element

export type NavbarContentLoadingType = () => JSX.Element

export type NavbarContentListItemType = (items: { path: string, children: React.ReactNode; closeDrawer?: () => void }) => JSX.Element