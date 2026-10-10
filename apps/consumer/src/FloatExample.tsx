import { Avatar, Badge, HStack, Link, Text } from "@flowstack-ui/brick";
import { Float } from "@flowstack-ui/brick/float";
import "@flowstack-ui/brick/styles/float.css";

export function FloatExample() {
 return <HStack gap={6}><Float.Anchor inline><Avatar alt="Avery Morgan" fallback="AM" size="3xl" /><Float.Root placement="bottom-end" offset="12%"><Badge tone="success" variant="solid">Online</Badge></Float.Root></Float.Anchor><Text>Avery Morgan</Text><Link href="#profile">View Avery’s profile</Link></HStack>;
}
