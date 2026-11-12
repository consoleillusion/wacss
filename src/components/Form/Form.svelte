<script lang="ts">
  import Button from "../Button/Button.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  import Select from "../Select/Select.svelte";
  import Switch from "../Switch/Switch.svelte";
  import { persistState } from "../persist.svelte";
  import type { FormProps, JsonSchema } from "../types";
  import FormControl from "./FormControl.svelte";
  import {
    arrayItemSchema,
    autocompleteFor,
    coerceScalar,
    defaultsFromSchema,
    enumEntries,
    fieldId,
    formatName,
    getPath,
    getUi,
    helpFor,
    includesValue,
    inferWidget,
    inputTypeForWidget,
    isRequired,
    labelFor,
    mergeValues,
    orderedProperties,
    placeholderFor,
    resolveSchema,
    setPath,
    toggleArrayValue,
  } from "./infer";

  let {
    jsonschema,
    schema,
    values = $bindable(
      defaultsFromSchema((jsonschema ?? schema ?? { type: "object" }) as JsonSchema) as Record<
        string,
        unknown
      >,
    ),
    uiSchema,
    errors,
    action,
    method = "post",
    target,
    enctype,
    autocomplete,
    novalidate = false,
    id,
    name,
    columns = 1,
    nameFormat = "dot",
    submitLabel = "Submit",
    submitVariant = "default",
    showSubmit = true,
    resetLabel = "Reset",
    showReset = false,
    disabled = false,
    readonly = false,
    storageKey,
    persist = true,
    class: className = "",
    onSubmit,
    onReset,
    children,
    ...restProps
  }: FormProps = $props();

  const uid = $props.id();
  const formId = $derived(id ?? `${uid}`);
  const classes = $derived(["", className].filter(Boolean).join(" "));
  const jsonSchema = $derived(
    (jsonschema ?? schema ?? { type: "object" }) as JsonSchema,
  );
  const defaults = $derived(defaultsFromSchema(jsonSchema, jsonSchema));
  const rootSchema = $derived(resolveSchema(jsonSchema, jsonSchema));
  const currentValues = $derived(
    mergeValues(defaults, values) as Record<string, unknown>,
  );

  let submitting = $state(false);

  persistState({
    get: () => currentValues,
    set: (next) => {
      values = next as Record<string, unknown>;
    },
    key: () =>
      storageKey ?? (jsonSchema.$id ? `wacss:form:${jsonSchema.$id}` : "wacss:form"),
    enabled: () => persist,
  });

  function valueAt(path: string[]): unknown {
    return getPath(currentValues, path);
  }

  function update(path: string[], next: unknown) {
    values = setPath(currentValues, path, next);
  }

  function asString(value: unknown): string {
    return value === undefined || value === null ? "" : String(value);
  }

  async function handleSubmit(event: SubmitEvent) {
    if (!onSubmit) return;
    event.preventDefault();
    submitting = true;
    try {
      await onSubmit(currentValues, event);
    } finally {
      submitting = false;
    }
  }

  function handleReset() {
    values = defaultsFromSchema(jsonSchema, jsonSchema) as Record<string, unknown>;
    onReset?.();
  }
</script>

{#snippet renderField(
  path: string[],
  fieldSchema: JsonSchema,
  required: boolean,
)}
  {@const resolved = resolveSchema(fieldSchema, jsonSchema)}
  {@const ui = getUi(uiSchema, path)}
  {@const widget =
    ui?.widget && ui.widget !== "auto" ? ui.widget : inferWidget(resolved, jsonSchema)}
  {@const label = labelFor(resolved, path, ui)}
  {@const help = helpFor(resolved, ui)}
  {@const error = errors?.[path.join(".")]}
  {@const controlId = fieldId(formId, path)}
  {@const fieldName = formatName(path, nameFormat)}
  {@const fieldDisabled = disabled || Boolean(ui?.disabled)}
  {@const fieldReadonly = readonly || Boolean(ui?.readonly) || Boolean(resolved.readOnly)}
  {@const fieldValue = valueAt(path)}
  {@const types = Array.isArray(resolved.type)
    ? resolved.type.filter((type) => type !== "null")
    : resolved.type
      ? [resolved.type]
      : []}

  {#if ui?.hidden}
    <!-- field hidden by uiSchema -->
  {:else if widget === "hidden"}
    <input type="hidden" name={fieldName} value={asString(fieldValue)} />
  {:else if widget === "group"}
    <fieldset
      disabled={fieldDisabled}
      aria-describedby={error || help ? `${controlId}-help` : undefined}
    >
      {#if label || help}
        <legend>
          {label}
          {#if required}<span aria-hidden="true">*</span>{/if}
        </legend>
        {#if help && !error}
          <p id={`${controlId}-help`}>{help}</p>
        {/if}
      {/if}

      <div data-columns={ui?.columns ?? 1}>
        {#each orderedProperties(resolved, uiSchema, path) as [key, childSchema] (key)}
          {@render renderField(
            [...path, key],
            childSchema,
            isRequired(resolved, key),
          )}
        {/each}
      </div>

      {#if error}
        <p id={`${controlId}-help`}>{error}</p>
      {/if}
    </fieldset>
  {:else if widget === "switch"}
    <div>
      <Switch
        id={controlId}
        name={fieldName}
        checked={Boolean(fieldValue)}
        label={required ? `${label} *` : label}
        disabled={fieldDisabled}
        required={required}
        persist={false}
        aria-describedby={error || help ? `${controlId}-help` : undefined}
        aria-invalid={error ? "true" : undefined}
        onCheckedChange={(checked) => update(path, checked)}
      />
      {#if error}
        <p id={`${controlId}-help`}>{error}</p>
      {:else if help}
        <p id={`${controlId}-help`}>{help}</p>
      {/if}
    </div>
  {:else if widget === "checkboxes"}
    {@const itemSchema = types.includes("array")
      ? arrayItemSchema(resolved)
      : resolved}
    {@const entries = itemSchema ? enumEntries(itemSchema, jsonSchema) : []}
    <fieldset
      disabled={fieldDisabled}
      aria-required={required ? "true" : undefined}
      aria-describedby={error || help ? `${controlId}-help` : undefined}
    >
      <legend>
        {label}
        {#if required}<span aria-hidden="true">*</span>{/if}
      </legend>
      {#if help && !error}
        <p id={`${controlId}-help`}>{help}</p>
      {/if}

      <div>
        {#each entries as entry (entry.value)}
          <Checkbox
            name={fieldName}
            value={entry.value}
            label={entry.label}
            checked={includesValue(fieldValue, entry.raw)}
            disabled={fieldDisabled}
            persist={false}
            onCheckedChange={(checked) =>
              update(path, toggleArrayValue(fieldValue, entry.raw, checked))}
          />
        {/each}
      </div>

      {#if error}
        <p id={`${controlId}-help`}>{error}</p>
      {/if}
    </fieldset>
  {:else if widget === "select"}
    {@const entries = enumEntries(resolved, jsonSchema)}
    {@const selected =
      entries.find((entry) => String(entry.raw) === String(fieldValue))?.value ?? ""}
    <div>
      <label for={controlId}>
        {label}
        {#if required}<span aria-hidden="true">*</span>{/if}
      </label>
      <Select
        name={fieldName}
        options={entries.map((entry) => ({ value: entry.value, label: entry.label }))}
        value={selected}
        placeholder={ui?.placeholder ?? "Select an option"}
        disabled={fieldDisabled}
        required={required}
        persist={false}
        triggerProps={{
          id: controlId,
          "aria-describedby": error || help ? `${controlId}-help` : undefined,
          "aria-invalid": error ? "true" : undefined,
        }}
        onValueChange={(next) => {
          const entry = entries.find((item) => item.value === next);
          update(path, entry ? entry.raw : next);
        }}
      />
      {#if error}
        <p id={`${controlId}-help`}>{error}</p>
      {:else if help}
        <p id={`${controlId}-help`}>{help}</p>
      {/if}
    </div>
  {:else}
    {@const inputType = inputTypeForWidget(widget)}
    {@const numberField =
      types.includes("number") ||
      types.includes("integer") ||
      widget === "range"}
    <FormControl
      id={controlId}
      name={fieldName}
      label={label}
      help={help}
      error={error}
      required={required}
      disabled={fieldDisabled}
      readonly={fieldReadonly}
      type={inputType}
      value={asString(fieldValue)}
      placeholder={placeholderFor(resolved, ui)}
      autocomplete={autocompleteFor(resolved, ui)}
      min={numberField ? resolved.minimum : undefined}
      max={numberField ? resolved.maximum : undefined}
      step={numberField
        ? (resolved.multipleOf ?? (types.includes("integer") ? 1 : "any"))
        : undefined}
      minlength={resolved.minLength}
      maxlength={resolved.maxLength}
      pattern={resolved.pattern}
      oninput={(event) =>
        update(path, coerceScalar(resolved, event.currentTarget.value, jsonSchema))}
    />
  {/if}
{/snippet}

<form
  {...restProps}
  id={formId}
  {name}
  {action}
  {method}
  {target}
  {enctype}
  {autocomplete}
  novalidate={novalidate || undefined}
  class={classes}
  data-disabled={disabled || undefined}
  onsubmit={handleSubmit}
  onreset={handleReset}
>
  <div data-columns={columns}>
    {#if rootSchema.properties && Object.keys(rootSchema.properties).length > 0}
      {#each orderedProperties(rootSchema, uiSchema, []) as [key, childSchema] (key)}
        {@render renderField([key], childSchema, isRequired(rootSchema, key))}
      {/each}
    {:else}
      {@render renderField([], rootSchema, false)}
    {/if}
  </div>

  {#if children}
    {@render children()}
  {/if}

  {#if showSubmit || showReset}
    <div>
      {#if showReset}
        <Button type="reset" variant="ghost" disabled={disabled}>{resetLabel}</Button>
      {/if}
      {#if showSubmit}
        <Button
          type="submit"
          variant={submitVariant}
          disabled={disabled}
          loading={submitting}
        >
          {submitLabel}
        </Button>
      {/if}
    </div>
  {/if}
</form>
