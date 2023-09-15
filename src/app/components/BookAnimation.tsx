"use client";
import React from "react";
import bookAnimation from "../../../public/static/bookAnimation.json";
import Lottie from "lottie-react";

const BookAnimation: React.FC<Partial<React.ComponentPropsWithRef<typeof Lottie>>> = ({ ...props }) => {
  return <Lottie {...props} animationData={bookAnimation} />;
};

export default BookAnimation;
