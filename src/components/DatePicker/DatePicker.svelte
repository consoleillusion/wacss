<script lang="ts">
  import { DatePicker } from "bits-ui";
  import { CalendarDate, parseDate } from "@internationalized/date";

  type DateValue = CalendarDate;

  let {
    value = $bindable(""),
    label,
    description,
    error,
    disabled = false,
    id,
    name,
    placeholder = "Pick a date",
    class: className = "",
    ...restProps
  }: {
    value?: string;
    label?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    placeholder?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `wacss-date-${uid}`);
  const helpId = $derived(`${inputId}-help`);
  const classes = $derived(["wacss-input", "wacss-date-picker", className].filter(Boolean).join(" "));

  function toDateValue(v: string): DateValue | undefined {
    if (!v) return undefined;
    try {
      return parseDate(v);
    } catch {
      return undefined;
    }
  }

  function toStringValue(v: DateValue | undefined): string {
    return v ? v.toString() : "";
  }

  let dateValue = $state<DateValue | undefined>(toDateValue(value));
  let open = $state(false);

  $effect(() => {
    // sync external string -> internal DateValue when changed externally
    const next = toDateValue(value);
    const cur = dateValue?.toString() ?? "";
    const nxt = next?.toString() ?? "";
    if (cur !== nxt) dateValue = next;
  });

  function onValueChange(v: DateValue | undefined) {
    dateValue = v;
    value = toStringValue(v);
  }
</script>

<div data-wacss="input" data-wacss-date-picker class={classes}>
  {#if label}
    <label data-wacss="label" for={inputId}>{label}</label>
  {/if}

  <DatePicker.Root
    bind:value={dateValue}
    bind:open
    {disabled}
    locale="en-US"
    weekdayFormat="short"
    onValueChange={onValueChange}
    closeOnDateSelect
    {...restProps}
  >
    <div data-wacss="date-picker-field">
      <DatePicker.Input id={inputId} {name} data-wacss="date-picker-input" aria-describedby={error || description ? helpId : undefined} aria-invalid={error ? "true" : undefined}>
        {#snippet children({ segments })}
          {#each segments as { part, value: seg }}
            <DatePicker.Segment {part} data-wacss="date-picker-segment">
              {seg}
            </DatePicker.Segment>
          {/each}
        {/snippet}
      </DatePicker.Input>
      <DatePicker.Trigger data-wacss="date-picker-trigger" aria-label="Open calendar">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
          <path d="M5 1.5v3M11 1.5v3M2.5 6.5h11" />
        </svg>
      </DatePicker.Trigger>
    </div>

    <DatePicker.Content data-wacss="date-picker-content" sideOffset={6}>
      <DatePicker.Calendar data-wacss="calendar">
        {#snippet children({ months, weekdays })}
          <DatePicker.Header data-wacss="calendar-header">
            <DatePicker.PrevButton data-wacss="calendar-nav" aria-label="Previous month">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
            </DatePicker.PrevButton>
            <DatePicker.Heading data-wacss="calendar-heading" />
            <DatePicker.NextButton data-wacss="calendar-nav" aria-label="Next month">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
            </DatePicker.NextButton>
          </DatePicker.Header>
          {#each months as month}
            <DatePicker.Grid data-wacss="calendar-grid">
              <DatePicker.GridHead data-wacss="calendar-grid-head">
                <DatePicker.GridRow data-wacss="calendar-grid-row">
                  {#each weekdays as day}
                    <DatePicker.HeadCell data-wacss="calendar-head-cell">{day}</DatePicker.HeadCell>
                  {/each}
                </DatePicker.GridRow>
              </DatePicker.GridHead>
              <DatePicker.GridBody data-wacss="calendar-grid-body">
                {#each month.weeks as weekDates}
                  <DatePicker.GridRow data-wacss="calendar-grid-row">
                    {#each weekDates as date}
                      <DatePicker.Cell {date} month={month.value} data-wacss="calendar-cell">
                        <DatePicker.Day data-wacss="calendar-day" />
                      </DatePicker.Cell>
                    {/each}
                  </DatePicker.GridRow>
                {/each}
              </DatePicker.GridBody>
            </DatePicker.Grid>
          {/each}
        {/snippet}
      </DatePicker.Calendar>
    </DatePicker.Content>
  </DatePicker.Root>

  {#if error}
    <p id={helpId} data-wacss="input-error">{error}</p>
  {:else if description}
    <p id={helpId} data-wacss="input-description">{description}</p>
  {/if}
</div>
