import { Calendar, Text, parseDate } from "@flowstack-ui/brick";
export function CalendarCustom() {
  return (
    <Calendar.Root
      referenceDate={parseDate("2026-09-18")}
      maxView="day"
      aria-label="Custom review calendar"
    >
      <Calendar.Header>
        <Calendar.PrevTrigger />
        <Calendar.RangeText />
        <Calendar.NextTrigger />
      </Calendar.Header>
      <Calendar.Context>
        {(calendar) => (
          <Calendar.Table>
            <Calendar.TableHead>
              <Calendar.TableRow>
                {calendar.weekDays.map((day) => (
                  <Calendar.TableHeader key={day.long} abbr={day.long}>
                    {day.short}
                  </Calendar.TableHeader>
                ))}
              </Calendar.TableRow>
            </Calendar.TableHead>
            <Calendar.TableBody>
              {calendar.getWeeks().map((week) => (
                <Calendar.TableRow key={week[0].toString()}>
                  {week.map((date) => (
                    <Calendar.TableCell key={date.toString()} value={date}>
                      <Calendar.TableCellTrigger>
                        {date.day === 21 ? (
                          <Text variant="body-sm" weight="bold" tone="inherit">
                            {date.day}
                          </Text>
                        ) : (
                          date.day
                        )}
                      </Calendar.TableCellTrigger>
                    </Calendar.TableCell>
                  ))}
                </Calendar.TableRow>
              ))}
            </Calendar.TableBody>
          </Calendar.Table>
        )}
      </Calendar.Context>
    </Calendar.Root>
  );
}
