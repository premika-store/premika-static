"use client";

import { useEffect, useState } from "react";

export const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const Currency = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
