import { useState } from "react";
import { QrCode, useQrCode, Appearance, Button, For, Frame, Grid, HStack, Input, Link,
  Text, VStack, Spinner, Dialog, type QrCodeRootProps, type QrCodeEncoding, type QrCodeSize } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const qrCodeScenarios = [
  { id: "qr-code.basic", number: 1, title: "Share a document", description: "A locally generated code and a normal link to the same destination." },
  { id: "qr-code.sizes", number: 2, title: "Display sizes", description: "One payload across seven presets. Small dense codes are not guaranteed to scan." },
  { id: "qr-code.full", number: 3, title: "Fill the available width", description: "The parent owns the width; the QR always remains square." },
  { id: "qr-code.controlled", number: 4, title: "Controlled editing", description: "The accepted value drives the graphic. Whitespace is preserved." },
  { id: "qr-code.store", number: 5, title: "External controller", description: "RootProvider and controls share one value owner." },
  { id: "qr-code.unicode", number: 6, title: "International text", description: "Unicode, emoji and line breaks are encoded without translation." },
  { id: "qr-code.correction", number: 7, title: "Error correction", description: "Higher redundancy can increase density. Boost is an explicit option." },
  { id: "qr-code.encoding", number: 8, title: "Encoding controls", description: "Version, mask and pixel scale are distinct from display size." },
  { id: "qr-code.margin", number: 9, title: "Quiet zone and inversion", description: "Four clear modules are the default. Inversion is an advanced scan-sensitive choice." },
  { id: "qr-code.appearance", number: 10, title: "Appearance and custom paint", description: "The default scanning surface stays light in dark mode." },
  { id: "qr-code.logos", number: 11, title: "Brand overlays", description: "A small logo is centered on the symbol. These examples explicitly use high correction." },
  { id: "qr-code.overlay", number: 12, title: "Explicit export artwork", description: "Arbitrary display content can supply a portable export image." },
  { id: "qr-code.download", number: 13, title: "Download formats", description: "Export resolution is independent of display size. Unsupported formats report an error." },
  { id: "qr-code.actions", number: 14, title: "Action states", description: "Loading remains centered. Unsupported overlays report an actionable error." },
  { id: "qr-code.status", number: 15, title: "Application availability", description: "Loading and expired status are application-owned, not simulated scan events." },
  { id: "qr-code.errors", number: 16, title: "Capacity and recovery", description: "Invalid input removes the pattern instead of showing a stale previous code." },
  { id: "qr-code.rtl", number: 17, title: "Localized instructions", description: "Direction changes the surrounding copy, never the QR matrix." },
  { id: "qr-code.dialog", number: 18, title: "Share dialog", description: "The code, alternative link and download stay together in a real overlay." },
] satisfies ScenarioDefinition[];

const url = "https://example.com/share";
const art = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#351370"/><path d="M6 7h12v3H9v3h7v3H9v4H6z" fill="white"/></svg>')}`;
function Logo() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#351370"/><path d="M6 7h12v3H9v3h7v3H9v4H6z" fill="white"/></svg>; }
function Code(props: QrCodeRootProps) { return <QrCode.Root value={url} {...props}><QrCode.Frame aria-label="Shared document" /></QrCode.Root>; }
function Controlled() {
  const [value,setValue]=useState(url);
  return <VStack align="start" gap="4"><Input aria-label="QR value" value={value} onChange={e=>setValue(e.target.value)}/><Code value={value}/></VStack>;
}
function Store() {
  const [refused,setRefused]=useState(false), [value,setValue]=useState(url);
  const api=useQrCode({value,onValueChange:({value})=>{if(!refused)setValue(value);}});
  return <VStack align="start" gap="4"><QrCode.RootProvider value={api}><QrCode.Frame titleText="Controller example"/></QrCode.RootProvider>
    <Text data-testid="qr-accepted">{value}</Text><HStack gap="2" wrap><Button onClick={()=>api.setValue("https://example.com/updated")}>Update code</Button><Button variant="outline" onClick={()=>setRefused(!refused)}>{refused?"Allow updates":"Refuse updates"}</Button></HStack></VStack>;
}
function Download({unsupported=false, explicit=false}: {unsupported?:boolean;explicit?:boolean}) {
  const [error,setError]=useState("");
  return <QrCode.Root value={url} encoding={{ecc:"H"}} size="lg"><VStack align="start" gap="4">
    <QrCode.Frame titleText="Download shared document"/>
    {(unsupported||explicit)&&<QrCode.Overlay exportSrc={explicit?art:undefined}><Text as="span" tone="inherit">F</Text></QrCode.Overlay>}
    <HStack gap="2" wrap><For each={["svg+xml","png","jpeg"] as const}>{format=><QrCode.DownloadTrigger key={format}
      mimeType={`image/${format}`} fileName={`document.${format==="svg+xml"?"svg":format}`} size="sm" exportSize={512}
      onDownloadError={({error})=>setError(String(error))}>{format==="svg+xml"?"SVG":format.toUpperCase()}</QrCode.DownloadTrigger>}</For></HStack>
    {error&&<Text role="status" tone="danger">{error}</Text>}
  </VStack></QrCode.Root>;
}
function Errors() {
  const [invalid,setInvalid]=useState(true);
  return <VStack align="start" gap="4"><QrCode.Root value={invalid?"x".repeat(8000):url}>
    <QrCode.Frame titleText="Capacity example"/><QrCode.Context>{api=><Text role="status">{api.error?"Too much content. Shorten the value.":"Ready to scan"}</Text>}</QrCode.Context>
  </QrCode.Root><Button onClick={()=>setInvalid(!invalid)}>Toggle valid value</Button></VStack>;
}
function ShareDialog() {
  return <Dialog.Root><Dialog.Trigger asChild><Button>Share document</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay/><Dialog.Content>
    <Dialog.Header><Dialog.Title>Open on another device</Dialog.Title><Dialog.Description>Scan the code or use the document link.</Dialog.Description></Dialog.Header>
    <Dialog.Body><VStack gap="4" align="center"><Download/><Link href={url}>Open shared document</Link></VStack></Dialog.Body>
    <Dialog.Footer><Dialog.Close asChild><Button variant="outline" tone="neutral">Done</Button></Dialog.Close></Dialog.Footer>
  </Dialog.Content></Dialog.Portal></Dialog.Root>;
}
export function QrCodePage() {
  return <VStack gap="8" align="stretch" data-component-page="qr-code">
    <Scenario {...qrCodeScenarios[0]}><Specimen label="Accessible sharing"><VStack align="start" gap="4"><Code/><Link href={url}>Open shared document</Link></VStack></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[1]}><Grid.Root columns={{initial:1,lg:2}} gap="4"><For each={["2xs","xs","sm","md","lg","xl","2xl"] as const}>{size=><Specimen key={size} label={size}><Code size={size}/></Specimen>}</For></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[2]}><Specimen label="Responsive parent"><Frame maxInlineSize="20rem"><Code size="full"/></Frame></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[3]}><Specimen label="Edit value"><Controlled/></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[4]}><Specimen label="Controller"><Store/></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[5]}><Specimen label="Exact text"><VStack align="start" gap="3"><Code value={"Hello 🌎\nOlá 日本語"}/><Text>Hello 🌎 / Olá 日本語</Text></VStack></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[6]}><Grid.Root columns={{initial:2,lg:4}} gap="4"><For each={["L","M","Q","H"] as const}>{ecc=><Specimen key={ecc} label={ecc}><Code encoding={{ecc}}/></Specimen>}</For><Specimen label="Boost enabled"><Code encoding={{boostEcc:true}}/></Specimen></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[7]}><Grid.Root columns={{initial:1,md:3}} gap="4"><For each={[
      {label:"Version 5",encoding:{minVersion:5,maxVersion:5}}, {label:"Mask 3",encoding:{maskPattern:3}}, {label:"Pixel scale 2",pixelSize:2}
    ] as {label:string;encoding?:QrCodeEncoding;pixelSize?:number}[]}>{({label,...props})=><Specimen label={label} key={label}><Code {...props}/></Specimen>}</For></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[8]}><Grid.Root columns={{initial:1,md:2}} gap="4"><Specimen label="Four-module quiet zone"><Code/></Specimen><Specimen label="Inverted · scan sensitive"><Code encoding={{invert:true}}/></Specimen></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[9]}><Grid.Root columns={{initial:1,md:3}} gap="4"><Appearance value="light"><Specimen label="Light"><Code/></Specimen></Appearance><Appearance value="dark"><Specimen label="Dark"><Code/></Specimen></Appearance><Specimen label="Custom ink"><QrCode.Root value={url}><QrCode.Frame fill="#351370" background="#fff8ee" titleText="Custom ink"/></QrCode.Root></Specimen></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[10]}><Grid.Root columns={{initial:1,md:2}} gap="4"><Specimen label="Inline SVG"><QrCode.Root value={url} size="2xl" encoding={{ecc:"H"}}><QrCode.Frame titleText="Branded document"/><QrCode.Overlay><Logo/></QrCode.Overlay></QrCode.Root></Specimen><Specimen label="Local image"><QrCode.Root value={url} size="2xl" encoding={{ecc:"H"}}><QrCode.Frame titleText="Image branded document"/><QrCode.Overlay><img src={art} alt=""/></QrCode.Overlay></QrCode.Root></Specimen></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[11]}><Specimen label="Explicit exportSrc"><Download explicit/></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[12]}><Specimen label="512px export"><Download/></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[13]}><Grid.Root columns={{initial:1,md:2}} gap="4"><Specimen label="Loading and disabled"><QrCode.Root value={url}><HStack gap="3" wrap><QrCode.DownloadTrigger loading fileName="a.svg" mimeType="image/svg+xml">Preparing</QrCode.DownloadTrigger><QrCode.DownloadTrigger loading disabled fileName="a.svg" mimeType="image/svg+xml">Unavailable</QrCode.DownloadTrigger></HStack></QrCode.Root></Specimen><Specimen label="Unsupported logo · try PNG"><Download unsupported/></Specimen></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[14]}><Grid.Root columns={{initial:1,md:2}} gap="4"><Specimen label="Waiting for application"><VStack gap="3"><Spinner/><Text role="status">Preparing share link…</Text></VStack></Specimen><Specimen label="Expired"><Text role="status">This link has expired. Request a new link.</Text></Specimen></Grid.Root></Scenario>
    <Scenario {...qrCodeScenarios[15]}><Specimen label="Recovery"><Errors/></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[16]}><Specimen label="العربية"><VStack dir="rtl" lang="ar" gap="4" align="start"><Code/><Link href={url}>افتح المستند المشترك</Link></VStack></Specimen></Scenario>
    <Scenario {...qrCodeScenarios[17]}><Specimen label="Dialog integration"><ShareDialog/></Specimen></Scenario>
  </VStack>;
}
