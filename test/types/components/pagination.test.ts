import { Pagination, type PaginationRootProps, type PaginationSize, type PaginationVariant } from "../../../src/pagination.js";
const size: PaginationSize = "lg";
const variant: PaginationVariant = "outline";
const props: PaginationRootProps = { children: null, totalPages: 8, size, variant, getItemAriaLabel: ({ page, isCurrent }) => `${page}-${isCurrent}` };
const linkProps: PaginationRootProps = { children: null, totalPages: 8, page: 2, getPageHref: ({ page }) => `/results?page=${page}` };
void Pagination; void props;
void linkProps;
// @ts-expect-error Pagination variants are closed.
const badVariant: PaginationVariant = "solid";
// @ts-expect-error Pagination requires a numeric total page count.
const badProps: PaginationRootProps = { children: null, totalPages: "8" };
void badVariant; void badProps;
