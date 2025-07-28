"use client";

import SizeChartModal from "@/components/size-chart-modal";
import { useEffect, useState } from "react";

const ModalProdivder = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SizeChartModal />
    </>
  );
};

export default ModalProdivder;
