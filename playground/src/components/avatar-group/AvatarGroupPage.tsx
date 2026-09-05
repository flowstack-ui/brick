import {
  Appearance,
  Avatar,
  AvatarGroup,
  Button,
  Grid,
  HStack,
  Text,
  VStack,
  type AvatarGroupOverlap,
  type AvatarGroupStacking,
  type AvatarSize,
} from "@flowstack-ui/brick";
import type { ReactNode } from "react";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./avatar-group.playground.css";

const people = [
  ["Ada Lovelace", "AL"],
  ["Grace Hopper", "GH"],
  ["Katherine Johnson", "KJ"],
  ["Margaret Hamilton", "MH"],
  ["Dorothy Vaughan", "DV"],
] as const;
const sizes: AvatarSize[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];
const overlaps: AvatarGroupOverlap[] = ["none", "sm", "md", "lg"];
const stackingValues: AvatarGroupStacking[] = [
  "first-on-top",
  "last-on-top",
];

function peopleAvatars(decorative = false) {
  return people.map(([name, fallback]) => (
    <Avatar alt={decorative ? "" : name} fallback={fallback} key={name} />
  ));
}

function Specimen({ children, label }: { children: ReactNode; label: string }) {
  return (
    <EvidenceSurface className="avatar-group-specimen" inset="md">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="avatar-group-specimen__preview">{children}</div>
    </EvidenceSurface>
  );
}

export const avatarGroupScenarios = [
  {
    description:
      "The canonical group keeps every identity visible in source order with medium circular Avatars, medium logical overlap, and the last item painted on top.",
    id: "avatar-group.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "One group size and shape coordinates every descendant Avatar without cloning or changing identity semantics.",
    id: "avatar-group.recipes",
    number: 2,
    title: "Size and shape",
  },
  {
    description:
      "Overlap changes only shared logical geometry; stacking changes only paint order and preserves DOM order.",
    id: "avatar-group.stacking",
    number: 3,
    title: "Overlap and stacking",
  },
  {
    description:
      "Bounded rendering is explicit. Built-in overflow requires localized naming, while total can represent identities not rendered by the application.",
    id: "avatar-group.overflow",
    number: 4,
    title: "Overflow and total",
  },
  {
    description:
      "A custom overflow node owns its interaction and accessible name; AvatarGroup remains passive.",
    id: "avatar-group.composition",
    number: 5,
    title: "Interactive composition",
  },
  {
    description:
      "Dark appearance, RTL, constrained width, long labels, and dense overlap preserve identity order, outlines, and containment.",
    id: "avatar-group.stress",
    number: 6,
    title: "Appearance, RTL, and stress",
  },
] as const satisfies readonly ScenarioDefinition[];

export function AvatarGroupPage() {
  return (
    <VStack
      className="avatar-group-page"
      data-component-page="avatar-group"
      data-testid="avatar-group-workbench"
    >
      <Scenario {...avatarGroupScenarios[0]}>
        <EvidenceSurface
          className="avatar-group-overview"
          data-testid="avatar-group-overview"
          inset="lg"
        >
          <AvatarGroup>{peopleAvatars()}</AvatarGroup>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...avatarGroupScenarios[1]}>
        <Grid.Root
          className="avatar-group-grid"
          columns={{ initial: 1, md: 3 }}
          data-testid="avatar-group-recipes"
        >
          {sizes.map((size) => (
            <Specimen key={size} label={size}>
              <AvatarGroup size={size}>
                {peopleAvatars().slice(
                  0,
                  size === "2xl" ? 4 : size === "3xl" ? 3 : size === "4xl" || size === "5xl" ? 2 : 5,
                )}
              </AvatarGroup>
            </Specimen>
          ))}
          <Specimen label="rounded">
            <AvatarGroup shape="rounded" size="lg">
              {peopleAvatars()}
            </AvatarGroup>
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...avatarGroupScenarios[2]}>
        <Grid.Root
          className="avatar-group-grid"
          columns={{ initial: 1, md: 2 }}
          data-testid="avatar-group-stacking"
        >
          {overlaps.map((overlap) => (
            <Specimen key={overlap} label={`overlap ${overlap}`}>
              <AvatarGroup overlap={overlap}>{peopleAvatars()}</AvatarGroup>
            </Specimen>
          ))}
          {stackingValues.map((stacking) => (
            <Specimen key={stacking} label={stacking}>
              <AvatarGroup stacking={stacking}>{peopleAvatars()}</AvatarGroup>
            </Specimen>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...avatarGroupScenarios[3]}>
        <Grid.Root
          className="avatar-group-grid"
          columns={{ initial: 1, md: 2 }}
          data-testid="avatar-group-overflow"
        >
          <Specimen label="max 3">
            <AvatarGroup
              max={3}
              overflowLabel={(count) => `${count} more collaborators`}
              size="sm"
            >
              {peopleAvatars()}
            </AvatarGroup>
          </Specimen>
          <Specimen label="external total 24">
            <AvatarGroup
              max={4}
              overflowLabel={(count) => `${count} more reviewers`}
              size="sm"
              total={24}
            >
              {people.slice(0, 3).map(([name, fallback]) => (
                <Avatar alt={name} fallback={fallback} key={name} />
              ))}
            </AvatarGroup>
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...avatarGroupScenarios[4]}>
        <EvidenceSurface
          className="avatar-group-composition"
          data-testid="avatar-group-composition"
          inset="lg"
        >
          <HStack>
            <AvatarGroup
              max={3}
              renderOverflow={(count) => (
                <Button aria-label={`Show ${count} more collaborators`} size="sm" variant="outline">
                  +{count}
                </Button>
              )}
              size="sm"
            >
              {peopleAvatars(true)}
            </AvatarGroup>
            <Text tone="secondary" variant="body-sm">
              Product review collaborators
            </Text>
          </HStack>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...avatarGroupScenarios[5]}>
        <Grid.Root
          className="avatar-group-grid"
          columns={{ initial: 1, md: 2 }}
          data-testid="avatar-group-stress"
        >
          <Appearance value="dark">
            <Specimen label="dark appearance">
              <AvatarGroup max={4} overflowLabel={(count) => `${count} more`}>
                {peopleAvatars()}
              </AvatarGroup>
            </Specimen>
          </Appearance>
          <Specimen label="RTL source order">
            <div dir="rtl">
              <AvatarGroup aria-label="مراجعون" role="group" stacking="first-on-top">
                <Avatar alt="نور" fallback="ن" />
                <Avatar alt="ليلى" fallback="ل" />
                <Avatar alt="سامي" fallback="س" />
              </AvatarGroup>
            </div>
          </Specimen>
          <Specimen label="localized overflow">
            <AvatarGroup
              max={2}
              overflowLabel={(count) => `${count} مشاركين إضافيين`}
              overlap="lg"
              size="xs"
            >
              {peopleAvatars()}
            </AvatarGroup>
          </Specimen>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
