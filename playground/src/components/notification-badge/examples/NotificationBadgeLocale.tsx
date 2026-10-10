import {
  Avatar,
  HStack,
  LocaleProvider,
  NotificationBadge,
} from "@flowstack-ui/brick";

export function NotificationBadgeLocale() {
  return (
    <LocaleProvider locale="ar-EG">
      <HStack gap={8} dir="rtl">
        <NotificationBadge count={125}>
          <Avatar alt="آدا، ١٢٥ رسالة غير مقروءة" fallback="AL" />
        </NotificationBadge>
        <NotificationBadge count={12} locale="en-US">
          <Avatar alt="Grace, 12 unread messages" fallback="GH" />
        </NotificationBadge>
      </HStack>
    </LocaleProvider>
  );
}
