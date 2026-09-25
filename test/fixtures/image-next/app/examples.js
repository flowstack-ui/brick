'use client';
import { useState } from 'react';
import NextImage, { getImageProps } from 'next/image';
import { Image } from '@flowstack-ui/brick/image';
import { Frame } from '@flowstack-ui/brick/frame';
const sizes = '(max-width: 768px) 100vw, 768px';
export default function Examples() {
 const [broken,setBroken]=useState(false);
 const [events,setEvents]=useState(0);
 const src=broken?'/missing.webp':'/studio.webp';
 const {props:{src: optimized,srcSet,...native}}=getImageProps({src,width:768,height:512,alt:'Helper studio',sizes,loading:'eager'});
 return <><button onClick={()=>setBroken(!broken)}>Toggle source</button><output data-events>{events}</output>
 <Frame maxInlineSize="768px"><Image.Root data-example="next" src={src} ratio={3/2}><Image.Content asChild alt="Next studio" ref={node=>{if(node)node.dataset.ref='actual-img';}} onLoad={()=>setEvents(n=>n+1)}><NextImage src={src} alt="Next studio" width={768} height={512} sizes={sizes} loading="eager" onLoad={()=>setEvents(n=>n+1)} /></Image.Content><Image.Fallback>Next unavailable</Image.Fallback></Image.Root></Frame>
 <Frame maxInlineSize="768px"><Image.Root data-example="helper" src={optimized} srcSet={srcSet} ratio={3/2}><Image.Content {...native} /><Image.Fallback>Helper unavailable</Image.Fallback></Image.Root></Frame>
 <Frame maxInlineSize="768px"><Image.Root data-example="plain" src="/studio.webp" srcSet="/studio-small.webp 384w, /studio.webp 768w"><Image.Content alt="Plain studio" width={768} height={512} sizes={sizes} loading="eager" fetchPriority="high" /></Image.Root></Frame>
 <Frame maxInlineSize="768px"><Image.Root data-example="srcset" srcSet="/studio-small.webp 384w, /studio.webp 768w"><Image.Content alt="Candidates only" width={768} height={512} sizes={sizes} loading="eager" /><Image.Fallback>Candidate unavailable</Image.Fallback></Image.Root></Frame>
 <div style={{height:10000}} aria-hidden="true" />
 <Image.Root data-example="lazy" src="/deferred.webp"><Image.Content alt="Deferred studio" width={768} height={512} loading="lazy" /></Image.Root></>;
}
