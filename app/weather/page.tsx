// import PoliceMap from '@/components/ui/PoliceMap'
// "use client"
import dynamic from 'next/dynamic';
import React from 'react'
import Mapclass from './Map.module.css'
const PoliceMap = dynamic(() => import("@/components/ui/PoliceMap"), {
    ssr: false,
  });

const PoliceLocation = () => {
  return (
    <div className={Mapclass.navspace}><PoliceMap/></div>
  )
}

export default PoliceLocation