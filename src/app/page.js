"use client";

import dynamic from "next/dynamic";
import React from "react";
import MenuGraficos from "../components/menuGraficos/menuGraficos";
import InfoGraficos from "@/components/infoGraficos/infoGraficos";

const MapaDeServicios = dynamic(
  () => import("../components/mapaDeServicios/mapaDeServicios"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
    <div  className="d-flex">
      <MenuGraficos/>
      <MapaDeServicios/>
    </div>
    <InfoGraficos/>
    </>
  );
}
